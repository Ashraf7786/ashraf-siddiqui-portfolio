"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

gsap.registerPlugin(ScrollTrigger);

const INDIA_REGIONS = [
  { name: "North", states: ["J&K", "HP", "Punjab", "Haryana", "UK", "UP", "Delhi"] },
  { name: "West", states: ["Rajasthan", "Gujarat", "Maharashtra", "Goa"] },
  { name: "South", states: ["Karnataka", "Kerala", "Tamil Nadu", "AP", "Telangana"] },
  { name: "East", states: ["WB", "Odisha", "Bihar", "Jharkhand"] },
  { name: "Northeast", states: ["Assam", "Meghalaya", "Manipur", "Mizoram", "Nagaland", "Tripura", "Arunachal", "Sikkim"] },
  { name: "Central", states: ["MP", "Chhattisgarh"] },
];

export default function IndiaMapPreview() {
  const sectionRef = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".map-content", {
        y: 60,
        opacity: 0,
        duration: 1.0,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });
      gsap.from(".region-pill", {
        scale: 0.85,
        opacity: 0,
        duration: 0.6,
        stagger: 0.06,
        ease: "power3.out",
        scrollTrigger: { trigger: ".regions-grid", start: "top 85%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="py-24 md:py-32 bg-[#0d0d10] border-t border-b border-[#f5f5f5]/5"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="map-content grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left: text */}
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-[#f5f5f5]/30 mb-4">
              My India Journey
            </p>
            <h2
              className="font-bold text-[#f5f5f5] leading-[1.05] mb-6"
              style={{ fontFamily: "var(--font-fredoka)", fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              24 states explored, countless stories collected.
            </h2>
            <p className="text-[#f5f5f5]/50 text-sm leading-relaxed mb-8 max-w-md">
              From the snow-capped passes of Ladakh to the backwaters of Kerala, every state holds a chapter. The map fills one state at a time.
            </p>

            {/* Progress bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-[#f5f5f5]/50">States explored</span>
                <span className="text-[#f5f5f5]/80 font-semibold">24 / 28</span>
              </div>
              <div className="h-1.5 bg-[#f5f5f5]/10 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#f5f5f5]/60"
                  style={{ width: `${(24 / 28) * 100}%` }}
                />
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-[10px] text-[#f5f5f5]/30">4 states remaining</span>
                <span className="text-[10px] text-[#f5f5f5]/30">85.7%</span>
              </div>
            </div>

            <div className="flex items-center gap-6 text-xs text-[#f5f5f5]/40 mb-8">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm bg-[#f5f5f5]/60" />
                Visited (24)
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm bg-[#f5f5f5]/10 border border-[#f5f5f5]/20" />
                Remaining (4)
              </span>
            </div>

            <button
              onClick={() => document.querySelector("#destinations")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center gap-2 px-6 py-3 border border-[#f5f5f5]/20 rounded-full text-sm text-[#f5f5f5]/80 hover:border-[#f5f5f5]/60 hover:text-[#f5f5f5] transition-all backdrop-blur-sm hover:bg-white/5"
            >
              Explore Destinations
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Right: map placeholder */}
          <div className="relative rounded-2xl overflow-hidden border border-[#f5f5f5]/10 bg-[#111113] p-6 aspect-[3/4]">
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-20">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#f5f5f5" strokeWidth="1">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                <circle cx="12" cy="9" r="2.5"/>
              </svg>
              <p className="text-xs text-[#f5f5f5]/50 text-center max-w-[160px]">
                Interactive India map · Phase 2
              </p>
            </div>

            <div className="regions-grid relative z-10 grid grid-cols-2 gap-2 h-full content-start pt-2">
              {INDIA_REGIONS.map((region) => (
                <div key={region.name} className="region-pill">
                  <p className="text-[9px] text-[#f5f5f5]/30 tracking-widest uppercase mb-1.5 font-semibold">
                    {region.name}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {region.states.map((s) => (
                      <span
                        key={s}
                        className="text-[9px] px-1.5 py-0.5 rounded bg-[#f5f5f5]/5 text-[#f5f5f5]/50 border border-[#f5f5f5]/10"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
              <span className="text-[9px] tracking-[0.2em] uppercase text-[#f5f5f5]/30 bg-[#111113] px-3 py-1 rounded-full border border-[#f5f5f5]/10">
                Full map · Phase 2
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
