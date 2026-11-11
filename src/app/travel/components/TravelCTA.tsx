"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

gsap.registerPlugin(ScrollTrigger);

export default function TravelCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        yPercent: 20, ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: true },
      });
      gsap.from(".cta-content", {
        y: 60, opacity: 0, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="cta" ref={sectionRef} className="relative py-32 md:py-44 overflow-hidden border-t border-b border-[#f5f5f5]/5">
      <div ref={bgRef} className="absolute inset-0 w-full h-[130%] top-[-15%]">
        <Image
          src="/img/travel/rajasthan.jpg"
          alt="Rajasthan desert"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/70 via-[#080808]/60 to-[#080808]/80" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="cta-content">
          <p className="text-xs tracking-[0.3em] uppercase text-[#f5f5f5]/30 mb-6">Start your journey</p>
          <h2
            className="font-bold text-[#f5f5f5] leading-[0.95] mb-6"
            style={{ fontFamily: "var(--font-fredoka)", fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
          >
            Your Next Journey Starts Somewhere.
          </h2>
          <p className="text-[#f5f5f5]/70 text-sm md:text-base leading-relaxed mb-10 max-w-xl mx-auto">
            Whether you want to travel by train across India or join a small group trip to the mountains — the first step is simply deciding to go.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => document.querySelector("#destinations")?.scrollIntoView({ behavior: "smooth" })}
              className="px-6 py-3 border border-[#f5f5f5]/20 rounded-full text-sm text-[#f5f5f5]/80 hover:border-[#f5f5f5]/60 hover:text-[#f5f5f5] transition-all backdrop-blur-sm hover:bg-white/5 w-full sm:w-auto cursor-pointer"
            >
              Explore Travel Guides
            </button>
            <button
              onClick={() => document.querySelector("#group-tours")?.scrollIntoView({ behavior: "smooth" })}
              className="px-6 py-3 border border-[#f5f5f5]/10 rounded-full text-sm text-[#f5f5f5]/50 hover:border-[#f5f5f5]/30 hover:text-[#f5f5f5]/80 transition-all backdrop-blur-sm w-full sm:w-auto cursor-pointer"
            >
              See Upcoming Trips
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
