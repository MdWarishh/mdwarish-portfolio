import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { SectionHead } from "@/components/sections/SectionHead";
import { ArrowRight, ArrowUpRight } from "@/components/ui/Icons";
import { CATEGORY_LABELS } from "@/content/projects";
import type { Project } from "@/types/content";

/**
 * Homepage "Selected work": an editorial showcase instead of numbered rows.
 *   feature — Limra CRM, large framed screenshot beside its story
 *   wide    — text left, wide screenshot right
 *   pair    — two projects side by side, the second set lower
 * Real screenshots only (project.gallery[0]). Scroll reveals use the shared [data-reveal] system;
 * the oversized "PROJECTS" watermark drifts slowly behind everything (CSS, paused offscreen).
 */
type Variant = "feature" | "wide" | "pair";

const i = (n: number) => ({ "--i": n }) as CSSProperties;

function host(project: Project) {
  const first = project.links[0]?.href;
  if (!first) return project.title;
  try {
    const url = new URL(first);
    return project.links[0].href.includes("github.com") ? project.title : url.hostname.replace(/^www\./, "");
  } catch {
    return project.title;
  }
}

function ShowcaseItem({ project, variant }: { project: Project; variant: Variant }) {
  const cover = project.gallery[0];
  const modules = variant === "feature" ? (project.modules ?? []) : [];
  const meta =
    variant === "feature" ? `${project.sector} · ${project.year}` : `${CATEGORY_LABELS[project.category]} · ${project.sector}`;
  const sizes = variant === "feature" ? "(min-width: 900px) 58vw, 100vw" : variant === "wide" ? "(min-width: 900px) 60vw, 100vw" : "(min-width: 900px) 46vw, 100vw";

  return (
    <article className={`sc sc--${variant}`}>
      <div className="sc__media" data-reveal style={i(0)}>
        <div className="sc__frame">
          <div className="sc__bar" aria-hidden>
            <span className="sc__dots" />
            <span className="sc__host">{host(project)}</span>
          </div>
          <div className="sc__zoom">
            <Image src={cover.src} alt={cover.alt} width={cover.width} height={cover.height} sizes={sizes} />
          </div>
        </div>
        <span className="sc__cue" aria-hidden>
          View case study <ArrowUpRight />
        </span>
      </div>

      <div className="sc__body" data-reveal style={i(2)}>
        <p className="label">{meta}</p>
        <h3 className="sc__title">
          <Link href={`/projects/${project.slug}`}>{project.title}</Link>
        </h3>
        <p className="sc__summary">{project.summary}</p>
        {modules.length ? (
          <ul className="module-chips" role="list" aria-label={`${modules.length} modules`}>
            {modules.slice(0, 9).map((m) => (
              <li key={m.name}>{m.name}</li>
            ))}
            <li>+{modules.length - 9} more</li>
          </ul>
        ) : null}
        <div className="sc__foot">
          <span className="arrow-link sc__cta">
            Case study <ArrowRight />
          </span>
          {project.links.length ? (
            <ul className="sc__links" role="list">
              {project.links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} target="_blank" rel="noopener noreferrer" title={l.note}>
                    {l.label}
                    {l.note ? <span className="sr-only"> ({l.note})</span> : null}
                    <ArrowUpRight />
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export function ProjectShowcase({ feature, projects, total }: { feature: Project; projects: Project[]; total: number }) {
  const [wide, ...pair] = projects;
  return (
    <section className="section rule-top work" aria-labelledby="work-title">
      <div className="work-mark" aria-hidden data-ambient>
        <span className="work-mark__text" data-reveal>
          Projects
        </span>
      </div>
      <div className="container">
        <SectionHead
          eyebrow="Selected work"
          id="work-title"
          title={
            <>
              Things I&apos;ve <em>shipped.</em>
            </>
          }
          aside={<p>A CRM a business runs on, and websites for trade shows in India and Nepal. All live.</p>}
        />
        <div className="showcase">
          <ShowcaseItem project={feature} variant="feature" />
          {wide ? <ShowcaseItem project={wide} variant="wide" /> : null}
          {pair.length ? (
            <div className="showcase__pair">
              {pair.map((p) => (
                <ShowcaseItem key={p.slug} project={p} variant="pair" />
              ))}
            </div>
          ) : null}
        </div>
        <p className="work__all" data-reveal>
          <Link href="/projects" className="arrow-link">
            All {total} projects <ArrowRight />
          </Link>
        </p>
      </div>
    </section>
  );
}
