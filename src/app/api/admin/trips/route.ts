import { NextRequest, NextResponse } from "next/server";
import { getAdminSessionFromCookies } from "@/lib/adminAuth";
import { getDynamicJson, writeCachedJsonAsync } from "@/lib/travelDataCache";
import { GROUP_TRIPS } from "@/app/travel/data/trips";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const session = await getAdminSessionFromCookies();
  if (!session.authenticated) {
    return NextResponse.json({ success: false, error: "Unauthorized access." }, { status: 401 });
  }

  const trips = await getDynamicJson("trips.json", GROUP_TRIPS);
  return NextResponse.json(
    { success: true, count: trips.length, trips },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
      },
    }
  );
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

    const existingTrips = await getDynamicJson<any[]>("trips.json", GROUP_TRIPS);

    const sanitizedTrips = trips.map((trip, idx) => {
      if (!trip.title) {
        throw new Error(`Trip #${idx + 1} is missing a title.`);
      }

      const existingTrip = existingTrips.find((et) => et.id === trip.id || et.slug === trip.slug);

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
        isUpcoming: Boolean(trip.isUpcoming || trip.status === "Upcoming"),
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
        dayWiseItinerary: Array.isArray(trip.dayWiseItinerary)
          ? trip.dayWiseItinerary.map((d: any, dIdx: number) => ({
              day: Number(d.day) || dIdx + 1,
              title: String(d.title || `Day ${dIdx + 1}`).trim(),
              description: String(d.description || "").trim(),
              mealsIncluded: String(d.mealsIncluded || "").trim(),
              nightStay: String(d.nightStay || "").trim(),
            }))
          : (existingTrip?.dayWiseItinerary || []),
        faqs: Array.isArray(trip.faqs)
          ? trip.faqs
              .map((f: any) => ({
                question: String(f.question || "").trim(),
                answer: String(f.answer || "").trim(),
              }))
              .filter((f: any) => f.question)
          : (existingTrip?.faqs || []),
        host: trip.host && trip.host.name
          ? trip.host
          : (existingTrip?.host || {
              name: "Ashraf Siddiqui",
              role: "Expedition Leader",
              experience: "24 Indian states explored",
              avatar: "/img/travel/kashmir_hero.jpg",
              message: "I personally lead every minute of this journey."
            }),
      };
    });

    const saved = await writeCachedJsonAsync("trips.json", sanitizedTrips);
    if (!saved) throw new Error("Storage write failed.");

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
