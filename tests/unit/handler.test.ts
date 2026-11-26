import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { createContactHandler } from "@/lib/contact/handler";
import type { LeadDeps } from "@/lib/contact/service";
import { makeDeps } from "./helpers";

const NOW = 1_800_000_000_000;

function body(overrides: Record<string, unknown> = {}) {
  return {
    intent: "job",
    name: "Arjun Mehta",
    email: "arjun@company.example",
    company: "Example Co",
    message: "We're hiring a full-stack engineer for our logistics platform team.",
    website: "",
    startedAt: NOW - 45_000,
    idempotencyKey: "a3bb189e-8bf9-3888-9912-ace4e6543002",
    ...overrides,
  };
}

function request(payload: unknown, headers: Record<string, string> = {}) {
  return new Request("https://mdwarish.com/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json", origin: "https://mdwarish.com", host: "mdwarish.com", "x-forwarded-for": "203.0.113.7", ...headers },
    body: typeof payload === "string" ? payload : JSON.stringify(payload),
  });
}

function setup(depsOverride?: LeadDeps | null) {
  const ctx = makeDeps();
  const deferred: Promise<void>[] = [];
  const handler = createContactHandler({
    getDeps: async () => (depsOverride === undefined ? ctx.deps : depsOverride),
    defer: (task) => {
      deferred.push(task());
    },
    allowedHosts: ["mdwarish.com", "www.mdwarish.com"],
    fallbackEmail: "warishmohd987@gmail.com",
    now: () => NOW,
    rateLimit: { limit: 3, windowMs: 60_000 },
  });
  return { ...ctx, handler, flush: () => Promise.all(deferred) };
}

describe("POST /api/contact handler", () => {
  it("stores a valid lead, replies 201 and runs integrations after the response", async () => {
    const { handler, store, sheets, mailer, flush } = setup();
    const res = await handler(request(body()));
    assert.equal(res.status, 201);
    const json = await res.json();
    assert.equal(json.ok, true);
    assert.equal(store.leads.size, 1);
    await flush();
    assert.equal(sheets.calls.length, 1);
    assert.equal(mailer.calls.length, 1);
  });

  it("returns 200 duplicate for a repeated submission and does not notify twice", async () => {
    const { handler, store, mailer, flush } = setup();
    await handler(request(body()));
    const res = await handler(request(body()));
    assert.equal(res.status, 200);
    assert.equal((await res.json()).duplicate, true);
    await flush();
    assert.equal(store.leads.size, 1);
    assert.equal(mailer.calls.length, 1);
  });

  it("returns 422 with field errors for invalid input", async () => {
    const { handler, store } = setup();
    const res = await handler(request(body({ email: "not-an-email", message: "short" })));
    assert.equal(res.status, 422);
    const json = await res.json();
    assert.ok(json.errors.email);
    assert.ok(json.errors.message);
    assert.equal(store.leads.size, 0);
  });

  it("silently accepts bot submissions without storing them", async () => {
    const { handler, store } = setup();
    const res = await handler(request(body({ website: "http://spam.example" })));
    assert.equal(res.status, 200);
    assert.equal(store.leads.size, 0);
  });

  it("rejects cross-site origins", async () => {
    const { handler } = setup();
    const res = await handler(request(body(), { origin: "https://evil.example" }));
    assert.equal(res.status, 403);
  });

  it("rejects non-JSON and malformed bodies", async () => {
    const { handler } = setup();
    assert.equal((await handler(request(body(), { "content-type": "text/plain" }))).status, 415);
    assert.equal((await handler(request("{not json"))).status, 400);
  });

  it("rejects oversized bodies", async () => {
    const { handler } = setup();
    const res = await handler(request(body({ message: "x".repeat(20_000) })));
    assert.equal(res.status, 413);
  });

  it("rate limits repeated requests from one address", async () => {
    const { handler } = setup();
    for (let i = 0; i < 3; i++) await handler(request(body({ idempotencyKey: `key-${i}-aaaaaaaaaaaaaaaa` })));
    const res = await handler(request(body({ idempotencyKey: "key-x-aaaaaaaaaaaaaaaa" })));
    assert.equal(res.status, 429);
    assert.ok(Number(res.headers.get("retry-after")) > 0);
  });

  it("returns 503 with the fallback email when storage is not configured", async () => {
    const { handler } = setup(null);
    const res = await handler(request(body()));
    assert.equal(res.status, 503);
    assert.match((await res.json()).message, /warishmohd987@gmail\.com/);
  });

  it("returns 503 when the database insert fails", async () => {
    const ctx = makeDeps();
    ctx.deps.store.insert = async () => {
      throw new Error("connection refused");
    };
    const { handler } = setup(ctx.deps);
    const res = await handler(request(body()));
    assert.equal(res.status, 503);
  });

  it("still succeeds when an integration fails after storing", async () => {
    const { handler, store, sheets, flush } = setup();
    sheets.failTimes = 1;
    const res = await handler(request(body()));
    assert.equal(res.status, 201);
    await flush();
    const lead = [...store.leads.values()][0];
    assert.equal(lead.sync.sheets.status, "failed");
    assert.equal(lead.sync.email.status, "ok");
  });
});
