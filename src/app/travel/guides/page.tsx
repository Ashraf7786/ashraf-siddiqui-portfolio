import React from "react";
import { Metadata } from "next";
import GuidesClient from "./GuidesClient";

export const metadata: Metadata = {
  title: "Travel Guides & Detailed Itineraries | Ashraf Siddiqui",
  description: "Exhaustive day-by-day travel itineraries, transport logistics, verified budget breakdowns, and field notes across India by Ashraf Siddiqui.",
  openGraph: {
    title: "Travel Guides & Itineraries | Ashraf Siddiqui",
    description: "Honest route blueprints across Kashmir, Ladakh, Rajasthan, and more.",
    images: ["/img/travel/kashmir_hero.jpg"],
  },
};

export default function TravelGuidesPage() {
  return <GuidesClient />;
}

