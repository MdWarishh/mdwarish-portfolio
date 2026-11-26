import type { LeadDeps } from "./service";

/**
 * Production wiring from environment variables. Server-only: imported by route handlers only.
 *
 *   MONGODB_URI (+ optional MONGODB_DB)              required — without it the form returns 503
 *   GOOGLE_SERVICE_ACCOUNT_BASE64, GOOGLE_SHEET_ID,
 *   GOOGLE_SHEET_NAME                                optional — Sheets sync is skipped if missing
 *   GMAIL_USER, GMAIL_APP_PASSWORD,
 *   LEAD_NOTIFICATION_EMAIL                          optional — email notification skipped if missing
 */

const env = (key: string) => {
  const value = process.env[key]?.trim();
  return value ? value : undefined;
};

let cached: Promise<LeadDeps | null> | null = null;

export function getLeadDeps(): Promise<LeadDeps | null> {
  cached ??= build().catch((error) => {
    cached = null; // allow a retry on the next request
    throw error;
  });
  return cached;
}

async function build(): Promise<LeadDeps | null> {
  const uri = env("MONGODB_URI");
  if (!uri) {
    console.error("[contact] MONGODB_URI is not set — the contact form cannot store leads.");
    return null;
  }

  const { createMongoLeadStore } = await import("@/lib/integrations/mongo-store");
  const store = await createMongoLeadStore({ uri, dbName: env("MONGODB_DB") ?? "portfolio" });

  let sheets: LeadDeps["sheets"] = null;
  const saB64 = env("GOOGLE_SERVICE_ACCOUNT_BASE64");
  const sheetId = env("GOOGLE_SHEET_ID");
  if (saB64 && sheetId) {
    const { createSheetsClient, parseServiceAccount } = await import("@/lib/integrations/google-sheets");
    sheets = createSheetsClient({
      account: parseServiceAccount(saB64),
      spreadsheetId: sheetId,
      sheetName: env("GOOGLE_SHEET_NAME") ?? "Leads",
    });
  }

  let mailer: LeadDeps["mailer"] = null;
  const gmailUser = env("GMAIL_USER");
  const gmailPass = env("GMAIL_APP_PASSWORD");
  if (gmailUser && gmailPass) {
    const { createGmailTransport, createMailer } = await import("@/lib/integrations/mailer");
    mailer = createMailer({
      transport: await createGmailTransport(gmailUser, gmailPass),
      from: gmailUser,
      to: env("LEAD_NOTIFICATION_EMAIL") ?? gmailUser,
    });
  }

  return { store, sheets, mailer, now: () => new Date(), log: console };
}
