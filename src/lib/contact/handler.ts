import { createLead, syncLead, type LeadDeps } from "./service";
import { createRateLimiter } from "./rate-limit";
import { isLikelyBot, validateContact } from "./validation";

export type ContactResponse =
  | { ok: true; duplicate?: boolean; message: string }
  | { ok: false; message: string; errors?: Record<string, string> };

export type HandlerOptions = {
  /** Returns the configured dependencies, or null when the lead store is not configured. */
  getDeps: () => Promise<LeadDeps | null>;
  /** Schedules work after the response is sent (Next.js `after`). Tests pass a function that awaits. */
  defer: (task: () => Promise<void>) => void;
  /** Hosts allowed in the Origin header (in addition to the request's own host). */
  allowedHosts: string[];
  fallbackEmail: string;
  now?: () => number;
  rateLimit?: { limit: number; windowMs: number };
};

const MAX_BODY_BYTES = 16 * 1024;

const json = (body: ContactResponse, status: number, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", ...headers },
  });

function clientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

function originAllowed(req: Request, allowedHosts: string[]): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true; // non-browser clients; still validated and rate limited
  try {
    const originHost = new URL(origin).host;
    const ownHost = req.headers.get("x-forwarded-host") ?? req.headers.get("host") ?? new URL(req.url).host;
    return originHost === ownHost || allowedHosts.includes(originHost);
  } catch {
    return false;
  }
}

export function createContactHandler(options: HandlerOptions) {
  const now = options.now ?? Date.now;
  const limiter = createRateLimiter(options.rateLimit ?? { limit: 5, windowMs: 10 * 60_000 });
  const unavailable = `The form is temporarily unavailable. Please email ${options.fallbackEmail} directly.`;

  return async function POST(req: Request): Promise<Response> {
    if (!originAllowed(req, options.allowedHosts)) {
      return json({ ok: false, message: "This form can only be submitted from the website." }, 403);
    }

    const contentType = req.headers.get("content-type") ?? "";
    if (!contentType.includes("application/json")) {
      return json({ ok: false, message: "Unsupported request format." }, 415);
    }

    const limit = limiter(clientIp(req), now());
    if (!limit.allowed) {
      return json(
        { ok: false, message: "Too many messages in a short time. Please wait a few minutes and try again." },
        429,
        { "retry-after": String(limit.retryAfterSeconds) },
      );
    }

    const declared = Number(req.headers.get("content-length") ?? 0);
    if (declared > MAX_BODY_BYTES) {
      return json({ ok: false, message: "Your message is too long." }, 413);
    }
    const text = await req.text();
    if (new TextEncoder().encode(text).length > MAX_BODY_BYTES) {
      return json({ ok: false, message: "Your message is too long." }, 413);
    }

    let raw: unknown;
    try {
      raw = JSON.parse(text);
    } catch {
      return json({ ok: false, message: "Unsupported request format." }, 400);
    }

    // Bots get an ordinary-looking success and nothing is stored.
    if (isLikelyBot(raw, now())) {
      return json({ ok: true, message: "Thanks — your message has been received." }, 200);
    }

    const result = validateContact(raw);
    if (!result.ok) {
      return json({ ok: false, message: "Please check the highlighted fields.", errors: result.errors }, 422);
    }

    let deps: LeadDeps | null;
    try {
      deps = await options.getDeps();
    } catch (error) {
      console.error("[contact] failed to initialise dependencies", error);
      deps = null;
    }
    if (!deps) return json({ ok: false, message: unavailable }, 503);

    try {
      const { lead, duplicate } = await createLead(result.value, deps);
      if (duplicate) {
        return json({ ok: true, duplicate: true, message: "Your message was already received — thank you." }, 200);
      }
      const ready = deps;
      options.defer(async () => {
        await syncLead(lead, ready).catch((error) => ready.log.error("[contact] sync crashed", error));
      });
      return json({ ok: true, message: "Thanks — your message has been received. I'll reply by email." }, 201);
    } catch (error) {
      deps.log.error("[contact] could not store lead", error);
      return json({ ok: false, message: unavailable }, 503);
    }
  };
}
