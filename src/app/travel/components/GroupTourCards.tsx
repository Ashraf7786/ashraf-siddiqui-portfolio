"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

gsap.registerPlugin(ScrollTrigger);

const GROUP_TOURS = [
  {
    id: 1,
    name: "Kashmir Group Expedition 2026",
    destination: "Kashmir Valley",
    image: "/img/travel/kashmir_hero.jpg",
    dates: "May 15 – May 22, 2026",
    duration: "8 Days / 7 Nights",
    price: "₹24,999",
    seats: 12,
    seatsLeft: 4,
    color: "#3b82f6",
    badge: "Almost Full",
    highlights: ["Gulmarg Gondola", "Pahalgam Trek", "Dal Lake Houseboat", "Sonmarg Meadows", "Betaab Valley"],
  },
];

export default function GroupTourCards() {
  const sectionRef = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".group-header", {
        y: 50, opacity: 0, duration: 1.0, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });
      gsap.from(".group-card", {
        scale: 0.95, opacity: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="group-tours" ref={sectionRef} className="py-20 sm:py-24 px-4 sm:px-6 md:px-16 border-t border-[#f5f5f5]/5 bg-[#080808]">
      <div className="max-w-6xl mx-auto">
        <div className="group-header mb-10 sm:mb-16">
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/60">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            <p className="text-[11px] sm:text-xs tracking-[0.25em] uppercase text-[#f5f5f5]/30">Join the Journey</p>
          </div>
          <h2
            className="text-4xl sm:text-5xl md:text-7xl font-bold text-[#f5f5f5]"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            Group Tours
          </h2>
          <p className="mt-3 sm:mt-4 text-[#f5f5f5]/40 max-w-lg text-xs sm:text-sm leading-relaxed">
            Travel isn&apos;t just about places — it&apos;s about the people you meet along the way. Join one of Ashraf&apos;s curated group expeditions.
          </p>
        </div>

        <div className="flex flex-col gap-8">
          {GROUP_TOURS.map((tour) => (
            <div key={tour.id} className="group-card group relative rounded-3xl overflow-hidden border border-[#f5f5f5]/10 bg-[#111113]">
              <div className="md:grid md:grid-cols-2">
                <div className="relative h-60 sm:h-72 md:h-auto overflow-hidden">
                  <Image
                    src={tour.image}
                    alt={tour.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#111113] hidden md:block" />
                  <div className="absolute top-4 left-4">
                    <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 flex items-center gap-1.5">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2c1.5 3 4 5.5 4 8.5 0 3.5-2.5 6.5-6 6.5s-6-3-6-6.5C4 7.5 6.5 5 8 2c.5 2 1.5 3.5 2 4.5.5-1 1.5-2.5 2-4.5z"/>
                      </svg>
                      {tour.badge}
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-3 sm:mb-4">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: tour.color }} />
                      <span className="text-xs tracking-widest uppercase text-[#f5f5f5]/30">{tour.destination}</span>
                    </div>
                    <h3
                      className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#f5f5f5] mb-2"
                      style={{ fontFamily: "var(--font-fredoka)" }}
                    >
                      {tour.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#f5f5f5]/40 mb-5 sm:mb-6">{tour.dates} &nbsp;·&nbsp; {tour.duration}</p>

                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-5 sm:mb-6">
                      {tour.highlights.map((h) => (
                        <span key={h} className="text-[11px] sm:text-xs px-2.5 sm:px-3 py-1 rounded-full bg-[#f5f5f5]/5 text-[#f5f5f5]/60 border border-[#f5f5f5]/10 flex items-center gap-1.5">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-emerald-400">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                          <span>{h}</span>
                        </span>
                      ))}
                    </div>

                    <div className="mb-5 sm:mb-6">
                      <div className="flex items-center justify-between text-xs text-[#f5f5f5]/40 mb-2">
                        <span>Seats Available</span>
                        <span className="text-[#f59e0b] font-medium">{tour.seatsLeft} / {tour.seats} left</span>
                      </div>
                      <div className="h-1.5 bg-[#f5f5f5]/10 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#f59e0b] to-[#ef4444]"
                          style={{ width: `${((tour.seats - tour.seatsLeft) / tour.seats) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4 flex-wrap pt-2 border-t border-[#f5f5f5]/5">
                    <div>
                      <p className="text-[10px] text-[#f5f5f5]/30 uppercase tracking-widest">Starting from</p>
                      <p
                        className="text-3xl sm:text-4xl font-bold text-[#f5f5f5]"
                        style={{ fontFamily: "var(--font-fredoka)" }}
                      >
                        {tour.price}
                        <span className="text-xs text-[#f5f5f5]/40 font-normal"> /person</span>
                      </p>
                    </div>
                    <button
                      onClick={() => document.querySelector("#newsletter")?.scrollIntoView({ behavior: "smooth" })}
                      className="px-6 sm:px-8 py-3 rounded-full text-xs sm:text-sm font-semibold text-[#080808] transition-all hover:scale-105 flex items-center gap-2"
                      style={{ backgroundColor: tour.color }}
                    >
                      <span>Register Interest</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="5" y1="12" x2="19" y2="12"/>
                        <polyline points="12 5 19 12 12 19"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
