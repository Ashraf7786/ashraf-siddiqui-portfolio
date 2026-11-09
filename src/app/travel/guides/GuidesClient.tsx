"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { TRAVEL_GUIDES, TravelGuide } from "../data/guides";

const CATEGORIES = [
  "All Categories",
  "High Altitude Mountain",
  "Desert Expedition",
  "Offbeat Northeast",
  "Road Circuit",
];

const SEASONS = [
  "All Seasons",
  "Winter Snow",
  "Spring Bloom",
  "Summer Passes",
  "Autumn Gold",
];

export default function GuidesClient() {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedSeason, setSelectedSeason] = useState("All Seasons");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredGuides = useMemo(() => {
    return TRAVEL_GUIDES.filter((guide) => {
      const matchCat =
        selectedCategory === "All Categories" || guide.category === selectedCategory;
      const matchSeason =
        selectedSeason === "All Seasons" || guide.season === selectedSeason;
      const matchQuery =
        !searchQuery.trim() ||
        guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        guide.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
        guide.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
        guide.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSeason && matchQuery;
    });
  }, [selectedCategory, selectedSeason, searchQuery]);

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
          <span className="text-[#f5f5f5]/80 font-medium">Travel Guides & Itineraries</span>
        </div>

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#f5f5f5]/50">
                <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/>
                <line x1="8" y1="2" x2="8" y2="18"/>
                <line x1="16" y1="6" x2="16" y2="22"/>
              </svg>
              <p className="text-[11px] sm:text-xs tracking-[0.25em] uppercase text-[#f5f5f5]/40 font-medium">
                Field-Tested Route Blueprints
              </p>
            </div>
            <h1
              className="text-3xl sm:text-5xl md:text-6xl font-bold text-[#f5f5f5] leading-tight"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              Travel Guides & Itineraries
            </h1>
            <p className="mt-3 text-xs sm:text-sm text-[#f5f5f5]/50 max-w-xl leading-relaxed">
              Exhaustive day-by-day itineraries, exact travel distances, local transport options,
              honest food picks, and realistic budget breakdowns across India.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Search guides, passes, states..."
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
        <div className="space-y-4 mb-12 pb-6 border-b border-[#f5f5f5]/10">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-[#f5f5f5]/30 mb-2 font-medium">
              Filter by Route Style:
            </p>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === cat
                      ? "bg-[#f5f5f5] text-[#080808] font-bold shadow-md"
                      : "bg-[#111113] text-[#f5f5f5]/50 hover:text-white border border-[#f5f5f5]/10 hover:border-[#f5f5f5]/20"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-wider text-[#f5f5f5]/30 mb-2 font-medium">
              Filter by Season:
            </p>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              {SEASONS.map((season) => (
                <button
                  key={season}
                  onClick={() => setSelectedSeason(season)}
                  className={`px-3 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap transition-colors ${
                    selectedSeason === season
                      ? "bg-[#f5f5f5]/20 text-white border border-[#f5f5f5]/40"
                      : "bg-[#111113]/60 text-[#f5f5f5]/40 hover:text-white border border-[#f5f5f5]/5"
                  }`}
                >
                  {season}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGuides.map((guide) => (
            <Link
              key={guide.id}
              href={`/travel/guides/${guide.slug}`}
              className="group flex flex-col rounded-3xl overflow-hidden border border-[#f5f5f5]/10 bg-[#111113] hover:border-[#f5f5f5]/30 transition-all duration-300 hover:-translate-y-1 shadow-lg"
            >
              {/* Cover Image Frame */}
              <div className="relative h-60 w-full overflow-hidden">
                <Image
                  src={guide.heroImage}
                  alt={guide.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111113] via-transparent to-transparent" />

                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-wider font-semibold px-3 py-1 rounded-full bg-black/60 text-[#f5f5f5] backdrop-blur-md border border-[#f5f5f5]/10">
                    {guide.durationLabel}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full bg-black/60 text-[#f5f5f5]/80 backdrop-blur-md border border-[#f5f5f5]/10">
                    {guide.difficulty}
                  </span>
                </div>

                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white/80">
                  <span className="flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                    {guide.destination}, {guide.state}
                  </span>
                  <span className="text-[11px] text-white/60">
                    {guide.totalDistanceKm} km Circuit
                  </span>
                </div>
              </div>

              {/* Guide Content Info */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3
                    className="text-xl font-bold text-[#f5f5f5] leading-snug group-hover:text-white transition-colors mb-2"
                    style={{ fontFamily: "var(--font-fredoka)" }}
                  >
                    {guide.title}
                  </h3>

                  <p className="text-xs text-[#f5f5f5]/55 leading-relaxed line-clamp-3 mb-6">
                    {guide.subtitle}
                  </p>
                </div>

                <div>
                  {/* Budget Estimate Pill */}
                  <div className="p-3.5 rounded-2xl bg-[#080808] border border-[#f5f5f5]/10 mb-4">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-[#f5f5f5]/40 text-[10px] uppercase tracking-wider font-medium">
                        Estimated Budget
                      </span>
                      <span className="text-[10px] text-[#f5f5f5]/40">
                        {guide.budgetEstimate.dateEstimated}
                      </span>
                    </div>
                    <p
                      className="text-sm font-bold text-[#f5f5f5]"
                      style={{ fontFamily: "var(--font-fredoka)" }}
                    >
                      ₹{guide.budgetEstimate.perPersonMin.toLocaleString()} – ₹{guide.budgetEstimate.perPersonMax.toLocaleString()}
                      <span className="text-xs font-normal text-[#f5f5f5]/40 ml-1">/ person</span>
                    </p>
                  </div>

                  {/* Footer Action */}
                  <div className="flex items-center justify-between pt-3 border-t border-[#f5f5f5]/10 text-xs">
                    <span className="text-[#f5f5f5]/40 text-[11px]">
                      {guide.idealMonths}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#f5f5f5]/80 group-hover:text-white group-hover:translate-x-1 transition-all">
                      View Itinerary
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="5" y1="12" x2="19" y2="12"/>
                        <polyline points="12 5 19 12 12 19"/>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredGuides.length === 0 && (
          <div className="py-20 text-center rounded-3xl bg-[#111113] border border-[#f5f5f5]/5 p-8">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto text-[#f5f5f5]/30 mb-3">
              <circle cx="12" cy="12" r="10"/>
              <line x1="8" y1="12" x2="16" y2="12"/>
            </svg>
            <p className="text-sm text-[#f5f5f5]/60 font-medium">No travel guides found matching your filters</p>
            <button
              onClick={() => {
                setSelectedCategory("All Categories");
                setSelectedSeason("All Seasons");
                setSearchQuery("");
              }}
              className="mt-4 px-4 py-2 rounded-full bg-[#f5f5f5] text-[#080808] text-xs font-semibold hover:bg-white transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

