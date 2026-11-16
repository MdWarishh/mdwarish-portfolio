
"use client";

import { useRef, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";

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
  Download,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";

import { PERSONAL_INFO } from "@/data/navigation";

const EASE = [0.22, 1, 0.36, 1] as const;

const EXPERTISE = [
  {
    title: "Applications & SaaS",
    detail:
      "CRM platforms, operational dashboards, inventory systems and business workflows.",
    tech: "Next.js · Angular · Node.js",
  },
  {
    title: "Commerce & experiences",
    detail:
      "Fast storefronts, payment flows and responsive interfaces designed for real customers.",
    tech: "React · TypeScript · UI Engineering",
  },
  {
    title: "Systems & integrations",
    detail:
      "APIs, role-based access, data modeling, notifications and connected services.",
    tech: "Express · Java · Prisma · SQL",
  },
  {
    title: "Delivery & infrastructure",
    detail:
      "Deployment, hosting, technical SEO, performance and post-launch reliability.",
    tech: "Linux · VPS · Web Performance",
  },
];

const EXPERIENCE = [
  {
    title: "Business applications",
    works: "Limra Hearing Care CRM · InventoryPro · Travel CRM",
    text:
      "Operational tools that organize customer records, permissions, inventory and day-to-day processes.",
  },
  {
    title: "Commerce & product",
    works: "Khilat · FusionPOS",
    text:
      "Interfaces and application flows for buying, selling and managing business operations.",
  },
  {
    title: "Websites & exhibition platforms",
    works:
      "Futurex Trade · Odisha Mining Expo · India Solar Show · Nepal Buildcon",
    text:
      "Multi-page public websites, registration experiences and integrations for B2B audiences.",
  },
];

/* -----------------------------------------------
   SIGNATURE MW LOGO
----------------------------------------------- */

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

/* -----------------------------------------------
   REUSABLE SCROLL REVEAL
----------------------------------------------- */

function Enter({
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
      className={className}
      initial={
        reduce
          ? false
          : { opacity: 0, y: 26 }
      }
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{
        once: true,
        amount: 0.12,
      }}
      transition={{
        duration: reduce ? 0 : 0.85,
        delay: reduce ? 0 : delay,
        ease: EASE,
      }}
    >
      {children}
    </motion.div>
  );
}

/* -----------------------------------------------
   CUSTOM ENGINEERING SVG
----------------------------------------------- */

function SystemsArtwork({
  className = "",
}: {
  className?: string;
}) {
  const reduce = useReducedMotion();

  const routes = [
    "M40 122 C175 122 170 60 298 60 H474",
    "M40 122 H168 C240 122 220 210 316 210 H510",
    "M40 122 C155 122 176 340 328 340 H510",
    "M168 122 C215 122 211 284 316 284 H510",
    "M474 60 C548 60 520 210 610 210 H750",
    "M510 340 C602 340 605 210 750 210",
  ];

  const nodes = [
    { x: 24, y: 89, w: 145, label: "PEOPLE" },
    { x: 298, y: 27, w: 166, label: "EXPERIENCE" },
    { x: 316, y: 177, w: 173, label: "APPLICATION" },
    { x: 328, y: 307, w: 166, label: "DATA & APIs" },
    { x: 610, y: 177, w: 155, label: "REAL IMPACT" },
  ];

  return (
    <svg
      className={className}
      viewBox="0 0 790 420"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient
          id="about-flow-gradient"
          x1="40"
          y1="0"
          x2="760"
          y2="360"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            stopColor="var(--accent)"
            stopOpacity=".13"
          />
          <stop
            offset=".52"
            stopColor="var(--accent)"
            stopOpacity=".6"
          />
          <stop
            offset="1"
            stopColor="var(--accent)"
            stopOpacity=".13"
          />
        </linearGradient>
      </defs>

      <g
        stroke="var(--border-strong)"
        strokeWidth="1"
        opacity=".75"
      >
        <path d="M28 26h32M44 10v32" />
        <path d="M718 377h32M734 361v32" />
      </g>

      {routes.map((d, index) => (
        <motion.path
          key={d}
          d={d}
          stroke="url(#about-flow-gradient)"
          strokeWidth={index === 1 ? 1.8 : 1.1}
          vectorEffect="non-scaling-stroke"
          initial={
            reduce
              ? false
              : {
                  pathLength: 0,
                  opacity: 0,
                }
          }
          whileInView={{
            pathLength: 1,
            opacity: 1,
          }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: reduce ? 0 : 1.65,
            delay: reduce ? 0 : index * 0.12,
            ease: EASE,
          }}
        />
      ))}

      {nodes.map((node) => (
        <g key={node.label}>
          <rect
            x={node.x}
            y={node.y}
            width={node.w}
            height="66"
            rx="3"
            fill="var(--bg-elevated)"
            stroke={
              node.label === "REAL IMPACT"
                ? "var(--accent)"
                : "var(--border-strong)"
            }
          />

          <path
            d={`M${node.x + 18} ${node.y + 16} h42`}
            stroke="var(--accent)"
            strokeWidth="2"
          />

          <text
            x={node.x + 18}
            y={node.y + 47}
            fontFamily="monospace"
            fontSize="11"
            letterSpacing="1.3"
            fill="var(--text)"
          >
            {node.label}
          </text>
        </g>
      ))}

      {[
        [168, 122],
        [316, 210],
        [510, 340],
        [610, 210],
      ].map(([cx, cy], index) => (
        <motion.circle
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          r="3.5"
          fill="var(--accent)"
          initial={
            reduce
              ? false
              : { opacity: 0, scale: 0 }
          }
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          viewport={{ once: true }}
          transition={{
            delay: reduce ? 0 : 0.6 + index * 0.18,
            duration: 0.45,
          }}
        />
      ))}
    </svg>
  );
}

/* -----------------------------------------------
   ABOUT HERO
----------------------------------------------- */

function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const rawY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 48]
  );

  const portraitY = useSpring(rawY, {
    stiffness: 70,
    damping: 22,
  });

  return (
    <section
      ref={heroRef}
      aria-labelledby="about-heading"
      className="relative isolate overflow-hidden border-b border-border bg-bg"
    >
      <div className="container-x relative z-10 pb-16 pt-14 sm:pb-20 sm:pt-20 lg:pb-24 lg:pt-24">
        <Enter className="flex items-center justify-between gap-4 border-b border-border pb-5">
          <p className="label-mono">
            About MD Warish
          </p>
          <span className="hidden font-mono text-[10px] uppercase tracking-[.15em] text-text-muted sm:block">
            Full Stack Developer
          </span>
        </Enter>

        <div className="grid items-center gap-12 pt-12 lg:grid-cols-12 lg:gap-16 lg:pt-16">
          <div className="lg:col-span-7">
            <Enter className="flex items-center gap-3 text-accent">
              <BrandMark className="h-8 w-8" />
              <span className="text-xs font-medium tracking-[.06em]">
                Engineering with purpose
              </span>
            </Enter>

            <h1
              id="about-heading"
              className="mt-7 max-w-[760px] font-display text-[clamp(3.2rem,6.7vw,6.7rem)] font-normal leading-[1.01] tracking-[-.038em] text-ink"
            >
              <motion.span
                className="block"
                initial={
                  reduce
                    ? false
                    : { opacity: 0, y: 28 }
                }
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.85,
                  ease: EASE,
                }}
              >
                Good software
              </motion.span>

              <motion.span
                className="block italic text-accent"
                initial={
                  reduce
                    ? false
                    : { opacity: 0, y: 28 }
                }
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.85,
                  delay: 0.12,
                  ease: EASE,
                }}
              >
                makes work easier.
              </motion.span>
            </h1>

            <Enter
              delay={0.16}
              className="mt-7 max-w-xl"
            >
              <p className="text-[15px] leading-[1.85] text-text-muted sm:text-[17px]">
                I&apos;m {PERSONAL_INFO.name}, a
                full-stack software engineer building
                useful digital products—business
                applications, commerce experiences and
                websites that hold up in production.
              </p>
            </Enter>

            <Enter
              delay={0.23}
              className="mt-9 flex flex-wrap items-center gap-5"
            >
              <Link
                href="/projects"
                className="group inline-flex min-h-12 items-center gap-3 bg-accent px-6 text-sm font-semibold text-[color:var(--on-accent)] transition-colors hover:bg-accent-hover"
              >
                Selected work
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>

              <Link
                href="/contact"
                className="group inline-flex min-h-12 items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-accent"
              >
                Let&apos;s talk
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </Enter>
          </div>

          <motion.div
            style={{
              y: reduce ? 0 : portraitY,
            }}
            className="relative mx-auto w-full max-w-[395px] lg:col-span-5 lg:justify-self-end"
          >
            <div
              aria-hidden="true"
              className="absolute -right-3 -top-3 h-[85%] w-[85%] border-r border-t border-accent/50 sm:-right-5 sm:-top-5"
            />

            <motion.div
              initial={
                reduce
                  ? false
                  : {
                      clipPath:
                        "inset(0 0 100% 0)",
                    }
              }
              animate={{
                clipPath: "inset(0 0 0% 0)",
              }}
              transition={{
                duration: reduce ? 0 : 1.2,
                delay: 0.18,
                ease: EASE,
              }}
              className="relative aspect-[4/4.7] overflow-hidden bg-bg-soft"
            >
              <Image
                src="/images/warish.jpg"
                alt="MD Warish, full-stack software engineer"
                fill
                priority
                sizes="(max-width: 1024px) 85vw, 395px"
                className="object-cover object-center"
              />
            </motion.div>

            <div className="mt-4 flex items-center justify-between gap-3 border-t border-border pt-3 text-xs text-text-muted">
              <span>
                Building from idea to deployment
              </span>
              <BrandMark className="h-6 w-6 text-accent" />
            </div>
          </motion.div>
        </div>

        <Enter className="mt-12 flex justify-start border-t border-border pt-5 lg:mt-16">
          <a
            href="#about-perspective"
            className="group inline-flex items-center gap-2 text-xs font-medium text-text-muted transition-colors hover:text-accent"
          >
            Read my approach
            <ArrowDown
              aria-hidden="true"
              className="h-4 w-4 transition-transform group-hover:translate-y-1"
            />
          </a>
        </Enter>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-[20%] -z-10 h-[460px] w-[460px] rounded-full bg-[var(--accent-soft)] opacity-40 blur-[110px]"
      />
    </section>
  );
}

/* -----------------------------------------------
   PERSONAL PERSPECTIVE
----------------------------------------------- */

function Perspective() {
  return (
    <section
      id="about-perspective"
      aria-labelledby="perspective-title"
      className="scroll-mt-24 border-b border-border py-20 sm:py-28"
    >
      <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-14">
        <Enter className="lg:col-span-3">
          <p className="label-mono">
            My perspective
          </p>
          <p className="mt-5 max-w-[240px] text-sm leading-7 text-text-muted">
            A practical approach shaped by real
            products and the people using them.
          </p>
        </Enter>

        <div className="lg:col-span-9">
          <Enter>
            <h2
              id="perspective-title"
              className="max-w-[870px] font-display text-[clamp(2rem,4.15vw,4rem)] leading-[1.2] tracking-[-.026em] text-ink"
            >
              The best technology is the kind you{" "}
              <em className="text-accent">
                stop noticing
              </em>
              —because it simply works.
            </h2>
          </Enter>

          <div className="mt-9 grid gap-6 border-t border-border pt-7 md:grid-cols-2 md:gap-12">
            <Enter delay={0.08}>
              <p className="text-[15px] leading-[1.9] text-text-muted">
                I start with the workflow, not the
                framework. Who uses the product? What
                slows them down? Which details need
                to remain dependable when the
                application is busy?
              </p>
            </Enter>

            <Enter delay={0.15}>
              <p className="text-[15px] leading-[1.9] text-text-muted">
                From interface decisions to APIs,
                data models and deployment, I
                connect the pieces into an experience
                that is clear to use and maintainable
                to build on.
              </p>
            </Enter>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -----------------------------------------------
   ENGINEERING SYSTEM
----------------------------------------------- */

function EngineeringSystem() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const artY = useTransform(
    scrollYProgress,
    [0, 1],
    [32, -28]
  );

  return (
    <section
      ref={ref}
      aria-labelledby="system-title"
      className="relative isolate overflow-hidden border-b border-border bg-bg-soft py-20 sm:py-28"
    >
      <div className="container-x relative z-10">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
          <Enter className="lg:col-span-4">
            <p className="label-mono">
              How I think
            </p>

            <h2
              id="system-title"
              className="mt-5 font-display text-[clamp(2.3rem,4vw,3.65rem)] leading-[1.12] tracking-[-.025em] text-ink"
            >
              Not isolated pages.{" "}
              <em className="text-accent">
                Connected systems.
              </em>
            </h2>

            <p className="mt-5 max-w-sm text-sm leading-[1.85] text-text-muted">
              Every component is part of a larger
              product: people, interfaces,
              application logic and data working
              together.
            </p>
          </Enter>

          <motion.div
            style={{
              y: reduce ? 0 : artY,
            }}
            className="lg:col-span-8"
          >
            <SystemsArtwork className="w-full" />
          </motion.div>
        </div>

        <div className="mt-9 grid border-t border-border sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {EXPERTISE.map((item, index) => (
            <Enter
              key={item.title}
              delay={index * 0.07}
              className="group border-b border-border py-7 sm:px-5 lg:border-b-0 lg:border-r lg:last:border-r-0"
            >
              <span
                aria-hidden="true"
                className="mb-6 block h-[2px] w-9 origin-left bg-accent transition-transform duration-500 group-hover:scale-x-150"
              />

              <h3 className="font-display text-[1.65rem] leading-[1.15] tracking-[-.015em] text-ink">
                {item.title}
              </h3>

              <p className="mt-3 text-sm leading-[1.75] text-text-muted">
                {item.detail}
              </p>

              <p className="mt-6 font-mono text-[10px] leading-[1.7] tracking-[.03em] text-accent">
                {item.tech}
              </p>
            </Enter>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -----------------------------------------------
   EXPERIENCE
----------------------------------------------- */

function Experience() {
  return (
    <section
      aria-labelledby="experience-title"
      className="border-b border-border py-20 sm:py-28"
    >
      <div className="container-x">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <Enter className="lg:col-span-8">
            <p className="label-mono">
              Experience in practice
            </p>

            <h2
              id="experience-title"
              className="mt-5 max-w-2xl font-display text-[clamp(2.4rem,4.5vw,4.2rem)] leading-[1.12] tracking-[-.025em] text-ink"
            >
              Built around{" "}
              <em className="text-accent">
                real business needs.
              </em>
            </h2>
          </Enter>

          <Enter className="lg:col-span-4 lg:pb-2">
            <p className="max-w-sm text-sm leading-[1.85] text-text-muted">
              Examples of the kinds of applications
              and platforms I have worked on, from
              internal systems to public-facing
              websites.
            </p>
          </Enter>
        </div>

        <div className="mt-12 border-t border-border lg:mt-16">
          {EXPERIENCE.map((item, index) => (
            <Enter
              key={item.title}
              delay={index * 0.06}
              className="group grid gap-4 border-b border-border py-8 transition-colors duration-300 hover:bg-[var(--accent-soft)] sm:px-4 lg:grid-cols-12 lg:items-start lg:gap-8 lg:py-10"
            >
              <h3 className="font-display text-[clamp(1.8rem,2.6vw,2.65rem)] leading-tight tracking-[-.02em] text-ink lg:col-span-4">
                {item.title}
              </h3>

              <div className="lg:col-span-6">
                <p className="text-[15px] leading-[1.8] text-text-muted">
                  {item.text}
                </p>

                <p className="mt-4 text-xs font-medium leading-[1.8] text-accent">
                  {item.works}
                </p>
              </div>

              <ArrowUpRight
                aria-hidden="true"
                className="hidden h-5 w-5 text-accent transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 lg:col-span-2 lg:ml-auto lg:block"
              />
            </Enter>
          ))}
        </div>

        <Enter className="mt-9">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-accent"
          >
            Explore selected projects
            <ArrowUpRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </Link>
        </Enter>
      </div>
    </section>
  );
}

/* -----------------------------------------------
   CLOSING CTA
----------------------------------------------- */

function Closing() {
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
    (link) =>
      typeof link.href === "string" &&
      /^https?:\/\//i.test(link.href)
  );

  return (
    <section
      aria-labelledby="about-closing-title"
      className="relative overflow-hidden py-20 sm:py-28"
    >
      <div className="container-x relative z-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Enter className="lg:col-span-8">
            <div className="flex items-center gap-3 text-accent">
              <BrandMark className="h-8 w-8" />
              <span className="label-mono">
                Let&apos;s build
              </span>
            </div>

            <h2
              id="about-closing-title"
              className="mt-6 max-w-2xl font-display text-[clamp(2.5rem,5vw,4.8rem)] leading-[1.12] tracking-[-.03em] text-ink"
            >
              Have a thoughtful idea?{" "}
              <em className="text-accent">
                Let&apos;s make it real.
              </em>
            </h2>

            <p className="mt-5 max-w-lg text-sm leading-[1.85] text-text-muted">
              Tell me about the product, workflow
              or challenge you&apos;re working on.
              We can discuss a practical next step.
            </p>
          </Enter>

          <Enter className="lg:col-span-4 lg:justify-self-end">
            <Link
              href="/contact"
              className="group inline-flex min-h-[50px] items-center gap-4 bg-accent px-6 text-sm font-semibold text-[color:var(--on-accent)] transition-colors hover:bg-accent-hover"
            >
              Start a conversation
              <ArrowUpRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </Link>
          </Enter>
        </div>

        <Enter className="mt-14 flex flex-wrap items-center gap-x-7 gap-y-4 border-t border-border pt-6">
          {PERSONAL_INFO.resumeUrl && (
            <a
              href={PERSONAL_INFO.resumeUrl}
              download
              className="inline-flex items-center gap-2 text-xs text-text-muted transition-colors hover:text-accent"
            >
              <Download
                aria-hidden="true"
                className="h-4 w-4"
              />
              Resume
            </a>
          )}

          {links.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              rel="noopener noreferrer"
              target="_blank"
              className="inline-flex items-center gap-2 text-xs text-text-muted transition-colors hover:text-accent"
            >
              <Icon
                aria-hidden="true"
                className="h-4 w-4"
              />
              {label}
            </a>
          ))}

          {PERSONAL_INFO.email && (
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="inline-flex items-center gap-2 text-xs text-text-muted transition-colors hover:text-accent"
            >
              <Mail
                aria-hidden="true"
                className="h-4 w-4"
              />
              Email
            </a>
          )}
        </Enter>
      </div>
    </section>
  );
}

/* -----------------------------------------------
   ABOUT CONTENT EXPORT
----------------------------------------------- */

export function AboutContent() {
  return (
    <>
      <Hero />
      <Perspective />
      <EngineeringSystem />
      <Experience />
      <Closing />
    </>
  );
}
