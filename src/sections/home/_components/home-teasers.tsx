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
  ArrowDownRight,
  ArrowUpRight,
  Code2,
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
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -40px 0px" }}
      transition={{ duration: 0.85, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-accent sm:text-[11px]">
      <span aria-hidden="true" className="h-px w-7 bg-accent" />
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
      {note && <p className="max-w-[355px] pb-1 text-sm leading-7 text-text-muted sm:text-base">{note}</p>}
    </Reveal>
  );
}

/* ===================================================================
   EDITORIAL FACTS — No claim is added beyond HOME_STATS.
   =================================================================== */
function StatsStrip() {
  return (
    <section aria-label="Professional highlights" className="border-b border-border bg-bg">
      <div className="container-x py-10 sm:py-14">
        <div className="mb-9 flex items-center justify-between gap-4">
          <Eyebrow>At a glance</Eyebrow>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted">Proof in the work</span>
        </div>
        <dl className="grid gap-9 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-border">
          {HOME_STATS.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.09} className="sm:px-7 first:sm:pl-0 last:sm:pr-0">
              <dd className="font-display text-[clamp(4rem,7vw,6.5rem)] leading-none tracking-[-0.055em] text-ink">
                {stat.value}<span className="italic text-accent">{stat.suffix}</span>
              </dd>
              <dt className="mt-3 max-w-[260px] text-xs leading-6 text-text-muted sm:text-sm">{stat.label}</dt>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ===================================================================
   CUSTOM PRODUCT-SPECIFIC UI ILLUSTRATIONS
   Illustrations are NOT screenshots of the production products.
   Replace the SVG artwork with actual product captures later.
   =================================================================== */
function MiniWindow({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <div className="absolute inset-[8%_5%_7%] overflow-hidden rounded-xl border border-white/15 bg-[#111821] shadow-[0_28px_90px_rgba(0,0,0,0.45)] sm:inset-[9%_8%_8%] sm:rounded-2xl">
      <div className="flex h-9 items-center justify-between border-b border-white/10 bg-[#17202b] px-4 sm:h-11 sm:px-5">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <i className="h-1.5 w-1.5 rounded-full bg-white/30" />
          <i className="h-1.5 w-1.5 rounded-full bg-white/20" />
          <i className="h-1.5 w-1.5 rounded-full bg-white/10" />
        </div>
        <span className="truncate px-3 font-mono text-[9px] uppercase tracking-[0.18em] text-[#98a5b6] sm:text-[10px]">{title}</span>
        <span aria-hidden="true" className="h-2 w-8 rounded-full bg-white/10" />
      </div>
      {children}
    </div>
  );
}

function PosVisual() {
  const bars = [38, 62, 51, 82, 66, 94, 76, 100, 70, 87];
  return (
    <MiniWindow title="FusionPOS / operations">
      <div className="flex h-full font-sans text-[9px] text-[#b7c5d4] sm:text-[11px]">
        <aside className="hidden w-[20%] shrink-0 border-r border-white/10 bg-[#121b26] p-4 sm:block">
          <strong className="text-sm tracking-tight text-white">FUSION<span className="text-[#e9bf83]">POS</span></strong>
          <div className="mt-8 space-y-4">
            {['Overview', 'Orders', 'Tables', 'Inventory', 'Analytics'].map((item, i) => (
              <div key={item} className={`rounded-md px-2 py-1.5 ${i === 0 ? 'bg-[#e9bf83]/15 text-[#f2cd92]' : 'text-white/45'}`}>{item}</div>
            ))}
          </div>
        </aside>
        <div className="min-w-0 flex-1 p-3 sm:p-6">
          <div className="flex items-center justify-between gap-2">
            <div><div className="text-[11px] font-semibold text-white sm:text-lg">Operations overview</div><div className="mt-1 text-white/40">Live operations / example data</div></div>
            <span className="rounded-md border border-[#e9bf83]/40 px-2 py-1 text-[#e9bf83]">Today</span>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 sm:mt-6 sm:gap-3">
            {[['Sales', '₹42,850'], ['Orders', '128'], ['Tables', '18 / 24']].map(([a, b]) => (
              <div key={a} className="rounded-md border border-white/10 bg-white/[0.035] p-2 sm:p-3"><div className="text-white/45">{a}</div><div className="mt-1 text-[12px] font-semibold text-white sm:text-xl">{b}</div></div>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-[1fr_0.65fr] gap-2 sm:mt-4 sm:gap-3">
            <div className="rounded-md border border-white/10 p-3 sm:p-4">
              <div className="text-white/70">Sales activity</div>
              <div className="mt-4 flex h-[50px] items-end gap-1 sm:mt-7 sm:h-[110px] sm:gap-2">
                {bars.map((bar, index) => <div key={index} className="flex-1 rounded-t-sm bg-[#dcb679]" style={{ height: `${bar}%`, opacity: 0.4 + index * 0.06 }} />)}
              </div>
            </div>
            <div className="rounded-md border border-white/10 p-3 sm:p-4">
              <div className="text-white/70">Order status</div>
              {['Preparing', 'Ready', 'Served'].map((status, i) => <div key={status} className="mt-3 flex items-center gap-2"><span className={`h-1.5 w-1.5 rounded-full ${i === 0 ? 'bg-[#e9bf83]' : 'bg-[#64c3a9]'}`} />{status}</div>)}
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
          <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#77736f] sm:text-[10px]">The collection</span>
          <span className="text-[10px]">BAG (0)</span>
        </div>
        <div className="mt-4 grid grid-cols-[0.75fr_1.25fr] items-center gap-3 sm:mt-8 sm:gap-8">
          <div>
            <div className="font-mono text-[8px] uppercase tracking-widest text-[#847760]">Curated essentials / 01</div>
            <div className="mt-2 font-display text-[clamp(1.2rem,3.4vw,3.5rem)] leading-[1.02]">Style in<br/><em>every detail.</em></div>
            <div className="mt-4 inline-flex border-b border-[#363a35] pb-1 text-[9px] font-semibold uppercase tracking-wider sm:text-xs">Explore collection <ArrowUpRight className="ml-2 h-3 w-3" /></div>
          </div>
          <div className="relative grid aspect-[1.5/1] grid-cols-2 gap-2">
            <div className="relative overflow-hidden rounded-sm bg-[#d9c4ae]">
              <svg viewBox="0 0 160 180" className="h-full w-full" aria-hidden="true"><path d="M36 48 61 29 99 29 124 48 142 91 118 102 110 80 112 166 48 166 50 80 42 102 18 91Z" fill="#aa785d"/><path d="M61 29 Q80 58 99 29" fill="none" stroke="#75503e" strokeWidth="5"/><path d="M49 107H111" stroke="#8c5e49" opacity=".5"/></svg>
            </div>
            <div className="relative overflow-hidden rounded-sm bg-[#c5c2ad]">
              <svg viewBox="0 0 160 180" className="h-full w-full" aria-hidden="true"><path d="M35 49 64 29H96L125 49 138 88 115 99 107 77 113 168H47L53 77 45 99 22 88Z" fill="#55594c"/><path d="M64 29Q80 47 96 29" fill="none" stroke="#303b34" strokeWidth="4"/><path d="M58 50V160M103 50V160" stroke="#adb19d" opacity=".3"/></svg>
            </div>
          </div>
        </div>
      </div>
    </MiniWindow>
  );
}

function CrmVisual() {
  const columns = [
    { name: 'New enquiry', color: '#a6b5fc', rows: ['Dubai family trip', 'Kerala getaway'] },
    { name: 'In progress', color: '#e8bd86', rows: ['Thailand group', 'Bali custom tour'] },
    { name: 'Confirmed', color: '#93c9a3', rows: ['Goa long weekend', 'Europe itinerary'] },
  ];
  return (
    <MiniWindow title="Travel CRM / pipeline">
      <div className="h-full bg-[#111925] px-3 py-4 font-sans text-[#cad5e3] sm:px-6 sm:py-6">
        <div className="flex items-center justify-between gap-2">
          <div><div className="text-[13px] font-semibold text-white sm:text-xl">Lead pipeline</div><div className="mt-1 text-[9px] text-white/40">Travel desk / sample records</div></div>
          <span className="rounded-md bg-[#7c93db]/20 px-2 py-1 text-[9px] text-[#b9c8ff]">+ New lead</span>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-2 sm:mt-7 sm:gap-4">
          {columns.map((column) => (
            <div key={column.name} className="min-w-0 rounded-md border border-white/10 bg-white/[0.025] p-2 sm:p-3">
              <div className="mb-3 flex items-center gap-1.5 text-[8px] sm:text-[11px]"><i className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: column.color }} /><span className="truncate">{column.name}</span></div>
              {column.rows.map((row, i) => (
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
  const kind = project.title === 'FusionPOS' ? 'pos' : project.title === 'Khilat' ? 'store' : 'crm';
  return (
    <div className={`relative isolate aspect-[1.28/1] w-full overflow-hidden sm:aspect-[1.55/1] ${kind === 'pos' ? 'bg-[#6b5144]' : kind === 'store' ? 'bg-[#b5a28e]' : 'bg-[#394f66]'}`}>
      <div aria-hidden="true" className="absolute inset-0 opacity-50" style={{ background: 'radial-gradient(ellipse at 75% 0%, rgba(255,255,255,.28), transparent 55%)' }} />
      <motion.div whileHover={{ scale: 1.035 }} transition={{ duration: 0.75, ease: EASE }} className="absolute inset-0">
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.title} product interface screenshot`}
            fill
            sizes="(min-width: 1024px) 700px, 100vw"
            className="object-cover"
          />
        ) : kind === 'pos' ? <PosVisual /> : kind === 'store' ? <StoreVisual /> : <CrmVisual />}
      </motion.div>
      {!project.image && (
        <span className="absolute bottom-3 left-4 rounded-full border border-white/20 bg-black/35 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-white backdrop-blur-sm sm:bottom-5 sm:left-6">
          Illustrative UI concept
        </span>
      )}
    </div>
  );
}

/* ===================================================================
   SELECTED WORK — large visual case-study-style compositions
   =================================================================== */
function WorkSection() {
  return (
    <section id="selected-work" aria-labelledby="work-heading" className="section-y border-b border-border bg-bg">
      <div className="container-x">
        <SectionHeading
          id="work-heading"
          eyebrow="01 / Selected work"
          title="Real products."
          emphasis="Considered engineering."
          note="A selection of working products across operations, commerce and business software. Explore each live project to see the implementation."
        />
        <div className="mt-14 space-y-20 sm:mt-20 sm:space-y-28">
          {HOME_PROJECTS.map((project, i) => (
            <article key={project.id} className="group relative">
              <Reveal>
                <div className={`grid items-center gap-8 lg:grid-cols-12 lg:gap-12 ${i % 2 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                  <div className="lg:col-span-7">
                    <a href={project.href} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${project.title} (opens in a new tab)`} className="block overflow-hidden rounded-[12px] focus-visible:outline-offset-4">
                      <ProjectArtwork project={project} />
                    </a>
                  </div>
                  <div className="lg:col-span-5">
                    <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                      <span>{project.id} / 0{HOME_PROJECTS.length}</span>
                      <span className="h-px w-10 bg-border-strong" />
                      <span>Selected product</span>
                    </div>
                    <h3 className="mt-5 font-display text-[clamp(3.1rem,5.5vw,5.8rem)] leading-[0.99] tracking-[-0.045em] text-ink">{project.title}</h3>
                    <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-accent">{project.role}</p>
                    <p className="mt-6 max-w-[440px] text-sm leading-[1.85] text-text-muted sm:text-base">{project.description}</p>
                    <ul aria-label={`${project.title} technologies`} className="mt-7 flex flex-wrap gap-2">
                      {project.tags.map((tag) => <li key={tag} className="rounded-full border border-border px-3.5 py-2 font-mono text-[10px] tracking-wide text-text-muted">{tag}</li>)}
                    </ul>
                    <a href={project.href} target="_blank" rel="noopener noreferrer" className="mt-9 inline-flex min-h-12 items-center gap-4 border-b border-[color:var(--accent)] pb-2 text-sm font-semibold text-ink transition-colors hover:text-accent">
                      Explore live product <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </Reveal>
            </article>
          ))}
        </div>
        <Reveal className="mt-16 flex justify-center sm:mt-24">
          <Link href="/projects" className="inline-flex min-h-14 items-center gap-6 rounded-full border border-border-strong px-7 text-sm font-semibold text-ink transition-[border-color,color,transform] duration-300 hover:-translate-y-1 hover:border-accent hover:text-accent">
            View all projects <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ===================================================================
   SERVICES — numbered editorial rows, not generic icon cards
   =================================================================== */
const ICONS: Record<HomeService['icon'], LucideIcon> = {
  layers: Layers3,
  server: ServerCog,
  palette: Palette,
  plug: PlugZap,
};

function ServicesSection() {
  return (
    <section aria-labelledby="services-heading" className="section-y border-b border-border bg-bg-soft">
      <div className="container-x">
        <SectionHeading id="services-heading" eyebrow="02 / Expertise" title="End to end." emphasis="No loose ends." note="From concept and architecture through refined interfaces, integrations and launch." />
        <div className="mt-14 grid border-t border-border sm:mt-20 lg:grid-cols-2 lg:gap-x-14">
          {HOME_SERVICES.map((service, index) => {
            const Icon = ICONS[service.icon];
            return (
              <Reveal key={service.title} delay={(index % 2) * 0.1} className="border-b border-border">
                <div className="group flex min-h-[195px] gap-5 py-8 sm:gap-8 sm:py-10">
                  <span className="font-mono text-xs text-accent">0{index + 1}</span>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-display text-[clamp(1.8rem,3vw,2.8rem)] leading-[1.15] text-ink">{service.title}</h3>
                      <Icon className="h-6 w-6 shrink-0 text-accent transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" strokeWidth={1.4} aria-hidden="true" />
                    </div>
                    <p className="mt-5 max-w-[420px] text-sm leading-7 text-text-muted">{service.description}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ===================================================================
   PROCESS — responsive vertical editorial timeline with scroll progress
   =================================================================== */
function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.5'] });
  const springProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });
  const scaleY = useTransform(springProgress, [0, 1], [0, 1]);

  return (
    <section aria-labelledby="process-heading" className="section-y border-b border-border bg-bg">
      <div className="container-x">
        <SectionHeading id="process-heading" eyebrow="03 / The process" title="Clarity at" emphasis="every stage." note="A straightforward workflow designed to keep feedback visible and delivery predictable." />
        <div ref={ref} className="relative mt-14 sm:mt-20">
          <div aria-hidden="true" className="absolute bottom-0 left-[18px] top-0 w-px bg-border-strong sm:left-[25px]" />
          <motion.div aria-hidden="true" style={{ scaleY: reduceMotion ? 1 : scaleY, transformOrigin: 'top' }} className="absolute bottom-0 left-[18px] top-0 w-px bg-accent sm:left-[25px]" />
          <ol className="relative space-y-12 sm:space-y-16">
            {HOME_PROCESS.map((step, index) => (
              <li key={step.title} className="grid grid-cols-[40px_1fr] gap-6 sm:grid-cols-[52px_1fr] sm:gap-9">
                <div className="relative z-10 flex h-[37px] w-[37px] items-center justify-center rounded-full border border-[color:var(--accent)] bg-bg font-mono text-[10px] text-accent sm:h-[51px] sm:w-[51px]">0{index + 1}</div>
                <Reveal className="grid gap-3 border-b border-border pb-10 sm:grid-cols-[minmax(180px,0.8fr)_1fr] sm:gap-10 sm:pb-14">
                  <h3 className="font-display text-4xl text-ink sm:text-5xl">{step.title}<span className="text-accent">.</span></h3>
                  <p className="max-w-[520px] pt-2 text-sm leading-7 text-text-muted sm:text-base">{step.description}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ===================================================================
   CTA — typographic close; unique drafting-line motif
   =================================================================== */
function CtaSection() {
  return (
    <section aria-labelledby="contact-teaser-heading" className="relative isolate overflow-hidden bg-bg-soft py-24 sm:py-32 lg:py-40">
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-36 -right-32 h-[560px] w-[560px] opacity-35">
        <svg viewBox="0 0 600 600" fill="none" className="h-full w-full text-accent">
          <path d="M-50 390C130 65 300 50 620 190M-30 465C165 125 370 100 650 290M-20 530C240 195 410 170 670 375" stroke="currentColor" strokeWidth="1" />
          <path d="M170 80L470 530M90 330L535 235" stroke="currentColor" strokeOpacity=".4" strokeWidth=".7" />
          <path d="M298 225h32m-16-16v32" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </div>
      <div className="container-x relative z-10">
        <Reveal>
          <Eyebrow>04 / Let's build something</Eyebrow>
          <h2 id="contact-teaser-heading" className="mt-9 max-w-[1000px] font-display text-[clamp(3.5rem,9vw,9rem)] leading-[0.98] tracking-[-0.04em] text-ink">
            Your idea deserves <em className="text-accent">great execution.</em>
          </h2>
          <p className="mt-8 max-w-[610px] text-base leading-8 text-text-muted sm:text-lg">Have a website, SaaS platform or ambitious product in mind? Let's discuss what it takes to build it right.</p>
          <div className="mt-10 flex flex-wrap items-center gap-5 sm:mt-12">
            <Link href="/contact" className="group inline-flex min-h-14 items-center gap-5 rounded-full bg-accent px-7 text-sm font-semibold text-[color:var(--on-accent)] transition-[background-color,transform] duration-300 hover:-translate-y-1 hover:bg-accent-hover">
              Start a conversation <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            {PERSONAL_INFO.email && <a href={`mailto:${PERSONAL_INFO.email}`} className="inline-flex min-h-12 items-center gap-2 text-sm text-text-muted transition-colors hover:text-accent"><Mail className="h-4 w-4" aria-hidden="true" /> {PERSONAL_INFO.email}</a>}
          </div>
          <div className="mt-20 flex items-center gap-3 border-t border-border pt-5 font-mono text-[10px] uppercase tracking-[0.19em] text-text-muted sm:mt-28">
            <Code2 className="h-4 w-4 text-accent" aria-hidden="true" /> Built with purpose <ArrowDownRight className="ml-auto h-4 w-4 text-accent" aria-hidden="true" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

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
