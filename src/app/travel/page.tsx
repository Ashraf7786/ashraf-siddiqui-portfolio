import type { Metadata } from "next";
import TravelPageClient from "./TravelPageClient";

export const metadata: Metadata = {
  title: "Travel | Ashraf Siddiqui – Explorer of India & Beyond",
  description:
    "Follow Ashraf Siddiqui travel journey across India and the world. Explore past stories, upcoming expeditions, and open group tours you can join.",
  keywords: [
    "Ashraf Siddiqui Travel",
    "India Travel Blog",
    "Kashmir Group Tour",
    "Ladakh Expedition",
    "Rajasthan Travel",
    "Group Travel India",
    "Ashraf Explorer",
  ],
  openGraph: {
    type: "website",
    url: "https://iamashraf.in/travel",
    title: "Travel | Ashraf Siddiqui",
    description:
      "Explore Ashraf travel stories, upcoming journeys, and group tours across India and the world.",
    images: [{ url: "https://iamashraf.in/img/travel/kashmir_hero.jpg" }],
  },
};

export default function TravelPage() {
  return <TravelPageClient />;
}
