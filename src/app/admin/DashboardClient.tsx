"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// ── Types ──────────────────────────────────────────────────────────────────────
interface MetricPill {
  label: string;
  value: string;
  highlight?: boolean;
}

interface BannerSlide {
  id: string;
  tripSlug: string;
  badgeLabel: string;
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  posterImage: string;
  imageAlt: string;
  videoUrl?: string;
  metrics: MetricPill[];
  primaryCta: {
    label: string;
    action: string;
    target: string;
  };
  secondaryCta: {
    label: string;
    action: string;
    target: string;
  };
  isActive: boolean;
  sortOrder: number;
}

// ── Inline SVG Icons ───────────────────────────────────────────────────────────
const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);
const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);
const EyeIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
const ArrowUpIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="18 15 12 9 6 15" />
  </svg>
);
const ArrowDownIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);
const ExternalLinkIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);
const LogoutIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

export default function DashboardClient({ adminUsername }: { adminUsername: string }) {
  const router = useRouter();
  const [slides, setSlides] = useState<BannerSlide[]>([]);
  const [selectedSlideIndex, setSelectedSlideIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Fetch all slides on mount
  useEffect(() => {
    async function loadSlides() {
      try {
        const res = await fetch("/api/admin/hero");
        if (res.ok) {
          const data = await res.json();
          if (data.slides) {
            setSlides(data.slides);
          }
        }
      } catch {
        setStatusMessage({ type: "error", text: "Failed to connect to slides service." });
      } finally {
        setIsLoading(false);
      }
    }
    loadSlides();
  }, []);

  const activeSlide = slides[selectedSlideIndex];

  // Save changes to API
  const handleSaveAll = async () => {
    setIsSaving(true);
    setStatusMessage(null);
    try {
      const res = await fetch("/api/admin/hero", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slides }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatusMessage({ type: "success", text: "Hero banner updated and published live!" });
        setTimeout(() => setStatusMessage(null), 4000);
      } else {
        setStatusMessage({ type: "error", text: data.error || "Save failed." });
      }
    } catch {
      setStatusMessage({ type: "error", text: "Network error while saving." });
    } finally {
      setIsSaving(false);
    }
  };

  // Logout
  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  // Slide mutators
  const updateActiveSlide = (fields: Partial<BannerSlide>) => {
    setSlides((prev) =>
      prev.map((s, idx) => (idx === selectedSlideIndex ? { ...s, ...fields } : s))
    );
  };

  const handleAddSlide = () => {
    const newSlide: BannerSlide = {
      id: `expedition-${Date.now()}`,
      tripSlug: "custom-expedition-2026",
      badgeLabel: "New Expedition Announcement",
      titleLine1: "NEW EXPEDITION",
      titleLine2: "HIGH TRAILS.",
      subtitle: "Add a concise description explaining the route, scenery, and mountain passes.",
      posterImage: "/img/travel/kashmir_hero.jpg",
      imageAlt: "New travel expedition",
      videoUrl: "/videos/reels/travelashraf1.mp4",
      metrics: [
        { label: "Dates", value: "TBA 2026" },
        { label: "Duration", value: "7 Days" },
        { label: "Altitude", value: "12,000 ft" },
        { label: "Group Size", value: "10 Travellers" },
        { label: "Starting", value: "₹25,000" },
        { label: "Available", value: "Slots Open", highlight: true },
      ],
      primaryCta: {
        label: "View Trip Details & Reserve",
        action: "openModal",
        target: "",
      },
      secondaryCta: {
        label: "Explore All Expeditions",
        action: "scroll",
        target: "#group-tours",
      },
      isActive: true,
      sortOrder: slides.length + 1,
    };
    setSlides([...slides, newSlide]);
    setSelectedSlideIndex(slides.length);
  };

  const handleDeleteSlide = (indexToDelete: number) => {
    if (slides.length <= 1) {
      alert("At least one slide must remain in the hero banner.");
      return;
    }
    if (confirm("Are you sure you want to delete this slide?")) {
      const next = slides.filter((_, idx) => idx !== indexToDelete);
      setSlides(next);
      setSelectedSlideIndex(Math.max(0, indexToDelete - 1));
    }
  };

  const handleMoveSlide = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= slides.length) return;
    const reordered = [...slides];
    const temp = reordered[index];
    reordered[index] = reordered[targetIndex];
    reordered[targetIndex] = temp;
    reordered.forEach((s, idx) => (s.sortOrder = idx + 1));
    setSlides(reordered);
    setSelectedSlideIndex(targetIndex);
  };

  // Metric mutators
  const updateMetric = (mIdx: number, fields: Partial<MetricPill>) => {
    if (!activeSlide) return;
    const nextMetrics = [...activeSlide.metrics];
    nextMetrics[mIdx] = { ...nextMetrics[mIdx], ...fields };
    updateActiveSlide({ metrics: nextMetrics });
  };

  const addMetric = () => {
    if (!activeSlide) return;
    const nextMetrics = [...activeSlide.metrics, { label: "Field", value: "Value" }];
    updateActiveSlide({ metrics: nextMetrics });
  };

  const removeMetric = (mIdx: number) => {
    if (!activeSlide) return;
    const nextMetrics = activeSlide.metrics.filter((_, idx) => idx !== mIdx);
    updateActiveSlide({ metrics: nextMetrics });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center text-white/50 text-sm">
        <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin mr-3" />
        Loading Admin Control Center...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080808] text-[#f5f5f5] pb-24">
      {/* ─── TOP CONTROL BAR ─────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-[#080808]/90 backdrop-blur-md border-b border-[#f5f5f5]/10 px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <div>
              <p
                className="text-lg font-bold text-white leading-tight"
                style={{ fontFamily: "var(--font-fredoka)" }}
              >
                Ashraf Siddiqui · Banner Control Center
              </p>
              <p className="text-[11px] text-[#f5f5f5]/40">
                Logged in as <strong className="text-white">@{adminUsername}</strong> · Live Dynamic Banner Editor
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/travel"
              target="_blank"
              className="px-4 py-2 rounded-xl text-xs font-semibold border border-[#f5f5f5]/15 text-[#f5f5f5]/70 hover:text-white hover:border-[#f5f5f5]/40 flex items-center gap-1.5 transition-colors"
            >
              <span>View Live Banner</span>
              <ExternalLinkIcon />
            </Link>

            <button
              onClick={handleSaveAll}
              disabled={isSaving}
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#f5f5f5] text-[#080808] hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.25)] flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
            >
              {isSaving ? (
                <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              ) : (
                <>
                  <CheckIcon />
                  <span>Publish All Changes</span>
                </>
              )}
            </button>

            <button
              onClick={handleLogout}
              className="p-2.5 rounded-xl border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
              title="Logout"
              aria-label="Logout"
            >
              <LogoutIcon />
            </button>
          </div>
        </div>
      </header>

      {/* ─── TOAST NOTIFICATION ──────────────────────────────────────────── */}
      {statusMessage && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl text-xs font-semibold shadow-2xl flex items-center gap-2 border ${
            statusMessage.type === "success"
              ? "bg-[#111113] border-emerald-500/40 text-emerald-300"
              : "bg-[#111113] border-red-500/40 text-red-300"
          }`}
        >
          {statusMessage.type === "success" ? <CheckIcon /> : "!"}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* ─── MAIN DASHBOARD GRID ─────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ─── LEFT: SLIDES LIST (4 COLS) ───────────────────────────────── */}
          <aside className="lg:col-span-4 bg-[#111113] border border-[#f5f5f5]/10 rounded-3xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#f5f5f5]/10">
              <div>
                <h2 className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-fredoka)" }}>
                  Expedition Slides ({slides.length})
                </h2>
                <p className="text-[11px] text-[#f5f5f5]/40">Click to edit or reorder slides</p>
              </div>
              <button
                onClick={handleAddSlide}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <PlusIcon />
                <span>New</span>
              </button>
            </div>

            {/* Slides list */}
            <div className="space-y-2.5">
              {slides.map((s, idx) => {
                const isSelected = idx === selectedSlideIndex;
                return (
                  <div
                    key={s.id}
                    onClick={() => setSelectedSlideIndex(idx)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? "bg-[#161619] border-white/40 shadow-lg"
                        : "bg-[#080808]/70 border-[#f5f5f5]/10 hover:border-[#f5f5f5]/25"
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold text-[#f5f5f5]/40 tabular-nums">
                          0{idx + 1}
                        </span>
                        <span
                          className={`text-xs font-bold truncate ${isSelected ? "text-white" : "text-[#f5f5f5]/80"}`}
                          style={{ fontFamily: "var(--font-fredoka)" }}
                        >
                          {s.titleLine1 || "Untitled"}
                        </span>
                        {!s.isActive && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-red-950 text-red-300 border border-red-500/20">
                            Hidden
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-[#f5f5f5]/40 truncate">{s.badgeLabel}</p>
                    </div>

                    {/* Quick Reorder and Delete Actions */}
                    <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleMoveSlide(idx, "up")}
                        disabled={idx === 0}
                        className="p-1 text-[#f5f5f5]/30 hover:text-white disabled:opacity-20 cursor-pointer"
                        title="Move Up"
                      >
                        <ArrowUpIcon />
                      </button>
                      <button
                        onClick={() => handleMoveSlide(idx, "down")}
                        disabled={idx === slides.length - 1}
                        className="p-1 text-[#f5f5f5]/30 hover:text-white disabled:opacity-20 cursor-pointer"
                        title="Move Down"
                      >
                        <ArrowDownIcon />
                      </button>
                      <button
                        onClick={() => handleDeleteSlide(idx)}
                        className="p-1 text-red-400/60 hover:text-red-300 ml-1 cursor-pointer"
                        title="Delete Slide"
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </aside>

          {/* ─── RIGHT: LIVE EDITOR & REAL-TIME PREVIEW (8 COLS) ──────────── */}
          <div className="lg:col-span-8 space-y-6">
            {activeSlide ? (
              <>
                {/* ── REAL-TIME MINI MOCKUP PREVIEW ── */}
                <div className="bg-[#111113] border border-[#f5f5f5]/10 rounded-3xl p-6 relative overflow-hidden">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs uppercase tracking-wider text-[#f5f5f5]/40 font-semibold flex items-center gap-1.5">
                      <EyeIcon />
                      Live Banner Mini-Preview
                    </span>
                    <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                      Updates As You Type
                    </span>
                  </div>

                  {/* Preview Canvas */}
                  <div className="relative rounded-2xl overflow-hidden aspect-[16/7] bg-[#080808] border border-[#f5f5f5]/15 flex flex-col justify-center items-center text-center p-6 select-none">
                    {/* Background image preview */}
                    <div
                      className="absolute inset-0 bg-cover bg-center opacity-40"
                      style={{ backgroundImage: `url(${activeSlide.posterImage})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]/60" />

                    <div className="relative z-10 max-w-lg">
                      {/* Badge */}
                      <span className="inline-block text-[9px] uppercase tracking-wider font-semibold px-2.5 py-0.5 rounded-full bg-white/10 text-white border border-white/20 mb-2">
                        {activeSlide.badgeLabel || "Expedition Badge"}
                      </span>

                      {/* Headings */}
                      <h3
                        className="text-2xl sm:text-3xl font-bold text-white leading-tight"
                        style={{ fontFamily: "var(--font-fredoka)" }}
                      >
                        {activeSlide.titleLine1 || "TITLE LINE 1"}
                      </h3>
                      <h3
                        className="text-2xl sm:text-3xl font-bold text-transparent leading-tight mb-2"
                        style={{
                          fontFamily: "var(--font-fredoka)",
                          WebkitTextStroke: "1px rgba(245,245,245,0.8)",
                        }}
                      >
                        {activeSlide.titleLine2 || "TITLE LINE 2."}
                      </h3>

                      {/* Subtitle */}
                      <p className="text-[11px] text-[#f5f5f5]/70 line-clamp-2 mb-3">
                        {activeSlide.subtitle}
                      </p>

                      {/* Metric pills preview */}
                      <div className="flex flex-wrap items-center justify-center gap-1.5">
                        {activeSlide.metrics.slice(0, 4).map((m, idx) => (
                          <span
                            key={idx}
                            className="text-[9px] px-2 py-0.5 rounded-full bg-[#111113]/90 border border-white/10 text-[#f5f5f5]/80"
                          >
                            <span className="text-[#f5f5f5]/40">{m.label}:</span> {m.value}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── FORM FIELDS EDITOR ── */}
                <div className="bg-[#111113] border border-[#f5f5f5]/10 rounded-3xl p-6 sm:p-8 space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-[#f5f5f5]/10">
                    <div>
                      <h2
                        className="text-xl font-bold text-white"
                        style={{ fontFamily: "var(--font-fredoka)" }}
                      >
                        Edit Slide 0{selectedSlideIndex + 1}
                      </h2>
                      <p className="text-xs text-[#f5f5f5]/50">
                        Adjust titles, background video, dates, altitude & transparent pricing
                      </p>
                    </div>

                    <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#f5f5f5]/80">
                      <input
                        type="checkbox"
                        checked={activeSlide.isActive}
                        onChange={(e) => updateActiveSlide({ isActive: e.target.checked })}
                        className="rounded accent-white w-4 h-4"
                      />
                      <span>Active on Website</span>
                    </label>
                  </div>

                  {/* Section 1: Headings & Badge */}
                  <div className="space-y-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#f5f5f5]/40">
                      1. Headings & Announcement
                    </p>

                    <div>
                      <label className="block text-xs text-[#f5f5f5]/60 mb-1.5 font-medium">
                        Announcement Top Badge Label
                      </label>
                      <input
                        type="text"
                        value={activeSlide.badgeLabel}
                        onChange={(e) => updateActiveSlide({ badgeLabel: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#080808] border border-[#f5f5f5]/15 text-sm text-white focus:border-white focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-[#f5f5f5]/60 mb-1.5 font-medium">
                          Title Line 1 (Solid Font)
                        </label>
                        <input
                          type="text"
                          value={activeSlide.titleLine1}
                          onChange={(e) => updateActiveSlide({ titleLine1: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-[#080808] border border-[#f5f5f5]/15 text-sm text-white font-bold focus:border-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-[#f5f5f5]/60 mb-1.5 font-medium">
                          Title Line 2 (Outlined Stroke)
                        </label>
                        <input
                          type="text"
                          value={activeSlide.titleLine2}
                          onChange={(e) => updateActiveSlide({ titleLine2: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-[#080808] border border-[#f5f5f5]/15 text-sm text-white font-bold focus:border-white focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-[#f5f5f5]/60 mb-1.5 font-medium">
                        Subtitle / Short Description
                      </label>
                      <textarea
                        rows={3}
                        value={activeSlide.subtitle}
                        onChange={(e) => updateActiveSlide({ subtitle: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#080808] border border-[#f5f5f5]/15 text-sm text-white focus:border-white focus:outline-none resize-none leading-relaxed"
                      />
                    </div>
                  </div>

                  {/* Section 2: Background Media */}
                  <div className="space-y-4 pt-4 border-t border-[#f5f5f5]/10">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#f5f5f5]/40">
                      2. Background Media (Video & Poster)
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-[#f5f5f5]/60 mb-1.5 font-medium">
                          Video URL (.mp4 local path or streaming URL)
                        </label>
                        <input
                          type="text"
                          value={activeSlide.videoUrl || ""}
                          onChange={(e) => updateActiveSlide({ videoUrl: e.target.value })}
                          placeholder="/videos/reels/travelashraf1.mp4"
                          className="w-full px-4 py-2.5 rounded-xl bg-[#080808] border border-[#f5f5f5]/15 text-sm text-white focus:border-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-[#f5f5f5]/60 mb-1.5 font-medium">
                          Poster Image URL (fallback)
                        </label>
                        <input
                          type="text"
                          value={activeSlide.posterImage}
                          onChange={(e) => updateActiveSlide({ posterImage: e.target.value })}
                          placeholder="/img/travel/ladakh.jpg"
                          className="w-full px-4 py-2.5 rounded-xl bg-[#080808] border border-[#f5f5f5]/15 text-sm text-white focus:border-white focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 3: Information Pills Editor */}
                  <div className="space-y-4 pt-4 border-t border-[#f5f5f5]/10">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold uppercase tracking-wider text-[#f5f5f5]/40">
                        3. Expedition Information Pills
                      </p>
                      <button
                        type="button"
                        onClick={addMetric}
                        className="text-xs font-semibold text-white/80 hover:text-white flex items-center gap-1 cursor-pointer"
                      >
                        <PlusIcon />
                        <span>Add Pill</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activeSlide.metrics.map((m, mIdx) => (
                        <div
                          key={mIdx}
                          className="p-3 rounded-xl bg-[#080808] border border-[#f5f5f5]/10 flex items-center gap-2"
                        >
                          <input
                            type="text"
                            value={m.label}
                            onChange={(e) => updateMetric(mIdx, { label: e.target.value })}
                            placeholder="Label (e.g. Dates)"
                            className="w-24 px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-[#f5f5f5]/60 font-medium focus:outline-none"
                          />
                          <input
                            type="text"
                            value={m.value}
                            onChange={(e) => updateMetric(mIdx, { value: e.target.value })}
                            placeholder="Value (e.g. 10 Jun – 18 Jun)"
                            className="flex-1 px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-white font-bold focus:outline-none"
                          />
                          <label
                            className="flex items-center text-[10px] text-[#f5f5f5]/40 cursor-pointer"
                            title="Highlight in white border"
                          >
                            <input
                              type="checkbox"
                              checked={Boolean(m.highlight)}
                              onChange={(e) => updateMetric(mIdx, { highlight: e.target.checked })}
                              className="mr-1 accent-white"
                            />
                            Alert
                          </label>
                          <button
                            type="button"
                            onClick={() => removeMetric(mIdx)}
                            className="text-red-400/50 hover:text-red-300 p-1 cursor-pointer"
                            title="Remove Pill"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Section 4: CTAs & Actions */}
                  <div className="space-y-4 pt-4 border-t border-[#f5f5f5]/10">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#f5f5f5]/40">
                      4. Call-to-Action Buttons
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-[#f5f5f5]/60 mb-1.5 font-medium">
                          Primary Button Label
                        </label>
                        <input
                          type="text"
                          value={activeSlide.primaryCta.label}
                          onChange={(e) =>
                            updateActiveSlide({
                              primaryCta: { ...activeSlide.primaryCta, label: e.target.value },
                            })
                          }
                          className="w-full px-4 py-2.5 rounded-xl bg-[#080808] border border-[#f5f5f5]/15 text-sm text-white focus:border-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-[#f5f5f5]/60 mb-1.5 font-medium">
                          Secondary Button Label
                        </label>
                        <input
                          type="text"
                          value={activeSlide.secondaryCta.label}
                          onChange={(e) =>
                            updateActiveSlide({
                              secondaryCta: { ...activeSlide.secondaryCta, label: e.target.value },
                            })
                          }
                          className="w-full px-4 py-2.5 rounded-xl bg-[#080808] border border-[#f5f5f5]/15 text-sm text-white focus:border-white focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Bottom Save Action */}
                  <div className="pt-6 border-t border-[#f5f5f5]/10 flex items-center justify-between">
                    <p className="text-xs text-[#f5f5f5]/40">
                      All changes are saved to the persistent database and deployed immediately.
                    </p>
                    <button
                      type="button"
                      onClick={handleSaveAll}
                      disabled={isSaving}
                      className="px-7 py-3 rounded-full text-xs font-bold bg-[#f5f5f5] text-[#080808] hover:bg-white transition-all shadow-xl flex items-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSaving ? "Saving..." : "Save & Publish"}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="p-12 text-center text-[#f5f5f5]/40 bg-[#111113] rounded-3xl border border-[#f5f5f5]/10">
                Select a slide from the left panel to begin editing.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
