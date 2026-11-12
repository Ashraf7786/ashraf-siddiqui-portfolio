import { NextRequest, NextResponse } from "next/server";
import { getAdminSessionFromCookies } from "@/lib/adminAuth";
import { getDynamicJson, writeCachedJsonAsync } from "@/lib/travelDataCache";
import { INDIA_STATES_DATA, IndiaStateData } from "@/app/travel/data/indiaStates";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const session = await getAdminSessionFromCookies();
  if (!session.authenticated) {
    return NextResponse.json({ success: false, error: "Unauthorized access." }, { status: 401 });
  }

  const states = await getDynamicJson<Record<string, IndiaStateData>>("states.json", INDIA_STATES_DATA);
  return NextResponse.json(
    { success: true, count: Object.keys(states).length, states },
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
    const { states } = body;

    if (!states || typeof states !== "object") {
      return NextResponse.json(
        { success: false, error: "States payload must be an object map." },
        { status: 400 }
      );
    }

    const current = await getDynamicJson<Record<string, IndiaStateData>>("states.json", INDIA_STATES_DATA);
    const sanitized: Record<string, IndiaStateData> = {};

    Object.keys(states).forEach((key) => {
      const s = states[key];
      const fallback = current[key] || INDIA_STATES_DATA[key];
      if (!s) return;

      sanitized[key] = {
        id: String(s.id || key).trim(),
        name: String(s.name || fallback?.name || key).trim(),
        isUT: Boolean(s.isUT ?? fallback?.isUT),
        visited: Boolean(s.visited),
        capital: String(s.capital || fallback?.capital || "").trim(),
        region: s.region || fallback?.region || "North",
        color: s.color || fallback?.color || "#38bdf8",
        visitedYear: s.visitedYear ? String(s.visitedYear).trim() : undefined,
        citiesExplored: Array.isArray(s.citiesExplored)
          ? s.citiesExplored.map((c: string) => String(c).trim()).filter(Boolean)
          : typeof s.citiesExplored === "string"
          ? (s.citiesExplored as string).split(",").map((c) => c.trim()).filter(Boolean)
          : fallback?.citiesExplored || [],
        highlights: Array.isArray(s.highlights)
          ? s.highlights.map((h: string) => String(h).trim()).filter(Boolean)
          : typeof s.highlights === "string"
          ? (s.highlights as string).split(",").map((h) => h.trim()).filter(Boolean)
          : fallback?.highlights || [],
        topPlacesToVisit: Array.isArray(s.topPlacesToVisit)
          ? s.topPlacesToVisit.map((p: string) => String(p).trim()).filter(Boolean)
          : typeof s.topPlacesToVisit === "string"
          ? (s.topPlacesToVisit as string).split("\n").map((p) => p.trim()).filter(Boolean)
          : fallback?.topPlacesToVisit || [],
        notes: String(s.notes || fallback?.notes || "").trim(),
        coverImage: String(s.coverImage || fallback?.coverImage || "/img/travel/kashmir_hero.jpg").trim(),
      };
    });

    const success = await writeCachedJsonAsync("states.json", sanitized);
    if (!success) {
      return NextResponse.json(
        { success: false, error: "Failed to persist states.json to storage." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Successfully published state journey map data.",
      states: sanitized,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || "Internal server error saving states." },
      { status: 500 }
    );
  }
}
