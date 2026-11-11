"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

gsap.registerPlugin(ScrollTrigger);

const DESTINATIONS = [
  {
    id: 1,
    slug: "kashmir",
    name: "Kashmir",
    tagline: "Heaven on Earth",
    region: "North India",
    image: "/img/travel/kashmir_hero.jpg",
    description: "Where the Himalayas meet Dal Lake and snow-covered meadows stretch to the horizon. Kashmir is not a place — it is a feeling.",
    tags: ["Mountains", "Lakes", "Snow"],
  },
  {
    id: 2,
    slug: "ladakh",
    name: "Ladakh",
    tagline: "Land of High Passes",
    region: "North India",
    image: "/img/travel/ladakh.jpg",
    description: "Pangong's deep blue waters, Khardung La's fresh mountain air, and clear starry night skies. Ladakh shows you the true scale and beauty of the Himalayas.",
    tags: ["High Altitude", "Monasteries", "Desert"],
  },
  {
    id: 3,
    slug: "rajasthan",
    name: "Rajasthan",
    tagline: "The Land of Kings",
    region: "West India",
    image: "/img/travel/rajasthan.jpg",
    description: "Desert safaris in Jaisalmer, historical forts, and the colorful streets of Jodhpur and Jaipur — Rajasthan is full of culture and warmth.",
    tags: ["Desert", "Forts", "Culture"],
  },
  {
    id: 4,
    slug: "meghalaya",
    name: "Meghalaya",
    tagline: "Abode of the Clouds",
    region: "Northeast India",
    image: "/img/travel/kashmir_hero.jpg",
    description: "Living root bridges of Cherrapunji, crystal-clear water of Umngot River in Dawki, and beautiful waterfalls everywhere you look.",
    tags: ["Waterfalls", "Root Bridges", "Caves"],
  },
];

export default function FeaturedDestinations() {
  const sectionRef = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".dest-header", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 95%" },
        clearProps: "all",
      });
      gsap.from(".dest-card", {
        y: 35,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
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
    <section
      id="destinations"
      ref={sectionRef}
      className="py-16 sm:py-24 md:py-32 bg-[#080808] border-b border-[#f5f5f5]/5"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="dest-header flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-[#f5f5f5]/40 mb-3 font-semibold">
              Travel Guides &amp; Trip Plans
            </p>
            <h2
              className="font-bold text-[#f5f5f5] leading-[1.05]"
              style={{ fontFamily: "var(--font-fredoka)", fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
            >
              Places that changed me
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="text-[#f5f5f5]/50 text-sm leading-relaxed max-w-sm">
              Simple guides, routes, stay recommendations, and honest travel notes.
            </p>
            <Link
              href="/travel/destinations"
              className="text-xs px-4 py-2 rounded-full border border-[#f5f5f5]/20 hover:border-[#f5f5f5]/60 text-[#f5f5f5] hover:bg-white/5 transition-all whitespace-nowrap self-start"
            >
              See All Guides &rarr;
            </Link>
          </div>
        </div>

        {/* Grid */}
        <div className="dest-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Large feature card — Kashmir */}
          <Link
            href={`/travel/destinations/${DESTINATIONS[0].slug}`}
            className="dest-card lg:col-span-2 group relative rounded-2xl overflow-hidden border border-[#f5f5f5]/10 bg-[#111113] cursor-pointer hover:border-[#f5f5f5]/25 transition-all"
          >
            <div className="relative h-72 md:h-[460px]">
              <Image
                src={DESTINATIONS[0].image}
                alt={DESTINATIONS[0].name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 60vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111113] via-[#111113]/20 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <p className="text-[9px] tracking-[0.25em] uppercase text-[#f5f5f5]/30 mb-2">{DESTINATIONS[0].region}</p>
              <h3
                className="font-bold text-[#f5f5f5] leading-tight mb-1 group-hover:text-blue-400 transition-colors"
                style={{ fontFamily: "var(--font-fredoka)", fontSize: "clamp(1.75rem, 3vw, 2.75rem)" }}
              >
                {DESTINATIONS[0].name}
              </h3>
              <p className="text-[#f5f5f5]/40 text-sm italic mb-3">{DESTINATIONS[0].tagline}</p>
              <p className="text-[#f5f5f5]/50 text-sm leading-relaxed max-w-md hidden md:block">
                {DESTINATIONS[0].description}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {DESTINATIONS[0].tags.map((t) => (
                  <span key={t} className="text-[9px] px-2.5 py-0.5 rounded-full bg-[#f5f5f5]/5 text-[#f5f5f5]/40 border border-[#f5f5f5]/10">{t}</span>
                ))}
              </div>
              <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-blue-400 group-hover:text-blue-300 transition-colors">
                View Destination Guide & Itinerary <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </span>
            </div>
          </Link>

          {/* Remaining cards */}
          {DESTINATIONS.slice(1).map((dest) => (
            <Link
              key={dest.id}
              href={`/travel/destinations/${dest.slug}`}
              className="dest-card group relative rounded-2xl overflow-hidden border border-[#f5f5f5]/10 bg-[#111113] cursor-pointer hover:border-[#f5f5f5]/25 transition-all flex flex-col justify-between"
            >
              <div className="relative h-52 md:h-56">
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111113] via-[#111113]/30 to-transparent" />
              </div>
              <div className="p-5">
                <p className="text-[9px] tracking-[0.25em] uppercase text-[#f5f5f5]/30 mb-1">{dest.region}</p>
                <h3
                  className="font-bold text-[#f5f5f5] text-xl leading-tight group-hover:text-blue-400 transition-colors"
                  style={{ fontFamily: "var(--font-fredoka)" }}
                >
                  {dest.name}
                </h3>
                <p className="text-[#f5f5f5]/40 text-xs italic mb-2">{dest.tagline}</p>
                <div className="flex flex-wrap gap-1 mt-1 mb-3">
                  {dest.tags.map((t) => (
                    <span key={t} className="text-[9px] px-2 py-0.5 rounded-full bg-[#f5f5f5]/5 text-[#f5f5f5]/40 border border-[#f5f5f5]/10">{t}</span>
                  ))}
                </div>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-blue-400 group-hover:text-blue-300 transition-colors">
                  View Guide <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
