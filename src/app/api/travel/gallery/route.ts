import { NextResponse } from "next/server";
import { getDynamicJson } from "@/lib/travelDataCache";
import { TRAVEL_PHOTOS, GalleryPhoto } from "@/app/travel/data/gallery";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const photos = await getDynamicJson<GalleryPhoto[]>("gallery.json", TRAVEL_PHOTOS);

  return NextResponse.json(
    { success: true, count: photos.length, photos },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
        "Pragma": "no-cache",
        "Expires": "0",
      },
    }
  );
}
