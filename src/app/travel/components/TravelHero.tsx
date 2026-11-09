"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { GROUP_TRIPS, GroupTrip } from "../data/trips";
import TripBookingModal from "./TripBookingModal";

interface HeroSlide {
  id: string;
  badgeLabel: string;
  badgeType: "announcement" | "milestone" | "video" | "guide";
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  metrics: { label: string; value: string }[];
  primaryCta: {
    label: string;
    action: "openModal" | "scroll" | "link";
    target: string;
  };
  secondaryCta: {
    label: string;
    action: "scroll" | "link" | "external";
    target: string;
  };
  tripData?: GroupTrip;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: "group-trip-announcement",
    badgeLabel: "Official Announcement · Group Expedition",
    badgeType: "announcement",
    titleLine1: "Winter Spiti 4x4",
    titleLine2: "White Expedition.",
    subtitle:
      "Cross 15,000-ft frozen mountain passes, explore ancient cliff monasteries & ride across white Himalayan plains with a curated small group of 10 travellers.",
    image: "/img/travel/ladakh.jpg",
    imageAlt: "Winter Spiti high-altitude snow expedition",
    metrics: [
      { label: "Dates", value: "18 – 26 Jan 2026" },
      { label: "Altitude", value: "15,000 ft" },
      { label: "Seats Left", value: "3 Seats" },
      { label: "Transparent Cost", value: "₹28,500" },
    ],
    primaryCta: {
      label: "Reserve Seat / Enquire",
      action: "openModal",
      target: "trip-spiti-winter-2026",
    },
    secondaryCta: {
      label: "Explore All Expeditions",
      action: "link",
      target: "/travel/trips",
    },
    tripData: GROUP_TRIPS.find((t) => t.slug === "spiti-winter-white-spiti-2026") || GROUP_TRIPS[0],
  },
  {
    id: "solo-odyssey-milestone",
    badgeLabel: "Solo Odyssey · 24/28 States Milestone",
    badgeType: "milestone",
    titleLine1: "Wander More.",
    titleLine2: "Wonder Always.",
    subtitle:
      "24 Indian states explored across mountain passes, slow trains & desert highways. Real, self-funded journeys with zero commercial filters.",
    image: "/img/travel/kashmir_hero.jpg",
    imageAlt: "Ashraf Siddiqui solo travel in Himalayas",
    metrics: [
      { label: "States Visited", value: "24 / 28" },
      { label: "Instagram Family", value: "12.4K" },
      { label: "Dispatches", value: "169 Posts" },
      { label: "Solo Focus", value: "Rail & Road" },
    ],
    primaryCta: {
      label: "Explore 24 States Map",
      action: "scroll",
      target: "#interactive-map",
    },
    secondaryCta: {
      label: "Watch 3 iPhones Feed",
      action: "scroll",
      target: "#reels",
    },
  },
  {
    id: "instagram-reels-dispatch",
    badgeLabel: "Video Dispatches · @ashraf._siddiqui",
    badgeType: "video",
    titleLine1: "Travel in 60",
    titleLine2: "Seconds.",
    subtitle:
      "Hover over 3 photorealistic iPhone screens to play unembellished video dispatches from moving sleeper trains, misty Dal Lake dawns & fortress ramparts.",
    image: "/img/travel/rajasthan.jpg",
    imageAlt: "Mehrangarh Fort Jodhpur Rajasthan dusk",
    metrics: [
      { label: "Format", value: "3 Real iPhones" },
      { label: "Interaction", value: "Hover to Play" },
      { label: "Handle", value: "@ashraf._siddiqui" },
      { label: "Followers", value: "12.4K" },
    ],
    primaryCta: {
      label: "Play Reel Videos",
      action: "scroll",
      target: "#reels",
    },
    secondaryCta: {
      label: "Open Instagram",
      action: "external",
      target: "https://instagram.com/ashraf._siddiqui",
    },
  },
  {
    id: "travel-guides-release",
    badgeLabel: "New Field Blueprints · Free Itineraries",
    badgeType: "guide",
    titleLine1: "Day-by-Day",
    titleLine2: "Route Blueprints.",
    subtitle:
      "Comprehensive itineraries for Kashmir, Ladakh & Rajasthan with altitude acclimatization schedules, verified driver unions & printable PDF summaries.",
    image: "/img/travel/kerala.jpg",
    imageAlt: "Kashmir and Ladakh detailed route itinerary",
    metrics: [
      { label: "Featured Route", value: "Kashmir 7-Day" },
      { label: "Export", value: "Print to PDF" },
      { label: "Verified Stays", value: "Homestays" },
      { label: "Commercial Tag", value: "0% Sponsored" },
    ],
    primaryCta: {
      label: "Read Kashmir Guide",
      action: "link",
      target: "/travel/guides/kashmir",
    },
    secondaryCta: {
      label: "View All Guides",
      action: "link",
      target: "/travel/guides",
    },
  },
];

export default function TravelHero() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTrip, setModalTrip] = useState<GroupTrip>(GROUP_TRIPS[0]);
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [slideProgress, setSlideProgress] = useState(0);

  const SLIDE_DURATION_MS = 6500;
  const currentSlide = HERO_SLIDES[currentSlideIndex];

  // Next / Prev slide handlers
  const goToNextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    setSlideProgress(0);
  }, []);

  const goToPrevSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
    setSlideProgress(0);
  }, []);

  const goToSlide = (idx: number) => {
    setCurrentSlideIndex(idx);
    setSlideProgress(0);
  };

  // Auto-play timer with progress ticker
  useEffect(() => {
    if (isPaused) return;

    const intervalStep = 50;
    const stepIncrement = (intervalStep / SLIDE_DURATION_MS) * 100;

    const ticker = setInterval(() => {
      setSlideProgress((prev) => {
        if (prev >= 100) {
          goToNextSlide();
          return 0;
        }
        return prev + stepIncrement;
      });
    }, intervalStep);

    return () => clearInterval(ticker);
  }, [isPaused, goToNextSlide]);

  // Handle CTA Clicks
  const handleCtaClick = (
    cta: HeroSlide["primaryCta"] | HeroSlide["secondaryCta"],
    slide: HeroSlide
  ) => {
    if (cta.action === "openModal") {
      const targetTrip = slide.tripData || GROUP_TRIPS[0];
      setModalTrip(targetTrip);
      setIsModalOpen(true);
    } else if (cta.action === "scroll") {
      const el = document.querySelector(cta.target);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else if (cta.action === "external") {
      window.open(cta.target, "_blank", "noopener,noreferrer");
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goToNextSlide();
      if (e.key === "ArrowLeft") goToPrevSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNextSlide, goToPrevSlide]);

  // Touch Swipe for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 50) goToNextSlide();
    if (diff < -50) goToPrevSlide();
    setTouchStart(null);
  };

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden bg-[#080808] select-none"
      style={{ height: "100svh", minHeight: "600px" }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Travel Diaries Hero Showcase"
    >
      {/* ─── SLIDING BACKGROUND IMAGES (Cinematic Cross-fade & Ken-Burns) ─── */}
      {HERO_SLIDES.map((slide, idx) => {
        const isActive = idx === currentSlideIndex;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-out pointer-events-none ${
              isActive ? "opacity-100 z-0" : "opacity-0 z-0"
            }`}
          >
            <div
              className={`relative w-full h-full transition-transform duration-7000 ease-out ${
                isActive ? "scale-105" : "scale-100"
              }`}
            >
              <Image
                src={slide.image}
                alt={slide.imageAlt}
                fill
                priority={idx === 0}
                className="object-cover object-center"
                sizes="100vw"
              />
            </div>
            {/* Cinematic Gradient Overlays: strictly Phase 1 dark aesthetics */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/60 to-[#080808]/70" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/90 via-[#080808]/50 to-[#080808]/90" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(8,8,8,0.7)_100%)]" />
          </div>
        );
      })}

      {/* ─── TOP ANNOUNCEMENT TICKER PILL ───────────────────────────── */}
      <div className="absolute top-20 sm:top-24 left-1/2 -translate-x-1/2 z-20 w-full max-w-5xl px-4 flex justify-center pointer-events-none">
        <div className="pointer-events-auto inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#111113]/85 backdrop-blur-md border border-[#f5f5f5]/15 shadow-xl transition-all hover:border-[#f5f5f5]/40">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#f5f5f5]">
            {currentSlide.badgeLabel}
          </span>
          <span className="hidden sm:inline text-[#f5f5f5]/30">|</span>
          <span className="hidden sm:inline text-[10px] sm:text-[11px] text-[#f5f5f5]/60 font-medium">
            Slide {currentSlideIndex + 1} of {HERO_SLIDES.length}
          </span>
        </div>
      </div>

      {/* ─── MAIN HERO CONTENT STAGE ─────────────────────────────────── */}
      <div className="relative z-10 h-full max-w-6xl mx-auto px-4 sm:px-6 md:px-10 flex flex-col justify-center items-center text-center pt-16 sm:pt-12">
        <div className="w-full max-w-4xl flex flex-col items-center">
          {/* Eyebrow Label */}
          <p className="text-[11px] sm:text-xs md:text-sm tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[#f5f5f5]/50 mb-3 sm:mb-4 font-medium transition-all duration-500">
            Ashraf Siddiqui &nbsp;·&nbsp; Solo Traveller &nbsp;·&nbsp; Jaipur, India
          </p>

          {/* High-Impact Dynamic Title */}
          <div className="overflow-hidden mb-1">
            <h1
              className="leading-[0.92] font-bold tracking-tight text-[#f5f5f5] transition-all duration-500 transform"
              style={{
                fontFamily: "var(--font-fredoka)",
                fontSize: "clamp(2.5rem, 8.5vw, 6.8rem)",
              }}
            >
              {currentSlide.titleLine1}
            </h1>
          </div>
          <div className="overflow-hidden mb-4 sm:mb-6">
            <h1
              className="leading-[0.92] font-bold tracking-tight text-transparent transition-all duration-500 transform"
              style={{
                fontFamily: "var(--font-fredoka)",
                fontSize: "clamp(2.5rem, 8.5vw, 6.8rem)",
                WebkitTextStroke: "1.5px rgba(245,245,245,0.7)",
              }}
            >
              {currentSlide.titleLine2}
            </h1>
          </div>

          {/* Subtitle description */}
          <p className="text-xs sm:text-sm md:text-base text-[#f5f5f5]/70 max-w-2xl leading-relaxed mb-6 sm:mb-8 font-normal px-2">
            {currentSlide.subtitle}
          </p>

          {/* Slide Metrics Pills Row */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
            {currentSlide.metrics.map((metric, mIdx) => (
              <div
                key={mIdx}
                className="px-3 sm:px-4 py-1.5 rounded-full bg-[#111113]/80 backdrop-blur-md border border-[#f5f5f5]/10 text-center flex items-center gap-2 shadow-sm"
              >
                <span className="text-[10px] uppercase tracking-wider text-[#f5f5f5]/40 font-medium">
                  {metric.label}:
                </span>
                <span className="text-xs sm:text-sm font-bold text-white" style={{ fontFamily: "var(--font-fredoka)" }}>
                  {metric.value}
                </span>
              </div>
            ))}
          </div>

          {/* Dual Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md sm:max-w-none">
            {currentSlide.primaryCta.action === "link" ? (
              <Link
                href={currentSlide.primaryCta.target}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold bg-[#f5f5f5] text-[#080808] hover:bg-white transition-all shadow-xl hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <span>{currentSlide.primaryCta.label}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </Link>
            ) : (
              <button
                onClick={() => handleCtaClick(currentSlide.primaryCta, currentSlide)}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold bg-[#f5f5f5] text-[#080808] hover:bg-white transition-all shadow-xl hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <span>{currentSlide.primaryCta.label}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  {currentSlide.primaryCta.action === "openModal" ? (
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  ) : (
                    <>
                      <line x1="12" y1="5" x2="12" y2="19"/>
                      <polyline points="19 12 12 19 5 12"/>
                    </>
                  )}
                </svg>
              </button>
            )}

            {currentSlide.secondaryCta.action === "link" ? (
              <Link
                href={currentSlide.secondaryCta.target}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full text-xs sm:text-sm font-semibold border border-[#f5f5f5]/20 text-[#f5f5f5]/85 hover:border-[#f5f5f5]/60 hover:text-white backdrop-blur-sm hover:bg-white/5 transition-all flex items-center justify-center gap-2"
              >
                <span>{currentSlide.secondaryCta.label}</span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </Link>
            ) : (
              <button
                onClick={() => handleCtaClick(currentSlide.secondaryCta, currentSlide)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full text-xs sm:text-sm font-semibold border border-[#f5f5f5]/20 text-[#f5f5f5]/85 hover:border-[#f5f5f5]/60 hover:text-white backdrop-blur-sm hover:bg-white/5 transition-all flex items-center justify-center gap-2"
              >
                <span>{currentSlide.secondaryCta.label}</span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ─── SIDE PREV / NEXT ARROWS (Desktop) ──────────────────────── */}
      <button
        onClick={goToPrevSlide}
        className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[#111113]/80 backdrop-blur-md border border-[#f5f5f5]/15 text-[#f5f5f5]/70 hover:text-white hover:border-[#f5f5f5]/50 hover:scale-105 transition-all items-center justify-center"
        aria-label="Previous Slide"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
      </button>

      <button
        onClick={goToNextSlide}
        className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[#111113]/80 backdrop-blur-md border border-[#f5f5f5]/15 text-[#f5f5f5]/70 hover:text-white hover:border-[#f5f5f5]/50 hover:scale-105 transition-all items-center justify-center"
        aria-label="Next Slide"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </button>

      {/* ─── BOTTOM CONTROLS & INTERACTIVE TABS TRAY ────────────────── */}
      <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 z-20 px-4 sm:px-6 max-w-5xl mx-auto flex flex-col items-center gap-3">
        {/* Animated Progress Timer Bar */}
        <div className="w-full max-w-md h-[2.5px] bg-[#f5f5f5]/15 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-all duration-75 ease-linear"
            style={{ width: `${slideProgress}%` }}
          />
        </div>

        {/* Interactive Slide Pills */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-1 max-w-full no-scrollbar">
          {HERO_SLIDES.map((slide, idx) => {
            const isSelected = idx === currentSlideIndex;
            return (
              <button
                key={slide.id}
                onClick={() => goToSlide(idx)}
                className={`group flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? "bg-[#f5f5f5] text-[#080808] shadow-lg scale-105"
                    : "bg-[#111113]/80 backdrop-blur-md text-[#f5f5f5]/50 hover:text-white border border-[#f5f5f5]/10 hover:border-[#f5f5f5]/30"
                }`}
              >
                <span className={`text-[9px] ${isSelected ? "text-[#080808]/60" : "text-[#f5f5f5]/30"}`}>
                  0{idx + 1}
                </span>
                <span>
                  {idx === 0 && "Group Trips"}
                  {idx === 1 && "24/28 States"}
                  {idx === 2 && "Instagram Reels"}
                  {idx === 3 && "Route Guides"}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── DIRECT TRIP ENQUIRY MODAL (Triggered from Hero Slide) ───── */}
      {modalTrip && (
        <TripBookingModal
          trip={modalTrip}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </section>
  );
}
