import { NextRequest, NextResponse } from "next/server";
import { getCachedJson } from "@/lib/travelDataCache";
import { TRAVEL_STORIES, TravelStory } from "@/app/travel/data/stories";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const stories = getCachedJson<TravelStory[]>("stories.json", TRAVEL_STORIES);

  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (slug) {
    const story = stories.find((s) => s.slug === slug);
    if (!story) {
      return NextResponse.json({ success: false, error: "Story not found" }, { status: 404 });
    }
    return NextResponse.json(
      { success: true, story },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      }
    );
  }

  return NextResponse.json(
    { success: true, count: stories.length, stories },
    {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    }
  );
}

