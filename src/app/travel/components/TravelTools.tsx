"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  ALTITUDE_DATABASE,
  PACKING_PRESETS,
  ESTIMATOR_RATES,
  AltitudeDestination,
  TerrainPackingPreset,
} from "../data/tools";

export default function TravelTools() {
  const [activeTab, setActiveTab] = useState<"altitude" | "packing" | "budget">("altitude");

  // Altitude Tool State
  const [selectedAltitudeId, setSelectedAltitudeId] = useState<string>("khardung-la");
  const selectedAltitude = useMemo<AltitudeDestination>(() => {
    return (
      ALTITUDE_DATABASE.find((a) => a.id === selectedAltitudeId) || ALTITUDE_DATABASE[0]
    );
  }, [selectedAltitudeId]);

  // Packing Checklist Tool State
  const [selectedPresetId, setSelectedPresetId] = useState<string>("himalayan-winter");
  const activePreset = useMemo<TerrainPackingPreset>(() => {
    return (
      PACKING_PRESETS.find((p) => p.id === selectedPresetId) || PACKING_PRESETS[0]
    );
  }, [selectedPresetId]);

  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>("All");

  const toggleItem = (itemId: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const checkAll = () => {
    const allChecked: Record<string, boolean> = {};
    activePreset.items.forEach((item) => {
      allChecked[item.id] = true;
    });
    setCheckedItems(allChecked);
  };

  const resetAll = () => {
    setCheckedItems({});
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const packedCount = useMemo(() => {
    return activePreset.items.filter((item) => checkedItems[item.id]).length;
  }, [activePreset, checkedItems]);

  const packingPercentage = useMemo(() => {
    return Math.round((packedCount / activePreset.items.length) * 100);
  }, [packedCount, activePreset]);

  const filteredPackingItems = useMemo(() => {
    if (activeCategoryFilter === "All") return activePreset.items;
    return activePreset.items.filter((item) => item.category === activeCategoryFilter);
  }, [activePreset, activeCategoryFilter]);

  // Budget Estimator Tool State
  const [durationDays, setDurationDays] = useState<number>(7);
  const [travelersCount, setTravelersCount] = useState<number>(1);
  const [selectedTransport, setSelectedTransport] = useState<string>(
    "Shared 4x4 Mountain Sumo / Maxx"
  );
  const [selectedStay, setSelectedStay] = useState<string>(
    "Local Village Homestay (With Dinner)"
  );
  const [selectedFood, setSelectedFood] = useState<string>(
    "Local Dhaba, Chai Stalls & Street Food"
  );
  const [copiedBudget, setCopiedBudget] = useState(false);

  const budgetBreakdown = useMemo(() => {
    const transportPerDay = ESTIMATOR_RATES.transportDaily[selectedTransport] || 1000;
    const stayPerDay = ESTIMATOR_RATES.stayDaily[selectedStay] || 800;
    const foodPerDay = ESTIMATOR_RATES.foodDaily[selectedFood] || 400;
    const miscPerDay = ESTIMATOR_RATES.activityMiscDaily;

    const totalTransport = transportPerDay * durationDays;
    const totalStay = stayPerDay * durationDays * travelersCount;
    const totalFood = foodPerDay * durationDays * travelersCount;
    const totalMisc = miscPerDay * durationDays * travelersCount;

    const subtotal = totalTransport + totalStay + totalFood + totalMisc;
    const emergencyBuffer = Math.round(subtotal * 0.15);
    const grandTotal = subtotal + emergencyBuffer;
    const perPerson = Math.round(grandTotal / travelersCount);
    const dailyAverage = Math.round(perPerson / durationDays);

    return {
      totalTransport,
      totalStay,
      totalFood,
      totalMisc,
      subtotal,
      emergencyBuffer,
      grandTotal,
      perPerson,
      dailyAverage,
    };
  }, [durationDays, travelersCount, selectedTransport, selectedStay, selectedFood]);

  const handleCopyBudget = () => {
    const text = `Ashraf Siddiqui Travel Cost Estimate:
Route Duration: ${durationDays} Days for ${travelersCount} Traveller(s)
Transport: ${selectedTransport} (₹${budgetBreakdown.totalTransport.toLocaleString()})
Accommodation: ${selectedStay} (₹${budgetBreakdown.totalStay.toLocaleString()})
Food & Chai: ${selectedFood} (₹${budgetBreakdown.totalFood.toLocaleString()})
Passes & Misc: ₹${budgetBreakdown.totalMisc.toLocaleString()}
Emergency Buffer (15%): ₹${budgetBreakdown.emergencyBuffer.toLocaleString()}
Total Estimated Budget: ₹${budgetBreakdown.grandTotal.toLocaleString()} (₹${budgetBreakdown.perPerson.toLocaleString()} per person · ₹${budgetBreakdown.dailyAverage.toLocaleString()}/day)
Calculated via iamashraf.in/travel`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedBudget(true);
      setTimeout(() => setCopiedBudget(false), 2000);
    }
  };

  return (
    <section
      id="tools"
      className="py-16 sm:py-24 md:py-32 bg-[#080808] border-b border-[#f5f5f5]/5 relative overflow-hidden"
    >
      {/* Background Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.02] whitespace-nowrap text-[12vw] font-black uppercase text-white tracking-widest z-0">
        FIELD UTILITIES
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 relative z-10">
        {/* Section Header */}
        <div className="mb-10 sm:mb-14 max-w-3xl">
          <div className="flex items-center gap-2 mb-3">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-[#f5f5f5]/50"
            >
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
            </svg>
            <p className="text-[11px] sm:text-xs tracking-[0.25em] uppercase text-[#f5f5f5]/40 font-medium">
              Interactive Travel Utilities · Phase 7
            </p>
          </div>
          <h2
            className="text-3xl sm:text-5xl md:text-6xl font-bold text-[#f5f5f5] leading-tight"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            Field Tools for Travellers
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-[#f5f5f5]/50 leading-relaxed">
            Essential interactive calculators born from 24 states on the road. Check high-altitude
            AMS risk, generate customized packing checklists, and calculate honest budgets.
          </p>
        </div>

        {/* Tool Navigation Switcher Pills */}
        <div className="flex items-center gap-2 sm:gap-3 mb-10 overflow-x-auto pb-2 no-scrollbar border-b border-[#f5f5f5]/10">
          <button
            onClick={() => setActiveTab("altitude")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === "altitude"
                ? "bg-[#f5f5f5] text-[#080808] shadow-lg font-bold"
                : "bg-[#111113] text-[#f5f5f5]/50 hover:text-white border border-[#f5f5f5]/10"
            }`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M8 3l4 8 5-5 5 15H2L8 3z"/>
            </svg>
            <span>Altitude & AMS Advisory</span>
          </button>

          <button
            onClick={() => setActiveTab("packing")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === "packing"
                ? "bg-[#f5f5f5] text-[#080808] shadow-lg font-bold"
                : "bg-[#111113] text-[#f5f5f5]/50 hover:text-white border border-[#f5f5f5]/10"
            }`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
              <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
              <path d="M9 14l2 2 4-4"/>
            </svg>
            <span>Packing Checklist Generator</span>
          </button>

          <button
            onClick={() => setActiveTab("budget")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === "budget"
                ? "bg-[#f5f5f5] text-[#080808] shadow-lg font-bold"
                : "bg-[#111113] text-[#f5f5f5]/50 hover:text-white border border-[#f5f5f5]/10"
            }`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <line x1="2" y1="10" x2="22" y2="10"/>
            </svg>
            <span>Route Cost & Budget Estimator</span>
          </button>
        </div>

        {/* ─── TAB 1: ALTITUDE & AMS ADVISORY TOOL ────────────────────────── */}
        {activeTab === "altitude" && (
          <div className="space-y-8">
            {/* Destination Selection Bar */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#111113] border border-[#f5f5f5]/10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-[#f5f5f5]/40 font-medium mb-1">
                    Select High-Altitude Destination / Mountain Pass:
                  </p>
                  <p className="text-xs text-[#f5f5f5]/70">
                    Real-time atmospheric pressure calculations and emergency ascent protocols
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={selectedAltitudeId}
                    onChange={(e) => setSelectedAltitudeId(e.target.value)}
                    className="bg-[#080808] text-xs sm:text-sm text-[#f5f5f5] font-semibold px-4 py-2.5 rounded-xl border border-[#f5f5f5]/20 outline-none focus:border-white cursor-pointer"
                  >
                    {ALTITUDE_DATABASE.map((dest) => (
                      <option key={dest.id} value={dest.id} className="bg-[#111113] text-white">
                        {dest.name} ({dest.altitudeFt.toLocaleString()} ft) · {dest.region}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Main Altitude Display Dashboard */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
              {/* Left Column: Key Gauges */}
              <div className="lg:col-span-5 space-y-6">
                {/* Hero Stat Box */}
                <div className="p-6 sm:p-8 rounded-3xl bg-[#111113] border border-[#f5f5f5]/10 shadow-xl relative overflow-hidden">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-[#f5f5f5]/40 font-semibold block mb-1">
                        {selectedAltitude.region} · {selectedAltitude.state}
                      </span>
                      <h3
                        className="text-2xl sm:text-3xl font-bold text-[#f5f5f5]"
                        style={{ fontFamily: "var(--font-fredoka)" }}
                      >
                        {selectedAltitude.name}
                      </h3>
                    </div>

                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${
                        selectedAltitude.riskLevel === "Extreme"
                          ? "bg-rose-500/10 border-rose-500/30 text-rose-400"
                          : selectedAltitude.riskLevel === "High"
                          ? "bg-orange-500/10 border-orange-500/30 text-orange-400"
                          : "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                      }`}
                    >
                      {selectedAltitude.riskLevel} Risk
                    </span>
                  </div>

                  {/* Big Altitude Numbers */}
                  <div className="my-6 pb-6 border-b border-white/10 flex items-baseline gap-3">
                    <span
                      className="text-4xl sm:text-6xl font-bold text-white tracking-tight"
                      style={{ fontFamily: "var(--font-fredoka)" }}
                    >
                      {selectedAltitude.altitudeFt.toLocaleString()}
                    </span>
                    <span className="text-sm sm:text-base text-[#f5f5f5]/50 font-medium">
                      feet ({selectedAltitude.altitudeM.toLocaleString()} m)
                    </span>
                  </div>

                  {/* Effective Oxygen vs Sea Level Bar */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#f5f5f5]/60 font-medium flex items-center gap-1.5">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                        </svg>
                        Available Oxygen vs Sea Level:
                      </span>
                      <span className="font-bold text-white text-sm" style={{ fontFamily: "var(--font-fredoka)" }}>
                        {selectedAltitude.effectiveOxygenPct}%
                      </span>
                    </div>

                    <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden p-0.5">
                      <div
                        className="h-full rounded-full transition-all duration-700 bg-gradient-to-r from-rose-500 via-sky-400 to-emerald-400"
                        style={{ width: `${selectedAltitude.effectiveOxygenPct}%` }}
                      />
                    </div>

                    <p className="text-[10px] text-[#f5f5f5]/40 leading-normal pt-1">
                      At this elevation, each breath draws only {selectedAltitude.effectiveOxygenPct}% of
                      the oxygen molecules compared to sea level.
                    </p>
                  </div>

                  {/* Night Stay Recommendation */}
                  <div className="mt-6 pt-5 border-t border-white/5 flex items-center justify-between text-xs">
                    <span className="text-[#f5f5f5]/50">Night Sleep Recommended:</span>
                    <span
                      className={`font-semibold px-2.5 py-0.5 rounded-full text-[11px] ${
                        selectedAltitude.nightHaltRecommended
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                      }`}
                    >
                      {selectedAltitude.nightHaltRecommended ? "Yes (With Warm Layers)" : "No (Day Visit Only)"}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="text-[#f5f5f5]/50">Min. Prior Acclimatization:</span>
                    <span className="font-bold text-white">
                      {selectedAltitude.minAcclimatizationHours} Hours
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Protocols, Red Flags & Evacuation */}
              <div className="lg:col-span-7 space-y-6">
                {/* Red Flags Watchlist */}
                <div className="p-6 rounded-3xl bg-[#111113] border border-[#f5f5f5]/10">
                  <h4
                    className="text-base sm:text-lg font-bold text-white mb-3 flex items-center gap-2"
                    style={{ fontFamily: "var(--font-fredoka)" }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-rose-400">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="12" y1="8" x2="12" y2="12"/>
                      <line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                    <span>Symptoms to Monitor (Acute Mountain Sickness):</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedAltitude.symptomsToWatch.map((symptom, sIdx) => (
                      <div
                        key={sIdx}
                        className="p-3 rounded-xl bg-[#080808]/70 border border-white/5 flex items-start gap-2.5 text-xs text-[#f5f5f5]/85"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-rose-400 mt-0.5 shrink-0">
                          <polyline points="9 18 15 12 9 6"/>
                        </svg>
                        <span>{symptom}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ashraf's Field Advice */}
                <div className="p-6 rounded-3xl bg-[#111113] border border-[#f5f5f5]/10 space-y-3">
                  <div className="flex items-center gap-2">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-sky-400">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                    <h4
                      className="text-sm sm:text-base font-bold text-white uppercase tracking-wider"
                      style={{ fontFamily: "var(--font-fredoka)" }}
                    >
                      Ashraf&apos;s Field Rule for this Elevation
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-[#f5f5f5]/80 leading-relaxed italic bg-[#080808]/60 p-4 rounded-2xl border border-white/5">
                    &ldquo;{selectedAltitude.keyAdvice}&rdquo;
                  </p>
                </div>

                {/* Emergency Protocol */}
                <div className="p-5 rounded-2xl bg-rose-500/5 border border-rose-500/20 text-xs flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-rose-300 uppercase tracking-wider text-[11px]">
                      Emergency Descent Protocol
                    </p>
                    <p className="text-rose-200/80 leading-relaxed mt-0.5">
                      {selectedAltitude.emergencyProtocol}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─── TAB 2: PACKING CHECKLIST GENERATOR ─────────────────────────── */}
        {activeTab === "packing" && (
          <div className="space-y-8">
            {/* Terrain Selector Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {PACKING_PRESETS.map((preset) => {
                const isSelected = preset.id === selectedPresetId;
                return (
                  <button
                    key={preset.id}
                    onClick={() => {
                      setSelectedPresetId(preset.id);
                      setCheckedItems({});
                    }}
                    className={`p-5 rounded-3xl text-left transition-all ${
                      isSelected
                        ? "bg-[#f5f5f5] text-[#080808] shadow-xl scale-[1.02]"
                        : "bg-[#111113] text-[#f5f5f5] border border-[#f5f5f5]/10 hover:border-white/30"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                          isSelected ? "bg-black/10 text-black" : "bg-white/10 text-white/70"
                        }`}
                      >
                        {preset.tempRange}
                      </span>
                      <span className={`text-xs ${isSelected ? "text-black/60" : "text-[#f5f5f5]/40"}`}>
                        {preset.items.length} items
                      </span>
                    </div>

                    <h4
                      className="text-base sm:text-lg font-bold leading-snug mb-1"
                      style={{ fontFamily: "var(--font-fredoka)" }}
                    >
                      {preset.name}
                    </h4>
                    <p className={`text-xs line-clamp-1 ${isSelected ? "text-black/70" : "text-[#f5f5f5]/50"}`}>
                      {preset.subtitle}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Checklist Action Bar */}
            <div className="p-5 rounded-3xl bg-[#111113] border border-[#f5f5f5]/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="w-full md:w-auto">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-fredoka)" }}>
                    Packing Progress:
                  </span>
                  <span className="text-xs text-[#f5f5f5]/70 font-semibold">
                    {packedCount} of {activePreset.items.length} items packed ({packingPercentage}%)
                  </span>
                </div>
                {/* Progress Bar */}
                <div className="w-full sm:w-72 h-2.5 bg-white/10 rounded-full overflow-hidden mt-2">
                  <div
                    className="h-full bg-white rounded-full transition-all duration-300"
                    style={{ width: `${packingPercentage}%` }}
                  />
                </div>
              </div>

              {/* Utility Buttons */}
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={checkAll}
                  className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/10 text-white hover:bg-white/20 transition-colors"
                >
                  Check All
                </button>
                <button
                  onClick={resetAll}
                  className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/5 text-[#f5f5f5]/60 hover:text-white transition-colors"
                >
                  Reset
                </button>
                <button
                  onClick={handlePrint}
                  className="px-4 py-1.5 rounded-full text-xs font-bold bg-[#f5f5f5] text-[#080808] hover:bg-white transition-all shadow-md flex items-center gap-1.5"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 6 2 18 2 18 9"/>
                    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
                    <rect x="6" y="14" width="12" height="8"/>
                  </svg>
                  <span>Print / Save PDF</span>
                </button>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
              {["All", "Layering & Clothing", "Footwear & Protection", "Electronics & Power", "Medical & High-Altitude", "Permits, Docs & Cash"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategoryFilter(cat)}
                  className={`px-3 py-1 rounded-lg transition-colors whitespace-nowrap ${
                    activeCategoryFilter === cat
                      ? "bg-white text-black font-semibold"
                      : "bg-[#111113] text-[#f5f5f5]/50 hover:text-white border border-[#f5f5f5]/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Checkable Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {filteredPackingItems.map((item) => {
                const isChecked = Boolean(checkedItems[item.id]);
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 select-none ${
                      isChecked
                        ? "bg-[#161619] border-white/20 opacity-70"
                        : "bg-[#111113] border-[#f5f5f5]/10 hover:border-white/30"
                    }`}
                  >
                    {/* Custom SVG Checkbox */}
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        isChecked
                          ? "bg-white text-black"
                          : "border border-white/30 bg-black/40"
                      }`}
                    >
                      {isChecked && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p
                          className={`text-xs sm:text-sm font-semibold truncate ${
                            isChecked ? "line-through text-[#f5f5f5]/50" : "text-white"
                          }`}
                        >
                          {item.name}
                        </p>
                        {item.essential && (
                          <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-white/10 text-white shrink-0">
                            Essential
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#f5f5f5]/50 leading-relaxed mt-0.5">
                        {item.note}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ─── TAB 3: ROUTE COST & BUDGET ESTIMATOR ───────────────────────── */}
        {activeTab === "budget" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Input Controls Form */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-[#111113] border border-[#f5f5f5]/10 space-y-6">
              <div>
                <h3
                  className="text-xl sm:text-2xl font-bold text-white mb-1"
                  style={{ fontFamily: "var(--font-fredoka)" }}
                >
                  Transparent India Route Calculator
                </h3>
                <p className="text-xs text-[#f5f5f5]/50 leading-relaxed">
                  Calculates real ground costs for independent solo travelers and road trippers.
                </p>
              </div>

              {/* Sliders: Days & Travellers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pb-6 border-b border-white/10">
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-[#f5f5f5]/60 font-medium">Trip Duration:</span>
                    <span className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-fredoka)" }}>
                      {durationDays} Days
                    </span>
                  </div>
                  <input
                    type="range"
                    min={3}
                    max={21}
                    value={durationDays}
                    onChange={(e) => setDurationDays(Number(e.target.value))}
                    className="w-full accent-white cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-[#f5f5f5]/30 mt-1">
                    <span>3 days</span>
                    <span>10 days</span>
                    <span>21 days</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-[#f5f5f5]/60 font-medium">Traveller Count:</span>
                    <span className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-fredoka)" }}>
                      {travelersCount} Person{travelersCount > 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {[1, 2, 4, 6].map((num) => (
                      <button
                        key={num}
                        onClick={() => setTravelersCount(num)}
                        className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                          travelersCount === num
                            ? "bg-[#f5f5f5] text-[#080808]"
                            : "bg-[#080808] text-[#f5f5f5]/60 border border-white/10 hover:text-white"
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Selectors: Transport, Stay, Food */}
              <div className="space-y-4">
                {/* Transport Mode */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#f5f5f5]/50 mb-1.5 font-medium">
                    1. Transportation Mode:
                  </label>
                  <select
                    value={selectedTransport}
                    onChange={(e) => setSelectedTransport(e.target.value)}
                    className="w-full bg-[#080808] text-xs text-[#f5f5f5] p-3 rounded-xl border border-white/15 outline-none focus:border-white"
                  >
                    {Object.keys(ESTIMATOR_RATES.transportDaily).map((mode) => (
                      <option key={mode} value={mode} className="bg-[#111113] text-white">
                        {mode} (~₹{ESTIMATOR_RATES.transportDaily[mode]}/day)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Stay Style */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#f5f5f5]/50 mb-1.5 font-medium">
                    2. Stay Style:
                  </label>
                  <select
                    value={selectedStay}
                    onChange={(e) => setSelectedStay(e.target.value)}
                    className="w-full bg-[#080808] text-xs text-[#f5f5f5] p-3 rounded-xl border border-white/15 outline-none focus:border-white"
                  >
                    {Object.keys(ESTIMATOR_RATES.stayDaily).map((stay) => (
                      <option key={stay} value={stay} className="bg-[#111113] text-white">
                        {stay} (~₹{ESTIMATOR_RATES.stayDaily[stay]}/night)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Food Style */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#f5f5f5]/50 mb-1.5 font-medium">
                    3. Daily Food & Chai Preference:
                  </label>
                  <select
                    value={selectedFood}
                    onChange={(e) => setSelectedFood(e.target.value)}
                    className="w-full bg-[#080808] text-xs text-[#f5f5f5] p-3 rounded-xl border border-white/15 outline-none focus:border-white"
                  >
                    {Object.keys(ESTIMATOR_RATES.foodDaily).map((food) => (
                      <option key={food} value={food} className="bg-[#111113] text-white">
                        {food} (~₹{ESTIMATOR_RATES.foodDaily[food]}/day)
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Live Calculation Output Card */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-[#111113] border border-[#f5f5f5]/10 shadow-2xl relative">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <span className="text-[10px] uppercase tracking-widest text-[#f5f5f5]/40 font-semibold">
                  Estimated Total Budget
                </span>
                <span className="text-[10px] uppercase font-bold text-white bg-white/10 px-2 py-0.5 rounded">
                  Non-Commercial
                </span>
              </div>

              {/* Big Grand Total */}
              <div className="my-6">
                <span className="text-xs text-[#f5f5f5]/50 block mb-1">
                  Total for {travelersCount} traveller{travelersCount > 1 ? "s" : ""} over {durationDays} days:
                </span>
                <div className="flex items-baseline gap-2">
                  <span
                    className="text-4xl sm:text-5xl font-bold text-white"
                    style={{ fontFamily: "var(--font-fredoka)" }}
                  >
                    ₹{budgetBreakdown.grandTotal.toLocaleString()}
                  </span>
                  <span className="text-xs text-[#f5f5f5]/50">INR</span>
                </div>
                <div className="mt-2 text-xs text-[#f5f5f5]/70 flex items-center gap-3">
                  <span>
                    <strong>₹{budgetBreakdown.perPerson.toLocaleString()}</strong> / person
                  </span>
                  <span>·</span>
                  <span>
                    <strong>₹{budgetBreakdown.dailyAverage.toLocaleString()}</strong> / day
                  </span>
                </div>
              </div>

              {/* Itemized Line Items */}
              <div className="space-y-3 py-5 border-t border-b border-white/10 text-xs">
                <div className="flex justify-between text-[#f5f5f5]/70">
                  <span>Transportation ({selectedTransport.split("(")[0].trim()}):</span>
                  <span className="font-semibold text-white">₹{budgetBreakdown.totalTransport.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#f5f5f5]/70">
                  <span>Accommodation ({durationDays} nights):</span>
                  <span className="font-semibold text-white">₹{budgetBreakdown.totalStay.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#f5f5f5]/70">
                  <span>Food, Chai & Snacks:</span>
                  <span className="font-semibold text-white">₹{budgetBreakdown.totalFood.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#f5f5f5]/70">
                  <span>Monument Passes & Local Entry:</span>
                  <span className="font-semibold text-white">₹{budgetBreakdown.totalMisc.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#f5f5f5]/50 pt-2 border-t border-white/5">
                  <span>Emergency Road Buffer (15%):</span>
                  <span className="font-semibold text-white/80">+₹{budgetBreakdown.emergencyBuffer.toLocaleString()}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleCopyBudget}
                  className="flex-1 py-3 rounded-full text-xs font-bold bg-[#f5f5f5] text-[#080808] hover:bg-white transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                  </svg>
                  <span>{copiedBudget ? "Copied to Clipboard!" : "Copy Cost Estimate"}</span>
                </button>

                <Link
                  href="/travel/trips"
                  className="py-3 px-4 rounded-full text-xs font-semibold border border-[#f5f5f5]/20 text-[#f5f5f5] hover:border-white transition-colors text-center"
                >
                  Compare Group Trips
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

