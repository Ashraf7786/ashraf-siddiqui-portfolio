"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

gsap.registerPlugin(ScrollTrigger);

interface TravelModeStory {
  id: string;
  label: string;
  tag: string;
  stat: string;
  title: string;
  story: string;
  highlight: string;
  icon: React.ReactNode;
}

const TRAVEL_MODES: TravelModeStory[] = [
  {
    id: "trains",
    label: "Train Journeys",
    tag: "Indian Railways",
    stat: "18,000+ KM by Train",
    title: "The real India lives on railway tracks",
    story:
      "Waking up to hot morning chai on the train, feeling the cool wind, and watching waterfalls from the open door. Train travel is peaceful, slow, and gives you great memories with people you meet along the way.",
    highlight: "Favorite Route: Mandovi Express through the green mountain tunnels of Goa",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="4" y="3" width="16" height="16" rx="2" />
        <path d="M4 11h16" />
        <path d="M12 3v8" />
        <path d="M8 19l-3 3" />
        <path d="M16 19l3 3" />
      </svg>
    ),
  },
  {
    id: "mountains",
    label: "Mountains & Snow",
    tag: "High Peaks",
    stat: "18,380 FT Highest Point",
    title: "Quiet peaks and fresh winter snow",
    story:
      "Crossing high mountain roads in cold wind, camping under the stars near quiet lakes, and walking in fresh snow in Kashmir. Mountains help you slow down, breathe clean air, and forget daily stress.",
    highlight: "Favorite Moment: Standing in fresh snow on top of Gulmarg mountain",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M8 3l4 8 5-5 5 15H2L8 3z" />
      </svg>
    ),
  },
  {
    id: "food",
    label: "Local Food",
    tag: "Street Food & Dhabas",
    stat: "500+ Cups of Chai",
    title: "Eating like a local in every state",
    story:
      "I skip big tourist cafes to eat at small road dhabas and family kitchens. From hot Kashmiri food in Srinagar to fresh rotis in Rajasthan and steamed momos in the hills.",
    highlight: "Must Try: Hot pink tea (Noon Chai) with fresh bread in Srinagar",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    ),
  },
  {
    id: "roads",
    label: "Road Trips",
    tag: "Open Roads",
    stat: "40,000+ KM Driven",
    title: "The drive is just as fun as reaching the place",
    story:
      "Driving through mountain curves in Himachal, long straight open roads in the Rajasthan desert, and peaceful sea routes. When you drive, you can stop anytime you see a small tea stall or a pretty view.",
    highlight: "Favorite Road: The quiet desert road between Jaisalmer and Longewala",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
      </svg>
    ),
  },
];

export default function AboutTraveller() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeMode, setActiveMode] = useState<TravelModeStory>(TRAVEL_MODES[0]);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-content", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 95%" },
        clearProps: "all",
      });
      gsap.from(".about-photo", {
        scale: 0.95,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 95%" },
        clearProps: "all",
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-20 sm:py-24 md:py-32 bg-[#080808] border-t border-[#f5f5f5]/5 relative overflow-hidden">
      {/* Subtle ambient lighting matching site theme */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 relative z-10">
        <div className="grid md:grid-cols-12 gap-8 sm:gap-12 md:gap-14 items-center">
          
          {/* ─── LEFT: Cinematic Photo with Live Floating Badges ─── */}
          <div className="md:col-span-5 about-photo relative max-w-md mx-auto md:max-w-none w-full">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] border border-white/10 bg-[#111113] shadow-2xl group">
              <Image
                src="/img/travel/ashraf.jpeg"
                alt="Ashraf Siddiqui - Solo Traveler and Trip Leader"
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 40vw"
                priority
              />

              {/* High-end vignette scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none" />

              {/* Top Status Pill */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] font-medium shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-white/80 animate-pulse" />
                  <span>On The Road · Jaipur Based</span>
                </div>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white/80">
                  4+ Yrs
                </span>
              </div>

              {/* Bottom Quick Bio Overlay */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-black/75 backdrop-blur-md border border-white/15 space-y-1.5">
                <div className="flex items-center justify-between">
                  <p className="text-white font-bold text-sm tracking-tight" style={{ fontFamily: "var(--font-fredoka)" }}>
                    Ashraf Siddiqui
                  </p>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-white/70 font-semibold">
                    Solo Explorer
                  </span>
                </div>
                <p className="text-[11px] text-white/70 leading-relaxed">
                  Exploring mountain trails, scenic train lines, and authentic local life across India.
                </p>
              </div>
            </div>

            {/* Progress Badge Outside Bottom Right */}
            <div className="absolute -bottom-4 -right-2 sm:-right-4 bg-[#111113] border border-white/20 rounded-2xl p-3.5 sm:p-4 shadow-2xl backdrop-blur-md">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-bold text-white" style={{ fontFamily: "var(--font-fredoka)" }}>
                  24
                </span>
                <span className="text-xs sm:text-sm text-white/50 font-bold">/ 28</span>
              </div>
              <p className="text-[9px] uppercase tracking-widest text-white/50 font-semibold mt-0.5">
                States Explored
              </p>
              <div className="w-28 h-1.5 bg-white/10 rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-white/90 to-white/40 rounded-full" style={{ width: "86%" }} />
              </div>
              <p className="text-[9px] text-white/40 font-mono mt-1 text-right">86% of India</p>
            </div>
          </div>

          {/* ─── RIGHT: Hookable Story & Interactive Travel Modes ─── */}
          <div className="md:col-span-7 about-content space-y-6 pt-4 md:pt-0">
            {/* Header Badge */}
            <div>
              <div className="inline-flex items-center gap-2 mb-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/60">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span className="text-[11px] tracking-[0.2em] uppercase text-white/60 font-semibold">
                  About The Traveler
                </span>
              </div>

              <h2
                className="text-2xl sm:text-4xl md:text-5xl font-bold text-[#f5f5f5] leading-tight"
                style={{ fontFamily: "var(--font-fredoka)" }}
              >
                Traveling real India,
                <span className="block text-white/50 font-light text-xl sm:text-3xl md:text-4xl mt-1">
                  one honest story at a time.
                </span>
              </h2>
            </div>

            <p className="text-[#f5f5f5]/75 text-xs sm:text-sm leading-relaxed max-w-xl">
              I travel to see real places, meet kind people, and share honest experiences. Over 4+ years across 24 Indian states, I keep every journey simple, safe, and true.
            </p>

            {/* ─── INTERACTIVE TRAVEL MODE TABS ─── */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[11px] text-white/40 uppercase tracking-wider font-semibold">
                <span>Select a travel style to see stories:</span>
                <span className="text-white/60 font-mono">{activeMode.stat}</span>
              </div>

              {/* Selector Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {TRAVEL_MODES.map((mode) => {
                  const isActive = activeMode.id === mode.id;
                  return (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => setActiveMode(mode)}
                      className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        isActive
                          ? "bg-white text-black border-white shadow-lg scale-[1.02]"
                          : "bg-white/[0.03] text-white/70 border-white/10 hover:border-white/25 hover:text-white"
                      }`}
                    >
                      <span className={isActive ? "text-black" : "text-white/60"}>{mode.icon}</span>
                      <span className="truncate">{mode.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Interactive Story Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2.5 animate-in fade-in duration-300">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/10 text-white/90 border border-white/10 font-bold uppercase tracking-wider">
                    {activeMode.tag}
                  </span>
                  <span className="text-xs font-bold text-white font-mono">
                    {activeMode.stat}
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-white" style={{ fontFamily: "var(--font-fredoka)" }}>
                  {activeMode.title}
                </h3>

                <p className="text-xs text-[#f5f5f5]/70 leading-relaxed">
                  {activeMode.story}
                </p>

                <div className="pt-2 border-t border-white/5 flex items-center gap-2 text-[11px] text-white/50 font-medium">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-white/60 shrink-0">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="truncate">{activeMode.highlight}</span>
                </div>
              </div>
            </div>

            {/* ─── QUICK TRIVIA / FACTS STRIP ─── */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3 text-center">
              <div className="p-2.5 sm:p-3 rounded-xl bg-white/[0.02] border border-white/10">
                <span className="text-[10px] uppercase text-white/40 tracking-wider block font-semibold">
                  Bag Weight
                </span>
                <span className="text-xs sm:text-sm font-bold text-white mt-0.5 block" style={{ fontFamily: "var(--font-fredoka)" }}>
                  8.5 KG
                </span>
                <span className="text-[9px] text-white/40">2-week gear</span>
              </div>

              <div className="p-2.5 sm:p-3 rounded-xl bg-white/[0.02] border border-white/10">
                <span className="text-[10px] uppercase text-white/40 tracking-wider block font-semibold">
                  Simple Rule
                </span>
                <span className="text-xs sm:text-sm font-bold text-white mt-0.5 block" style={{ fontFamily: "var(--font-fredoka)" }}>
                  Zero Fake Ads
                </span>
                <span className="text-[9px] text-white/40">100% honest</span>
              </div>

              <div className="p-2.5 sm:p-3 rounded-xl bg-white/[0.02] border border-white/10">
                <span className="text-[10px] uppercase text-white/40 tracking-wider block font-semibold">
                  Next Goal
                </span>
                <span className="text-xs sm:text-sm font-bold text-white mt-0.5 block" style={{ fontFamily: "var(--font-fredoka)" }}>
                  All 28 States
                </span>
                <span className="text-[9px] text-white/40">4 left to visit</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => document.querySelector("#interactive-map")?.scrollIntoView({ behavior: "smooth" })}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-white text-black font-bold text-xs hover:bg-[#eaeaea] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>See My 24 States Map</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 5v14M19 12l-7 7-7-7" />
                </svg>
              </button>

              <a
                href="mailto:ashrafsiddiquitravel@gmail.com?subject=Travel%20Question%20for%20Ashraf"
                className="w-full sm:w-auto px-5 py-3 rounded-full border border-white/20 text-white/80 hover:text-white hover:border-white/50 hover:bg-white/5 text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span>Send Ashraf an Email</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
