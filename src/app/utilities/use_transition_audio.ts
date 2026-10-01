import { useRef, useCallback } from "react";

export function useTransitionAudio() {
  const bgRef = useRef<HTMLAudioElement | null>(null);
  const fireRef = useRef<HTMLAudioElement | null>(null);

  const startFire = useCallback(() => {
    const fire = new Audio("/assets/fire.mp3");
    fire.volume = 0.85;
    fire.play().catch(() => {});
    fireRef.current = fire;
  }, []);

  const crossfadeToBackground = useCallback(() => {
    const fire = fireRef.current;
    if (fire) {
      const fadeOut = setInterval(() => {
        if (fire.volume > 0.05) {
          fire.volume = Math.max(0, fire.volume - 0.05);
        } else {
          fire.pause();
          clearInterval(fadeOut);
        }
      }, 80);
    }

    const bg = new Audio("/assets/background.mp3");
    bg.loop = true;
    bg.volume = 0;
    bg.play().catch(() => {});
    bgRef.current = bg;

    const fadeIn = setInterval(() => {
      if (bg.volume < 0.9) {
        bg.volume = Math.min(0.95, bg.volume + 0.04);
      } else {
        bg.volume = 0.95;
        clearInterval(fadeIn);
      }
    }, 80);
  }, []);

  const stopAll = useCallback(() => {
    bgRef.current?.pause();
    fireRef.current?.pause();
  }, []);

  return { startFire, crossfadeToBackground, stopAll };
}