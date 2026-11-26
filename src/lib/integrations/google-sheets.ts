import { createSign } from "node:crypto";
import type { Lead, SheetsClient } from "@/lib/contact/service";
import { INTENT_LABELS, PROJECT_TYPES } from "@/lib/contact/validation";

/**
 * Google Sheets append via the REST API and a service account.
 * Implemented with node:crypto + fetch instead of the `googleapis` package (tens of MB) — the only
 * two calls needed are the OAuth token exchange and values.append.
 */

export type ServiceAccount = { client_email: string; private_key: string };

type FetchLike = (input: string, init?: RequestInit) => Promise<Response>;

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const SCOPE = "https://www.googleapis.com/auth/spreadsheets";

export function parseServiceAccount(base64: string): ServiceAccount {
  let parsed: unknown;
  try {
    parsed = JSON.parse(Buffer.from(base64, "base64").toString("utf8"));
  } catch {
    throw new Error("GOOGLE_SERVICE_ACCOUNT_BASE64 is not valid base64-encoded JSON");
  }
  const account = parsed as Partial<ServiceAccount>;
  if (!account.client_email || !account.private_key) {
    throw new Error("Service account JSON must contain client_email and private_key");
  }
  return { client_email: account.client_email, private_key: account.private_key };
}

const b64url = (input: string | Buffer) => Buffer.from(input).toString("base64url");

export function createSignedJwt(account: ServiceAccount, nowSeconds: number): string {
  const header = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = b64url(
    JSON.stringify({ iss: account.client_email, scope: SCOPE, aud: TOKEN_URL, iat: nowSeconds, exp: nowSeconds + 3600 }),
  );
  const signer = createSign("RSA-SHA256");
  signer.update(`${header}.${claims}`);
  const signature = signer.sign(account.private_key).toString("base64url");
  return `${header}.${claims}.${signature}`;
}

/** Prevents a value from being interpreted as a formula if the sheet is later exported or re-imported. */
export function neutraliseCell(value: string): string {
  return /^[=+\-@\t\r]/.test(value) ? `'${value}` : value;
}

export function leadToRow(lead: Lead): string[] {
  const projectType = PROJECT_TYPES.find((p) => p.value === lead.projectType)?.label ?? "";
  return [
    lead.createdAt.toISOString(),
    lead.id,
    INTENT_LABELS[lead.intent],
    lead.name,
    lead.email,
    lead.company ?? "",
    projectType,
    lead.message,
  ].map(neutraliseCell);
}

export function createSheetsClient({
  account,
  spreadsheetId,
  sheetName,
  fetchImpl = fetch,
  now = () => Date.now(),
}: {
  account: ServiceAccount;
  spreadsheetId: string;
  sheetName: string;
  fetchImpl?: FetchLike;
  now?: () => number;
}): SheetsClient {
  let cached: { token: string; expiresAt: number } | null = null;

  async function accessToken(): Promise<string> {
    if (cached && cached.expiresAt - 60_000 > now()) return cached.token;
    const assertion = createSignedJwt(account, Math.floor(now() / 1000));
    const res = await fetchImpl(TOKEN_URL, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion }).toString(),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`Google token request failed (${res.status})`);
    const body = (await res.json()) as { access_token?: string; expires_in?: number };
    if (!body.access_token) throw new Error("Google token response had no access_token");
    cached = { token: body.access_token, expiresAt: now() + (body.expires_in ?? 3600) * 1000 };
    return cached.token;
  }

  return {
    async appendLead(lead) {
      const token = await accessToken();
      const range = encodeURIComponent(`${sheetName}!A1`);
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(spreadsheetId)}/values/${range}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`;
      const res = await fetchImpl(url, {
        method: "POST",
        headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
        body: JSON.stringify({ values: [leadToRow(lead)] }),
        signal: AbortSignal.timeout(10_000),
      });
      if (!res.ok) throw new Error(`Google Sheets append failed (${res.status})`);
    },
  };
}
