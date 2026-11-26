import { timingSafeEqual } from "node:crypto";
import { getLeadDeps } from "@/lib/contact/deps";
import { retryPendingSync } from "@/lib/contact/service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function authorised(req: Request): boolean {
  const secret = process.env.CRON_SECRET?.trim();
  if (!secret) return false;
  const header = req.headers.get("authorization") ?? "";
  const expected = Buffer.from(`Bearer ${secret}`);
  const given = Buffer.from(header);
  return given.length === expected.length && timingSafeEqual(given, expected);
}

/**
 * Retries Google Sheets / email delivery for leads whose sync failed or never ran.
 * Call every 10–15 minutes with:  Authorization: Bearer $CRON_SECRET
 */
export async function GET(req: Request) {
  if (!authorised(req)) {
    return Response.json({ ok: false }, { status: 401, headers: { "cache-control": "no-store" } });
  }
  const deps = await getLeadDeps();
  if (!deps) return Response.json({ ok: false, message: "Lead store not configured" }, { status: 503 });
  const result = await retryPendingSync(deps);
  return Response.json(
    { ok: true, checked: result.checked, delivered: result.ok, failed: result.failed },
    { headers: { "cache-control": "no-store" } },
  );
}
