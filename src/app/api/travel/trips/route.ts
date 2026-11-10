import { NextResponse } from "next/server";
import { getCachedJson } from "@/lib/travelDataCache";
import { GROUP_TRIPS } from "@/app/travel/data/trips";

export const dynamic = "force-dynamic";

export async function GET() {
  const trips = getCachedJson("trips.json", GROUP_TRIPS);

  return NextResponse.json(
    { success: true, count: trips.length, trips },
    {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    }
  );
}
