import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { isLikelyBot, LIMITS, validateContact } from "@/lib/contact/validation";

const valid = {
  intent: "freelance",
  name: "  Priya   Sharma ",
  email: "Priya@Example.com ",
  company: "",
  projectType: "crm-business-systems",
  message: "We need a CRM for three clinic branches with stock tracking.",
  idempotencyKey: "0f8fad5b-d9cb-469f-a165-70867728950e",
};

describe("validateContact", () => {
  it("accepts a valid freelance enquiry and normalises fields", () => {
    const r = validateContact(valid);
    assert.equal(r.ok, true);
    if (!r.ok) return;
    assert.equal(r.value.name, "Priya Sharma");
    assert.equal(r.value.email, "priya@example.com");
    assert.equal(r.value.company, undefined);
    assert.equal(r.value.projectType, "crm-business-systems");
  });

  it("drops projectType for non-freelance intents", () => {
    const r = validateContact({ ...valid, intent: "job" });
    assert.equal(r.ok, true);
    if (r.ok) assert.equal(r.value.projectType, undefined);
  });

  it("rejects unknown intent, short name, bad email and short message", () => {
    const r = validateContact({ ...valid, intent: "spam", name: "A", email: "nope@", message: "hi" });
    assert.equal(r.ok, false);
    if (r.ok) return;
    assert.ok(r.errors.intent);
    assert.ok(r.errors.name);
    assert.ok(r.errors.email);
    assert.ok(r.errors.message);
  });

  it("rejects over-long fields", () => {
    const r = validateContact({ ...valid, message: "x".repeat(LIMITS.message.max + 1), company: "c".repeat(200) });
    assert.equal(r.ok, false);
    if (!r.ok) {
      assert.ok(r.errors.message);
      assert.ok(r.errors.company);
    }
  });

  it("rejects a project type that is not in the list", () => {
    const r = validateContact({ ...valid, projectType: "<script>" });
    assert.equal(r.ok, false);
    if (!r.ok) assert.ok(r.errors.projectType);
  });

  it("requires a well-formed idempotency key", () => {
    const r = validateContact({ ...valid, idempotencyKey: "short" });
    assert.equal(r.ok, false);
  });

  it("strips control characters and keeps paragraph breaks in messages", () => {
    const r = validateContact({ ...valid, message: "Line one\u0007 is here\n\n\n\nLine two with detail" });
    assert.equal(r.ok, true);
    if (r.ok) assert.equal(r.value.message, "Line one is here\n\nLine two with detail");
  });

  it("handles non-object input", () => {
    assert.equal(validateContact(null).ok, false);
    assert.equal(validateContact("text").ok, false);
  });
});

describe("isLikelyBot", () => {
  const now = 1_000_000;
  it("flags a filled honeypot", () => {
    assert.equal(isLikelyBot({ website: "http://spam", startedAt: now - 60_000 }, now), true);
  });
  it("flags submissions faster than the minimum fill time", () => {
    assert.equal(isLikelyBot({ website: "", startedAt: now - 500 }, now), true);
  });
  it("flags a missing timestamp", () => {
    assert.equal(isLikelyBot({ website: "" }, now), true);
  });
  it("allows a normal human submission", () => {
    assert.equal(isLikelyBot({ website: "", startedAt: now - 30_000 }, now), false);
  });
});
