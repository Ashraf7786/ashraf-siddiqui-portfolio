"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

const NAV_LINKS = [
  { label: "Home", href: "/travel" },
  { label: "Journey", href: "/travel#journey" },
  { label: "India Map", href: "/travel#interactive-map" },
  { label: "Stories", href: "/travel/stories" },
  { label: "Gallery", href: "/travel/gallery" },
  { label: "Reels", href: "/travel/reels" },
  { label: "Group Tours", href: "/travel/trips" },
  { label: "Tools", href: "/travel/tools" },
  { label: "Contact", href: "/travel/contact" },
];

export default function TravelNav() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -80,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 1.0,
      });
    }, navRef);
    return () => ctx.revert();
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    if (href.startsWith("/travel#")) {
      const hash = href.replace("/travel", "");
      if (typeof window !== "undefined" && window.location.pathname === "/travel") {
        document.querySelector(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    } else if (href === "/travel") {
      if (typeof window !== "undefined" && window.location.pathname === "/travel") {
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
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-12 transition-all duration-500 ${
          scrolled
            ? "py-4 bg-[#080808]/90 backdrop-blur-md border-b border-[#f5f5f5]/5"
            : "py-6 mix-blend-difference"
        }`}
      >
        {/* Brand */}
        <Link
          href="/"
          className={`text-lg font-bold tracking-tighter text-[#f5f5f5] ${scrolled ? "" : "mix-blend-difference"}`}
          style={{ fontFamily: "var(--font-fredoka)" }}
        >
          Ashraf Siddiqui
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-6 text-sm text-[#f5f5f5]/70">
          {NAV_LINKS.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNav(link.href)}
              className="hover:text-[#f5f5f5] transition-colors bg-transparent border-none cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* CTA + Hamburger */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleNav("/travel/trips")}
            className="hidden md:block px-5 py-2 rounded-full text-sm font-medium text-[#f5f5f5] border border-[#f5f5f5]/20 hover:border-[#f5f5f5]/60 hover:bg-white/5 transition-all backdrop-blur-sm cursor-pointer"
          >
            Plan a Trip
          </button>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="lg:hidden flex flex-col gap-1.5 p-1 cursor-pointer"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`block h-px w-6 bg-[#f5f5f5] transition-all duration-300 origin-center ${
                  i === 0 && menuOpen ? "rotate-45 translate-y-[7px]" :
                  i === 1 && menuOpen ? "opacity-0" :
                  i === 2 && menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
                }`}
              />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 flex flex-col justify-center px-10 bg-[#080808] transition-all duration-500 lg:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-8 mt-20">
          {NAV_LINKS.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNav(link.href)}
              className="text-left text-4xl font-bold text-[#f5f5f5]/80 hover:text-[#f5f5f5] transition-colors bg-transparent border-none cursor-pointer"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNav("/travel/trips")}
            className="mt-4 self-start px-8 py-3 rounded-full text-sm font-medium text-[#f5f5f5] border border-[#f5f5f5]/20 hover:border-[#f5f5f5]/60 transition-all cursor-pointer"
          >
            Plan a Trip
          </button>
        </div>
      </div>
    </>
  );
}
