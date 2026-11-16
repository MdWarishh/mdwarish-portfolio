
"use client";

import {
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  Breadcrumbs,
  type BreadcrumbItem,
} from "./breadcrumbs";

const EASE = [0.22, 1, 0.36, 1] as const;

type PageVariant =
  | "about"
  | "skills"
  | "projects"
  | "experience"
  | "services"
  | "contact";

interface PageHeaderProps {
  number: string;
  label: string;
  title: string;
  intro: string;
  variant: PageVariant;
  breadcrumbs: BreadcrumbItem[];
}

const ARTWORK_PATHS: Record<PageVariant, string[]> = {
  about: [
    "M-50 250C120 100 200 330 365 170S590 95 790 260",
    "M-50 310C150 160 225 385 395 230S620 165 790 320",
    "M135 -30C195 105 165 245 330 350S500 430 650 530",
  ],

  skills: [
    "M-50 180C135 120 210 270 360 170S615 115 790 230",
    "M-50 280C145 205 245 355 420 255S645 205 790 320",
    "M200 -30C225 135 345 185 370 325S525 440 650 530",
  ],

  projects: [
    "M-50 250C140 115 230 335 390 180S625 90 790 260",
    "M-50 330C145 190 255 405 430 245S650 155 790 335",
    "M100 -30C185 90 160 265 335 365S540 420 700 530",
  ],

  experience: [
    "M-50 190C115 120 240 275 395 160S590 90 790 195",
    "M-50 285C115 230 265 365 420 260S630 185 790 295",
    "M245 -30C275 155 360 205 380 330S530 445 660 530",
  ],

  services: [
    "M-50 235C130 75 230 325 380 180S610 120 790 245",
    "M-50 315C145 155 265 405 440 260S650 210 790 335",
    "M155 -30C245 95 220 250 370 350S575 445 690 530",
  ],

  contact: [
    "M-50 260C135 105 225 345 385 200S610 110 790 265",
    "M-50 340C140 175 260 400 435 275S650 195 790 345",
    "M245 -30C305 110 310 225 405 335S560 430 680 530",
  ],
};

function PageHeaderArtwork({
  variant,
  reducedMotion,
}: {
  variant: PageVariant;
  reducedMotion: boolean;
}) {
  const paths = ARTWORK_PATHS[variant];

  return (
    <svg
      viewBox="0 0 760 500"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
      className="h-full w-full"
    >
      <defs>
        <linearGradient
          id="page-header-line-gradient"
          x1="0"
          y1="0"
          x2="760"
          y2="500"
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
            stopOpacity=".5"
          />
          <stop
            offset="1"
            stopColor="var(--accent)"
            stopOpacity=".03"
          />
        </linearGradient>
      </defs>

      {paths.map((path, index) => (
        <motion.path
          key={`${variant}-${index}`}
          d={path}
          stroke="url(#page-header-line-gradient)"
          strokeWidth={index === 1 ? 1.4 : 0.9}
          vectorEffect="non-scaling-stroke"
          initial={
            reducedMotion
              ? false
              : {
                  pathLength: 0,
                  opacity: 0,
                }
          }
          animate={{
            pathLength: 1,
            opacity: 1,
          }}
          transition={{
            duration: reducedMotion ? 0 : 1.8,
            delay: reducedMotion
              ? 0
              : 0.2 + index * 0.17,
            ease: EASE,
          }}
        />
      ))}

      <g
        stroke="var(--accent)"
        strokeWidth="1"
        strokeOpacity=".42"
      >
        <path d="M375 180h30M390 165v30" />
        <path d="M420 260h30M435 245v30" />
        <path d="M355 350h30M370 335v30" />
      </g>

      <g fill="var(--accent)">
        <circle cx="390" cy="180" r="2.5" opacity=".7" />
        <circle cx="435" cy="260" r="2" opacity=".5" />
        <circle cx="370" cy="350" r="2" opacity=".45" />
      </g>
    </svg>
  );
}

function BrandMark() {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className="h-8 w-8 shrink-0 text-ink"
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

export function PageHeader({
  number: _number,
  label,
  title,
  intro,
  variant,
  breadcrumbs,
}: PageHeaderProps) {
  const reducedMotion = Boolean(useReducedMotion());

  return (
    <section
      aria-labelledby="page-heading"
      className="
        relative isolate overflow-hidden
        border-b border-border
        bg-bg
      "
    >
      {/* Background artwork */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute -right-[38%] top-0
          -z-10 h-[500px] w-[760px]
          opacity-45
          sm:-right-[15%]
          lg:right-[-4%] lg:opacity-75
        "
      >
        <PageHeaderArtwork
          variant={variant}
          reducedMotion={reducedMotion}
        />
      </div>

      <div
        className="
          container-x relative z-10
          pb-14 pt-10
          sm:pb-20 sm:pt-14
          lg:pb-24
        "
      >
        {/* Breadcrumbs */}

        <div className="mb-10 sm:mb-14">
          <Breadcrumbs items={breadcrumbs} />
        </div>

        {/* Small brand and section title */}

        <motion.div
          initial={
            reducedMotion
              ? false
              : { opacity: 0, y: 12 }
          }
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: reducedMotion ? 0 : 0.6,
            ease: EASE,
          }}
          className="flex items-center gap-3"
        >
          <BrandMark />

          <span
            className="
              font-mono text-[10px]
              font-medium uppercase
              tracking-[0.18em]
              text-accent
            "
          >
            {label}
          </span>
        </motion.div>

        {/* Main heading */}

        <motion.h1
          id="page-heading"
          tabIndex={-1}
          initial={
            reducedMotion
              ? false
              : { opacity: 0, y: 25 }
          }
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: reducedMotion ? 0 : 0.85,
            delay: reducedMotion ? 0 : 0.08,
            ease: EASE,
          }}
          className="
            mt-7 max-w-[880px]
            font-display font-normal
            text-[clamp(2.9rem,5.7vw,5.7rem)]
            leading-[1.07]
            tracking-[-0.035em]
            text-ink outline-none
          "
        >
          {title}
        </motion.h1>

        {/* Introduction */}

        <motion.p
          initial={
            reducedMotion
              ? false
              : { opacity: 0, y: 16 }
          }
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: reducedMotion ? 0 : 0.7,
            delay: reducedMotion ? 0 : 0.2,
            ease: EASE,
          }}
          className="
            mt-7 max-w-[590px]
            text-[15px] leading-[1.9]
            text-text-muted
            sm:text-[16px]
          "
        >
          {intro}
        </motion.p>

        {/* Small architectural ending */}

        <motion.div
          aria-hidden="true"
          initial={
            reducedMotion
              ? false
              : { scaleX: 0, opacity: 0 }
          }
          animate={{
            scaleX: 1,
            opacity: 1,
          }}
          transition={{
            duration: reducedMotion ? 0 : 0.8,
            delay: reducedMotion ? 0 : 0.3,
            ease: EASE,
          }}
          style={{
            transformOrigin: "left",
          }}
          className="mt-10 h-px w-24 bg-accent/75"
        />
      </div>
    </section>
  );
}
