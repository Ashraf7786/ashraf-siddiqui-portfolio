import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { getAdminSessionFromCookies } from "@/lib/adminAuth";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const session = await getAdminSessionFromCookies();
    if (!session.authenticated) {
      return NextResponse.json({ success: false, error: "Unauthorized access" }, { status: 401 });
    }

    const formData = await req.formData();
    // Support single 'file' or multiple 'files'
    const files = formData.getAll("files") as File[];
    const singleFile = formData.get("file") as File | null;
    const allFiles = files.length > 0 ? files : singleFile ? [singleFile] : [];
    const folder = (formData.get("folder") as string) || "ashraf-travel/gallery";

    if (allFiles.length === 0) {
      return NextResponse.json({ success: false, error: "No files provided" }, { status: 400 });
    }

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    const hasCloudinary = Boolean(cloudName && apiKey && apiSecret);

    if (hasCloudinary) {
      cloudinary.config({
        cloud_name: cloudName,
        api_key: apiKey,
        api_secret: apiSecret,
        secure: true,
      });
    }

    const uploadedResults = [];

    for (const file of allFiles) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const cleanOriginalName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");

      if (hasCloudinary) {
        try {
          const uploadResult = await new Promise<UploadApiResponse>((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              {
                folder,
                resource_type: "auto",
              },
              (error, result) => {
                if (error || !result) reject(error || new Error("Cloudinary upload failed"));
                else resolve(result);
              }
            );
            stream.end(buffer);
          });

          uploadedResults.push({
            url: uploadResult.secure_url,
            publicId: uploadResult.public_id,
            format: uploadResult.format,
            width: uploadResult.width,
            height: uploadResult.height,
            orientation: (uploadResult.width >= uploadResult.height ? "landscape" : "portrait") as "landscape" | "portrait",
            bytes: uploadResult.bytes,
            originalName: file.name,
          });
          continue;
        } catch (cloudErr) {
          console.warn("Cloudinary upload failed, falling back to local storage:", cloudErr);
          // Fall through to local storage
        }
      }

      // Local storage fallback in public/img/travel/uploads
      const uploadDir = path.join(process.cwd(), "public", "img", "travel", "uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const uniqueFileName = `${Date.now()}-${cleanOriginalName}`;
      const filePath = path.join(uploadDir, uniqueFileName);
      await fs.promises.writeFile(filePath, buffer);

      const localUrl = `/img/travel/uploads/${uniqueFileName}`;
      uploadedResults.push({
        url: localUrl,
        publicId: uniqueFileName,
        format: path.extname(cleanOriginalName).replace(".", "") || "jpg",
        width: 1920,
        height: 1080,
        orientation: "landscape" as const,
        bytes: buffer.length,
        originalName: file.name,
      });
    }

    // Return format supporting both single and multi-file callers
    const first = uploadedResults[0];
    return NextResponse.json({
      success: true,
      count: uploadedResults.length,
      files: uploadedResults,
      // Backwards compatibility for single-upload callers
      url: first?.url,
      publicId: first?.publicId,
      format: first?.format,
      width: first?.width,
      height: first?.height,
      orientation: first?.orientation,
      bytes: first?.bytes,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        error: err?.message || "Failed to upload file(s)",
      },
      { status: 500 }
    );
  }
}
