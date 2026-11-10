import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { GROUP_TRIPS } from "@/app/travel/data/trips";

const TRIPS_FILE = path.join(process.cwd(), "src", "app", "travel", "data", "trips.json");

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    if (fs.existsSync(TRIPS_FILE)) {
      const data = fs.readFileSync(TRIPS_FILE, "utf-8");
      const trips = JSON.parse(data);
      return NextResponse.json({ success: true, trips }, {
        headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60" }
      });
    }
  } catch (err) {
    console.error("Failed to read trips.json:", err);
  }

  return NextResponse.json({ success: true, trips: GROUP_TRIPS });
}
