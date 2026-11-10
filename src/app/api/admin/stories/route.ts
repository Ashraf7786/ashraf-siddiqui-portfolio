import { NextRequest, NextResponse } from "next/server";
import { getAdminSessionFromCookies } from "@/lib/adminAuth";
import { getCachedJson, writeCachedJson } from "@/lib/travelDataCache";
import { TRAVEL_STORIES, TravelStory, StorySection } from "@/app/travel/data/stories";

export async function GET() {
  const session = await getAdminSessionFromCookies();
  if (!session.authenticated) {
    return NextResponse.json({ success: false, error: "Unauthorized access." }, { status: 401 });
  }

  const stories = getCachedJson<TravelStory[]>("stories.json", TRAVEL_STORIES);
  return NextResponse.json({ success: true, count: stories.length, stories });
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
                .split(/\n\n+/)
                .map((c) => c.trim())
                .filter(Boolean);
            }

            return {
              id: String(sec.id || `sec-${secIdx + 1}`).trim(),
              heading: String(sec.heading || `Section ${secIdx + 1}`).trim(),
              subheading: sec.subheading ? String(sec.subheading).trim() : undefined,
              content: contentArray.length > 0 ? contentArray : ["Story dispatch section content..."],
              quote: sec.quote ? String(sec.quote).trim() : undefined,
              image: sec.image && sec.image.src ? {
                src: String(sec.image.src).trim(),
                caption: String(sec.image.caption || "").trim(),
                alt: String(sec.image.alt || sec.heading || "Travel story illustration").trim(),
              } : undefined,
              fieldNote: sec.fieldNote && (sec.fieldNote.title || sec.fieldNote.text) ? {
                title: String(sec.fieldNote.title || "Field Note").trim(),
                text: String(sec.fieldNote.text || "").trim(),
              } : undefined,
            };
          })
        : [];

      return {
        id: String(story.id || `story-${Date.now()}-${idx}`).trim(),
        slug: String(story.slug || generatedSlug).trim(),
        title: String(story.title).trim(),
        subtitle: String(story.subtitle || "").trim(),
        category: (["Mountain Stories", "Road Adventures", "Hidden India", "Rail Diaries", "Northeast Trails"].includes(story.category)
          ? story.category
          : "Mountain Stories") as any,
        destination: String(story.destination || "Himalayas").trim(),
        destinationSlug: String(story.destinationSlug || story.destination?.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "india").trim(),
        state: String(story.state || "").trim(),
        year: String(story.year || "2026").trim(),
        publishedAt: String(story.publishedAt || "Recently Published").trim(),
        readTime: String(story.readTime || "5 min read").trim(),
        author: {
          name: String(story.author?.name || "Ashraf Siddiqui").trim(),
          role: String(story.author?.role || "Solo Explorer & Storyteller").trim(),
          avatar: String(story.author?.avatar || "/img/travel/kashmir_hero.jpg").trim(),
          bio: String(story.author?.bio || "24 states explored across India. Documenting raw mountain passes, ancient trails, and local lives.").trim(),
        },
        coverImage: String(story.coverImage || "/img/travel/kashmir_hero.jpg").trim(),
        tagColor: String(story.tagColor || "#38bdf8").trim(),
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

    const success = writeCachedJson("stories.json", sanitizedStories);
    if (!success) {
      return NextResponse.json(
        { success: false, error: "Failed to persist stories.json to disk." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Successfully published ${sanitizedStories.length} travel stories to disk cache.`,
      stories: sanitizedStories,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || "Internal server error saving stories." },
      { status: 500 }
    );
  }
}
