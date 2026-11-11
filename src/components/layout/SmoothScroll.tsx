"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext<Lenis | null>(null);

export const useLenis = () => useContext(LenisContext);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // High-performance smooth scroll configuration
    const lenis = new Lenis({
      duration: 1.0, // Quick, responsive deceleration curve
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential smooth decay
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.0,
      syncTouch: false, // Let mobile touch scroll natively at full hardware speed (120Hz)
    });

    lenisRef.current = lenis;
    setLenisInstance(lenis);
    (window as any).__lenis = lenis;

    // Connect Lenis directly with GSAP ScrollTrigger for 0-lag synchronized updates
    lenis.on("scroll", ScrollTrigger.update);

    // Sync Lenis RAF with GSAP ticker for frame-locked rendering
    const tickerUpdate = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerUpdate);
    // lagSmoothing(500, 33): allows 33ms target frame budget with 500ms safety cap
    gsap.ticker.lagSmoothing(500, 33);

    return () => {
      gsap.ticker.remove(tickerUpdate);
      lenis.destroy();
      lenisRef.current = null;
      setLenisInstance(null);
      delete (window as any).__lenis;
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisInstance}>
      {children}
    </LenisContext.Provider>
  );
}
