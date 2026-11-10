"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function PortalChoiceModal() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [remember, setRemember] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Skip on admin routes
    if (pathname?.startsWith("/admin")) return;

    // Check URL parameters for explicit request to open
    const searchParams = new URLSearchParams(window.location.search);
    const forceOpen =
      searchParams.get("portal") === "1" ||
      searchParams.get("switch") === "1" ||
      searchParams.get("choose") === "1";

    if (forceOpen) {
      setIsOpen(true);
      return;
    }

    // Check saved preferences
    const seen = sessionStorage.getItem("portal_choice_seen");
    const remembered = localStorage.getItem("portal_preferred_destination");

    // If user previously remembered 'travel' and lands on root '/', redirect to '/travel'
    if (remembered === "travel" && pathname === "/" && !seen) {
      sessionStorage.setItem("portal_choice_seen", "true");
      window.location.href = "/travel";
      return;
    }

    // If first time in this session, show the dialog after preloader completes (~2.2s)
    if (!seen) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 2200);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  // Listen for custom trigger event from any nav link / button
  useEffect(() => {
    const handleTrigger = () => setIsOpen(true);
    window.addEventListener("open-portal-dialog", handleTrigger);
    return () => window.removeEventListener("open-portal-dialog", handleTrigger);
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleDismiss();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleDismiss = () => {
    sessionStorage.setItem("portal_choice_seen", "true");
    setIsOpen(false);
  };

  const handleChoosePortfolio = () => {
    if (remember) {
      localStorage.setItem("portal_preferred_destination", "portfolio");
    }
    sessionStorage.setItem("portal_choice_seen", "true");
    setIsOpen(false);

    // If currently on /travel or subpath, redirect to portfolio root
    if (pathname?.startsWith("/travel")) {
      window.location.href = "/";
    }
  };

  const handleChooseTravel = () => {
    if (remember) {
      localStorage.setItem("portal_preferred_destination", "travel");
    }
    sessionStorage.setItem("portal_choice_seen", "true");
    setIsOpen(false);

    // If not on /travel, redirect to /travel
    if (!pathname?.startsWith("/travel")) {
      window.location.href = "/travel";
    }
  };

  if (!mounted || pathname?.startsWith("/admin")) return null;

  return (
    <>
      {/* ─── Floating Persistent Switcher Button (Bottom Left) ─── */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-5 left-5 z-[8000] px-3.5 py-2 rounded-full bg-[#111114]/85 hover:bg-[#18181e] border border-white/15 hover:border-white/30 backdrop-blur-xl text-xs text-[#f5f5f5] shadow-[0_10px_30px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.2)] flex items-center gap-2.5 transition-all duration-300 hover:scale-105 group cursor-pointer"
          title="Switch between Developer Portfolio and Travel Expeditions"
          aria-label="Switch between Developer Portfolio and Travel Expeditions"
        >
          <div className="flex items-center -space-x-1">
            <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center border border-white/10 text-white/70 group-hover:text-white">
              {/* Code Icon */}
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
            </span>
            <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center border border-white/10 text-white/70 group-hover:text-white">
              {/* Mountain/Compass Icon */}
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polygon points="12 2 2 22 22 22" />
              </svg>
            </span>
          </div>
          <span className="font-medium text-[11px] sm:text-xs tracking-wide">
            {pathname?.startsWith("/travel") ? "Go to Portfolio" : "Explore Travel"}
          </span>
          <span className="text-[10px] text-white/40 group-hover:text-white/70 uppercase tracking-widest font-mono">
            Switch
          </span>
        </button>
      )}

      {/* ─── Modal Backdrop & Dialogue Box ─── */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[9500] bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 animate-fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleDismiss();
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="portal-dialog-title"
        >
          <div className="relative w-full max-w-2xl bg-[#0d0d10] border border-white/15 rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_30px_90px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.22)] text-white overflow-hidden animate-in fade-in zoom-in-95 duration-300">
            {/* Ambient Background Glows */}
            <div className="absolute -top-24 -left-24 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={handleDismiss}
              className="absolute top-5 right-5 sm:top-6 sm:right-6 w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 flex items-center justify-center text-white/60 hover:text-white transition-all cursor-pointer z-10"
              title="Stay on current page"
              aria-label="Close dialog"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Header Content */}
            <div className="text-center max-w-lg mx-auto mb-8 sm:mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-[10px] sm:text-xs font-mono uppercase tracking-widest text-white/70 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Ashraf Siddiqui · Choose Destination
              </div>
              <h2
                id="portal-dialog-title"
                className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-3"
                style={{ fontFamily: "var(--font-fredoka)" }}
              >
                Where would you like to explore?
              </h2>
              <p className="text-xs sm:text-sm text-[#f5f5f5]/65 leading-relaxed">
                I build digital products as a Full Stack Web Developer and traverse high-altitude frontiers as a Solo Traveller. Choose where to go:
              </p>
            </div>

            {/* The Two Choice Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-6">
              {/* Option A: Work Portfolio */}
              <div
                onClick={handleChoosePortfolio}
                className={`group relative flex flex-col justify-between p-5 sm:p-6 rounded-2xl border transition-all duration-300 text-left cursor-pointer hover:scale-[1.02] ${
                  pathname === "/"
                    ? "bg-white/[0.07] border-white/30 shadow-[0_8px_30px_rgba(255,255,255,0.08)]"
                    : "bg-white/[0.03] hover:bg-white/[0.07] border-white/10 hover:border-white/25"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                      {/* Code SVG */}
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="16 18 22 12 16 6" />
                        <polyline points="8 6 2 12 8 18" />
                      </svg>
                    </div>
                    <span className="text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 rounded-full bg-white/10 text-white/60">
                      iamashraf.in
                    </span>
                  </div>

                  <h3
                    className="text-lg sm:text-xl font-bold text-white mb-1.5 group-hover:text-emerald-300 transition-colors"
                    style={{ fontFamily: "var(--font-fredoka)" }}
                  >
                    Work Portfolio
                  </h3>
                  <p className="text-xs text-[#f5f5f5]/65 leading-relaxed mb-4">
                    Full Stack Web Developer. Modern web applications, Next.js architecture, interactive physics, case studies &amp; developer contact.
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/50">Next.js</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/50">React</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/50">Full Stack</span>
                  </div>
                  <div className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-center bg-white/10 group-hover:bg-white group-hover:text-black border border-white/15 group-hover:border-white text-white transition-all flex items-center justify-center gap-1.5">
                    <span>Enter Portfolio</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Option B: Travel Diaries */}
              <div
                onClick={handleChooseTravel}
                className={`group relative flex flex-col justify-between p-5 sm:p-6 rounded-2xl border transition-all duration-300 text-left cursor-pointer hover:scale-[1.02] ${
                  pathname?.startsWith("/travel")
                    ? "bg-white/[0.07] border-white/30 shadow-[0_8px_30px_rgba(255,255,255,0.08)]"
                    : "bg-white/[0.03] hover:bg-white/[0.07] border-white/10 hover:border-white/25"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                      {/* Mountain Compass SVG */}
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="12 2 2 22 22 22" />
                      </svg>
                    </div>
                    <span className="text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 rounded-full bg-white/10 text-white/60">
                      /travel
                    </span>
                  </div>

                  <h3
                    className="text-lg sm:text-xl font-bold text-white mb-1.5 group-hover:text-cyan-300 transition-colors"
                    style={{ fontFamily: "var(--font-fredoka)" }}
                  >
                    Travel Diaries
                  </h3>
                  <p className="text-xs text-[#f5f5f5]/65 leading-relaxed mb-4">
                    Solo traveller across 24 Indian states. High-altitude 4×4 mountain expeditions, upcoming group tours, field guides &amp; cinematic reels.
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/50">24 States</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/50">Group Tours</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/50">Expeditions</span>
                  </div>
                  <div className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-center bg-white/10 group-hover:bg-white group-hover:text-black border border-white/15 group-hover:border-white text-white transition-all flex items-center justify-center gap-1.5">
                    <span>Explore Travel</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Footer Options */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-white/10 text-xs text-[#f5f5f5]/55">
              <label className="flex items-center gap-2 cursor-pointer select-none hover:text-white/80 transition-colors">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="rounded border-white/20 bg-white/5 text-emerald-500 focus:ring-0 focus:outline-none cursor-pointer"
                />
                <span>Remember my choice on this browser</span>
              </label>

              <button
                onClick={handleDismiss}
                className="hover:text-white underline underline-offset-4 transition-colors cursor-pointer"
              >
                Continue to {pathname?.startsWith("/travel") ? "Travel Diaries" : "Portfolio"} →
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
