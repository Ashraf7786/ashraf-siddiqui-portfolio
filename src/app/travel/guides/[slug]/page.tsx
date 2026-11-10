import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { TRAVEL_GUIDES } from "../../data/guides";
import GuideDetailClient from "./GuideDetailClient";

interface GuidePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const fullSlugs = TRAVEL_GUIDES.map((g) => ({ slug: g.slug }));
  const shortSlugs = TRAVEL_GUIDES.filter((g) => g.destinationSlug).map((g) => ({ slug: g.destinationSlug! }));
  return [...fullSlugs, ...shortSlugs];
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = TRAVEL_GUIDES.find((g) => g.slug === slug || g.destinationSlug === slug);

  if (!guide) {
    return {
      title: "Travel Guide Not Found | Ashraf Siddiqui",
    };
  }

  return {
    title: `${guide.title} | Ashraf Siddiqui Itinerary Blueprint`,
    description: guide.subtitle,
    openGraph: {
      title: guide.title,
      description: guide.subtitle,
      images: [guide.heroImage],
    },
  };
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = TRAVEL_GUIDES.find((g) => g.slug === slug || g.destinationSlug === slug);

  if (!guide) {
    notFound();
  }

  return <GuideDetailClient guide={guide} />;
}

