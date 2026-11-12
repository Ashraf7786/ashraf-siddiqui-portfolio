import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { TRAVEL_STORIES, TravelStory } from "../../data/stories";
import { getDynamicJson } from "@/lib/travelDataCache";
import StoryReaderClient from "./StoryReaderClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface StoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: StoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const stories = await getDynamicJson<TravelStory[]>("stories.json", TRAVEL_STORIES);
  const story = stories.find((s) => s.slug === slug);

  if (!story) {
    return {
      title: "Story Not Found | Ashraf Siddiqui Travel Diaries",
    };
  }

  return {
    title: `${story.title} | Ashraf Siddiqui Travel Stories`,
    description: story.excerpt,
    openGraph: {
      title: story.title,
      description: story.excerpt,
      images: [story.coverImage],
    },
  };
}

export default async function StoryPage({ params }: StoryPageProps) {
  const { slug } = await params;
  const stories = await getDynamicJson<TravelStory[]>("stories.json", TRAVEL_STORIES);
  const story = stories.find((s) => s.slug === slug);

  if (!story) {
    notFound();
  }

  return <StoryReaderClient story={story} allStories={stories} />;
}
