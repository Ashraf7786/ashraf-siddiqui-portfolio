import { NextResponse } from "next/server";
import { getDynamicJson } from "@/lib/travelDataCache";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const slides = await getDynamicJson<any[]>("hero-slides.json", []);

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
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
      },
    }
  );
}
