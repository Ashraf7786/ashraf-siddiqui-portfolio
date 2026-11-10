import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getAdminSessionFromCookies } from "@/lib/adminAuth";
import { TRAVEL_PHOTOS } from "@/app/travel/data/gallery";

const DATA_FILE_PATH = path.join(
  process.cwd(),
  "src",
  "app",
  "travel",
  "data",
  "gallery.json"
);

const BACKUP_FILE_PATH = path.join(
  process.cwd(),
  "src",
  "app",
  "travel",
  "data",
  "gallery.backup.json"
);

export async function GET() {
  const session = await getAdminSessionFromCookies();
  if (!session.authenticated) {
    return NextResponse.json({ success: false, error: "Unauthorized access." }, { status: 401 });
  }

  try {
    if (!fs.existsSync(DATA_FILE_PATH)) {
      return NextResponse.json({ success: true, photos: TRAVEL_PHOTOS });
    }
    const content = fs.readFileSync(DATA_FILE_PATH, "utf-8");
    const photos = JSON.parse(content);
    return NextResponse.json({ success: true, photos });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to read gallery." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getAdminSessionFromCookies();
  if (!session.authenticated) {
    return NextResponse.json({ success: false, error: "Unauthorized. Admin session required." }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { photos } = body;

    if (!Array.isArray(photos)) {
      return NextResponse.json(
        { success: false, error: "Photos must be an array." },
        { status: 400 }
      );
    }

    const sanitizedPhotos = photos.map((photo, idx) => {
      if (!photo.title || !photo.src) {
        throw new Error(`Photo #${idx + 1} is missing title or image URL.`);
      }

      return {
        id: String(photo.id || `g-${Date.now()}-${idx}`).trim(),
        src: String(photo.src).trim(),
        alt: String(photo.alt || photo.title).trim(),
        title: String(photo.title).trim(),
        location: String(photo.location || "").trim(),
        state: String(photo.state || "").trim(),
        year: Number(photo.year) || new Date().getFullYear(),
        category: String(photo.category || "Mountains").trim(),
        orientation: (["landscape", "portrait", "square"].includes(photo.orientation)
          ? photo.orientation
          : "landscape") as "landscape" | "portrait" | "square",
        tags: Array.isArray(photo.tags)
          ? photo.tags.map((t: string) => String(t).trim()).filter(Boolean)
          : typeof photo.tags === "string"
          ? (photo.tags as string).split(",").map((t) => t.trim()).filter(Boolean)
          : [],
        notes: String(photo.notes || "").trim(),
      };
    });

    if (fs.existsSync(DATA_FILE_PATH)) {
      fs.copyFileSync(DATA_FILE_PATH, BACKUP_FILE_PATH);
    }

    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(sanitizedPhotos, null, 2), "utf-8");

    return NextResponse.json({
      success: true,
      message: `Successfully saved ${sanitizedPhotos.length} gallery photos.`,
      photos: sanitizedPhotos,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to save gallery." },
      { status: 500 }
    );
  }
}
