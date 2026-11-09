"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { TravelReel } from "../data/reels";

interface IPhoneReelCardProps {
  reel: TravelReel;
  onOpenModal?: (id: string) => void;
  className?: string;
}

export default function IPhoneReelCard({
  reel,
  onOpenModal,
  className = "",
}: IPhoneReelCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(reel.likes);
  const [isSaved, setIsSaved] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string>(reel.localVideoUrl || reel.videoUrl || "");
  const [hasTriedFallback, setHasTriedFallback] = useState(false);

  useEffect(() => {
    setVideoSrc(reel.localVideoUrl || reel.videoUrl || "");
    setHasTriedFallback(false);
  }, [reel.localVideoUrl, reel.videoUrl]);

  // Handle local video error fallback to web stream
  const handleVideoError = () => {
    if (!hasTriedFallback && reel.videoUrl && videoSrc !== reel.videoUrl) {
      setHasTriedFallback(true);
      setVideoSrc(reel.videoUrl);
    }
  };

  // Hover to Play
  const handleMouseEnter = () => {
    if (videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {
            if (videoRef.current) {
              videoRef.current.muted = true;
              setIsMuted(true);
              videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
            }
          });
      }
    }
  };

  // Hover Out to Stop
  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Touch/Click tap toggle
  const handleTogglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  // Toggle Mute
  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  // Toggle Like
  const handleToggleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked((prev) => {
      const next = !prev;
      setLikesCount((c) => (next ? c + 1 : c - 1));
      return next;
    });
  };

  // Toggle Save
  const handleToggleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSaved((prev) => !prev);
  };

  // Share
  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = typeof window !== "undefined" ? `${window.location.origin}/travel/reels?id=${reel.id}` : "";
    if (navigator.share) {
      try {
        await navigator.share({ title: reel.title, text: reel.caption, url });
        return;
      } catch {}
    }
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(url);
    }
  };

  return (
    <div
      className={`group relative flex flex-col items-center select-none ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* ─── HIGH-QUALITY REALISTIC IPHONE 16 PRO CHASSIS ──────────────────────── */}
      <div
        className="relative w-full aspect-[9/19.5] max-w-[320px] sm:max-w-[340px] md:max-w-[360px] bg-[#16161a] rounded-[48px] sm:rounded-[54px] p-[10px] sm:p-[12px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95),0_0_0_1px_rgba(255,255,255,0.1),inset_0_1px_2px_rgba(255,255,255,0.3)] border border-[#2a2a32] transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-[0_35px_80px_rgba(0,0,0,0.98),0_0_0_1px_rgba(255,255,255,0.25)] cursor-pointer"
        onClick={handleTogglePlay}
      >
        {/* Hardware Buttons: Left Side (Action button + Volume Up + Volume Down) */}
        <div className="absolute -left-[3px] top-24 w-[3px] h-6 bg-[#383842] rounded-l-xs shadow-sm" />
        <div className="absolute -left-[3px] top-34 w-[3px] h-11 bg-[#383842] rounded-l-xs shadow-sm" />
        <div className="absolute -left-[3px] top-48 w-[3px] h-11 bg-[#383842] rounded-l-xs shadow-sm" />

        {/* Hardware Buttons: Right Side (Power Button) */}
        <div className="absolute -right-[3px] top-36 w-[3px] h-16 bg-[#383842] rounded-r-xs shadow-sm" />

        {/* ─── SCREEN INNER (Bezel container) ─────────────────────── */}
        <div className="relative w-full h-full bg-black rounded-[38px] sm:rounded-[44px] overflow-hidden ring-1 ring-white/10">
          {/* Dynamic Island (iPhone Pill) */}
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-28 sm:w-32 h-6 sm:h-6.5 bg-black rounded-full z-30 flex items-center justify-between px-3 shadow-lg pointer-events-none border border-white/10">
            {/* Front Camera Lens with reflection */}
            <div className="w-2.5 h-2.5 rounded-full bg-[#0a0a16] border border-[#1e1e32] flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-[#2a3a5a] shadow-[inset_0_0_2px_rgba(255,255,255,0.4)]" />
            </div>
            {/* Proximity / Light Sensor */}
            <div className="w-2 h-2 rounded-full bg-[#0d0d18]" />
          </div>

          {/* iOS Top Status Bar */}
          <div className="absolute top-3 left-6 right-6 z-20 flex items-center justify-between text-[11px] text-white/90 font-medium tracking-tight pointer-events-none">
            <span>9:41</span>
            <div className="flex items-center gap-1.5 text-white/85">
              {/* Cellular 5G */}
              <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                <rect x="2" y="16" width="3" height="6" rx="0.5"/>
                <rect x="7" y="12" width="3" height="10" rx="0.5"/>
                <rect x="12" y="8" width="3" height="14" rx="0.5"/>
                <rect x="17" y="4" width="3" height="18" rx="0.5"/>
              </svg>
              {/* Wi-Fi */}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12.55a11 11 0 0 1 14.08 0"/>
                <path d="M1.42 9a16 16 0 0 1 21.16 0"/>
                <path d="M8.53 16.11a6 6 0 0 1 6.95 0"/>
                <line x1="12" y1="20" x2="12.01" y2="20"/>
              </svg>
              {/* Battery */}
              <svg width="15" height="11" viewBox="0 0 24 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="1" y="1" width="19" height="12" rx="3"/>
                <path d="M22 5v4" strokeLinecap="round"/>
                <rect x="3" y="3" width="13" height="8" rx="1.5" fill="currentColor"/>
              </svg>
            </div>
          </div>

          {/* ─── VIDEO / POSTER MEDIA LAYER ───────────────────────── */}
          <div className="relative w-full h-full bg-black">
            <video
              ref={videoRef}
              src={videoSrc}
              poster={reel.posterUrl}
              playsInline
              loop
              muted={isMuted}
              preload="metadata"
              onError={handleVideoError}
              className="w-full h-full object-cover select-none"
            />

            {!isPlaying && (
              <div className="absolute inset-0 pointer-events-none transition-opacity duration-300">
                <Image
                  src={reel.posterUrl}
                  alt={reel.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 320px, 360px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/35" />
              </div>
            )}
          </div>

          {/* ─── INSTAGRAM REEL UI TOP HEADER ─────────────────────── */}
          <div className="absolute top-10 left-4 right-4 z-20 flex items-center justify-between text-white pointer-events-none">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm tracking-tight drop-shadow-md">
                Reels
              </span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-white/80">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </div>

            {/* Sound Toggle Button */}
            <button
              onClick={handleToggleMute}
              className="pointer-events-auto w-7 h-7 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"
              title={isMuted ? "Unmute audio" : "Mute audio"}
              aria-label={isMuted ? "Unmute audio" : "Mute audio"}
            >
              {isMuted ? (
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                  <line x1="23" y1="9" x2="17" y2="15"/>
                  <line x1="17" y1="9" x2="23" y2="15"/>
                </svg>
              ) : (
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                </svg>
              )}
            </button>
          </div>

          {/* Center Play Indicator */}
          <div
            className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-300 ${
              isPlaying ? "opacity-0 scale-75" : "opacity-100 scale-100"
            }`}
          >
            <div className="w-14 h-14 rounded-full bg-black/60 backdrop-blur-md border border-white/25 flex items-center justify-center text-white shadow-2xl group-hover:border-white/50 group-hover:scale-105 transition-all">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="ml-1">
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
            </div>
          </div>

          {/* ─── RIGHT ACTION RAIL ───────────────────────────────── */}
          <div className="absolute right-3 bottom-16 z-20 flex flex-col items-center gap-3.5">
            {/* Heart / Like */}
            <button
              onClick={handleToggleLike}
              className="flex flex-col items-center gap-0.5 group/btn"
              title="Like reel"
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-transform active:scale-125 ${
                  isLiked ? "text-rose-500" : "text-white hover:text-rose-400"
                }`}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill={isLiked ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth="2"
                  className="drop-shadow-md"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </div>
              <span className="text-[10px] font-semibold text-white drop-shadow-md">
                {(likesCount / 1000).toFixed(1)}K
              </span>
            </button>

            {/* Comment */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onOpenModal) onOpenModal(reel.id);
              }}
              className="flex flex-col items-center gap-0.5 text-white hover:text-white/80 transition-colors"
              title="Comments"
            >
              <div className="w-9 h-9 rounded-full flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="drop-shadow-md">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                </svg>
              </div>
              <span className="text-[10px] font-semibold text-white drop-shadow-md">
                {reel.commentsCount || 384}
              </span>
            </button>

            {/* Share */}
            <button
              onClick={handleShare}
              className="flex flex-col items-center gap-0.5 text-white hover:text-white/80 transition-colors"
              title="Share reel"
            >
              <div className="w-9 h-9 rounded-full flex items-center justify-center">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="drop-shadow-md">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </div>
            </button>

            {/* Save */}
            <button
              onClick={handleToggleSave}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                isSaved ? "text-white" : "text-white hover:text-white/80"
              }`}
              title="Save reel"
            >
              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill={isSaved ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="2"
                className="drop-shadow-md"
              >
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
              </svg>
            </button>

            {/* Spinning Vinyl Audio Thumbnail */}
            <div
              className={`w-7 h-7 rounded-full border-2 border-white/60 overflow-hidden shadow-lg ${
                isPlaying ? "animate-spin" : ""
              }`}
              style={{ animationDuration: "3.5s" }}
            >
              <Image
                src={reel.posterUrl}
                alt="Audio thumbnail"
                width={28}
                height={28}
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          {/* ─── BOTTOM CAPTIONS OVERLAY (Ashraf's Verified Instagram Profile) ─── */}
          <div className="absolute bottom-3 left-3 right-14 z-20 text-white">
            <div className="flex items-center gap-2 mb-2">
              {/* Instagram Story Gradient Ring */}
              <div className="w-7 h-7 rounded-full p-[1.5px] bg-gradient-to-tr from-[#f09433] via-[#bc1888] to-[#cc2366] shrink-0">
                <div className="w-full h-full rounded-full overflow-hidden bg-black relative">
                  <Image
                    src="/img/travel/ashraf_profile.jpg"
                    alt="Ashraf Siddiqui"
                    fill
                    className="object-cover"
                    sizes="28px"
                  />
                </div>
              </div>

              {/* Username + Verified Badge */}
              <div className="flex items-center gap-1 truncate">
                <span className="text-[11px] font-bold text-white tracking-tight drop-shadow-sm truncate">
                  {reel.instagramHandle || "@ashraf._siddiqui"}
                </span>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="#38bdf8" className="shrink-0">
                  <path d="M12 2l2.4 2.7 3.6-.3 1.2 3.4 3.3 1.5-1.1 3.5 1.9 3.1-2.9 2.2-.1 3.6-3.6 1.1-1.9 3.1-3.3-1.5-3.3 1.5-1.9-3.1-3.6-1.1-.1-3.6-2.9-2.2 1.9-3.1-1.1-3.5 3.3-1.5 1.2-3.4 3.6.3L12 2z"/>
                  <polyline points="9 12 11 14 15 10" stroke="#000" strokeWidth="2.5" fill="none"/>
                </svg>
              </div>

              {/* Follow button */}
              <button
                onClick={(e) => e.stopPropagation()}
                className="text-[9px] font-semibold px-2 py-0.5 rounded-full border border-white/40 text-white/90 hover:bg-white hover:text-black transition-colors shrink-0"
              >
                Follow
              </button>
            </div>

            <p className="text-[11px] text-[#f5f5f5] line-clamp-2 leading-tight drop-shadow-md mb-2">
              <span className="font-semibold text-[#f5f5f5] mr-1" style={{ fontFamily: "var(--font-fredoka)" }}>
                {reel.title}
              </span>
              — {reel.caption}
            </p>

            <div className="flex items-center gap-1.5 text-[9px] text-[#f5f5f5]/80 overflow-hidden">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="shrink-0 animate-pulse text-[#f5f5f5]/60">
                <path d="M9 18V5l12-2v13"/>
                <circle cx="6" cy="18" r="3"/>
                <circle cx="18" cy="16" r="3"/>
              </svg>
              <span className="truncate drop-shadow-sm font-medium">
                {reel.soundtrack}
              </span>
            </div>
          </div>

          {/* iOS Bottom Swipe Home Bar */}
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/40 rounded-full z-30 pointer-events-none" />
        </div>
      </div>

      {/* Reel Title & Destination Pill Beneath Phone */}
      <div className="mt-4 text-center max-w-[280px]">
        <h4
          className="text-sm font-bold text-[#f5f5f5] group-hover:text-white transition-colors truncate"
          style={{ fontFamily: "var(--font-fredoka)" }}
        >
          {reel.title}
        </h4>
        <p className="text-[10px] text-[#f5f5f5]/40 mt-0.5 flex items-center justify-center gap-1">
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#f5f5f5]/50">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          {reel.locationName} · <span className="text-[#f5f5f5]/80 font-medium">{reel.destination}</span>
        </p>
      </div>
    </div>
  );
}
