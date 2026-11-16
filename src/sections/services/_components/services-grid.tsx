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
import { ArrowDown, ArrowUpRight, ChevronDown } from "lucide-react";
import { SERVICE_ITEMS } from "@/data/services";

const EASE = [0.22, 1, 0.36, 1] as const;
type Service = (typeof SERVICE_ITEMS)[number];

function BrandMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className={className}>
      <path d="M5 36V12L15 25L24 12L33 25V12" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="miter" />
      <path d="M15 30L21 38L27 30L33 38L43 18" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="miter" />
      <path d="M38 9H43V14" stroke="var(--accent)" strokeWidth="2" />
    </svg>
  );
}

function Reveal({ children, className = "", delay = 0 }: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 23 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: reduce ? 0 : 0.78, delay: reduce ? 0 : delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* Original SVG engineering composition: physical-feeling circuit traces,
   compact panels and deliberate connections rather than generic orbit rings. */
function BlueprintArtwork() {
  const reduce = useReducedMotion();
  const paths = [
    "M-20 105H98Q120 105 120 127V165H212",
    "M-20 255H128Q152 255 152 230V165H212",
    "M-20 385H80Q112 385 112 353V325H212",
    "M425 165H500Q524 165 524 192V244H650",
    "M425 325H482Q505 325 505 295V244H650",
    "M322 235V265",
  ];

  return (
    <svg aria-hidden="true" viewBox="0 0 680 480" fill="none" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="services-circuit-line" x1="0" y1="0" x2="680" y2="480" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--accent)" stopOpacity=".05" />
          <stop offset=".5" stopColor="var(--accent)" stopOpacity=".62" />
          <stop offset="1" stopColor="var(--accent)" stopOpacity=".16" />
        </linearGradient>
      </defs>

      <g stroke="var(--accent)" strokeOpacity=".22" strokeWidth="1">
        <path d="M18 34H52M35 17V51" />
        <path d="M624 431H660M642 413V449" />
        <path d="M44 435H130" />
      </g>

      {paths.map((path, i) => (
        <motion.path
          key={path}
          d={path}
          stroke="url(#services-circuit-line)"
          strokeWidth={i === 5 ? 1.8 : 1.2}
          initial={reduce ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: reduce ? 0 : 1.6, delay: reduce ? 0 : .25 + i * .13, ease: EASE }}
        />
      ))}

      <g fill="var(--bg)" stroke="var(--border-strong)" strokeWidth="1.2">
        <rect x="212" y="98" width="213" height="137" rx="2" />
        <rect x="212" y="265" width="213" height="118" rx="2" />
        <rect x="524" y="206" width="130" height="76" rx="2" />
      </g>
      <path d="M232 124H279" stroke="var(--accent)" strokeWidth="2.5" />
      <path d="M232 290H279" stroke="var(--accent)" strokeWidth="2.5" />
      <path d="M541 227H570" stroke="var(--accent)" strokeWidth="2.5" />
      <g fill="var(--ink)" fontFamily="monospace" fontSize="12" letterSpacing="1.2">
        <text x="232" y="164">PRODUCT</text>
        <text x="232" y="183">EXPERIENCE</text>
        <text x="232" y="330">ENGINEERING</text>
        <text x="541" y="255">DELIVERY</text>
      </g>
      <g stroke="var(--accent)" strokeOpacity=".55" strokeWidth="1">
        <path d="M232 203H393" /><path d="M232 349H393" />
      </g>
      <motion.path
        d="M325 235V264"
        stroke="var(--accent)"
        strokeWidth="2.5"
        initial={reduce ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: reduce ? 0 : .65, delay: reduce ? 0 : 1.3 }}
      />
      {[[120,165],[152,230],[505,295],[524,244]].map(([cx,cy], i) => (
        <motion.circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3" fill="var(--accent)"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduce ? 0 : .4, delay: reduce ? 0 : 1 + i * .16 }}
        />
      ))}
    </svg>
  );
}

const GLYPHS: Record<string, string[]> = {
  "fullstack-web-development": ["M5 11L1 16L5 21", "M19 11L23 16L19 21", "M14 8L10 24"],
  "business-website-development": ["M2 5H22V27H2Z", "M2 11H22", "M6 8H7M10 8H11", "M6 16H13M6 20H19"],
  "crm-dashboard-development": ["M3 5H21V27H3Z", "M3 12H21", "M8 17H11V21H8Z", "M15 17H18M15 21H18"],
  "ecommerce-development": ["M6 10H20L18 23H8L6 10Z", "M9 10V8A5 5 0 0 1 19 8V10", "M11 27H11.1M16 27H16.1"],
  "api-development-integration": ["M4 16H10M14 16H20", "M10 12L14 16L10 20", "M3 8H9M15 24H21", "M20 8L23 11L20 14"],
  "business-workflow-automation": ["M4 9H12V17H20", "M17 14L20 17L17 20", "M5 23H11M13 23H19", "M11 5L13 9L11 13"],
  "website-maintenance-improvements": ["M16 5A6 6 0 0 0 9 12L3 18L10 25L16 19A6 6 0 0 0 23 12", "M9 12L16 19"],
};

function ServiceGlyph({ id }: { id: string }) {
  const paths = GLYPHS[id] || GLYPHS["fullstack-web-development"];
  return (
    <svg viewBox="0 0 26 32" fill="none" aria-hidden="true" className="h-9 w-8 text-accent" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      {paths.map((d) => <path key={d} d={d} />)}
    </svg>
  );
}

function ServicesHero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const shift = useTransform(scrollYProgress, [0, 1], [0, 58]);
  const artworkY = useSpring(shift, { stiffness: 75, damping: 24 });

  return (
    <section ref={ref} aria-labelledby="services-heading" className="relative isolate overflow-hidden border-b border-border bg-bg">
      <div className="container-x relative z-10 grid items-center gap-12 pb-16 pt-16 sm:pb-20 sm:pt-20 lg:min-h-[590px] lg:grid-cols-12 lg:gap-10 lg:py-24">
        <div className="lg:col-span-7">
          <Reveal className="flex items-center gap-3">
            <BrandMark className="h-8 w-8 text-ink" />
            <span className="label-mono">Software engineering services</span>
          </Reveal>

          <motion.h1
            id="services-heading"
            className="mt-7 max-w-[740px] font-display text-[clamp(3.1rem,6.1vw,6.1rem)] font-normal leading-[1.035] tracking-[-0.037em] text-ink"
            initial={reduce ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0 : .92, ease: EASE }}
          >
            Built for your <em className="text-accent">business.</em>
            <span className="block">Made to last.</span>
          </motion.h1>

          <Reveal delay={.16} className="mt-7 max-w-xl">
            <p className="text-[15px] leading-[1.87] text-text-muted sm:text-[16px]">
              Thoughtful web experiences, custom software and connected workflows.
              From early requirements to production deployment, I build around what your team actually needs.
            </p>
          </Reveal>

          <Reveal delay={.25} className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
            <a href="#services-list" className="group inline-flex min-h-11 items-center gap-2 border-b border-accent pb-1 text-[13px] font-semibold text-ink transition-colors hover:text-accent">
              Explore services
              <ArrowDown aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
            </a>
            <Link href="/contact" className="group inline-flex min-h-11 items-center gap-2 text-[13px] font-semibold text-ink transition-colors hover:text-accent">
              Discuss a project
              <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <motion.div
          aria-hidden="true"
          style={{ y: reduce ? 0 : artworkY }}
          className="pointer-events-none relative mx-auto h-[285px] w-full max-w-[580px] sm:h-[360px] lg:col-span-5 lg:h-[420px]"
        >
          <BlueprintArtwork />
        </motion.div>
      </div>
    </section>
  );
}

function ServiceRow({ service }: { service: Service }) {
  const reduce = useReducedMotion();
  return (
    <motion.article
      id={service.id}
      className="group scroll-mt-28 border-b border-border py-9 sm:py-12 lg:py-14"
      initial={reduce ? false : { opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: .12 }}
      transition={{ duration: reduce ? 0 : .8, ease: EASE }}
    >
      <div className="grid gap-7 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <ServiceGlyph id={service.id} />
          <h3 className="mt-5 max-w-[390px] font-display text-[clamp(1.85rem,2.75vw,2.75rem)] font-normal leading-[1.13] tracking-[-.025em] text-ink transition-colors duration-300 group-hover:text-accent">
            {service.title}
          </h3>
          <p className="mt-4 max-w-[410px] text-[14px] leading-[1.85] text-text-muted sm:text-[15px]">
            {service.description}
          </p>
        </div>

        <div className="lg:col-span-7 lg:pt-1">
          <p className="font-mono text-[10px] uppercase tracking-[.15em] text-accent">What’s included</p>
          <ul className="mt-4 grid gap-x-6 sm:grid-cols-2">
            {service.deliverables.map((deliverable) => (
              <li key={deliverable} className="flex items-start gap-3 border-b border-border/80 py-4 text-[13px] leading-[1.7] text-ink sm:text-[14px]">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 bg-accent" />
                <span>{deliverable}</span>
              </li>
            ))}
          </ul>

          <Link
            href={`/contact?service=${encodeURIComponent(service.title)}`}
            className="mt-6 inline-flex min-h-11 items-center gap-2 border-b border-accent pb-1 text-[13px] font-semibold text-ink transition-colors hover:text-accent"
            aria-label={`Discuss ${service.title}`}
          >
            Discuss this service
            <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

function ServicesIndex() {
  return (
    <section id="services-list" aria-labelledby="services-list-title" className="scroll-mt-24 bg-bg py-16 sm:py-24">
      <div className="container-x">
        <div className="grid gap-7 border-b border-border pb-10 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-8">
            <p className="label-mono">What I can help with</p>
            <h2 id="services-list-title" className="mt-5 max-w-2xl font-display text-[clamp(2.2rem,4vw,4rem)] leading-[1.13] tracking-[-.027em] text-ink">
              The right solution for <em className="text-accent">the right problem.</em>
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-4">
            <p className="max-w-sm text-sm leading-[1.85] text-text-muted">
              Each engagement starts with the requirements. Here’s the scope of the services I offer.
            </p>
          </Reveal>
        </div>
        <div>
          {SERVICE_ITEMS.map((service) => <ServiceRow key={service.id} service={service} />)}
        </div>
      </div>
    </section>
  );
}

function Approach() {
  return (
    <section aria-labelledby="approach-heading" className="border-t border-border bg-bg-soft py-16 sm:py-24">
      <div className="container-x grid gap-9 lg:grid-cols-12 lg:gap-14">
        <Reveal className="lg:col-span-5">
          <p className="label-mono">Working together</p>
          <h2 id="approach-heading" className="mt-5 font-display text-[clamp(2.2rem,3.8vw,3.6rem)] leading-[1.15] tracking-[-.025em] text-ink">
            Clear from the <em className="text-accent">first conversation.</em>
          </h2>
          <p className="mt-5 max-w-md text-sm leading-[1.85] text-text-muted">
            Good implementation starts with a shared understanding of the problem, scope and expected outcome.
          </p>
        </Reveal>
        <div className="lg:col-span-7">
          {[
            { title: "Understand", text: "Discuss the business workflow, users, constraints and goals." },
            { title: "Plan", text: "Define the scope, architecture and practical delivery approach." },
            { title: "Build & refine", text: "Implement, review and improve the experience through feedback." },
            { title: "Launch & support", text: "Prepare deployment, validate the production setup and discuss future improvements." },
          ].map((step, i) => (
            <Reveal key={step.title} delay={i * .05} className="grid grid-cols-[24px_1fr] gap-5 border-b border-border py-5 first:pt-0">
              <ChevronDown aria-hidden="true" className="mt-1 h-4 w-4 -rotate-90 text-accent" strokeWidth={1.4} />
              <div className="sm:grid sm:grid-cols-2 sm:gap-6">
                <h3 className="font-display text-[1.5rem] leading-[1.2] text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-[1.75] text-text-muted sm:mt-0">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServicesGrid() {
  return (
    <>
      <ServicesHero />
      <ServicesIndex />
      <Approach />
    </>
  );
}
