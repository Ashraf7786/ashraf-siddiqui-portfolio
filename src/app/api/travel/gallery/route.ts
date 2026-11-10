import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { TRAVEL_PHOTOS } from "@/app/travel/data/gallery";

const GALLERY_FILE = path.join(process.cwd(), "src", "app", "travel", "data", "gallery.json");

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    if (fs.existsSync(GALLERY_FILE)) {
      const data = fs.readFileSync(GALLERY_FILE, "utf-8");
      const photos = JSON.parse(data);
      return NextResponse.json({ success: true, photos }, {
        headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60" }
      });
    }
  } catch (err) {
    console.error("Failed to read gallery.json:", err);
  }

  return NextResponse.json({ success: true, photos: TRAVEL_PHOTOS });
}
