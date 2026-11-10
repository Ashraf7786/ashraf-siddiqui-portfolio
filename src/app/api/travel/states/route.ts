import { NextResponse } from "next/server";
import { getCachedJson } from "@/lib/travelDataCache";
import { INDIA_STATES_DATA, IndiaStateData } from "@/app/travel/data/indiaStates";

export const dynamic = "force-dynamic";

export async function GET() {
  const states = getCachedJson<Record<string, IndiaStateData>>("states.json", INDIA_STATES_DATA);

  const totalStates = 28;
  const totalUTs = 8;
  let visitedStates = 0;
  let visitedUTs = 0;

  Object.values(states).forEach((s) => {
    if (s.visited) {
      if (s.isUT) visitedUTs += 1;
      else visitedStates += 1;
    }
  });

  const summary = {
    totalStates,
    totalUTs,
    visitedStates,
    visitedUTs,
    totalVisited: visitedStates + visitedUTs,
    statesLeft: totalStates - visitedStates,
    percentComplete: Math.round((visitedStates / totalStates) * 100),
  };

  return NextResponse.json(
    { success: true, count: Object.keys(states).length, states, summary },
    {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    }
  );
}
