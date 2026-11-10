"use client";

import React from "react";
import Link from "next/link";

const QUICK_LINKS = [
  { label: "Home", href: "/travel" },
  { label: "My India Journey", href: "/travel#journey" },
  { label: "Visual Gallery", href: "/travel/gallery" },
  { label: "Destinations Hub", href: "/travel/destinations" },
  { label: "Travel Guides & Itineraries", href: "/travel/guides" },
  { label: "Field Tools & Utilities", href: "/travel/tools" },
  { label: "Travel Stories", href: "/travel/stories" },
  { label: "Reels Platform", href: "/travel/reels" },
  { label: "Group Tours", href: "/travel/trips" },
  { label: "Collaborate & Contact", href: "/travel/contact" },
  { label: "About Ashraf", href: "/travel#about" },
];

/* Social links — only verified handles. No invented accounts. */
const SOCIAL_LINKS: { label: string; href: string; icon: React.ReactNode }[] = [
  {
    label: "Instagram",
    href: "https://instagram.com/ashraf._siddiqui",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.95C18.88 4 12 4 12 4s-6.88 0-8.59.47A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
];

export default function TravelFooter() {
  const scrollTo = (href: string) => {
    if (href === "#hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[#080808] border-t border-[#f5f5f5]/5">
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-16 pb-10">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 pb-12 border-b border-[#f5f5f5]/5">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#f5f5f5]/40 font-medium mb-1">
                Ashraf Siddiqui
              </p>
              <p
                className="text-2xl font-bold text-[#f5f5f5]"
                style={{ fontFamily: "var(--font-fredoka)" }}
              >
                Travel Diaries
              </p>
            </div>
            <p className="text-[#f5f5f5]/50 text-sm leading-relaxed mb-6 max-w-xs">
              Real journeys, honest guides, unforgettable experiences — from the
              mountains of Kashmir to the dunes of Rajasthan.
            </p>
            <p className="text-xs text-[#f5f5f5]/30 italic">
              &ldquo;Wander More. Wonder Always.&rdquo;
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-[9px] tracking-[0.3em] uppercase text-[#f5f5f5]/30 font-semibold mb-5">
              Navigate
            </p>
            <ul className="flex flex-col gap-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#f5f5f5]/50 hover:text-[#f5f5f5] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/"
                  className="text-sm text-[#f5f5f5]/50 hover:text-[#f5f5f5] transition-colors inline-flex items-center gap-1.5"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="19" y1="12" x2="5" y2="12"/>
                    <polyline points="12 19 5 12 12 5"/>
                  </svg>
                  Back to Portfolio
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact + Social */}
          <div>
            <p className="text-[9px] tracking-[0.3em] uppercase text-[#f5f5f5]/30 font-semibold mb-5">
              Connect
            </p>

            {/* Social */}
            <div className="flex items-center gap-3 mb-8">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full border border-[#f5f5f5]/10 flex items-center justify-center text-[#f5f5f5]/50 hover:text-[#f5f5f5] hover:border-[#f5f5f5]/30 transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>

            {/* Contact */}
            <div className="space-y-3">
              <p className="text-[9px] tracking-[0.2em] uppercase text-[#f5f5f5]/30 mb-2">
                Get in touch
              </p>
              <a
                href="mailto:hi@iamashraf.in"
                className="flex items-center gap-2 text-sm text-[#f5f5f5]/60 hover:text-[#f5f5f5] transition-colors"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                hi@iamashraf.in
              </a>
              <p className="flex items-center gap-2 text-sm text-[#f5f5f5]/40">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                  <circle cx="12" cy="9" r="2.5"/>
                </svg>
                Jaipur, Rajasthan, India
              </p>
            </div>

            <div className="mt-6 p-4 rounded-xl border border-[#f5f5f5]/10 bg-[#111113]">
              <p className="text-xs font-semibold text-[#f5f5f5] mb-1">Plan a Group Trip</p>
              <p className="text-[11px] text-[#f5f5f5]/50 leading-relaxed">
                Interested in joining the next expedition? Drop a message and I&apos;ll send details once dates are confirmed.
              </p>
              <button
                onClick={() => {
                  document.querySelector("#newsletter")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="mt-3 text-[11px] font-semibold text-[#f5f5f5]/70 hover:text-[#f5f5f5] transition-colors inline-flex items-center gap-1"
              >
                Register Interest →
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-[#f5f5f5]/30">
          <p>© {new Date().getFullYear()} Ashraf Siddiqui · Travel Diaries. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-[#f5f5f5]/50 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#f5f5f5]/50 transition-colors">Terms of Use</a>
            <Link href="/" className="hover:text-[#f5f5f5]/50 transition-colors">iamashraf.in</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
