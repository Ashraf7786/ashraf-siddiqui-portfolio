"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { TRAVEL_REELS, INSTAGRAM_PROFILE } from "../data/reels";
import IPhoneReelCard from "../components/IPhoneReelCard";
import ReelsViewerModal from "../components/ReelsViewerModal";

const CATEGORIES = [
  "All Categories",
  "Mountain Passes",
  "Road Adventures",
  "Hidden India",
  "Northeast Trails",
  "Spiritual Roads",
];

const DESTINATIONS = [
  "All Destinations",
  "Kashmir",
  "Ladakh",
  "Rajasthan",
  "Meghalaya",
  "Spiti",
  "Uttar Pradesh",
];

export default function ReelsClient() {
  const searchParams = useSearchParams();
  const initialId = searchParams.get("id");

  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedDestination, setSelectedDestination] = useState("All Destinations");
  const [activeModalReelId, setActiveModalReelId] = useState<string | null>(initialId || null);
  const [isModalOpen, setIsModalOpen] = useState(Boolean(initialId));

  const filteredReels = useMemo(() => {
    return TRAVEL_REELS.filter((reel) => {
      const matchCat =
        selectedCategory === "All Categories" || reel.category === selectedCategory;
      const matchDest =
        selectedDestination === "All Destinations" || reel.destination === selectedDestination;
      return matchCat && matchDest;
    });
  }, [selectedCategory, selectedDestination]);

  const handleOpenReel = (reelId: string) => {
    setActiveModalReelId(reelId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#080808] text-[#f5f5f5] pt-24 sm:pt-28 pb-32">
      {/* Container */}
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
          <span className="text-[#f5f5f5]/80 font-medium">Reels Feed</span>
        </div>

        {/* Page Header */}
        <div className="mb-8 max-w-3xl">
          <div className="flex items-center gap-2 mb-3">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#f5f5f5]/50">
              <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/>
              <line x1="7" y1="2" x2="7" y2="22"/>
              <line x1="17" y1="2" x2="17" y2="22"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <line x1="2" y1="7" x2="7" y2="7"/>
              <line x1="2" y1="17" x2="7" y2="17"/>
              <line x1="17" y1="17" x2="22" y2="17"/>
              <line x1="17" y1="7" x2="22" y2="7"/>
            </svg>
            <p className="text-[11px] sm:text-xs tracking-[0.25em] uppercase text-[#f5f5f5]/40 font-medium">
              Instagram Video Feed · @{INSTAGRAM_PROFILE.username}
            </p>
          </div>
          <h1
            className="text-3xl sm:text-5xl md:text-6xl font-bold text-[#f5f5f5] leading-tight"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            Travel in 60 Seconds
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-[#f5f5f5]/50 leading-relaxed">
            Hover over any iPhone screen to play the reel. Remove cursor to pause.
            Tap sound to listen with audio or click comments to inspect full details.
          </p>
        </div>

        {/* ─── AUTHENTIC INSTAGRAM PROFILE BAR ───────────────────────── */}
        <div className="mb-10 p-5 sm:p-6 rounded-3xl bg-[#111113] border border-[#f5f5f5]/10 shadow-xl max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            {/* Left: Avatar + Identity */}
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full p-[2.5px] bg-gradient-to-tr from-[#f09433] via-[#bc1888] to-[#cc2366] shrink-0">
                <div className="w-full h-full rounded-full overflow-hidden bg-black relative">
                  <Image
                    src={INSTAGRAM_PROFILE.avatarUrl}
                    alt={INSTAGRAM_PROFILE.displayName}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                    {INSTAGRAM_PROFILE.username}
                  </h3>
                  <span title="Verified Account" className="inline-flex">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="#38bdf8" className="shrink-0">
                      <path d="M12 2l2.4 2.7 3.6-.3 1.2 3.4 3.3 1.5-1.1 3.5 1.9 3.1-2.9 2.2-.1 3.6-3.6 1.1-1.9 3.1-3.3-1.5-3.3 1.5-1.9-3.1-3.6-1.1-.1-3.6-2.9-2.2 1.9-3.1-1.1-3.5 3.3-1.5 1.2-3.4 3.6.3L12 2z"/>
                      <polyline points="9 12 11 14 15 10" stroke="#000" strokeWidth="2.5" fill="none"/>
                    </svg>
                  </span>
                </div>
                <p className="text-xs text-[#f5f5f5]/70 mt-0.5 font-medium">
                  {INSTAGRAM_PROFILE.displayName}
                </p>
                <p className="text-[11px] text-[#f5f5f5]/40 mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5">
                  <span>24/28 States · 1 Country</span>
                  <span>·</span>
                  <span>Rail · Road · Mountains</span>
                  <span>·</span>
                  <span>Jaipur, India</span>
                </p>
              </div>
            </div>

            {/* Middle: Profile Stats */}
            <div className="flex items-center gap-6 sm:gap-8 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-8">
              <div className="text-center">
                <span className="block text-base sm:text-lg font-bold text-white">
                  {INSTAGRAM_PROFILE.postsCount}
                </span>
                <span className="text-[11px] text-[#f5f5f5]/40 font-medium">posts</span>
              </div>
              <div className="text-center">
                <span className="block text-base sm:text-lg font-bold text-white">
                  {INSTAGRAM_PROFILE.followersCount}
                </span>
                <span className="text-[11px] text-[#f5f5f5]/40 font-medium">followers</span>
              </div>
              <div className="text-center">
                <span className="block text-base sm:text-lg font-bold text-white">
                  {INSTAGRAM_PROFILE.followingCount}
                </span>
                <span className="text-[11px] text-[#f5f5f5]/40 font-medium">following</span>
              </div>
            </div>

            {/* Right: Follow on Instagram */}
            <a
              href={INSTAGRAM_PROFILE.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-[#f5f5f5] text-[#080808] hover:bg-white transition-all shadow-md shrink-0 self-stretch md:self-auto justify-center"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
              <span>Follow @{INSTAGRAM_PROFILE.username}</span>
            </a>
          </div>

          {/* Highlights Tray */}
          <div className="mt-5 pt-4 border-t border-white/5 flex items-center gap-4 sm:gap-6 overflow-x-auto pb-1 no-scrollbar">
            {INSTAGRAM_PROFILE.highlights.map((highlight, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1.5 shrink-0 group/highlight cursor-pointer">
                <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full p-[2px] bg-white/15 group-hover/highlight:bg-white/40 transition-colors">
                  <div className="w-full h-full rounded-full overflow-hidden bg-black relative border border-black">
                    <Image
                      src={highlight.image}
                      alt={highlight.title}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                </div>
                <span className="text-[10px] text-[#f5f5f5]/60 group-hover/highlight:text-white transition-colors max-w-[64px] truncate text-center">
                  {highlight.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Filter Controls */}
        <div className="space-y-4 mb-10 pb-6 border-b border-[#f5f5f5]/10 max-w-6xl mx-auto">
          {/* Categories */}
          <div>
            <p className="text-[10px] uppercase tracking-wider text-[#f5f5f5]/30 mb-2 font-medium">
              Filter by Category:
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

          {/* Destinations */}
          <div>
            <p className="text-[10px] uppercase tracking-wider text-[#f5f5f5]/30 mb-2 font-medium">
              Filter by Destination:
            </p>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              {DESTINATIONS.map((dest) => (
                <button
                  key={dest}
                  onClick={() => setSelectedDestination(dest)}
                  className={`px-3 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap transition-colors ${
                    selectedDestination === dest
                      ? "bg-[#f5f5f5]/20 text-white border border-[#f5f5f5]/40"
                      : "bg-[#111113]/60 text-[#f5f5f5]/40 hover:text-white border border-[#f5f5f5]/5"
                  }`}
                >
                  {dest}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ─── REAL IPHONE REELS GRID (3 PHONES PER ROW ON DESKTOP) ─── */}
        {filteredReels.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 max-w-6xl mx-auto justify-items-center">
            {filteredReels.map((reel) => (
              <IPhoneReelCard
                key={reel.id}
                reel={reel}
                onOpenModal={handleOpenReel}
                className="w-full"
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center rounded-3xl bg-[#111113] border border-[#f5f5f5]/5 p-8 max-w-md mx-auto">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto text-[#f5f5f5]/30 mb-3">
              <circle cx="12" cy="12" r="10"/>
              <line x1="8" y1="12" x2="16" y2="12"/>
            </svg>
            <p className="text-sm text-[#f5f5f5]/60 font-medium">No reels match your selected filters</p>
            <button
              onClick={() => {
                setSelectedCategory("All Categories");
                setSelectedDestination("All Destinations");
              }}
              className="mt-4 px-4 py-2 rounded-full bg-[#f5f5f5] text-[#080808] text-xs font-semibold hover:bg-white transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Accessible Video Player Modal */}
      <ReelsViewerModal
        reels={filteredReels.length > 0 ? filteredReels : TRAVEL_REELS}
        initialReelId={activeModalReelId}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
