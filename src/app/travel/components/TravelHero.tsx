"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { GROUP_TRIPS, GroupTrip } from "../data/trips";
import TripBookingModal from "./TripBookingModal";

/* ─── Hero Slide Definition based on Real Structured Expeditions ─── */
interface ExpeditionSlide {
  id: string;
  tripSlug: string;
  badgeLabel: string;
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  posterImage: string;
  imageAlt: string;
  videoUrl?: string;
  tripData: GroupTrip;
}

/* Sourced strictly from GROUP_TRIPS data */
const EXPEDITION_SLIDES: ExpeditionSlide[] = [
  {
    id: "spiti-4x4-expedition",
    tripSlug: "spiti-valley-circuit-2026",
    badgeLabel: "Official Announcement · High-Altitude Expedition",
    titleLine1: "WINTER SPITI 4×4",
    titleLine2: "WHITE EXPEDITION.",
    subtitle:
      "Cross 15,000-ft frozen Himalayan passes, ancient cliff monasteries & ride across white Spiti plains with a curated small group.",
    posterImage: "/img/travel/ladakh.jpg",
    imageAlt: "Winter Spiti 4x4 high-altitude snow expedition",
    videoUrl: "/videos/reels/travelashraf1.mp4",
    tripData: GROUP_TRIPS.find((t) => t.slug === "spiti-valley-circuit-2026") || GROUP_TRIPS[1] || GROUP_TRIPS[0],
  },
  {
    id: "kashmir-winter-expedition",
    tripSlug: "kashmir-winter-expedition-2026",
    badgeLabel: "Alpine Winter · Verified Group Tour",
    titleLine1: "KASHMIR WINTER",
    titleLine2: "POWDER TRAILS.",
    subtitle:
      "From solitary shikara drifts on frozen Dal Lake to high-altitude powder at Apharwat Peak. Experience Kashmir with zero tourist rush.",
    posterImage: "/img/travel/kashmir_hero.jpg",
    imageAlt: "Kashmir winter alpine snow expedition",
    videoUrl: "/videos/reels/travelashraf1.mp4",
    tripData: GROUP_TRIPS.find((t) => t.slug === "kashmir-winter-expedition-2026") || GROUP_TRIPS[0],
  },
  {
    id: "ladakh-overland-expedition",
    tripSlug: "ladakh-high-passes-overland-2026",
    badgeLabel: "High Passes Circuit · 18,380 FT",
    titleLine1: "LADAKH OVERLAND",
    titleLine2: "HIGH PASSES.",
    subtitle:
      "Pangong's impossible blue, Khardung La's thin air, and star-filled night skies unpolluted by light. An overland route designed for true explorers.",
    posterImage: "/img/travel/ladakh.jpg",
    imageAlt: "Ladakh high passes overland expedition",
    videoUrl: "/videos/reels/travelashraf2.mp4",
    tripData: GROUP_TRIPS.find((t) => t.slug === "ladakh-high-passes-overland-2026") || GROUP_TRIPS[2] || GROUP_TRIPS[0],
  },
  {
    id: "meghalaya-living-roots",
    tripSlug: "meghalaya-living-root-bridges-2026",
    badgeLabel: "Northeast Trails · Ancient Bridges",
    titleLine1: "MEGHALAYA TRAILS",
    titleLine2: "ROOT BRIDGES.",
    subtitle:
      "Trek down 3,500 steps to century-old bio-engineered root bridges, swim in crystal Umngot waters, and explore sacred Khasi rainforests.",
    posterImage: "/img/travel/kashmir_hero.jpg",
    imageAlt: "Meghalaya living root bridges expedition",
    tripData: GROUP_TRIPS.find((t) => t.slug === "meghalaya-living-root-bridges-2026") || GROUP_TRIPS[3] || GROUP_TRIPS[0],
  },
];

/* Quick Navigation Chips (Homepage Section Shortcuts) */
const QUICK_NAV_CHIPS = [
  { label: "Group Expeditions", href: "#group-tours" },
  { label: "My Journey 24/28", href: "#journey" },
  { label: "Travel Reels", href: "#reels" },
  { label: "Travel Guides", href: "#destinations" },
];

export default function TravelHero() {
  const [slides, setSlides] = useState<ExpeditionSlide[]>(EXPEDITION_SLIDES);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [slideProgress, setSlideProgress] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTrip, setModalTrip] = useState<GroupTrip>(EXPEDITION_SLIDES[0].tripData);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const contentStageRef = useRef<HTMLDivElement>(null);

  const SLIDE_DURATION_MS = 8000;

  // Load dynamic slides from database API
  useEffect(() => {
    async function fetchDynamicSlides() {
      try {
        const res = await fetch("/api/travel/hero");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.slides) && data.slides.length > 0) {
            const mappedSlides: ExpeditionSlide[] = data.slides.map(
              (s: any, idx: number) => {
                const matchedTrip =
                  GROUP_TRIPS.find((t) => t.slug === s.tripSlug) ||
                  GROUP_TRIPS[idx % GROUP_TRIPS.length] ||
                  GROUP_TRIPS[0];
                return {
                  ...s,
                  tripData: matchedTrip,
                };
              }
            );
            setSlides(mappedSlides);
          }
        }
      } catch {
        // Fallback to static slides silently
      }
    }
    fetchDynamicSlides();
  }, []);

  const currentSlide = slides[currentSlideIndex] || slides[0] || EXPEDITION_SLIDES[0];
  const trip = currentSlide.tripData;

  // Check prefers-reduced-motion
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);
      const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener("change", listener);
      return () => mediaQuery.removeEventListener("change", listener);
    }
  }, []);

  // Slide navigation
  const goToNextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    setSlideProgress(0);
  }, [slides.length]);

  const goToPrevSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setSlideProgress(0);
  }, [slides.length]);

  // GSAP animation on slide change
  useEffect(() => {
    if (prefersReducedMotion || !contentStageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-anim-eyebrow",
        { y: -10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
      );
      gsap.fromTo(
        ".hero-anim-title-solid",
        { y: 22, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, ease: "power3.out", delay: 0.05 }
      );
      gsap.fromTo(
        ".hero-anim-title-outline",
        { y: 22, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, ease: "power3.out", delay: 0.12 }
      );
      gsap.fromTo(
        ".hero-anim-desc",
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out", delay: 0.18 }
      );
      gsap.fromTo(
        ".hero-anim-pill",
        { scale: 0.94, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.45, stagger: 0.04, ease: "back.out(1.4)", delay: 0.22 }
      );
      gsap.fromTo(
        ".hero-anim-cta",
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out", delay: 0.3 }
      );
    }, contentStageRef);

    return () => ctx.revert();
  }, [currentSlideIndex, prefersReducedMotion]);

  // Video play/pause management
  useEffect(() => {
    videoRefs.current.forEach((vid, idx) => {
      if (!vid) return;
      if (idx === currentSlideIndex && isVideoPlaying && !prefersReducedMotion) {
        vid.play().catch(() => {});
      } else {
        vid.pause();
      }
    });
  }, [currentSlideIndex, isVideoPlaying, prefersReducedMotion]);

  // Toggle video & carousel play/pause
  const togglePlayPause = () => {
    const nextState = !isVideoPlaying;
    setIsVideoPlaying(nextState);
    setIsPaused(!nextState);
  };

  // Auto-play progress ticker
  useEffect(() => {
    if (isPaused || !isVideoPlaying) return;

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
  }, [isPaused, isVideoPlaying, goToNextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goToNextSlide();
      if (e.key === "ArrowLeft") goToPrevSlide();
      if (e.key === " ") {
        e.preventDefault();
        togglePlayPause();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNextSlide, goToPrevSlide, isVideoPlaying]);

  // Touch Swipe for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 45) goToNextSlide();
    if (diff < -45) goToPrevSlide();
    setTouchStart(null);
  };

  // Section smooth scrolling
  const scrollToSection = (hash: string) => {
    const el = document.querySelector(hash);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Open modal with current expedition data
  const handleOpenBookingModal = () => {
    setModalTrip(currentSlide.tripData);
    setIsModalOpen(true);
  };

  // Structured Expedition Metrics (either from custom slide metrics or fallback from tripData)
  const defaultPills = [
    { label: "Dates", value: `${trip.departureDate} – ${trip.returnDate}` },
    { label: "Duration", value: trip.durationLabel || `${trip.durationDays} Days` },
    {
      label: "Altitude",
      value:
        currentSlide.tripSlug?.includes("spiti")
          ? "15,000 ft"
          : currentSlide.tripSlug?.includes("ladakh")
          ? "18,380 ft"
          : currentSlide.tripSlug?.includes("kashmir")
          ? "14,000 ft"
          : "4,600 ft",
    },
    { label: "Group Size", value: `${trip.maxGroupSize} Travellers` },
    { label: "Starting", value: `₹${trip.pricePerPerson.toLocaleString("en-IN")}` },
    {
      label: "Available",
      value: trip.availableSeats > 0 ? `${trip.availableSeats} Seats Left` : "Past Expedition",
      highlight: trip.availableSeats > 0 && trip.availableSeats <= 4,
    },
  ];

  const tripPills = (currentSlide as any).metrics && (currentSlide as any).metrics.length > 0
    ? (currentSlide as any).metrics
    : defaultPills;

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative w-full overflow-hidden bg-[#080808] select-none text-[#f5f5f5]"
      style={{ height: "100svh", minHeight: "680px" }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Expedition Announcement Showcase"
    >
      {/* ─── 1. CINEMATIC BACKGROUND MEDIA (Full Visibility Video + Poster Fallback) ─── */}
      {slides.map((slide, idx) => {
        const isActive = idx === currentSlideIndex;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-out pointer-events-none ${
              isActive ? "opacity-100 z-0" : "opacity-0 z-0"
            }`}
            aria-hidden={!isActive}
          >
            {/* Background Video — Full visibility, no heavy opacity */}
            {slide.videoUrl && !prefersReducedMotion ? (
              <video
                ref={(el) => {
                  videoRefs.current[idx] = el;
                }}
                src={slide.videoUrl}
                poster={slide.posterImage}
                muted
                loop
                playsInline
                preload={idx === 0 ? "auto" : "none"}
                className="absolute inset-0 w-full h-full object-cover object-center brightness-90 contrast-105"
              />
            ) : (
              /* Poster Image fallback when no video or prefers-reduced-motion */
              <div
                className={`relative w-full h-full transition-transform duration-7000 ease-out ${
                  isActive ? "scale-105" : "scale-100"
                }`}
              >
                <Image
                  src={slide.posterImage}
                  alt={slide.imageAlt}
                  fill
                  priority={idx === 0}
                  className="object-cover object-center brightness-90 contrast-105"
                  sizes="100vw"
                />
              </div>
            )}

            {/* Subtle cinematic gradient — minimal darkening so video stays clearly visible */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]/50" />
            <div className="absolute inset-0 bg-black/20" />
          </div>
        );
      })}

      {/* ─── 2. TOP EXPEDITION BADGE ─────────────────────────────────── */}
      <div className="absolute top-16 sm:top-20 left-1/2 -translate-x-1/2 z-20 w-full max-w-5xl px-4 flex justify-center pointer-events-none">
        <div className="pointer-events-auto inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111113]/85 backdrop-blur-md border border-[#f5f5f5]/20 shadow-2xl transition-all hover:border-[#f5f5f5]/40">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#f5f5f5]">
            {currentSlide.badgeLabel}
          </span>
          <span className="hidden sm:inline text-[#f5f5f5]/30">·</span>
          <span className="hidden sm:inline text-[10px] sm:text-[11px] text-[#f5f5f5]/60 font-medium">
            Expedition {currentSlideIndex + 1} of {slides.length}
          </span>
        </div>
      </div>

      {/* ─── 3. MAIN HERO CONTENT STAGE ───────────────────────────────── */}
      <div
        ref={contentStageRef}
        className="relative z-10 h-full max-w-5xl mx-auto px-4 sm:px-6 md:px-10 flex flex-col justify-center items-center text-center pt-32 sm:pt-36 pb-28 sm:pb-24"
      >
        <div className="w-full flex flex-col items-center">
          {/* Eyebrow Label — cleanly below the top badge */}
          <p className="hero-anim-eyebrow text-[10px] sm:text-xs md:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[#f5f5f5]/60 mb-3 sm:mb-4 font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            ASHRAF SIDDIQUI &nbsp;·&nbsp; SOLO TRAVELLER &nbsp;·&nbsp; JAIPUR, INDIA
          </p>

          {/* Solid Dominant Heading */}
          <div className="overflow-hidden">
            <h1
              className="hero-anim-title-solid leading-[0.92] font-bold tracking-tight text-[#f5f5f5] drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]"
              style={{
                fontFamily: "var(--font-fredoka)",
                fontSize: "clamp(2.4rem, 8vw, 6.2rem)",
              }}
            >
              {currentSlide.titleLine1}
            </h1>
          </div>

          {/* Outlined Secondary Heading */}
          <div className="overflow-hidden mb-3 sm:mb-5">
            <h1
              className="hero-anim-title-outline leading-[0.92] font-bold tracking-tight text-transparent drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]"
              style={{
                fontFamily: "var(--font-fredoka)",
                fontSize: "clamp(2.4rem, 8vw, 6.2rem)",
                WebkitTextStroke: "1.5px rgba(245, 245, 245, 0.85)",
              }}
            >
              {currentSlide.titleLine2}
            </h1>
          </div>

          {/* Concise Supporting Description */}
          <p className="hero-anim-desc text-xs sm:text-sm md:text-base text-[#f5f5f5]/85 max-w-2xl leading-relaxed mb-5 sm:mb-7 font-normal px-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            {currentSlide.subtitle}
          </p>

          {/* Structured Trip Information Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-6 sm:mb-8 max-w-3xl">
            {tripPills.map((pill: any, pIdx: number) => (
              <div
                key={pIdx}
                className={`hero-anim-pill px-3 sm:px-3.5 py-1.5 rounded-full backdrop-blur-md border text-center flex items-center gap-1.5 shadow-sm transition-all ${
                  pill.highlight
                    ? "bg-white/10 border-white/25 text-[#f5f5f5]"
                    : "bg-[#111113]/85 border-[#f5f5f5]/10 text-[#f5f5f5]/60"
                }`}
              >
                <span className="text-[10px] uppercase tracking-wider text-[#f5f5f5]/40 font-medium">
                  {pill.label}:
                </span>
                <span
                  className="text-xs sm:text-xs font-bold text-[#f5f5f5]"
                  style={{ fontFamily: "var(--font-fredoka)" }}
                >
                  {pill.value}
                </span>
              </div>
            ))}
          </div>

          {/* Dual Action CTAs */}
          <div className="hero-anim-cta flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md sm:max-w-none">
            {/* Primary Action: View Expedition / Reserve */}
            <button
              onClick={handleOpenBookingModal}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold bg-[#f5f5f5] text-[#080808] hover:bg-white hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
              aria-label={`View details and enquire for ${currentSlide.titleLine1}`}
            >
              <span>{(currentSlide as any).primaryCta?.label || "View Trip Details & Reserve"}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>

            {/* Secondary Action: Explore All Group Expeditions */}
            <button
              onClick={() => scrollToSection((currentSlide as any).secondaryCta?.target || "#group-tours")}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full text-xs sm:text-sm font-semibold border border-[#f5f5f5]/20 text-[#f5f5f5] hover:border-[#f5f5f5]/60 hover:bg-white/5 backdrop-blur-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              aria-label="Explore all group expeditions section"
            >
              <span>{(currentSlide as any).secondaryCta?.label || "Explore All Expeditions"}</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ─── 4. CAROUSEL CONTROLS (Desktop Side Arrows + Floating Bar) ─ */}
      <button
        onClick={goToPrevSlide}
        className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[#111113]/80 backdrop-blur-md border border-[#f5f5f5]/15 text-[#f5f5f5]/70 hover:text-white hover:border-[#f5f5f5]/50 hover:scale-105 transition-all items-center justify-center cursor-pointer shadow-lg"
        aria-label="Previous Expedition Slide"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <button
        onClick={goToNextSlide}
        className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[#111113]/80 backdrop-blur-md border border-[#f5f5f5]/15 text-[#f5f5f5]/70 hover:text-white hover:border-[#f5f5f5]/50 hover:scale-105 transition-all items-center justify-center cursor-pointer shadow-lg"
        aria-label="Next Expedition Slide"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* ─── 5. FLOATING CAROUSEL CONTROLLER (Count, Progress & Pause/Play) ─ */}
      <div className="absolute bottom-16 sm:bottom-16 left-0 right-0 z-20 px-4 flex justify-center pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#111113]/90 backdrop-blur-md border border-[#f5f5f5]/15 shadow-xl">
          {/* Slide Indicator (01 / 04) */}
          <span
            className="text-xs font-bold text-white tabular-nums"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            0{currentSlideIndex + 1}
            <span className="text-[#f5f5f5]/40 font-normal"> / 0{slides.length}</span>
          </span>

          {/* Animated Progress Bar */}
          <div className="w-20 sm:w-28 h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-75 ease-linear"
              style={{ width: `${slideProgress}%` }}
            />
          </div>

          {/* Pause / Resume Button */}
          <button
            onClick={togglePlayPause}
            className="w-6 h-6 rounded-full bg-[#080808]/80 hover:bg-white/10 flex items-center justify-center text-[#f5f5f5] transition-colors cursor-pointer"
            aria-label={isVideoPlaying ? "Pause slideshow and background footage" : "Resume slideshow"}
            title={isVideoPlaying ? "Pause slideshow" : "Play slideshow"}
          >
            {isVideoPlaying ? (
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* ─── 6. BOTTOM QUICK-NAVIGATION CHIPS (Independent Homepage Section Shortcuts) ─ */}
      <div className="absolute bottom-3 sm:bottom-4 left-0 right-0 z-20 px-4 max-w-4xl mx-auto flex justify-center">
        <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 no-scrollbar">
          {QUICK_NAV_CHIPS.map((chip) => (
            <button
              key={chip.label}
              onClick={() => scrollToSection(chip.href)}
              className="px-3 sm:px-4 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap bg-[#111113]/85 hover:bg-[#161619] text-[#f5f5f5]/60 hover:text-[#f5f5f5] border border-[#f5f5f5]/10 hover:border-[#f5f5f5]/30 backdrop-blur-md transition-all cursor-pointer shadow-sm focus:outline-none focus:ring-1 focus:ring-white/40"
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      {/* ─── 7. DIRECT EXPEDITION ENQUIRY MODAL ───────────────────────── */}
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
