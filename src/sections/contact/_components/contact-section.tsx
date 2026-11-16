"use client";

import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Loader2, Mail, Send } from "lucide-react";
import { PERSONAL_INFO } from "@/data/navigation";

const EASE = [0.22, 1, 0.36, 1] as const;
type Status = "idle" | "submitting" | "success" | "error";
type Field = "name" | "email" | "message";
type Errors = Partial<Record<Field, string>>;

function createKey() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function BrandMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className={className}>
      <path d="M5 36V12L15 25L24 12L33 25V12" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="miter" />
      <path d="M15 30L21 38L27 30L33 38L43 18" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="miter" />
      <path d="M38 9H43V14" stroke="var(--accent)" strokeWidth="2" />
    </svg>
  );
}

function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: reduced ? 0 : 0.75, delay: reduced ? 0 : delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* An original circuit-to-message composition; decorative, not form UI. */
function SignalArtwork() {
  const reduced = useReducedMotion();
  const lines = [
    "M-30 190 C105 190 130 64 267 64 H456",
    "M-30 242 H150 C235 242 215 154 318 154 H525",
    "M-30 300 C110 300 145 369 277 369 H525",
    "M210 -15 C210 100 345 105 345 230 S470 340 585 440",
  ];
  return (
    <svg viewBox="0 0 600 440" fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden="true" className="h-full w-full">
      <defs>
        <linearGradient id="contact-signal-stroke" x1="0" y1="0" x2="600" y2="440" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--accent)" stopOpacity="0" />
          <stop offset=".52" stopColor="var(--accent)" stopOpacity=".52" />
          <stop offset="1" stopColor="var(--accent)" stopOpacity=".08" />
        </linearGradient>
      </defs>
      {lines.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          stroke="url(#contact-signal-stroke)"
          strokeWidth={i === 1 ? 1.5 : 0.8}
          initial={reduced ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: reduced ? 0 : 1.8, delay: reduced ? 0 : 0.2 + i * 0.16, ease: EASE }}
        />
      ))}
      <motion.g
        initial={reduced ? false : { opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: reduced ? 0 : 0.9, delay: reduced ? 0 : 0.7, ease: EASE }}
        style={{ transformOrigin: "420px 218px" }}
      >
        <path d="M304 158H536V277H304V158Z" fill="var(--bg)" stroke="var(--accent)" strokeOpacity=".55" />
        <path d="M304 158L420 239L536 158" stroke="var(--accent)" strokeOpacity=".65" />
        <path d="M304 277L391 219M536 277L449 219" stroke="var(--accent)" strokeOpacity=".22" />
        <path d="M290 145h20M300 135v20M530 289h20M540 279v20" stroke="var(--accent)" strokeOpacity=".45" />
      </motion.g>
    </svg>
  );
}

const INPUT = "w-full rounded-none border-0 border-b border-border bg-transparent px-0 py-3 text-[15px] leading-6 text-ink placeholder:text-text-muted/60 outline-none transition-colors duration-300 focus:border-accent focus-visible:border-accent disabled:opacity-60";
const LABEL = "block text-[12px] font-medium tracking-[0.02em] text-ink";

export function ContactSection() {
  const reduced = useReducedMotion();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [formLoadedAt, setFormLoadedAt] = useState(0);
  const [idempotencyKey, setIdempotencyKey] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");

  useEffect(() => {
    setFormLoadedAt(Date.now());
    setIdempotencyKey(createKey());
    const selected = new URLSearchParams(window.location.search).get("service");
    if (selected && selected.length <= 120) {
      setMessage((current) => current || `Hello MD Warish, I'd like to discuss ${selected}.\n\nProject details: `);
    }
  }, []);

  function clearError(field: Field) {
    setErrors((current) => ({ ...current, [field]: undefined }));
    if (status === "error") {
      setStatus("idle");
      setServerMessage("");
    }
  }

  function validate() {
    const next: Errors = {};
    if (name.trim().length < 2) next.name = "Please enter at least 2 characters.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) next.email = "Enter a valid email address.";
    if (message.trim().length < 10) next.message = "Please include at least 10 characters.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting" || !validate()) return;
    setStatus("submitting");
    setServerMessage("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(), email: email.trim(), message: message.trim(),
          honeypot, formLoadedAt, idempotencyKey,
        }),
      });
      const data: {
        ok?: boolean;
        message?: string;
        errors?: Errors;
      } = await response.json();
      if (!response.ok || !data.ok) {
        setErrors(data.errors ?? {});
        setServerMessage(data.message || "Could not send the message. Please contact me by email.");
        setStatus("error");
        return;
      }
      setStatus("success");
      setServerMessage(data.message || "Your message has been received.");
      setName(""); setEmail(""); setMessage(""); setHoneypot(""); setErrors({});
      setFormLoadedAt(Date.now());
      setIdempotencyKey(createKey());
    } catch {
      setStatus("error");
      setServerMessage("A network error occurred. Please try again or use email directly.");
    }
  }

  const socialLinks = [
    { label: "LinkedIn", href: PERSONAL_INFO.linkedin, Icon: Linkedin },
    { label: "GitHub", href: PERSONAL_INFO.github, Icon: Github },
  ].filter((link) => typeof link.href === "string" && /^https?:\/\//.test(link.href));

  return (
    <div className="overflow-hidden bg-bg">
      <section aria-labelledby="contact-heading" className="relative isolate border-b border-border">
        <div className="pointer-events-none absolute -right-40 top-0 -z-10 hidden h-[480px] w-[660px] opacity-55 md:block lg:opacity-80">
          <SignalArtwork />
        </div>
        <div className="container-x relative z-10 pb-12 pt-14 sm:pb-16 sm:pt-20 lg:pt-24">
          <Reveal className="flex items-center gap-3">
            <BrandMark className="h-8 w-8 text-ink" />
            <span className="label-mono">Get in touch</span>
          </Reveal>
          <motion.h1
            id="contact-heading"
            initial={reduced ? false : { opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.85, ease: EASE }}
            className="mt-7 max-w-[780px] font-display text-[clamp(3.15rem,6.2vw,6.1rem)] font-normal leading-[1.06] tracking-[-0.035em] text-ink"
          >
            Have something <em className="text-accent">in mind?</em>
          </motion.h1>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-[530px] text-[15px] leading-[1.85] text-text-muted sm:text-[16px]">
              Tell me what you&apos;re building, what needs improving, or where you need engineering support. I&apos;d be glad to hear about it.
            </p>
          </Reveal>
        </div>
      </section>

      <section aria-label="Contact options and inquiry form" className="container-x py-14 sm:py-20 lg:py-24">
        <div className="grid items-start gap-14 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-5">
            <p className="label-mono">Direct contact</p>
            <h2 className="mt-5 max-w-sm font-display text-[clamp(2rem,3.2vw,3.1rem)] leading-[1.13] tracking-[-0.025em] text-ink">
              Good conversations start <em className="text-accent">here.</em>
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-[1.85] text-text-muted">
              Prefer email? Use the address below. You can also see my work and connect through my professional profiles.
            </p>

            {PERSONAL_INFO.availability && (
              <p className="mt-7 flex items-center gap-3 text-xs text-text-muted">
                <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 bg-accent" />
                {PERSONAL_INFO.availability}
              </p>
            )}

            <div className="mt-9 border-t border-border">
              {PERSONAL_INFO.email && (
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="group flex items-center justify-between gap-4 border-b border-border py-5"
                >
                  <span className="min-w-0">
                    <span className="flex items-center gap-2 text-xs text-text-muted"><Mail className="h-4 w-4" /> Email</span>
                    <span className="mt-2 block break-all text-[15px] font-medium text-ink transition-colors group-hover:text-accent">{PERSONAL_INFO.email}</span>
                  </span>
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0 text-accent transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                </a>
              )}
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 border-b border-border py-5"
                >
                  <span className="flex items-center gap-3 text-[14px] font-medium text-ink transition-colors group-hover:text-accent">
                    <Icon className="h-4 w-4 text-accent" aria-hidden="true" /> {label}
                  </span>
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4 text-text-muted transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent" />
                </a>
              ))}
            </div>
            <div aria-hidden="true" className="mt-10 hidden max-w-[300px] opacity-60 lg:block">
              <SignalArtwork />
            </div>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-7">
            <div className="border-t border-accent pt-6 sm:pt-8">
              <div className="mb-8 flex items-end justify-between gap-4">
                <div>
                  <p className="label-mono">Project inquiry</p>
                  <h2 className="mt-3 font-display text-[clamp(1.9rem,3vw,2.6rem)] leading-[1.15] tracking-[-0.02em] text-ink">Send a message.</h2>
                </div>
                <Send aria-hidden="true" strokeWidth={1.3} className="mb-1 h-6 w-6 text-accent" />
              </div>

              {status === "success" ? (
                <div role="status" aria-live="polite" className="border-y border-border py-12">
                  <motion.svg viewBox="0 0 64 64" fill="none" className="h-14 w-14 text-accent" aria-hidden="true">
                    <path d="M9 32L25 47L55 17" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
                    <motion.path d="M9 32L25 47L55 17" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" initial={reduced ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: reduced ? 0 : 0.65, ease: EASE }} />
                  </motion.svg>
                  <h3 className="mt-5 font-display text-3xl text-ink">Message received.</h3>
                  <p className="mt-3 max-w-md text-sm leading-7 text-text-muted">{serverMessage}</p>
                  <button
                    type="button"
                    onClick={() => { setStatus("idle"); setServerMessage(""); setErrors({}); setFormLoadedAt(Date.now()); setIdempotencyKey(createKey()); }}
                    className="mt-7 border-b border-accent pb-1 text-sm font-semibold text-ink hover:text-accent"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-7">
                  <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
                    <label htmlFor="contact-website-hp">Website</label>
                    <input id="contact-website-hp" type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
                  </div>

                  <div className="grid gap-7 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-name" className={LABEL}>Your name <span className="text-accent">*</span></label>
                      <input
                        id="contact-name" name="name" type="text" autoComplete="name" required maxLength={120}
                        value={name} disabled={status === "submitting"} placeholder="Your full name"
                        aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "contact-name-error" : undefined}
                        onChange={(e) => { setName(e.target.value); clearError("name"); }}
                        className={INPUT}
                      />
                      {errors.name && <p id="contact-name-error" className="mt-2 text-xs text-red-600 dark:text-red-400">{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="contact-email" className={LABEL}>Email address <span className="text-accent">*</span></label>
                      <input
                        id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254}
                        value={email} disabled={status === "submitting"} placeholder="you@company.com"
                        aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "contact-email-error" : undefined}
                        onChange={(e) => { setEmail(e.target.value); clearError("email"); }}
                        className={INPUT}
                      />
                      {errors.email && <p id="contact-email-error" className="mt-2 text-xs text-red-600 dark:text-red-400">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className={LABEL}>About your project <span className="text-accent">*</span></label>
                    <textarea
                      id="contact-message" name="message" required rows={6} maxLength={10000}
                      value={message} disabled={status === "submitting"}
                      placeholder="What are you building? Share your goals, scope or timeline…"
                      aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "contact-message-error" : undefined}
                      onChange={(e) => { setMessage(e.target.value); clearError("message"); }}
                      className={`${INPUT} min-h-[150px] resize-y`}
                    />
                    {errors.message && <p id="contact-message-error" className="mt-2 text-xs text-red-600 dark:text-red-400">{errors.message}</p>}
                  </div>

                  {status === "error" && serverMessage && (
                    <div role="alert" className="border-l-2 border-red-500 bg-red-500/5 px-4 py-3 text-sm leading-6 text-red-700 dark:text-red-300">
                      {serverMessage}
                    </div>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-5 pt-1">
                    <p className="max-w-[290px] text-xs leading-[1.7] text-text-muted">Your message is sent securely to my contact endpoint. Required fields are marked *.</p>
                    <button
                      type="submit" disabled={status === "submitting"}
                      className="group inline-flex min-h-[50px] items-center justify-center gap-3 bg-accent px-6 text-sm font-semibold text-[color:var(--on-accent)] transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {status === "submitting" ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />}
                      {status === "submitting" ? "Sending…" : "Send inquiry"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
