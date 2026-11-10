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
      setScrolled(window.scrollY > 30);
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
      <nav
        className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 sm:px-8 md:px-12 transition-all duration-300 ${
          scrolled
            ? "py-3 bg-[#080808]/95 backdrop-blur-md border-b border-white/10 shadow-2xl"
            : "py-4 bg-[#080808]/80 backdrop-blur-md border-b border-white/[0.08] shadow-lg"
        }`}
        aria-label="Main Navigation"
      >
        {/* Brand Identity */}
        <Link
          href="/travel"
          className="flex items-center gap-2.5 text-[#f5f5f5] group cursor-pointer"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
          </span>
          <span
            className="text-base sm:text-lg font-bold tracking-tight text-[#f5f5f5] group-hover:text-white transition-colors"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            Ashraf Siddiqui
          </span>
          <span className="hidden sm:inline-block text-[10px] tracking-widest uppercase font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/50">
            Travel
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1.5 text-xs text-[#f5f5f5]/75">
          {NAV_LINKS.map((link) => {
            const isCurrent =
              link.href === "/travel"
                ? pathname === "/travel"
                : pathname?.startsWith(link.href);

            return (
              <button
                key={link.label}
                onClick={() => handleNav(link.href)}
                className={`px-3 py-1.5 rounded-full font-medium transition-all cursor-pointer ${
                  isCurrent
                    ? "bg-white/10 text-white font-semibold border border-white/15"
                    : "hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </div>

        {/* Right CTA + Mobile Toggle */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <Link
            href="/admin"
            className="hidden xl:inline-flex items-center gap-1.5 text-[11px] font-mono px-3 py-1.5 rounded-full text-white/60 hover:text-white hover:bg-white/5 transition-all"
            title="Admin CMS Control Center"
          >
            <span>CMS</span>
          </Link>

          <button
            onClick={() => handleNav("/travel/trips")}
            className="hidden sm:inline-flex px-4 py-1.5 rounded-full text-xs font-semibold text-black bg-white hover:bg-[#eaeaea] transition-all shadow-md cursor-pointer items-center gap-1.5"
          >
            <span>Book Tour</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span
                className={`block h-0.5 w-full bg-white transition-all duration-300 origin-center ${
                  menuOpen ? "rotate-45 translate-y-[7px]" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-full bg-white transition-all duration-200 ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-full bg-white transition-all duration-300 origin-center ${
                  menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Fullscreen Mobile Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#080808]/98 backdrop-blur-xl flex flex-col justify-between p-6 sm:p-10 pt-24 lg:hidden animate-in fade-in duration-200">
          <div className="space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-white/40 px-2 block mb-2">
              Navigation Menu
            </span>
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNav(link.href)}
                  className="text-left px-3 py-2.5 rounded-xl text-xl font-bold text-white/90 hover:text-white hover:bg-white/5 transition-all flex items-center justify-between"
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
              onClick={() => handleNav("/travel/trips")}
              className="w-full py-3 rounded-full bg-white text-black font-bold text-sm text-center shadow-lg block"
            >
              Explore Group Expeditions
            </button>
            <div className="flex items-center justify-between text-xs text-white/40 px-2">
              <Link href="/" className="hover:text-white transition-colors">
                &larr; Web Developer Portfolio
              </Link>
              <Link href="/admin" className="hover:text-white transition-colors">
                Admin CMS
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
