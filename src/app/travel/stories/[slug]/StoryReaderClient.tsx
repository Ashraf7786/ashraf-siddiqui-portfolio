"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import TravelNav from "../../components/TravelNav";
import TravelFooter from "../../components/TravelFooter";
import { TravelStory, TRAVEL_STORIES } from "../../data/stories";

interface StoryReaderClientProps {
  story: TravelStory;
}

export default function StoryReaderClient({ story }: StoryReaderClientProps) {
  const [readingProgress, setReadingProgress] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeTocId, setActiveTocId] = useState<string>(story.sections[0]?.id || "");
  const [mobileTocOpen, setMobileTocOpen] = useState(false);
  const articleRef = useRef<HTMLElement>(null);

  // Related stories: same category first, then others; limit to 2
  const relatedStories = (() => {
    const others = TRAVEL_STORIES.filter((s) => s.slug !== story.slug);
    const sameCategory = others.filter((s) => s.category === story.category);
    const different = others.filter((s) => s.category !== story.category);
    return [...sameCategory, ...different].slice(0, 2) as TravelStory[];
  })();

  // Reading progress bar
  useEffect(() => {
    const handleScroll = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const scrollHeight = doc.scrollHeight - doc.clientHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setReadingProgress(Math.min(100, Math.max(0, progress)));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active TOC section tracking via IntersectionObserver
  useEffect(() => {
    if (story.sections.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTocId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );
    story.sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [story.sections]);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveTocId(id);
      setMobileTocOpen(false);
    }
  }, []);

  const handleCopyLink = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // fallback
    }
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleShareTwitter = () => {
    const url = encodeURIComponent(typeof window !== "undefined" ? window.location.href : "");
    const text = encodeURIComponent(`Reading "${story.title}" by Ashraf Siddiqui`);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank");
  };

  const handleShareWhatsApp = () => {
    const url = encodeURIComponent(typeof window !== "undefined" ? window.location.href : "");
    const text = encodeURIComponent(`Check out this travel dispatch: "${story.title}" — ${url}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  return (
    <>
      {/* Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 z-[100] h-[3px] bg-[#e8e8e8] transition-all duration-100"
        style={{ width: `${readingProgress}%` }}
        aria-hidden="true"
      />

      <TravelNav />

      <article
        ref={articleRef}
        className="min-h-screen bg-[#080808] text-[#f5f5f5] pt-28 pb-32"
      >
        {/* Copied Toast */}
        {copiedLink && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[#161619] border border-[#f5f5f5]/20 text-[#f5f5f5] text-xs px-4 py-2 rounded-full shadow-2xl flex items-center gap-2">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Link copied to clipboard
          </div>
        )}

        {/* ─── Header Container ─── */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 mb-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-[#f5f5f5]/40 mb-6 flex-wrap">
            <Link href="/travel" className="hover:text-white transition-colors">Travel</Link>
            <span>/</span>
            <Link href="/travel/stories" className="hover:text-white transition-colors">Stories</Link>
            <span>/</span>
            <span className="text-[#f5f5f5]/70 truncate max-w-[220px] sm:max-w-none">{story.destination}</span>
          </div>

          {/* Category & Reading Info */}
          <div className="flex items-center gap-3 text-xs mb-4 flex-wrap">
            <span className="text-[10px] uppercase tracking-wider font-semibold px-3 py-1 rounded-full bg-white/10 text-[#f5f5f5] border border-white/20">
              {story.category}
            </span>
            <span className="text-[#f5f5f5]/40">·</span>
            <span className="text-[#f5f5f5]/50 flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {story.readTime}
            </span>
            <span className="text-[#f5f5f5]/40">·</span>
            <span className="text-[#f5f5f5]/50">{story.publishedAt}</span>
          </div>

          {/* Title */}
          <h1
            className="text-3xl sm:text-5xl md:text-6xl font-bold text-[#f5f5f5] leading-[1.1] mb-4"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            {story.title}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-[#f5f5f5]/60 leading-relaxed font-light mb-8">
            {story.subtitle}
          </p>

          {/* ─── Author Card ─── */}
          <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#111113] border border-[#1e1e20] mb-8">
            <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 border border-[#1e1e20]">
              <Image
                src="/img/travel/ashraf_profile.jpg"
                alt="Ashraf Siddiqui"
                fill
                className="object-cover"
                sizes="56px"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#f5f5f5]">Ashraf Siddiqui</p>
              <p className="text-xs text-[#f5f5f5]/40 mb-1">@ashraf._siddiqui</p>
              <p className="text-xs text-[#f5f5f5]/60 leading-relaxed">
                24/28 States · Solo Traveller · Rail · Road · Mountains
              </p>
            </div>
            <a
              href="https://instagram.com/ashraf._siddiqui"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 flex items-center gap-1.5 text-[11px] text-[#f5f5f5]/50 hover:text-[#f5f5f5] transition-colors border border-[#1e1e20] hover:border-[#333335] rounded-lg px-3 py-2"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
              Follow
            </a>
          </div>
        </div>

        {/* ─── Hero Cover Image ─── */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 mb-8">
          <div className="relative h-72 sm:h-96 md:h-[480px] rounded-3xl overflow-hidden border border-[#f5f5f5]/10 shadow-2xl">
            <Image
              src={story.coverImage}
              alt={story.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1100px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/70 bg-black/60 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10">
              <span className="flex items-center gap-1.5 font-medium">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {story.destination}, {story.state}
              </span>
              <span className="text-[10px] text-white/50">Photo by Ashraf Siddiqui</span>
            </div>
          </div>
        </div>

        {/* ─── Social Share Row ─── */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 mb-10">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs text-[#f5f5f5]/40 font-medium uppercase tracking-wider mr-1">Share this story</span>

            {/* Twitter/X */}
            <button
              onClick={handleShareTwitter}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#111113] hover:bg-[#1a1a1c] border border-[#1e1e20] text-[#f5f5f5]/70 hover:text-[#f5f5f5] text-xs transition-colors"
              aria-label="Share on X"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              X / Twitter
            </button>

            {/* WhatsApp */}
            <button
              onClick={handleShareWhatsApp}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#111113] hover:bg-[#1a1a1c] border border-[#1e1e20] text-[#f5f5f5]/70 hover:text-[#f5f5f5] text-xs transition-colors"
              aria-label="Share on WhatsApp"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
              WhatsApp
            </button>

            {/* Copy Link */}
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#111113] hover:bg-[#1a1a1c] border border-[#1e1e20] text-[#f5f5f5]/70 hover:text-[#f5f5f5] text-xs transition-colors"
              aria-label="Copy link"
            >
              {copiedLink ? (
                <>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  Copy Link
                </>
              )}
            </button>
          </div>
        </div>

        {/* ─── Main Content Layout ─── */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8">

          {/* Mobile Table of Contents */}
          <div className="lg:hidden mb-8">
            <button
              onClick={() => setMobileTocOpen((v) => !v)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-[#111113] border border-[#1e1e20] text-sm text-[#f5f5f5]/70 hover:text-[#f5f5f5] transition-colors"
            >
              <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="8" y1="6" x2="21" y2="6" />
                  <line x1="8" y1="12" x2="21" y2="12" />
                  <line x1="8" y1="18" x2="21" y2="18" />
                  <line x1="3" y1="6" x2="3.01" y2="6" />
                  <line x1="3" y1="12" x2="3.01" y2="12" />
                  <line x1="3" y1="18" x2="3.01" y2="18" />
                </svg>
                Table of Contents
              </span>
              <svg
                width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                className={`transition-transform duration-300 ${mobileTocOpen ? "rotate-180" : ""}`}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {mobileTocOpen && (
              <div className="mt-1 rounded-xl bg-[#111113] border border-[#1e1e20] p-3">
                <nav className="space-y-1">
                  {story.sections.map((sec) => (
                    <button
                      key={sec.id}
                      onClick={() => scrollToSection(sec.id)}
                      className={`w-full text-left text-xs py-2 px-3 rounded-lg transition-colors leading-relaxed ${
                        activeTocId === sec.id
                          ? "bg-white/10 text-white font-medium border-l-2 border-[#e8e8e8]"
                          : "text-[#f5f5f5]/50 hover:text-white"
                      }`}
                    >
                      {sec.heading}
                    </button>
                  ))}
                </nav>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

            {/* Desktop Sidebar TOC */}
            <aside className="hidden lg:block lg:col-span-4">
              <div className="bg-[#111113] rounded-2xl p-5 border border-[#1e1e20] sticky top-28">
                <p className="text-[10px] uppercase tracking-wider text-[#f5f5f5]/30 font-semibold mb-3 flex items-center gap-1.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="8" y1="6" x2="21" y2="6" />
                    <line x1="8" y1="12" x2="21" y2="12" />
                    <line x1="8" y1="18" x2="21" y2="18" />
                    <line x1="3" y1="6" x2="3.01" y2="6" />
                    <line x1="3" y1="12" x2="3.01" y2="12" />
                    <line x1="3" y1="18" x2="3.01" y2="18" />
                  </svg>
                  Table of Contents
                </p>
                <nav className="space-y-1">
                  {story.sections.map((sec) => (
                    <button
                      key={sec.id}
                      onClick={() => scrollToSection(sec.id)}
                      className={`w-full text-left text-xs py-1.5 px-2.5 rounded-lg transition-colors leading-relaxed ${
                        activeTocId === sec.id
                          ? "bg-white/10 text-white font-medium border-l-2 border-[#e8e8e8]"
                          : "text-[#f5f5f5]/50 hover:text-white"
                      }`}
                    >
                      {sec.heading}
                    </button>
                  ))}
                </nav>

                {/* Reading Progress in TOC */}
                <div className="mt-5 pt-4 border-t border-[#f5f5f5]/10">
                  <div className="flex items-center justify-between text-[10px] text-[#f5f5f5]/30 mb-1.5">
                    <span>Reading Progress</span>
                    <span>{Math.round(readingProgress)}%</span>
                  </div>
                  <div className="h-1 bg-[#1e1e20] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#e8e8e8] rounded-full transition-all duration-300"
                      style={{ width: `${readingProgress}%` }}
                    />
                  </div>
                </div>

                {/* Destination Guide Link */}
                {story.relatedGuideSlug && (
                  <div className="mt-5 pt-4 border-t border-[#f5f5f5]/10">
                    <p className="text-[10px] text-[#f5f5f5]/40 mb-2">Planning a journey here?</p>
                    <Link
                      href={`/travel/destinations/${story.relatedGuideSlug}`}
                      className="flex items-center justify-between text-xs font-semibold text-[#f5f5f5] hover:text-white transition-colors bg-white/5 p-2.5 rounded-xl border border-white/10 hover:border-white/30"
                    >
                      <span>Explore {story.destination} Guide</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </Link>
                  </div>
                )}
              </div>
            </aside>

            {/* Story Body */}
            <div className="lg:col-span-8 space-y-14">
              {story.sections.map((sec) => (
                <section key={sec.id} id={sec.id} className="scroll-mt-28 space-y-6">
                  {/* Section Heading */}
                  <h2
                    className="text-2xl sm:text-3xl font-bold text-[#f5f5f5] leading-tight pt-2"
                    style={{ fontFamily: "var(--font-fredoka)" }}
                  >
                    {sec.heading}
                  </h2>

                  {/* Paragraphs */}
                  <div className="space-y-5">
                    {sec.content.map((p, idx) => (
                      <p
                        key={idx}
                        className="text-lg leading-8 text-[#c8c8c8] font-normal"
                      >
                        {p}
                      </p>
                    ))}
                  </div>

                  {/* Blockquote */}
                  {sec.quote && (
                    <blockquote className="my-6 pl-5 border-l-2 border-[#e8e8e8]/50 py-1 bg-gradient-to-r from-white/5 to-transparent rounded-r-xl">
                      <p className="text-base sm:text-lg text-[#f5f5f5]/90 italic font-light leading-relaxed">
                        &ldquo;{sec.quote}&rdquo;
                      </p>
                    </blockquote>
                  )}

                  {/* Section Image */}
                  {sec.image && (
                    <div className="my-6 rounded-2xl overflow-hidden border border-[#1e1e20] bg-[#111113]">
                      <div className="relative h-64 sm:h-80 w-full">
                        <Image
                          src={sec.image.src}
                          alt={sec.image.alt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 700px"
                        />
                      </div>
                      <div className="p-3 text-[11px] text-[#f5f5f5]/50 flex items-center gap-1.5 border-t border-[#1e1e20]">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
                          <circle cx="12" cy="12" r="10" />
                          <line x1="12" y1="16" x2="12" y2="12" />
                          <line x1="12" y1="8" x2="12.01" y2="8" />
                        </svg>
                        <span>{sec.image.caption}</span>
                      </div>
                    </div>
                  )}

                  {/* Field Note */}
                  {sec.fieldNote && (
                    <div className="my-6 p-4 sm:p-5 rounded-2xl bg-[#111113] border border-[#1e1e20]">
                      <p className="text-xs font-semibold text-white flex items-center gap-1.5 mb-2">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polygon points="12 2 19 21 12 17 5 21 12 2" />
                        </svg>
                        {sec.fieldNote.title}
                      </p>
                      <p className="text-sm text-[#f5f5f5]/70 leading-relaxed">
                        {sec.fieldNote.text}
                      </p>
                    </div>
                  )}
                </section>
              ))}

              {/* In-article Travel Guide Banner */}
              {story.relatedGuideSlug && (
                <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#161619] to-[#111113] border border-[#1e1e20] mt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#f5f5f5]/40 font-semibold mb-1 block">
                      Complete Editorial Travel Guide
                    </span>
                    <h3
                      className="text-xl sm:text-2xl font-bold text-white mb-2"
                      style={{ fontFamily: "var(--font-fredoka)" }}
                    >
                      Planning your own {story.destination} expedition?
                    </h3>
                    <p className="text-xs text-[#f5f5f5]/60 max-w-md">
                      Check our day-by-day itinerary, transport logistics, weather windows, and transparent budget estimates.
                    </p>
                  </div>
                  <Link
                    href={`/travel/destinations/${story.relatedGuideSlug}`}
                    className="px-5 py-3 rounded-full bg-[#f5f5f5] text-[#080808] text-xs font-bold hover:bg-white transition-colors shrink-0 flex items-center justify-center gap-2 shadow-lg"
                  >
                    <span>Open {story.destination} Guide</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ─── Related Stories ─── */}
        {relatedStories.length > 0 && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 mt-24 pt-16 border-t border-[#f5f5f5]/10">
            <div className="flex items-center justify-between mb-8">
              <h3
                className="text-2xl sm:text-3xl font-bold text-[#f5f5f5]"
                style={{ fontFamily: "var(--font-fredoka)" }}
              >
                More Stories
              </h3>
              <Link
                href="/travel/stories"
                className="text-xs text-[#f5f5f5]/50 hover:text-white transition-colors flex items-center gap-1"
              >
                <span>View all</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedStories.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/travel/stories/${rel.slug}`}
                  className="group rounded-2xl overflow-hidden border border-[#1e1e20] bg-[#111113] hover:border-[#333335] transition-all duration-300 flex flex-col"
                >
                  <div className="relative h-48 w-full">
                    <Image
                      src={rel.coverImage}
                      alt={rel.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111113] via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 text-[9px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-black/60 text-white backdrop-blur-sm border border-white/10">
                      {rel.category}
                    </span>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4
                        className="text-base font-bold text-white mb-2"
                        style={{ fontFamily: "var(--font-fredoka)" }}
                      >
                        {rel.title}
                      </h4>
                      <p className="text-xs text-[#f5f5f5]/50 line-clamp-2 leading-relaxed">
                        {rel.excerpt}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#1e1e20] text-xs">
                      <span className="text-[#f5f5f5]/40 text-[11px] flex items-center gap-1">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        {rel.readTime}
                      </span>
                      <span className="text-[#f5f5f5]/70 group-hover:text-white font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-all">
                        Read
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
      <TravelFooter />
    </>
  );
}
