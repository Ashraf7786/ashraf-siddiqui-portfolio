import type { Metadata } from "next";
import Script from "next/script";
import TravelPageClient from "./TravelPageClient";

export const metadata: Metadata = {
  metadataBase: new URL("https://iamashraf.in"),
  title: "Travel Diaries | Ashraf Siddiqui — Solo Traveller Across India",
  description:
    "Follow Ashraf Siddiqui's journey across 24 Indian states — Kashmir, Ladakh, Rajasthan, Northeast India and beyond. Solo travel stories, reels, guides and group trips.",
  keywords: [
    "solo travel india",
    "kashmir travel 2026",
    "ladakh trek guide",
    "rajasthan road trip",
    "india states travel blog",
    "ashraf siddiqui traveller",
    "group travel expeditions india",
    "northeast india travel",
    "himalayas solo trek",
  ],
  authors: [
    { name: "Ashraf Siddiqui", url: "https://instagram.com/ashraf._siddiqui" },
  ],
  openGraph: {
    type: "website",
    url: "https://iamashraf.in/travel",
    siteName: "Ashraf Siddiqui Travel Diaries",
    title: "Travel Diaries | Ashraf Siddiqui — Solo Traveller",
    description:
      "24 Indian states explored. Solo travel stories, cinematic reels, day-by-day guides and group expeditions.",
    images: [
      {
        url: "/img/travel/kashmir_hero.jpg",
        width: 1200,
        height: 630,
        alt: "Kashmir — Ashraf Siddiqui Travel Diaries",
      },
    ],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Travel Diaries | Ashraf Siddiqui",
    description:
      "24 Indian states explored. Solo travel stories, reels & group trips.",
    images: ["/img/travel/kashmir_hero.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ashraf Siddiqui",
  url: "https://iamashraf.in",
  sameAs: ["https://instagram.com/ashraf._siddiqui"],
  jobTitle: "Solo Travel Creator",
  description:
    "24/28 Indian States explored. Solo Traveller | Rail · Road · Mountains. Based in Jaipur, India.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Jaipur",
    addressRegion: "Rajasthan",
    addressCountry: "IN",
  },
  email: "ashrafsiddiquitravel@gmail.com",
};

export default function TravelPage() {
  return (
    <>
      <Script
        id="person-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <TravelPageClient />
    </>
  );
}
