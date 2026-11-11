"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Home", href: "/travel" },
  { label: "Expeditions", href: "/travel/trips" },
  { label: "India Map", href: "/travel#interactive-map" },
  { label: "Stories", href: "/travel/stories" },
  { label: "Gallery", href: "/travel/gallery" },
  { label: "Reels", href: "/travel/reels" },
  { label: "Tools", href: "/travel/tools" },
  { label: "Contact", href: "/travel/contact" },
];

export default function TravelNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    if (href.startsWith("/travel#")) {
      const hash = href.replace("/travel", "");
      if (typeof window !== "undefined") {
        if (pathname === "/travel") {
          const el = document.querySelector(hash);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
            return;
          }
        } else {
          window.location.href = href;
          return;
        }
      }
    } else if (href === "/travel" && pathname === "/travel") {
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
    }

    if (typeof window !== "undefined") {
      window.location.href = href;
    }
  };

  return (
    <>
      {/* ─── Floating Liquid Glass Navbar Container ─── */}
      <header className="fixed top-2 sm:top-4 left-0 right-0 z-50 flex justify-center px-3 sm:px-6 pointer-events-none">
        <nav
          className={`pointer-events-auto w-full max-w-7xl rounded-full transition-all duration-500 ease-out flex items-center justify-between px-3.5 sm:px-5 md:px-6 py-2 sm:py-2.5 ${
            scrolled
              ? "bg-[#0a0a0c]/70 backdrop-blur-2xl backdrop-saturate-150 border border-white/[0.12] shadow-[0_12px_40px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.18)]"
              : "bg-white/[0.05] backdrop-blur-xl backdrop-saturate-150 border border-white/[0.14] shadow-[0_8px_32px_rgba(0,0,0,0.37),inset_0_1px_2px_rgba(255,255,255,0.22)]"
          }`}
          style={{
            WebkitBackdropFilter: "blur(24px) saturate(160%)",
          }}
          aria-label="Liquid Glass Navigation"
        >
          {/* Brand Identity */}
          <Link
            href="/travel"
            className="flex items-center gap-2 sm:gap-2.5 text-[#f5f5f5] group cursor-pointer shrink-0 py-1"
          >
            <span className="relative flex h-2 sm:h-2.5 w-2 sm:w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 sm:h-2.5 w-2 sm:w-2.5 bg-emerald-400" />
            </span>
            <span
              className="text-sm sm:text-base md:text-lg font-bold tracking-tight text-[#f5f5f5] group-hover:text-white transition-colors"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              Ashraf Siddiqui
            </span>
            <span className="hidden md:inline-block text-[9px] tracking-widest uppercase font-mono px-2 py-0.5 rounded-full bg-white/[0.06] border border-white/10 text-white/50">
              Travel
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 text-xs text-[#f5f5f5]/75">
            {NAV_LINKS.map((link) => {
              const isCurrent =
                link.href === "/travel"
                  ? pathname === "/travel"
                  : pathname?.startsWith(link.href);

              return (
                <button
                  key={link.label}
                  onClick={() => handleNav(link.href)}
                  className={`px-3 py-1.5 rounded-full font-medium transition-all duration-200 cursor-pointer ${
                    isCurrent
                      ? "bg-white/[0.12] text-white font-semibold shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] border border-white/15"
                      : "hover:text-white hover:bg-white/[0.06] border border-transparent"
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Right Action: Plan a Trip with Me + Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Custom CTA: "Plan a Trip with Me" */}
            <button
              onClick={() => handleNav("/travel/contact")}
              className="px-3.5 sm:px-4 md:px-5 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-semibold text-black bg-[#f5f5f5] hover:bg-white transition-all shadow-[0_4px_16px_rgba(255,255,255,0.18),inset_0_1px_1px_rgba(255,255,255,0.6)] cursor-pointer flex items-center gap-1.5 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="hidden sm:inline">Plan a Trip with Me</span>
              <span className="sm:hidden">Plan a Trip</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="lg:hidden p-2 rounded-full bg-white/[0.08] hover:bg-white/[0.15] border border-white/15 text-white transition-colors cursor-pointer"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <div className="w-4 h-3.5 flex flex-col justify-between">
                <span
                  className={`block h-0.5 w-full bg-white transition-all duration-300 origin-center ${
                    menuOpen ? "rotate-45 translate-y-[6px]" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-full bg-white transition-all duration-200 ${
                    menuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-full bg-white transition-all duration-300 origin-center ${
                    menuOpen ? "-rotate-45 -translate-y-[6px]" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </nav>
      </header>

      {/* ─── Liquid Glass Mobile Drawer Overlay ─── */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#080808]/80 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-10 pt-24 lg:hidden animate-in fade-in duration-200"
          style={{ WebkitBackdropFilter: "blur(32px) saturate(180%)" }}
        >
          <div className="space-y-3">
            <span className="text-[10px] uppercase font-bold tracking-widest text-white/40 px-2 block">
              Menu Navigation
            </span>
            <div className="flex flex-col gap-1.5">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNav(link.href)}
                  className="text-left px-4 py-3 rounded-2xl text-xl font-bold text-white/90 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 transition-all flex items-center justify-between"
                  style={{ fontFamily: "var(--font-fredoka)" }}
                >
                  <span>{link.label}</span>
                  <span className="text-white/30 text-xs font-mono">&rarr;</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 space-y-3">
            <button
              onClick={() => handleNav("/travel/contact")}
              className="w-full py-3.5 rounded-full bg-white text-black font-bold text-sm text-center shadow-xl block"
            >
              Plan a Trip with Me
            </button>
            <div className="flex items-center justify-between text-xs text-white/40 px-2">
              <Link href="/" className="hover:text-white transition-colors">
                &larr; Web Developer Portfolio
              </Link>
              <Link href="/admin" className="hover:text-white transition-colors">
                CMS
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
