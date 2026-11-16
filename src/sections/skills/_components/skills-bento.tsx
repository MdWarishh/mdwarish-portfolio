
"use client";

import { useRef, type ReactNode } from "react";
import Link from "next/link";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Braces,
  Database,
  Layers3,
  Server,
  Terminal,
} from "lucide-react";

import {
  siNextdotjs,
  siReact,
  siAngular,
  siTypescript,
  siJavascript,
  siTailwindcss,
  siNodedotjs,
  siExpress,
  siSpringboot,
  siMongodb,
  siPostgresql,
  siPrisma,
  siDocker,
  siLinux,
  siGit,
  siGithub,
  siHtml5,
  siCss,
  siVercel,
  siSocketdotio,
  siRedis,
  type SimpleIcon,
} from "simple-icons";

import { SKILL_GROUPS } from "@/data/skills";

const EASE = [0.22, 1, 0.36, 1] as const;

/* =====================================================
   TECHNOLOGY ICON REGISTRY
   ===================================================== */

const ICONS: Record<string, SimpleIcon> = {
  nextjs: siNextdotjs,
  next: siNextdotjs,
  react: siReact,
  angular: siAngular,
  typescript: siTypescript,
  javascript: siJavascript,
  tailwindcss: siTailwindcss,
  tailwind: siTailwindcss,
  nodejs: siNodedotjs,
  node: siNodedotjs,
  expressjs: siExpress,
  express: siExpress,
  springboot: siSpringboot,
  mongodb: siMongodb,
  postgresql: siPostgresql,
  postgres: siPostgresql,
  prisma: siPrisma,
  docker: siDocker,
  linux: siLinux,
  git: siGit,
  github: siGithub,
  html5: siHtml5,
  html: siHtml5,
  css3: siCss,
  css: siCss,
  vercel: siVercel,
  socketio: siSocketdotio,
  redis: siRedis,
};

function getIcon(name: string): SimpleIcon | undefined {
  const key = name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

  return ICONS[key];
}

/* =====================================================
   BRAND ICON
   ===================================================== */

function TechIcon({
  name,
  className = "h-6 w-6",
}: {
  name: string;
  className?: string;
}) {
  const icon = getIcon(name);

  if (!icon) {
    return (
      <Braces
        aria-hidden="true"
        className={className}
        strokeWidth={1.4}
      />
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d={icon.path} />
    </svg>
  );
}

/* =====================================================
   ANIMATION UTILITIES
   ===================================================== */

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={
        reduce
          ? false
          : { opacity: 0, y: 26 }
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
        duration: reduce ? 0 : 0.8,
        delay: reduce ? 0 : delay,
        ease: EASE,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* =====================================================
   CUSTOM SVG — SYSTEM ARCHITECTURE
   No repeating grids or orbital circles
   ===================================================== */

function SystemLines() {
  const reduce = useReducedMotion();

  const paths = [
    "M35 305 C150 305 125 115 260 115 S435 190 540 75",
    "M20 370 C150 315 180 255 300 275 S470 370 570 240",
    "M95 435 C235 440 210 330 355 345 S495 430 615 320",
    "M170 35 C215 155 345 155 360 290 S485 375 560 465",
    "M340 15 C330 165 460 165 455 300 S535 425 610 480",
  ];

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 650 510"
      fill="none"
      className="h-full w-full overflow-visible"
    >
      <defs>
        <linearGradient
          id="skill-line-gradient"
          x1="0"
          y1="0"
          x2="650"
          y2="510"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            stopColor="var(--accent)"
            stopOpacity="0"
          />
          <stop
            offset=".4"
            stopColor="var(--accent)"
            stopOpacity=".55"
          />
          <stop
            offset="1"
            stopColor="var(--accent)"
            stopOpacity=".08"
          />
        </linearGradient>
      </defs>

      {paths.map((path, index) => (
        <motion.path
          key={path}
          d={path}
          stroke="url(#skill-line-gradient)"
          strokeWidth={index === 1 ? 1.5 : 0.8}
          vectorEffect="non-scaling-stroke"
          initial={
            reduce
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
            duration: reduce ? 0 : 2.1,
            delay: reduce ? 0 : 0.3 + index * 0.16,
            ease: EASE,
          }}
        />
      ))}

      {[
        [260, 115],
        [300, 275],
        [355, 345],
        [455, 300],
        [540, 75],
      ].map(([cx, cy], index) => (
        <motion.g
          key={`${cx}-${cy}`}
          initial={
            reduce
              ? false
              : { opacity: 0 }
          }
          animate={{ opacity: 1 }}
          transition={{
            delay: reduce ? 0 : 1 + index * 0.2,
          }}
        >
          <circle
            cx={cx}
            cy={cy}
            r="3"
            fill="var(--accent)"
          />
          <path
            d={`M${cx - 13} ${cy}h8 M${cx + 8} ${cy}h8 M${cx} ${cy - 13}v8 M${cx} ${cy + 8}v8`}
            stroke="var(--accent)"
            strokeOpacity=".36"
            strokeWidth=".8"
          />
        </motion.g>
      ))}
    </svg>
  );
}

/* =====================================================
   FLOATING BRAND LOGOS
   ===================================================== */

const FLOATING_TECH = [
  {
    name: "Next.js",
    position: "left-[8%] top-[12%]",
    delay: 0,
    duration: 7,
  },
  {
    name: "React",
    position: "right-[10%] top-[6%]",
    delay: 0.8,
    duration: 8,
  },
  {
    name: "Angular",
    position: "left-[38%] top-[32%]",
    delay: 0.4,
    duration: 6.5,
  },
  {
    name: "TypeScript",
    position: "right-[5%] top-[52%]",
    delay: 1.2,
    duration: 7.5,
  },
  {
    name: "Node.js",
    position: "left-[12%] bottom-[14%]",
    delay: 0.5,
    duration: 8.5,
  },
  {
    name: "PostgreSQL",
    position: "right-[23%] bottom-[4%]",
    delay: 1,
    duration: 7.2,
  },
];

/* =====================================================
   FLOATING TECH ARTWORK
   ===================================================== */

function FloatingTechArtwork() {
  const reduce = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="relative h-full w-full"
    >
      <div className="absolute inset-[4%] opacity-75">
        <SystemLines />
      </div>

      {FLOATING_TECH.map((item) => (
        <motion.div
          key={item.name}
          className={`absolute ${item.position}`}
          initial={
            reduce
              ? false
              : {
                  opacity: 0,
                  scale: 0.85,
                }
          }
          animate={
            reduce
              ? {
                  opacity: 1,
                  scale: 1,
                }
              : {
                  opacity: 1,
                  scale: 1,
                  y: [0, -11, 0],
                }
          }
          transition={
            reduce
              ? { duration: 0 }
              : {
                  opacity: {
                    duration: 0.7,
                    delay: item.delay,
                  },
                  scale: {
                    duration: 0.7,
                    delay: item.delay,
                  },
                  y: {
                    duration: item.duration,
                    delay: item.delay,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }
          }
        >
          <div className="flex h-[70px] w-[70px] items-center justify-center border border-border-strong bg-bg-elevated/95 text-ink shadow-[0_10px_35px_rgba(0,0,0,0.07)] backdrop-blur-md sm:h-[82px] sm:w-[82px]">
            <TechIcon
              name={item.name}
              className="h-8 w-8 sm:h-9 sm:w-9"
            />
          </div>
        </motion.div>
      ))}

      {/* Central identity */}
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
        <div className="relative flex h-[115px] w-[115px] items-center justify-center border border-accent/50 bg-bg/95 backdrop-blur-lg sm:h-[140px] sm:w-[140px]">
          <div className="absolute -left-2 -top-2 h-4 w-4 border-l border-t border-accent" />
          <div className="absolute -bottom-2 -right-2 h-4 w-4 border-b border-r border-accent" />

          <svg
            viewBox="0 0 48 48"
            fill="none"
            className="h-16 w-16 text-ink sm:h-20 sm:w-20"
          >
            <path
              d="M5 36V12L15 25L24 12L33 25V12"
              stroke="currentColor"
              strokeWidth="2.4"
            />
            <path
              d="M15 30L21 38L27 30L33 38L43 18"
              stroke="currentColor"
              strokeWidth="2.4"
            />
            <path
              d="M38 9H43V14"
              stroke="var(--accent)"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* =====================================================
   SKILLS HERO
   ===================================================== */

function SkillsHero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const rawY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 65]
  );

  const artworkY = useSpring(rawY, {
    stiffness: 80,
    damping: 25,
  });

  return (
    <section
      ref={ref}
      aria-labelledby="skills-heading"
      className="relative isolate overflow-hidden border-b border-border bg-bg"
    >
      <div className="container-x relative z-10">
        <div className="grid items-center gap-10 pb-16 pt-16 lg:min-h-[660px] lg:grid-cols-12 lg:gap-12 lg:pb-24 lg:pt-24">
          <div className="relative z-10 lg:col-span-6">
            <Reveal>
              <p className="label-mono">
                Technical expertise
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <h1
                id="skills-heading"
                className="mt-6 max-w-[680px] font-display text-[clamp(3.1rem,6.2vw,6.3rem)] font-normal leading-[1.04] tracking-[-0.035em] text-ink"
              >
                Tools for building{" "}
                <em className="text-accent">
                  better products.
                </em>
              </h1>
            </Reveal>

            <Reveal delay={0.18}>
              <p className="mt-6 max-w-[490px] text-[15px] leading-[1.85] text-text-muted sm:text-base">
                I work across frontend interfaces,
                backend systems, data architecture
                and deployment—using technologies
                that fit the product and its real
                requirements.
              </p>
            </Reveal>

            <Reveal
              delay={0.28}
              className="mt-9 flex flex-wrap items-center gap-6"
            >
              <Link
                href="/projects"
                className="group inline-flex min-h-[49px] items-center gap-3 bg-accent px-6 text-sm font-semibold text-[color:var(--on-accent)] transition-colors duration-300 hover:bg-accent-hover"
              >
                Explore projects

                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>

              <a
                href="#skills-explorer"
                className="group inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-accent"
              >
                Explore the stack
                <ArrowDown
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform group-hover:translate-y-1"
                />
              </a>
            </Reveal>
          </div>

          <motion.div
            style={{
              y: reduce ? 0 : artworkY,
            }}
            className="relative mx-auto h-[330px] w-full max-w-[570px] sm:h-[440px] lg:col-span-6 lg:h-[500px]"
          >
            <FloatingTechArtwork />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* =====================================================
   CATEGORY VISUAL
   ===================================================== */

function CategoryIcon({
  category,
}: {
  category: string;
}) {
  const Icon =
    category === "frontend"
      ? Layers3
      : category === "backend"
        ? Server
        : category === "database"
          ? Database
          : category === "infrastructure"
            ? Terminal
            : Braces;

  return (
    <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-border-strong text-accent">
      <Icon
        aria-hidden="true"
        className="h-5 w-5"
        strokeWidth={1.4}
      />
    </div>
  );
}

/* =====================================================
   ENGINEERING LAYERS
   ===================================================== */

function SkillsExplorer() {
  return (
    <section
      id="skills-explorer"
      aria-labelledby="skills-explorer-title"
      className="scroll-mt-24 py-20 sm:py-28"
    >
      <div className="container-x">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-8">
            <p className="label-mono">
              The engineering stack
            </p>

            <h2
              id="skills-explorer-title"
              className="mt-5 max-w-2xl font-display text-[clamp(2.3rem,4.2vw,4.1rem)] font-normal leading-[1.12] tracking-[-0.025em] text-ink"
            >
              From interface to{" "}
              <em className="text-accent">
                infrastructure.
              </em>
            </h2>
          </Reveal>

          <Reveal className="lg:col-span-4">
            <p className="max-w-sm text-sm leading-[1.8] text-text-muted">
              A practical overview of the
              technologies I use across different
              layers of a full-stack application.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 border-t border-border sm:mt-16">
          {SKILL_GROUPS.map((group) => (
            <Reveal
              key={group.id}
              className="border-b border-border py-10 sm:py-12"
            >
              <article className="grid gap-8 lg:grid-cols-12 lg:gap-12">
                <div className="lg:col-span-4">
                  <CategoryIcon category={group.id} />

                  <h3 className="mt-5 font-display text-[clamp(1.9rem,2.8vw,2.8rem)] font-normal leading-[1.15] tracking-[-0.02em] text-ink">
                    {group.category}
                  </h3>

                  <p className="mt-4 max-w-[320px] text-sm leading-[1.8] text-text-muted">
                    {group.description}
                  </p>
                </div>

                <div className="lg:col-span-8">
                  <ul className="grid gap-x-8 sm:grid-cols-2">
                    {group.skills.map((skill) => (
                      <li
                        key={skill.name}
                        className="group flex min-h-[94px] items-start gap-4 border-b border-border/80 py-5 transition-colors duration-300"
                      >
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-border bg-bg-elevated text-ink transition-[color,border-color,transform] duration-500 group-hover:-translate-y-1 group-hover:border-accent group-hover:text-accent">
                          <TechIcon
                            name={skill.name}
                            className="h-[22px] w-[22px]"
                          />
                        </span>

                        <div className="min-w-0">
                          <h4 className="text-[14px] font-semibold leading-[1.5] text-ink">
                            {skill.name}
                          </h4>

                          <p className="mt-1 text-xs leading-[1.7] text-text-muted">
                            {skill.role}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =====================================================
   CLOSING SECTION
   ===================================================== */

function ClosingSection() {
  return (
    <section className="relative overflow-hidden border-t border-border bg-bg-soft py-20 sm:py-24">
      <div className="container-x">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-8">
            <p className="label-mono">
              Beyond the tools
            </p>

            <h2 className="mt-5 max-w-2xl font-display text-[clamp(2.3rem,4.5vw,4.5rem)] font-normal leading-[1.12] tracking-[-0.027em] text-ink">
              The technology matters.{" "}
              <em className="text-accent">
                The outcome matters more.
              </em>
            </h2>

            <p className="mt-6 max-w-lg text-sm leading-[1.85] text-text-muted">
              Explore how these technologies come
              together in business applications,
              commerce platforms and production
              websites.
            </p>
          </Reveal>

          <Reveal className="lg:col-span-4 lg:justify-self-end">
            <Link
              href="/projects"
              className="group inline-flex min-h-[50px] items-center gap-4 border-b border-accent text-sm font-semibold text-ink transition-colors hover:text-accent"
            >
              View selected projects

              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"
              />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* =====================================================
   EXPORT
   ===================================================== */

export function SkillsBento() {
  return (
    <>
      <SkillsHero />
      <SkillsExplorer />
      <ClosingSection />
    </>
  );
}
