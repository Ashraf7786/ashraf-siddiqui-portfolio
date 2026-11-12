"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

gsap.registerPlugin(ScrollTrigger);

interface Review {
  name: string;
  city: string;
  trip: string;
  badge: string;
  rating: number;
  text: string;
  date: string;
}

const REVIEWS: Review[] = [
  {
    name: "Priya Sharma",
    city: "Bangalore",
    trip: "Kashmir Winter Expedition",
    badge: "Solo Female Traveler",
    rating: 5,
    text: "I was nervous about joining solo as a female traveler, but Ashraf and the group made it feel like traveling with old friends. The cedar houseboat on Dal Lake and snow walks in Gulmarg were pure magic. Highly recommend to any solo traveler!",
    date: "Jan 2026 Batch",
  },
  {
    name: "Rohit Verma",
    city: "New Delhi",
    trip: "Rajasthan Desert Weekend",
    badge: "Student Backpacker",
    rating: 5,
    text: "Best ₹4,999 I ever spent. No commercial tour bus rush. We camped in Swiss tents right under the open stars in Sam Sand Dunes and ate hot dal baati at roadside dhabas. Honest, simple, and real.",
    date: "Dec 2025 Batch",
  },
  {
    name: "Ananya Sen",
    city: "Kolkata",
    trip: "Spiti Valley Circuit",
    badge: "Solo Explorer",
    rating: 5,
    text: "High mountain roads and zero drama. Everything promised in the itinerary was delivered honestly without any surprise charges or forced shopping stops. The homestay hosts were so warm.",
    date: "Oct 2025 Batch",
  },
  {
    name: "Aditya Nair",
    city: "Mumbai",
    trip: "Meghalaya Waterfalls Trail",
    badge: "Nature & Trekker",
    rating: 5,
    text: "The 3,000 steps down to the Living Root Bridge was challenging, but the small group pace and local Khasi homestay made it unforgettable. Great memories and zero tourist gimmicks.",
    date: "Nov 2025 Batch",
  },
];

export default function TravelerReviews() {
  const sectionRef = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".reviews-header", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
      });
      gsap.from(".review-card", {
        y: 35,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 sm:py-24 px-4 sm:px-6 md:px-12 bg-[#080808] border-t border-white/5 relative">
      <div className="max-w-6xl mx-auto space-y-12 sm:space-y-16">
        
        {/* ─── 1. SECTION HEADER ─── */}
        <div className="reviews-header text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs font-mono font-medium">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-white/60">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span>Verified Reviews · Real Experiences</span>
          </div>

          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            What Travelers Say About Our Trips
          </h2>

          <p className="text-xs sm:text-sm text-white/60 leading-relaxed max-w-xl mx-auto">
            Honest feedback from students, solo travelers, and working professionals who joined our small group batches across India.
          </p>
        </div>

        {/* ─── 2. TRUST STATS BAR ─── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 p-5 sm:p-6 rounded-3xl bg-[#111113] border border-white/10 text-center">
          <div className="space-y-1">
            <span className="text-2xl sm:text-3xl font-bold text-white block" style={{ fontFamily: "var(--font-fredoka)" }}>
              4.9 / 5.0
            </span>
            <div className="flex justify-center gap-1 text-white/80 py-0.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <p className="text-[11px] text-white/50">140+ Verified Travelers</p>
          </div>

          <div className="space-y-1 border-l border-white/5 pl-2 sm:pl-4">
            <span className="text-2xl sm:text-3xl font-bold text-white block" style={{ fontFamily: "var(--font-fredoka)" }}>
              65%
            </span>
            <p className="text-xs font-semibold text-white/90">Solo Travelers</p>
            <p className="text-[11px] text-white/50">Same-gender room pairing</p>
          </div>

          <div className="space-y-1 border-l border-white/5 pl-2 sm:pl-4">
            <span className="text-2xl sm:text-3xl font-bold text-white block" style={{ fontFamily: "var(--font-fredoka)" }}>
              ₹0
            </span>
            <p className="text-xs font-semibold text-white/90">Hidden Costs</p>
            <p className="text-[11px] text-white/50">Stays, travel &amp; food covered</p>
          </div>

          <div className="space-y-1 border-l border-white/5 pl-2 sm:pl-4">
            <span className="text-2xl sm:text-3xl font-bold text-white block" style={{ fontFamily: "var(--font-fredoka)" }}>
              10–12
            </span>
            <p className="text-xs font-semibold text-white/90">Group Limit</p>
            <p className="text-[11px] text-white/50">Never a crowded tour bus</p>
          </div>
        </div>

        {/* ─── 3. TESTIMONIAL CARDS GRID ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {REVIEWS.map((rev, idx) => (
            <div
              key={idx}
              className="review-card p-6 sm:p-7 rounded-3xl bg-[#111113] border border-white/10 hover:border-white/20 transition-all space-y-4 shadow-lg flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Top Badge & Rating */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 font-semibold">
                    {rev.badge}
                  </span>
                  <div className="flex items-center gap-0.5 text-white/80">
                    {[...Array(rev.rating)].map((_, i) => (
                      <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-[#f5f5f5]/80 leading-relaxed italic">
                  &ldquo;{rev.text}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-white" style={{ fontFamily: "var(--font-fredoka)" }}>
                    {rev.name}
                  </p>
                  <p className="text-[11px] text-white/40">
                    {rev.city} · <span className="text-white/60">{rev.trip}</span>
                  </p>
                </div>
                <span className="text-[10px] text-white/40 font-mono">
                  {rev.date}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ─── 4. HOW BOOKING WORKS (ZERO RISK) ─── */}
        <div className="rounded-3xl bg-white/[0.02] border border-white/10 p-6 sm:p-8 space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1.5">
            <p className="text-[11px] uppercase tracking-wider text-white/50 font-mono font-semibold">
              Simple &amp; Transparent
            </p>
            <h3 className="text-xl sm:text-2xl font-bold text-white" style={{ fontFamily: "var(--font-fredoka)" }}>
              How Reserving Your Seat Works
            </h3>
            <p className="text-xs text-white/60">
              Zero payment required today. We never ask for payment details upfront.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 sm:p-5 rounded-2xl bg-[#111113] border border-white/10 space-y-2">
              <span className="w-7 h-7 rounded-full bg-white/10 text-white font-mono font-bold text-xs flex items-center justify-center">
                1
              </span>
              <p className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-fredoka)" }}>
                Fill 30-Second Form
              </p>
              <p className="text-xs text-white/50 leading-relaxed">
                Click &ldquo;Book Spot&rdquo; on any trip. Enter your contact details and city. No card details needed.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#111113] border border-white/10 space-y-2">
              <span className="w-7 h-7 rounded-full bg-white/10 text-white font-mono font-bold text-xs flex items-center justify-center">
                2
              </span>
              <p className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-fredoka)" }}>
                Personal Verification
              </p>
              <p className="text-xs text-white/50 leading-relaxed">
                Ashraf reviews seat availability and emails you the full day-by-day plan, packing guide, and batch details.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#111113] border border-white/10 space-y-2">
              <span className="w-7 h-7 rounded-full bg-white/10 text-white font-mono font-bold text-xs flex items-center justify-center">
                3
              </span>
              <p className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-fredoka)" }}>
                Confirm With Small Token
              </p>
              <p className="text-xs text-white/50 leading-relaxed">
                Only after you are 100% happy with the details, pay a small token deposit to secure your spot.
              </p>
            </div>
          </div>
        </div>

        {/* ─── 5. SOLO TRAVELER & SAFETY COMMITMENT ─── */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div>
              <p className="text-white font-bold text-sm" style={{ fontFamily: "var(--font-fredoka)" }}>
                Safe For Solo Women &amp; Beginners
              </p>
              <p className="text-white/50 text-[11px] mt-0.5">
                Verified homestays · Experienced mountain drivers · Zero alcohol or party pressure · 24/7 on-ground assistance
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => document.querySelector("#group-tours")?.scrollIntoView({ behavior: "smooth" })}
            className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-white text-black font-bold text-xs hover:bg-[#eaeaea] transition-all shrink-0 cursor-pointer shadow-md"
          >
            <span>Browse Upcoming Trips</span>
          </button>
        </div>

      </div>
    </section>
  );
}
