"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

gsap.registerPlugin(ScrollTrigger);

export default function AboutTraveller() {
  const sectionRef = useRef<HTMLElement>(null);

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

  const PHILOSOPHY_PILLARS = [
    {
      label: "Train Journeys",
      desc: "Traveling across India by train is an adventure of its own.",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/80">
          <rect x="4" y="3" width="16" height="16" rx="2" />
          <path d="M4 11h16" />
          <path d="M12 3v8" />
          <path d="M8 19l-3 3" />
          <path d="M16 19l3 3" />
        </svg>
      ),
    },
    {
      label: "Mountains & Passes",
      desc: "Quiet trails, cool mountain air, and snowy peaks.",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-400">
          <path d="M8 3l4 8 5-5 5 15H2L8 3z" />
        </svg>
      ),
    },
    {
      label: "Culture & Local Food",
      desc: "Every Indian state has unique food, stories, and warm people.",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-rose-400">
          <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
          <line x1="8" y1="2" x2="8" y2="18" />
          <line x1="16" y1="6" x2="16" y2="22" />
        </svg>
      ),
    },
    {
      label: "Road Trips",
      desc: "The road itself is just as exciting as the destination.",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-400">
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
        </svg>
      ),
    },
  ];

  return (
    <section id="about" ref={sectionRef} className="py-20 sm:py-24 md:py-32 bg-[#0d0d10] border-t border-[#f5f5f5]/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 md:gap-20 items-center">
          {/* Photo */}
          <div className="about-photo relative max-w-sm mx-auto md:max-w-none w-full">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] border border-[#f5f5f5]/10 bg-[#111113]">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#f5f5f5]/5 border border-[#f5f5f5]/10 flex items-center justify-center">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#f5f5f5]/40">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <p className="text-xs text-[#f5f5f5]/30">Profile photo</p>
              </div>
              <Image
                src="/img/travel/ashraf.jpeg"
                alt="Ashraf Siddiqui"
                fill
                className="object-cover opacity-15"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="absolute -bottom-3 -right-2 sm:-bottom-4 sm:-right-4 bg-[#111113] border border-[#f5f5f5]/10 rounded-2xl px-4 sm:px-5 py-2.5 sm:py-3 shadow-xl">
              <p className="text-xl sm:text-2xl font-bold text-[#f5f5f5]" style={{ fontFamily: "var(--font-fredoka)" }}>
                24<span className="text-xs sm:text-sm text-[#f5f5f5]/40">/28</span>
              </p>
              <p className="text-[9px] tracking-widest uppercase text-[#f5f5f5]/40 mt-0.5">States Explored</p>
            </div>
          </div>

          {/* Text */}
          <div className="about-content">
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-400">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <p className="text-[11px] sm:text-xs tracking-[0.25em] uppercase text-[#f5f5f5]/40 font-semibold">About Ashraf</p>
            </div>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#f5f5f5] mb-4 sm:mb-6"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              Ashraf Siddiqui
            </h2>
            <p className="text-[#f5f5f5]/70 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
              Based in Jaipur, Rajasthan — Ashraf is a software engineer and an active traveler. Over 4+ years of traveling across India, he has explored 24 of 28 Indian states, taking scenic train routes, driving through mountain passes, and meeting local communities.
            </p>
            <p className="text-[#f5f5f5]/70 text-xs sm:text-sm leading-relaxed mb-6 sm:mb-8">
              He believes in real, honest travel — no fake plans, no paid promotions. Just simple journeys, good conversations, and exploring India the way it truly is.
            </p>

            <div className="flex flex-col gap-2 sm:gap-2.5 mb-6 sm:mb-8">
              {PHILOSOPHY_PILLARS.map((item) => (
                <div key={item.label} className="flex items-start gap-3 p-2.5 sm:p-3 rounded-xl bg-[#f5f5f5]/3 border border-[#f5f5f5]/5">
                  <div className="mt-0.5 shrink-0">{item.icon}</div>
                  <div>
                    <p className="text-xs font-semibold text-[#f5f5f5] mb-0.5">{item.label}</p>
                    <p className="text-[11px] text-[#f5f5f5]/40">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => document.querySelector("#journey")?.scrollIntoView({ behavior: "smooth" })}
              className="px-5 sm:px-6 py-2.5 sm:py-3 border border-[#f5f5f5]/20 rounded-full text-xs sm:text-sm text-[#f5f5f5]/80 hover:border-[#f5f5f5]/60 hover:text-[#f5f5f5] transition-all backdrop-blur-sm hover:bg-white/5 inline-flex items-center gap-2"
            >
              <span>Explore My Journey</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
