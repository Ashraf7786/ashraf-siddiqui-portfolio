import { NextResponse } from "next/server";
import { getCachedJson } from "@/lib/travelDataCache";
import { TRAVEL_REELS } from "@/app/travel/data/reels";

export const dynamic = "force-dynamic";

export async function GET() {
  const reels = getCachedJson("reels.json", TRAVEL_REELS);

  return NextResponse.json(
    { success: true, count: reels.length, reels },
    {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    }
  );
}
