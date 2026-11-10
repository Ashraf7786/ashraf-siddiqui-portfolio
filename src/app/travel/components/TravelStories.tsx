"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { TRAVEL_STORIES } from "../data/stories";

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = [
  { id: "all", label: "All Stories" },
  { id: "Mountain Stories", label: "Mountain Stories" },
  { id: "Road Adventures", label: "Road Adventures" },
  { id: "Hidden India", label: "Hidden India" },
  { id: "Northeast Trails", label: "Northeast Trails" },
];

export default function TravelStories() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered =
    activeCategory === "all"
      ? TRAVEL_STORIES
      : TRAVEL_STORIES.filter((s) => s.category === activeCategory);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".stories-header", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useIsomorphicLayoutEffect(() => {
    gsap.from(".story-card-item", {
      y: 30,
      opacity: 0,
      duration: 0.5,
      stagger: 0.08,
      ease: "power3.out",
    });
  }, [activeCategory]);

  return (
    <section id="stories" className="py-16 sm:py-24 md:py-32 bg-[#080808] border-t border-b border-[#f5f5f5]/5">
      <div ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        {/* Header */}
        <div className="stories-header flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#f5f5f5]/50">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
              </svg>
              <p className="text-[11px] sm:text-xs tracking-[0.25em] uppercase text-[#f5f5f5]/40 font-medium">
                Stories From The Road
              </p>
            </div>
            <h2
              className="text-3xl sm:text-5xl md:text-6xl font-bold text-[#f5f5f5] leading-tight"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              Every journey has a story
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#f5f5f5]/50 max-w-lg">
              Real accounts from the road — no embellishments, no commercial filters.
            </p>
          </div>

          <Link
            href="/travel/stories"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#f5f5f5] hover:text-white transition-all self-start md:self-auto px-4 py-2 rounded-full border border-[#f5f5f5]/20 hover:border-[#f5f5f5]/60 bg-transparent hover:bg-white/5"
          >
            <span>Browse All Stories</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                activeCategory === cat.id
                  ? "bg-[#f5f5f5] text-[#080808] font-bold shadow-md"
                  : "bg-[#111113] text-[#f5f5f5]/50 hover:text-white border border-[#f5f5f5]/10 hover:border-[#f5f5f5]/20"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.slice(0, 4).map((story, i) => (
            <Link
              key={story.id}
              href={`/travel/stories/${story.slug}`}
              className={`story-card-item group relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#f5f5f5]/10 bg-[#111113] cursor-pointer hover:border-[#f5f5f5]/30 transition-all duration-300 hover:-translate-y-1 ${
                i === 0 && filtered.length > 2 ? "md:col-span-2 md:grid md:grid-cols-12" : ""
              }`}
            >
              <div
                className={`relative overflow-hidden ${
                  i === 0 && filtered.length > 2
                    ? "md:col-span-7 h-56 md:h-full min-h-[260px]"
                    : "h-56"
                }`}
              >
                <Image
                  src={story.coverImage}
                  alt={story.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#111113] via-transparent to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="text-[9px] uppercase tracking-wider font-semibold px-2.5 py-0.5 rounded-full bg-black/60 text-[#f5f5f5] backdrop-blur-md border border-[#f5f5f5]/10">
                    {story.category}
                  </span>
                </div>
              </div>

              <div
                className={`p-6 flex flex-col justify-between ${
                  i === 0 && filtered.length > 2 ? "md:col-span-5" : ""
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 text-[10px] text-[#f5f5f5]/40 mb-2">
                    <span className="text-[#f5f5f5]/70 font-medium">{story.destination}</span>
                    <span>·</span>
                    <span>{story.year}</span>
                    <span>·</span>
                    <span>{story.readTime}</span>
                  </div>

                  <h3
                    className="text-lg sm:text-xl font-bold text-[#f5f5f5] leading-snug mb-2 group-hover:text-white transition-colors"
                    style={{ fontFamily: "var(--font-fredoka)" }}
                  >
                    {story.title}
                  </h3>

                  <p className="text-xs text-[#f5f5f5]/50 leading-relaxed line-clamp-3 mb-4">
                    {story.excerpt}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {story.tags.slice(0, 3).map((t) => (
                      <span key={t} className="text-[9px] px-2 py-0.5 rounded-full bg-[#f5f5f5]/5 text-[#f5f5f5]/40 border border-[#f5f5f5]/10">
                        #{t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-[#f5f5f5]/10 text-xs font-semibold text-[#f5f5f5]/80 group-hover:text-white group-hover:translate-x-1 transition-all">
                    <span>Read full story</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12"/>
                      <polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
