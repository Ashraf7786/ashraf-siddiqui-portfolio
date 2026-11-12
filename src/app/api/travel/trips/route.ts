import { NextResponse } from "next/server";
import { getCachedJson } from "@/lib/travelDataCache";
import { GROUP_TRIPS } from "@/app/travel/data/trips";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const trips = getCachedJson("trips.json", GROUP_TRIPS);

  return NextResponse.json(
    { success: true, count: trips.length, trips },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
        "Pragma": "no-cache",
        "Expires": "0",
      },
    }
  );
}
