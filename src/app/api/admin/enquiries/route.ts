import { NextRequest, NextResponse } from "next/server";
import { getAdminSessionFromCookies } from "@/lib/adminAuth";
import { getCachedJson, writeCachedJson } from "@/lib/travelDataCache";

export async function GET() {
  const session = await getAdminSessionFromCookies();
  if (!session.authenticated) {
    return NextResponse.json({ success: false, error: "Unauthorized access." }, { status: 401 });
  }

  try {
    const enquiries = getCachedJson<any[]>("enquiries.json", []);
    return NextResponse.json({ success: true, enquiries });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to read enquiries." }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const session = await getAdminSessionFromCookies();
  if (!session.authenticated) {
    return NextResponse.json({ success: false, error: "Unauthorized access." }, { status: 401 });
  }

  try {
    const { id, status } = await req.json();
    if (!id || !status) {
      return NextResponse.json({ success: false, error: "Missing enquiry id or status." }, { status: 400 });
    }

    const enquiries = getCachedJson<any[]>("enquiries.json", []);
    const index = enquiries.findIndex((e: any) => e.id === id);
    if (index === -1) {
      return NextResponse.json({ success: false, error: "Enquiry not found." }, { status: 404 });
    }

    enquiries[index].status = status;
    writeCachedJson("enquiries.json", enquiries);

    return NextResponse.json({ success: true, enquiry: enquiries[index] });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update enquiry status." }, { status: 500 });
  }
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
      return NextResponse.json({ success: false, error: "Missing enquiry id parameter." }, { status: 400 });
    }

    let enquiries = getCachedJson<any[]>("enquiries.json", []);
    const initialLength = enquiries.length;
    enquiries = enquiries.filter((e: any) => e.id !== id);

    if (enquiries.length === initialLength) {
      return NextResponse.json({ success: false, error: "Enquiry not found." }, { status: 404 });
    }

    writeCachedJson("enquiries.json", enquiries);
    return NextResponse.json({ success: true, message: "Enquiry deleted successfully." });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete enquiry." }, { status: 500 });
  }
}
