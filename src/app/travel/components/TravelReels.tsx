"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
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
    fetch(`/api/travel/reels?t=${Date.now()}`, { cache: "no-store" })
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

    return () => {
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
        <div className="reels-header flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
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
              <a
                href={INSTAGRAM_PROFILE.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] sm:text-xs tracking-[0.25em] uppercase text-[#f5f5f5]/50 hover:text-white transition-colors font-medium flex items-center gap-1.5"
              >
                <span>@{INSTAGRAM_PROFILE.username}</span>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="7" y1="17" x2="17" y2="7"/>
                  <polyline points="7 7 17 7 17 17"/>
                </svg>
              </a>
            </div>
            <h2
              className="text-3xl sm:text-5xl md:text-6xl font-bold text-[#f5f5f5] leading-tight"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              Travel in 60 seconds
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#f5f5f5]/50 max-w-xl leading-relaxed">
              Hover over any iPhone screen to play the reel. Tap the audio button on any screen to listen with sound.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto flex-wrap">
            <a
              href={INSTAGRAM_PROFILE.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-white text-black hover:bg-[#eaeaea] transition-all shadow-md"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
              <span>Follow @{INSTAGRAM_PROFILE.username}</span>
            </a>
            <Link
              href="/travel/reels"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#f5f5f5] hover:text-white transition-all px-4 py-2 rounded-full border border-[#f5f5f5]/20 hover:border-[#f5f5f5]/60 bg-transparent hover:bg-white/5"
            >
              <span>See All Travel Videos</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
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
