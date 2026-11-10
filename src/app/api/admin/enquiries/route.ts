import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getAdminSessionFromCookies } from "@/lib/adminAuth";

const ENQUIRIES_FILE_PATH = path.join(
  process.cwd(),
  "src",
  "app",
  "travel",
  "data",
  "enquiries.json"
);

export async function GET() {
  const session = await getAdminSessionFromCookies();
  if (!session.authenticated) {
    return NextResponse.json({ success: false, error: "Unauthorized access." }, { status: 401 });
  }

  try {
    if (!fs.existsSync(ENQUIRIES_FILE_PATH)) {
      return NextResponse.json({ success: true, enquiries: [] });
    }
    const content = fs.readFileSync(ENQUIRIES_FILE_PATH, "utf-8");
    const enquiries = JSON.parse(content);
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

    if (!fs.existsSync(ENQUIRIES_FILE_PATH)) {
      return NextResponse.json({ success: false, error: "No enquiries found." }, { status: 404 });
    }

    const content = fs.readFileSync(ENQUIRIES_FILE_PATH, "utf-8");
    const enquiries = JSON.parse(content);

    const index = enquiries.findIndex((e: any) => e.id === id);
    if (index === -1) {
      return NextResponse.json({ success: false, error: "Enquiry not found." }, { status: 404 });
    }

    enquiries[index].status = status;
    fs.writeFileSync(ENQUIRIES_FILE_PATH, JSON.stringify(enquiries, null, 2), "utf-8");

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

    if (!fs.existsSync(ENQUIRIES_FILE_PATH)) {
      return NextResponse.json({ success: false, error: "No enquiries database." }, { status: 404 });
    }

    const content = fs.readFileSync(ENQUIRIES_FILE_PATH, "utf-8");
    let enquiries = JSON.parse(content);

    const initialLength = enquiries.length;
    enquiries = enquiries.filter((e: any) => e.id !== id);

    if (enquiries.length === initialLength) {
      return NextResponse.json({ success: false, error: "Enquiry not found." }, { status: 404 });
    }

    fs.writeFileSync(ENQUIRIES_FILE_PATH, JSON.stringify(enquiries, null, 2), "utf-8");
    return NextResponse.json({ success: true, message: "Enquiry deleted successfully." });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete enquiry." }, { status: 500 });
  }
}
