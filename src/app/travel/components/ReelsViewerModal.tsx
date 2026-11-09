"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { TravelReel } from "../data/reels";

interface ReelsViewerModalProps {
  reels: TravelReel[];
  initialReelId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ReelsViewerModal({
  reels,
  initialReelId,
  isOpen,
  onClose,
}: ReelsViewerModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [likesMap, setLikesMap] = useState<Record<string, { count: number; liked: boolean }>>({});
  const [copiedToast, setCopiedToast] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (initialReelId) {
      const idx = reels.findIndex((r) => r.id === initialReelId);
      if (idx !== -1) setCurrentIndex(idx);
    }
  }, [initialReelId, reels]);

  const currentReel = reels[currentIndex] || reels[0];

  useEffect(() => {
    if (currentReel && !likesMap[currentReel.id]) {
      setLikesMap((prev) => ({
        ...prev,
        [currentReel.id]: { count: currentReel.likes, liked: false },
      }));
    }
  }, [currentReel, likesMap]);

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const prog = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(prog);
    }
  };

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % reels.length);
    setProgress(0);
    setIsPlaying(true);
  }, [reels.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + reels.length) % reels.length);
    setProgress(0);
    setIsPlaying(true);
  }, [reels.length]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const toggleLike = () => {
    if (!currentReel) return;
    setLikesMap((prev) => {
      const current = prev[currentReel.id] || { count: currentReel.likes, liked: false };
      return {
        ...prev,
        [currentReel.id]: {
          count: current.liked ? current.count - 1 : current.count + 1,
          liked: !current.liked,
        },
      };
    });
  };

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? `${window.location.origin}/travel/reels?id=${currentReel.id}` : "";
    if (navigator.share) {
      try {
        await navigator.share({
          title: currentReel.title,
          text: currentReel.caption,
          url,
        });
        return;
      } catch {}
    }
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 2500);
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowDown" || e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") handlePrev();
      if (e.key === " ") {
        e.preventDefault();
        togglePlay();
      }
      if (e.key.toLowerCase() === "m") toggleMute();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleNext, handlePrev, onClose]);

  if (!isOpen || !currentReel) return null;

  const currentLikeData = likesMap[currentReel.id] || { count: currentReel.likes, liked: false };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#080808]/95 backdrop-blur-xl flex items-center justify-center p-0 md:p-6"
      role="dialog"
      aria-modal="true"
    >
      {/* Toast Notification */}
      {copiedToast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-60 bg-[#161619] border border-[#f5f5f5]/20 text-[#f5f5f5] text-xs px-4 py-2 rounded-full shadow-2xl flex items-center gap-2 animate-bounce">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-400">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          Reel link copied to clipboard!
        </div>
      )}

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-[#161619]/80 border border-[#f5f5f5]/15 text-[#f5f5f5] flex items-center justify-center hover:bg-white hover:text-black transition-colors"
        aria-label="Close reels viewer"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>

      {/* Up/Down Prev/Next Buttons */}
      <div className="hidden md:flex flex-col gap-3 absolute left-6 top-1/2 -translate-y-1/2 z-40">
        <button
          onClick={handlePrev}
          className="w-11 h-11 rounded-full bg-[#161619]/80 border border-[#f5f5f5]/15 text-[#f5f5f5] flex items-center justify-center hover:bg-white hover:text-black transition-colors"
          aria-label="Previous reel"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="18 15 12 9 6 15"/>
          </svg>
        </button>
        <button
          onClick={handleNext}
          className="w-11 h-11 rounded-full bg-[#161619]/80 border border-[#f5f5f5]/15 text-[#f5f5f5] flex items-center justify-center hover:bg-white hover:text-black transition-colors"
          aria-label="Next reel"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>
      </div>

      {/* Main 9:16 Video Frame Container */}
      <div className="relative w-full h-full md:h-[90vh] md:max-w-[420px] bg-[#000] md:rounded-3xl overflow-hidden border border-[#f5f5f5]/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex flex-col justify-between">
        <div className="relative w-full h-full cursor-pointer" onClick={togglePlay}>
          <video
            ref={videoRef}
            key={currentReel.id}
            src={currentReel.videoUrl}
            poster={currentReel.posterUrl}
            playsInline
            autoPlay
            loop
            muted={isMuted}
            onTimeUpdate={handleTimeUpdate}
            className="w-full h-full object-cover select-none"
          />

          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-xs">
              <div className="w-16 h-16 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
              </div>
            </div>
          )}

          {/* Top Controls Overlay */}
          <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/80 via-black/20 to-transparent flex items-center justify-between z-20">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-white font-medium">
                {currentReel.category}
              </span>
              <span className="text-[10px] text-white/60">
                {currentIndex + 1} / {reels.length}
              </span>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleMute();
              }}
              className="w-8 h-8 rounded-full bg-black/50 border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"
              aria-label={isMuted ? "Unmute reel" : "Mute reel"}
            >
              {isMuted ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                  <line x1="23" y1="9" x2="17" y2="15"/>
                  <line x1="17" y1="9" x2="23" y2="15"/>
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
                </svg>
              )}
            </button>
          </div>

          {/* Right Action Bar */}
          <div className="absolute right-3 bottom-24 flex flex-col items-center gap-4 z-20">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleLike();
              }}
              className="flex flex-col items-center gap-1 group"
              aria-label="Like reel"
            >
              <div
                className={`w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 ${
                  currentLikeData.liked
                    ? "bg-rose-500/90 text-white scale-110 shadow-lg shadow-rose-500/30"
                    : "bg-black/50 border border-white/20 text-white group-hover:bg-white/20"
                }`}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill={currentLikeData.liked ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </div>
              <span className="text-[10px] font-semibold text-white drop-shadow-md">
                {currentLikeData.count.toLocaleString()}
              </span>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleShare();
              }}
              className="flex flex-col items-center gap-1 group"
              aria-label="Share reel"
            >
              <div className="w-11 h-11 rounded-full bg-black/50 border border-white/20 text-white flex items-center justify-center backdrop-blur-md group-hover:bg-white/20 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="18" cy="5" r="3"/>
                  <circle cx="6" cy="12" r="3"/>
                  <circle cx="18" cy="19" r="3"/>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                </svg>
              </div>
              <span className="text-[10px] text-white drop-shadow-md">Share</span>
            </button>

            {currentReel.relatedGuideSlug && (
              <Link
                href={`/travel/destinations/${currentReel.relatedGuideSlug}`}
                onClick={(e) => e.stopPropagation()}
                className="flex flex-col items-center gap-1 group"
                title={`Open ${currentReel.destination} Travel Guide`}
              >
                <div className="w-11 h-11 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center backdrop-blur-md group-hover:bg-white group-hover:text-black transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/>
                    <line x1="8" y1="2" x2="8" y2="18"/>
                    <line x1="16" y1="6" x2="16" y2="22"/>
                  </svg>
                </div>
                <span className="text-[9px] text-[#f5f5f5]/80 font-medium drop-shadow-md">Guide</span>
              </Link>
            )}
          </div>

          {/* Bottom Captions Overlay */}
          <div
            className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black via-black/70 to-transparent z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-1.5 text-xs text-[#f5f5f5]/80 mb-1.5 font-medium">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <span>{currentReel.locationName}</span>
            </div>

            <h3
              className="text-base sm:text-lg font-bold text-white leading-tight mb-2"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              {currentReel.title}
            </h3>

            <p className="text-xs text-white/80 line-clamp-2 leading-relaxed mb-3">
              {currentReel.caption}
            </p>

            <div className="flex items-center gap-2 text-[10px] text-white/70 bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded-full w-fit">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/60 animate-pulse">
                <path d="M9 18V5l12-2v13"/>
                <circle cx="6" cy="18" r="3"/>
                <circle cx="18" cy="16" r="3"/>
              </svg>
              <span className="truncate max-w-[200px]">{currentReel.soundtrack}</span>
            </div>

            <div className="w-full bg-white/20 h-1 rounded-full mt-3 overflow-hidden">
              <div
                className="bg-white h-full rounded-full transition-all duration-100 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden absolute bottom-2 left-1/2 -translate-x-1/2 z-30 flex items-center gap-4 text-xs text-white/60">
        <button onClick={handlePrev} className="px-3 py-1 rounded-full bg-black/60 border border-white/20">Prev</button>
        <button onClick={handleNext} className="px-3 py-1 rounded-full bg-black/60 border border-white/20">Next</button>
      </div>
    </div>
  );
}
