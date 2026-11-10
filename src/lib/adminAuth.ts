import crypto from "crypto";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

// ── Environment Configuration ──────────────────────────────────────────────────
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "ashraf";
// Default password if not set in environment: "ashraf@travel2026"
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "ashraf@travel2026";
const SESSION_SECRET =
  process.env.ADMIN_SESSION_SECRET ||
  "ashraf-siddiqui-travel-secret-key-salt-981248712398471209384";
const COOKIE_NAME = "ashraf_admin_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 24; // 24 hours

// ── In-Memory Rate Limiter (Brute-Force Protection) ───────────────────────────
interface RateLimitEntry {
  attempts: number;
  lockedUntil: number;
}
const loginAttemptsMap = new Map<string, RateLimitEntry>();
const MAX_ATTEMPTS = 5;
const LOCK_TIME_MS = 15 * 60 * 1000; // 15 minutes lockout

export function checkRateLimit(ip: string): { allowed: boolean; remainingSeconds?: number } {
  const now = Date.now();
  const entry = loginAttemptsMap.get(ip);

  if (!entry) return { allowed: true };

  if (entry.lockedUntil > now) {
    const remainingSeconds = Math.ceil((entry.lockedUntil - now) / 1000);
    return { allowed: false, remainingSeconds };
  }

  // Lock expired, reset
  if (entry.lockedUntil > 0 && entry.lockedUntil <= now) {
    loginAttemptsMap.delete(ip);
    return { allowed: true };
  }

  return { allowed: true };
}

export function recordFailedAttempt(ip: string): { locked: boolean; remainingAttempts: number } {
  const now = Date.now();
  const entry = loginAttemptsMap.get(ip) || { attempts: 0, lockedUntil: 0 };
  entry.attempts += 1;

  if (entry.attempts >= MAX_ATTEMPTS) {
    entry.lockedUntil = now + LOCK_TIME_MS;
    loginAttemptsMap.set(ip, entry);
    return { locked: true, remainingAttempts: 0 };
  }

  loginAttemptsMap.set(ip, entry);
  return { locked: false, remainingAttempts: MAX_ATTEMPTS - entry.attempts };
}

export function resetRateLimit(ip: string): void {
  loginAttemptsMap.delete(ip);
}

// ── Timing-Safe Credential Verification ────────────────────────────────────────
export function verifyCredentials(usernameInput: string, passwordInput: string): boolean {
  if (!usernameInput || !passwordInput) return false;

  const userBuffer = Buffer.from(usernameInput);
  const expectedUserBuffer = Buffer.from(ADMIN_USERNAME);

  const passBuffer = Buffer.from(passwordInput);
  const expectedPassBuffer = Buffer.from(ADMIN_PASSWORD);

  const userMatch =
    userBuffer.length === expectedUserBuffer.length &&
    crypto.timingSafeEqual(userBuffer, expectedUserBuffer);

  const passMatch =
    passBuffer.length === expectedPassBuffer.length &&
    crypto.timingSafeEqual(passBuffer, expectedPassBuffer);

  return userMatch && passMatch;
}

// ── Cryptographic Session Token Generation ────────────────────────────────────
interface SessionPayload {
  u: string; // username
  exp: number; // expiry timestamp (ms)
  rnd: string; // random nonce
}

export function createSessionToken(username: string): string {
  const payload: SessionPayload = {
    u: username,
    exp: Date.now() + SESSION_DURATION_SECONDS * 1000,
    rnd: crypto.randomBytes(16).toString("hex"),
  };

  const payloadString = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(payloadString)
    .digest("base64url");

  return `${payloadString}.${signature}`;
}

export function verifySessionToken(token: string): { valid: boolean; username?: string } {
  if (!token || !token.includes(".")) return { valid: false };

  const [payloadString, signature] = token.split(".");
  if (!payloadString || !signature) return { valid: false };

  // Verify HMAC signature with timing-safe comparison
  const expectedSignature = crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(payloadString)
    .digest("base64url");

  const sigBuffer = Buffer.from(signature);
  const expBuffer = Buffer.from(expectedSignature);

  if (sigBuffer.length !== expBuffer.length || !crypto.timingSafeEqual(sigBuffer, expBuffer)) {
    return { valid: false };
  }

  try {
    const payload: SessionPayload = JSON.parse(
      Buffer.from(payloadString, "base64url").toString("utf8")
    );

    if (Date.now() > payload.exp) {
      return { valid: false }; // Expired
    }

    return { valid: true, username: payload.u };
  } catch {
    return { valid: false };
  }
}

// ── Cookie Helpers ─────────────────────────────────────────────────────────────
export async function getAdminSessionFromCookies(): Promise<{
  authenticated: boolean;
  username?: string;
}> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(COOKIE_NAME);
  if (!sessionCookie?.value) return { authenticated: false };

  const check = verifySessionToken(sessionCookie.value);
  return { authenticated: check.valid, username: check.username };
}

export function extractClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return req.headers.get("x-real-ip") || "127.0.0.1";
}

export const ADMIN_COOKIE_NAME = COOKIE_NAME;
export const ADMIN_COOKIE_MAX_AGE = SESSION_DURATION_SECONDS;
