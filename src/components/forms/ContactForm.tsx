"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { ArrowRight } from "@/components/ui/Icons";
import {
  INTENT_LABELS,
  INTENTS,
  LIMITS,
  PROJECT_TYPES,
  validateContact,
  type FieldErrors,
  type FieldName,
  type Intent,
} from "@/lib/contact/validation";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success"; message: string }
  | { kind: "error"; message: string };

const INTENT_HINTS: Record<Intent, string> = {
  freelance: "A website, app or system to build",
  job: "A role on your team",
  other: "Questions, collaborations",
};

const PLACEHOLDERS: Record<Intent, string> = {
  freelance: "What should it do, who will use it, and is there a deadline or budget range?",
  job: "The role, the team, the stack and where it's based.",
  other: "How can I help?",
};

function newKey(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`;
}

export function ContactForm({ fallbackEmail }: { fallbackEmail: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const [intent, setIntent] = useState<Intent>("freelance");
  const [projectType, setProjectType] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  // One key per message: reused if the visitor retries after a network error, renewed after success.
  const keyRef = useRef<string>("");
  const startedAtRef = useRef<number>(0);

  useEffect(() => {
    keyRef.current = newKey();
    startedAtRef.current = Date.now();
    // Pre-select from links such as /contact?intent=job or /services → ?service=crm-business-systems
    const params = new URLSearchParams(window.location.search);
    const fromUrl = params.get("intent");
    if (fromUrl && (INTENTS as readonly string[]).includes(fromUrl)) setIntent(fromUrl as Intent);
    const service = params.get("service");
    if (service && PROJECT_TYPES.some((p) => p.value === service)) setProjectType(service);
  }, []);

  useEffect(() => {
    if (status.kind === "success" || status.kind === "error") statusRef.current?.focus();
  }, [status]);

  function focusFirstError(next: FieldErrors) {
    const order: FieldName[] = ["intent", "name", "email", "company", "projectType", "message"];
    const first = order.find((f) => next[f]);
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status.kind === "submitting") return; // double-click guard

    const form = new FormData(event.currentTarget);
    const payload = {
      intent,
      name: form.get("name"),
      email: form.get("email"),
      company: form.get("company"),
      projectType: intent === "freelance" ? projectType : "",
      message: form.get("message"),
      website: form.get("website"),
      startedAt: startedAtRef.current,
      idempotencyKey: keyRef.current,
    };

    const check = validateContact(payload);
    if (!check.ok) {
      setErrors(check.errors);
      setStatus({ kind: "idle" });
      focusFirstError(check.errors);
      return;
    }
    setErrors({});
    setStatus({ kind: "submitting" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = (await res.json().catch(() => null)) as
        | { ok: boolean; message?: string; errors?: FieldErrors }
        | null;

      if (res.ok && body?.ok) {
        setStatus({ kind: "success", message: body.message ?? "Thanks — your message has been received." });
        formRef.current?.reset();
        setProjectType("");
        keyRef.current = newKey();
        startedAtRef.current = Date.now();
        return;
      }
      if (res.status === 422 && body?.errors) {
        setErrors(body.errors);
        setStatus({ kind: "idle" });
        focusFirstError(body.errors);
        return;
      }
      setStatus({
        kind: "error",
        message: body?.message ?? `Your message could not be sent. Please try again, or email ${fallbackEmail}.`,
      });
    } catch {
      setStatus({
        kind: "error",
        message: `Your message could not be sent — check your connection and try again, or email ${fallbackEmail}.`,
      });
    }
  }

  const err = (field: FieldName) =>
    errors[field] ? (
      <p className="field-error" id={`${field}-error`}>
        {errors[field]}
      </p>
    ) : null;
  const a11y = (field: FieldName) => ({
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `${field}-error` : undefined,
  });

  const submitting = status.kind === "submitting";

  return (
    <form ref={formRef} className="form" onSubmit={onSubmit} noValidate aria-describedby="form-note" data-testid="contact-form">
      <fieldset>
        <legend>What is this about?</legend>
        <div className="intent-options">
          {INTENTS.map((value) => (
            <label key={value} className="intent">
              <input
                type="radio"
                name="intent"
                value={value}
                checked={intent === value}
                onChange={() => setIntent(value)}
              />
              <span>
                {INTENT_LABELS[value]}
                <small>{INTENT_HINTS[value]}</small>
              </span>
            </label>
          ))}
        </div>
        {err("intent")}
      </fieldset>

      <div className="field-row">
        <div className="field">
          <label htmlFor="cf-name">Your name</label>
          <input id="cf-name" name="name" className="input" autoComplete="name" required maxLength={LIMITS.name.max} {...a11y("name")} />
          {err("name")}
        </div>
        <div className="field">
          <label htmlFor="cf-email">Email</label>
          <input
            id="cf-email"
            name="email"
            type="email"
            className="input"
            autoComplete="email"
            inputMode="email"
            required
            maxLength={LIMITS.email.max}
            {...a11y("email")}
          />
          {err("email")}
        </div>
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="cf-company">
            {intent === "job" ? "Company" : "Company or organisation"} <span className="hint">(optional)</span>
          </label>
          <input id="cf-company" name="company" className="input" autoComplete="organization" maxLength={LIMITS.company.max} {...a11y("company")} />
          {err("company")}
        </div>
        {intent === "freelance" ? (
          <div className="field">
            <label htmlFor="cf-type">
              Type of project <span className="hint">(optional)</span>
            </label>
            <select
              id="cf-type"
              name="projectType"
              className="select"
              value={projectType}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setProjectType(e.target.value)}
              {...a11y("projectType")}
            >
              <option value="">Choose one…</option>
              {PROJECT_TYPES.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
            {err("projectType")}
          </div>
        ) : null}
      </div>

      <div className="field">
        <label htmlFor="cf-message">Message</label>
        <textarea
          id="cf-message"
          name="message"
          className="textarea"
          required
          minLength={LIMITS.message.min}
          maxLength={LIMITS.message.max}
          placeholder={PLACEHOLDERS[intent]}
          {...a11y("message")}
        />
        {err("message")}
      </div>

      {/* Honeypot: hidden from people and assistive tech; bots tend to fill every field. */}
      <div className="hp-field" aria-hidden="true">
        <label htmlFor="cf-website">Website</label>
        <input id="cf-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {status.kind === "success" || status.kind === "error" ? (
        <div
          ref={statusRef}
          tabIndex={-1}
          role={status.kind === "error" ? "alert" : "status"}
          className={`form-status form-status--${status.kind === "success" ? "ok" : "error"}`}
          data-testid="form-status"
        >
          {status.message}
        </div>
      ) : null}

      <div className="form-foot">
        <p id="form-note" className="small muted" style={{ maxWidth: "34ch" }}>
          Your details are used only to reply to you. No newsletters.
        </p>
        <button type="submit" className="btn" disabled={submitting} aria-disabled={submitting} data-testid="submit">
          {submitting ? (
            <>
              <span className="spinner" aria-hidden /> Sending…
            </>
          ) : (
            <>
              Send message <ArrowRight />
            </>
          )}
        </button>
      </div>
      <p className="sr-only" aria-live="polite">
        {submitting ? "Sending your message" : ""}
      </p>
    </form>
  );
}
