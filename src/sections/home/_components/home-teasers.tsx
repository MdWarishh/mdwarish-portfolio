"use client";

import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  Code2,
  Copy,
  Layers3,
  Mail,
  Palette,
  PlugZap,
  ServerCog,
  type LucideIcon,
} from "lucide-react";
import {
  HOME_PROCESS,
  HOME_PROJECTS,
  HOME_SERVICES,
  HOME_STATS,
  type HomeProject,
  type HomeService,
} from "@/data/home";
import { PERSONAL_INFO } from "@/data/navigation";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ===================================================================
   AMBIENT BACKGROUND
   Minimal floating orbs, ring and dots. Transform/opacity only.
   Pauses when offscreen, disabled for reduced-motion.
   Parent section must be `relative isolate`.
   =================================================================== */

const ORBS = [
  { cls: "-left-52 top-[4%] h-[560px] w-[560px]", dur: 28, x: 46, y: -54, o: 9 },
  { cls: "-right-56 top-[42%] h-[620px] w-[620px]", dur: 34, x: -54, y: 46, o: 7 },
] as const;

const DOTS = [
  { cls: "left-[11%] top-[24%]", dur: 12, delay: 0 },
  { cls: "left-[82%] top-[16%]", dur: 15, delay: 1.4 },
  { cls: "left-[90%] top-[66%]", dur: 13, delay: 0.7 },
  { cls: "left-[36%] top-[78%]", dur: 16, delay: 2.1 },
] as const;

function Ambient({ flip = false }: { flip?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { margin: "240px 0px 240px 0px" });
  const live = inView && !reduce;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${
        flip ? "-scale-x-100" : ""
      }`}
    >
      {live && (
        <>
          {ORBS.map((orb, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full will-change-transform ${orb.cls}`}
              style={{
                background: `radial-gradient(circle at center, color-mix(in srgb, var(--accent) ${orb.o}%, transparent), transparent 68%)`,
              }}
              animate={{ x: [0, orb.x, 0], y: [0, orb.y, 0], scale: [1, 1.07, 1] }}
              transition={{ duration: orb.dur, ease: "easeInOut", repeat: Infinity }}
            />
          ))}

          <motion.div
            className="absolute right-[8%] top-[10%] h-[380px] w-[380px] rounded-full border border-[color:var(--border-strong)] opacity-50 will-change-transform"
            animate={{ y: [0, 30, 0], x: [0, -18, 0] }}
            transition={{ duration: 36, ease: "easeInOut", repeat: Infinity }}
          />

          {DOTS.map((dot, i) => (
            <motion.span
              key={i}
              className={`absolute h-1 w-1 rounded-full bg-accent will-change-transform ${dot.cls}`}
              animate={{ y: [0, -24, 0], opacity: [0.12, 0.45, 0.12] }}
              transition={{
                duration: dot.dur,
                delay: dot.delay,
                ease: "easeInOut",
                repeat: Infinity,
              }}
            />
          ))}
        </>
      )}
    </div>
  );
}

/* ===================================================================
   PRIMITIVES
   =================================================================== */

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -40px 0px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-accent sm:text-[11px]">
      <motion.span
        aria-hidden="true"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: EASE }}
        className="h-px w-7 origin-left bg-accent"
      />
      {children}
    </p>
  );
}

function SectionHeading({
  eyebrow,
  title,
  emphasis,
  note,
  id,
}: {
  id: string;
  eyebrow: string;
  title: string;
  emphasis: string;
  note?: string;
}) {
  return (
    <Reveal className="grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(240px,355px)] lg:gap-16">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 id={id} className="h-section mt-6 max-w-[850px] text-ink">
          {title} <em className="text-accent">{emphasis}</em>
        </h2>
      </div>
      {note && (
        <p className="max-w-[355px] pb-1 text-sm leading-7 text-text-muted sm:text-base">
          {note}
        </p>
      )}
    </Reveal>
  );
}

/* Word-by-word masked reveal.
   FIX: the in-view trigger sits on the unclipped parent; the clipped
   words only animate through variants, so they can never get stuck hidden. */
function Words({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.span
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.08, delayChildren: delay } },
      }}
      className={`block ${className}`}
    >
      {text.split(" ").map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden pb-[0.14em] pr-[0.24em] align-bottom"
        >
          <motion.span
            variants={{
              hidden: { y: "110%" },
              show: { y: "0%", transition: { duration: 1, ease: EASE } },
            }}
            className="inline-block will-change-transform"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/* ===================================================================
   STATS — count-up numbers + drawing hairlines
   Count-up writes straight to the DOM (no per-frame React renders).
   =================================================================== */

function CountUp({ value, suffix }: { value: string | number; suffix?: string }) {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(wrapRef, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();

  const raw = String(value);
  const match = raw.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
  const prefix = match?.[1] ?? "";
  const target = match ? parseFloat(match[2]) : 0;
  const decimals = match?.[2].split(".")[1]?.length ?? 0;
  const tail = match?.[3] ?? "";

  useEffect(() => {
    const el = numRef.current;
    if (!match || !el) return;

    const write = (v: number) => {
      el.textContent = `${prefix}${v.toFixed(decimals)}${tail}`;
    };

    if (reduce) {
      write(target);
      return;
    }
    if (!inView) return;

    const controls = animate(0, target, { duration: 1.8, ease: EASE, onUpdate: write });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce, target, decimals, prefix, tail]);

  return (
    <span ref={wrapRef}>
      {match ? (
        <span ref={numRef}>{`${prefix}${(0).toFixed(decimals)}${tail}`}</span>
      ) : (
        raw
      )}
      {suffix && <span className="italic text-accent">{suffix}</span>}
    </span>
  );
}

function StatsStrip() {
  return (
    <section aria-label="Professional highlights" className="border-b border-border bg-bg">
      <div className="container-x py-12 sm:py-16">
        <div className="mb-10 flex items-center justify-between gap-4">
          <Eyebrow>At a glance</Eyebrow>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted">
            Proof in the work
          </span>
        </div>

        <dl className="grid gap-10 sm:grid-cols-3 sm:gap-8">
          {HOME_STATS.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.1}>
              <div className="relative pt-6">
                <motion.span
                  aria-hidden="true"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.3, delay: 0.15 + index * 0.12, ease: EASE }}
                  className="absolute left-0 right-0 top-0 h-px origin-left bg-[color:var(--border-strong)]"
                />
                <span aria-hidden="true" className="absolute left-0 top-0 h-px w-10 bg-accent" />
                <dd className="font-display text-[clamp(4rem,7vw,6.5rem)] leading-none tracking-[-0.055em] text-ink">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </dd>
                <dt className="mt-4 max-w-[260px] text-xs leading-6 text-text-muted sm:text-sm">
                  {stat.label}
                </dt>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ===================================================================
   PRODUCT ILLUSTRATIONS
   Not screenshots of the production products.
   Replace with real captures via `project.image` later.
   =================================================================== */

function MiniWindow({ children, title }: { children: ReactNode; title: string }) {
  return (
    <div className="absolute inset-[8%_5%_7%] overflow-hidden rounded-xl border border-white/15 bg-[#111821] shadow-[0_28px_90px_rgba(0,0,0,0.45)] sm:inset-[9%_8%_8%] sm:rounded-2xl">
      <div className="flex h-9 items-center justify-between border-b border-white/10 bg-[#17202b] px-4 sm:h-11 sm:px-5">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <i className="h-1.5 w-1.5 rounded-full bg-white/30" />
          <i className="h-1.5 w-1.5 rounded-full bg-white/20" />
          <i className="h-1.5 w-1.5 rounded-full bg-white/10" />
        </div>
        <span className="truncate px-3 font-mono text-[9px] uppercase tracking-[0.18em] text-[#98a5b6] sm:text-[10px]">
          {title}
        </span>
        <span aria-hidden="true" className="h-2 w-8 rounded-full bg-white/10" />
      </div>
      {children}
    </div>
  );
}

const POS_BARS = [38, 62, 51, 82, 66, 94, 76, 100, 70, 87];

function PosVisual() {
  return (
    <MiniWindow title="FusionPOS / operations">
      <div className="flex h-full font-sans text-[9px] text-[#b7c5d4] sm:text-[11px]">
        <aside className="hidden w-[20%] shrink-0 border-r border-white/10 bg-[#121b26] p-4 sm:block">
          <strong className="text-sm tracking-tight text-white">
            FUSION<span className="text-[#e9bf83]">POS</span>
          </strong>
          <div className="mt-8 space-y-4">
            {["Overview", "Orders", "Tables", "Inventory", "Analytics"].map((item, i) => (
              <div
                key={item}
                className={`rounded-md px-2 py-1.5 ${i === 0 ? "bg-[#e9bf83]/15 text-[#f2cd92]" : "text-white/45"}`}
              >
                {item}
              </div>
            ))}
          </div>
        </aside>
        <div className="min-w-0 flex-1 p-3 sm:p-6">
          <div className="flex items-center justify-between gap-2">
            <div>
              <div className="text-[11px] font-semibold text-white sm:text-lg">Operations overview</div>
              <div className="mt-1 text-white/40">Live operations / example data</div>
            </div>
            <span className="rounded-md border border-[#e9bf83]/40 px-2 py-1 text-[#e9bf83]">Today</span>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 sm:mt-6 sm:gap-3">
            {[
              ["Sales", "₹42,850"],
              ["Orders", "128"],
              ["Tables", "18 / 24"],
            ].map(([a, b]) => (
              <div key={a} className="rounded-md border border-white/10 bg-white/[0.035] p-2 sm:p-3">
                <div className="text-white/45">{a}</div>
                <div className="mt-1 text-[12px] font-semibold text-white sm:text-xl">{b}</div>
              </div>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-[1fr_0.65fr] gap-2 sm:mt-4 sm:gap-3">
            <div className="rounded-md border border-white/10 p-3 sm:p-4">
              <div className="text-white/70">Sales activity</div>
              <div className="mt-4 flex h-[50px] items-end gap-1 sm:mt-7 sm:h-[110px] sm:gap-2">
                {POS_BARS.map((bar, index) => (
                  <div
                    key={index}
                    className="flex-1 rounded-t-sm bg-[#dcb679]"
                    style={{ height: `${bar}%`, opacity: 0.4 + index * 0.06 }}
                  />
                ))}
              </div>
            </div>
            <div className="rounded-md border border-white/10 p-3 sm:p-4">
              <div className="text-white/70">Order status</div>
              {["Preparing", "Ready", "Served"].map((status, i) => (
                <div key={status} className="mt-3 flex items-center gap-2">
                  <span className={`h-1.5 w-1.5 rounded-full ${i === 0 ? "bg-[#e9bf83]" : "bg-[#64c3a9]"}`} />
                  {status}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MiniWindow>
  );
}

function StoreVisual() {
  return (
    <MiniWindow title="Khilat / storefront">
      <div className="h-full bg-[#f2eee5] px-4 py-4 text-[#292b2a] sm:px-8 sm:py-6">
        <div className="flex items-center justify-between border-b border-[#d7d0c4] pb-3">
          <span className="font-display text-xl tracking-[-0.06em] sm:text-3xl">khilat.</span>
          <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#77736f] sm:text-[10px]">
            The collection
          </span>
          <span className="text-[10px]">BAG (0)</span>
        </div>
        <div className="mt-4 grid grid-cols-[0.75fr_1.25fr] items-center gap-3 sm:mt-8 sm:gap-8">
          <div>
            <div className="font-mono text-[8px] uppercase tracking-widest text-[#847760]">
              Curated essentials / 01
            </div>
            <div className="mt-2 font-display text-[clamp(1.2rem,3.4vw,3.5rem)] leading-[1.02]">
              Style in
              <br />
              <em>every detail.</em>
            </div>
            <div className="mt-4 inline-flex border-b border-[#363a35] pb-1 text-[9px] font-semibold uppercase tracking-wider sm:text-xs">
              Explore collection <ArrowUpRight className="ml-2 h-3 w-3" />
            </div>
          </div>
          <div className="relative grid aspect-[1.5/1] grid-cols-2 gap-2">
            <div className="relative overflow-hidden rounded-sm bg-[#d9c4ae]">
              <svg viewBox="0 0 160 180" className="h-full w-full" aria-hidden="true">
                <path d="M36 48 61 29 99 29 124 48 142 91 118 102 110 80 112 166 48 166 50 80 42 102 18 91Z" fill="#aa785d" />
                <path d="M61 29 Q80 58 99 29" fill="none" stroke="#75503e" strokeWidth="5" />
                <path d="M49 107H111" stroke="#8c5e49" opacity=".5" />
              </svg>
            </div>
            <div className="relative overflow-hidden rounded-sm bg-[#c5c2ad]">
              <svg viewBox="0 0 160 180" className="h-full w-full" aria-hidden="true">
                <path d="M35 49 64 29H96L125 49 138 88 115 99 107 77 113 168H47L53 77 45 99 22 88Z" fill="#55594c" />
                <path d="M64 29Q80 47 96 29" fill="none" stroke="#303b34" strokeWidth="4" />
                <path d="M58 50V160M103 50V160" stroke="#adb19d" opacity=".3" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </MiniWindow>
  );
}

const CRM_COLUMNS = [
  { name: "New enquiry", color: "#a6b5fc", rows: ["Dubai family trip", "Kerala getaway"] },
  { name: "In progress", color: "#e8bd86", rows: ["Thailand group", "Bali custom tour"] },
  { name: "Confirmed", color: "#93c9a3", rows: ["Goa long weekend", "Europe itinerary"] },
];

function CrmVisual() {
  return (
    <MiniWindow title="Travel CRM / pipeline">
      <div className="h-full bg-[#111925] px-3 py-4 font-sans text-[#cad5e3] sm:px-6 sm:py-6">
        <div className="flex items-center justify-between gap-2">
          <div>
            <div className="text-[13px] font-semibold text-white sm:text-xl">Lead pipeline</div>
            <div className="mt-1 text-[9px] text-white/40">Travel desk / sample records</div>
          </div>
          <span className="rounded-md bg-[#7c93db]/20 px-2 py-1 text-[9px] text-[#b9c8ff]">+ New lead</span>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-2 sm:mt-7 sm:gap-4">
          {CRM_COLUMNS.map((column) => (
            <div key={column.name} className="min-w-0 rounded-md border border-white/10 bg-white/[0.025] p-2 sm:p-3">
              <div className="mb-3 flex items-center gap-1.5 text-[8px] sm:text-[11px]">
                <i className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: column.color }} />
                <span className="truncate">{column.name}</span>
              </div>
              {column.rows.map((row) => (
                <div key={row} className="mb-2 min-h-12 rounded border border-white/10 bg-[#1d2938] p-2 sm:min-h-20 sm:p-3">
                  <div className="line-clamp-2 text-[8px] font-medium text-white sm:text-xs">{row}</div>
                  <div className="mt-2 h-1 w-[70%] rounded-full bg-white/10" />
                  <div className="mt-1.5 h-1 w-[45%] rounded-full bg-white/10" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </MiniWindow>
  );
}

function ProjectArtwork({ project }: { project: HomeProject }) {
  const kind = project.title === "FusionPOS" ? "pos" : project.title === "Khilat" ? "store" : "crm";
  return (
    <div
      className={`relative isolate aspect-[1.28/1] w-full overflow-hidden sm:aspect-[1.55/1] ${
        kind === "pos" ? "bg-[#6b5144]" : kind === "store" ? "bg-[#b5a28e]" : "bg-[#394f66]"
      }`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-50"
        style={{ background: "radial-gradient(ellipse at 75% 0%, rgba(255,255,255,.28), transparent 55%)" }}
      />
      {/* hover zoom via CSS transition: cheaper than JS-driven whileHover */}
      <div className="absolute inset-0 transition-transform duration-[750ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform group-hover/art:scale-[1.035]">
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.title} product interface screenshot`}
            fill
            sizes="(min-width: 1024px) 700px, 100vw"
            className="object-cover"
          />
        ) : kind === "pos" ? (
          <PosVisual />
        ) : kind === "store" ? (
          <StoreVisual />
        ) : (
          <CrmVisual />
        )}
      </div>
      {!project.image && (
        <span className="absolute bottom-3 left-4 rounded-full border border-white/20 bg-black/35 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-white backdrop-blur-sm sm:bottom-5 sm:left-6">
          Illustrative UI concept
        </span>
      )}
    </div>
  );
}

/* ===================================================================
   SELECTED WORK — sticky stacking case-study cards
   =================================================================== */

function ProjectCard({
  project,
  index,
  total,
  progress,
}: {
  project: HomeProject;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const reduce = useReducedMotion();
  const targetScale = 1 - (total - 1 - index) * 0.035;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);

  /* cursor-follow "Visit" pill */
  const cx = useMotionValue(0);
  const cy = useMotionValue(0);
  const px = useSpring(cx, { stiffness: 320, damping: 28, mass: 0.5 });
  const py = useSpring(cy, { stiffness: 320, damping: 28, mass: 0.5 });
  const [hovering, setHovering] = useState(false);

  const handleMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    cx.set(e.clientX - rect.left - 48);
    cy.set(e.clientY - rect.top - 48);
  };

  const flip = index % 2 === 1;

  return (
    <motion.article
      style={{
        top: `calc(5.5rem + ${index * 1.1}rem)`,
        scale: reduce ? 1 : scale,
        transformOrigin: "50% 0%",
      }}
      className="relative will-change-transform lg:sticky"
    >
      <div className="relative overflow-hidden rounded-[20px] border border-border bg-bg-elevated p-5 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.35)] sm:p-8 lg:p-10">
        {/* ghost number */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-4 right-6 select-none font-display text-[clamp(7rem,16vw,14rem)] leading-none text-transparent [-webkit-text-stroke:1px_var(--border-strong)]"
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <div
          className={`relative grid items-center gap-8 lg:grid-cols-12 lg:gap-12 ${
            flip ? "lg:[&>*:first-child]:order-2" : ""
          }`}
        >
          <div className="lg:col-span-7">
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${project.title} (opens in a new tab)`}
              onMouseMove={handleMove}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
              className="group/art relative block overflow-hidden rounded-[12px] focus-visible:outline-offset-4 lg:cursor-none"
            >
              <ProjectArtwork project={project} />
              <motion.span
                aria-hidden="true"
                style={{ x: px, y: py }}
                animate={{ opacity: hovering ? 1 : 0, scale: hovering ? 1 : 0.4 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="pointer-events-none absolute left-0 top-0 hidden h-24 w-24 flex-col items-center justify-center gap-1 rounded-full bg-accent font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[color:var(--on-accent)] lg:flex"
              >
                Visit
                <ArrowUpRight className="h-4 w-4" />
              </motion.span>
            </a>
          </div>

          <div className="lg:col-span-5">
            <div className="flex flex-wrap items-center gap-4 font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
              <span>
                {project.id} / 0{total}
              </span>
              <span className="h-px w-10 bg-[color:var(--border-strong)]" />
              <span className="inline-flex items-center gap-2 text-text-muted">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inset-0 animate-ping rounded-full bg-[var(--success)] opacity-40" />
                  <span className="relative h-1.5 w-1.5 rounded-full bg-[var(--success)]" />
                </span>
                Live product
              </span>
            </div>

            <h3 className="mt-5 font-display text-[clamp(2.8rem,5vw,5.2rem)] leading-[0.99] tracking-[-0.045em] text-ink">
              {project.title}
            </h3>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-accent">{project.role}</p>
            <p className="mt-6 max-w-[440px] text-sm leading-[1.85] text-text-muted sm:text-base">
              {project.description}
            </p>

            <ul aria-label={`${project.title} technologies`} className="mt-7 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-border px-3.5 py-2 font-mono text-[10px] tracking-wide text-text-muted"
                >
                  {tag}
                </li>
              ))}
            </ul>

            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-9 inline-flex min-h-12 items-center gap-4 border-b border-[color:var(--accent)] pb-2 text-sm font-semibold text-ink transition-colors hover:text-accent"
            >
              Explore live product
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function WorkSection() {
  const listRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id="selected-work"
      aria-labelledby="work-heading"
      className="section-y relative isolate border-b border-border bg-bg"
    >
      <Ambient />
      <div className="container-x">
        <SectionHeading
          id="work-heading"
          eyebrow="01 / Selected work"
          title="Real products."
          emphasis="Considered engineering."
          note="A selection of working products across operations, commerce and business software. Explore each live project to see the implementation."
        />

        <div ref={listRef} className="mt-14 space-y-10 sm:mt-20 lg:space-y-[14vh]">
          {HOME_PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              total={HOME_PROJECTS.length}
              progress={scrollYProgress}
            />
          ))}
        </div>

        <Reveal className="mt-16 flex justify-center sm:mt-24">
          <Link
            href="/projects"
            className="inline-flex min-h-14 items-center gap-6 rounded-full border border-[color:var(--border-strong)] px-7 text-sm font-semibold text-ink transition-[border-color,color,transform] duration-300 hover:-translate-y-1 hover:border-accent hover:text-accent"
          >
            View all projects <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ===================================================================
   SERVICES — numbered rows with hover sweep
   =================================================================== */

const ICONS: Record<HomeService["icon"], LucideIcon> = {
  layers: Layers3,
  server: ServerCog,
  palette: Palette,
  plug: PlugZap,
};

function ServiceRow({ service, index }: { service: HomeService; index: number }) {
  const Icon = ICONS[service.icon];

  return (
    <li className="border-b border-border first:border-t">
      <Reveal delay={index * 0.07}>
        <motion.div
          initial="rest"
          animate="rest"
          whileHover="hover"
          whileFocus="hover"
          tabIndex={0}
          className="relative overflow-hidden outline-none"
        >
          {/* accent sweep */}
          <motion.span
            aria-hidden="true"
            variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
            transition={{ duration: 0.65, ease: EASE }}
            className="absolute inset-0 origin-left bg-[var(--accent-soft)]"
          />
          {/* bottom accent line */}
          <motion.span
            aria-hidden="true"
            variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
            transition={{ duration: 0.8, ease: EASE }}
            className="absolute bottom-0 left-0 h-px w-full origin-left bg-accent"
          />

          <div className="relative grid grid-cols-[auto_1fr_auto] items-start gap-x-5 gap-y-4 px-1 py-8 sm:gap-x-8 sm:px-4 sm:py-11 md:grid-cols-[72px_minmax(0,1.1fr)_minmax(0,1fr)_56px] md:items-center">
            <span className="pt-2 font-mono text-xs text-accent md:pt-0">0{index + 1}</span>

            <motion.h3
              variants={{ rest: { x: 0 }, hover: { x: 14 } }}
              transition={{ duration: 0.6, ease: EASE }}
              className="font-display text-[clamp(1.9rem,3.6vw,3.4rem)] leading-[1.08] tracking-[-0.02em] text-ink"
            >
              {service.title}
            </motion.h3>

            <span
              aria-hidden="true"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--border-strong)] md:order-last"
            >
              <motion.span
                variants={{ rest: { rotate: 0 }, hover: { rotate: 45 } }}
                transition={{ duration: 0.5, ease: EASE }}
                className="flex text-accent"
              >
                <Icon className="h-[18px] w-[18px]" strokeWidth={1.5} />
              </motion.span>
            </span>

            <p className="col-span-3 max-w-[460px] text-sm leading-7 text-text-muted md:col-span-1 md:col-start-3">
              {service.description}
            </p>
          </div>
        </motion.div>
      </Reveal>
    </li>
  );
}

function ServicesSection() {
  return (
    <section
      aria-labelledby="services-heading"
      className="section-y relative isolate border-b border-border bg-bg-soft"
    >
      <Ambient flip />
      <div className="container-x">
        <SectionHeading
          id="services-heading"
          eyebrow="02 / Expertise"
          title="End to end."
          emphasis="No loose ends."
          note="From concept and architecture through refined interfaces, integrations and launch."
        />
        <ul className="mt-14 sm:mt-20">
          {HOME_SERVICES.map((service, index) => (
            <ServiceRow key={service.title} service={service} index={index} />
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ===================================================================
   PROCESS — sticky counter + active-step highlight
   Active step is derived from scroll progress (no viewport-enter misses).
   =================================================================== */

function ProcessSection() {
  const listRef = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const total = HOME_PROCESS.length;

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 0.75", "end 0.55"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 25, restDelta: 0.001 });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.min(total - 1, Math.max(0, Math.floor(v * total)));
    setActive((prev) => (prev === next ? prev : next));
  });

  return (
    <section
      aria-labelledby="process-heading"
      className="section-y relative isolate border-b border-border bg-bg"
    >
      <Ambient />
      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* LEFT — sticky */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <Reveal>
                <Eyebrow>03 / The process</Eyebrow>
                <h2 id="process-heading" className="h-section mt-6 text-ink">
                  Clarity at <em className="text-accent">every stage.</em>
                </h2>
                <p className="mt-6 max-w-[380px] text-sm leading-7 text-text-muted sm:text-base">
                  A straightforward workflow designed to keep feedback visible and delivery predictable.
                </p>
              </Reveal>

              <div className="mt-10 hidden lg:block" aria-hidden="true">
                <div className="flex items-baseline gap-3 font-display leading-none text-ink">
                  <span className="text-[clamp(4rem,7vw,6rem)] tracking-[-0.05em]">
                    {String(active + 1).padStart(2, "0")}
                  </span>
                  <span className="text-2xl italic text-text-muted">
                    / {String(total).padStart(2, "0")}
                  </span>
                </div>
                <div className="mt-6 flex max-w-[320px] gap-2">
                  {HOME_PROCESS.map((step, i) => (
                    <span
                      key={step.title}
                      className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-[color:var(--border-strong)]"
                    >
                      <motion.span
                        initial={false}
                        animate={{ scaleX: i <= active ? 1 : 0 }}
                        transition={{ duration: 0.7, ease: EASE }}
                        className="absolute inset-0 origin-left bg-accent"
                      />
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — steps */}
          <div className="relative lg:col-span-7">
            <div
              aria-hidden="true"
              className="absolute bottom-0 left-[17px] top-0 w-px bg-[color:var(--border-strong)] sm:left-[25px]"
            />
            <motion.div
              aria-hidden="true"
              style={{ scaleY: reduce ? 1 : progress, transformOrigin: "top" }}
              className="absolute bottom-0 left-[17px] top-0 w-px bg-accent sm:left-[25px]"
            />

            <ol ref={listRef} className="relative space-y-8 sm:space-y-12">
              {HOME_PROCESS.map((step, index) => {
                const isActive = active === index;
                return (
                  <motion.li
                    key={step.title}
                    initial={false}
                    animate={{ opacity: isActive ? 1 : 0.4 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="grid grid-cols-[36px_1fr] gap-6 sm:grid-cols-[52px_1fr] sm:gap-9"
                  >
                    <span
                      className={`relative z-10 flex h-9 w-9 items-center justify-center rounded-full border font-mono text-[10px] transition-colors duration-500 sm:h-[51px] sm:w-[51px] ${
                        isActive
                          ? "border-[color:var(--accent)] bg-accent text-[color:var(--on-accent)]"
                          : "border-[color:var(--border-strong)] bg-bg text-text-muted"
                      }`}
                    >
                      0{index + 1}
                    </span>

                    <div className="border-b border-border pb-10 sm:pb-14">
                      <h3 className="font-display text-4xl leading-[1.05] tracking-[-0.02em] text-ink sm:text-5xl">
                        {step.title}
                        <span className="text-accent">.</span>
                      </h3>
                      <p className="mt-4 max-w-[520px] text-sm leading-7 text-text-muted sm:text-base">
                        {step.description}
                      </p>
                    </div>
                  </motion.li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===================================================================
   CTA — masked headline, drawing lines, copy-email, ghost type
   =================================================================== */

const CTA_LINES = [
  "M-50 390C130 65 300 50 620 190",
  "M-30 465C165 125 370 100 650 290",
  "M-20 530C240 195 410 170 670 375",
];

function CtaSection() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [copied, setCopied] = useState(false);
  const email = PERSONAL_INFO.email;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const ghostY = useTransform(scrollYProgress, [0, 1], [90, 0]);

  const copyEmail = async () => {
    if (!email) return;
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <section
      ref={ref}
      aria-labelledby="contact-teaser-heading"
      className="relative isolate overflow-hidden bg-bg-soft pb-32 pt-24 sm:pb-40 sm:pt-32 lg:pb-52 lg:pt-40"
    >
      <Ambient flip />

      {/* drafting lines */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-36 -right-32 h-[560px] w-[560px] opacity-40"
      >
        <svg viewBox="0 0 600 600" fill="none" className="h-full w-full text-accent">
          {CTA_LINES.map((d, i) => (
            <motion.path
              key={d}
              d={d}
              stroke="currentColor"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2.2, delay: 0.2 + i * 0.2, ease: EASE }}
            />
          ))}
          <path d="M170 80L470 530M90 330L535 235" stroke="currentColor" strokeOpacity=".4" strokeWidth=".7" />
          <path d="M298 225h32m-16-16v32" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </div>

      {/* ghost type */}
      <motion.div
        aria-hidden="true"
        style={{ y: reduce ? 0 : ghostY }}
        className="pointer-events-none absolute inset-x-0 -bottom-[0.12em] select-none whitespace-nowrap text-center font-display text-[clamp(6rem,24vw,23rem)] leading-none tracking-[-0.05em] text-transparent will-change-transform [-webkit-text-stroke:1px_var(--border-strong)]"
      >
        Warish
      </motion.div>

      <div className="container-x relative z-10">
        <Eyebrow>04 / Let&apos;s build something</Eyebrow>

        <h2
          id="contact-teaser-heading"
          className="mt-9 max-w-[1000px] font-display text-[clamp(3.2rem,8.5vw,8.5rem)] leading-[1.02] tracking-[-0.04em] text-ink"
        >
          <Words text="Your idea deserves" />
          <Words text="great execution." className="italic text-accent" delay={0.25} />
        </h2>

        <Reveal delay={0.2}>
          <p className="mt-8 max-w-[610px] text-base leading-8 text-text-muted sm:text-lg">
            Have a website, SaaS platform or ambitious product in mind? Let&apos;s discuss what it takes to build it right.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4 sm:mt-12">
            <Link
              href="/contact"
              className="group inline-flex min-h-14 items-center gap-5 rounded-full bg-accent px-7 text-sm font-semibold text-[color:var(--on-accent)] transition-[background-color,transform] duration-300 hover:-translate-y-1 hover:bg-accent-hover"
            >
              Start a conversation
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>

            {email && (
              <>
                <button
                  type="button"
                  onClick={copyEmail}
                  aria-live="polite"
                  className="inline-flex min-h-14 items-center gap-3 rounded-full border border-[color:var(--border-strong)] px-6 text-sm font-medium text-ink transition-[border-color,color] duration-300 hover:border-accent hover:text-accent"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-accent" aria-hidden="true" />
                  ) : (
                    <Copy className="h-4 w-4" aria-hidden="true" />
                  )}
                  {copied ? "Copied to clipboard" : email}
                </button>

                <a
                  href={`mailto:${email}`}
                  aria-label={`Send an email to ${email}`}
                  className="inline-flex min-h-12 items-center gap-2 text-sm text-text-muted transition-colors hover:text-accent"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  Write directly
                </a>
              </>
            )}
          </div>

          <div className="mt-20 flex items-center gap-3 border-t border-border pt-5 font-mono text-[10px] uppercase tracking-[0.19em] text-text-muted sm:mt-28">
            <Code2 className="h-4 w-4 text-accent" aria-hidden="true" />
            Built with purpose
            <ArrowDownRight className="ml-auto h-4 w-4 text-accent" aria-hidden="true" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ===================================================================
   EXPORT
   =================================================================== */

export function HomeTeasers() {
  return (
    <>
      <StatsStrip />
      <WorkSection />
      <ServicesSection />
      <ProcessSection />
      <CtaSection />
    </>
  );
}