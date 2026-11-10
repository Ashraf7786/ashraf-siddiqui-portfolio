"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { TRAVEL_REELS, INSTAGRAM_PROFILE } from "../data/reels";
import IPhoneReelCard from "./IPhoneReelCard";
import ReelsViewerModal from "./ReelsViewerModal";

gsap.registerPlugin(ScrollTrigger);

export default function TravelReels() {
  const sectionRef = useRef<HTMLElement>(null);
  const [reelsList, setReelsList] = useState(TRAVEL_REELS);
  const [selectedReelId, setSelectedReelId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch("/api/travel/reels")
      .then((r) => r.json())
      .then((d) => {
        if (d.reels && Array.isArray(d.reels) && d.reels.length > 0) {
          setReelsList(d.reels);
        }
      })
      .catch(() => {});
  }, []);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".reels-header", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 95%" },
        clearProps: "all",
      });
      gsap.from(".insta-profile-bar", {
        y: 25,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 95%" },
        clearProps: "all",
      });
      gsap.from(".iphone-reel-item", {
        y: 35,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 95%" },
        clearProps: "all",
      });
    }, sectionRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, [reelsList]);

  const handleOpenModal = (id: string) => {
    setSelectedReelId(id);
    setIsModalOpen(true);
  };

  return (
    <section
      id="reels"
      ref={sectionRef}
      className="py-16 sm:py-24 md:py-32 bg-[#080808] border-b border-[#f5f5f5]/5 overflow-hidden relative"
    >
      {/* Background Watermark Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.02] whitespace-nowrap text-[12vw] font-black uppercase text-white tracking-widest z-0">
        TRAVEL STORIES
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 relative z-10">
        {/* Header */}
        <div className="reels-header flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div>
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
                Instagram Travel Stories · @{INSTAGRAM_PROFILE.username}
              </p>
            </div>
            <h2
              className="text-3xl sm:text-5xl md:text-6xl font-bold text-[#f5f5f5] leading-tight"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              Travel in 60 seconds
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#f5f5f5]/50 max-w-xl leading-relaxed">
              Hover over any iPhone screen to play the reel. Remove your cursor to stop playback.
              Tap the audio button on any screen to listen with sound.
            </p>
          </div>

          <Link
            href="/travel/reels"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#f5f5f5] hover:text-white transition-all self-start md:self-auto px-4 py-2 rounded-full border border-[#f5f5f5]/20 hover:border-[#f5f5f5]/60 bg-transparent hover:bg-white/5"
          >
            <span>Explore All Reels Feed</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
        </div>

        {/* ─── AUTHENTIC INSTAGRAM PROFILE BAR ───────────────────────── */}
        <div className="insta-profile-bar mb-12 p-5 sm:p-6 rounded-3xl bg-[#111113] border border-[#f5f5f5]/10 shadow-xl">
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

            {/* Right: Visit Instagram Button */}
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

        {/* ─── REAL IPHONE SHOWCASE: EXACTLY 3 PHONES AT A TIME ──────── */}
        <div className="reels-showcase grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 md:gap-10 max-w-5xl mx-auto justify-items-center">
          {reelsList.slice(0, 3).map((reel) => (
            <div key={reel.id} className="iphone-reel-item w-full flex justify-center">
              <IPhoneReelCard
                reel={reel}
                onOpenModal={handleOpenModal}
                className="w-full"
              />
            </div>
          ))}
        </div>

        {/* Video Upload Location Helper Banner */}
        <div className="mt-12 p-4 rounded-2xl bg-[#111113] border border-[#f5f5f5]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#f5f5f5]/60 max-w-5xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-white/70 flex items-center justify-center shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
              </svg>
            </div>
            <div>
              <p className="text-white font-medium">Travel Reels Video Directory:</p>
              <p className="text-[11px] text-[#f5f5f5]/40 font-mono">
                public/videos/reels/ (Connected: travelashraf1.mp4, travelashraf2.mp4)
              </p>
            </div>
          </div>
          <span className="text-[10px] text-[#f5f5f5]/70 bg-white/5 px-3 py-1 rounded-full border border-white/10 shrink-0 self-start sm:self-auto font-medium">
            3 High-Quality iPhones · Hover to Play
          </span>
        </div>
      </div>

      {/* Full-Screen Comments & Details Modal */}
      {selectedReelId && (
        <ReelsViewerModal
          reels={reelsList}
          isOpen={isModalOpen}
          initialReelId={selectedReelId}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </section>
  );
}
