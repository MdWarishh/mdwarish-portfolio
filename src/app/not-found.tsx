
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
} from "lucide-react";

/* ==========================================
   CUSTOM 404 ARTWORK
========================================== */

function NotFoundArtwork() {
  return (
    <svg
      viewBox="0 0 580 340"
      fill="none"
      aria-hidden="true"
      className="h-full w-full"
    >
      <defs>
        <linearGradient
          id="not-found-gradient"
          x1="0"
          y1="0"
          x2="580"
          y2="340"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            stopColor="var(--accent)"
            stopOpacity="0"
          />
          <stop
            offset=".52"
            stopColor="var(--accent)"
            stopOpacity=".5"
          />
          <stop
            offset="1"
            stopColor="var(--accent)"
            stopOpacity=".05"
          />
        </linearGradient>
      </defs>

      {/* Architectural pathways */}

      <g
        stroke="url(#not-found-gradient)"
        strokeLinecap="round"
      >
        <path
          d="M-40 240C90 115 145 275 270 155S440 90 620 205"
          strokeWidth="1.2"
        />

        <path
          d="M-40 285C100 170 170 315 290 205S470 140 620 255"
          strokeWidth=".9"
        />

        <path
          d="M-40 330C100 235 190 360 330 260S475 215 620 315"
          strokeWidth=".8"
        />

        <path
          d="M135 -30C175 75 160 175 280 250S420 300 490 380"
          strokeWidth=".8"
        />
      </g>

      {/* Disconnected signal */}

      <g
        stroke="var(--accent)"
        strokeWidth="1.3"
        strokeLinecap="round"
      >
        <path
          d="M248 155H268"
          opacity=".55"
        />

        <path
          d="M290 155H313"
          opacity=".55"
        />

        <path
          d="M277 143L288 155L277 167"
          strokeWidth="1.6"
        />

        <path
          d="M325 70V92M314 81H336"
          opacity=".55"
        />

        <path
          d="M390 240V254M383 247H397"
          opacity=".35"
        />
      </g>

      <circle
        cx="270"
        cy="155"
        r="4"
        fill="var(--accent)"
        opacity=".75"
      />

      <circle
        cx="313"
        cy="155"
        r="4"
        stroke="var(--accent)"
        strokeWidth="1.4"
      />

      {/* Reference markers */}

      <g
        fill="var(--accent)"
        opacity=".45"
      >
        <circle cx="195" cy="205" r="2" />
        <circle cx="390" cy="240" r="2" />
        <circle cx="325" cy="81" r="2" />
      </g>
    </svg>
  );
}

/* ==========================================
   CUSTOM MW BRAND MARK
========================================== */

function BrandMark() {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className="h-9 w-9"
    >
      <path
        d="M5 36V12L15 25L24 12L33 25V12"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinejoin="miter"
      />

      <path
        d="M15 30L21 38L27 30L33 38L43 18"
        stroke="currentColor"
        strokeWidth="2.4"
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
   NOT FOUND PAGE
========================================== */

export default function NotFound() {
  return (
    <section
      aria-labelledby="not-found-heading"
      className="
        relative isolate
        flex min-h-[75vh]
        items-center overflow-hidden
        bg-bg
      "
    >
      {/* Background artwork */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute -right-[38%]
          top-1/2 -z-10
          h-[400px] w-[680px]
          -translate-y-1/2
          opacity-50
          sm:-right-[15%]
          lg:right-[-2%]
          lg:opacity-80
        "
      >
        <NotFoundArtwork />
      </div>

      <div
        className="
          container-x w-full
          py-20 sm:py-28 lg:py-32
        "
      >
        <div className="max-w-[820px]">
          {/* Eyebrow */}

          <div className="flex items-center gap-3">
            <BrandMark />

            <span className="label-mono">
              Page not found
            </span>
          </div>

          {/* Large typographic 404 */}

          <p
            aria-hidden="true"
            className="
              mt-10 font-display
              text-[clamp(6rem,17vw,13rem)]
              leading-[0.8]
              tracking-[-0.07em]
              text-ink
            "
          >
            404<span className="text-accent">.</span>
          </p>

          {/* Message */}

          <h1
            id="not-found-heading"
            className="
              mt-10 max-w-[690px]
              font-display font-normal
              text-[clamp(2.4rem,4.8vw,4.7rem)]
              leading-[1.1]
              tracking-[-0.035em]
              text-ink
            "
          >
            Looks like this path{" "}
            <em className="text-accent">
              ends here.
            </em>
          </h1>

          <p
            className="
              mt-6 max-w-[470px]
              text-[15px] leading-[1.9]
              text-text-muted
            "
          >
            The page you&apos;re looking for may have
            moved, or the address might be incorrect.
            Let&apos;s get you back to something useful.
          </p>

          {/* Navigation */}

          <div
            className="
              mt-9 flex flex-wrap
              items-center gap-x-8 gap-y-5
            "
          >
            <Link
              href="/"
              className="
                group inline-flex min-h-12
                items-center gap-3
                border-b border-accent
                pb-1 text-sm font-semibold
                text-ink
                transition-colors duration-300
                hover:text-accent
              "
            >
              <ArrowLeft
                aria-hidden="true"
                className="
                  h-4 w-4
                  transition-transform duration-300
                  group-hover:-translate-x-1
                "
              />

              Back to home
            </Link>

            <Link
              href="/projects"
              className="
                group inline-flex min-h-12
                items-center gap-2
                text-sm font-medium
                text-text-muted
                transition-colors duration-300
                hover:text-accent
              "
            >
              Explore projects

              <ArrowUpRight
                aria-hidden="true"
                className="
                  h-4 w-4
                  transition-transform duration-300
                  group-hover:-translate-y-0.5
                  group-hover:translate-x-0.5
                "
              />
            </Link>
          </div>
        </div>

        {/* Bottom caption */}

        <div
          className="
            mt-20 flex max-w-[820px]
            items-center gap-4
            border-t border-border pt-6
            sm:mt-28
          "
        >
          <span
            aria-hidden="true"
            className="h-px w-7 bg-accent"
          />

          <p
            className="
              font-mono text-[10px]
              uppercase tracking-[0.12em]
              text-text-muted
            "
          >
            No destination found at this address
          </p>
        </div>
      </div>
    </section>
  );
}
