import React from "react";
import { Metadata } from "next";
import { TRAVEL_STORIES, TravelStory } from "../data/stories";
import { getDynamicJson } from "@/lib/travelDataCache";
import StoriesClient from "./StoriesClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Travel Stories & Field Notes | Ashraf Siddiqui",
  description: "Raw editorial stories from high-altitude Himalayan passes, living root bridges, and desert camps across India by Ashraf Siddiqui.",
  openGraph: {
    title: "Travel Stories | Ashraf Siddiqui",
    description: "In-depth editorial accounts and dispatches from 24 states across India.",
    images: ["/img/travel/kashmir_hero.jpg"],
  },
};

export default async function StoriesPage() {
  const initialStories = await getDynamicJson<TravelStory[]>("stories.json", TRAVEL_STORIES);
  return <StoriesClient initialStories={initialStories} />;
}
