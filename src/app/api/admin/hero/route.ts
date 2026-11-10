import { NextRequest, NextResponse } from "next/server";
import { getAdminSessionFromCookies } from "@/lib/adminAuth";
import { getCachedJson, writeCachedJson } from "@/lib/travelDataCache";

export async function GET() {
  const session = await getAdminSessionFromCookies();
  if (!session.authenticated) {
    return NextResponse.json({ success: false, error: "Unauthorized access." }, { status: 401 });
  }

  const slides = getCachedJson<any[]>("hero-slides.json", []);
  return NextResponse.json({ success: true, count: slides.length, slides });
}

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

    const sanitizedSlides = slides.map((slide, idx) => {
      const mediaType = slide.mediaType === "photo" ? "photo" : slide.mediaType === "video" ? "video" : (slide.videoUrl ? "video" : "photo");

      return {
        id: String(slide.id || `slide-${Date.now()}-${idx}`).trim(),
        tripSlug: String(slide.tripSlug || "").trim(),
        mediaType,
        badgeLabel: String(slide.badgeLabel || "").trim(),
        eyebrow: slide.eyebrow !== undefined ? String(slide.eyebrow).trim() : "ASHRAF SIDDIQUI · SOLO TRAVELLER · JAIPUR, INDIA",
        titleLine1: String(slide.titleLine1 || "").trim(),
        titleLine2: String(slide.titleLine2 || "").trim(),
        subtitle: String(slide.subtitle || "").trim(),
        posterImage: String(slide.posterImage || "/img/travel/kashmir_hero.jpg").trim(),
        imageAlt: String(slide.imageAlt || slide.titleLine1 || "Expedition Banner").trim(),
        videoUrl: mediaType === "video" && slide.videoUrl ? String(slide.videoUrl).trim() : undefined,
        metrics: Array.isArray(slide.metrics)
          ? slide.metrics
              .filter((m: any) => m && (m.label || m.value))
              .map((m: { label: string; value: string; highlight?: boolean }) => ({
                label: String(m.label || "").trim(),
                value: String(m.value || "").trim(),
                highlight: Boolean(m.highlight),
              }))
          : [],
        primaryCta: {
          enabled: slide.primaryCta?.enabled !== false,
          label: String(slide.primaryCta?.label || "").trim(),
          action: String(slide.primaryCta?.action || "openModal").trim(),
          target: String(slide.primaryCta?.target || "").trim(),
        },
        secondaryCta: {
          enabled: slide.secondaryCta?.enabled !== false,
          label: String(slide.secondaryCta?.label || "").trim(),
          action: String(slide.secondaryCta?.action || "scroll").trim(),
          target: String(slide.secondaryCta?.target || "#group-tours").trim(),
        },
        isActive: slide.isActive !== false,
        sortOrder: typeof slide.sortOrder === "number" ? slide.sortOrder : idx + 1,
      };
    });

    const saved = writeCachedJson("hero-slides.json", sanitizedSlides);
    if (!saved) throw new Error("Disk write failed.");

    return NextResponse.json({
      success: true,
      message: `Successfully saved ${sanitizedSlides.length} banner slides.`,
      slides: sanitizedSlides,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to save slides." },
      { status: 500 }
    );
  }
}
