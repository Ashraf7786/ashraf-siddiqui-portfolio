import { NextRequest, NextResponse } from "next/server";
import { extractClientIp } from "@/lib/adminAuth";
import { getCachedJson, writeCachedJson } from "@/lib/travelDataCache";
import { sendInquiryNotification } from "@/lib/emailService";

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
      gender,
      travelersCount,
      cityOfOrigin,
      dietPreference,
      emergencyContact,
      message,
      tripTitle,
      tripSlug,
      pricePerPerson,
      collabType,
      subject,
      agreeTerms,
    } = body;

    const isTripRegistration = Boolean(tripTitle && !collabType);

    if (!fullName || !String(fullName).trim() || String(fullName).trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Full name is required (minimum 2 characters)." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(String(email).trim())) {
      return NextResponse.json(
        { success: false, error: "A valid email address is required." },
        { status: 400 }
      );
    }

    if (isTripRegistration) {
      const cleanPhone = String(whatsapp || "").replace(/\D/g, "");
      if (!cleanPhone || cleanPhone.length < 10) {
        return NextResponse.json(
          { success: false, error: "Valid 10-digit WhatsApp phone number is required." },
          { status: 400 }
        );
      }

      const cleanEmergency = String(emergencyContact || "").replace(/\D/g, "");
      if (!cleanEmergency || cleanEmergency.length < 10) {
        return NextResponse.json(
          { success: false, error: "Valid 10-digit emergency contact phone number is required." },
          { status: 400 }
        );
      }

      if (!gender || !String(gender).trim()) {
        return NextResponse.json(
          { success: false, error: "Gender selection is required for expedition safety records." },
          { status: 400 }
        );
      }

      if (!cityOfOrigin || !String(cityOfOrigin).trim()) {
        return NextResponse.json(
          { success: false, error: "City of departure is required." },
          { status: 400 }
        );
      }

      if (!agreeTerms) {
        return NextResponse.json(
          {
            success: false,
            error:
              "You must agree to the Terms & Conditions and Safety Disclaimer (travel at own risk & follow leader instructions) to proceed.",
          },
          { status: 400 }
        );
      }
    }

    const title = tripTitle
      ? String(tripTitle).trim()
      : collabType
      ? `Collaboration: ${collabType}${subject ? ` · ${subject}` : ""}`
      : "General Travel Inquiry";

    const newEnquiry = {
      id: `enq-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      createdAt: new Date().toISOString(),
      fullName: String(fullName).trim(),
      email: String(email).trim().toLowerCase(),
      whatsapp: String(whatsapp || "").trim().replace(/\s+/g, ""),
      gender: String(gender || "").trim(),
      travelersCount: Number(travelersCount) || 1,
      cityOfOrigin: String(cityOfOrigin || "").trim(),
      dietPreference: String(dietPreference || "Vegetarian").trim(),
      emergencyContact: String(emergencyContact || "").trim(),
      termsAccepted: Boolean(agreeTerms),
      message: String(message || "").trim(),
      tripTitle: title,
      tripSlug: String(tripSlug || "").trim(),
      pricePerPerson: pricePerPerson ? Number(pricePerPerson) : undefined,
      status: "New" as "New" | "Contacted" | "Confirmed" | "Archived",
    };

    const existing = getCachedJson<any[]>("enquiries.json", []);
    existing.unshift(newEnquiry); // newest first
    writeCachedJson("enquiries.json", existing);

    // Send formatted luxury email notification to ashrafsiddiquitravel@gmail.com
    let emailDispatched = false;
    try {
      const emailRes = await sendInquiryNotification({
        id: newEnquiry.id,
        type: collabType ? "contact_collaboration" : "trip_booking",
        fullName: newEnquiry.fullName,
        email: newEnquiry.email,
        whatsapp: newEnquiry.whatsapp,
        gender: newEnquiry.gender,
        travelersCount: newEnquiry.travelersCount,
        cityOfOrigin: newEnquiry.cityOfOrigin,
        dietPreference: newEnquiry.dietPreference,
        emergencyContact: newEnquiry.emergencyContact,
        termsAccepted: newEnquiry.termsAccepted,
        message: newEnquiry.message,
        tripTitle: newEnquiry.tripTitle,
        tripSlug: newEnquiry.tripSlug,
        collabType,
        subject,
        createdAt: newEnquiry.createdAt,
      });
      emailDispatched = emailRes.sent;
    } catch (mailErr) {
      console.warn("Email dispatch error (non-fatal):", mailErr);
    }

    return NextResponse.json({
      success: true,
      message: "Enquiry submitted successfully. Ashraf will contact you within 24 hours.",
      enquiryId: newEnquiry.id,
      emailDispatched,
    });
  } catch (error: any) {
    console.error("Enquiry submission error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to process enquiry." },
      { status: 500 }
    );
  }
}
