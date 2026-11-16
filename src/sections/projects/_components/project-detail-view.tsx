"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Github, LockKeyhole } from "lucide-react";
import type { Project } from "@/types";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { ProjectVisual } from "@/components/projects/project-visual";

const EASE = [0.22, 1, 0.36, 1] as const;

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div initial={reduce ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: reduce ? 0 : 0.75, ease: EASE }} className={className}>
      {children}
    </motion.div>
  );
}

function ButtonLink({ href, children, primary = false }: { href: string; children: React.ReactNode; primary?: boolean }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={primary
      ? "group inline-flex min-h-11 items-center gap-2.5 bg-accent px-5 text-sm font-semibold text-[color:var(--on-accent)] transition-colors hover:bg-accent-hover"
      : "group inline-flex min-h-11 items-center gap-2.5 border border-border-strong px-5 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"}>
      {children} <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </a>
  );
}

export function ProjectDetailView({ project, prevProject, nextProject }: {
  project: Project;
  prevProject: Project;
  nextProject: Project;
}) {
  const reduced = useReducedMotion();
  return (
    <article>
      <header className="border-b border-border bg-bg">
        <div className="container-x pb-11 pt-9 sm:pb-14 sm:pt-12">
          <Breadcrumbs items={[{ label: "Projects", href: "/projects" }, { label: project.title, href: `/projects/${project.slug}` }]} />
          <motion.div initial={reduced ? false : { opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : 0.8, ease: EASE }} className="mt-12 grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="label-mono">{project.category}</p>
              <h1 className="mt-4 max-w-4xl font-display text-[clamp(3rem,6vw,6rem)] leading-[1.04] tracking-[-0.035em] text-ink">{project.title}</h1>
            </div>
            <p className="max-w-md text-[15px] leading-[1.85] text-text-muted lg:col-span-4">{project.shortDescription}</p>
          </motion.div>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {project.liveUrl && <ButtonLink href={project.liveUrl} primary>Visit live project</ButtonLink>}
            {project.frontendGithub && <ButtonLink href={project.frontendGithub}><Github className="h-4 w-4" aria-hidden="true" /> Frontend code</ButtonLink>}
            {project.backendGithub && <ButtonLink href={project.backendGithub}><Github className="h-4 w-4" aria-hidden="true" /> Backend code</ButtonLink>}
          </div>
          {project.loginRequired && (
            <p className="mt-5 flex max-w-2xl items-start gap-2 text-xs leading-[1.7] text-text-muted">
              <LockKeyhole aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              Protected application: visitors may see an authentication screen rather than private dashboard data.
            </p>
          )}
        </div>
      </header>

      <div className="container-x pt-10 sm:pt-14">
        <Reveal>
          <figure>
            <div className="group relative aspect-[16/10] w-full overflow-hidden border border-border bg-bg-soft sm:aspect-[16/9]">
              <ProjectVisual project={project} priority sizes="(max-width: 768px) 100vw, 1200px" />
            </div>
            <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[.1em] text-text-muted">
              {project.hasRealScreenshot ? "Project interface screenshot" : "Illustrative project preview"}
            </figcaption>
          </figure>
        </Reveal>

        <div className="grid gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:gap-16">
          <div className="space-y-16 lg:col-span-8">
            <Reveal>
              <section aria-labelledby="project-overview">
                <p className="label-mono">Context</p>
                <h2 id="project-overview" className="mt-3 font-display text-[clamp(2rem,3.2vw,3.1rem)] leading-[1.14] tracking-[-.025em] text-ink">What this project is about.</h2>
                <p className="mt-6 max-w-3xl whitespace-pre-line text-[15px] leading-[1.95] text-text-muted sm:text-base">{project.fullDescription}</p>
              </section>
            </Reveal>
            <Reveal>
              <section aria-labelledby="project-features" className="border-t border-border pt-10">
                <p className="label-mono">Engineering</p>
                <h2 id="project-features" className="mt-3 font-display text-[clamp(2rem,3.2vw,3.1rem)] leading-[1.14] tracking-[-.025em] text-ink">Capabilities &amp; architecture.</h2>
                <ul className="mt-7 grid gap-x-8 sm:grid-cols-2">
                  {project.keyFeatures.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 border-b border-border py-4 text-sm leading-[1.8] text-ink">
                      <span aria-hidden="true" className="mt-[10px] h-1 w-5 shrink-0 bg-accent" />{feature}
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
            <Reveal>
              <section aria-labelledby="project-contribution" className="border-t border-border pt-10">
                <p className="label-mono">My role</p>
                <h2 id="project-contribution" className="mt-3 font-display text-[clamp(2rem,3.2vw,3.1rem)] leading-[1.14] tracking-[-.025em] text-ink">What I contributed.</h2>
                <p className="mt-6 max-w-3xl whitespace-pre-line text-[15px] leading-[1.95] text-text-muted sm:text-base">{project.contribution}</p>
              </section>
            </Reveal>
          </div>

          <aside className="lg:col-span-4">
            <div className="border-t border-accent bg-bg-soft p-6 lg:sticky lg:top-24">
              <p className="label-mono">Project at a glance</p>
              <dl className="mt-6 space-y-5">
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[.12em] text-text-muted">Category</dt>
                  <dd className="mt-2 text-sm font-medium text-ink">{project.category}</dd>
                </div>
                <div className="border-t border-border pt-5">
                  <dt className="font-mono text-[10px] uppercase tracking-[.12em] text-text-muted">Technologies</dt>
                  <dd className="mt-3 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => <span key={tech} className="border border-border bg-bg px-2.5 py-1.5 text-xs text-ink">{tech}</span>)}
                  </dd>
                </div>
                <div className="border-t border-border pt-5">
                  <dt className="font-mono text-[10px] uppercase tracking-[.12em] text-text-muted">Access</dt>
                  <dd className="mt-2 text-sm text-ink">{project.loginRequired ? "Login required" : project.liveUrl ? "Live link available" : "Case study"}</dd>
                </div>
              </dl>
              <Link href="/contact" className="group mt-7 flex items-center justify-between gap-3 border-t border-border pt-5 text-sm font-semibold text-ink transition-colors hover:text-accent">
                Discuss a similar project <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              </Link>
            </div>
          </aside>
        </div>

        <nav aria-label="Adjacent projects" className="grid border-t border-border sm:grid-cols-2">
          <Link href={`/projects/${prevProject.slug}`} className="group border-b border-border py-8 sm:border-b-0 sm:border-r sm:pr-8">
            <span className="inline-flex items-center gap-2 text-xs text-text-muted"><ArrowLeft aria-hidden="true" className="h-4 w-4" /> Previous project</span>
            <span className="mt-4 block font-display text-[clamp(1.6rem,2.6vw,2.6rem)] leading-tight text-ink transition-colors group-hover:text-accent">{prevProject.title}</span>
          </Link>
          <Link href={`/projects/${nextProject.slug}`} className="group py-8 sm:pl-8 sm:text-right">
            <span className="inline-flex items-center gap-2 text-xs text-text-muted">Next project <ArrowRight aria-hidden="true" className="h-4 w-4" /></span>
            <span className="mt-4 block font-display text-[clamp(1.6rem,2.6vw,2.6rem)] leading-tight text-ink transition-colors group-hover:text-accent">{nextProject.title}</span>
          </Link>
        </nav>
        <div className="pb-16 pt-7">
          <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-accent"><ArrowLeft aria-hidden="true" className="h-4 w-4" /> All projects</Link>
        </div>
      </div>
    </article>
  );
}
