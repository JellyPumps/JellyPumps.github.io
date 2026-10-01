import { useRef, useCallback } from "react";

const CELL = 8;
const BURN_SPEED = 0.06;
const BURN_SPEED_FAST = 0.18;
const SPREAD_PER_FRAME = 80;
const SPREAD_PER_FRAME_FAST = 350;
const ACCELERATE_AT = 0.20;

interface Ember {
  x: number; y: number;
  vx: number; vy: number;
  life: number; decay: number;
  size: number; bright: boolean;
}

interface BurnState {
  cols: number; rows: number;
  burned: Uint8Array;
  burning: Uint8Array;
  progress: Float32Array;
  frontier: number[];
  embers: Ember[];
  animating: boolean;
  done: boolean;
  rafId: number;
  imageData: ImageData;
  ctx: CanvasRenderingContext2D;
}

export function useBurnTransition(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  onComplete: () => void
) {
  const stateRef = useRef<BurnState | null>(null);

  const tick = useCallback(() => {
    const s = stateRef.current;
    if (!s || !s.animating) return;

    const { cols, rows, burned, burning, progress, frontier, embers, imageData } = s;
    const data = imageData.data;
    const total = cols * rows;

    let burnedCount = 0;
    for (let i = 0; i < total; i++) if (burned[i]) burnedCount++;
    const burnRatio = burnedCount / total;
    const t = Math.min(1, Math.max(0, (burnRatio - ACCELERATE_AT) / 0.3));
    const speed = BURN_SPEED + t * (BURN_SPEED_FAST - BURN_SPEED);
    const spread = Math.floor(SPREAD_PER_FRAME + t * (SPREAD_PER_FRAME_FAST - SPREAD_PER_FRAME));

    const nextFrontier: number[] = [];
    const newCells: number[] = [];

    for (const idx of frontier) {
      progress[idx] += speed + Math.random() * 0.02;

      const px = (idx % cols) * CELL;
      const py = Math.floor(idx / cols) * CELL;

      if (progress[idx] >= 1) {
        burned[idx] = 1;
        burning[idx] = 0;
        for (let dy = 0; dy < CELL; dy++) {
          for (let dx = 0; dx < CELL; dx++) {
            data[((py + dy) * imageData.width + (px + dx)) * 4 + 3] = 0;
          }
        }
      } else {
        nextFrontier.push(idx);

        const p = progress[idx];
        const glow = Math.sin(p * Math.PI);
        const bgAlpha = Math.floor((1 - p * 0.85) * 247);
        const edgeAlpha = glow > 0.3 ? Math.floor(glow * 230) : 0;
        const rv = Math.floor(200 + 55 * glow);
        const gv = Math.floor(96 * glow * 0.6);

        for (let dy = 0; dy < CELL; dy++) {
          for (let dx = 0; dx < CELL; dx++) {
            const pi = ((py + dy) * imageData.width + (px + dx)) * 4;
            if (edgeAlpha > 0) {
              data[pi]     = rv;
              data[pi + 1] = gv;
              data[pi + 2] = 26;
              data[pi + 3] = edgeAlpha;
            } else {
              data[pi]     = 10;
              data[pi + 1] = 8;
              data[pi + 2] = 6;
              data[pi + 3] = bgAlpha;
            }
          }
        }

        if (newCells.length < spread) {
          const c = idx % cols;
          const r = Math.floor(idx / cols);
          const neighbors = [
            [c-1,r],[c+1,r],[c,r-1],[c,r+1],
            [c-1,r-1],[c+1,r-1],[c-1,r+1],[c+1,r+1],
          ];
          for (const [nc, nr] of neighbors) {
            if (nc < 0 || nc >= cols || nr < 0 || nr >= rows) continue;
            const nidx = nr * cols + nc;
            if (!burned[nidx] && !burning[nidx] && Math.random() < 0.35) {
              burning[nidx] = 1;
              progress[nidx] = 0;
              newCells.push(nidx);
            }
          }
        }
      }
    }

    for (const idx of newCells) nextFrontier.push(idx);
    s.frontier = nextFrontier;

    s.ctx.putImageData(imageData, 0, 0);

    for (let i = embers.length - 1; i >= 0; i--) {
      const e = embers[i];
      e.x += e.vx; e.y += e.vy; e.vy += 0.08; e.life -= e.decay;
      if (e.life <= 0) { embers.splice(i, 1); continue; }
      s.ctx.beginPath();
      s.ctx.arc(e.x, e.y, e.size * e.life, 0, Math.PI * 2);
      s.ctx.fillStyle = e.bright
        ? `rgba(255,160,60,${e.life})`
        : `rgba(200,96,26,${e.life})`;
      s.ctx.fill();
    }

    if (burnedCount >= total * 0.97 && !s.done) {
      s.done = true;
      setTimeout(onComplete, 200);
    }

    s.rafId = requestAnimationFrame(tick);
  }, [onComplete]);

  const start = useCallback((originX: number, originY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const cols = Math.ceil(canvas.width / CELL);
    const rows = Math.ceil(canvas.height / CELL);
    const total = cols * rows;

    const imageData = ctx.createImageData(canvas.width, canvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      data[i] = 10; data[i+1] = 8; data[i+2] = 6; data[i+3] = 247;
    }
    ctx.putImageData(imageData, 0, 0);

    const burned   = new Uint8Array(total);
    const burning  = new Uint8Array(total);
    const progress = new Float32Array(total);
    const frontier: number[] = [];
    const embers: Ember[] = [];

    const seedC = Math.floor(originX / CELL);
    const seedR = Math.floor(originY / CELL);
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        const c = Math.max(0, Math.min(cols - 1, seedC + dc));
        const r = Math.max(0, Math.min(rows - 1, seedR + dr));
        const idx = r * cols + c;
        if (!burning[idx]) { burning[idx] = 1; frontier.push(idx); }
      }
    }

    for (let i = 0; i < 25; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 5;
      embers.push({
        x: originX, y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        life: 1, decay: 0.015 + Math.random() * 0.02,
        size: 1.5 + Math.random() * 2.5,
        bright: Math.random() > 0.4,
      });
    }

    stateRef.current = {
      cols, rows, burned, burning, progress,
      frontier, embers,
      animating: true, done: false, rafId: 0,
      imageData, ctx,
    };

    stateRef.current.rafId = requestAnimationFrame(tick);
  }, [tick]);

  const stop = useCallback(() => {
    if (stateRef.current) {
      stateRef.current.animating = false;
      cancelAnimationFrame(stateRef.current.rafId);
    }
  }, []);

  return { start, stop };
}