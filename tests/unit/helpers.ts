import type { Lead, LeadDeps, LeadStore, Mailer, NewLead, SheetsClient, SyncChannel, SyncState } from "@/lib/contact/service";

/** In-memory LeadStore with the same duplicate semantics as the MongoDB unique index. */
export class MemoryStore implements LeadStore {
  leads = new Map<string, Lead>();
  private seq = 0;

  async insert(lead: NewLead) {
    for (const existing of this.leads.values()) {
      if (existing.idempotencyKey === lead.idempotencyKey) return { id: existing.id, duplicate: true };
    }
    const id = `lead_${++this.seq}`;
    this.leads.set(id, structuredClone({ ...lead, id }));
    return { id, duplicate: false };
  }

  async updateSync(id: string, channel: SyncChannel, state: SyncState) {
    const lead = this.leads.get(id);
    if (!lead) throw new Error("missing lead");
    lead.sync[channel] = state;
  }

  async findNeedingSync({ olderThan, maxAttempts, limit }: { olderThan: Date; maxAttempts: number; limit: number }) {
    const needs = (s: SyncState) => (s.status === "pending" || s.status === "failed") && s.attempts < maxAttempts;
    return [...this.leads.values()]
      .filter((l) => l.createdAt <= olderThan && (needs(l.sync.sheets) || needs(l.sync.email)))
      .slice(0, limit)
      .map((l) => structuredClone(l));
  }
}

export class FakeSheets implements SheetsClient {
  calls: Lead[] = [];
  failTimes = 0;
  async appendLead(lead: Lead) {
    if (this.failTimes > 0) {
      this.failTimes -= 1;
      throw new Error("sheets down token=abc123");
    }
    this.calls.push(lead);
  }
}

export class FakeMailer implements Mailer {
  calls: Lead[] = [];
  failTimes = 0;
  async sendLeadNotification(lead: Lead) {
    if (this.failTimes > 0) {
      this.failTimes -= 1;
      throw new Error("smtp timeout");
    }
    this.calls.push(lead);
  }
}

export const silentLog = { info() {}, warn() {}, error() {} };

export function makeDeps(overrides: Partial<LeadDeps> = {}) {
  const store = new MemoryStore();
  const sheets = new FakeSheets();
  const mailer = new FakeMailer();
  let clock = new Date("2026-11-24T10:00:00Z").getTime();
  const deps: LeadDeps = {
    store,
    sheets,
    mailer,
    now: () => new Date(clock),
    log: silentLog,
    ...overrides,
  };
  return { deps, store, sheets, mailer, advance: (ms: number) => (clock += ms) };
}

export const sampleInput = {
  intent: "freelance" as const,
  name: "Priya Sharma",
  email: "priya@example.com",
  message: "We need a CRM for three clinic branches with stock tracking.",
  idempotencyKey: "0f8fad5b-d9cb-469f-a165-70867728950e",
};
