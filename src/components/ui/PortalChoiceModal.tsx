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
      {/* ─── Minimal, Small Dialog Box ─── */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[9500] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleDismiss();
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="portal-dialog-title"
        >
          <div className="relative w-full max-w-sm bg-[#111114] border border-white/15 rounded-2xl p-5 sm:p-6 shadow-[0_24px_70px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.18)] text-white overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button
              onClick={handleDismiss}
              className="absolute top-4 right-4 w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/50 hover:text-white flex items-center justify-center transition-all cursor-pointer"
              title="Close"
              aria-label="Close"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Header */}
            <div className="text-center mb-5 pt-1">
              <span className="inline-block text-[10px] font-mono uppercase tracking-widest text-white/50 mb-1">
                Ashraf Siddiqui
              </span>
              <h3
                id="portal-dialog-title"
                className="text-lg sm:text-xl font-bold tracking-tight text-white"
                style={{ fontFamily: "var(--font-fredoka)" }}
              >
                Where to?
              </h3>
              <p className="text-xs text-white/50 mt-1">
                Choose where you would like to go:
              </p>
            </div>

            {/* Options */}
            <div className="flex flex-col gap-2.5 mb-4">
              {/* Option 1: Work Portfolio */}
              <button
                onClick={handleChoosePortfolio}
                className={`w-full flex items-center justify-between p-3.5 rounded-xl border transition-all duration-200 text-left group cursor-pointer ${
                  pathname === "/"
                    ? "bg-white/[0.09] border-white/30"
                    : "bg-white/[0.04] hover:bg-white/[0.09] border-white/10 hover:border-white/20"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform">
                    {/* Code SVG */}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="16 18 22 12 16 6" />
                      <polyline points="8 6 2 12 8 18" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">
                      Work Portfolio
                    </div>
                    <div className="text-[11px] text-white/40">
                      iamashraf.in
                    </div>
                  </div>
                </div>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="text-white/40 group-hover:text-white group-hover:translate-x-0.5 transition-all"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>

              {/* Option 2: Travel Diaries */}
              <button
                onClick={handleChooseTravel}
                className={`w-full flex items-center justify-between p-3.5 rounded-xl border transition-all duration-200 text-left group cursor-pointer ${
                  pathname?.startsWith("/travel")
                    ? "bg-white/[0.09] border-white/30"
                    : "bg-white/[0.04] hover:bg-white/[0.09] border-white/10 hover:border-white/20"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform">
                    {/* Mountain SVG */}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="12 2 2 22 22 22" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                      Travel Diaries
                    </div>
                    <div className="text-[11px] text-white/40">
                      iamashraf.in/travel
                    </div>
                  </div>
                </div>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="text-white/40 group-hover:text-white group-hover:translate-x-0.5 transition-all"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Subtle Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-white/10 text-[11px] text-white/50">
              <label className="flex items-center gap-1.5 cursor-pointer select-none hover:text-white/80 transition-colors">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-3.5 h-3.5 rounded border-white/20 bg-white/5 text-emerald-500 focus:ring-0 focus:outline-none cursor-pointer"
                />
                <span>Remember choice</span>
              </label>

              <button
                onClick={handleDismiss}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Skip &rarr;
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
