import { NextResponse } from "next/server";
import { getCachedJson } from "@/lib/travelDataCache";

export const dynamic = "force-dynamic";

export async function GET() {
  const slides = getCachedJson<any[]>("hero-slides.json", []);

  const activeSlides = slides
    .filter((s: { isActive?: boolean }) => s.isActive !== false)
    .sort(
      (a: { sortOrder?: number }, b: { sortOrder?: number }) =>
        (a.sortOrder || 0) - (b.sortOrder || 0)
    );

  return NextResponse.json(
    {
      success: true,
      count: activeSlides.length,
      slides: activeSlides,
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    }
  );
}
