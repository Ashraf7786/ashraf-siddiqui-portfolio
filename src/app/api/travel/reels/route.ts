import { NextResponse } from "next/server";
import { getDynamicJson } from "@/lib/travelDataCache";
import { TRAVEL_REELS } from "@/app/travel/data/reels";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const reels = await getDynamicJson("reels.json", TRAVEL_REELS);

  return NextResponse.json(
    { success: true, count: reels.length, reels },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
      },
    }
  );
}
