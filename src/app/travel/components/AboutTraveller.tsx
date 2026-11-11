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
    tag: "IRCTC & Sleeper Coaches",
    stat: "18,000+ KM by Rail",
    title: "The real India lives on railway tracks",
    story:
      "From waking up to early morning chai calls on the Konkan Railway to crossing the Dudhsagar waterfall mist from an open sleeper coach door. Train travel teaches you patience and gives you conversations you never forget.",
    highlight: "Favorite Route: Mandovi Express through the Western Ghats tunnels",
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
    label: "High Passes",
    tag: "Alpine Snow & Trails",
    stat: "18,380 FT Highest Altitude",
    title: "Quiet peaks and sub-zero winter trails",
    story:
      "Crossing Khardung La in freezing winds, camping under the clear Milky Way at Chandratal Lake, and exploring frozen waterfalls in Kashmir at -15°C. The mountains strip away stress and show you how grand nature truly is.",
    highlight: "Memorable Moment: Standing alone on Apharwat Peak in fresh winter snow",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M8 3l4 8 5-5 5 15H2L8 3z" />
      </svg>
    ),
  },
  {
    id: "food",
    label: "Local Food",
    tag: "Street Flavors & Dhabas",
    stat: "500+ Kulhad Chais",
    title: "Finding the soul of a state through its food",
    story:
      "Skipping fancy tourist cafes for highway dhabas, local family kitchens, and bustling street stalls. From traditional Kashmiri Wazwan in Srinagar to spicy Ker Sangri in the Thar desert and hot momos in Meghalaya.",
    highlight: "Top Recommendation: Noon Chai with freshly baked Girda bread in Srinagar",
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
    tag: "Highways & Hidden Trails",
    stat: "40,000+ KM Driven",
    title: "The journey is just as exciting as the destination",
    story:
      "Navigating dirt switchbacks in Himachal, endless straight tarmac across Rajasthan's salt flats, and coastal drives along the Arabian Sea. Having your own wheels means you can stop wherever a village market or river calls.",
    highlight: "Favorite Highway: The desolate stretch between Jaisalmer and Longewala",
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
    <section id="about" ref={sectionRef} className="py-20 sm:py-24 md:py-32 bg-[#09090c] border-t border-[#f5f5f5]/5 relative overflow-hidden">
      {/* Subtle ambient gradient */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 relative z-10">
        <div className="grid md:grid-cols-12 gap-8 sm:gap-12 md:gap-14 items-center">
          
          {/* ─── LEFT: Cinematic Photo with Live Floating Badges ─── */}
          <div className="md:col-span-5 about-photo relative max-w-md mx-auto md:max-w-none w-full">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] border border-white/15 bg-[#111113] shadow-2xl group">
              <Image
                src="/img/travel/ashraf.jpeg"
                alt="Ashraf Siddiqui - Solo Traveller & Trip Leader"
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
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
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
                  <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-400 font-semibold">
                    Leader &amp; Explorer
                  </span>
                </div>
                <p className="text-[11px] text-white/70 leading-relaxed">
                  Software engineer during weekdays, wandering remote mountain passes and rail routes on weekends.
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
                <div className="h-full bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full" style={{ width: "86%" }} />
              </div>
              <p className="text-[9px] text-white/40 font-mono mt-1 text-right">86% of India</p>
            </div>
          </div>

          {/* ─── RIGHT: Hookable Story & Interactive Travel Modes ─── */}
          <div className="md:col-span-7 about-content space-y-6 pt-4 md:pt-0">
            {/* Header Badge */}
            <div>
              <div className="inline-flex items-center gap-2 mb-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-400">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span className="text-[11px] tracking-[0.2em] uppercase text-white/60 font-semibold">
                  Meet The Traveller
                </span>
              </div>

              <h2
                className="text-2xl sm:text-4xl md:text-5xl font-bold text-[#f5f5f5] leading-tight"
                style={{ fontFamily: "var(--font-fredoka)" }}
              >
                Software Engineer by day.
                <span className="block text-white/50 font-light text-xl sm:text-3xl md:text-4xl mt-1">
                  Explorer of real India by heart.
                </span>
              </h2>
            </div>

            <p className="text-[#f5f5f5]/75 text-xs sm:text-sm leading-relaxed max-w-xl">
              I don&apos;t travel to take posed photos or promote sponsored hotels. Over 4+ years across 24 Indian states, I travel to discover real people, mountain villages, and authentic stories.
            </p>

            {/* ─── INTERACTIVE TRAVEL MODE TABS ─── */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[11px] text-white/40 uppercase tracking-wider font-semibold">
                <span>Select a travel style to explore:</span>
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
              <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/15 space-y-2.5 animate-in fade-in duration-300">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/10 text-white/90 border border-white/10 font-bold uppercase tracking-wider">
                    {activeMode.tag}
                  </span>
                  <span className="text-xs font-bold text-emerald-400 font-mono">
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
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-emerald-400 shrink-0">
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
                  Pack Weight
                </span>
                <span className="text-xs sm:text-sm font-bold text-white mt-0.5 block" style={{ fontFamily: "var(--font-fredoka)" }}>
                  8.5 KG
                </span>
                <span className="text-[9px] text-white/40">14-day gear</span>
              </div>

              <div className="p-2.5 sm:p-3 rounded-xl bg-white/[0.02] border border-white/10">
                <span className="text-[10px] uppercase text-white/40 tracking-wider block font-semibold">
                  Rule of Travel
                </span>
                <span className="text-xs sm:text-sm font-bold text-white mt-0.5 block" style={{ fontFamily: "var(--font-fredoka)" }}>
                  Zero Fake Ads
                </span>
                <span className="text-[9px] text-white/40">100% honest</span>
              </div>

              <div className="p-2.5 sm:p-3 rounded-xl bg-white/[0.02] border border-white/10">
                <span className="text-[10px] uppercase text-white/40 tracking-wider block font-semibold">
                  Next Milestone
                </span>
                <span className="text-xs sm:text-sm font-bold text-white mt-0.5 block" style={{ fontFamily: "var(--font-fredoka)" }}>
                  All 28 States
                </span>
                <span className="text-[9px] text-white/40">4 remaining</span>
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
                href="https://wa.me/919876543210?text=Hi%20Ashraf,%20loved%20your%20travel%20stories!%20Wanted%20to%20ask%20you%20about%20traveling%20in%20India."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-3 rounded-full border border-white/20 text-white/80 hover:text-white hover:border-white/50 hover:bg-white/5 text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <span>Ask Ashraf a Question</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
