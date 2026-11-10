import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getAdminSessionFromCookies } from "@/lib/adminAuth";
import { GROUP_TRIPS } from "@/app/travel/data/trips";

const DATA_FILE_PATH = path.join(
  process.cwd(),
  "src",
  "app",
  "travel",
  "data",
  "trips.json"
);

const BACKUP_FILE_PATH = path.join(
  process.cwd(),
  "src",
  "app",
  "travel",
  "data",
  "trips.backup.json"
);

export async function GET() {
  const session = await getAdminSessionFromCookies();
  if (!session.authenticated) {
    return NextResponse.json({ success: false, error: "Unauthorized access." }, { status: 401 });
  }

  try {
    if (!fs.existsSync(DATA_FILE_PATH)) {
      return NextResponse.json({ success: true, trips: GROUP_TRIPS });
    }
    const content = fs.readFileSync(DATA_FILE_PATH, "utf-8");
    const trips = JSON.parse(content);
    return NextResponse.json({ success: true, trips });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to read trips." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getAdminSessionFromCookies();
  if (!session.authenticated) {
    return NextResponse.json({ success: false, error: "Unauthorized. Admin session required." }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { trips } = body;

    if (!Array.isArray(trips)) {
      return NextResponse.json(
        { success: false, error: "Trips must be an array." },
        { status: 400 }
      );
    }

    const sanitizedTrips = trips.map((trip, idx) => {
      if (!trip.title) {
        throw new Error(`Trip #${idx + 1} is missing a title.`);
      }

      return {
        id: String(trip.id || `trip-${Date.now()}-${idx}`).trim(),
        slug: String(trip.slug || trip.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")).trim(),
        title: String(trip.title).trim(),
        tagline: String(trip.tagline || "").trim(),
        destination: String(trip.destination || "").trim(),
        destinationSlug: String(trip.destinationSlug || "").trim(),
        state: String(trip.state || "").trim(),
        coverImage: String(trip.coverImage || "/img/travel/kashmir_hero.jpg").trim(),
        gallery: Array.isArray(trip.gallery) ? trip.gallery : [trip.coverImage || "/img/travel/kashmir_hero.jpg"],
        departureDate: String(trip.departureDate || "").trim(),
        returnDate: String(trip.returnDate || "").trim(),
        durationDays: Number(trip.durationDays) || 7,
        durationLabel: String(trip.durationLabel || `${trip.durationDays || 7} Days`).trim(),
        departureCity: String(trip.departureCity || "Delhi").trim(),
        pricePerPerson: Number(trip.pricePerPerson) || 25000,
        currency: "INR (₹)",
        maxGroupSize: Number(trip.maxGroupSize) || 12,
        availableSeats: Number(trip.availableSeats) ?? 6,
        totalSeats: Number(trip.totalSeats) || 12,
        difficulty: String(trip.difficulty || "Moderate").trim(),
        status: String(trip.status || "Open for Booking").trim(),
        isConfirmed: Boolean(trip.isConfirmed),
        overview: String(trip.overview || "").trim(),
        highlights: Array.isArray(trip.highlights)
          ? trip.highlights.map((h: string) => String(h).trim()).filter(Boolean)
          : typeof trip.highlights === "string"
          ? (trip.highlights as string).split("\n").map((h) => h.trim()).filter(Boolean)
          : [],
        inclusions: Array.isArray(trip.inclusions)
          ? trip.inclusions.map((i: string) => String(i).trim()).filter(Boolean)
          : typeof trip.inclusions === "string"
          ? (trip.inclusions as string).split("\n").map((i) => i.trim()).filter(Boolean)
          : [],
        exclusions: Array.isArray(trip.exclusions)
          ? trip.exclusions.map((e: string) => String(e).trim()).filter(Boolean)
          : typeof trip.exclusions === "string"
          ? (trip.exclusions as string).split("\n").map((e) => e.trim()).filter(Boolean)
          : [],
        itinerary: Array.isArray(trip.itinerary) ? trip.itinerary : [],
        faqs: Array.isArray(trip.faqs) ? trip.faqs : [],
      };
    });

    if (fs.existsSync(DATA_FILE_PATH)) {
      fs.copyFileSync(DATA_FILE_PATH, BACKUP_FILE_PATH);
    }

    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(sanitizedTrips, null, 2), "utf-8");

    return NextResponse.json({
      success: true,
      message: `Successfully saved ${sanitizedTrips.length} group expeditions.`,
      trips: sanitizedTrips,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to save trips." },
      { status: 500 }
    );
  }
}
