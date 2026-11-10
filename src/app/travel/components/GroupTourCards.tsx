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
        y: 50,
        opacity: 0,
        duration: 1.0,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });
      gsap.from(".group-card", {
        scale: 0.95,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [tripsList]);

  return (
    <section id="group-tours" ref={sectionRef} className="py-20 sm:py-24 px-4 sm:px-6 md:px-16 border-t border-[#f5f5f5]/5 bg-[#080808]">
      <div className="max-w-6xl mx-auto">
        <div className="group-header mb-10 sm:mb-16">
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/60">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <p className="text-[11px] sm:text-xs tracking-[0.25em] uppercase text-[#f5f5f5]/30">Join the Journey</p>
          </div>
          <h2
            className="text-4xl sm:text-5xl md:text-7xl font-bold text-[#f5f5f5]"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            Group Expeditions
          </h2>
          <p className="mt-3 sm:mt-4 text-[#f5f5f5]/40 max-w-lg text-xs sm:text-sm leading-relaxed">
            Travel slowly with a close-knit group of 10 to 12 explorers. Personally led by Ashraf Siddiqui across India’s wildest routes.
          </p>
        </div>

        <div className="flex flex-col gap-8">
          {tripsList.map((tour) => {
            const isUpcoming = Boolean(tour.isUpcoming || tour.status === "Upcoming" || tour.status === "Draft Sample");
            const seatsPercent = ((tour.totalSeats - tour.availableSeats) / tour.totalSeats) * 100;

            return (
              <div
                key={tour.id}
                className={`group-card group relative rounded-3xl overflow-hidden border transition-all duration-300 ${
                  isUpcoming
                    ? "opacity-75 hover:opacity-90 border-amber-500/20 bg-[#0d0d0f]"
                    : "border-[#f5f5f5]/10 bg-[#111113] hover:border-[#f5f5f5]/25"
                }`}
              >
                <div className="md:grid md:grid-cols-2">
                  {/* Left: Cover Image */}
                  <div className="relative h-64 sm:h-80 md:h-auto overflow-hidden">
                    <Image
                      src={tour.coverImage}
                      alt={tour.title}
                      fill
                      className={`object-cover transition-transform duration-700 group-hover:scale-105 ${
                        isUpcoming ? "grayscale-[25%]" : ""
                      }`}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#111113] hidden md:block" />

                    {/* Lock Icon Center Overlay for Upcoming Trips */}
                    {isUpcoming && (
                      <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-black/80 border border-amber-400/40 text-amber-300 flex items-center justify-center shadow-2xl">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                          </svg>
                        </div>
                      </div>
                    )}

                    {/* Status Badge */}
                    <div className="absolute top-4 left-4">
                      {isUpcoming ? (
                        <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1.5 backdrop-blur-md">
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                          </svg>
                          <span>Upcoming Expedition</span>
                        </span>
                      ) : (
                        <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 flex items-center gap-1.5 backdrop-blur-md">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2c1.5 3 4 5.5 4 8.5 0 3.5-2.5 6.5-6 6.5s-6-3-6-6.5C4 7.5 6.5 5 8 2c.5 2 1.5 3.5 2 4.5.5-1 1.5-2.5 2-4.5z" />
                          </svg>
                          {tour.status}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right: Content */}
                  <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-3 sm:mb-4">
                        <span className="w-2 h-2 rounded-full bg-white/60" />
                        <span className="text-xs tracking-widest uppercase text-[#f5f5f5]/40">{tour.destination}, {tour.state}</span>
                      </div>

                      <h3
                        className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#f5f5f5] mb-2 leading-tight"
                        style={{ fontFamily: "var(--font-fredoka)" }}
                      >
                        {tour.title}
                      </h3>

                      {isUpcoming ? (
                        /* ─── UPCOMING TRIP: ONLY TAGLINE SHOWN (DETAILS HIDDEN) ─── */
                        <div className="my-5 p-4 rounded-2xl bg-black/50 border border-white/5 space-y-2">
                          <span className="text-[10px] uppercase tracking-wider text-amber-400/80 font-bold block">
                            🔒 Expedition Announcement
                          </span>
                          <p className="text-xs sm:text-sm text-[#f5f5f5]/80 italic leading-relaxed border-l-2 border-amber-400/60 pl-3">
                            &ldquo;{tour.tagline}&rdquo;
                          </p>
                        </div>
                      ) : (
                        /* ─── LIVE TRIP: FULL DATES, HIGHLIGHTS & SEATS REMAINING ─── */
                        <>
                          <p className="text-xs sm:text-sm text-[#f5f5f5]/50 mb-5 sm:mb-6">{tour.departureDate} &rarr; {tour.returnDate} &nbsp;·&nbsp; {tour.durationLabel}</p>

                          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-5 sm:mb-6">
                            {tour.highlights.slice(0, 4).map((h) => (
                              <span key={h} className="text-[11px] sm:text-xs px-2.5 sm:px-3 py-1 rounded-full bg-[#f5f5f5]/5 text-[#f5f5f5]/60 border border-[#f5f5f5]/10 flex items-center gap-1.5">
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-emerald-400">
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                                <span>{h}</span>
                              </span>
                            ))}
                          </div>

                          <div className="mb-5 sm:mb-6">
                            <div className="flex items-center justify-between text-xs text-[#f5f5f5]/40 mb-2">
                              <span>Seats Available</span>
                              <span className="text-white font-medium">{tour.availableSeats} / {tour.totalSeats} seats left</span>
                            </div>
                            <div className="h-1.5 bg-[#f5f5f5]/10 rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full bg-white transition-all duration-300"
                                style={{ width: `${seatsPercent}%` }}
                              />
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Bottom CTA Row */}
                    <div className="flex items-center justify-between gap-4 flex-wrap pt-4 border-t border-[#f5f5f5]/5">
                      {isUpcoming ? (
                        <>
                          <div className="flex items-center gap-2 text-white/50 text-xs">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-400">
                              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                            <span className="text-xs uppercase tracking-wider text-white/50 font-medium">
                              Route in Reconnaissance · Dates TBA
                            </span>
                          </div>
                          <button
                            onClick={() =>
                              alert(
                                `"${tour.title}" will open for registration soon! Follow @ashraf._siddiqui on Instagram for announcement drops.`
                              )
                            }
                            className="px-6 sm:px-8 py-3 rounded-full text-xs sm:text-sm font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all flex items-center gap-2 cursor-pointer"
                          >
                            <span>Notify When Dates Drop</span>
                          </button>
                        </>
                      ) : (
                        <>
                          <div>
                            <p className="text-[10px] text-[#f5f5f5]/30 uppercase tracking-widest">Starting from</p>
                            <p
                              className="text-2xl sm:text-3xl font-bold text-[#f5f5f5]"
                              style={{ fontFamily: "var(--font-fredoka)" }}
                            >
                              ₹{tour.pricePerPerson.toLocaleString()}
                              <span className="text-xs text-[#f5f5f5]/40 font-normal"> /person</span>
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Link
                              href={`/travel/trips/${tour.slug}`}
                              className="px-5 py-2.5 rounded-full text-xs font-semibold text-white/70 hover:text-white border border-white/15 hover:border-white/40 transition-all"
                            >
                              View Details
                            </Link>
                            <button
                              onClick={() => {
                                setActiveModalTrip(tour);
                                setIsModalOpen(true);
                              }}
                              className="px-6 sm:px-7 py-2.5 rounded-full text-xs font-bold text-black bg-white hover:bg-[#eaeaea] transition-all flex items-center gap-2 shadow-lg cursor-pointer"
                            >
                              <span>Reserve Seat</span>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
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
