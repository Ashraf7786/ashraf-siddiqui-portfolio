import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getAdminSessionFromCookies } from "@/lib/adminAuth";

const DATA_FILE_PATH = path.join(
  process.cwd(),
  "src",
  "app",
  "travel",
  "data",
  "hero-slides.json"
);

const BACKUP_FILE_PATH = path.join(
  process.cwd(),
  "src",
  "app",
  "travel",
  "data",
  "hero-slides.backup.json"
);

// GET: Fetch all slides (including inactive) for admin editor
export async function GET() {
  const session = await getAdminSessionFromCookies();
  if (!session.authenticated) {
    return NextResponse.json({ success: false, error: "Unauthorized access." }, { status: 401 });
  }

  try {
    if (!fs.existsSync(DATA_FILE_PATH)) {
      return NextResponse.json({ success: false, error: "Database file not found." }, { status: 404 });
    }

    const content = fs.readFileSync(DATA_FILE_PATH, "utf-8");
    const slides = JSON.parse(content);

    return NextResponse.json({
      success: true,
      slides,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to read slides." }, { status: 500 });
  }
}

// POST: Save updated slides array with strict validation
export async function POST(req: NextRequest) {
  const session = await getAdminSessionFromCookies();
  if (!session.authenticated) {
    return NextResponse.json({ success: false, error: "Unauthorized. Admin session required." }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { slides } = body;

    if (!Array.isArray(slides) || slides.length === 0) {
      return NextResponse.json(
        { success: false, error: "Slides must be a non-empty array." },
        { status: 400 }
      );
    }

    // Input validation & sanitization
    const sanitizedSlides = slides.map((slide, idx) => {
      if (!slide.titleLine1 || !slide.titleLine2) {
        throw new Error(`Slide #${idx + 1} is missing title lines.`);
      }

      return {
        id: String(slide.id || `slide-${Date.now()}-${idx}`).trim(),
        tripSlug: String(slide.tripSlug || "").trim(),
        badgeLabel: String(slide.badgeLabel || "Expedition Announcement").trim(),
        titleLine1: String(slide.titleLine1).trim(),
        titleLine2: String(slide.titleLine2).trim(),
        subtitle: String(slide.subtitle || "").trim(),
        posterImage: String(slide.posterImage || "/img/travel/kashmir_hero.jpg").trim(),
        imageAlt: String(slide.imageAlt || slide.titleLine1).trim(),
        videoUrl: slide.videoUrl ? String(slide.videoUrl).trim() : undefined,
        metrics: Array.isArray(slide.metrics)
          ? slide.metrics.map((m: { label: string; value: string; highlight?: boolean }) => ({
              label: String(m.label || "").trim(),
              value: String(m.value || "").trim(),
              highlight: Boolean(m.highlight),
            }))
          : [],
        primaryCta: {
          label: String(slide.primaryCta?.label || "View Trip Details & Reserve").trim(),
          action: String(slide.primaryCta?.action || "openModal").trim(),
          target: String(slide.primaryCta?.target || "").trim(),
        },
        secondaryCta: {
          label: String(slide.secondaryCta?.label || "Explore All Expeditions").trim(),
          action: String(slide.secondaryCta?.action || "scroll").trim(),
          target: String(slide.secondaryCta?.target || "#group-tours").trim(),
        },
        isActive: slide.isActive !== false,
        sortOrder: typeof slide.sortOrder === "number" ? slide.sortOrder : idx + 1,
      };
    });

    // Create a safety backup of existing file
    if (fs.existsSync(DATA_FILE_PATH)) {
      try {
        fs.copyFileSync(DATA_FILE_PATH, BACKUP_FILE_PATH);
      } catch {
        // Backup failure is non-fatal
      }
    }

    // Write sanitized JSON atomically
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(sanitizedSlides, null, 2), "utf-8");

    return NextResponse.json({
      success: true,
      message: "Hero banner slides updated successfully.",
      count: sanitizedSlides.length,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Validation or file writing error.";
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}

