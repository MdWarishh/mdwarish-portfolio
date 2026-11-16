"use client";

import React from "react";
import { motion } from "framer-motion";
import { Project } from "@/types";

export function AnimatedWordUnderline() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 240 12"
      fill="none"
      className="absolute -bottom-2 left-0 w-full h-2.5 text-accent pointer-events-none"
      preserveAspectRatio="none"
    >
      <motion.path
        d="M2 8.5C58 2.5 142 2.5 238 7.5"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.75, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
}

export function HeroSystemIllustration() {
  return (
    <div className="relative w-full max-w-[540px] mx-auto lg:ml-auto select-none">
      {/* Subtle ambient glow */}
      <div
        aria-hidden="true"
        className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-accent/10 via-transparent to-accent/5 blur-2xl pointer-events-none"
      />
      <svg
        viewBox="0 0 540 420"
        fill="none"
        role="img"
        aria-labelledby="hero-arch-title hero-arch-desc"
        className="relative w-full h-auto rounded-2xl border border-border bg-bg shadow-elevated overflow-hidden"
      >
        <title id="hero-arch-title">Full-Stack System Architecture Blueprint</title>
        <desc id="hero-arch-desc">
          Layered visual diagram showing Next.js frontend interfaces connected via REST APIs to Prisma, MongoDB, and PostgreSQL databases.
        </desc>

        {/* Background blueprint grid */}
        <defs>
          <pattern id="hero-grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path
              d="M 24 0 L 0 0 0 24"
              fill="none"
              stroke="var(--border)"
              strokeWidth="0.75"
              strokeDasharray="2 2"
            />
          </pattern>
        </defs>
        <rect width="540" height="420" fill="var(--bg)" />
        <rect width="540" height="420" fill="url(#hero-grid)" opacity="0.65" />

        {/* Top Browser Bar */}
        <rect
          x="20"
          y="20"
          width="500"
          height="36"
          rx="8"
          fill="var(--bg-soft)"
          stroke="var(--border)"
        />
        <circle cx="38" cy="38" r="4.5" fill="var(--border-strong)" />
        <circle cx="52" cy="38" r="4.5" fill="var(--border-strong)" />
        <circle cx="66" cy="38" r="4.5" fill="var(--border-strong)" />
        <rect
          x="140"
          y="29"
          width="260"
          height="18"
          rx="4"
          fill="var(--bg)"
          stroke="var(--border)"
        />
        <text
          x="270"
          y="41"
          textAnchor="middle"
          fill="var(--text-muted)"
          fontSize="10"
          fontFamily="monospace"
        >
          architecture // fullstack-runtime.ts
        </text>

        {/* Left Layer: Frontend UI Card */}
        <g>
          <rect
            x="32"
            y="78"
            width="210"
            height="145"
            rx="10"
            fill="var(--bg-soft)"
            stroke="var(--border)"
          />
          <text
            x="48"
            y="102"
            fill="var(--accent)"
            fontSize="10"
            fontFamily="monospace"
            fontWeight="600"
          >
            01 / CLIENT LAYER
          </text>
          <text
            x="48"
            y="122"
            fill="var(--ink)"
            fontSize="14"
            fontWeight="700"
          >
            Next.js · React · Angular
          </text>
          <rect x="48" y="138" width="140" height="8" rx="4" fill="var(--border)" />
          <rect x="48" y="154" width="175" height="8" rx="4" fill="var(--border)" />
          <rect x="48" y="178" width="76" height="24" rx="6" fill="var(--accent)" />
          <text x="86" y="194" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="600">
            SSR / ISR
          </text>
          <rect
            x="132"
            y="178"
            width="84"
            height="24"
            rx="6"
            fill="var(--bg)"
            stroke="var(--border)"
          />
          <text
            x="174"
            y="194"
            textAnchor="middle"
            fill="var(--text-muted)"
            fontSize="10"
            fontFamily="monospace"
          >
            TypeScript
          </text>
        </g>

        {/* Right Layer: API & Service Controller */}
        <g>
          <rect
            x="298"
            y="78"
            width="210"
            height="145"
            rx="10"
            fill="var(--bg-soft)"
            stroke="var(--border)"
          />
          <text
            x="314"
            y="102"
            fill="var(--accent)"
            fontSize="10"
            fontFamily="monospace"
            fontWeight="600"
          >
            02 / API GATEWAY
          </text>
          <text
            x="314"
            y="122"
            fill="var(--ink)"
            fontSize="14"
            fontWeight="700"
          >
            Node · Express · Spring
          </text>
          <text x="314" y="148" fill="var(--text-muted)" fontSize="11" fontFamily="monospace">
            POST /api/v1/crm/leads
          </text>
          <text x="314" y="166" fill="var(--text-muted)" fontSize="11" fontFamily="monospace">
            GET  /api/v1/inventory
          </text>
          <rect
            x="314"
            y="180"
            width="178"
            height="24"
            rx="6"
            fill="var(--bg)"
            stroke="var(--border)"
          />
          <circle cx="328" cy="192" r="4" fill="#10B981" />
          <text x="340" y="196" fill="var(--ink)" fontSize="10" fontFamily="monospace">
            200 OK · Schema Validated
          </text>
        </g>

        {/* Animated Connection Line between Client & API */}
        <motion.path
          d="M 242 150 L 298 150"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeDasharray="4 4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
        <circle cx="242" cy="150" r="4" fill="var(--accent)" />
        <circle cx="298" cy="150" r="4" fill="var(--accent)" />

        {/* Bottom Layer: Data, ORM & VPS Infrastructure */}
        <g>
          <rect
            x="32"
            y="262"
            width="476"
            height="126"
            rx="10"
            fill="var(--bg-soft)"
            stroke="var(--border)"
          />
          <text
            x="50"
            y="288"
            fill="var(--accent)"
            fontSize="10"
            fontFamily="monospace"
            fontWeight="600"
          >
            03 / DATA PERSISTENCE &amp; INFRASTRUCTURE
          </text>

          {/* 3 Sub-nodes inside Bottom Layer */}
          <rect
            x="50"
            y="304"
            width="136"
            height="64"
            rx="8"
            fill="var(--bg)"
            stroke="var(--border)"
          />
          <text x="64" y="328" fill="var(--ink)" fontSize="12" fontWeight="700">
            Prisma ORM
          </text>
          <text x="64" y="348" fill="var(--text-muted)" fontSize="10" fontFamily="monospace">
            Type-Safe Queries
          </text>

          <rect
            x="202"
            y="304"
            width="136"
            height="64"
            rx="8"
            fill="var(--bg)"
            stroke="var(--border)"
          />
          <text x="216" y="328" fill="var(--ink)" fontSize="12" fontWeight="700">
            MongoDB &amp; SQL
          </text>
          <text x="216" y="348" fill="var(--text-muted)" fontSize="10" fontFamily="monospace">
            Atlas · PostgreSQL
          </text>

          <rect
            x="354"
            y="304"
            width="136"
            height="64"
            rx="8"
            fill="var(--bg)"
            stroke="var(--border)"
          />
          <text x="368" y="328" fill="var(--ink)" fontSize="12" fontWeight="700">
            VPS &amp; Cloud
          </text>
          <text x="368" y="348" fill="var(--text-muted)" fontSize="10" fontFamily="monospace">
            Linux · Nginx · PM2
          </text>
        </g>

        {/* Vertical Connector Paths */}
        <motion.path
          d="M 137 223 L 137 262 M 403 223 L 403 262"
          stroke="var(--accent)"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.9, delay: 0.3 }}
        />
        <circle cx="137" cy="262" r="4" fill="var(--accent)" />
        <circle cx="403" cy="262" r="4" fill="var(--accent)" />
      </svg>
    </div>
  );
}

export function PageHeaderIllustration({
  variant,
}: {
  variant: "about" | "skills" | "projects" | "experience" | "services" | "contact";
}) {
  return (
    <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl border border-border bg-bg-soft p-4 flex items-center justify-center shrink-0 shadow-subtle">
      {variant === "about" && (
        <svg viewBox="0 0 80 80" fill="none" aria-hidden="true" className="w-full h-full">
          <rect x="10" y="10" width="60" height="60" rx="12" stroke="var(--border-strong)" strokeWidth="1.5" />
          <circle cx="40" cy="32" r="10" stroke="var(--accent)" strokeWidth="2" />
          <path d="M22 60C25 49 55 49 58 60" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" />
          <circle cx="62" cy="18" r="3" fill="var(--accent)" />
        </svg>
      )}
      {variant === "skills" && (
        <svg viewBox="0 0 80 80" fill="none" aria-hidden="true" className="w-full h-full">
          <rect x="10" y="10" width="26" height="26" rx="6" stroke="var(--accent)" strokeWidth="2" />
          <rect x="44" y="10" width="26" height="26" rx="6" stroke="var(--ink)" strokeWidth="1.5" />
          <rect x="10" y="44" width="26" height="26" rx="6" stroke="var(--ink)" strokeWidth="1.5" />
          <rect x="44" y="44" width="26" height="26" rx="6" stroke="var(--accent)" strokeWidth="2" />
          <path d="M36 23H44M23 36V44M57 36V44M36 57H44" stroke="var(--border-strong)" strokeWidth="1.5" />
        </svg>
      )}
      {variant === "projects" && (
        <svg viewBox="0 0 80 80" fill="none" aria-hidden="true" className="w-full h-full">
          <rect x="8" y="14" width="64" height="52" rx="8" stroke="var(--ink)" strokeWidth="1.75" />
          <path d="M8 26H72" stroke="var(--border-strong)" strokeWidth="1.5" />
          <circle cx="16" cy="20" r="2" fill="var(--accent)" />
          <circle cx="23" cy="20" r="2" fill="var(--border-strong)" />
          <rect x="16" y="34" width="22" height="24" rx="4" stroke="var(--accent)" strokeWidth="1.75" />
          <path d="M44 38H62M44 46H58M44 54H52" stroke="var(--ink)" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      )}
      {variant === "experience" && (
        <svg viewBox="0 0 80 80" fill="none" aria-hidden="true" className="w-full h-full">
          <path d="M24 12V68" stroke="var(--border-strong)" strokeWidth="2" strokeDasharray="3 3" />
          <circle cx="24" cy="24" r="5" fill="var(--accent)" />
          <circle cx="24" cy="54" r="5" fill="var(--bg)" stroke="var(--ink)" strokeWidth="2" />
          <rect x="36" y="16" width="34" height="16" rx="4" stroke="var(--ink)" strokeWidth="1.75" />
          <rect x="36" y="46" width="34" height="16" rx="4" stroke="var(--accent)" strokeWidth="1.75" />
        </svg>
      )}
      {variant === "services" && (
        <svg viewBox="0 0 80 80" fill="none" aria-hidden="true" className="w-full h-full">
          <polygon points="40,10 68,25 40,40 12,25" stroke="var(--accent)" strokeWidth="2" fill="none" />
          <polyline points="12,40 40,55 68,40" stroke="var(--ink)" strokeWidth="1.75" fill="none" />
          <polyline points="12,54 40,69 68,54" stroke="var(--border-strong)" strokeWidth="1.75" fill="none" />
        </svg>
      )}
      {variant === "contact" && (
        <svg viewBox="0 0 80 80" fill="none" aria-hidden="true" className="w-full h-full">
          <rect x="10" y="18" width="60" height="44" rx="8" stroke="var(--ink)" strokeWidth="1.75" />
          <path d="M14 22L40 43L66 22" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="60" cy="20" r="4" fill="var(--accent)" />
        </svg>
      )}
    </div>
  );
}

export function ProjectBrowserFallback({
  project,
  variant = "card",
}: {
  project: Project;
  variant?: "card" | "detail";
}) {
  const isCrm = project.category === "CRM & Applications";
  const isEcommerce = project.category === "E-commerce";

  return (
    <div className="relative w-full h-full min-h-[220px] bg-bg-soft overflow-hidden flex flex-col justify-between p-5 sm:p-6 select-none border-b border-border">
      {/* Subtle architectural background grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-45 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(var(--border-strong) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      />

      {/* Top Browser Chrome Bar */}
      <div className="relative z-10 flex items-center justify-between gap-3 pb-3 border-b border-border">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-border-strong" />
          <span className="w-2.5 h-2.5 rounded-full bg-border-strong" />
          <span className="w-2.5 h-2.5 rounded-full bg-accent" />
        </div>
        <div className="px-2.5 py-0.5 rounded bg-bg border border-border text-[11px] font-mono text-text-muted truncate max-w-[220px]">
          {project.liveUrl
            ? project.liveUrl.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")
            : `repo // ${project.slug}`}
        </div>
        <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-accent/10 text-accent font-semibold">
          {isCrm ? "APP / CRM" : isEcommerce ? "STORE" : "B2B EXPO"}
        </span>
      </div>

      {/* Center Architectural Mockup Content */}
      <div className="relative z-10 my-auto py-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[11px] font-mono uppercase tracking-widest text-text-muted">
            {project.category}
          </span>
        </div>
        <p
          className={`font-display font-bold tracking-tight text-ink ${
            variant === "detail" ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl"
          }`}
        >
          {project.title}
        </p>

        {/* Mini wireframe bars representing the project type */}
        <div className="mt-4 grid grid-cols-3 gap-2 max-w-sm">
          <div className="h-8 rounded-md bg-bg border border-border p-1.5 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-accent shrink-0" />
            <span className="h-1.5 w-full rounded bg-border" />
          </div>
          <div className="h-8 rounded-md bg-bg border border-border p-1.5 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-border-strong shrink-0" />
            <span className="h-1.5 w-full rounded bg-border" />
          </div>
          <div className="h-8 rounded-md bg-bg border border-border p-1.5 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-border-strong shrink-0" />
            <span className="h-1.5 w-full rounded bg-border" />
          </div>
        </div>
      </div>

      {/* Bottom Tech Stack Pills */}
      <div className="relative z-10 flex flex-wrap items-center gap-1.5 pt-2">
        {project.technologies.slice(0, 4).map((tech) => (
          <span
            key={tech}
            className="text-[11px] font-mono px-2 py-0.5 rounded bg-bg border border-border text-text-muted"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
