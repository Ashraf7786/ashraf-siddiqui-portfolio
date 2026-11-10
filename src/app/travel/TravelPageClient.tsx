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
        <TravelHero />
        <TravelStats />
        <InteractiveIndiaMap />
        <FeaturedDestinations />
        <TravelGallery />
        <TravelStories />
        <TravelReels />
        <GroupTourCards />
        <TravelTools />
        <AboutTraveller />
        <TravelCTA />
        <NewsletterPreview />
      </main>
      <TravelFooter />
    </div>
  );
}
