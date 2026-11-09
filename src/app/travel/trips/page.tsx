import React from "react";
import { Metadata } from "next";
import TripsClient from "./TripsClient";

export const metadata: Metadata = {
  title: "Curated Group Expeditions & Treks | Ashraf Siddiqui Travel Diaries",
  description: "Join Ashraf Siddiqui on curated small-group travel expeditions across India. Real offbeat routes, transparent costs, and community road journeys.",
  openGraph: {
    title: "Curated Group Expeditions | Ashraf Siddiqui",
    description: "Join small-group travel adventures across Ladakh, Spiti, Kashmir, and Meghalaya.",
    images: ["/img/travel/ladakh.jpg"],
  },
};

export default function GroupTripsPage() {
  return <TripsClient />;
}

