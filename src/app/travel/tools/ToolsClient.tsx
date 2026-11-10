"use client";

import React from "react";
import Link from "next/link";
import TravelTools from "../components/TravelTools";

export default function ToolsClient() {
  return (
    <div className="min-h-screen bg-[#080808] text-[#f5f5f5] pt-24 sm:pt-28 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#f5f5f5]/40 mb-6">
          <Link href="/travel" className="hover:text-white transition-colors flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Travel Diaries
          </Link>
          <span>/</span>
          <span className="text-[#f5f5f5]/80 font-medium">Field Utilities</span>
        </div>
      </div>

      <TravelTools />
    </div>
  );
}
