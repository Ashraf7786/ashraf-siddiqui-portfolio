"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: "24", unit: "/28", label: "Indian States Explored" },
  { value: "01", unit: null, label: "Country Explored" },
  { value: "4+", unit: null, label: "Years Travelling" },
  { value: "∞", unit: null, label: "Stories to Tell" },
];

export default function TravelStats() {
  const sectionRef = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".stat-item", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
        clearProps: "all",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="stats"
      ref={sectionRef}
      className="relative z-10 py-16 px-6 md:px-16 border-b border-[#f5f5f5]/5 bg-[#080808]"
    >
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {STATS.map((s) => (
          <div key={s.label} className="stat-item">
            <div className="flex items-baseline justify-center gap-1">
              <p
                className="text-5xl md:text-6xl font-bold text-[#f5f5f5]"
                style={{ fontFamily: "var(--font-fredoka)" }}
              >
                {s.value}
              </p>
              {s.unit && (
                <span className="text-xl font-semibold text-[#f5f5f5]/40" style={{ fontFamily: "var(--font-fredoka)" }}>
                  {s.unit}
                </span>
              )}
            </div>
            <p className="mt-2 text-xs tracking-widest uppercase text-[#f5f5f5]/40">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
