import { NextResponse } from "next/server";
import { getCachedJson } from "@/lib/travelDataCache";
import { TRAVEL_PHOTOS } from "@/app/travel/data/gallery";

export const dynamic = "force-dynamic";

export async function GET() {
  const photos = getCachedJson("gallery.json", TRAVEL_PHOTOS);

  return NextResponse.json(
    { success: true, count: photos.length, photos },
    {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    }
  );
}
