import fs from "fs";
import path from "path";
import os from "os";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "kswonkd9",
  api_key: process.env.CLOUDINARY_API_KEY || "138494445658319",
  api_secret: process.env.CLOUDINARY_API_SECRET || "9TQ-eIYlXiYgjw96W0o6xL7MRI4",
});

interface CacheEntry<T> {
  data: T;
  mtimeMs: number;
}

const cacheStore = new Map<string, CacheEntry<any>>();

function getCloudName(): string {
  return process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "kswonkd9";
}

function getPaths(fileName: string) {
  const localDir = path.join(process.cwd(), "src", "app", "travel", "data");
  const localFile = path.join(localDir, fileName);
  const localBackup = path.join(localDir, fileName.replace(/\.json$/, ".backup.json"));

  const tmpDir = path.join(os.tmpdir(), "ashraf-travel-data");
  const tmpFile = path.join(tmpDir, fileName);

  return { localDir, localFile, localBackup, tmpDir, tmpFile };
}

/**
 * Upload JSON directly to Cloudinary raw storage.
 * This guarantees data persistence across all serverless lambda instances and cold starts on Vercel.
 */
export async function uploadToCloudinaryRaw(fileName: string, jsonStr: string): Promise<boolean> {
  try {
    const base64Data = "data:application/json;base64," + Buffer.from(jsonStr, "utf-8").toString("base64");
    await cloudinary.uploader.upload(base64Data, {
      resource_type: "raw",
      public_id: `travel-data/${fileName}`,
      overwrite: true,
      invalidate: true,
    });
    return true;
  } catch (err: any) {
    console.warn(`[DataCache] Cloudinary raw upload failed for ${fileName}:`, err?.message || err);
    return false;
  }
}

/**
 * Fetch the latest JSON from Cloudinary raw storage with cache-busting.
 */
export async function fetchFromCloudinaryRaw<T>(fileName: string): Promise<T | null> {
  try {
    const cloudName = getCloudName();
    const url = `https://res.cloudinary.com/${cloudName}/raw/upload/travel-data/${fileName}?t=${Date.now()}`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);

    const res = await fetch(url, {
      cache: "no-store",
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (res.ok) {
      const data = await res.json();
      return data as T;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Asynchronously retrieve the latest JSON data.
 * Checks fresh in-memory cache first, then Cloudinary global cloud storage, then /tmp, then local disk.
 */
export async function getDynamicJson<T>(fileName: string, fallback: T): Promise<T> {
  const now = Date.now();
  const cached = cacheStore.get(fileName);

  // If memory cache is fresh (less than 3 seconds old), serve it instantly
  if (cached && now - cached.mtimeMs < 3000) {
    return cached.data as T;
  }

  // Check Cloudinary global persistent storage
  const cloudData = await fetchFromCloudinaryRaw<T>(fileName);
  if (cloudData !== null) {
    cacheStore.set(fileName, { data: cloudData, mtimeMs: Date.now() });

    // Also persist to /tmp for local speed
    const { tmpDir, tmpFile } = getPaths(fileName);
    try {
      if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });
      fs.writeFileSync(tmpFile, JSON.stringify(cloudData, null, 2), "utf-8");
    } catch {
      // non-fatal
    }

    return cloudData;
  }

  // Fallback to synchronous cached check
  return getCachedJson(fileName, fallback);
}

/**
 * Synchronous reader: checks in-memory cache, then /tmp, then local file, then fallback.
 */
export function getCachedJson<T>(fileName: string, fallback: T): T {
  const { localFile, tmpFile } = getPaths(fileName);

  try {
    // 1. Check in-memory cache first
    const cached = cacheStore.get(fileName);
    if (cached) {
      return cached.data as T;
    }

    // 2. Check /tmp filesystem (serverless runtime)
    if (fs.existsSync(tmpFile)) {
      try {
        const raw = fs.readFileSync(tmpFile, "utf-8");
        const parsed = JSON.parse(raw);
        const stat = fs.statSync(tmpFile);
        cacheStore.set(fileName, { data: parsed, mtimeMs: stat.mtimeMs });
        return parsed as T;
      } catch (err) {
        console.warn(`[DataCache] Error reading from /tmp for ${fileName}:`, err);
      }
    }

    // 3. Check bundled repository file
    if (fs.existsSync(localFile)) {
      const raw = fs.readFileSync(localFile, "utf-8");
      const parsed = JSON.parse(raw);
      const stat = fs.statSync(localFile);
      cacheStore.set(fileName, { data: parsed, mtimeMs: stat.mtimeMs });
      return parsed as T;
    }

    return fallback;
  } catch (err) {
    console.error(`[DataCache] Error reading ${fileName}:`, err);
    return fallback;
  }
}

/**
 * Write updated data to local disk (if writable), /tmp, in-memory cache,
 * AND upload to Cloudinary so all Vercel serverless containers see the changes instantly.
 */
export function writeCachedJson<T>(fileName: string, data: T, backup = true): boolean {
  const { localFile, localBackup, tmpDir, tmpFile } = getPaths(fileName);
  const jsonStr = JSON.stringify(data, null, 2);
  let writeSucceeded = false;

  // 1. Try writing to local project disk (works on localhost development)
  try {
    if (backup && fs.existsSync(localFile)) {
      try {
        fs.copyFileSync(localFile, localBackup);
      } catch {
        // non-fatal backup error
      }
    }
    fs.writeFileSync(localFile, jsonStr, "utf-8");
    writeSucceeded = true;
  } catch (err: any) {
    // Expected on Vercel / serverless environments where root filesystem is read-only (EROFS)
  }

  // 2. Write to serverless /tmp
  try {
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir, { recursive: true });
    }
    fs.writeFileSync(tmpFile, jsonStr, "utf-8");
    writeSucceeded = true;
  } catch (tmpErr) {
    console.warn(`[DataCache] /tmp write failed for ${fileName}:`, tmpErr);
  }

  // 3. Always update in-memory cache immediately
  cacheStore.set(fileName, {
    data,
    mtimeMs: Date.now(),
  });

  // 4. Asynchronously push to Cloudinary raw storage (fire-and-forget sync)
  uploadToCloudinaryRaw(fileName, jsonStr).catch((err) => {
    console.warn(`[DataCache] Background Cloudinary sync error for ${fileName}:`, err);
  });

  return writeSucceeded;
}

/**
 * Awaitable version of writeCachedJson that guarantees Cloudinary upload completion.
 */
export async function writeCachedJsonAsync<T>(fileName: string, data: T, backup = true): Promise<boolean> {
  const { localFile, localBackup, tmpDir, tmpFile } = getPaths(fileName);
  const jsonStr = JSON.stringify(data, null, 2);

  // 1. Try writing to local project disk
  try {
    if (backup && fs.existsSync(localFile)) {
      try {
        fs.copyFileSync(localFile, localBackup);
      } catch {}
    }
    fs.writeFileSync(localFile, jsonStr, "utf-8");
  } catch {}

  // 2. Write to serverless /tmp
  try {
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir, { recursive: true });
    }
    fs.writeFileSync(tmpFile, jsonStr, "utf-8");
  } catch {}

  // 3. Update memory cache
  cacheStore.set(fileName, {
    data,
    mtimeMs: Date.now(),
  });

  // 4. Await Cloudinary upload
  await uploadToCloudinaryRaw(fileName, jsonStr);

  return true;
}
