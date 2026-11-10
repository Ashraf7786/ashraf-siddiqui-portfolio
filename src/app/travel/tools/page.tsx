import React from "react";
import { Metadata } from "next";
import ToolsClient from "./ToolsClient";

export const metadata: Metadata = {
  title: "Travel Utilities & Field Tools | Ashraf Siddiqui Travel Diaries",
  description:
    "Interactive high-altitude AMS advisory calculator, custom terrain packing checklists, and transparent route budget estimators for travelling across India by Ashraf Siddiqui.",
  openGraph: {
    title: "Travel Utilities & Field Tools | Ashraf Siddiqui",
    description: "High-altitude AMS advisory, packing generator & road trip cost calculator.",
    images: ["/img/travel/ladakh.jpg"],
  },
};

export default function TravelToolsPage() {
  return <ToolsClient />;
}
