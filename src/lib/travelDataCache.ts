import fs from "fs";
import path from "path";

interface CacheEntry<T> {
  data: T;
  mtimeMs: number;
}

const cacheStore = new Map<string, CacheEntry<any>>();

export function getCachedJson<T>(fileName: string, fallback: T): T {
  const filePath = path.join(process.cwd(), "src", "app", "travel", "data", fileName);

  try {
    if (!fs.existsSync(filePath)) {
      return fallback;
    }

    const stat = fs.statSync(filePath);
    const cached = cacheStore.get(fileName);

    if (cached && cached.mtimeMs === stat.mtimeMs) {
      return cached.data as T;
    }

    const raw = fs.readFileSync(filePath, "utf-8");
    const parsed = JSON.parse(raw);

    cacheStore.set(fileName, {
      data: parsed,
      mtimeMs: stat.mtimeMs,
    });

    return parsed as T;
  } catch (err) {
    console.error(`[DataCache] Error reading ${fileName}:`, err);
    return fallback;
  }
}

export function writeCachedJson<T>(fileName: string, data: T, backup = true): boolean {
  const filePath = path.join(process.cwd(), "src", "app", "travel", "data", fileName);
  const backupPath = path.join(
    process.cwd(),
    "src",
    "app",
    "travel",
    "data",
    fileName.replace(/\.json$/, ".backup.json")
  );

  try {
    const jsonStr = JSON.stringify(data, null, 2);

    if (backup && fs.existsSync(filePath)) {
      try {
        fs.copyFileSync(filePath, backupPath);
      } catch {
        // backup failure non-fatal
      }
    }

    fs.writeFileSync(filePath, jsonStr, "utf-8");

    // Update in-memory cache directly
    const stat = fs.statSync(filePath);
    cacheStore.set(fileName, {
      data,
      mtimeMs: stat.mtimeMs,
    });

    return true;
  } catch (err) {
    console.error(`[DataCache] Error writing ${fileName}:`, err);
    return false;
  }
}

