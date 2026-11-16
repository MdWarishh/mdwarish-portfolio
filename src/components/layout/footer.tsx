
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  FileDown,
} from "lucide-react";

import {
  NAV_ITEMS,
  PERSONAL_INFO,
} from "@/data/navigation";

/* ==========================================
   MD WARISH — SIGNATURE BRAND MARK
========================================== */

function BrandMark({
  className = "h-10 w-10",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M5 36V12L15 25L24 12L33 25V12"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />

      <path
        d="M15 30L21 38L27 30L33 38L43 18"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />

      <path
        d="M38 9H43V14"
        stroke="var(--accent)"
        strokeWidth="2"
      />
    </svg>
  );
}

/* ==========================================
   ORIGINAL ARCHITECTURAL SVG ARTWORK
========================================== */

function FooterArtwork() {
  return (
    <svg
      viewBox="0 0 720 440"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      className="h-full w-full"
    >
      <defs>
        <linearGradient
          id="footer-line-gradient"
          x1="0"
          y1="0"
          x2="720"
          y2="440"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0"
            stopColor="var(--accent)"
            stopOpacity="0"
          />
          <stop
            offset=".48"
            stopColor="var(--accent)"
            stopOpacity=".42"
          />
          <stop
            offset="1"
            stopColor="var(--accent)"
            stopOpacity=".04"
          />
        </linearGradient>
      </defs>

      <g
        stroke="url(#footer-line-gradient)"
        strokeLinecap="round"
        fill="none"
      >
        <path
          d="M-60 300C105 150 165 345 330 195S565 80 780 260"
          strokeWidth="1.2"
        />
        <path
          d="M-60 355C115 205 175 395 350 245S590 135 780 315"
          strokeWidth=".9"
        />
        <path
          d="M-60 410C120 270 210 440 390 300S620 205 780 390"
          strokeWidth=".8"
        />

        <path
          d="M140 -40C220 100 205 205 340 310S525 395 620 485"
          strokeWidth=".8"
        />

        <path
          d="M295 -60C345 75 350 190 460 270S585 360 690 475"
          strokeWidth=".8"
        />
      </g>

      <g
        stroke="var(--accent)"
        strokeOpacity=".42"
        strokeWidth="1"
      >
        <path d="M315 195h30M330 180v30" />
        <path d="M375 300h30M390 285v30" />
        <path d="M445 270h30M460 255v30" />
      </g>

      <g fill="var(--accent)">
        <circle cx="330" cy="195" r="2.5" opacity=".6" />
        <circle cx="390" cy="300" r="2" opacity=".45" />
        <circle cx="460" cy="270" r="2.5" opacity=".55" />
      </g>
    </svg>
  );
}

/* ==========================================
   FOOTER NAVIGATION
========================================== */

function FooterNavigation() {
  return (
    <nav aria-label="Footer navigation">
      <p
        className="
          font-mono text-[10px]
          font-medium uppercase
          tracking-[0.18em]
          text-accent
        "
      >
        Explore
      </p>

      <ul className="mt-6 grid grid-cols-2 gap-x-8 gap-y-3">
        {NAV_ITEMS.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="
                group inline-flex items-center
                gap-2 py-0.5
                text-[13px] font-medium
                text-text-muted
                transition-colors duration-300
                hover:text-accent
                focus-visible:text-accent
              "
            >
              <span
                className="
                  h-px w-0 bg-accent
                  transition-[width] duration-300
                  group-hover:w-3
                  group-focus-visible:w-3
                "
                aria-hidden="true"
              />

              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/* ==========================================
   SOCIAL LINKS
========================================== */

function SocialLinks() {
  const links = [
    {
      label: "GitHub",
      href: PERSONAL_INFO.github,
      Icon: Github,
    },
    {
      label: "LinkedIn",
      href: PERSONAL_INFO.linkedin,
      Icon: Linkedin,
    },
  ].filter(
    (item) =>
      typeof item.href === "string" &&
      /^https?:\/\//i.test(item.href)
  );

  return (
    <div>
      <p
        className="
          font-mono text-[10px]
          font-medium uppercase
          tracking-[0.18em]
          text-accent
        "
      >
        Elsewhere
      </p>

      <ul className="mt-6 space-y-3">
        {links.map(({ href, label, Icon }) => (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${label} (opens in a new tab)`}
              className="
                group inline-flex items-center
                gap-2.5 py-0.5
                text-[13px] font-medium
                text-text-muted
                transition-colors duration-300
                hover:text-accent
              "
            >
              <Icon
                aria-hidden="true"
                className="h-4 w-4"
                strokeWidth={1.6}
              />

              <span>{label}</span>

              <ArrowUpRight
                aria-hidden="true"
                className="
                  h-3.5 w-3.5
                  opacity-40
                  transition-[transform,opacity]
                  duration-300
                  group-hover:-translate-y-0.5
                  group-hover:translate-x-0.5
                  group-hover:opacity-100
                "
              />
            </a>
          </li>
        ))}
      </ul>

      {PERSONAL_INFO.resumeUrl && (
        <a
          href={PERSONAL_INFO.resumeUrl}
          download
          className="
            group mt-5 inline-flex
            items-center gap-2.5
            py-0.5 text-[13px]
            font-medium text-text-muted
            transition-colors duration-300
            hover:text-accent
          "
        >
          <FileDown
            aria-hidden="true"
            className="h-4 w-4"
            strokeWidth={1.6}
          />

          Download resume
        </a>
      )}
    </div>
  );
}

/* ==========================================
   MAIN FOOTER
========================================== */

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="
        relative isolate overflow-hidden
        border-t border-border
        bg-bg text-text
      "
    >
      {/* ==================================
          UPPER EDITORIAL CTA
      ================================== */}

      <section
        aria-labelledby="footer-cta-heading"
        className="
          relative overflow-hidden
          border-b border-border
        "
      >
        {/* Decorative SVG background */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute -right-[23%] top-1/2
            h-[470px] w-[760px]
            -translate-y-1/2
            opacity-60
            sm:-right-[10%]
            lg:right-0
            lg:opacity-75
          "
        >
          <FooterArtwork />
        </div>

        <div
          className="
            container-x relative z-10
            py-16 sm:py-20 lg:py-24
          "
        >
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            {/* Main statement */}

            <div className="lg:col-span-9">
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-px w-8 bg-accent"
                />

                <p
                  className="
                    font-mono text-[10px]
                    font-medium uppercase
                    tracking-[0.17em]
                    text-accent
                  "
                >
                  Have a project in mind?
                </p>
              </div>

              <h2
                id="footer-cta-heading"
                className="
                  mt-7 max-w-[950px]
                  font-display font-normal
                  text-[clamp(2.7rem,5.8vw,5.7rem)]
                  leading-[1.08]
                  tracking-[-0.035em]
                  text-ink
                "
              >
                Let&apos;s make
                <br className="hidden sm:block" />
                {" "}
                <em className="font-normal text-accent">
                  it happen.
                </em>
              </h2>

              <p
                className="
                  mt-6 max-w-[480px]
                  text-[14px] leading-[1.85]
                  text-text-muted
                  sm:text-[15px]
                "
              >
                Thoughtful engineering for ambitious
                ideas. From the first conversation
                to a product ready for the real world.
              </p>
            </div>

            {/* Main CTA */}

            <div className="lg:col-span-3 lg:justify-self-end">
              <Link
                href="/contact"
                className="
                  group inline-flex
                  min-h-[54px] items-center
                  justify-between gap-8
                  border-b border-accent
                  pb-3 text-[14px]
                  font-semibold text-ink
                  transition-colors duration-300
                  hover:text-accent
                "
              >
                <span>Start a conversation</span>

                <ArrowUpRight
                  aria-hidden="true"
                  className="
                    h-5 w-5
                    transition-transform duration-500
                    ease-[cubic-bezier(0.22,1,0.36,1)]
                    group-hover:-translate-y-1
                    group-hover:translate-x-1
                  "
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================
          FOOTER CONTENT
      ================================== */}

      <div className="container-x">
        <div
          className="
            grid gap-x-12 gap-y-12
            py-14 sm:py-16
            lg:grid-cols-12
            lg:gap-x-14
          "
        >
          {/* Brand */}

          <div className="lg:col-span-5">
            <Link
              href="/"
              aria-label="MD Warish — Home"
              className="
                group inline-flex
                items-center text-ink
                transition-colors duration-300
                hover:text-accent
              "
            >
              <BrandMark className="h-[52px] w-[52px]" />
            </Link>

            <p
              className="
                mt-5 max-w-[345px]
                text-[14px] leading-[1.9]
                text-text-muted
              "
            >
              {PERSONAL_INFO.positioningLine}
            </p>

            {/* Email as typographic link */}

            {PERSONAL_INFO.email && (
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="
                  group mt-7 inline-flex
                  max-w-full items-center gap-3
                  border-b border-border
                  pb-2 text-[13px]
                  font-medium text-ink
                  transition-[color,border-color]
                  duration-300
                  hover:border-accent
                  hover:text-accent
                "
              >
                <Mail
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0"
                  strokeWidth={1.5}
                />

                <span className="min-w-0 break-all">
                  {PERSONAL_INFO.email}
                </span>

                <ArrowUpRight
                  aria-hidden="true"
                  className="
                    h-3.5 w-3.5 shrink-0
                    transition-transform duration-300
                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5
                  "
                />
              </a>
            )}
          </div>

          {/* Navigation */}

          <div className="sm:col-span-1 lg:col-span-4">
            <FooterNavigation />
          </div>

          {/* Social */}

          <div className="lg:col-span-3">
            <SocialLinks />
          </div>
        </div>

        {/* ==================================
            BOTTOM BAR
        ================================== */}

        <div
          className="
            flex flex-col gap-4
            border-t border-border
            py-6
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <p
            className="
              text-[11px] leading-[1.8]
              text-text-muted
            "
          >
            © {currentYear} {PERSONAL_INFO.name}.
            {" "}All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <p
              className="
                font-mono text-[10px]
                tracking-[0.04em]
                text-text-muted
              "
            >
              Designed &amp; developed with intention.
            </p>

            <a
              href="#top"
              className="
                group inline-flex
                items-center gap-2
                text-[11px] font-medium
                text-ink
                transition-colors duration-300
                hover:text-accent
              "
            >
              Back to top

              <ArrowRight
                aria-hidden="true"
                className="
                  h-3.5 w-3.5
                  -rotate-90
                  transition-transform duration-300
                  group-hover:-translate-y-1
                "
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
