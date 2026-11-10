import { NextRequest, NextResponse } from "next/server";
import { getAdminSessionFromCookies } from "@/lib/adminAuth";
import { getCachedJson, writeCachedJson } from "@/lib/travelDataCache";
import { TRAVEL_REELS } from "@/app/travel/data/reels";

export async function GET() {
  const session = await getAdminSessionFromCookies();
  if (!session.authenticated) {
    return NextResponse.json({ success: false, error: "Unauthorized access." }, { status: 401 });
  }

  const reels = getCachedJson("reels.json", TRAVEL_REELS);
  return NextResponse.json({ success: true, count: reels.length, reels });
}

export async function POST(req: NextRequest) {
  const session = await getAdminSessionFromCookies();
  if (!session.authenticated) {
    return NextResponse.json({ success: false, error: "Unauthorized. Admin session required." }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { reels } = body;

    if (!Array.isArray(reels)) {
      return NextResponse.json(
        { success: false, error: "Reels must be an array." },
        { status: 400 }
      );
    }

    const sanitizedReels = reels.map((reel, idx) => {
      if (!reel.title) {
        throw new Error(`Reel #${idx + 1} is missing a title.`);
      }

      return {
        id: String(reel.id || `reel-${Date.now()}-${idx}`).trim(),
        slug: String(reel.slug || reel.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")).trim(),
        title: String(reel.title).trim(),
        caption: String(reel.caption || "").trim(),
        destination: String(reel.destination || "").trim(),
        destinationSlug: String(reel.destinationSlug || "").trim(),
        state: String(reel.state || "").trim(),
        category: String(reel.category || "Road Adventures").trim(),
        localVideoUrl: String(reel.localVideoUrl || reel.videoUrl || "/videos/reels/travelashraf1.mp4").trim(),
        posterUrl: String(reel.posterUrl || "/img/travel/kashmir_hero.jpg").trim(),
        videoUrl: String(reel.videoUrl || reel.localVideoUrl || "/videos/reels/travelashraf1.mp4").trim(),
        duration: String(reel.duration || "0:45").trim(),
        views: String(reel.views || "10K").trim(),
        likes: Number(reel.likes) || 1000,
        commentsCount: Number(reel.commentsCount) || 50,
        soundtrack: String(reel.soundtrack || "Original Audio · ashraf._siddiqui").trim(),
        locationName: String(reel.locationName || "").trim(),
        publishedDate: String(reel.publishedDate || "2026").trim(),
        tags: Array.isArray(reel.tags)
          ? reel.tags.map((t: string) => String(t).trim()).filter(Boolean)
          : typeof reel.tags === "string"
          ? (reel.tags as string).split(",").map((t) => t.trim()).filter(Boolean)
          : [],
        relatedGuideSlug: String(reel.relatedGuideSlug || "").trim(),
        instagramHandle: String(reel.instagramHandle || "@ashraf._siddiqui").trim(),
      };
    });

    const saved = writeCachedJson("reels.json", sanitizedReels);
    if (!saved) throw new Error("Disk write failed.");

    return NextResponse.json({
      success: true,
      message: `Successfully saved ${sanitizedReels.length} reels.`,
      reels: sanitizedReels,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to save reels." },
      { status: 500 }
    );
  }
}
