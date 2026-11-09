"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { DestinationData, DESTINATIONS_DATA } from "../../data/destinations";

interface Props {
  destination: DestinationData;
}

export default function DestinationClient({ destination }: Props) {
  const heroRef = useRef<HTMLDivElement>(null);
  const [selectedDay, setSelectedDay] = useState<number>(1);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".dest-title", {
        y: 60,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
        delay: 0.2,
      });
      gsap.from(".dest-meta", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.5,
      });
      gsap.from(".dest-section", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.6,
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const otherDestinations = Object.values(DESTINATIONS_DATA).filter(
    (d) => d.slug !== destination.slug
  );

  return (
    <div
      ref={heroRef}
      className="min-h-screen bg-[#080808] text-[#f5f5f5] overflow-x-hidden"
      style={{ fontFamily: "var(--font-inter), sans-serif" }}
    >
      {/* Top Sticky Header */}
      <nav className="fixed top-0 left-0 w-full z-50 py-3.5 sm:py-4 px-4 sm:px-6 md:px-12 bg-[#080808]/90 backdrop-blur-md border-b border-[#f5f5f5]/5 flex items-center justify-between">
        <Link
          href="/travel"
          className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs uppercase tracking-widest text-[#f5f5f5]/70 hover:text-white transition-colors"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12"/>
            <polyline points="12 19 5 12 12 5"/>
          </svg>
          <span className="hidden sm:inline">Back to Travel Diaries</span>
          <span className="sm:hidden">Back</span>
        </Link>
        <span
          className="text-xs sm:text-sm font-bold text-[#f5f5f5] truncate max-w-[160px] sm:max-w-none"
          style={{ fontFamily: "var(--font-fredoka)" }}
        >
          {destination.name}
        </span>
        <Link
          href="/travel#journey"
          className="text-[11px] sm:text-xs px-3 sm:px-4 py-1.5 rounded-full border border-[#f5f5f5]/20 hover:border-[#f5f5f5]/60 text-[#f5f5f5] transition-all flex items-center gap-1.5"
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/>
          </svg>
          <span>India Map</span>
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[65vh] sm:h-[70vh] min-h-[460px] w-full flex items-end pb-12 sm:pb-16 px-4 sm:px-6 md:px-16 pt-24 overflow-hidden">
        <Image
          src={destination.heroImage}
          alt={destination.name}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/80 via-transparent to-transparent" />

        <div className="relative z-10 max-w-5xl mx-auto w-full">
          <div className="dest-meta flex flex-wrap items-center gap-2 mb-2 sm:mb-3">
            <span className="text-[10px] tracking-[0.2em] uppercase px-2.5 sm:px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 font-semibold">
              {destination.state} · {destination.region}
            </span>
            <span className="text-[11px] sm:text-xs text-[#f5f5f5]/50">
              Explored in {destination.yearVisited}
            </span>
            <span className="text-[#f5f5f5]/20">·</span>
            <span className="text-[11px] sm:text-xs text-[#f5f5f5]/50">
              {destination.duration}
            </span>
          </div>

          <h1
            className="dest-title text-3xl sm:text-6xl md:text-8xl font-bold text-[#f5f5f5] tracking-tight leading-none mb-2 sm:mb-3"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            {destination.name}
          </h1>
          <p
            className="text-base sm:text-xl md:text-2xl text-[#f5f5f5]/60 italic font-medium"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            &ldquo;{destination.tagline}&rdquo;
          </p>
        </div>
      </section>

      {/* Quick Facts Strip */}
      <section className="border-t border-b border-[#f5f5f5]/5 bg-[#111113] py-5 sm:py-6 px-4 sm:px-6 md:px-16">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center md:text-left">
          <div>
            <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[#f5f5f5]/40 mb-1">
              Explored Year
            </p>
            <p
              className="text-lg sm:text-xl font-bold text-[#f5f5f5]"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              {destination.yearVisited}
            </p>
          </div>
          <div>
            <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[#f5f5f5]/40 mb-1">
              Ideal Duration
            </p>
            <p
              className="text-lg sm:text-xl font-bold text-[#f5f5f5]"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              {destination.duration}
            </p>
          </div>
          <div>
            <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[#f5f5f5]/40 mb-1">
              Best Season
            </p>
            <p
              className="text-lg sm:text-xl font-bold text-[#f5f5f5]"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              Spring / Autumn
            </p>
          </div>
          <div>
            <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[#f5f5f5]/40 mb-1">
              Journey Type
            </p>
            <p
              className="text-lg sm:text-xl font-bold text-[#f5f5f5]"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              Rail, Road & Trails
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 md:px-10 py-12 sm:py-16 space-y-12 sm:space-y-16">
        {/* Overview & Personal Journal */}
        <section className="dest-section grid md:grid-cols-12 gap-6 sm:gap-8 items-start">
          <div className="md:col-span-7 space-y-3 sm:space-y-4">
            <p className="text-[11px] sm:text-xs tracking-[0.3em] uppercase text-[#f5f5f5]/30">
              The Destination
            </p>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#f5f5f5]"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              Overview & Atmosphere
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-[#f5f5f5]/70 leading-relaxed">
              {destination.overview}
            </p>
          </div>

          <div className="md:col-span-5 p-5 sm:p-6 rounded-3xl bg-[#111113] border border-[#f5f5f5]/10 space-y-3">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#f5f5f5]/80 font-semibold">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 20h9"/>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
              </svg>
              <span>Ashraf&apos;s Field Note</span>
            </div>
            <p className="text-xs md:text-sm text-[#f5f5f5]/80 leading-relaxed italic">
              &ldquo;{destination.personalExperience}&rdquo;
            </p>
            <p className="text-[10px] text-[#f5f5f5]/40 pt-2 border-t border-[#f5f5f5]/5">
              Excerpt from personal travel journal
            </p>
          </div>
        </section>

        {/* Places to Explore */}
        <section className="dest-section space-y-6 sm:space-y-8">
          <div>
            <p className="text-[11px] sm:text-xs tracking-[0.3em] uppercase text-[#f5f5f5]/30 mb-1.5 sm:mb-2">
              Must-Visit Locations
            </p>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#f5f5f5]"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              Top Places to Explore
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {destination.placesToExplore.map((place, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-2xl bg-[#111113] border border-[#f5f5f5]/10 hover:border-[#f5f5f5]/20 transition-all space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#f5f5f5]/5 text-[#f5f5f5]/50 border border-[#f5f5f5]/10">
                    {place.tag}
                  </span>
                  <span className="text-xs text-[#f5f5f5]/30">0{idx + 1}</span>
                </div>
                <h3
                  className="text-base sm:text-lg font-bold text-[#f5f5f5]"
                  style={{ fontFamily: "var(--font-fredoka)" }}
                >
                  {place.name}
                </h3>
                <p className="text-xs text-[#f5f5f5]/60 leading-relaxed">
                  {place.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* How to Reach & Best Time */}
        <section className="dest-section grid md:grid-cols-2 gap-6 sm:gap-8">
          {/* How to reach */}
          <div className="p-5 sm:p-6 md:p-8 rounded-3xl bg-[#111113] border border-[#f5f5f5]/10 space-y-4">
            <h3
              className="text-xl sm:text-2xl font-bold text-[#f5f5f5]"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              How to Reach
            </h3>
            <div className="space-y-3.5 text-xs text-[#f5f5f5]/70">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#f5f5f5]/5 border border-[#f5f5f5]/10 flex items-center justify-center shrink-0 text-white/80 mt-0.5">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 2L11 13"/>
                    <path d="M22 2l-7 20-4-9-9-4 20-7z"/>
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-[#f5f5f5]">By Air</p>
                  <p className="text-[11px] text-[#f5f5f5]/50 leading-relaxed mt-0.5">
                    {destination.howToReach.byAir}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#f5f5f5]/5 border border-[#f5f5f5]/10 flex items-center justify-center shrink-0 text-blue-400 mt-0.5">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="4" y="3" width="16" height="16" rx="2"/>
                    <path d="M4 11h16"/>
                    <path d="M12 3v8"/>
                    <path d="M8 19l-3 3"/>
                    <path d="M16 19l3 3"/>
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-[#f5f5f5]">By Rail</p>
                  <p className="text-[11px] text-[#f5f5f5]/50 leading-relaxed mt-0.5">
                    {destination.howToReach.byRail}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#f5f5f5]/5 border border-[#f5f5f5]/10 flex items-center justify-center shrink-0 text-emerald-400 mt-0.5">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-[#f5f5f5]">By Road</p>
                  <p className="text-[11px] text-[#f5f5f5]/50 leading-relaxed mt-0.5">
                    {destination.howToReach.byRoad}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Best time to visit */}
          <div className="p-5 sm:p-6 md:p-8 rounded-3xl bg-[#111113] border border-[#f5f5f5]/10 space-y-4">
            <h3
              className="text-xl sm:text-2xl font-bold text-[#f5f5f5]"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              Best Time to Visit
            </h3>
            <div className="space-y-3.5 text-xs text-[#f5f5f5]/70">
              <div>
                <p className="font-semibold text-[#f5f5f5] flex items-center gap-1.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/80">
                    <circle cx="12" cy="12" r="5"/>
                    <line x1="12" y1="1" x2="12" y2="3"/>
                    <line x1="12" y1="21" x2="12" y2="23"/>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                    <line x1="1" y1="12" x2="3" y2="12"/>
                    <line x1="21" y1="12" x2="23" y2="12"/>
                  </svg>
                  Ideal Months
                </p>
                <p className="text-[11px] text-[#f5f5f5]/50 leading-relaxed mt-0.5">
                  {destination.bestTimeToVisit.idealMonths}
                </p>
              </div>
              <div>
                <p className="font-semibold text-[#f5f5f5] flex items-center gap-1.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-400">
                    <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
                  </svg>
                  Seasons & Climate
                </p>
                <p className="text-[11px] text-[#f5f5f5]/50 leading-relaxed mt-0.5">
                  {destination.bestTimeToVisit.seasons}
                </p>
              </div>
              <div>
                <p className="font-semibold text-[#f5f5f5] flex items-center gap-1.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-400">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  Field Tip
                </p>
                <p className="text-[11px] text-[#f5f5f5]/50 leading-relaxed mt-0.5">
                  {destination.bestTimeToVisit.weatherTips}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Day-by-Day Sample Itinerary */}
        <section className="dest-section space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-[11px] sm:text-xs tracking-[0.3em] uppercase text-[#f5f5f5]/30 mb-1.5 sm:mb-2">
                Route Plan
              </p>
              <h2
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#f5f5f5]"
                style={{ fontFamily: "var(--font-fredoka)" }}
              >
                Suggested Itinerary
              </h2>
            </div>
            {/* Day Selector Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
              {destination.itinerarySample.map((day) => (
                <button
                  key={day.day}
                  onClick={() => setSelectedDay(day.day)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedDay === day.day
                      ? "bg-[#f5f5f5] text-[#080808]"
                      : "bg-[#111113] text-[#f5f5f5]/50 hover:text-white"
                  }`}
                >
                  Day {day.day}
                </button>
              ))}
            </div>
          </div>

          {/* Active Day Detail */}
          {destination.itinerarySample.find((d) => d.day === selectedDay) && (
            <div className="p-5 sm:p-6 md:p-8 rounded-3xl bg-[#111113] border border-[#f5f5f5]/10 space-y-4">
              {(() => {
                const day = destination.itinerarySample.find(
                  (d) => d.day === selectedDay
                )!;
                return (
                  <>
                    <div className="flex items-center gap-2.5">
                      <span className="text-[11px] uppercase tracking-widest text-[#f5f5f5] font-bold px-2 py-0.5 rounded bg-white/10 border border-white/20">
                        Day {day.day}
                      </span>
                      <h4
                        className="text-lg sm:text-xl md:text-2xl font-bold text-[#f5f5f5]"
                        style={{ fontFamily: "var(--font-fredoka)" }}
                      >
                        {day.title}
                      </h4>
                    </div>
                    <ul className="space-y-2.5 pt-2">
                      {day.activities.map((act, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-[#f5f5f5]/75 leading-relaxed"
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-blue-400 mt-1 shrink-0">
                            <polyline points="9 18 15 12 9 6"/>
                          </svg>
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                );
              })()}
            </div>
          )}
        </section>

        {/* Estimated Budget */}
        <section className="dest-section p-5 sm:p-6 md:p-8 rounded-3xl bg-[#111113] border border-[#f5f5f5]/10 space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-[11px] sm:text-xs tracking-widest uppercase text-[#f5f5f5]/40 font-semibold">
              Estimated Budget (Per Person)
            </span>
            <span className="text-[10px] uppercase tracking-wider text-[#f5f5f5]/90 bg-white/10 px-2.5 py-0.5 rounded-full border border-white/20">
              Non-commercial Estimate
            </span>
          </div>
          <p
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#f5f5f5]"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            {destination.estimatedBudget.range}
          </p>
          <p className="text-xs text-[#f5f5f5]/60">
            {destination.estimatedBudget.basis}
          </p>
          <p className="text-[11px] text-[#f5f5f5]/40 italic border-t border-[#f5f5f5]/5 pt-3">
            Note: {destination.estimatedBudget.note}
          </p>
        </section>

        {/* Explore Other Destinations */}
        <section className="dest-section space-y-5 sm:space-y-6 pt-6 border-t border-[#f5f5f5]/10">
          <h3
            className="text-xl sm:text-2xl font-bold text-[#f5f5f5]"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            Explore More Destinations
          </h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {otherDestinations.map((dest) => (
              <Link
                key={dest.slug}
                href={`/travel/destinations/${dest.slug}`}
                className="group relative rounded-2xl overflow-hidden border border-[#f5f5f5]/10 bg-[#111113] p-4 flex flex-col justify-between hover:border-[#f5f5f5]/30 transition-all"
              >
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#f5f5f5]/40">
                    {dest.state}
                  </span>
                  <h4
                    className="text-base sm:text-lg font-bold text-[#f5f5f5] group-hover:text-blue-400 transition-colors mt-0.5"
                    style={{ fontFamily: "var(--font-fredoka)" }}
                  >
                    {dest.name}
                  </h4>
                  <p className="text-xs text-[#f5f5f5]/50 mt-1 line-clamp-2">
                    {dest.tagline}
                  </p>
                </div>
                <span className="text-xs font-semibold text-[#f5f5f5]/70 group-hover:text-white transition-colors mt-4 inline-flex items-center gap-1">
                  <span>Read guide</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* Footer link back */}
      <footer className="py-12 px-6 border-t border-[#f5f5f5]/5 text-center">
        <Link
          href="/travel"
          className="text-xs sm:text-sm font-semibold text-[#f5f5f5]/60 hover:text-white transition-colors inline-flex items-center gap-2"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12"/>
            <polyline points="12 19 5 12 12 5"/>
          </svg>
          <span>Back to Travel Diaries Homepage</span>
        </Link>
      </footer>
    </div>
  );
}
