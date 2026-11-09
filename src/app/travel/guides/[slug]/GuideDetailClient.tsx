"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { TravelGuide, TRAVEL_GUIDES } from "../../data/guides";

interface GuideDetailClientProps {
  guide: TravelGuide;
}

export default function GuideDetailClient({ guide }: GuideDetailClientProps) {
  const [activeTab, setActiveTab] = useState<"all" | number>("all");
  const [expandedDays, setExpandedDays] = useState<Record<number, boolean>>({ 1: true });
  const [copiedToast, setCopiedToast] = useState(false);

  const toggleDay = (dayNum: number) => {
    setExpandedDays((prev) => ({ ...prev, [dayNum]: !prev[dayNum] }));
  };

  const expandAll = () => {
    const all: Record<number, boolean> = {};
    guide.dayByDayItinerary.forEach((d) => {
      all[d.dayNumber] = true;
    });
    setExpandedDays(all);
  };

  const collapseAll = () => {
    setExpandedDays({});
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.share) {
      try {
        await navigator.share({
          title: guide.title,
          text: guide.subtitle,
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

  const filteredDays =
    activeTab === "all"
      ? guide.dayByDayItinerary
      : guide.dayByDayItinerary.filter((d) => d.dayNumber === activeTab);

  return (
    <div className="min-h-screen bg-[#080808] text-[#f5f5f5] pt-24 sm:pt-28 pb-32">
      {/* Toast Notification */}
      {copiedToast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[#161619] border border-[#f5f5f5]/20 text-[#f5f5f5] text-xs px-4 py-2 rounded-full shadow-2xl flex items-center gap-2 animate-bounce">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-400">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          Guide link copied to clipboard!
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#f5f5f5]/40 mb-6 flex-wrap">
          <Link href="/travel" className="hover:text-white transition-colors">
            Travel
          </Link>
          <span>/</span>
          <Link href="/travel/guides" className="hover:text-white transition-colors">
            Guides & Itineraries
          </Link>
          <span>/</span>
          <span className="text-[#f5f5f5]/80 truncate max-w-[200px] sm:max-w-none">{guide.destination}</span>
        </div>

        {/* Hero Banner Card */}
        <div className="relative rounded-3xl overflow-hidden border border-[#f5f5f5]/10 bg-[#111113] shadow-2xl mb-12">
          <div className="relative h-72 sm:h-96 md:h-[420px] w-full">
            <Image
              src={guide.heroImage}
              alt={guide.title}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111113] via-[#080808]/60 to-black/30" />
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-10">
            {/* Meta Tags */}
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className="text-[10px] uppercase tracking-wider font-semibold px-3 py-1 rounded-full bg-white/10 text-[#f5f5f5] backdrop-blur-md border border-white/20">
                {guide.durationLabel}
              </span>
              <span className="text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full bg-black/50 text-[#f5f5f5]/80 backdrop-blur-md border border-[#f5f5f5]/10">
                {guide.category}
              </span>
              <span className="text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full bg-black/50 text-[#f5f5f5]/80 backdrop-blur-md border border-[#f5f5f5]/10">
                {guide.season}
              </span>
              <span className="text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full bg-black/50 text-[#f5f5f5]/80 backdrop-blur-md border border-[#f5f5f5]/10">
                {guide.difficulty}
              </span>
            </div>

            <h1
              className="text-2xl sm:text-4xl md:text-5xl font-bold text-[#f5f5f5] leading-tight mb-2"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              {guide.title}
            </h1>

            <p className="text-xs sm:text-sm text-[#f5f5f5]/70 max-w-2xl leading-relaxed mb-6">
              {guide.subtitle}
            </p>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-3 flex-wrap">
              <button
                onClick={handlePrint}
                className="px-4 py-2 rounded-full bg-[#f5f5f5] text-[#080808] text-xs font-bold hover:bg-white transition-colors flex items-center gap-2 shadow-lg"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 6 2 18 2 18 9"/>
                  <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
                  <rect x="6" y="14" width="12" height="8"/>
                </svg>
                Print / Save Itinerary PDF
              </button>

              <button
                onClick={handleShare}
                className="px-4 py-2 rounded-full bg-white/10 text-white border border-white/20 text-xs font-semibold hover:bg-white/20 transition-colors flex items-center gap-2 backdrop-blur-sm"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="18" cy="5" r="3"/>
                  <circle cx="6" cy="12" r="3"/>
                  <circle cx="18" cy="19" r="3"/>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                </svg>
                Share Guide
              </button>
            </div>
          </div>
        </div>

        {/* ─── QUICK METRICS STRIP ──────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14">
          <div className="bg-[#111113] p-4 rounded-2xl border border-[#f5f5f5]/10">
            <p className="text-[10px] uppercase tracking-wider text-[#f5f5f5]/40 mb-1">Total Route Distance</p>
            <p className="text-xl sm:text-2xl font-bold text-[#f5f5f5]" style={{ fontFamily: "var(--font-fredoka)" }}>
              {guide.totalDistanceKm} km
            </p>
          </div>
          <div className="bg-[#111113] p-4 rounded-2xl border border-[#f5f5f5]/10">
            <p className="text-[10px] uppercase tracking-wider text-[#f5f5f5]/40 mb-1">Duration</p>
            <p className="text-xl sm:text-2xl font-bold text-[#f5f5f5]" style={{ fontFamily: "var(--font-fredoka)" }}>
              {guide.durationDays} Days
            </p>
          </div>
          <div className="bg-[#111113] p-4 rounded-2xl border border-[#f5f5f5]/10">
            <p className="text-[10px] uppercase tracking-wider text-[#f5f5f5]/40 mb-1">Estimated Budget</p>
            <p className="text-xl sm:text-2xl font-bold text-[#f5f5f5]" style={{ fontFamily: "var(--font-fredoka)" }}>
              ₹{guide.budgetEstimate.perPersonMin / 1000}K - ₹{guide.budgetEstimate.perPersonMax / 1000}K
            </p>
          </div>
          <div className="bg-[#111113] p-4 rounded-2xl border border-[#f5f5f5]/10">
            <p className="text-[10px] uppercase tracking-wider text-[#f5f5f5]/40 mb-1">Best Travel Window</p>
            <p className="text-xs sm:text-sm font-semibold text-[#f5f5f5] mt-1.5 line-clamp-2">
              {guide.idealMonths}
            </p>
          </div>
        </div>

        {/* ─── SECTION 1: OVERVIEW & ROUTE BLUEPRINT ────────────────── */}
        <section className="mb-14 bg-[#111113] rounded-3xl p-6 sm:p-8 border border-[#f5f5f5]/10">
          <h2
            className="text-2xl sm:text-3xl font-bold text-[#f5f5f5] mb-4"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            Route Overview & Strategy
          </h2>
          <p className="text-sm text-[#f5f5f5]/70 leading-relaxed mb-6">
            {guide.overview}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-[#f5f5f5]/10">
            <div>
              <p className="text-xs font-semibold text-[#f5f5f5] mb-1 flex items-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                Entry & Exit Logistics:
              </p>
              <p className="text-xs text-[#f5f5f5]/60 leading-relaxed">
                <strong>Entry:</strong> {guide.transportLogistics.entryPoint}<br />
                <strong>Exit:</strong> {guide.transportLogistics.exitPoint}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-[#f5f5f5] mb-1 flex items-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="1" y="3" width="15" height="13"/>
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                  <circle cx="5.5" cy="18.5" r="2.5"/>
                  <circle cx="18.5" cy="18.5" r="2.5"/>
                </svg>
                Recommended Transit Mode:
              </p>
              <p className="text-xs text-[#f5f5f5]/60 leading-relaxed">
                {guide.transportLogistics.recommendedMode}
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: DAY-BY-DAY ITINERARY ──────────────────────── */}
        <section id="itinerary" className="mb-14">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <p className="text-[10px] tracking-[0.25em] uppercase text-[#f5f5f5]/40 font-medium mb-1">
                Field Blueprint
              </p>
              <h2
                className="text-2xl sm:text-3xl font-bold text-[#f5f5f5]"
                style={{ fontFamily: "var(--font-fredoka)" }}
              >
                Day-by-Day Itinerary
              </h2>
            </div>

            {/* Expand / Collapse and Day Tabs */}
            <div className="flex items-center gap-2">
              <button
                onClick={expandAll}
                className="px-3 py-1.5 rounded-full text-[11px] font-medium bg-[#111113] border border-[#f5f5f5]/15 text-[#f5f5f5]/70 hover:text-white"
              >
                Expand All
              </button>
              <button
                onClick={collapseAll}
                className="px-3 py-1.5 rounded-full text-[11px] font-medium bg-[#111113] border border-[#f5f5f5]/15 text-[#f5f5f5]/70 hover:text-white"
              >
                Collapse All
              </button>
            </div>
          </div>

          {/* Day Selector Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-6 no-scrollbar">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                activeTab === "all"
                  ? "bg-[#f5f5f5] text-[#080808]"
                  : "bg-[#111113] text-[#f5f5f5]/50 border border-[#f5f5f5]/10 hover:text-white"
              }`}
            >
              All Days ({guide.dayByDayItinerary.length})
            </button>
            {guide.dayByDayItinerary.map((d) => (
              <button
                key={d.dayNumber}
                onClick={() => setActiveTab(d.dayNumber)}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                  activeTab === d.dayNumber
                    ? "bg-[#f5f5f5] text-[#080808]"
                    : "bg-[#111113] text-[#f5f5f5]/50 border border-[#f5f5f5]/10 hover:text-white"
                }`}
              >
                Day {d.dayNumber}
              </button>
            ))}
          </div>

          {/* Days Accordion List */}
          <div className="space-y-4">
            {filteredDays.map((day) => {
              const isExpanded = expandedDays[day.dayNumber] ?? false;
              return (
                <div
                  key={day.dayNumber}
                  className="rounded-3xl border border-[#f5f5f5]/10 bg-[#111113] overflow-hidden transition-all duration-300"
                >
                  {/* Day Header Bar */}
                  <div
                    onClick={() => toggleDay(day.dayNumber)}
                    className="p-5 sm:p-6 cursor-pointer flex items-center justify-between hover:bg-white/[0.02] transition-colors select-none"
                  >
                    <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                      <span className="w-9 h-9 rounded-2xl bg-white/10 text-white font-bold flex items-center justify-center text-xs shrink-0 border border-white/10">
                        {day.dayNumber}
                      </span>
                      <div>
                        <h3
                          className="text-base sm:text-lg font-bold text-[#f5f5f5] leading-tight"
                          style={{ fontFamily: "var(--font-fredoka)" }}
                        >
                          {day.dayTitle}
                        </h3>
                        <p className="text-[11px] text-[#f5f5f5]/40 mt-0.5">
                          {day.fromLocation} &rarr; {day.toLocation} · {day.distanceKm} km · ~{day.travelTimeHours} hrs
                          {day.altitudeMeters ? ` · ${day.altitudeMeters.toLocaleString()}m` : ""}
                        </p>
                      </div>
                    </div>

                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 shrink-0">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className={`transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                      >
                        <polyline points="6 9 12 15 18 9"/>
                      </svg>
                    </div>
                  </div>

                  {/* Day Details Drawer */}
                  {isExpanded && (
                    <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-[#f5f5f5]/5 space-y-4">
                      {/* Timeline Breakdown */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="p-3.5 rounded-2xl bg-[#080808] border border-[#f5f5f5]/5">
                          <p className="text-[10px] uppercase tracking-wider text-[#f5f5f5]/40 font-semibold mb-1 flex items-center gap-1">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <circle cx="12" cy="12" r="5"/>
                              <line x1="12" y1="1" x2="12" y2="3"/>
                            </svg>
                            Morning
                          </p>
                          <p className="text-xs text-[#f5f5f5]/80 leading-relaxed">
                            {day.morningActivity}
                          </p>
                        </div>

                        <div className="p-3.5 rounded-2xl bg-[#080808] border border-[#f5f5f5]/5">
                          <p className="text-[10px] uppercase tracking-wider text-[#f5f5f5]/40 font-semibold mb-1 flex items-center gap-1">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <circle cx="12" cy="12" r="10"/>
                              <polyline points="12 6 12 12 16 14"/>
                            </svg>
                            Afternoon
                          </p>
                          <p className="text-xs text-[#f5f5f5]/80 leading-relaxed">
                            {day.afternoonActivity}
                          </p>
                        </div>

                        <div className="p-3.5 rounded-2xl bg-[#080808] border border-[#f5f5f5]/5">
                          <p className="text-[10px] uppercase tracking-wider text-[#f5f5f5]/40 font-semibold mb-1 flex items-center gap-1">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                            </svg>
                            Evening
                          </p>
                          <p className="text-xs text-[#f5f5f5]/80 leading-relaxed">
                            {day.eveningActivity}
                          </p>
                        </div>
                      </div>

                      {/* Day Field Tips */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs">
                          <span className="text-[10px] uppercase tracking-wider text-[#f5f5f5]/40 block mb-0.5">Stay Location</span>
                          <span className="text-white font-medium">{day.stayLocation}</span>
                        </div>
                        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs">
                          <span className="text-[10px] uppercase tracking-wider text-[#f5f5f5]/40 block mb-0.5">Food Recommendation</span>
                          <span className="text-[#f5f5f5]/80">{day.foodTip}</span>
                        </div>
                        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs">
                          <span className="text-[10px] uppercase tracking-wider text-[#f5f5f5]/40 block mb-0.5">Practical Tip</span>
                          <span className="text-[#f5f5f5]/80">{day.practicalTip}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ─── SECTION 3: TRANSPARENT BUDGET BREAKDOWN ─────────────── */}
        <section id="budget" className="mb-14 bg-[#111113] rounded-3xl p-6 sm:p-8 border border-[#f5f5f5]/10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <p className="text-[10px] tracking-[0.25em] uppercase text-[#f5f5f5]/40 font-medium mb-1">
                Real Explorer Numbers
              </p>
              <h2
                className="text-2xl sm:text-3xl font-bold text-[#f5f5f5]"
                style={{ fontFamily: "var(--font-fredoka)" }}
              >
                Transparent Budget Estimates
              </h2>
            </div>
            <div className="text-right sm:text-right">
              <span className="text-[10px] uppercase tracking-wider text-[#f5f5f5]/40 font-medium">
                {guide.budgetEstimate.dateEstimated} · Currency: {guide.budgetEstimate.currency}
              </span>
              <p
                className="text-2xl sm:text-3xl font-bold text-[#f5f5f5] mt-1"
                style={{ fontFamily: "var(--font-fredoka)" }}
              >
                ₹{guide.budgetEstimate.perPersonMin.toLocaleString()} – ₹{guide.budgetEstimate.perPersonMax.toLocaleString()}
                <span className="text-xs font-normal text-[#f5f5f5]/40 ml-1">/ person</span>
              </p>
            </div>
          </div>

          {/* Cost Items Table */}
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#f5f5f5]/10 text-[#f5f5f5]/40 text-[10px] uppercase tracking-wider">
                  <th className="py-3 px-3">Expense Head</th>
                  <th className="py-3 px-3">Estimated Cost</th>
                  <th className="py-3 px-3">Details & Assumptions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f5f5f5]/5 text-[#f5f5f5]/80">
                {guide.budgetEstimate.costBreakdown.map((item, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-3 font-semibold text-white whitespace-nowrap">{item.category}</td>
                    <td className="py-3 px-3 font-mono text-[#f5f5f5] whitespace-nowrap">{item.estimatedCost}</td>
                    <td className="py-3 px-3 text-[#f5f5f5]/60">{item.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Assumptions List */}
          <div className="p-4 rounded-2xl bg-[#080808] border border-[#f5f5f5]/5 mb-4 text-xs">
            <p className="font-semibold text-white mb-2">Estimation Assumptions:</p>
            <ul className="space-y-1.5 text-[#f5f5f5]/60 list-disc list-inside">
              {guide.budgetEstimate.assumptions.map((assump, idx) => (
                <li key={idx}>{assump}</li>
              ))}
            </ul>
          </div>

          {/* Non-Guaranteed Disclaimer Banner */}
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-xs flex items-start gap-3">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#f5f5f5]/60 shrink-0 mt-0.5">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <p className="text-[#f5f5f5]/60 leading-relaxed text-[11px]">
              <strong className="text-white">Price Transparency Note: </strong>
              {guide.budgetEstimate.disclaimer}
            </p>
          </div>
        </section>

        {/* ─── SECTION 4: FOOD & STAYS ──────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
          {/* Stays */}
          <div className="bg-[#111113] rounded-3xl p-6 sm:p-7 border border-[#f5f5f5]/10">
            <h3
              className="text-xl font-bold text-[#f5f5f5] mb-4 flex items-center gap-2"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
              Recommended Stays & Homestays
            </h3>
            <div className="space-y-4">
              {guide.accommodationRecommendations.map((acc, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-[#080808] border border-[#f5f5f5]/5 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-white text-sm">{acc.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-[#f5f5f5]">{acc.type}</span>
                  </div>
                  <p className="text-[#f5f5f5]/40 text-[11px] mb-2">{acc.location} · {acc.priceRange}</p>
                  <p className="text-[#f5f5f5]/70 leading-relaxed">{acc.whyRecommended}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Food */}
          <div className="bg-[#111113] rounded-3xl p-6 sm:p-7 border border-[#f5f5f5]/10">
            <h3
              className="text-xl font-bold text-[#f5f5f5] mb-4 flex items-center gap-2"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
              </svg>
              Local Food & Authentic Flavors
            </h3>
            <div className="space-y-4">
              {guide.foodAndCulinaryHighlights.map((food, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-[#080808] border border-[#f5f5f5]/5 text-xs">
                  <span className="font-bold text-white text-sm block mb-1">{food.dishName}</span>
                  <p className="text-[#f5f5f5]/70 leading-relaxed mb-2">{food.description}</p>
                  <span className="text-[11px] text-[#f5f5f5]/40 block">
                    Must Visit: <strong className="text-[#f5f5f5]/80">{food.recommendedPlace}</strong>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── SECTION 5: PACKING & PERMITS ─────────────────────────── */}
        <div className="bg-[#111113] rounded-3xl p-6 sm:p-8 border border-[#f5f5f5]/10 mb-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3
                className="text-lg font-bold text-white mb-3 flex items-center gap-2"
                style={{ fontFamily: "var(--font-fredoka)" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                </svg>
                Packing Essentials
              </h3>
              <ul className="space-y-2 text-xs text-[#f5f5f5]/70">
                {guide.packingEssentials.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/60 mt-0.5 shrink-0">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3
                className="text-lg font-bold text-white mb-3 flex items-center gap-2"
                style={{ fontFamily: "var(--font-fredoka)" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                Permits & Official Formalities
              </h3>
              <ul className="space-y-2 text-xs text-[#f5f5f5]/70">
                {guide.permitsAndPasses.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/60 mt-0.5 shrink-0">
                      <polyline points="9 18 15 12 9 6"/>
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center pt-8 border-t border-[#f5f5f5]/10">
          <Link
            href="/travel/guides"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#f5f5f5]/60 hover:text-white transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="19" y1="12" x2="5" y2="12"/>
              <polyline points="12 19 5 12 12 5"/>
            </svg>
            Back to All Travel Guides & Itineraries
          </Link>
        </div>
      </div>
    </div>
  );
}

