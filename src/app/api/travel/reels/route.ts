import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { TRAVEL_REELS } from "@/app/travel/data/reels";

const REELS_FILE = path.join(process.cwd(), "src", "app", "travel", "data", "reels.json");

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    if (fs.existsSync(REELS_FILE)) {
      const data = fs.readFileSync(REELS_FILE, "utf-8");
      const reels = JSON.parse(data);
      return NextResponse.json({ success: true, reels }, {
        headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60" }
      });
    }
  } catch (err) {
    console.error("Failed to read reels.json:", err);
  }

  return NextResponse.json({ success: true, reels: TRAVEL_REELS });
}
