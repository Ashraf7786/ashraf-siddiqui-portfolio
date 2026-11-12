import { NextRequest, NextResponse } from "next/server";
import { getDynamicJson } from "@/lib/travelDataCache";
import { TRAVEL_STORIES, TravelStory } from "@/app/travel/data/stories";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req: NextRequest) {
  const stories = await getDynamicJson<TravelStory[]>("stories.json", TRAVEL_STORIES);

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
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
        },
      }
    );
  }

  return NextResponse.json(
    { success: true, count: stories.length, stories },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
      },
    }
  );
}
