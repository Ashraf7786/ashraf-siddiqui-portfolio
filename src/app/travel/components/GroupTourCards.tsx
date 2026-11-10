"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { GROUP_TRIPS, GroupTrip } from "../data/trips";
import TripBookingModal from "./TripBookingModal";

gsap.registerPlugin(ScrollTrigger);

export default function GroupTourCards() {
  const sectionRef = useRef<HTMLElement>(null);
  const [tripsList, setTripsList] = useState<GroupTrip[]>(GROUP_TRIPS);
  const [activeModalTrip, setActiveModalTrip] = useState<GroupTrip | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch("/api/travel/trips")
      .then((r) => r.json())
      .then((d) => {
        if (d.trips && Array.isArray(d.trips) && d.trips.length > 0) {
          setTripsList(d.trips);
        }
      })
      .catch(() => {});
  }, []);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".group-header", {
        y: 35,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [tripsList]);

  return (
    <section id="group-tours" ref={sectionRef} className="py-12 sm:py-16 px-4 sm:px-6 md:px-12 border-t border-[#f5f5f5]/5 bg-[#080808]">
      <div className="max-w-5xl mx-auto">
        <div className="group-header mb-8 sm:mb-12">
          <div className="flex items-center gap-2 mb-2">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/60">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <p className="text-[11px] sm:text-xs tracking-[0.25em] uppercase text-[#f5f5f5]/40 font-semibold">Join the Journey</p>
          </div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#f5f5f5]"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            Group Expeditions
          </h2>
          <p className="mt-2 text-[#f5f5f5]/50 max-w-lg text-xs sm:text-sm leading-relaxed">
            Travel slowly with a close-knit group of 10 to 12 explorers. Personally led by Ashraf Siddiqui across India’s wildest routes.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {tripsList.map((tour) => {
            const isUpcoming = Boolean(tour.isUpcoming || tour.status === "Upcoming" || tour.status === "Draft Sample");
            const seatsPercent = ((tour.totalSeats - tour.availableSeats) / tour.totalSeats) * 100;

            return (
              <div
                key={tour.id}
                className="group-card group relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-[#111113] hover:border-white/20 transition-all duration-300 shadow-xl"
              >
                <div className="grid grid-cols-1 md:grid-cols-12">
                  {/* Left: Cover Image */}
                  <div className="md:col-span-5 relative h-52 sm:h-64 md:h-auto min-h-[220px] overflow-hidden">
                    <Image
                      src={tour.coverImage}
                      alt={tour.title}
                      fill
                      className={`object-cover transition-transform duration-700 group-hover:scale-105 ${
                        isUpcoming ? "brightness-90 contrast-100" : ""
                      }`}
                      sizes="(max-width: 768px) 100vw, 42vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#111113]/30 to-[#111113] hidden md:block" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111113] via-transparent to-transparent md:hidden" />

                    {/* Lock Icon Center Overlay for Upcoming Trips */}
                    {isUpcoming && (
                      <div className="absolute inset-0 bg-black/35 backdrop-blur-[2px] flex items-center justify-center pointer-events-none">
                        <div className="w-12 h-12 rounded-full bg-black/80 backdrop-blur-md border border-white/25 text-white flex items-center justify-center shadow-2xl">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                          </svg>
                        </div>
                      </div>
                    )}

                    {/* Status Badge (Liquid Glass, No Yellow) */}
                    <div className="absolute top-3.5 left-3.5">
                      {isUpcoming ? (
                        <span className="text-[10px] sm:text-[11px] font-semibold px-3 py-1 rounded-full bg-black/70 text-white/90 border border-white/20 flex items-center gap-1.5 backdrop-blur-md shadow-lg">
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                          </svg>
                          <span>Upcoming Expedition</span>
                        </span>
                      ) : (
                        <span className="text-[10px] sm:text-[11px] font-semibold px-3 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 flex items-center gap-1.5 backdrop-blur-md shadow-lg">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                          <span>{tour.status}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right: Content */}
                  <div className="md:col-span-7 p-5 sm:p-6 md:p-7 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
                        <span className="text-[11px] tracking-widest uppercase text-[#f5f5f5]/50 font-medium">
                          {tour.destination}, {tour.state}
                        </span>
                      </div>

                      <h3
                        className="text-xl sm:text-2xl md:text-3xl font-bold text-[#f5f5f5] mb-2 leading-snug"
                        style={{ fontFamily: "var(--font-fredoka)" }}
                      >
                        {tour.title}
                      </h3>

                      {isUpcoming ? (
                        /* ─── UPCOMING TRIP: DETAILS BLURRED, ONLY TAGLINE HIGHLIGHTED ─── */
                        <div className="relative my-3 rounded-2xl overflow-hidden border border-white/10 bg-black/40">
                          {/* Blurred Details Layer in Background */}
                          <div className="absolute inset-0 p-4 filter blur-[6px] opacity-20 pointer-events-none select-none space-y-2">
                            <div className="h-3 bg-white/40 rounded w-3/4" />
                            <div className="flex gap-2">
                              <span className="h-5 bg-white/20 rounded-full w-20" />
                              <span className="h-5 bg-white/20 rounded-full w-24" />
                              <span className="h-5 bg-white/20 rounded-full w-16" />
                            </div>
                            <div className="h-2 bg-white/20 rounded-full w-full" />
                            <div className="h-3 bg-white/30 rounded w-1/2" />
                          </div>

                          {/* Foreground: Crystal-Clear Highlighted Tagline Hero */}
                          <div className="relative z-10 p-5 sm:p-6 text-center flex flex-col items-center justify-center space-y-2.5">
                            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/10 border border-white/15 text-white/90 text-[10px] uppercase font-bold tracking-wider">
                              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                              </svg>
                              <span>Official Expedition Vision</span>
                            </div>

                            {/* Highlighted Tagline */}
                            <blockquote className="text-sm sm:text-base font-medium text-white italic leading-relaxed max-w-md drop-shadow px-2">
                              &ldquo;{tour.tagline}&rdquo;
                            </blockquote>

                            <p className="text-[11px] text-[#f5f5f5]/40 font-mono pt-1">
                              Itinerary &amp; confirmed seats dropping soon
                            </p>
                          </div>
                        </div>
                      ) : (
                        /* ─── LIVE TRIP: FULL DATES, HIGHLIGHTS & SEATS REMAINING ─── */
                        <>
                          <p className="text-xs text-[#f5f5f5]/50 mb-3 sm:mb-4">
                            {tour.departureDate} &rarr; {tour.returnDate} &nbsp;·&nbsp; {tour.durationLabel}
                          </p>

                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {tour.highlights.slice(0, 3).map((h) => (
                              <span key={h} className="text-[11px] px-2.5 py-1 rounded-full bg-[#f5f5f5]/5 text-[#f5f5f5]/70 border border-[#f5f5f5]/10 flex items-center gap-1.5">
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-emerald-400">
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                                <span>{h}</span>
                              </span>
                            ))}
                          </div>

                          <div className="mb-4">
                            <div className="flex items-center justify-between text-[11px] text-[#f5f5f5]/40 mb-1.5">
                              <span>Seats Available</span>
                              <span className="text-white font-medium">{tour.availableSeats} / {tour.totalSeats} seats left</span>
                            </div>
                            <div className="h-1 bg-[#f5f5f5]/10 rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full bg-white transition-all duration-300"
                                style={{ width: `${seatsPercent}%` }}
                              />
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Bottom Action Row (Compact) */}
                    <div className="flex items-center justify-between gap-3 flex-wrap pt-3 border-t border-[#f5f5f5]/5">
                      {isUpcoming ? (
                        <>
                          <div className="flex items-center gap-1.5 text-white/40 text-xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                            <span className="text-[11px] uppercase tracking-wider font-mono">
                              Small Group: 10–12 Travellers
                            </span>
                          </div>
                          <button
                            onClick={() => {
                              setActiveModalTrip(tour);
                              setIsModalOpen(true);
                            }}
                            className="px-5 py-2.5 rounded-full text-xs font-bold bg-white text-black hover:bg-[#eaeaea] transition-all flex items-center gap-2 cursor-pointer shadow-md"
                          >
                            <span>Notify When Dates Drop</span>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <line x1="5" y1="12" x2="19" y2="12" />
                              <polyline points="12 5 19 12 12 19" />
                            </svg>
                          </button>
                        </>
                      ) : (
                        <>
                          <div>
                            <p className="text-[9px] text-[#f5f5f5]/30 uppercase tracking-widest">Expedition Mode</p>
                            <p
                              className="text-base sm:text-lg font-bold text-[#f5f5f5]"
                              style={{ fontFamily: "var(--font-fredoka)" }}
                            >
                              Curated Group Tour
                              <span className="text-[11px] text-[#f5f5f5]/40 font-normal block font-sans">
                                Small Group (10–12 Travellers)
                              </span>
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                setActiveModalTrip(tour);
                                setIsModalOpen(true);
                              }}
                              className="px-4 py-2 rounded-full text-xs font-semibold text-white/80 hover:text-white bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/30 transition-all cursor-pointer"
                            >
                              View Itinerary
                            </button>
                            <button
                              onClick={() => {
                                setActiveModalTrip(tour);
                                setIsModalOpen(true);
                              }}
                              className="px-5 py-2 rounded-full text-xs font-bold text-black bg-white hover:bg-[#eaeaea] transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
                            >
                              <span>Reserve Seat</span>
                              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <line x1="5" y1="12" x2="19" y2="12" />
                                <polyline points="12 5 19 12 12 19" />
                              </svg>
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Booking Modal */}
      {activeModalTrip && (
        <TripBookingModal
          trip={activeModalTrip}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </section>
  );
}
