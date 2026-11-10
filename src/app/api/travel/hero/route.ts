import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_FILE_PATH = path.join(
  process.cwd(),
  "src",
  "app",
  "travel",
  "data",
  "hero-slides.json"
);

export async function GET() {
  try {
    if (!fs.existsSync(DATA_FILE_PATH)) {
      return NextResponse.json(
        { success: false, error: "Slides database not initialized." },
        { status: 404 }
      );
    }

    const fileContent = fs.readFileSync(DATA_FILE_PATH, "utf-8");
    const slides = JSON.parse(fileContent);

    // Filter active slides and sort by sortOrder
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
          "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60",
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to read hero slides." },
      { status: 500 }
    );
  }
}

