export interface ContactPayload {
  name: string;
  email: string;
  message: string;
  honeypot?: string;
  formLoadedAt?: number;
  idempotencyKey?: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
  sanitized?: {
    name: string;
    email: string;
    message: string;
    idempotencyKey: string;
  };
  isSpam?: boolean;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function sanitizeString(input: unknown, maxLength: number): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/[<>]/g, "")
    .trim()
    .slice(0, maxLength);
}

export function validateContactPayload(body: unknown): ValidationResult {
  const errors: Record<string, string> = {};

  if (!body || typeof body !== "object") {
    return { valid: false, errors: { form: "Invalid request payload." } };
  }

  const data = body as Record<string, unknown>;

  // Honeypot check
  if (typeof data.honeypot === "string" && data.honeypot.trim().length > 0) {
    return { valid: false, errors: {}, isSpam: true };
  }

  // Time-to-fill check (reject submissions faster than 1.2 seconds)
  if (typeof data.formLoadedAt === "number") {
    const elapsed = Date.now() - data.formLoadedAt;
    if (elapsed >= 0 && elapsed < 1200) {
      return { valid: false, errors: {}, isSpam: true };
    }
  }

  const name = sanitizeString(data.name, 100);
  const email = sanitizeString(data.email, 160).toLowerCase();
  const message = sanitizeString(data.message, 4000);
  const idempotencyKey = sanitizeString(data.idempotencyKey, 120);

  if (!name || name.length < 2) {
    errors.name = "Please enter your name (at least 2 characters).";
  }

  if (!email || !EMAIL_REGEX.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!message || message.length < 10) {
    errors.message = "Please write a brief message (at least 10 characters).";
  }

  if (Object.keys(errors).length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    errors: {},
    sanitized: {
      name,
      email,
      message,
      idempotencyKey,
    },
  };
}
