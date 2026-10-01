"use client";

import { useRef, useEffect } from "react";

export default function RippleBackground() {
    const canvas_ref = useRef<HTMLCanvasElement>(null);
    const ripples: { x: number; y: number; radius: number; alpha: number }[] = [];

    useEffect(() => {
        const canvas = canvas_ref.current!;
        const ctx = canvas.getContext("2d")!;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ripples.forEach((ripple, index) => {
                ripple.radius += 2;
                ripple.alpha -= 0.01;

                if (ripple.alpha <= 0) {
                    ripples.splice(index, 1);
                    return;
                }

                ctx.beginPath();
                ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(200, 96, 26, ${ripple.alpha})`
                ctx.lineWidth = 2;
                ctx.stroke();
            });
            requestAnimationFrame(animate);
        }

        animate();

        function playDrip() {
            const sound = new Audio("/assets/drip.mp3");
            sound.volume = 0.5 + Math.random() * 0.5;
            sound.play();
        }

        function handleClick(e: MouseEvent) {
            ripples.push({
                x: e.clientX,
                y: e.clientY,
                radius: 0,
                alpha: 1,
            });

            playDrip();
        }
        window.addEventListener("click", handleClick);

        return () => {
            window.removeEventListener("click", handleClick);
        };
    }, []);

    return (
        <canvas
            ref={canvas_ref}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                zIndex: 0,
                pointerEvents: "none"
            }}
        />
    );
}