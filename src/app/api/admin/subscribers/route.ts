import { NextRequest, NextResponse } from "next/server";
import { getAdminSessionFromCookies } from "@/lib/adminAuth";
import { getDynamicJson, writeCachedJsonAsync } from "@/lib/travelDataCache";
import { NewsletterSubscriber } from "@/app/api/travel/newsletter/route";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const session = await getAdminSessionFromCookies();
  if (!session.authenticated) {
    return NextResponse.json({ success: false, error: "Unauthorized access." }, { status: 401 });
  }

  const subscribers = await getDynamicJson<NewsletterSubscriber[]>("subscribers.json", []);
  return NextResponse.json(
    { success: true, count: subscribers.length, subscribers },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
      },
    }
  );
}

export async function DELETE(req: NextRequest) {
  const session = await getAdminSessionFromCookies();
  if (!session.authenticated) {
    return NextResponse.json({ success: false, error: "Unauthorized access." }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Subscriber ID is required." }, { status: 400 });
    }

    const subscribers = await getDynamicJson<NewsletterSubscriber[]>("subscribers.json", []);
    const updated = subscribers.filter((s) => s.id !== id);
    await writeCachedJsonAsync("subscribers.json", updated);

    return NextResponse.json({ success: true, message: "Subscriber removed." });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message }, { status: 500 });
  }
}
