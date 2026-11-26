import assert from "node:assert/strict";
import { createVerify, generateKeyPairSync } from "node:crypto";
import { describe, it } from "node:test";
import type { Lead } from "@/lib/contact/service";
import {
  createSheetsClient,
  createSignedJwt,
  leadToRow,
  neutraliseCell,
  parseServiceAccount,
} from "@/lib/integrations/google-sheets";
import { createMailer, formatLeadEmail, type MailTransport } from "@/lib/integrations/mailer";

const { privateKey, publicKey } = generateKeyPairSync("rsa", { modulusLength: 2048 });
const account = {
  client_email: "leads@test-project.iam.gserviceaccount.com",
  private_key: privateKey.export({ type: "pkcs8", format: "pem" }).toString(),
};

const lead: Lead = {
  id: "665f1c2e9b1e8a0012345678",
  intent: "freelance",
  name: "Priya Sharma",
  email: "priya@example.com",
  company: "=HYPERLINK(\"http://x\")",
  projectType: "crm-business-systems",
  message: "We need a CRM.\nThree branches.",
  idempotencyKey: "0f8fad5b-d9cb-469f-a165-70867728950e",
  createdAt: new Date("2026-11-24T10:00:00Z"),
  source: "website",
  status: "new",
  sync: {
    sheets: { status: "pending", attempts: 0, updatedAt: new Date() },
    email: { status: "pending", attempts: 0, updatedAt: new Date() },
  },
};

describe("Google Sheets integration", () => {
  it("parses a base64 service account and rejects bad input", () => {
    const b64 = Buffer.from(JSON.stringify(account)).toString("base64");
    assert.equal(parseServiceAccount(b64).client_email, account.client_email);
    assert.throws(() => parseServiceAccount("!!!"));
    assert.throws(() => parseServiceAccount(Buffer.from("{}").toString("base64")));
  });

  it("creates an RS256 JWT that verifies with the public key", () => {
    const jwt = createSignedJwt(account, 1_800_000_000);
    const [h, c, s] = jwt.split(".");
    const header = JSON.parse(Buffer.from(h, "base64url").toString());
    const claims = JSON.parse(Buffer.from(c, "base64url").toString());
    assert.equal(header.alg, "RS256");
    assert.equal(claims.iss, account.client_email);
    assert.equal(claims.aud, "https://oauth2.googleapis.com/token");
    assert.equal(claims.exp - claims.iat, 3600);
    const verifier = createVerify("RSA-SHA256");
    verifier.update(`${h}.${c}`);
    assert.equal(verifier.verify(publicKey, Buffer.from(s, "base64url")), true);
  });

  it("neutralises values that would be read as formulas", () => {
    assert.equal(neutraliseCell("=SUM(A1)"), "'=SUM(A1)");
    assert.equal(neutraliseCell("+91 98100"), "'+91 98100");
    assert.equal(neutraliseCell("Plain text"), "Plain text");
    const row = leadToRow(lead);
    assert.equal(row[2], "Freelance project");
    assert.equal(row[5], "'=HYPERLINK(\"http://x\")");
    assert.equal(row[6], "CRM or business system");
  });

  it("exchanges a token once, then appends rows with it", async () => {
    const calls: { url: string; init?: RequestInit }[] = [];
    const fetchImpl = async (url: string, init?: RequestInit) => {
      calls.push({ url, init });
      if (url.startsWith("https://oauth2.googleapis.com/token")) {
        return Response.json({ access_token: "ya29.test", expires_in: 3600 });
      }
      return Response.json({ updates: { updatedRows: 1 } });
    };
    const client = createSheetsClient({
      account,
      spreadsheetId: "sheet-123",
      sheetName: "Leads",
      fetchImpl,
      now: () => 1_800_000_000_000,
    });
    await client.appendLead(lead);
    await client.appendLead(lead);
    const tokenCalls = calls.filter((c) => c.url.includes("oauth2"));
    const appendCalls = calls.filter((c) => c.url.includes("sheets.googleapis.com"));
    assert.equal(tokenCalls.length, 1, "token is cached");
    assert.equal(appendCalls.length, 2);
    assert.match(appendCalls[0].url, /spreadsheets\/sheet-123\/values\/Leads!A1:append\?valueInputOption=RAW/);
    const headers = appendCalls[0].init?.headers as Record<string, string>;
    assert.equal(headers.authorization, "Bearer ya29.test");
    const sent = JSON.parse(String(appendCalls[0].init?.body));
    assert.equal(sent.values[0][3], "Priya Sharma");
  });

  it("throws on an API error so the lead is marked failed", async () => {
    const client = createSheetsClient({
      account,
      spreadsheetId: "sheet-123",
      sheetName: "Leads",
      fetchImpl: async (url) =>
        url.includes("oauth2") ? Response.json({ access_token: "t", expires_in: 3600 }) : new Response("", { status: 403 }),
    });
    await assert.rejects(client.appendLead(lead), /403/);
  });
});

describe("Email notification", () => {
  it("formats a readable notification with reply-to set to the sender", async () => {
    const sent: Parameters<MailTransport["sendMail"]>[0][] = [];
    const mailer = createMailer({
      transport: { sendMail: async (m) => sent.push(m) },
      from: "site@gmail.com",
      to: "owner@gmail.com",
    });
    await mailer.sendLeadNotification(lead);
    assert.equal(sent.length, 1);
    assert.equal(sent[0].to, "owner@gmail.com");
    assert.equal(sent[0].replyTo, "priya@example.com");
    assert.match(sent[0].subject, /Freelance project/);
    assert.match(sent[0].text, /Three branches/);
  });

  it("removes line breaks from names before they reach the subject header", () => {
    const { subject } = formatLeadEmail({ ...lead, name: "Eve\r\nBcc: victim@example.com" });
    assert.doesNotMatch(subject, /[\r\n]/);
  });
});
