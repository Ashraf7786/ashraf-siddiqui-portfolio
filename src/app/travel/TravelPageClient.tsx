"use client";

import TravelNav from "./components/TravelNav";
import TravelHero from "./components/TravelHero";
import TravelStats from "./components/TravelStats";
import InteractiveIndiaMap from "./components/InteractiveIndiaMap";
import FeaturedDestinations from "./components/FeaturedDestinations";
import TravelGallery from "./components/TravelGallery";
import TravelStories from "./components/TravelStories";
import TravelReels from "./components/TravelReels";
import GroupTourCards from "./components/GroupTourCards";
import TravelTools from "./components/TravelTools";
import AboutTraveller from "./components/AboutTraveller";
import TravelCTA from "./components/TravelCTA";
import NewsletterPreview from "./components/NewsletterPreview";
import TravelFooter from "./components/TravelFooter";

export default function TravelPageClient() {
  return (
    <div
      className="min-h-screen bg-[#080808] text-[#f5f5f5] overflow-x-hidden"
      style={{ fontFamily: "var(--font-inter), sans-serif" }}
    >
      <TravelNav />
      <main>
        {/* 1. Cinematic Hero Carousel & Expedition Announcements */}
        <TravelHero />

        {/* 2. Authority & Proof Metrics (24/28 States, 4+ Years) */}
        <TravelStats />

        {/* 3. PRIMARY REVENUE: Curated Small-Group Expeditions & Tours */}
        <GroupTourCards />

        {/* 4. HIGH-RETENTION VIDEO HOOK: iPhone Reels & Field Dispatches */}
        <TravelReels />

        {/* 5. Destination Guides & Circuit Exploration */}
        <FeaturedDestinations />

        {/* 6. GAMIFIED INTERACTION: 24/28 Interactive India Journey Map */}
        <InteractiveIndiaMap />

        {/* 7. VISUAL PROOF: High-Resolution Photo Gallery */}
        <TravelGallery />

        {/* 8. EDITORIAL TRUST: Long-form Travel Stories & Real Field Notes */}
        <TravelStories />

        {/* 9. Expedition Tools, High-Altitude Checklists & Route Guides */}
        <TravelTools />

        {/* 10. MEET THE LEADER: About Ashraf Siddiqui & Travel Philosophy */}
        <AboutTraveller />

        {/* 11. SECONDARY REVENUE: Custom Trip Planning, Brand Deals & Private Tours */}
        <TravelCTA />

        {/* 12. HIGH-INTENT LEAD CAPTURE: Early Access Expedition Announcement Drops */}
        <NewsletterPreview />
      </main>
      <TravelFooter />
    </div>
  );
}
