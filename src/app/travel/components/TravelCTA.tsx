"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

gsap.registerPlugin(ScrollTrigger);

interface TripVibe {
  id: string;
  name: string;
  badge: string;
  destinations: string;
  highlights: string[];
  bestTime: string;
  idealFor: string;
}

const TRIP_VIBES: TripVibe[] = [
  {
    id: "snow",
    name: "Snow & Alpine Peaks",
    badge: "Winter Expedition",
    destinations: "Kashmir · Gulmarg · Sonmarg",
    highlights: ["Frozen Dal Lake & cedar houseboats", "14,000-ft Apharwat gondola ride", "Hot saffron Kehwa by pine fires"],
    bestTime: "Dec to March",
    idealFor: "Snow lovers, solo explorers, small groups",
  },
  {
    id: "desert",
    name: "Desert & Starlight",
    badge: "Desert Trails",
    destinations: "Jaisalmer · Sam Dunes · Longewala",
    highlights: ["Sleeping under clear desert skies", "Golden sandstone fort walks", "Fresh Ker Sangri & bajra roti dhabas"],
    bestTime: "Oct to March",
    idealFor: "Stargazers, photographers, road-trippers",
  },
  {
    id: "monsoon",
    name: "Rainforests & Waterfalls",
    badge: "Lush Green Trails",
    destinations: "Meghalaya · Cherrapunji · Dawki",
    highlights: ["3,000-step living root bridges", "Crystal clear river boating", "Hidden natural rock pools"],
    bestTime: "July to November",
    idealFor: "Trekkers, nature seekers, explorers",
  },
  {
    id: "rail",
    name: "Heritage & Coastal Rail",
    badge: "Iconic Rail Journey",
    destinations: "Konkan Route · Goa · Gokarna",
    highlights: ["Dudhsagar waterfall spray from train door", "Sunset Arabian sea cliff walks", "Authentic coastal cuisine"],
    bestTime: "All Year Round",
    idealFor: "Train enthusiasts, quiet wanderers",
  },
];

export default function TravelCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [activeVibe, setActiveVibe] = useState<TripVibe>(TRIP_VIBES[0]);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: true },
      });
      gsap.from(".cta-content", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="cta" ref={sectionRef} className="relative py-24 sm:py-32 md:py-40 overflow-hidden border-t border-b border-[#f5f5f5]/10 bg-[#080808]">
      {/* Background Image with Parallax & Scrim */}
      <div ref={bgRef} className="absolute inset-0 w-full h-[125%] top-[-12%] pointer-events-none">
        <Image
          src="/img/travel/rajasthan.jpg"
          alt="Rajasthan desert sunset"
          fill
          className="object-cover object-center opacity-30 scale-105"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/90 via-[#080808]/80 to-[#080808]/95" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="cta-content space-y-10 sm:space-y-12">
          
          {/* Top Pill & Main Headline */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white/80 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-white/80 animate-pulse" />
              <span>Small-Group Expeditions · 10 to 12 Travelers Max</span>
            </div>

            <h2
              className="text-3xl sm:text-5xl md:text-6xl font-bold text-[#f5f5f5] tracking-tight leading-[1.08]"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              Stop waiting for the perfect time.
              <span className="block text-white/50 font-light text-2xl sm:text-4xl md:text-5xl mt-1">
                Your next journey starts here.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-[#f5f5f5]/70 leading-relaxed max-w-2xl mx-auto">
              Whether you want to climb alpine passes, sleep under desert stars, or take scenic trains through the hills — you don&apos;t have to figure it all out alone.
            </p>
          </div>

          {/* ─── INTERACTIVE TRIP VIBE EXPLORER ─── */}
          <div className="rounded-3xl bg-[#111113]/90 backdrop-blur-xl border border-white/10 p-5 sm:p-7 md:p-8 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
              <div>
                <p className="text-xs uppercase tracking-wider text-white/50 font-semibold font-mono">
                  Pick your travel style
                </p>
                <p className="text-sm text-[#f5f5f5] font-medium">
                  See where we explore and what the journey feels like:
                </p>
              </div>
              <span className="text-[11px] text-white/40 font-mono">
                Click any tab below
              </span>
            </div>

            {/* Vibe Selection Tabs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
              {TRIP_VIBES.map((vibe) => {
                const isActive = activeVibe.id === vibe.id;
                return (
                  <button
                    key={vibe.id}
                    type="button"
                    onClick={() => setActiveVibe(vibe)}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      isActive
                        ? "bg-white text-black border-white shadow-lg scale-[1.02]"
                        : "bg-white/[0.03] text-white/70 border-white/10 hover:border-white/25 hover:text-white"
                    }`}
                  >
                    <span className={`text-[10px] font-mono uppercase tracking-wider block font-semibold ${isActive ? "text-black/60" : "text-white/40"}`}>
                      {vibe.badge}
                    </span>
                    <span className="text-xs sm:text-sm font-bold block mt-1 leading-snug" style={{ fontFamily: "var(--font-fredoka)" }}>
                      {vibe.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Dynamic Card for Selected Vibe */}
            <div className="p-4 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-xs text-white/40 uppercase tracking-wider font-semibold font-mono">
                    Destinations
                  </span>
                  <p className="text-base sm:text-lg font-bold text-[#f5f5f5]" style={{ fontFamily: "var(--font-fredoka)" }}>
                    {activeVibe.destinations}
                  </p>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <div className="px-3 py-1 rounded-full bg-white/5 text-white/80 border border-white/10 font-mono">
                    Best Time: {activeVibe.bestTime}
                  </div>
                </div>
              </div>

              {/* Key Highlights */}
              <div className="grid sm:grid-cols-3 gap-2.5 pt-2">
                {activeVibe.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 p-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-white/80">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-white/60 shrink-0 mt-0.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-white/10 text-xs">
                <span className="text-white/60">
                  <strong className="text-white">Ideal For:</strong> {activeVibe.idealFor}
                </span>

                <button
                  type="button"
                  onClick={() => document.querySelector("#group-tours")?.scrollIntoView({ behavior: "smooth" })}
                  className="inline-flex items-center gap-1.5 text-white hover:text-white/80 font-semibold cursor-pointer underline-offset-4 hover:underline"
                >
                  <span>View upcoming group dates for this</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* ─── 3 SIMPLE TRUST PILLARS ─── */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 space-y-1">
                <div className="flex items-center gap-2 text-white font-semibold text-xs">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/70">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  <span>10–12 Travelers Only</span>
                </div>
                <p className="text-[11px] text-white/50 leading-relaxed">
                  No huge crowds or rushed buses. Just real people making genuine travel memories.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 space-y-1">
                <div className="flex items-center gap-2 text-white font-semibold text-xs">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/70">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                  <span>Handpicked Local Stays</span>
                </div>
                <p className="text-[11px] text-white/50 leading-relaxed">
                  Warm family homestays, cedar houseboats, and mountain lodges with home-cooked meals.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 space-y-1">
                <div className="flex items-center gap-2 text-white font-semibold text-xs">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/70">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 8v4" />
                    <path d="M12 16h.01" />
                  </svg>
                  <span>Zero Fake Gimmicks</span>
                </div>
                <p className="text-[11px] text-white/50 leading-relaxed">
                  Clear day-by-day plans, honest guidance, and complete freedom to enjoy your journey.
                </p>
              </div>
            </div>

            {/* ─── CALL TO ACTION BUTTONS (EMAIL ONLY, NO WHATSAPP) ─── */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
              <button
                type="button"
                onClick={() => document.querySelector("#group-tours")?.scrollIntoView({ behavior: "smooth" })}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white text-black font-bold text-xs sm:text-sm hover:bg-[#eaeaea] transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Browse Upcoming Group Trips</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>

              <a
                href="mailto:ashrafsiddiquitravel@gmail.com?subject=Travel%20Inquiry%20with%20Ashraf"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40 text-white text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg backdrop-blur-md"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span>Email: ashrafsiddiquitravel@gmail.com</span>
              </a>

              <button
                type="button"
                onClick={() => document.querySelector("#interactive-map")?.scrollIntoView({ behavior: "smooth" })}
                className="w-full sm:w-auto px-5 py-3.5 rounded-full border border-white/10 text-white/60 hover:text-white hover:border-white/30 text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>View 28 States Map</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M19 12l-7 7-7-7" />
                </svg>
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}