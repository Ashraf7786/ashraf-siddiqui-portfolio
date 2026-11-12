import { NextRequest, NextResponse } from "next/server";
import { getAdminSessionFromCookies } from "@/lib/adminAuth";
import { getDynamicJson, writeCachedJsonAsync } from "@/lib/travelDataCache";
import { TRAVEL_STORIES, TravelStory, StorySection } from "@/app/travel/data/stories";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const session = await getAdminSessionFromCookies();
  if (!session.authenticated) {
    return NextResponse.json({ success: false, error: "Unauthorized access." }, { status: 401 });
  }

  const stories = await getDynamicJson<TravelStory[]>("stories.json", TRAVEL_STORIES);
  return NextResponse.json(
    { success: true, count: stories.length, stories },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
      },
    }
  );
}

export async function POST(req: NextRequest) {
  const session = await getAdminSessionFromCookies();
  if (!session.authenticated) {
    return NextResponse.json({ success: false, error: "Unauthorized. Admin session required." }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { stories } = body;

    if (!Array.isArray(stories)) {
      return NextResponse.json(
        { success: false, error: "Stories must be an array." },
        { status: 400 }
      );
    }

    const sanitizedStories: TravelStory[] = stories.map((story: any, idx: number) => {
      if (!story.title || typeof story.title !== "string" || !story.title.trim()) {
        throw new Error(`Story #${idx + 1} is missing a title.`);
      }

      const generatedSlug = story.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      const sanitizedSections: StorySection[] = Array.isArray(story.sections)
        ? story.sections.map((sec: any, secIdx: number) => {
            const rawContent = sec.content;
            let contentArray: string[] = [];
            if (Array.isArray(rawContent)) {
              contentArray = rawContent.map((c) => String(c).trim()).filter(Boolean);
            } else if (typeof rawContent === "string") {
              contentArray = rawContent
                .split("\n\n")
                .map((p) => p.trim())
                .filter(Boolean);
            }
            return {
              id: String(sec.id || `section-${secIdx + 1}`).trim(),
              heading: String(sec.heading || "").trim(),
              content: contentArray.length > 0 ? contentArray : ["Story section details."],
              image: sec.image ? String(sec.image).trim() : undefined,
              caption: sec.caption ? String(sec.caption).trim() : undefined,
              quote: sec.quote ? String(sec.quote).trim() : undefined,
              callout: sec.callout ? String(sec.callout).trim() : undefined,
            };
          })
        : [];

      return {
        id: String(story.id || `story-${Date.now()}-${idx}`).trim(),
        slug: String(story.slug || generatedSlug || `story-${idx + 1}`).trim(),
        title: String(story.title).trim(),
        subtitle: String(story.subtitle || "").trim(),
        destination: String(story.destination || "India").trim(),
        destinationSlug: String(story.destinationSlug || story.destination?.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "india").trim(),
        state: String(story.state || "").trim(),
        year: String(story.year || story.publishedYear || new Date().getFullYear()).trim(),
        publishedAt: String(story.publishedAt || story.publishedDate || "February 2026").trim(),
        readTime: String(story.readTime || "5 min read").trim(),
        tagColor: String(story.tagColor || "bg-sky-500/20 text-sky-300 border-sky-500/30").trim(),
        category: (story.category || "Mountain Stories") as TravelStory["category"],
        coverImage: String(story.coverImage || "/img/travel/kashmir_hero.jpg").trim(),
        author: {
          name: String(story.author?.name || "Ashraf Siddiqui").trim(),
          role: String(story.author?.role || "Solo Explorer & Storyteller").trim(),
          avatar: String(story.author?.avatar || "/img/travel/kashmir_hero.jpg").trim(),
          bio: String(story.author?.bio || "Solo explorer traversing 28 states of India.").trim(),
        },
        tags: Array.isArray(story.tags)
          ? story.tags.map((t: string) => String(t).trim()).filter(Boolean)
          : typeof story.tags === "string"
          ? (story.tags as string).split(",").map((t) => t.trim()).filter(Boolean)
          : ["Travel", "India"],
        excerpt: String(story.excerpt || story.subtitle || "").trim(),
        sections: sanitizedSections.length > 0 ? sanitizedSections : [
          {
            id: "dispatch-1",
            heading: "1. The Journey Begins",
            content: ["Early morning departure into uncharted terrain."],
          }
        ],
        relatedGuideSlug: story.relatedGuideSlug ? String(story.relatedGuideSlug).trim() : undefined,
        relatedStoriesSlugs: Array.isArray(story.relatedStoriesSlugs)
          ? story.relatedStoriesSlugs.map((s: string) => String(s).trim()).filter(Boolean)
          : undefined,
      };
    });

    const success = await writeCachedJsonAsync("stories.json", sanitizedStories);
    if (!success) {
      return NextResponse.json(
        { success: false, error: "Failed to persist stories.json to storage." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Successfully published ${sanitizedStories.length} travel stories.`,
      stories: sanitizedStories,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || "Internal server error saving stories." },
      { status: 500 }
    );
  }
}
