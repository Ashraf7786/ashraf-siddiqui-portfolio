import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { extractClientIp } from "@/lib/adminAuth";

const ENQUIRIES_FILE_PATH = path.join(
  process.cwd(),
  "src",
  "app",
  "travel",
  "data",
  "enquiries.json"
);

// Simple in-memory spam preventer: max 5 submissions per 10 mins per IP
const submissionTracker = new Map<string, { count: number; firstAt: number }>();

export async function POST(req: NextRequest) {
  try {
    const ip = extractClientIp(req);
    const now = Date.now();

    const track = submissionTracker.get(ip) || { count: 0, firstAt: now };
    if (now - track.firstAt > 10 * 60 * 1000) {
      track.count = 1;
      track.firstAt = now;
    } else {
      track.count += 1;
    }
    submissionTracker.set(ip, track);

    if (track.count > 6) {
      return NextResponse.json(
        { success: false, error: "Too many enquiries sent. Please try again shortly." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const {
      fullName,
      email,
      whatsapp,
      travelersCount,
      cityOfOrigin,
      dietPreference,
      emergencyContact,
      message,
      tripTitle,
      tripSlug,
      pricePerPerson,
    } = body;

    if (!fullName || !email || !whatsapp) {
      return NextResponse.json(
        { success: false, error: "Full name, email, and WhatsApp number are required." },
        { status: 400 }
      );
    }

    const newEnquiry = {
      id: `enq-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      createdAt: new Date().toISOString(),
      fullName: String(fullName).trim(),
      email: String(email).trim().toLowerCase(),
      whatsapp: String(whatsapp).trim().replace(/\s+/g, ""),
      travelersCount: Number(travelersCount) || 1,
      cityOfOrigin: String(cityOfOrigin || "").trim(),
      dietPreference: String(dietPreference || "Vegetarian").trim(),
      emergencyContact: String(emergencyContact || "").trim(),
      message: String(message || "").trim(),
      tripTitle: String(tripTitle || "Group Expedition").trim(),
      tripSlug: String(tripSlug || "").trim(),
      pricePerPerson: pricePerPerson ? Number(pricePerPerson) : undefined,
      status: "New" as "New" | "Contacted" | "Confirmed" | "Archived",
    };

    let existing: any[] = [];
    if (fs.existsSync(ENQUIRIES_FILE_PATH)) {
      try {
        const content = fs.readFileSync(ENQUIRIES_FILE_PATH, "utf-8");
        existing = JSON.parse(content);
      } catch {
        existing = [];
      }
    }

    existing.unshift(newEnquiry); // newest first
    fs.writeFileSync(ENQUIRIES_FILE_PATH, JSON.stringify(existing, null, 2), "utf-8");

    return NextResponse.json({
      success: true,
      message: "Enquiry submitted successfully. Ashraf will contact you within 24 hours.",
      enquiryId: newEnquiry.id,
    });
  } catch (error: any) {
    console.error("Enquiry submission error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to process enquiry." },
      { status: 500 }
    );
  }
}
