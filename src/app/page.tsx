"use client";

import "./global.css";
import "./styles/home.css";
import "./styles/start.css";
import "./styles/footer.css";
import { Cinzel } from "next/font/google";
import RippleBackground from "./utilities/ripple_background";
import Header from "./components/header";
import Home from "./pages/home";
import Footer from "./components/footer";
import { useState, useRef, useEffect, useCallback } from "react";
import { useBurnTransition } from "./utilities/use_burn_transition";
import { useTransitionAudio } from "./utilities/use_transition_audio";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
});

export default function Page() {
  const [phase, setPhase] = useState<"start" | "burning" | "main">("start");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { startFire, crossfadeToBackground, stopAll } = useTransitionAudio();
 
  const handleComplete = useCallback(() => {
    crossfadeToBackground();
    setPhase("main");
  }, [crossfadeToBackground]);
 
  const { start, stop } = useBurnTransition(canvasRef, handleComplete);
 
  useEffect(() => {
    if (phase !== "main") return;
    stop();
    return () => { stopAll(); };
  }, [phase]);
 
  const handleEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    startFire();
    setPhase("burning");
    start(e.clientX, e.clientY);
  };
 
  return (
    <div className={cinzel.variable}>
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed", inset: 0,
          zIndex: 50,
          pointerEvents: "none",
          opacity: phase === "burning" ? 1 : 0,
          transition: phase === "main" ? "opacity 0.5s ease" : "none",
        }}
      />
 
      {phase === "start" && (
        <div className="start-screen">
          <button className="enter-button" onClick={handleEnter}>
            Enter Experience
          </button>
        </div>
      )}
 
      <div style={{ display: phase === "start" ? "none" : "block" }}>
        <RippleBackground />
 
        <Header />
 
        <Home />

        <Footer />
      </div>
    </div>
  );
}