import { NextRequest, NextResponse } from "next/server";
import {
  verifyCredentials,
  createSessionToken,
  ADMIN_COOKIE_NAME,
  ADMIN_COOKIE_MAX_AGE,
  checkRateLimit,
  recordFailedAttempt,
  resetRateLimit,
  extractClientIp,
} from "@/lib/adminAuth";

export async function POST(req: NextRequest) {
  try {
    const ip = extractClientIp(req);

    // 1. Rate limiting check
    const rateCheck = checkRateLimit(ip);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: `Too many failed login attempts. Locked out for ${rateCheck.remainingSeconds} seconds.`,
        },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: "Username and password are required." },
        { status: 400 }
      );
    }

    // 2. Timing-safe credential verification
    const isValid = verifyCredentials(String(username).trim(), String(password));

    if (!isValid) {
      const failStatus = recordFailedAttempt(ip);
      if (failStatus.locked) {
        return NextResponse.json(
          {
            success: false,
            error: "Too many failed attempts. Account locked for 15 minutes.",
          },
          { status: 429 }
        );
      }
      return NextResponse.json(
        {
          success: false,
          error: `Invalid username or password. ${failStatus.remainingAttempts} attempts remaining.`,
        },
        { status: 401 }
      );
    }

    // 3. Reset rate limit on success
    resetRateLimit(ip);

    // 4. Generate cryptographically signed session token
    const token = createSessionToken(username);

    // 5. Create response with secure HTTP-only cookie
    const isProduction = process.env.NODE_ENV === "production";
    const response = NextResponse.json({
      success: true,
      message: "Authentication successful.",
      username,
    });

    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      maxAge: ADMIN_COOKIE_MAX_AGE,
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Authentication service error." },
      { status: 500 }
    );
  }
}
