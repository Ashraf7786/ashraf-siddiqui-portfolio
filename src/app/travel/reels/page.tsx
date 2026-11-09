import React, { Suspense } from "react";
import { Metadata } from "next";
import ReelsClient from "./ReelsClient";

export const metadata: Metadata = {
  title: "Travel in 60 Seconds | Ashraf Siddiqui Travel Reels",
  description: "Raw, vertical 9:16 video moments from India's highest mountain passes, desert dunes, and sacred ghats by Ashraf Siddiqui.",
  openGraph: {
    title: "Travel Reels | Ashraf Siddiqui",
    description: "Vertical video dispatch from 24 states across India.",
    images: ["/img/travel/kashmir_hero.jpg"],
  },
};

export default function TravelReelsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#080808] flex items-center justify-center text-white/40">Loading reels...</div>}>
      <ReelsClient />
    </Suspense>
  );
}

