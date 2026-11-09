import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { TRAVEL_STORIES } from "../../data/stories";
import StoryReaderClient from "./StoryReaderClient";

interface StoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return TRAVEL_STORIES.map((story) => ({
    slug: story.slug,
  }));
}

export async function generateMetadata({ params }: StoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = TRAVEL_STORIES.find((s) => s.slug === slug);

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
  const story = TRAVEL_STORIES.find((s) => s.slug === slug);

  if (!story) {
    notFound();
  }

  return <StoryReaderClient story={story} />;
}

