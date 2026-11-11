import fs from "fs";
import path from "path";
import os from "os";

interface CacheEntry<T> {
  data: T;
  mtimeMs: number;
}

const cacheStore = new Map<string, CacheEntry<any>>();

function getPaths(fileName: string) {
  const localDir = path.join(process.cwd(), "src", "app", "travel", "data");
  const localFile = path.join(localDir, fileName);
  const localBackup = path.join(localDir, fileName.replace(/\.json$/, ".backup.json"));

  const tmpDir = path.join(os.tmpdir(), "ashraf-travel-data");
  const tmpFile = path.join(tmpDir, fileName);

  return { localDir, localFile, localBackup, tmpDir, tmpFile };
}

export function getCachedJson<T>(fileName: string, fallback: T): T {
  const { localFile, tmpFile } = getPaths(fileName);

  try {
    // 1. Check in-memory cache first (fastest)
    const cached = cacheStore.get(fileName);
    if (cached) {
      return cached.data as T;
    }

    // 2. Check /tmp filesystem (active on serverless/Vercel)
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
    console.info(`[DataCache] Standard filesystem read-only (${err?.code || err?.message}). Falling back to /tmp and memory.`);
  }

  // 2. If local filesystem was read-only, write to serverless /tmp
  if (!writeSucceeded) {
    try {
      if (!fs.existsSync(tmpDir)) {
        fs.mkdirSync(tmpDir, { recursive: true });
      }
      fs.writeFileSync(tmpFile, jsonStr, "utf-8");
      writeSucceeded = true;
    } catch (tmpErr) {
      console.warn(`[DataCache] /tmp write failed for ${fileName}:`, tmpErr);
    }
  }

  // 3. Always update in-memory cache so subsequent requests in this runtime see the updated data
  cacheStore.set(fileName, {
    data,
    mtimeMs: Date.now(),
  });

  return true;
}
