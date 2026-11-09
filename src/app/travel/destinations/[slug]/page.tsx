import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DESTINATIONS_DATA } from "../../data/destinations";
import DestinationClient from "./DestinationClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const destination = DESTINATIONS_DATA[slug];

  if (!destination) {
    return {
      title: "Destination Not Found | Ashraf Siddiqui Travel",
    };
  }

  return {
    title: `${destination.name} Travel Guide | Ashraf Siddiqui`,
    description: destination.overview.slice(0, 160),
    openGraph: {
      title: `${destination.name} – ${destination.tagline} | Ashraf Siddiqui Travel`,
      description: destination.overview.slice(0, 160),
      images: [{ url: destination.heroImage }],
    },
  };
}

export async function generateStaticParams() {
  return Object.keys(DESTINATIONS_DATA).map((slug) => ({ slug }));
}

export default async function DestinationPage({ params }: Props) {
  const { slug } = await params;
  const destination = DESTINATIONS_DATA[slug];

  if (!destination) {
    notFound();
  }

  return <DestinationClient destination={destination} />;
}

