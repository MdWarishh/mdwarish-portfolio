import type { ContactInput } from "./validation";

/**
 * Lead pipeline, written against small interfaces so it can be tested without network access.
 *
 *   1. Persist the lead (MongoDB). This is the only step that must succeed before replying.
 *      A unique index on idempotencyKey makes double-submits and client retries harmless.
 *   2. Sync to Google Sheets and send the email notification. These run after the response,
 *      each tracked separately on the lead, and are retried later if they fail.
 */

export type SyncChannel = "sheets" | "email";
export type SyncStatus = "pending" | "ok" | "failed" | "skipped";
export type SyncState = { status: SyncStatus; attempts: number; lastError?: string; updatedAt: Date };

export type Lead = ContactInput & {
  id: string;
  createdAt: Date;
  source: "website";
  status: "new";
  sync: Record<SyncChannel, SyncState>;
};

export type NewLead = Omit<Lead, "id">;

export interface LeadStore {
  /** Inserts the lead; if the idempotency key already exists returns that lead's id with duplicate=true. */
  insert(lead: NewLead): Promise<{ id: string; duplicate: boolean }>;
  updateSync(id: string, channel: SyncChannel, state: SyncState): Promise<void>;
  /** Leads with a pending/failed channel, older than `olderThan`, with fewer than `maxAttempts` attempts. */
  findNeedingSync(options: { olderThan: Date; maxAttempts: number; limit: number }): Promise<Lead[]>;
}

export interface SheetsClient {
  appendLead(lead: Lead): Promise<void>;
}

export interface Mailer {
  sendLeadNotification(lead: Lead): Promise<void>;
}

export type Logger = Pick<Console, "info" | "warn" | "error">;

export type LeadDeps = {
  store: LeadStore;
  /** null when not configured — the channel is marked "skipped". */
  sheets: SheetsClient | null;
  mailer: Mailer | null;
  now: () => Date;
  log: Logger;
};

export const MAX_SYNC_ATTEMPTS = 5;

function initialSync(deps: LeadDeps, now: Date): Record<SyncChannel, SyncState> {
  return {
    sheets: { status: deps.sheets ? "pending" : "skipped", attempts: 0, updatedAt: now },
    email: { status: deps.mailer ? "pending" : "skipped", attempts: 0, updatedAt: now },
  };
}

export async function createLead(
  input: ContactInput,
  deps: LeadDeps,
): Promise<{ lead: Lead; duplicate: boolean }> {
  const now = deps.now();
  const draft: NewLead = { ...input, createdAt: now, source: "website", status: "new", sync: initialSync(deps, now) };
  const { id, duplicate } = await deps.store.insert(draft);
  return { lead: { ...draft, id }, duplicate };
}

function errorMessage(error: unknown): string {
  const message = error instanceof Error ? error.message : String(error);
  // Never persist anything that looks like a credential.
  return message.replace(/(key|token|password|secret)=\S+/gi, "$1=[redacted]").slice(0, 300);
}

async function runChannel(
  lead: Lead,
  channel: SyncChannel,
  deps: LeadDeps,
  task: (() => Promise<void>) | null,
): Promise<SyncState> {
  const previous = lead.sync[channel];
  if (!task) {
    const skipped: SyncState = { status: "skipped", attempts: previous.attempts, updatedAt: deps.now() };
    if (previous.status !== "skipped") await deps.store.updateSync(lead.id, channel, skipped);
    return skipped;
  }
  const attempts = previous.attempts + 1;
  try {
    await task();
    const ok: SyncState = { status: "ok", attempts, updatedAt: deps.now() };
    await deps.store.updateSync(lead.id, channel, ok);
    return ok;
  } catch (error) {
    const failed: SyncState = { status: "failed", attempts, lastError: errorMessage(error), updatedAt: deps.now() };
    deps.log.warn(`[leads] ${channel} sync failed for ${lead.id} (attempt ${attempts}): ${failed.lastError}`);
    await deps.store.updateSync(lead.id, channel, failed).catch((e) => deps.log.error("[leads] could not record sync state", e));
    return failed;
  }
}

/** Runs every channel that still needs work. Safe to call repeatedly. */
export async function syncLead(lead: Lead, deps: LeadDeps): Promise<Record<SyncChannel, SyncState>> {
  const needs = (c: SyncChannel) => lead.sync[c].status === "pending" || lead.sync[c].status === "failed";
  const { sheets, mailer } = deps;
  const [sheetsState, emailState] = await Promise.all([
    needs("sheets") ? runChannel(lead, "sheets", deps, sheets ? () => sheets.appendLead(lead) : null) : lead.sync.sheets,
    needs("email") ? runChannel(lead, "email", deps, mailer ? () => mailer.sendLeadNotification(lead) : null) : lead.sync.email,
  ]);
  return { sheets: sheetsState, email: emailState };
}

/** Called by the cron route: retries channels that failed or never ran (e.g. the process restarted). */
export async function retryPendingSync(
  deps: LeadDeps,
  { minAgeMs = 2 * 60_000, limit = 25 }: { minAgeMs?: number; limit?: number } = {},
): Promise<{ checked: number; ok: number; failed: number }> {
  const leads = await deps.store.findNeedingSync({
    olderThan: new Date(deps.now().getTime() - minAgeMs),
    maxAttempts: MAX_SYNC_ATTEMPTS,
    limit,
  });
  let ok = 0;
  let failed = 0;
  for (const lead of leads) {
    const result = await syncLead(lead, deps);
    for (const state of Object.values(result)) {
      if (state.status === "ok") ok += 1;
      if (state.status === "failed") failed += 1;
    }
  }
  return { checked: leads.length, ok, failed };
}
