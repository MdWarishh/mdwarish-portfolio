"use client";

import { useEffect, useRef, useState } from "react";
import type { MouseEvent, ReactNode } from "react";

import Link from "next/link";
import Image from "next/image";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  MotionConfig,
} from "framer-motion";

import {
  ArrowDown,
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  MapPin,
} from "lucide-react";

import { PERSONAL_INFO } from "@/data/navigation";
import { HERO } from "@/data/home";

/* ==========================================================
   MD WARISH — EDITORIAL HERO (v2)
   ========================================================== */

const EASE = [0.16, 1, 0.3, 1] as const;

/* Presentation-only constants (edit freely) */
const STACK_MARQUEE = [
  "Angular",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Express",
  "PostgreSQL",
  "Prisma",
  "MongoDB",
  "Socket.io",
  "JWT / RBAC",
  "LLM Integrations",
];

const STATS = [
  { value: "8+", label: "Months in production" },
  { value: "3+", label: "Live products shipped" },
  { value: "Full", label: "Stack ownership" },
];

/* ==========================================================
   HOOKS
   ========================================================== */

function useIndiaTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "Asia/Kolkata",
      }).format(new Date());

    setTime(format());
    const id = window.setInterval(() => setTime(format()), 30_000);
    return () => window.clearInterval(id);
  }, []);

  return time;
}

/* ==========================================================
   REVEAL
   ========================================================== */

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ==========================================================
   MAGNETIC WRAPPER
   ========================================================== */

function Magnetic({
  children,
  strength = 0.28,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const x = useSpring(0, { stiffness: 220, damping: 16, mass: 0.4 });
  const y = useSpring(0, { stiffness: 220, damping: 16, mass: 0.4 });

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x, y }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* ==========================================================
   CUSTOM SVG ARTWORK
   ========================================================== */

function ArchitecturalArtwork() {
  const paths = [
    "M-40 365 C135 310 190 80 390 125 S625 510 865 270",
    "M-50 440 C155 355 215 155 405 185 S635 565 880 340",
    "M-35 515 C155 410 260 220 445 260 S680 615 885 430",
    "M85 -35 C115 145 310 175 355 340 S495 590 650 735",
    "M220 -55 C255 120 405 180 445 330 S595 585 765 710",
  ];

  return (
    <svg
      viewBox="0 0 850 720"
      fill="none"
      aria-hidden="true"
      className="h-full w-full overflow-visible"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient
          id="hero-architecture-line"
          x1="0"
          y1="0"
          x2="850"
          y2="720"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0" />
          <stop offset="34%" stopColor="var(--accent)" stopOpacity="0.38" />
          <stop offset="74%" stopColor="var(--accent)" stopOpacity="0.16" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
      </defs>

      {paths.map((d, index) => (
        <motion.path
          key={index}
          d={d}
          stroke="url(#hero-architecture-line)"
          strokeWidth={index === 1 ? 1.5 : 0.85}
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            duration: 2.3,
            delay: 0.35 + index * 0.15,
            ease: EASE,
          }}
        />
      ))}

      {[
        [390, 125],
        [405, 185],
        [445, 260],
        [355, 340],
        [445, 330],
      ].map(([cx, cy], index) => (
        <motion.g
          key={index}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.65,
            delay: 1.2 + index * 0.18,
            ease: EASE,
          }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        >
          <circle cx={cx} cy={cy} r="3" fill="var(--accent)" />
          <circle
            cx={cx}
            cy={cy}
            r="11"
            stroke="var(--accent)"
            strokeOpacity="0.28"
            strokeWidth="0.8"
          />
        </motion.g>
      ))}

      <g stroke="var(--accent)" strokeOpacity="0.30" strokeWidth="0.8">
        <path d="M340 340 H370 M355 325 V355" />
        <path d="M430 260 H460 M445 245 V275" />
        <path d="M390 315 L405 330" />
        <path d="M390 330 L405 315" />
      </g>

      <g
        fill="var(--accent)"
        fillOpacity="0.55"
        fontFamily="monospace"
        fontSize="10"
        letterSpacing="2"
      >
        <text x="467" y="249">01 / FORM</text>
        <text x="375" y="362">02 / LOGIC</text>
        <text x="485" y="320">03 / SYSTEM</text>
      </g>
    </svg>
  );
}

/* ==========================================================
   PORTRAIT
   ========================================================== */

function Portrait({ time }: { time: string | null }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-5%", "7%"]);

  return (
    <div ref={frameRef} className="relative mx-auto w-full max-w-[490px]">
      {/* Offset architectural frame */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -left-3 -top-3
          h-full w-full
          border border-[color:var(--border-strong)]
          sm:-left-5 sm:-top-5
        "
      />

      <motion.div
        initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
        animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
        transition={{ duration: 1.45, delay: 0.35, ease: EASE }}
        className="relative isolate aspect-[4/5] w-full overflow-hidden bg-bg-soft"
      >
        <motion.div
          style={{ y: reducedMotion ? 0 : imageY }}
          className="absolute -inset-y-[8%] inset-x-0"
        >
          <Image
            src="/images/warish.jpg"
            alt="Portrait of MD Warish, Full Stack Developer"
            fill
            priority
            quality={85}
            sizes="(max-width: 640px) 88vw, (max-width: 1024px) 420px, 490px"
            className="object-cover object-center"
          />
        </motion.div>

        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute inset-0
            bg-gradient-to-t
            from-[#07090D]/60
            via-transparent
            to-transparent
          "
        />

        {/* Top chips */}
        <div className="absolute left-4 right-4 top-4 flex items-start justify-between gap-3 sm:left-6 sm:right-6 sm:top-6">
          <span
            className="
              inline-flex items-center gap-2
              rounded-full border border-white/20
              bg-black/30 px-3 py-1.5
              font-mono text-[9px] uppercase tracking-[0.18em]
              text-white/85 backdrop-blur-md
            "
          >
            <MapPin aria-hidden="true" className="h-3 w-3" />
            Delhi-NCR, IN
          </span>

          <span
            className="
              rounded-full border border-white/20
              bg-black/30 px-3 py-1.5
              font-mono text-[9px] uppercase tracking-[0.18em]
              text-white/85 backdrop-blur-md
            "
          >
            {time ?? "--:--"} IST
          </span>
        </div>

        {/* Inside-frame signature */}
        <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 text-white sm:bottom-7 sm:left-7 sm:right-7">
          <div>
            <span className="block font-mono text-[9px] uppercase tracking-[0.25em] text-white/65">
              Full Stack Developer
            </span>
            <span className="mt-2 block font-display text-[clamp(1.4rem,3vw,2.2rem)] italic leading-none">
              Built with intention.
            </span>
          </div>

          <span className="font-mono text-[10px] tracking-widest text-white/70">
            / 001
          </span>
        </div>
      </motion.div>

      <div className="mt-5 flex items-center justify-between gap-4 border-t border-border pt-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted">
          The person behind the code
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
          MD / W
        </span>
      </div>
    </div>
  );
}

/* ==========================================================
   SOCIAL LINKS
   ========================================================== */

function SocialLinks() {
  const links = [
    { label: "GitHub", href: PERSONAL_INFO.github, icon: Github },
    { label: "LinkedIn", href: PERSONAL_INFO.linkedin, icon: Linkedin },
  ].filter(
    (link) =>
      typeof link.href === "string" && /^https?:\/\//.test(link.href)
  );

  return (
    <nav
      aria-label="Social profiles"
      className="flex flex-wrap items-center gap-x-6 gap-y-3"
    >
      {links.map(({ label, href, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${label} — opens in a new tab`}
          className="
            group inline-flex items-center gap-2
            text-xs font-medium text-text-muted
            transition-colors duration-300
            hover:text-accent
          "
        >
          <Icon aria-hidden="true" className="h-4 w-4" />
          {label}
          <ArrowUpRight
            aria-hidden="true"
            className="
              h-3 w-3 transition-transform duration-300
              group-hover:-translate-y-0.5
              group-hover:translate-x-0.5
            "
          />
        </a>
      ))}

      {PERSONAL_INFO.email && (
        <a
          href={`mailto:${PERSONAL_INFO.email}`}
          className="
            inline-flex items-center gap-2
            text-xs font-medium text-text-muted
            transition-colors duration-300
            hover:text-accent
          "
        >
          <Mail aria-hidden="true" className="h-4 w-4" />
          Email
        </a>
      )}
    </nav>
  );
}

/* ==========================================================
   STACK MARQUEE
   ========================================================== */

function StackMarquee() {
  const items = [...STACK_MARQUEE, ...STACK_MARQUEE];

  return (
    <div
      aria-label="Core technologies"
      className="relative overflow-hidden border-y border-border py-4"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)",
      }}
    >
      <motion.div
        className="flex w-max items-center gap-10 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 38, ease: "linear", repeat: Infinity }}
      >
        {items.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="flex items-center gap-10 font-mono text-[11px] uppercase tracking-[0.22em] text-text-muted"
          >
            {item}
            <span
              aria-hidden="true"
              className="h-1 w-1 rounded-full bg-accent"
            />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ==========================================================
   HERO SECTION
   ========================================================== */

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const time = useIndiaTime();

  /* Cursor spotlight */
  const mouseX = useMotionValue(-400);
  const mouseY = useMotionValue(-400);
  const spotX = useSpring(mouseX, { stiffness: 90, damping: 22 });
  const spotY = useSpring(mouseY, { stiffness: 90, damping: 22 });
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${spotX}px ${spotY}px, color-mix(in srgb, var(--accent) 12%, transparent), transparent 70%)`;

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (reducedMotion || !heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  /* Scroll-linked transforms */
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [0, -85]);
  const artworkY = useTransform(scrollYProgress, [0, 1], [0, 130]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 55]);
  const fadeOut = useTransform(scrollYProgress, [0, 0.9], [1, 0.52]);

  return (
    <MotionConfig reducedMotion="user">
      <section
        ref={heroRef}
        onMouseMove={handleMouseMove}
        aria-labelledby="hero-heading"
        className="
          relative isolate overflow-hidden
          border-b border-border
          bg-bg
          pt-28 pb-0
          sm:pt-32
          lg:min-h-[900px]
          lg:pt-36
        "
      >
        {/* Cursor spotlight */}
        {!reducedMotion && (
          <motion.div
            aria-hidden="true"
            style={{ background: spotlight }}
            className="pointer-events-none absolute inset-0 z-0 hidden lg:block"
          />
        )}

        {/* Ambient artwork */}
        <motion.div
          aria-hidden="true"
          style={{ y: reducedMotion ? 0 : artworkY }}
          className="
            pointer-events-none absolute
            -right-[22%] top-[5%]
            z-0
            h-[850px] w-[1000px]
            max-w-none
            opacity-60
            sm:-right-[12%]
            lg:-right-[6%]
            lg:top-[-5%]
            lg:opacity-90
          "
        >
          <ArchitecturalArtwork />
        </motion.div>

        {/* Edge label */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute
            left-5 top-[45%]
            hidden
            origin-left -rotate-90
            font-mono text-[10px]
            uppercase tracking-[0.3em]
            text-text-muted/50
            xl:block
          "
        >
          Independent by design — MDW
        </div>

        <div className="container-x relative z-10">
          {/* ================================================
              TOP META BAR
             ================================================ */}

          <Reveal
            delay={0.1}
            className="
              mb-12 flex flex-wrap
              items-center justify-between
              gap-x-6 gap-y-3
              border-b border-border
              pb-5
              sm:mb-16
            "
          >
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-accent"
              />
              <span className="label-mono">Independent Digital Craftsman</span>
            </div>

            <div className="flex items-center gap-6">
              <span className="hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted sm:inline-flex">
                <MapPin aria-hidden="true" className="h-3 w-3" />
                Delhi-NCR · {time ?? "--:--"} IST
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
                Portfolio / 2026
              </span>
            </div>
          </Reveal>

          {/* ================================================
              HEADING
             ================================================ */}

          <motion.div
            style={{
              y: reducedMotion ? 0 : titleY,
              opacity: fadeOut,
            }}
            className="relative"
          >
            <div className="grid items-end gap-6 lg:grid-cols-12">
              <div className="lg:col-span-9">
                <Reveal delay={0.18}>
                  <p className="mb-5 max-w-md text-sm leading-relaxed text-text-muted sm:mb-7">
                    {HERO.eyebrow}
                  </p>
                </Reveal>

                <h1
                  id="hero-heading"
                  className="
                    font-display
                    text-[clamp(4.5rem,14vw,13rem)]
                    font-normal
                    leading-[0.75]
                    tracking-[-0.055em]
                    text-ink
                  "
                >
                  <span className="block overflow-hidden pb-[0.1em]">
                    <motion.span
                      initial={{ y: "115%" }}
                      animate={{ y: "0%" }}
                      transition={{ duration: 1.2, delay: 0.25, ease: EASE }}
                      className="block"
                    >
                      MD
                    </motion.span>
                  </span>

                  <span className="block overflow-hidden pb-[0.1em]">
                    <motion.span
                      initial={{ y: "115%" }}
                      animate={{ y: "0%" }}
                      transition={{ duration: 1.25, delay: 0.38, ease: EASE }}
                      className="block italic text-accent"
                    >
                      Warish<span className="not-italic">.</span>
                    </motion.span>
                  </span>
                </h1>
              </div>

              <Reveal delay={0.75} className="pb-2 lg:col-span-3 lg:pb-8">
                <div className="max-w-[245px] border-l border-[color:var(--border-strong)] pl-5">
                  <p className="font-display text-2xl italic leading-tight text-ink sm:text-3xl">
                    Design-minded.
                    <br />
                    Engineering-led.
                  </p>
                  <p className="mt-4 font-mono text-[10px] uppercase leading-relaxed tracking-[0.15em] text-text-muted">
                    Full Stack Developer
                    <br />
                    Web Experiences
                  </p>
                </div>
              </Reveal>
            </div>
          </motion.div>

          {/* ================================================
              CONTENT / PORTRAIT
             ================================================ */}

          <div
            className="
              relative mt-14 grid
              gap-14
              lg:mt-8
              lg:grid-cols-12
              lg:items-center
              lg:gap-10
            "
          >
            {/* LEFT */}
            <div className="order-2 lg:order-1 lg:col-span-5 lg:pt-10">
              <Reveal delay={0.65}>
                <div className="max-w-[450px]">
                  <span className="label-mono">What I do / 01</span>

                  <h2
                    className="
                      mt-5 font-display
                      text-[clamp(2.1rem,4vw,4rem)]
                      leading-[1.07]
                      tracking-[-0.025em]
                      text-ink
                    "
                  >
                    Thoughtful design.
                    <br />
                    <span className="italic text-accent">Powerful code.</span>
                  </h2>

                  <p className="mt-6 max-w-[415px] text-base leading-[1.85] text-text-muted">
                    {HERO.description}
                  </p>
                </div>
              </Reveal>

              {/* CTAs */}
              <Reveal delay={0.8}>
                <div className="mt-9 flex flex-wrap items-center gap-6">
                  <Magnetic>
                    <Link
                      href="/projects"
                      className="
                        group inline-flex min-h-[54px]
                        items-center justify-center
                        gap-5 rounded-full
                        bg-accent
                        px-7 py-4
                        text-sm font-semibold
                        text-[color:var(--on-accent)]
                        transition-colors duration-300
                        hover:bg-accent-hover
                      "
                    >
                      Explore my work
                      <ArrowUpRight
                        aria-hidden="true"
                        className="
                          h-4 w-4 transition-transform duration-300
                          group-hover:-translate-y-0.5
                          group-hover:translate-x-0.5
                        "
                      />
                    </Link>
                  </Magnetic>

                  <Link
                    href="/contact"
                    className="
                      link-luxe
                      inline-flex min-h-[48px]
                      items-center gap-2
                      text-sm font-semibold text-ink
                      transition-colors duration-300
                      hover:text-accent
                    "
                  >
                    Let&apos;s collaborate
                    <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                </div>
              </Reveal>

              {/* Stats */}
              <Reveal delay={0.95}>
                <dl className="mt-12 grid max-w-[450px] grid-cols-3 gap-4 border-t border-border pt-6">
                  {STATS.map((stat) => (
                    <div key={stat.label}>
                      <dt className="sr-only">{stat.label}</dt>
                      <dd>
                        <span className="block font-display text-3xl italic leading-none text-ink sm:text-4xl">
                          {stat.value}
                        </span>
                        <span className="mt-2 block font-mono text-[9px] uppercase leading-snug tracking-[0.14em] text-text-muted">
                          {stat.label}
                        </span>
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>

              {/* Availability */}
              {PERSONAL_INFO.availability && (
                <Reveal delay={1.05}>
                  <div className="mt-8 flex items-center gap-3">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inset-0 animate-ping rounded-full bg-[var(--success)] opacity-30" />
                      <span className="relative h-2 w-2 rounded-full bg-[var(--success)]" />
                    </span>
                    <span className="text-xs text-text-muted">
                      {PERSONAL_INFO.availability}
                    </span>
                  </div>
                </Reveal>
              )}
            </div>

            {/* RIGHT */}
            <motion.div
              style={{ y: reducedMotion ? 0 : portraitY }}
              className="
                relative order-1
                w-full max-w-[520px]
                justify-self-center
                lg:order-2
                lg:col-span-6
                lg:col-start-7
                lg:justify-self-end
              "
            >
              <Portrait time={time} />
            </motion.div>
          </div>

          {/* ================================================
              BOTTOM BAR
             ================================================ */}

          <Reveal delay={1.1}>
            <div
              className="
                mt-20 grid gap-7
                border-t border-border
                pt-6
                md:grid-cols-3
                md:items-center
                lg:mt-24
              "
            >
              <div className="flex items-center gap-4">
                <span className="font-display text-4xl italic text-accent">
                  W.
                </span>
                <span className="font-mono text-[10px] uppercase leading-relaxed tracking-[0.14em] text-text-muted">
                  Crafting the web
                  <br />
                  with intention
                </span>
              </div>

              <div className="flex justify-start md:justify-center">
                <SocialLinks />
              </div>

              <a
                href="#tech-stack"
                className="
                  group inline-flex items-center
                  gap-3 text-xs font-medium
                  text-text-muted
                  transition-colors duration-300
                  hover:text-accent
                  md:justify-self-end
                "
              >
                Scroll to explore
                <span
                  className="
                    flex h-10 w-10
                    items-center justify-center
                    rounded-full border
                    border-[color:var(--border-strong)]
                    transition-[transform,border-color]
                    duration-300
                    group-hover:translate-y-1
                    group-hover:border-accent
                  "
                >
                  <ArrowDown aria-hidden="true" className="h-4 w-4" />
                </span>
              </a>
            </div>
          </Reveal>
        </div>

        {/* Full-bleed tech marquee */}
        <Reveal delay={1.25} className="relative z-10 mt-14 lg:mt-16">
          <StackMarquee />
        </Reveal>
      </section>
    </MotionConfig>
  );
}