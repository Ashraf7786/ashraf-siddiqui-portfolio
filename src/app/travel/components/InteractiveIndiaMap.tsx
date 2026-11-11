"use client";

import React, { useState, useMemo, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import {
  INDIA_STATES_DATA,
  getStatesSummary,
  IndiaStateData,
} from "../data/indiaStates";
import {
  INDIA_MAP_LOCATIONS,
  INDIA_MAP_VIEWBOX,
  MapLocation,
} from "../data/indiaMapPaths";

gsap.registerPlugin(ScrollTrigger);

export default function InteractiveIndiaMap() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const [statesData, setStatesData] = useState<Record<string, IndiaStateData>>(INDIA_STATES_DATA);

  // Load dynamic state updates from API
  React.useEffect(() => {
    async function loadDynamicStates() {
      try {
        const res = await fetch("/api/travel/states");
        if (res.ok) {
          const d = await res.json();
          if (d.states && Object.keys(d.states).length > 0) {
            setStatesData(d.states);
          }
        }
      } catch {
        // Fallback silently to static data
      }
    }
    loadDynamicStates();
  }, []);

  // Default selection: Rajasthan (the home state)
  const [selectedId, setSelectedId] = useState<string>("rj");
  const [hoveredLocation, setHoveredLocation] = useState<MapLocation | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "visited" | "unvisited" | "uts">("all");
  const [selectedRegion, setSelectedRegion] = useState<string>("all");

  const summary = useMemo(() => {
    const allEntries = Object.values(statesData);
    const statesOnly = allEntries.filter((s) => !s.isUT);
    const utOnly = allEntries.filter((s) => s.isUT);

    const visitedStates = statesOnly.filter((s) => s.visited);
    const remainingStates = statesOnly.filter((s) => !s.visited);
    const visitedUTs = utOnly.filter((s) => s.visited);

    const totalStates = statesOnly.length || 28;
    const visitedCount = visitedStates.length;
    const percentage = Math.round((visitedCount / totalStates) * 100);

    return {
      totalStates,
      visitedCount,
      remainingCount: remainingStates.length,
      percentage,
      visitedStates,
      remainingStates,
      visitedUTsCount: visitedUTs.length,
      totalUTsCount: utOnly.length,
    };
  }, [statesData]);

  // Filtered locations
  const filteredLocationIds = useMemo(() => {
    return new Set(
      INDIA_MAP_LOCATIONS.filter((loc) => {
        const data = statesData[loc.id];
        if (!data) return true;

        // Status Filter
        if (activeFilter === "visited" && (!data.visited || data.isUT)) return false;
        if (activeFilter === "unvisited" && (data.visited || data.isUT)) return false;
        if (activeFilter === "uts" && !data.isUT) return false;

        // Region Filter
        if (selectedRegion !== "all" && data.region !== selectedRegion) return false;

        // Search Query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = data.name.toLowerCase().includes(q);
          const matchCapital = data.capital?.toLowerCase().includes(q);
          const matchCities = data.citiesExplored?.some((c) => c.toLowerCase().includes(q));
          const matchHighlights = data.highlights?.some((h) => h.toLowerCase().includes(q));
          const matchPlaces = data.topPlacesToVisit?.some((p) => p.toLowerCase().includes(q));
          return matchName || matchCapital || matchCities || matchHighlights || matchPlaces;
        }

        return true;
      }).map((l) => l.id)
    );
  }, [statesData, activeFilter, selectedRegion, searchQuery]);

  const selectedData: IndiaStateData | undefined = statesData[selectedId];

  // Animate panel when selection changes
  useIsomorphicLayoutEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0.6, y: 15 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
      );
    }
  }, [selectedId]);

  // Entrance animations
  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".map-header", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });
      gsap.from(".map-container", {
        scale: 0.96,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const rafRef = useRef<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<SVGElement>, loc: MapLocation) => {
    if (!mapContainerRef.current) return;
    const clientX = e.clientX;
    const clientY = e.clientY;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (!mapContainerRef.current) return;
      const containerRect = mapContainerRef.current.getBoundingClientRect();
      const x = clientX - containerRect.left;
      const y = clientY - containerRect.top;
      setTooltipPos({ x, y });
      setHoveredLocation(loc);
    });
  };

  const handleSelectState = (id: string) => {
    setSelectedId(id);
    // Smooth scroll down to card on small mobile viewports
    if (typeof window !== "undefined" && window.innerWidth < 768 && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };

  const hoveredData = hoveredLocation ? INDIA_STATES_DATA[hoveredLocation.id] : null;

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="py-16 sm:py-24 md:py-32 bg-[#080808] border-t border-b border-[#f5f5f5]/5 relative overflow-hidden"
    >
      <div id="interactive-map" className="relative -top-28 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        {/* Header */}
        <div className="map-header mb-8 sm:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/70">
                <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/>
                <line x1="8" y1="2" x2="8" y2="18"/>
                <line x1="16" y1="6" x2="16" y2="22"/>
              </svg>
              <p className="text-[11px] sm:text-xs tracking-[0.25em] uppercase text-[#f5f5f5]/40 font-medium">
                Interactive Travel Map
              </p>
            </div>
            <h2
              className="text-3xl sm:text-5xl md:text-6xl font-bold text-[#f5f5f5] leading-tight"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              My India Journey
            </h2>
            <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-[#f5f5f5]/50 max-w-xl leading-relaxed">
              Every explored state is highlighted with its own individual color. Hover or tap any state
              to preview top places to visit, or inspect detailed field notes.
            </p>
          </div>

          {/* Dynamic Progress Card */}
          <div className="bg-[#111113] border border-[#f5f5f5]/10 rounded-2xl p-4 sm:p-5 w-full md:w-auto md:min-w-[280px] shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] uppercase tracking-wider text-[#f5f5f5]/40 font-medium flex items-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-400">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                Milestone Progress
              </span>
              <span
                className="text-base sm:text-lg font-bold text-[#f5f5f5]"
                style={{ fontFamily: "var(--font-fredoka)" }}
              >
                {summary.visitedCount} / {summary.totalStates} States
              </span>
            </div>
            <div className="h-2 w-full bg-[#f5f5f5]/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-white/40 via-white/80 to-white rounded-full transition-all duration-700"
                style={{ width: `${summary.percentage}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-[#f5f5f5]/40 mt-2">
              <span>{summary.remainingCount} States Unexplored (TN, KA, KL, AP)</span>
              <span className="text-emerald-400 font-semibold">{summary.percentage}% Explored</span>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar - Fully Responsive */}
        <div className="mb-6 sm:mb-8 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 sm:gap-4 bg-[#111113] p-2.5 sm:p-3 rounded-2xl border border-[#f5f5f5]/10">
          {/* Status Tabs with mobile horizontal swipe */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 lg:pb-0 no-scrollbar">
            {[
              { id: "all", label: `All (${INDIA_MAP_LOCATIONS.length})` },
              { id: "visited", label: `Explored (${summary.visitedCount})` },
              { id: "unvisited", label: `Unexplored (${summary.remainingCount})` },
              { id: "uts", label: `Union Territories (${summary.totalUTsCount})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-medium whitespace-nowrap transition-all ${
                  activeFilter === tab.id
                    ? "bg-[#f5f5f5] text-[#080808] font-semibold"
                    : "text-[#f5f5f5]/50 hover:text-[#f5f5f5] hover:bg-[#f5f5f5]/5"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Region Tabs & Search */}
          <div className="flex items-center gap-2">
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="bg-[#080808] text-[11px] sm:text-xs text-[#f5f5f5]/80 px-2.5 sm:px-3 py-2 rounded-xl border border-[#f5f5f5]/10 outline-none cursor-pointer"
            >
              <option value="all">All Regions</option>
              <option value="North">North India</option>
              <option value="South">South India</option>
              <option value="West">West India</option>
              <option value="East">East India</option>
              <option value="Northeast">Northeast India</option>
              <option value="Central">Central India</option>
            </select>

            <div className="relative flex-1 sm:w-60">
              <input
                type="text"
                placeholder="Search state, place, city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#080808] text-[11px] sm:text-xs text-[#f5f5f5] placeholder-[#f5f5f5]/30 pl-8 pr-3 py-2 rounded-xl border border-[#f5f5f5]/10 outline-none focus:border-white/40"
              />
              <svg
                className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#f5f5f5]/40"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Map Layout Grid: Left = Interactive SVG, Right = Inspector Card */}
        <div className="map-container grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* SVG Map Section */}
          <div
            ref={mapContainerRef}
            className="lg:col-span-7 bg-[#111113] rounded-3xl p-3 sm:p-6 border border-[#f5f5f5]/10 relative flex flex-col items-center overflow-hidden"
          >
            {/* Map Legend */}
            <div className="w-full flex items-center justify-between mb-3 sm:mb-4 px-1 sm:px-2 text-[10px] sm:text-[11px] text-[#f5f5f5]/50 flex-wrap gap-2">
              <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-gradient-to-r from-sky-400 via-rose-400 to-emerald-400 border border-white/40" />
                  Explored (Unique Color)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#161619] border border-[#f5f5f5]/20" />
                  Not Explored (Muted)
                </span>
              </div>
              <span className="text-[10px] text-[#f5f5f5]/30 hidden sm:inline">
                Hover or tap state to inspect
              </span>
            </div>

            {/* SVG Canvas - touch friendly */}
            <div className="relative w-full aspect-[612/696] max-w-[560px] mx-auto select-none">
              <svg
                viewBox={INDIA_MAP_VIEWBOX}
                className="w-full h-full drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
                xmlns="http://www.w3.org/2000/svg"
                style={{ touchAction: "manipulation" }}
              >
                <g className="transition-all duration-300">
                  {INDIA_MAP_LOCATIONS.map((loc) => {
                    const data = INDIA_STATES_DATA[loc.id];
                    const isSelected = selectedId === loc.id;
                    const isHovered = hoveredLocation?.id === loc.id;
                    const isMatch = filteredLocationIds.has(loc.id);

                    // If NOT visited (e.g. Tamil Nadu, Karnataka, Kerala, Andhra Pradesh):
                    let fillColor = "#141417";
                    let strokeColor = "rgba(245, 245, 245, 0.12)";
                    let strokeWidth = 0.7;

                    // If EXPLORED: Give each state its own unique individual color!
                    if (data?.visited && data.color) {
                      fillColor = data.color;
                      strokeColor = data.color;
                      strokeWidth = 0.9;
                    }

                    // Hover & Selected states
                    let fillOpacity = data?.visited ? 0.65 : 0.4;
                    if (isSelected) {
                      fillOpacity = data?.visited ? 0.95 : 0.6;
                      strokeColor = "#ffffff";
                      strokeWidth = 2.4;
                    } else if (isHovered) {
                      fillOpacity = data?.visited ? 0.9 : 0.55;
                      strokeColor = "#ffffff";
                      strokeWidth = 1.8;
                    }

                    const overallOpacity = isMatch ? 1 : 0.15;

                    return (
                      <path
                        key={loc.id}
                        id={`state-${loc.id}`}
                        d={loc.path}
                        fill={fillColor}
                        fillOpacity={fillOpacity}
                        stroke={strokeColor}
                        strokeWidth={strokeWidth}
                        opacity={overallOpacity}
                        className="cursor-pointer transition-all duration-200 outline-none"
                        tabIndex={0}
                        role="button"
                        aria-label={`${loc.name} - ${data?.visited ? "Explored" : "Not Explored"}`}
                        onClick={() => handleSelectState(loc.id)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            handleSelectState(loc.id);
                          }
                        }}
                        onMouseEnter={(e) => handleMouseMove(e, loc)}
                        onMouseMove={(e) => handleMouseMove(e, loc)}
                        onMouseLeave={() => setHoveredLocation(null)}
                      />
                    );
                  })}
                </g>
              </svg>

              {/* Rich Floating Tooltip (SVG icons, bounded to container width) */}
              {hoveredLocation && tooltipPos && hoveredData && (
                <div
                  className="pointer-events-none hidden md:block absolute z-40 p-3.5 rounded-xl bg-[#080808]/95 backdrop-blur-md border border-[#f5f5f5]/20 text-xs shadow-2xl w-[260px] transform transition-transform duration-75"
                  style={{
                    left: `${Math.min(Math.max(tooltipPos.x, 135), 415)}px`,
                    top: `${Math.max(tooltipPos.y - 12, 10)}px`,
                    transform: "translate(-50%, -100%)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    {hoveredData.visited && hoveredData.color ? (
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm"
                        style={{ backgroundColor: hoveredData.color }}
                      />
                    ) : (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#f5f5f5]/40 shrink-0">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                      </svg>
                    )}
                    <p
                      className="font-bold text-[#f5f5f5] text-sm leading-tight"
                      style={{ fontFamily: "var(--font-fredoka)" }}
                    >
                      {hoveredLocation.name}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-[10px] text-[#f5f5f5]/50 mb-2.5 pb-2 border-b border-[#f5f5f5]/10">
                    {hoveredData.visited ? (
                      <span
                        className="font-semibold flex items-center gap-1"
                        style={{ color: hoveredData.color || "#4ade80" }}
                      >
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        Explored {hoveredData.visitedYear ? `(${hoveredData.visitedYear})` : ""}
                      </span>
                    ) : (
                      <span className="text-[#f5f5f5]/40 font-medium flex items-center gap-1">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"/>
                          <line x1="12" y1="8" x2="12" y2="12"/>
                          <line x1="12" y1="16" x2="12.01" y2="16"/>
                        </svg>
                        Not Yet Explored
                      </span>
                    )}
                    <span>·</span>
                    <span>{hoveredData.capital}</span>
                  </div>

                  {/* Top Places To Visit List */}
                  {hoveredData.topPlacesToVisit && hoveredData.topPlacesToVisit.length > 0 && (
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-[#f5f5f5]/40 font-medium mb-1.5 flex items-center gap-1">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/70">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                        </svg>
                        Top Places to Visit:
                      </p>
                      <ul className="space-y-1">
                        {hoveredData.topPlacesToVisit.slice(0, 4).map((place, idx) => (
                          <li
                            key={idx}
                            className="text-[11px] text-[#f5f5f5]/85 flex items-start gap-1.5 leading-snug"
                          >
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="mt-0.5 shrink-0" style={{ color: hoveredData.color || "#38bdf8" }}>
                              <polyline points="9 18 15 12 9 6"/>
                            </svg>
                            <span>{place}</span>
                          </li>
                        ))}
                      </ul>
                      {hoveredData.topPlacesToVisit.length > 4 && (
                        <p className="text-[9px] text-[#f5f5f5]/40 mt-1 italic">
                          +{hoveredData.topPlacesToVisit.length - 4} more highlights
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Quick state chips below map */}
            <div className="w-full mt-4 pt-4 border-t border-[#f5f5f5]/5">
              <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[#f5f5f5]/30 mb-2">
                Quick Select State:
              </p>
              <div className="flex flex-wrap gap-1.5 max-h-24 sm:max-h-28 overflow-y-auto no-scrollbar">
                {INDIA_MAP_LOCATIONS.map((loc) => {
                  const data = INDIA_STATES_DATA[loc.id];
                  const isSelected = selectedId === loc.id;
                  return (
                    <button
                      key={loc.id}
                      onClick={() => handleSelectState(loc.id)}
                      className={`px-2 sm:px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] flex items-center gap-1.5 transition-colors ${
                        isSelected
                          ? "bg-[#f5f5f5] text-[#080808] font-bold"
                          : data?.visited
                          ? "bg-[#161619] text-[#f5f5f5]/80 hover:text-white"
                          : "bg-[#161619]/40 text-[#f5f5f5]/30 hover:text-[#f5f5f5]/60"
                      }`}
                    >
                      {data?.visited && data.color && (
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ backgroundColor: data.color }}
                        />
                      )}
                      <span>{loc.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: State Inspector Panel */}
          <div
            ref={cardRef}
            className="lg:col-span-5 bg-[#111113] rounded-3xl p-5 sm:p-7 md:p-8 border border-[#f5f5f5]/10 flex flex-col justify-between h-full min-h-[460px] sm:min-h-[500px]"
          >
            {selectedData ? (
              <div className="space-y-5 sm:space-y-6">
                {/* Header status */}
                <div>
                  <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                    <span className="text-[11px] sm:text-xs uppercase tracking-widest text-[#f5f5f5]/40 font-medium">
                      {selectedData.isUT ? "Union Territory" : "Indian State"} · {selectedData.region} India
                    </span>
                    {selectedData.visited ? (
                      <span
                        className="px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 border"
                        style={{
                          backgroundColor: `${selectedData.color || "#38bdf8"}15`,
                          color: selectedData.color || "#38bdf8",
                          borderColor: `${selectedData.color || "#38bdf8"}40`,
                        }}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full animate-pulse"
                          style={{ backgroundColor: selectedData.color || "#38bdf8" }}
                        />
                        Explored {selectedData.visitedYear ? `(${selectedData.visitedYear})` : ""}
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#f5f5f5]/5 text-[#f5f5f5]/40 border border-[#f5f5f5]/10 flex items-center gap-1.5">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"/>
                          <polyline points="12 6 12 12 16 14"/>
                        </svg>
                        Not Yet Explored
                      </span>
                    )}
                  </div>

                  <h3
                    className="text-2xl sm:text-4xl font-bold text-[#f5f5f5] tracking-tight"
                    style={{ fontFamily: "var(--font-fredoka)" }}
                  >
                    {selectedData.name}
                  </h3>
                  <p className="text-xs text-[#f5f5f5]/40 mt-1">
                    Capital: <span className="text-[#f5f5f5]/70 font-medium">{selectedData.capital}</span>
                  </p>
                </div>

                {/* Cover Image if available */}
                {selectedData.coverImage && (
                  <div className="relative h-36 sm:h-44 rounded-2xl overflow-hidden border border-[#f5f5f5]/10">
                    <Image
                      src={selectedData.coverImage}
                      alt={selectedData.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111113] via-transparent to-transparent" />
                  </div>
                )}

                {/* Top Places to Visit */}
                {selectedData.topPlacesToVisit && selectedData.topPlacesToVisit.length > 0 && (
                  <div>
                    <p className="text-[11px] sm:text-xs tracking-wider uppercase text-[#f5f5f5]/40 mb-2 font-medium flex items-center gap-1.5">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/70">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                      </svg>
                      Top Places to Visit
                    </p>
                    <ul className="space-y-1.5 text-xs text-[#f5f5f5]/80">
                      {selectedData.topPlacesToVisit.map((place, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="mt-0.5 shrink-0" style={{ color: selectedData.color || "#f59e0b" }}>
                            <polyline points="9 18 15 12 9 6"/>
                          </svg>
                          <span>{place}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Explored Cities / Towns with SVG Pin */}
                {selectedData.citiesExplored && selectedData.citiesExplored.length > 0 && (
                  <div>
                    <p className="text-[11px] sm:text-xs tracking-wider uppercase text-[#f5f5f5]/40 mb-2 font-medium flex items-center gap-1.5">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-400">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                      Cities & Routes Explored
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedData.citiesExplored.map((city) => (
                        <span
                          key={city}
                          className="px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs bg-[#f5f5f5]/5 text-[#f5f5f5]/80 border border-[#f5f5f5]/10 flex items-center gap-1"
                        >
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-400">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                            <circle cx="12" cy="10" r="3"/>
                          </svg>
                          <span>{city}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Personal Notes / Story */}
                {selectedData.notes && (
                  <div className="p-3.5 sm:p-4 rounded-2xl bg-[#080808]/70 border border-[#f5f5f5]/5">
                    <p className="text-[10px] uppercase tracking-wider text-[#f5f5f5]/40 mb-1 flex items-center gap-1.5">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/70">
                        <path d="M12 20h9"/>
                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                      </svg>
                      Journal Excerpt
                    </p>
                    <p className="text-xs text-[#f5f5f5]/70 leading-relaxed italic">
                      &ldquo;{selectedData.notes}&rdquo;
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-20 text-[#f5f5f5]/40 text-sm">
                Select a state on the map to see journey details.
              </div>
            )}

            {/* Bottom Actions */}
            <div className="pt-5 sm:pt-6 mt-5 sm:mt-6 border-t border-[#f5f5f5]/10 flex items-center justify-between gap-3">
              <a
                href="#stories"
                className="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors"
                style={{ color: selectedData?.color || "#f59e0b" }}
              >
                <span>Stories from {selectedData?.name || "India"}</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </a>
              <button
                onClick={() => {
                  const keys = Object.keys(INDIA_STATES_DATA);
                  const currentIndex = keys.indexOf(selectedId);
                  const nextKey = keys[(currentIndex + 1) % keys.length];
                  setSelectedId(nextKey);
                }}
                className="text-xs px-3 py-1.5 rounded-xl border border-[#f5f5f5]/10 hover:border-[#f5f5f5]/30 text-[#f5f5f5]/60 hover:text-[#f5f5f5] transition-all flex items-center gap-1"
              >
                <span>Next</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
