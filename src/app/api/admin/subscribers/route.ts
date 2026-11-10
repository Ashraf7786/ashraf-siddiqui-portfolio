import { NextRequest, NextResponse } from "next/server";
import { getAdminSessionFromCookies } from "@/lib/adminAuth";
import { getCachedJson, writeCachedJson } from "@/lib/travelDataCache";
import { NewsletterSubscriber } from "@/app/api/travel/newsletter/route";

export async function GET() {
  const session = await getAdminSessionFromCookies();
  if (!session.authenticated) {
    return NextResponse.json({ success: false, error: "Unauthorized access." }, { status: 401 });
  }

  const subscribers = getCachedJson<NewsletterSubscriber[]>("subscribers.json", []);
  return NextResponse.json({ success: true, count: subscribers.length, subscribers });
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

    const subscribers = getCachedJson<NewsletterSubscriber[]>("subscribers.json", []);
    const updated = subscribers.filter((s) => s.id !== id);
    writeCachedJson("subscribers.json", updated);

    return NextResponse.json({ success: true, message: "Subscriber removed." });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message }, { status: 500 });
  }
}

