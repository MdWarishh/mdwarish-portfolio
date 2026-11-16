
"use client";

import {
  useRef,
  type ReactNode,
} from "react";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

import {
  ArrowDown,
  ArrowUpRight,
  BriefcaseBusiness,
  Code2,
  MapPin,
} from "lucide-react";

import { EXPERIENCE_ITEMS } from "@/data/experience";

const EASE = [0.22, 1, 0.36, 1] as const;

/* =========================================
   MW SIGNATURE
========================================= */

function BrandMark({
  className = "h-9 w-9",
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

/* =========================================
   SCROLL REVEAL
========================================= */

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={
        reduced
          ? false
          : { opacity: 0, y: 24 }
      }
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.12,
      }}
      transition={{
        duration: reduced ? 0 : 0.8,
        delay: reduced ? 0 : delay,
        ease: EASE,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* =========================================
   ORIGINAL ARCHITECTURAL BACKGROUND SVG
   Inspired by system schematics and
   technical drafting, not generic grids
========================================= */

function EngineeringArtwork() {
  const reduced = useReducedMotion();

  const paths = [
    "M-70 170 C120 175 185 35 360 100 S575 260 770 110",
    "M-80 245 C130 210 215 120 390 175 S590 325 790 175",
    "M-80 325 C135 270 240 205 410 245 S630 395 800 245",
    "M90 -40 C110 140 270 145 305 300 S475 430 585 530",
    "M270 -40 C300 130 435 145 465 305 S605 455 735 550",
  ];

  return (
    <svg
      viewBox="0 0 760 510"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      className="h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="exp-art-gradient"
          x1="0"
          y1="0"
          x2="760"
          y2="510"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            stopColor="var(--accent)"
            stopOpacity="0"
          />
          <stop
            offset=".45"
            stopColor="var(--accent)"
            stopOpacity=".38"
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
          key={path}
          d={path}
          stroke="url(#exp-art-gradient)"
          strokeWidth={index === 1 ? 1.5 : 0.85}
          vectorEffect="non-scaling-stroke"
          initial={
            reduced
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
            duration: reduced ? 0 : 2.1,
            delay: reduced
              ? 0
              : 0.25 + index * 0.16,
            ease: EASE,
          }}
        />
      ))}

      <g
        stroke="var(--accent)"
        strokeOpacity=".4"
        strokeWidth=".85"
      >
        <path d="M345 100h30M360 85v30" />
        <path d="M395 245h30M410 230v30" />
        <path d="M290 300h30M305 285v30" />
        <path d="M450 305h30M465 290v30" />
      </g>

      {[
        [360, 100],
        [390, 175],
        [410, 245],
        [305, 300],
        [465, 305],
      ].map(([cx, cy], index) => (
        <motion.circle
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          r="2.5"
          fill="var(--accent)"
          initial={
            reduced
              ? false
              : { opacity: 0, scale: 0 }
          }
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: reduced ? 0 : 0.5,
            delay: reduced
              ? 0
              : 0.9 + index * 0.12,
          }}
        />
      ))}
    </svg>
  );
}

/* =========================================
   EXPERIMENTAL EDITORIAL HERO
========================================= */

function ExperienceHero() {
  const heroRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const rawArtworkY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 90]
  );

  const artworkY = useSpring(rawArtworkY, {
    stiffness: 75,
    damping: 25,
  });

  return (
    <section
      ref={heroRef}
      aria-labelledby="experience-heading"
      className="
        relative isolate overflow-hidden
        border-b border-border bg-bg
      "
    >
      <motion.div
        aria-hidden="true"
        style={{
          y: reduced ? 0 : artworkY,
        }}
        className="
          pointer-events-none absolute
          -right-[40%] top-[3%] -z-10
          h-[520px] w-[800px]
          opacity-55
          sm:-right-[20%]
          lg:-right-[5%] lg:opacity-85
        "
      >
        <EngineeringArtwork />
      </motion.div>

      <div className="container-x relative z-10 py-16 sm:py-20 lg:py-28">
        <Reveal className="flex items-center gap-3">
          <BrandMark className="h-9 w-9 text-ink" />
          <span className="label-mono">
            Professional experience
          </span>
        </Reveal>

        <h1
          id="experience-heading"
          className="
            mt-8 max-w-[900px]
            font-display font-normal
            text-[clamp(3.2rem,6.1vw,6.1rem)]
            leading-[1.06]
            tracking-[-0.036em]
            text-ink
          "
        >
          <motion.span
            className="block"
            initial={
              reduced
                ? false
                : { opacity: 0, y: 28 }
            }
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduced ? 0 : 0.9,
              ease: EASE,
            }}
          >
            Experience built
          </motion.span>

          <motion.span
            className="block italic text-accent"
            initial={
              reduced
                ? false
                : { opacity: 0, y: 28 }
            }
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduced ? 0 : 0.9,
              delay: reduced ? 0 : 0.12,
              ease: EASE,
            }}
          >
            through real work.
          </motion.span>
        </h1>

        <Reveal
          delay={0.16}
          className="mt-8 max-w-[580px]"
        >
          <p className="text-[15px] leading-[1.9] text-text-muted sm:text-[17px]">
            My professional journey across
            full-stack engineering, business
            platforms and production web
            applications—turning requirements
            into reliable digital experiences.
          </p>
        </Reveal>

        <Reveal
          delay={0.25}
          className="mt-9"
        >
          <a
            href="#career-journey"
            className="
              group inline-flex min-h-11
              items-center gap-3
              border-b border-accent pb-1
              text-sm font-medium text-ink
              transition-colors hover:text-accent
            "
          >
            Explore my journey
            <ArrowDown
              aria-hidden="true"
              className="
                h-4 w-4 transition-transform
                duration-300
                group-hover:translate-y-1
              "
            />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* =========================================
   EXPERIENCE ENTRY
========================================= */

type ExperienceItem =
  (typeof EXPERIENCE_ITEMS)[number];

function CareerEntry({
  item,
}: {
  item: ExperienceItem;
}) {
  return (
    <motion.article
      id={`experience-${item.id}`}
      initial={{
        opacity: 0,
        y: 22,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.12,
      }}
      transition={{
        duration: 0.75,
        ease: EASE,
      }}
      className="
        relative grid gap-7
        border-b border-border
        py-12
        sm:py-16
        lg:grid-cols-12 lg:gap-12
      "
    >
      {/* Career line marker */}

      <div
        aria-hidden="true"
        className="
          absolute -left-[31px] top-[54px]
          z-10 h-[11px] w-[11px]
          border-2 border-accent
          bg-bg
          sm:-left-[39px] sm:top-[70px]
        "
      />

      {/* Left: time and company */}

      <div className="lg:col-span-4">
        <div className="flex items-center gap-2 text-accent">
          <BriefcaseBusiness
            aria-hidden="true"
            className="h-4 w-4"
            strokeWidth={1.5}
          />

          <span className="font-mono text-[11px] uppercase tracking-[0.12em]">
            Professional role
          </span>
        </div>

        <h2 className="mt-5 max-w-[340px] font-display text-[clamp(1.9rem,2.8vw,2.8rem)] leading-[1.13] tracking-[-0.025em] text-ink">
          {item.company}
        </h2>

        <p className="mt-4 font-mono text-[12px] leading-relaxed text-accent">
          {item.period}
        </p>

        {item.location && (
          <p className="mt-3 inline-flex items-start gap-2 text-xs leading-relaxed text-text-muted">
            <MapPin
              aria-hidden="true"
              className="mt-0.5 h-3.5 w-3.5 shrink-0"
            />
            {item.location}
          </p>
        )}
      </div>

      {/* Right: actual role and work */}

      <div className="lg:col-span-8">
        <h3 className="font-display text-[clamp(1.9rem,3.1vw,3rem)] leading-[1.13] tracking-[-0.025em] text-ink">
          {item.role}
        </h3>

        <p className="mt-5 max-w-[680px] text-[15px] leading-[1.9] text-text-muted">
          {item.summary}
        </p>

        {item.responsibilities.length > 0 && (
          <div className="mt-9">
            <div className="flex items-center gap-3">
              <Code2
                aria-hidden="true"
                className="h-4 w-4 text-accent"
                strokeWidth={1.5}
              />

              <p className="label-mono">
                Work &amp; responsibilities
              </p>
            </div>

            <ul className="mt-4 grid gap-x-8 sm:grid-cols-2">
              {item.responsibilities.map(
                (responsibility) => (
                  <li
                    key={responsibility}
                    className="
                      flex items-start gap-3
                      border-b border-border/80
                      py-4 text-[13px]
                      leading-[1.8] text-ink
                      sm:text-[14px]
                    "
                  >
                    <span
                      aria-hidden="true"
                      className="
                        mt-[10px] h-1.5 w-1.5
                        shrink-0 bg-accent
                      "
                    />

                    <span>
                      {responsibility}
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>
        )}

        {item.technologies.length > 0 && (
          <div className="mt-8">
            <p className="label-mono">
              Tools &amp; technologies
            </p>

            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-3">
              {item.technologies.map((tech) => (
                <li
                  key={tech}
                  className="
                    border-b border-border
                    pb-1 font-mono
                    text-[11px] text-text-muted
                    transition-colors duration-300
                    hover:border-accent
                    hover:text-accent
                  "
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </motion.article>
  );
}

/* =========================================
   CAREER TIMELINE
========================================= */

function CareerJourney() {
  const journeyRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: journeyRef,
    offset: ["start 75%", "end 65%"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 75,
    damping: 25,
    restDelta: 0.001,
  });

  return (
    <section
      id="career-journey"
      aria-labelledby="career-journey-title"
      className="
        scroll-mt-24 bg-bg
        py-20 sm:py-28
      "
    >
      <div className="container-x">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-8">
            <p className="label-mono">
              The journey
            </p>

            <h2
              id="career-journey-title"
              className="
                mt-5 max-w-[690px]
                font-display
                text-[clamp(2.3rem,4.5vw,4.3rem)]
                font-normal
                leading-[1.12]
                tracking-[-0.028em]
                text-ink
              "
            >
              Where ideas meet{" "}
              <em className="text-accent">
                execution.
              </em>
            </h2>
          </Reveal>

          <Reveal className="lg:col-span-4">
            <p className="max-w-sm text-sm leading-[1.85] text-text-muted">
              A closer look at the companies,
              responsibilities and engineering
              work that have shaped my practice.
            </p>
          </Reveal>
        </div>

        <div
          ref={journeyRef}
          className="
            relative mt-12 border-t
            border-border pl-7
            sm:mt-16 sm:pl-9
          "
        >
          {/* Track behind the moving progress line */}

          <div
            aria-hidden="true"
            className="
              absolute bottom-0 left-[1px]
              top-0 w-px bg-border
            "
          />

          <motion.div
            aria-hidden="true"
            style={{
              scaleY: reduced ? 1 : progress,
              transformOrigin: "top",
            }}
            className="
              absolute bottom-0 left-[1px]
              top-0 w-px bg-accent
            "
          />

          {EXPERIENCE_ITEMS.map((item) => (
            <CareerEntry
              key={item.id}
              item={item}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================
   FINAL EDITORIAL STATEMENT
========================================= */

function ClosingStatement() {
  return (
    <section className="relative overflow-hidden border-t border-border bg-bg-soft py-16 sm:py-24">
      <div className="container-x">
        <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="label-mono">
              What I bring to the table
            </p>

            <h2 className="mt-5 max-w-[800px] font-display text-[clamp(2.2rem,4.3vw,4rem)] leading-[1.16] tracking-[-0.026em] text-ink">
              A balance of technical thinking,{" "}
              <em className="text-accent">
                product awareness
              </em>
              {" "}and practical delivery.
            </h2>
          </div>

          <div className="lg:col-span-4">
            <p className="max-w-sm text-sm leading-[1.9] text-text-muted">
              From understanding a business
              workflow to implementing and
              maintaining the platform, I focus
              on creating software that remains
              useful beyond launch.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* =========================================
   EXPORT
========================================= */

export function ExperienceTimeline() {
  return (
    <>
      <ExperienceHero />
      <CareerJourney />
      <ClosingStatement />
    </>
  );
}
