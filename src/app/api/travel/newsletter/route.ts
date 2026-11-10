import { NextRequest, NextResponse } from "next/server";
import { getCachedJson, writeCachedJson } from "@/lib/travelDataCache";

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
  source: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, source = "Homepage Travel Letter" } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json({ success: false, error: "Email is required." }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail);

    if (!isValid) {
      return NextResponse.json({ success: false, error: "Please enter a valid email address." }, { status: 400 });
    }

    const subscribers = getCachedJson<NewsletterSubscriber[]>("subscribers.json", []);

    // Check if already subscribed
    const existing = subscribers.find((s) => s.email.toLowerCase() === cleanEmail);
    if (existing) {
      return NextResponse.json({
        success: true,
        message: "You're already subscribed to travel dispatches!",
        alreadySubscribed: true,
      });
    }

    const newSubscriber: NewsletterSubscriber = {
      id: `sub-${Date.now()}`,
      email: cleanEmail,
      subscribedAt: new Date().toISOString(),
      source: String(source).trim(),
    };

    const updated = [newSubscriber, ...subscribers];
    writeCachedJson("subscribers.json", updated);

    return NextResponse.json({
      success: true,
      message: "Successfully subscribed to Ashraf Siddiqui Travel Dispatches.",
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || "Failed to process subscription." },
      { status: 500 }
    );
  }
}
