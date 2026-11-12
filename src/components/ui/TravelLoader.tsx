"use client";

import React, { useState, useEffect } from "react";

export type TravelMode = "backpack" | "train" | "plane";

interface TravelLoaderProps {
  className?: string;
  onFinish?: () => void;
}

export default function TravelLoader({ className = "", onFinish }: TravelLoaderProps) {
  const [activeMode, setActiveMode] = useState<TravelMode>("backpack");
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    // Cycle between Backpack (0-33%), Train (33-66%), Plane (66-100%)
    const t1 = setTimeout(() => {
      setActiveMode("train");
      setProgress(55);
    }, 800);

    const t2 = setTimeout(() => {
      setActiveMode("plane");
      setProgress(90);
    }, 1600);

    const t3 = setTimeout(() => {
      setProgress(100);
      if (onFinish) onFinish();
    }, 2400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onFinish]);

  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
      {/* Glow Backdrop */}
      <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-white/[0.03] blur-3xl pointer-events-none" />

      {/* Main Glass Stage Card */}
      <div className="relative w-80 sm:w-96 rounded-3xl bg-[#111113]/90 border border-white/10 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl flex flex-col items-center space-y-6">
        
        {/* Top Travel Mode Badges (Backpack -> Train -> Plane) */}
        <div className="flex items-center justify-between w-full px-2">
          {/* Mode 1: Backpack */}
          <div className="flex flex-col items-center gap-1.5">
            <div
              className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-500 border ${
                activeMode === "backpack"
                  ? "bg-white text-black border-white shadow-lg scale-110"
                  : progress > 33
                  ? "bg-white/10 text-white/90 border-white/20"
                  : "bg-white/5 text-white/40 border-white/5"
              }`}
            >
              {/* Backpack Icon */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {/* Bedroll on top */}
                <rect x="5" y="2" width="14" height="4" rx="2" fill="currentColor" fillOpacity="0.2" />
                {/* Main bag */}
                <path d="M6 7h12a2 2 0 0 1 2 2v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V9a2 2 0 0 1 2-2z" />
                {/* Front pocket */}
                <path d="M8 13h8a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1z" />
                {/* Straps */}
                <line x1="10" y1="7" x2="10" y2="13" />
                <line x1="14" y1="7" x2="14" y2="13" />
              </svg>
            </div>
            <span className={`text-[10px] font-mono uppercase tracking-wider transition-colors ${activeMode === "backpack" ? "text-white font-bold" : "text-white/40"}`}>
              Pack
            </span>
          </div>

          {/* Dotted Connecting Line 1 */}
          <div className="flex-1 mx-2 h-0.5 relative overflow-hidden bg-white/10 rounded-full">
            <div
              className="absolute inset-y-0 left-0 bg-white transition-all duration-500 rounded-full"
              style={{ width: progress >= 50 ? "100%" : `${Math.max(0, (progress - 15) * 2.8)}%` }}
            />
          </div>

          {/* Mode 2: Train */}
          <div className="flex flex-col items-center gap-1.5">
            <div
              className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-500 border ${
                activeMode === "train"
                  ? "bg-white text-black border-white shadow-lg scale-110"
                  : progress > 66
                  ? "bg-white/10 text-white/90 border-white/20"
                  : "bg-white/5 text-white/40 border-white/5"
              }`}
            >
              {/* Train Locomotive Icon */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="3" width="16" height="15" rx="3" fill="currentColor" fillOpacity="0.2" />
                <path d="M4 11h16" />
                <path d="M12 3v8" />
                <circle cx="8" cy="15" r="1" fill="currentColor" />
                <circle cx="16" cy="15" r="1" fill="currentColor" />
                <path d="M8 18l-2 3" />
                <path d="M16 18l2 3" />
                <path d="M4 21h16" />
              </svg>
            </div>
            <span className={`text-[10px] font-mono uppercase tracking-wider transition-colors ${activeMode === "train" ? "text-white font-bold" : "text-white/40"}`}>
              Ride
            </span>
          </div>

          {/* Dotted Connecting Line 2 */}
          <div className="flex-1 mx-2 h-0.5 relative overflow-hidden bg-white/10 rounded-full">
            <div
              className="absolute inset-y-0 left-0 bg-white transition-all duration-500 rounded-full"
              style={{ width: progress >= 90 ? "100%" : progress >= 55 ? `${(progress - 55) * 2.8}%` : "0%" }}
            />
          </div>

          {/* Mode 3: Plane */}
          <div className="flex flex-col items-center gap-1.5">
            <div
              className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-500 border ${
                activeMode === "plane"
                  ? "bg-white text-black border-white shadow-lg scale-110"
                  : progress >= 100
                  ? "bg-white/10 text-white/90 border-white/20"
                  : "bg-white/5 text-white/40 border-white/5"
              }`}
            >
              {/* Plane Icon */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3.5c-.5-.5-2.5 0-4 1.5L13.5 8.5 5.3 6.7c-.8-.2-1.6.3-1.8 1.1l-.2.8 5.7 3.4-3.4 3.4-2.8-.7-.7.7 2.1 2.1 2.1 2.1.7-.7-.7-2.8 3.4-3.4 3.4 5.7.8-.2c.8-.2 1.3-1 1.1-1.8z" fill="currentColor" fillOpacity="0.2" />
              </svg>
            </div>
            <span className={`text-[10px] font-mono uppercase tracking-wider transition-colors ${activeMode === "plane" ? "text-white font-bold" : "text-white/40"}`}>
              Fly
            </span>
          </div>
        </div>

        {/* Center Dynamic Showcase Box */}
        <div className="relative w-full h-36 rounded-2xl bg-black/60 border border-white/10 overflow-hidden flex items-center justify-center">
          
          {/* Subtle Parallax Background Stars & Rail Lines */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-4 left-6 w-1 h-1 rounded-full bg-white animate-ping" />
            <div className="absolute top-10 right-8 w-1 h-1 rounded-full bg-white" />
            <div className="absolute bottom-6 left-12 w-1.5 h-1.5 rounded-full bg-white/60" />
            <div className="absolute top-16 left-1/2 w-1 h-1 rounded-full bg-white/40" />
          </div>

          {/* ── MODE 1: BACKPACK SHOWCASE ── */}
          {activeMode === "backpack" && (
            <div className="flex flex-col items-center justify-center space-y-2 animate-in fade-in zoom-in-95 duration-500">
              <div className="relative">
                {/* Pulse Ring */}
                <div className="absolute -inset-3 rounded-full bg-white/10 animate-ping opacity-40" />
                
                {/* Big Animated Backpack Illustration */}
                <div className="relative w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white shadow-xl">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-lg">
                    {/* Top sleeping mat */}
                    <rect x="4" y="2" width="16" height="3.5" rx="1.75" fill="currentColor" fillOpacity="0.25" stroke="currentColor" />
                    <line x1="7" y1="2" x2="7" y2="5.5" strokeWidth="1.5" />
                    <line x1="17" y1="2" x2="17" y2="5.5" strokeWidth="1.5" />
                    {/* Main backpack body */}
                    <path d="M5 7h14a2 2 0 0 1 2 2v10a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V9a2 2 0 0 1 2-2z" fill="currentColor" fillOpacity="0.1" />
                    {/* Flap & Straps */}
                    <path d="M5 7l3 5h8l3-5" strokeWidth="1.5" />
                    {/* Front zippered pouch */}
                    <rect x="7" y="13" width="10" height="6" rx="1.5" fill="currentColor" fillOpacity="0.3" stroke="currentColor" />
                    <line x1="10" y1="15" x2="14" y2="15" strokeWidth="1.5" />
                    {/* Side bottle holder */}
                    <path d="M3 12v5a1 1 0 0 0 1 1" strokeWidth="1.5" />
                    <path d="M21 12v5a1 1 0 0 1-1 1" strokeWidth="1.5" />
                  </svg>
                </div>
              </div>

              <div className="text-center pt-1">
                <p className="text-xs font-bold text-white tracking-wide" style={{ fontFamily: "var(--font-fredoka)" }}>
                  Packing Essentials
                </p>
                <p className="text-[11px] text-white/50 font-mono">
                  Camera gear · Warm layers · Map routes
                </p>
              </div>
            </div>
          )}

          {/* ── MODE 2: TRAIN SHOWCASE ── */}
          {activeMode === "train" && (
            <div className="flex flex-col items-center justify-center space-y-2 animate-in fade-in zoom-in-95 duration-500 w-full px-6">
              <div className="relative flex items-center justify-center w-full">
                
                {/* Moving Rail Tracks */}
                <div className="absolute -bottom-2 w-full h-1 bg-white/20 rounded-full overflow-hidden">
                  <div className="w-full h-full bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.8)_50%,transparent_100%)] animate-[pulse_1s_infinite]" />
                </div>

                {/* Big Animated Locomotive */}
                <div className="relative flex items-center gap-1">
                  {/* Steam Puffs */}
                  <div className="absolute -top-3 left-4 flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-ping" />
                    <span className="w-2 h-2 rounded-full bg-white/30 animate-pulse delay-100" />
                  </div>

                  {/* Engine Body */}
                  <div className="w-16 h-12 rounded-xl bg-white/15 border border-white/25 flex items-center justify-center text-white relative shadow-xl">
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="13" rx="2.5" fill="currentColor" fillOpacity="0.15" />
                      <line x1="3" y1="10" x2="21" y2="10" strokeWidth="1.5" />
                      <circle cx="7" cy="14" r="1.5" fill="currentColor" />
                      <circle cx="17" cy="14" r="1.5" fill="currentColor" />
                      <rect x="7" y="6" width="4" height="3" rx="0.5" fill="currentColor" fillOpacity="0.4" />
                      <rect x="13" y="6" width="4" height="3" rx="0.5" fill="currentColor" fillOpacity="0.4" />
                      <line x1="6" y1="18" x2="4" y2="21" strokeWidth="2" />
                      <line x1="18" y1="18" x2="20" y2="21" strokeWidth="2" />
                    </svg>

                    {/* Headlight Glow */}
                    <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-amber-400/30 rounded-full blur-sm pointer-events-none" />
                  </div>

                  {/* Trailing Coach */}
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/15 flex items-center justify-center text-white/60">
                    <div className="w-5 h-2 rounded-sm bg-white/20" />
                  </div>
                </div>
              </div>

              <div className="text-center pt-2">
                <p className="text-xs font-bold text-white tracking-wide" style={{ fontFamily: "var(--font-fredoka)" }}>
                  Cruising the Scenic Railway
                </p>
                <p className="text-[11px] text-white/50 font-mono">
                  Konkan coastlines · Himalayan mountain rails
                </p>
              </div>
            </div>
          )}

          {/* ── MODE 3: PLANE SHOWCASE ── */}
          {activeMode === "plane" && (
            <div className="flex flex-col items-center justify-center space-y-2 animate-in fade-in zoom-in-95 duration-500 w-full px-6">
              <div className="relative flex items-center justify-center">
                
                {/* Curved Vapor Trail */}
                <svg className="absolute -left-12 top-4 w-20 h-8 text-white/30 overflow-visible" fill="none">
                  <path d="M0,15 Q30,25 60,10" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                </svg>

                {/* Big Animated Jet */}
                <div className="relative w-16 h-16 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center text-white shadow-2xl rotate-6 transition-transform hover:rotate-12">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-lg">
                    <path
                      d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3.5c-.5-.5-2.5 0-4 1.5L13.5 8.5 5.3 6.7c-.8-.2-1.6.3-1.8 1.1l-.2.8 5.7 3.4-3.4 3.4-2.8-.7-.7.7 2.1 2.1 2.1 2.1.7-.7-.7-2.8 3.4-3.4 3.4 5.7.8-.2c.8-.2 1.3-1 1.1-1.8z"
                      fill="currentColor"
                      fillOpacity="0.25"
                    />
                  </svg>

                  {/* Engine Thruster Glow */}
                  <div className="absolute -left-2 bottom-2 w-3 h-3 bg-cyan-400/40 rounded-full blur-sm" />
                </div>
              </div>

              <div className="text-center pt-1">
                <p className="text-xs font-bold text-white tracking-wide" style={{ fontFamily: "var(--font-fredoka)" }}>
                  Soaring Above the Clouds
                </p>
                <p className="text-[11px] text-white/50 font-mono">
                  Snow peaks · Desert horizons · High altitudes
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Progress & Branding */}
        <div className="w-full space-y-2.5">
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="text-white/60 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Preparing your journey...</span>
            </span>
            <span className="text-white font-bold">{progress}%</span>
          </div>

          {/* Smooth Progress Bar */}
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-white/70 via-white to-white transition-all duration-300 ease-out rounded-full shadow-[0_0_8px_rgba(255,255,255,0.6)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="text-center pt-1">
            <p className="text-[10px] tracking-[0.25em] uppercase text-white/40 font-mono">
              Ashraf Siddiqui · Travel Diaries
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
