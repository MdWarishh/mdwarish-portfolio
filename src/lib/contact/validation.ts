/**
 * Contact form validation, shared by the browser (instant feedback) and the API route (authoritative).
 * Dependency-free on purpose so it adds almost nothing to the client bundle.
 */

export const INTENTS = ["freelance", "job", "other"] as const;
export type Intent = (typeof INTENTS)[number];

export const INTENT_LABELS: Record<Intent, string> = {
  freelance: "Freelance project",
  job: "Full-time opportunity",
  other: "Something else",
};

export const PROJECT_TYPES = [
  { value: "custom-websites", label: "Website" },
  { value: "full-stack-applications", label: "Web application" },
  { value: "crm-business-systems", label: "CRM or business system" },
  { value: "b2b-portals", label: "B2B or exhibition portal" },
  { value: "ecommerce", label: "E-commerce store" },
  { value: "api-integrations", label: "Integration" },
  { value: "redesign-modernisation", label: "Redesign" },
  { value: "deployment-maintenance", label: "Deployment or maintenance" },
  { value: "not-sure", label: "Not sure yet" },
] as const;
export type ProjectType = (typeof PROJECT_TYPES)[number]["value"];

export const LIMITS = {
  name: { min: 2, max: 80 },
  email: { max: 254 },
  company: { max: 120 },
  message: { min: 20, max: 4000 },
  /** Submissions faster than this after the form rendered are treated as automated. */
  minFillMs: 2500,
} as const;

export type ContactInput = {
  intent: Intent;
  name: string;
  email: string;
  company?: string;
  projectType?: ProjectType;
  message: string;
  idempotencyKey: string;
};

export type FieldName = "intent" | "name" | "email" | "company" | "projectType" | "message";
export type FieldErrors = Partial<Record<FieldName, string>>;

export type ValidationResult = { ok: true; value: ContactInput } | { ok: false; errors: FieldErrors };

const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]{2,}$/;
const KEY_RE = /^[A-Za-z0-9-]{16,64}$/;

/** Trim, collapse internal whitespace (except newlines in messages) and drop control characters. */
function clean(value: unknown, keepNewlines = false): string {
  if (typeof value !== "string") return "";
  // eslint-disable-next-line no-control-regex
  const noControl = value.replace(keepNewlines ? /[\u0000-\u0009\u000B-\u001F\u007F]/g : /[\u0000-\u001F\u007F]/g, "");
  return keepNewlines
    ? noControl.replace(/[ \t]+/g, " ").replace(/\n{3,}/g, "\n\n").trim()
    : noControl.replace(/\s+/g, " ").trim();
}

export function validateContact(raw: unknown): ValidationResult {
  const data = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const errors: FieldErrors = {};

  const intent = clean(data.intent) as Intent;
  if (!INTENTS.includes(intent)) errors.intent = "Choose what your message is about.";

  const name = clean(data.name);
  if (name.length < LIMITS.name.min) errors.name = "Please enter your name.";
  else if (name.length > LIMITS.name.max) errors.name = `Please keep your name under ${LIMITS.name.max} characters.`;

  const email = clean(data.email).toLowerCase();
  if (!email) errors.email = "Please enter your email address.";
  else if (email.length > LIMITS.email.max || !EMAIL_RE.test(email))
    errors.email = "That email address doesn't look right.";

  const company = clean(data.company);
  if (company.length > LIMITS.company.max)
    errors.company = `Please keep this under ${LIMITS.company.max} characters.`;

  const projectTypeRaw = clean(data.projectType);
  const projectType = PROJECT_TYPES.some((p) => p.value === projectTypeRaw)
    ? (projectTypeRaw as ProjectType)
    : undefined;
  if (projectTypeRaw && !projectType) errors.projectType = "Choose an option from the list.";

  const message = clean(data.message, true);
  if (message.length < LIMITS.message.min)
    errors.message = `Please add a little more detail (at least ${LIMITS.message.min} characters).`;
  else if (message.length > LIMITS.message.max)
    errors.message = `Please keep your message under ${LIMITS.message.max} characters.`;

  const idempotencyKey = clean(data.idempotencyKey);
  if (!KEY_RE.test(idempotencyKey)) {
    // Not a field the visitor can fix; surface it on the message so the form shows something.
    errors.message ??= "Something went wrong preparing the form. Please reload the page and try again.";
  }

  if (Object.keys(errors).length) return { ok: false, errors };
  return {
    ok: true,
    value: {
      intent,
      name,
      email,
      company: company || undefined,
      projectType: intent === "freelance" ? projectType : undefined,
      message,
      idempotencyKey,
    },
  };
}

/** Honeypot filled, or the form was submitted implausibly fast. */
export function isLikelyBot(raw: unknown, now: number): boolean {
  const data = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  if (typeof data.website === "string" && data.website.trim() !== "") return true;
  const startedAt = Number(data.startedAt);
  if (!Number.isFinite(startedAt)) return true;
  return now - startedAt < LIMITS.minFillMs;
}
