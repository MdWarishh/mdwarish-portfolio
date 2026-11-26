import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { createLead, MAX_SYNC_ATTEMPTS, retryPendingSync, syncLead } from "@/lib/contact/service";
import { makeDeps, sampleInput } from "./helpers";

describe("lead service", () => {
  it("stores a lead with pending sync states for configured channels", async () => {
    const { deps, store } = makeDeps();
    const { lead, duplicate } = await createLead(sampleInput, deps);
    assert.equal(duplicate, false);
    assert.equal(store.leads.size, 1);
    assert.equal(lead.sync.sheets.status, "pending");
    assert.equal(lead.sync.email.status, "pending");
    assert.equal(lead.source, "website");
  });

  it("marks unconfigured channels as skipped", async () => {
    const { deps } = makeDeps({ sheets: null, mailer: null });
    const { lead } = await createLead(sampleInput, deps);
    assert.equal(lead.sync.sheets.status, "skipped");
    assert.equal(lead.sync.email.status, "skipped");
    const result = await syncLead(lead, deps);
    assert.equal(result.sheets.status, "skipped");
  });

  it("treats a repeated idempotency key as a duplicate, not a new lead", async () => {
    const { deps, store } = makeDeps();
    const first = await createLead(sampleInput, deps);
    const second = await createLead(sampleInput, deps);
    assert.equal(second.duplicate, true);
    assert.equal(second.lead.id, first.lead.id);
    assert.equal(store.leads.size, 1);
  });

  it("syncs both channels and records success", async () => {
    const { deps, store, sheets, mailer } = makeDeps();
    const { lead } = await createLead(sampleInput, deps);
    await syncLead(lead, deps);
    assert.equal(sheets.calls.length, 1);
    assert.equal(mailer.calls.length, 1);
    const saved = store.leads.get(lead.id)!;
    assert.equal(saved.sync.sheets.status, "ok");
    assert.equal(saved.sync.email.status, "ok");
    assert.equal(saved.sync.email.attempts, 1);
  });

  it("isolates channel failures and redacts secrets in stored errors", async () => {
    const { deps, store, sheets, mailer } = makeDeps();
    sheets.failTimes = 1;
    const { lead } = await createLead(sampleInput, deps);
    const result = await syncLead(lead, deps);
    assert.equal(result.sheets.status, "failed");
    assert.equal(result.email.status, "ok");
    assert.equal(mailer.calls.length, 1);
    const saved = store.leads.get(lead.id)!;
    assert.match(saved.sync.sheets.lastError ?? "", /token=\[redacted\]/);
    assert.doesNotMatch(saved.sync.sheets.lastError ?? "", /abc123/);
  });

  it("retries failed channels later without re-sending successful ones", async () => {
    const { deps, store, sheets, mailer, advance } = makeDeps();
    sheets.failTimes = 1;
    const { lead } = await createLead(sampleInput, deps);
    await syncLead(lead, deps);

    // Too recent: not picked up.
    let summary = await retryPendingSync(deps);
    assert.equal(summary.checked, 0);

    advance(5 * 60_000);
    summary = await retryPendingSync(deps);
    assert.equal(summary.checked, 1);
    assert.equal(sheets.calls.length, 1);
    assert.equal(mailer.calls.length, 1, "email must not be sent twice");
    assert.equal(store.leads.get(lead.id)!.sync.sheets.status, "ok");
    assert.equal(store.leads.get(lead.id)!.sync.sheets.attempts, 2);
  });

  it("stops retrying after the maximum number of attempts", async () => {
    const { deps, sheets, advance } = makeDeps({ mailer: null });
    sheets.failTimes = 100;
    const { lead } = await createLead(sampleInput, deps);
    await syncLead(lead, deps);
    for (let i = 0; i < MAX_SYNC_ATTEMPTS + 3; i++) {
      advance(5 * 60_000);
      await retryPendingSync(deps);
    }
    const attempts = 100 - sheets.failTimes;
    assert.equal(attempts, MAX_SYNC_ATTEMPTS);
  });
});
