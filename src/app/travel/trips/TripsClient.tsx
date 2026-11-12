"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { GROUP_TRIPS, GroupTrip } from "../data/trips";
import TripBookingModal from "../components/TripBookingModal";

const FILTERS = [
  "All Expeditions",
  "Confirmed Expeditions",
  "High Altitude",
  "7–8 Day Circuits",
];

export default function TripsClient() {
  const [tripsList, setTripsList] = useState<GroupTrip[]>(GROUP_TRIPS);
  const [selectedFilter, setSelectedFilter] = useState("All Expeditions");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModalTrip, setActiveModalTrip] = useState<GroupTrip | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch(`/api/travel/trips?t=${Date.now()}`, { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        if (d.trips && Array.isArray(d.trips) && d.trips.length > 0) {
          setTripsList(d.trips);
        }
      })
      .catch(() => {});
  }, []);

  const filteredTrips = useMemo(() => {
    return tripsList.filter((trip) => {
      let matchFilter = true;
      if (selectedFilter === "Confirmed Expeditions") matchFilter = trip.isConfirmed;
      if (selectedFilter === "High Altitude") matchFilter = trip.difficulty !== "Easy to Moderate";
      if (selectedFilter === "7–8 Day Circuits") matchFilter = trip.durationDays >= 7;

      const matchQuery =
        !searchQuery.trim() ||
        trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trip.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trip.state.toLowerCase().includes(searchQuery.toLowerCase());

      return matchFilter && matchQuery;
    });
  }, [selectedFilter, searchQuery]);

  const handleOpenBooking = (trip: GroupTrip) => {
    setActiveModalTrip(trip);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#080808] text-[#f5f5f5] pt-24 sm:pt-28 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#f5f5f5]/40 mb-6">
          <Link href="/travel" className="hover:text-white transition-colors flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Travel Diaries
          </Link>
          <span>/</span>
          <span className="text-[#f5f5f5]/80 font-medium">Group Expeditions</span>
        </div>

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#f5f5f5]/50">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              <p className="text-[11px] sm:text-xs tracking-[0.2em] uppercase text-[#f5f5f5]/60 font-semibold font-mono">
                Budget Expeditions · From ₹4,999 to ₹19,999
              </p>
            </div>
            <h1
              className="text-3xl sm:text-5xl md:text-6xl font-bold text-[#f5f5f5] leading-tight"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              Upcoming Group Expeditions
            </h1>
            <p className="mt-3 text-xs sm:text-sm text-[#f5f5f5]/70 max-w-xl leading-relaxed">
              Pocket-friendly small-group journeys from ₹4,999 to ₹19,999. Travel slowly with 10 to 12 explorers, staying in local homestays with zero hidden charges.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Search expeditions, dates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#111113] text-xs text-[#f5f5f5] placeholder-[#f5f5f5]/30 pl-9 pr-3 py-2.5 rounded-xl border border-[#f5f5f5]/10 outline-none focus:border-[#f5f5f5]/40"
            />
            <svg
              className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#f5f5f5]/40"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-10 no-scrollbar border-b border-[#f5f5f5]/10">
          {FILTERS.map((filt) => (
            <button
              key={filt}
              onClick={() => setSelectedFilter(filt)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                selectedFilter === filt
                  ? "bg-[#f5f5f5] text-[#080808] font-bold shadow-md"
                  : "bg-[#111113] text-[#f5f5f5]/50 hover:text-white border border-[#f5f5f5]/10 hover:border-[#f5f5f5]/20"
              }`}
            >
              {filt}
            </button>
          ))}
        </div>

        {/* Trips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTrips.map((trip) => {
            const isUpcoming = Boolean(trip.isUpcoming || trip.status === "Upcoming" || trip.status === "Draft Sample");
            const seatsPercent = ((trip.totalSeats - trip.availableSeats) / trip.totalSeats) * 100;
            return (
              <div
                key={trip.id}
                className={`group flex flex-col rounded-3xl overflow-hidden border transition-all duration-300 shadow-lg ${
                  isUpcoming
                    ? "opacity-75 hover:opacity-90 border-amber-500/20 bg-[#0d0d0f]"
                    : "border-[#f5f5f5]/10 bg-[#111113] hover:border-[#f5f5f5]/30 hover:-translate-y-1"
                }`}
              >
                {/* Cover Frame */}
                <div className="relative h-60 w-full overflow-hidden">
                  <Image
                    src={trip.coverImage}
                    alt={trip.title}
                    fill
                    className={`object-cover transition-transform duration-700 group-hover:scale-105 ${
                      isUpcoming ? "grayscale-[25%]" : ""
                    }`}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111113] via-transparent to-transparent" />

                  {/* Lock Overlay on Image for Upcoming Trips */}
                  {isUpcoming && (
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-black/80 border border-amber-400/40 text-amber-300 flex items-center justify-center shadow-2xl">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                        </svg>
                      </div>
                    </div>
                  )}

                  {/* Top Status & Date Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    {isUpcoming ? (
                      <span className="text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full backdrop-blur-md bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                        </svg>
                        <span>Upcoming Expedition</span>
                      </span>
                    ) : (
                      <span
                        className={`text-[10px] uppercase tracking-wider font-semibold px-3 py-1 rounded-full backdrop-blur-md border ${
                          trip.isConfirmed
                            ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                            : "bg-white/10 text-[#f5f5f5]/60 border-white/10"
                        }`}
                      >
                        {trip.status}
                      </span>
                    )}

                    <span className="text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full bg-black/60 text-white backdrop-blur-md border border-white/10">
                      {isUpcoming ? "Announcement" : trip.durationLabel}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white">
                    <span className="flex items-center gap-1 font-medium">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                      {trip.destination}, {trip.state}
                    </span>
                    {!isUpcoming && (
                      <span className="text-[11px] text-white/70">
                        Departs {trip.departureCity}
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  {isUpcoming ? (
                    /* ─── UPCOMING TRIP VIEW: ONLY TITLE & TAGLINE (DETAILS HIDDEN) ─── */
                    <>
                      <div>
                        <h3
                          className="text-xl font-bold text-[#f5f5f5] leading-snug mb-3"
                          style={{ fontFamily: "var(--font-fredoka)" }}
                        >
                          {trip.title}
                        </h3>

                        {/* ONLY TAGLINE SHOWN AS REQUESTED */}
                        <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 my-2">
                          <p className="text-xs text-[#f5f5f5]/80 leading-relaxed italic border-l-2 border-amber-400/50 pl-3">
                            &ldquo;{trip.tagline}&rdquo;
                          </p>
                        </div>
                      </div>

                      {/* Locked Footer Action */}
                      <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-6">
                        <div className="flex items-center gap-1.5 text-white/50 text-xs">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-400">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                          </svg>
                          <span className="text-[11px] font-semibold uppercase tracking-wider text-white/50">
                            Dates &amp; Pricing TBA
                          </span>
                        </div>
                        <button
                          onClick={() =>
                            alert(
                              `"${trip.title}" is currently in reconnaissance. Follow Ashraf on Instagram (@ashraf._siddiqui) to get early access when dates drop!`
                            )
                          }
                          className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white/90 hover:text-white border border-white/20 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <span>Notify Me</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    /* ─── LIVE TRIP VIEW: FULL DETAILS, PRICING & BOOKING ─── */
                    <>
                      <div>
                        {/* Departure Dates */}
                        <div className="flex items-center gap-1.5 text-xs text-[#f5f5f5]/50 mb-2">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                            <line x1="16" y1="2" x2="16" y2="6"/>
                            <line x1="8" y1="2" x2="8" y2="6"/>
                            <line x1="3" y1="10" x2="21" y2="10"/>
                          </svg>
                          <span>{trip.departureDate} &rarr; {trip.returnDate}</span>
                        </div>

                        <h3
                          className="text-xl font-bold text-[#f5f5f5] leading-snug group-hover:text-white transition-colors mb-2"
                          style={{ fontFamily: "var(--font-fredoka)" }}
                        >
                          {trip.title}
                        </h3>

                        <p className="text-xs text-[#f5f5f5]/55 leading-relaxed line-clamp-2 mb-4">
                          {trip.tagline}
                        </p>
                      </div>

                      <div>
                        {/* Seats Availability Bar */}
                        <div className="p-3.5 rounded-2xl bg-[#080808] border border-[#f5f5f5]/10 mb-4">
                          <div className="flex items-center justify-between text-xs mb-1.5">
                            <span className="text-[#f5f5f5]/40 text-[10px] uppercase tracking-wider font-medium">
                              Seats Remaining
                            </span>
                            <span className="text-[11px] font-bold text-white">
                              {trip.availableSeats} of {trip.totalSeats} seats left
                            </span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                            <div
                              className="h-full rounded-full bg-white transition-all duration-300"
                              style={{ width: `${seatsPercent}%` }}
                            />
                          </div>
                        </div>

                        {/* Trip Mode and CTA */}
                        <div className="flex items-center justify-between pt-3 border-t border-[#f5f5f5]/10">
                          <div>
                            <span className="text-[10px] uppercase tracking-wider text-[#f5f5f5]/40 block font-mono">
                              All-Inclusive
                            </span>
                            <p
                              className="text-base sm:text-lg font-bold text-[#f5f5f5] flex items-baseline gap-1"
                              style={{ fontFamily: "var(--font-fredoka)" }}
                            >
                              ₹{trip.pricePerPerson.toLocaleString("en-IN")}
                              <span className="text-[11px] text-white/40 font-normal">/ person</span>
                            </p>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleOpenBooking(trip)}
                              className="px-3.5 py-2 rounded-full border border-[#f5f5f5]/20 hover:border-[#f5f5f5]/60 text-xs font-semibold text-[#f5f5f5] transition-colors cursor-pointer"
                            >
                              Itinerary
                            </button>
                            <button
                              onClick={() => handleOpenBooking(trip)}
                              className="px-4 py-2 rounded-full bg-[#f5f5f5] text-[#080808] text-xs font-bold hover:bg-white transition-colors shadow-md cursor-pointer"
                            >
                              Join Trip
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Registration Enquiry Modal */}
      {activeModalTrip && (
        <TripBookingModal
          trip={activeModalTrip}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

