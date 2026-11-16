import { NextRequest, NextResponse } from "next/server";
import { validateContactPayload } from "@/lib/validation";
import { connectToDatabase } from "@/lib/mongodb";
import { Lead } from "@/models/Lead";
import { appendLeadToGoogleSheet } from "@/lib/google-sheets";
import { sendLeadNotificationEmail } from "@/lib/mailer";

// In-memory rate limiting & idempotency guard per server instance
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const recentIdempotencyKeys = new Map<string, number>();

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  record.count += 1;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const forwardedFor = req.headers.get("x-forwarded-for");
    const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : "unknown-ip";

    if (!checkRateLimit(clientIp)) {
      return NextResponse.json(
        {
          ok: false,
          message: "Too many submissions from this IP. Please try again in a few minutes.",
        },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => null);
    const validation = validateContactPayload(body);

    // Silent drop for honeypot / bot speed spam
    if (validation.isSpam) {
      return NextResponse.json(
        {
          ok: true,
          message: "Message received.",
          savedToMongo: false,
          savedToSheets: false,
          emailSent: false,
        },
        { status: 200 }
      );
    }

    if (!validation.valid || !validation.sanitized) {
      return NextResponse.json(
        {
          ok: false,
          message: "Please check the highlighted form fields.",
          errors: validation.errors,
        },
        { status: 400 }
      );
    }

    const { name, email, message, idempotencyKey } = validation.sanitized;

    // Check in-memory idempotency cache to block duplicate rapid clicks
    if (idempotencyKey) {
      const existingTimestamp = recentIdempotencyKeys.get(idempotencyKey);
      if (existingTimestamp && Date.now() - existingTimestamp < 5 * 60 * 1000) {
        return NextResponse.json(
          {
            ok: true,
            duplicate: true,
            message: "Your inquiry has already been recorded.",
          },
          { status: 200 }
        );
      }
    }

    // 1. PRIMARY RECORD: MongoDB Atlas
    try {
      await connectToDatabase();
    } catch {
      console.error("[Contact API] Primary MongoDB connection failed.");
      return NextResponse.json(
        {
          ok: false,
          message:
            "Unable to save your message right now because the database connection is unavailable. Please email warishmohd987@gmail.com directly.",
        },
        { status: 503 }
      );
    }

    // Check database-level idempotency
    if (idempotencyKey) {
      const existingLead = await Lead.findOne({ idempotencyKey }).lean();
      if (existingLead) {
        return NextResponse.json(
          {
            ok: true,
            duplicate: true,
            message: "Your inquiry has already been recorded.",
          },
          { status: 200 }
        );
      }
    }

    let createdLead;
    try {
      createdLead = await Lead.create({
        name,
        email,
        message,
        source: "portfolio-contact-form",
        status: "new",
        ...(idempotencyKey ? { idempotencyKey } : {}),
      });
    } catch {
      console.error("[Contact API] Failed to insert Lead document into MongoDB.");
      return NextResponse.json(
        {
          ok: false,
          message:
            "Could not save your inquiry to the primary database. Please try again or reach out via warishmohd987@gmail.com.",
        },
        { status: 500 }
      );
    }

    if (idempotencyKey) {
      recentIdempotencyKeys.set(idempotencyKey, Date.now());
    }

    const leadId = String(createdLead._id);
    const createdAtIso = new Date(createdLead.createdAt || Date.now()).toISOString();

    // 2. SECONDARY: Google Sheets (never discards primary MongoDB record on failure)
    let savedToSheets = false;
    try {
      savedToSheets = await appendLeadToGoogleSheet({
        id: leadId,
        name,
        email,
        message,
        source: "portfolio-contact-form",
        status: "new",
        createdAt: createdAtIso,
      });
    } catch {
      console.warn("[Contact API] Secondary Google Sheets append skipped or failed.");
    }

    // 3. SECONDARY: Gmail SMTP Notification (never discards primary MongoDB record on failure)
    let emailSent = false;
    try {
      emailSent = await sendLeadNotificationEmail({
        id: leadId,
        name,
        email,
        message,
        createdAt: createdAtIso,
      });
    } catch {
      console.warn("[Contact API] Secondary Gmail SMTP notification skipped or failed.");
    }

    return NextResponse.json(
      {
        ok: true,
        message: "Thank you. Your message has been saved and I will get back to you shortly.",
        delivery: {
          savedToMongo: true,
          savedToSheets,
          emailSent,
        },
      },
      { status: 201 }
    );
  } catch {
    console.error("[Contact API] Unexpected route error.");
    return NextResponse.json(
      {
        ok: false,
        message: "An unexpected server error occurred. Please email warishmohd987@gmail.com.",
      },
      { status: 500 }
    );
  }
}
