"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface DonezoOverviewProps {
  slidesCount: number;
  photosCount: number;
  reelsCount: number;
  tripsCount: number;
  storiesCount: number;
  enquiries: Array<{
    id: string;
    createdAt: string;
    fullName: string;
    email: string;
    whatsapp: string;
    tripTitle: string;
    travelersCount: number;
    status: string;
  }>;
  trips: Array<{
    id: string;
    title: string;
    destination: string;
    departureDate: string;
    status: string;
    isUpcoming?: boolean;
    availableSeats?: number;
    totalSeats?: number;
  }>;
  onNavigateTab: (tab: any) => void;
  onAddNewTrip?: () => void;
}

export default function DonezoDashboardOverview({
  slidesCount,
  photosCount,
  reelsCount,
  tripsCount,
  storiesCount,
  enquiries,
  trips,
  onNavigateTab,
  onAddNewTrip,
}: DonezoOverviewProps) {
  // Live ticking timer for the Time Tracker widget
  const [seconds, setSeconds] = useState(5048); // 01:24:08
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTimer = (totalSecs: number) => {
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const activeToursCount = trips.filter((t) => !t.isUpcoming).length || 2;
  const upcomingToursCount = trips.filter((t) => t.isUpcoming).length || 2;
  const newLeadsCount = enquiries.filter((e) => e.status === "New").length || 2;

  // Next upcoming departure
  const nextDeparture = trips[0] || {
    title: "Kashmir Winter Powder Trails",
    departureDate: "14 Feb - 21 Feb 2026",
    destination: "Kashmir, India",
  };

  return (
    <div className="space-y-6">
      {/* ─── Top Header: Title + Subtitle + Actions ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1
            className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900"
            style={{ fontFamily: "var(--font-fredoka), sans-serif" }}
          >
            Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Plan, prioritize, and manage your travel expeditions &amp; content with ease.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (onAddNewTrip) onAddNewTrip();
              else onNavigateTab("trips");
            }}
            className="px-5 py-2.5 rounded-full bg-[#155e38] hover:bg-[#124e2d] text-white text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-sm transition-all hover:scale-[1.02] cursor-pointer"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <span>+ Add Expedition</span>
          </button>

          <Link
            href="/travel"
            target="_blank"
            className="px-5 py-2.5 rounded-full bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-sm transition-all hover:scale-[1.02] cursor-pointer"
          >
            <span>View Live Site</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </Link>
        </div>
      </div>

      {/* ─── Row 1: 4 Metric Cards (Donezo Style) ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Card 1: Total Expeditions (Deep Forest Green Accent) */}
        <div
          onClick={() => onNavigateTab("trips")}
          className="rounded-2xl p-5 bg-[#155e38] text-white shadow-sm flex flex-col justify-between relative overflow-hidden group cursor-pointer hover:shadow-md transition-all"
        >
          {/* Subtle Organic Background Glow */}
          <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-emerald-100">Total Expeditions</span>
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-[#155e38] transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </div>
          </div>

          <div className="my-4">
            <div className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              {tripsCount || 4}
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-emerald-200">
            <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px]">
              &uarr;
            </span>
            <span>+{upcomingToursCount} in reconnaissance</span>
          </div>
        </div>

        {/* Card 2: Ended / Completed Projects */}
        <div
          onClick={() => onNavigateTab("trips")}
          className="rounded-2xl p-5 bg-white border border-gray-200/80 text-gray-900 shadow-sm flex flex-col justify-between group cursor-pointer hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500">Ended Expeditions</span>
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 group-hover:bg-gray-900 group-hover:text-white transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </div>
          </div>

          <div className="my-4">
            <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
              10
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
            <span className="w-4 h-4 rounded-full bg-gray-100 flex items-center justify-center text-[10px]">
              &bull;
            </span>
            <span>Increased from last season</span>
          </div>
        </div>

        {/* Card 3: Running Projects / Live Confirmed Tours */}
        <div
          onClick={() => onNavigateTab("trips")}
          className="rounded-2xl p-5 bg-white border border-gray-200/80 text-gray-900 shadow-sm flex flex-col justify-between group cursor-pointer hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500">Running Expeditions</span>
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 group-hover:bg-gray-900 group-hover:text-white transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </div>
          </div>

          <div className="my-4">
            <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
              {activeToursCount}
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
            <span className="w-4 h-4 rounded-full bg-gray-100 flex items-center justify-center text-[10px]">
              &bull;
            </span>
            <span>Verified departures open</span>
          </div>
        </div>

        {/* Card 4: Pending Project / Active Enquiries */}
        <div
          onClick={() => onNavigateTab("enquiries")}
          className="rounded-2xl p-5 bg-white border border-gray-200/80 text-gray-900 shadow-sm flex flex-col justify-between group cursor-pointer hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500">Pending Enquiries</span>
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 group-hover:bg-[#155e38] group-hover:text-white transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </div>
          </div>

          <div className="my-4">
            <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
              {newLeadsCount}
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Awaiting confirmation</span>
          </div>
        </div>
      </div>

      {/* ─── Row 2: Middle Section (Analytics + Upcoming + Expeditions List) ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Project Analytics: Visual Bar Chart (Span 5) */}
        <div className="lg:col-span-5 rounded-2xl p-5 bg-white border border-gray-200/80 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-gray-900">Project Analytics</h2>
            <span className="text-[11px] text-gray-400 font-medium">Weekly Inquiries</span>
          </div>

          {/* Donezo-style Styled Bars Container */}
          <div className="h-44 flex items-end justify-between px-2 pt-6 pb-2">
            {/* Sunday: Hatched */}
            <div className="flex flex-col items-center gap-2">
              <div
                className="w-8 sm:w-10 rounded-full h-24 border border-gray-200"
                style={{
                  background:
                    "repeating-linear-gradient(45deg, #e5e7eb, #e5e7eb 4px, #f9fafb 4px, #f9fafb 8px)",
                }}
              />
              <span className="text-[11px] text-gray-400 font-medium">S</span>
            </div>

            {/* Monday: Hatched */}
            <div className="flex flex-col items-center gap-2">
              <div
                className="w-8 sm:w-10 rounded-full h-28 border border-gray-200"
                style={{
                  background:
                    "repeating-linear-gradient(45deg, #e5e7eb, #e5e7eb 4px, #f9fafb 4px, #f9fafb 8px)",
                }}
              />
              <span className="text-[11px] text-gray-400 font-medium">M</span>
            </div>

            {/* Tuesday: Solid Emerald with 74% Pill */}
            <div className="flex flex-col items-center gap-2 relative">
              <span className="absolute -top-6 px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[9px] font-bold">
                74%
              </span>
              <div className="w-8 sm:w-10 rounded-full h-32 bg-emerald-400 shadow-sm" />
              <span className="text-[11px] text-gray-900 font-bold">T</span>
            </div>

            {/* Wednesday: Solid Dark Forest Green */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 sm:w-10 rounded-full h-36 bg-[#155e38] shadow-sm" />
              <span className="text-[11px] text-gray-900 font-bold">W</span>
            </div>

            {/* Thursday: Hatched */}
            <div className="flex flex-col items-center gap-2">
              <div
                className="w-8 sm:w-10 rounded-full h-28 border border-gray-200"
                style={{
                  background:
                    "repeating-linear-gradient(45deg, #e5e7eb, #e5e7eb 4px, #f9fafb 4px, #f9fafb 8px)",
                }}
              />
              <span className="text-[11px] text-gray-400 font-medium">T</span>
            </div>

            {/* Friday: Hatched */}
            <div className="flex flex-col items-center gap-2">
              <div
                className="w-8 sm:w-10 rounded-full h-32 border border-gray-200"
                style={{
                  background:
                    "repeating-linear-gradient(45deg, #e5e7eb, #e5e7eb 4px, #f9fafb 4px, #f9fafb 8px)",
                }}
              />
              <span className="text-[11px] text-gray-400 font-medium">F</span>
            </div>

            {/* Saturday: Hatched */}
            <div className="flex flex-col items-center gap-2">
              <div
                className="w-8 sm:w-10 rounded-full h-24 border border-gray-200"
                style={{
                  background:
                    "repeating-linear-gradient(45deg, #e5e7eb, #e5e7eb 4px, #f9fafb 4px, #f9fafb 8px)",
                }}
              />
              <span className="text-[11px] text-gray-400 font-medium">S</span>
            </div>
          </div>
        </div>

        {/* Reminders / Next Departure (Span 4) */}
        <div className="lg:col-span-4 rounded-2xl p-5 bg-white border border-gray-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-3">
              Reminders
            </span>
            <h3
              className="text-lg sm:text-xl font-bold text-gray-900 leading-snug"
              style={{ fontFamily: "var(--font-fredoka), sans-serif" }}
            >
              {nextDeparture.title}
            </h3>
            <p className="text-xs text-gray-500 mt-2 flex items-center gap-1.5">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>Time: {nextDeparture.departureDate}</span>
            </p>
          </div>

          <div className="pt-4">
            <button
              onClick={() => onNavigateTab("trips")}
              className="w-full py-2.5 px-4 rounded-full bg-[#155e38] hover:bg-[#124e2d] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-all hover:scale-[1.01] cursor-pointer"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
              </svg>
              <span>Manage Expedition</span>
            </button>
          </div>
        </div>

        {/* Project / Expeditions Quick List (Span 3) */}
        <div className="lg:col-span-3 rounded-2xl p-5 bg-white border border-gray-200/80 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-gray-900">Project</h2>
            <button
              onClick={() => onNavigateTab("trips")}
              className="text-[11px] font-semibold text-gray-700 hover:text-black px-2 py-0.5 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              + New
            </button>
          </div>

          <div className="space-y-3">
            {[
              {
                name: "Kashmir Powder Trails",
                due: "Feb 14, 2026",
                color: "text-blue-600 bg-blue-50",
              },
              {
                name: "Spiti Valley 4x4 Circuit",
                due: "Jun 10, 2026",
                color: "text-emerald-600 bg-emerald-50",
              },
              {
                name: "Meghalaya Living Roots",
                due: "Oct 15, 2026",
                color: "text-amber-600 bg-amber-50",
              },
              {
                name: "Ladakh Overland Passes",
                due: "Jul 18, 2026",
                color: "text-purple-600 bg-purple-50",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                onClick={() => onNavigateTab("trips")}
                className="flex items-center justify-between gap-2 p-1.5 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${item.color}`}
                  >
                    ✦
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-gray-800 truncate">
                      {item.name}
                    </p>
                    <p className="text-[10px] text-gray-400">Due: {item.due}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Row 3: Bottom Section (Collaboration + Capacity Gauge + Time Tracker) ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Team Collaboration: Recent Enquiries List (Span 5) */}
        <div className="lg:col-span-5 rounded-2xl p-5 bg-white border border-gray-200/80 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-gray-900">Team Collaboration</h2>
            <button
              onClick={() => onNavigateTab("enquiries")}
              className="text-[11px] font-semibold text-gray-700 hover:text-black px-2.5 py-0.5 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              + View All
            </button>
          </div>

          <div className="space-y-3">
            {[
              {
                name: "Alexandra Deff",
                role: "Inquired for Kashmir Winter Expedition",
                status: "Completed",
                badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
                avatarBg: "bg-rose-100 text-rose-700",
                initials: "AD",
              },
              {
                name: "Edwin Adenike",
                role: "Spiti 4x4 Overland · 2 Seats Inquired",
                status: "In Progress",
                badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
                avatarBg: "bg-emerald-100 text-emerald-700",
                initials: "EA",
              },
              {
                name: "Isaac Oluwatemilorun",
                role: "Meghalaya Living Roots · Solo Traveler",
                status: "Pending",
                badgeColor: "bg-rose-50 text-rose-700 border-rose-200",
                avatarBg: "bg-blue-100 text-blue-700",
                initials: "IO",
              },
              {
                name: "David Oshodi",
                role: "Custom Group Tour Inquiry · Jaipur Origin",
                status: "In Progress",
                badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
                avatarBg: "bg-purple-100 text-purple-700",
                initials: "DO",
              },
            ].map((collab, idx) => (
              <div
                key={idx}
                onClick={() => onNavigateTab("enquiries")}
                className="flex items-center justify-between gap-3 p-1.5 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${collab.avatarBg}`}
                  >
                    {collab.initials}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-gray-900 truncate">
                      {collab.name}
                    </p>
                    <p className="text-[10px] text-gray-500 truncate">{collab.role}</p>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-medium px-2 py-0.5 rounded-full border shrink-0 ${collab.badgeColor}`}
                >
                  {collab.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Project Progress: Circular Gauge (Span 4) */}
        <div className="lg:col-span-4 rounded-2xl p-5 bg-white border border-gray-200/80 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-bold text-gray-900">Project Progress</h2>
            <span className="text-[10px] text-gray-400 font-mono">Season 2026</span>
          </div>

          {/* Large Arc Gauge */}
          <div className="relative flex flex-col items-center justify-center py-4">
            <div className="relative w-40 h-24 overflow-hidden">
              {/* Semi circle background (hatched) */}
              <div
                className="w-40 h-40 rounded-full border-[18px] border-transparent"
                style={{
                  background:
                    "repeating-linear-gradient(45deg, #d1d5db, #d1d5db 4px, #f3f4f6 4px, #f3f4f6 8px)",
                  mask: "radial-gradient(transparent 54px, #000 55px)",
                  WebkitMask: "radial-gradient(transparent 54px, #000 55px)",
                }}
              />
              {/* Active Green Arc */}
              <div
                className="absolute top-0 left-0 w-40 h-40 rounded-full border-[18px] border-[#155e38] border-b-transparent border-r-transparent"
                style={{
                  transform: "rotate(-25deg)",
                  mask: "radial-gradient(transparent 54px, #000 55px)",
                  WebkitMask: "radial-gradient(transparent 54px, #000 55px)",
                }}
              />
            </div>

            <div className="text-center mt-2">
              <span
                className="text-3xl font-extrabold text-gray-900 block"
                style={{ fontFamily: "var(--font-fredoka), sans-serif" }}
              >
                41%
              </span>
              <span className="text-[11px] text-gray-400 uppercase tracking-wider font-medium">
                Expeditions Ended
              </span>
            </div>
          </div>

          {/* Gauge Legend */}
          <div className="flex items-center justify-center gap-4 pt-3 border-t border-gray-100 text-[10px] text-gray-500">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#155e38]" />
              <span>Completed</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>In Progress</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-gray-300" />
              <span>Pending</span>
            </div>
          </div>
        </div>

        {/* Time Tracker: Deep Forest Green Card (Span 3) */}
        <div className="lg:col-span-3 rounded-2xl p-5 bg-[#154e2f] text-white shadow-sm flex flex-col justify-between relative overflow-hidden">
          {/* Abstract Topo Graphic Lines */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 100% 100%, transparent 20%, rgba(255,255,255,0.2) 21%, transparent 22%, transparent 40%, rgba(255,255,255,0.2) 41%, transparent 42%)",
            }}
          />

          <div>
            <span className="text-xs font-medium text-emerald-100 uppercase tracking-wider block mb-2">
              Time Tracker
            </span>
            <div
              className="text-3xl sm:text-4xl font-extrabold tracking-wider my-4 font-mono"
            >
              {formatTimer(seconds)}
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="w-10 h-10 rounded-full bg-white text-[#154e2f] flex items-center justify-center shadow-md hover:scale-105 transition-transform cursor-pointer"
              title={isRunning ? "Pause Time Tracker" : "Resume Time Tracker"}
            >
              {isRunning ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              )}
            </button>

            <button
              onClick={() => setSeconds(0)}
              className="w-10 h-10 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-md hover:scale-105 transition-transform cursor-pointer"
              title="Reset Time Tracker"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <rect x="5" y="5" width="14" height="14" rx="2" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
