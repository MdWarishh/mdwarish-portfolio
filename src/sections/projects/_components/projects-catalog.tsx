"use client";

import { useRef } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import type { Project } from "@/types";
import { PROJECTS, PROJECT_CATEGORIES, getFeaturedProjects } from "@/data/projects";
import { ProjectVisual } from "@/components/projects/project-visual";

const EASE = [0.22, 1, 0.36, 1] as const;
const featured = getFeaturedProjects();

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: reduce ? 0 : 0.75, delay: reduce ? 0 : delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Thin architectural arcs, not a repeating grid or neon effect. */
function EditorialLines() {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 700 440" fill="none" aria-hidden="true" className="h-full w-full">
      <defs>
        <linearGradient id="work-lines" x1="0" y1="0" x2="700" y2="440" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--accent)" stopOpacity="0" />
          <stop offset=".55" stopColor="var(--accent)" stopOpacity=".42" />
          <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[
        "M-60 310C110 65 275 480 480 178S675 55 790 90",
        "M-60 362C125 112 295 515 500 230S690 114 790 147",
        "M-60 411C138 175 315 555 520 286S698 184 790 204",
      ].map((d, i) => (
        <motion.path key={d} d={d} stroke="url(#work-lines)" strokeWidth={i === 1 ? 1.4 : 0.85}
          initial={reduce ? false : { pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: reduce ? 0 : 2.1, delay: reduce ? 0 : i * 0.19, ease: EASE }} />
      ))}
      <path d="M474 178h25m-12.5-12.5v25" stroke="var(--accent)" strokeOpacity=".4" />
    </svg>
  );
}

function CatalogIntro() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const artY = useTransform(scrollYProgress, [0, 1], [0, 75]);
  return (
    <section ref={ref} aria-labelledby="projects-heading" className="relative isolate overflow-hidden border-b border-border bg-bg">
      <motion.div aria-hidden="true" style={{ y: reduce ? 0 : artY }} className="pointer-events-none absolute -right-[32%] top-0 -z-10 h-[390px] w-[680px] opacity-65 sm:-right-[10%] lg:right-0">
        <EditorialLines />
      </motion.div>
      <div className="container-x py-16 sm:py-20 lg:py-24">
        <Reveal><p className="label-mono">Portfolio / Case studies</p></Reveal>
        <Reveal delay={0.08}>
          <h1 id="projects-heading" className="mt-5 max-w-[790px] font-display text-[clamp(3.1rem,6.1vw,6rem)] font-normal leading-[1.04] tracking-[-0.035em] text-ink">
            Selected work. <em className="text-accent">Real applications.</em>
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-6 max-w-[580px] text-[15px] leading-[1.85] text-text-muted sm:text-base">
            From full-stack business software to public-facing web experiences—projects shaped around practical workflows, careful engineering and usable interfaces.
          </p>
          <a href="#featured-work" className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-accent">
            Explore projects <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/** Alternating image/text layout creates a portfolio rhythm rather than cards. */
function Feature({ project, index }: { project: Project; index: number }) {
  const flipped = index % 2 === 1;
  return (
    <article className="border-b border-border py-12 sm:py-16 lg:py-20">
      <div className="grid items-center gap-9 lg:grid-cols-12 lg:gap-12">
        <Reveal className={flipped ? "lg:order-2 lg:col-span-7" : "lg:col-span-7"}>
          <Link href={`/projects/${project.slug}`} className="group block focus-visible:outline-offset-4" aria-label={`Read the ${project.title} case study`}>
            <div className="relative aspect-[16/10] overflow-hidden bg-bg-soft ring-1 ring-border sm:aspect-[16/9]">
              <ProjectVisual project={project} priority={index === 0} sizes="(max-width: 1024px) 100vw, 720px" />
              <span className="absolute bottom-4 right-4 inline-flex h-11 w-11 items-center justify-center bg-bg-elevated text-ink shadow-sm transition-colors group-hover:bg-accent group-hover:text-[color:var(--on-accent)]" aria-hidden="true">
                <ArrowUpRight className="h-5 w-5" />
              </span>
            </div>
          </Link>
        </Reveal>
        <Reveal delay={0.1} className={flipped ? "lg:order-1 lg:col-span-5" : "lg:col-span-5"}>
          <p className="label-mono">{project.category}</p>
          <h2 className="mt-4 font-display text-[clamp(2.1rem,3.6vw,3.55rem)] font-normal leading-[1.1] tracking-[-0.025em] text-ink">{project.title}</h2>
          <p className="mt-5 max-w-md text-[15px] leading-[1.85] text-text-muted">{project.shortDescription}</p>
          <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
            {project.technologies.slice(0, 4).map((tech) => <span key={tech} className="font-mono text-[10px] text-accent">{tech}</span>)}
          </div>
          <Link href={`/projects/${project.slug}`} className="group mt-9 inline-flex items-center gap-3 border-b border-accent pb-2 text-sm font-semibold text-ink transition-colors hover:text-accent">
            Read the case study <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      </div>
    </article>
  );
}

/** The archive remains visual but uses compact rows rather than a second duplicate card grid. */
function ArchiveRow({ project }: { project: Project }) {
  const reduce = useReducedMotion();
  return (
    <motion.li layout={!reduce} initial={reduce ? false : { opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0, y: -10 }} transition={{ duration: reduce ? 0 : 0.36, ease: EASE }}>
      <Link href={`/projects/${project.slug}`} className="group grid items-center gap-4 border-b border-border py-5 transition-colors hover:bg-[var(--accent-soft)] sm:grid-cols-[160px_minmax(0,1fr)_auto] sm:gap-7 sm:px-3">
        <div className="relative aspect-[16/10] w-full max-w-[240px] overflow-hidden border border-border bg-bg-soft sm:w-[160px]">
          <ProjectVisual project={project} sizes="(max-width: 640px) 240px, 160px" />
        </div>
        <div className="min-w-0">
          <p className="font-mono text-[10px] uppercase tracking-[.13em] text-accent">{project.category}</p>
          <h3 className="mt-1 font-display text-[clamp(1.45rem,2.3vw,2.15rem)] leading-tight tracking-[-.02em] text-ink transition-colors group-hover:text-accent">{project.title}</h3>
          <p className="mt-2 max-w-2xl text-sm leading-[1.65] text-text-muted">{project.shortDescription}</p>
        </div>
        <ArrowUpRight aria-hidden="true" className="hidden h-5 w-5 text-text-muted transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent sm:block" />
      </Link>
    </motion.li>
  );
}

export function ProjectsCatalog() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requested = searchParams.get("category") || "all";
  const active = PROJECT_CATEGORIES.some((category) => category.value === requested) ? requested : "all";
  const filtered = active === "all" ? PROJECTS : PROJECTS.filter((project) => project.category === active);
  const reduce = useReducedMotion();

  function updateCategory(category: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (category === "all") params.delete("category");
    else params.set("category", category);
    const query = params.toString();
    router.replace(query ? `/projects?${query}` : "/projects", { scroll: false });
  }

  return (
    <>
      <CatalogIntro />
      <section id="featured-work" aria-labelledby="featured-heading" className="scroll-mt-24 bg-bg">
        <div className="container-x pt-16 sm:pt-20">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-5">
              <div>
                <p className="label-mono">Featured work</p>
                <h2 id="featured-heading" className="mt-3 font-display text-[clamp(2.15rem,4vw,3.7rem)] leading-[1.12] tracking-[-.025em] text-ink">A closer look.</h2>
              </div>
              <p className="max-w-xs text-sm leading-[1.7] text-text-muted">Selected systems and experiences, shown through their actual work.</p>
            </div>
          </Reveal>
          <div className="mt-5 border-t border-border">
            {featured.map((project, index) => <Feature key={project.slug} project={project} index={index} />)}
          </div>
        </div>
      </section>
      <section id="projects-archive" aria-labelledby="archive-heading" className="scroll-mt-24 border-t border-border bg-bg-soft py-16 sm:py-20">
        <div className="container-x">
          <Reveal>
            <p className="label-mono">Complete archive</p>
            <h2 id="archive-heading" className="mt-3 font-display text-[clamp(2.1rem,4vw,3.6rem)] leading-[1.12] tracking-[-.025em] text-ink">Explore every project.</h2>
            <p className="mt-4 max-w-xl text-sm leading-[1.8] text-text-muted">Filter by domain, then open a case study for technical details and my contribution.</p>
          </Reveal>
          <div role="group" aria-label="Project category filters" className="mt-9 flex flex-wrap gap-x-5 gap-y-2 border-b border-border">
            {PROJECT_CATEGORIES.map((category) => (
              <button key={category.value} type="button" aria-pressed={active === category.value} onClick={() => updateCategory(category.value)}
                className={`min-h-11 border-b-2 px-1 py-3 text-[13px] font-medium transition-colors ${active === category.value ? "border-accent text-ink" : "border-transparent text-text-muted hover:text-accent"}`}>
                {category.label}
              </button>
            ))}
          </div>
          <p aria-live="polite" className="mt-5 font-mono text-[11px] text-text-muted">{filtered.length} {filtered.length === 1 ? "project" : "projects"}</p>
          <ul className="mt-4">
            <AnimatePresence initial={false} mode="popLayout">
              {filtered.map((project) => <ArchiveRow key={project.slug} project={project} />)}
            </AnimatePresence>
          </ul>
          {filtered.length === 0 && <p className="py-12 text-sm text-text-muted">No projects in this category.</p>}
          <Reveal className="mt-16 flex flex-wrap items-center justify-between gap-5 border-t border-border pt-7">
            <p className="font-display text-2xl text-ink">Have something in mind?</p>
            <Link href="/contact" className="group inline-flex items-center gap-3 border-b border-accent pb-2 text-sm font-semibold text-ink hover:text-accent">
              Let’s discuss it <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
