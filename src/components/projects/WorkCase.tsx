import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { techLabel } from "@/components/icons/TechIcon";
import { SchemaDiagram } from "@/components/svg/SchemaDiagram";
import { ArrowRight, ArrowUpRight } from "@/components/ui/Icons";
import { CATEGORY_LABELS } from "@/content/projects";
import type { Project, Shot } from "@/types/content";

/**
 * One case study on the Work page, as an editorial spread: a framed real screenshot (plus a
 * second real screenshot or, for Limra CRM, its database diagram) beside the story — purpose,
 * the need, my role, what I built, the stack and the links. Everything comes from PROJECTS.
 *   feature — Limra CRM: schema panel + login screenshot, module list, source-code note
 *   left / right — which side the visual sits on (alternates down the page)
 */
export type WorkVariant = "feature" | "left" | "right";

const i = (n: number) => ({ "--i": n }) as CSSProperties;

function host(project: Project) {
  const live = project.links.find((l) => !l.href.includes("github.com"));
  if (!live) return project.title;
  try {
    return new URL(live.href).hostname.replace(/^www\./, "");
  } catch {
    return project.title;
  }
}

function Frame({ shot, bar, sizes, className = "" }: { shot: Shot; bar?: string; sizes: string; className?: string }) {
  return (
    <span className={`wk-frame ${className}`}>
      {bar ? (
        <span className="wk-frame__bar">
          <span className="wk-frame__dots" />
          <span className="wk-frame__host">{bar}</span>
        </span>
      ) : null}
      <span className="wk-frame__img">
        <Image src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} sizes={sizes} />
      </span>
    </span>
  );
}

/** Joint between two case studies: a hairline with a small stepped node, drawn on reveal. */
export function WorkSeam() {
  return (
    <div className="wk-seam" aria-hidden data-reveal>
      <span className="wk-seam__line" />
      <svg viewBox="0 0 96 24" fill="none" focusable={false}>
        <path className="wk-seam__path" pathLength={1} d="M0 16 H30 L40 6 H56 L66 16 H96" />
        <circle className="wk-seam__node" cx="48" cy="6" r="2.6" />
      </svg>
      <span className="wk-seam__line" />
    </div>
  );
}

export function WorkCase({ project, variant }: { project: Project; variant: WorkVariant }) {
  const [cover, ...rest] = project.gallery;
  const second = rest.find((s) => s.height > s.width) ?? rest[0];
  const phone = second ? second.height > second.width : false;
  const href = `/projects/${project.slug}`;
  const feature = variant === "feature";
  const modules = project.modules ?? [];
  const external = project.links;
  const repos = external.filter((l) => l.href.includes("github.com"));

  return (
    <article className={`wk-case wk-case--${variant}`} aria-labelledby={`wk-${project.slug}`}>
      <div className="wk-case__visual" data-reveal>
        {feature ? (
          <>
            <div className="wk-schema">
              <span className="wk-schema__label label">Data model · from the source</span>
              <SchemaDiagram caption={false} animate={false} />
            </div>
            <Link href={href} className="wk-case__media wk-case__media--sub" tabIndex={-1} aria-hidden>
              <Frame shot={cover} bar={host(project)} sizes="(min-width: 1024px) 30vw, 70vw" />
            </Link>
          </>
        ) : (
          <>
            <Link href={href} className="wk-case__media" tabIndex={-1} aria-hidden>
              <Frame shot={cover} bar={host(project)} sizes="(min-width: 1024px) 56vw, 100vw" />
              <span className="wk-case__cue">
                View case study <ArrowUpRight />
              </span>
            </Link>
            {second ? (
              <span className={`wk-case__second${phone ? " wk-case__second--phone" : ""}`} aria-hidden>
                <Frame shot={second} sizes={phone ? "160px" : "(min-width: 1024px) 24vw, 45vw"} className={phone ? "wk-frame--phone" : ""} />
              </span>
            ) : null}
          </>
        )}
      </div>

      <div className="wk-case__body">
        <p className="label wk-case__meta" data-reveal style={i(1)}>
          {CATEGORY_LABELS[project.category]} · {project.sector} · {project.year}
        </p>
        <h3 className="wk-case__title" id={`wk-${project.slug}`} data-reveal style={i(2)}>
          <Link href={href}>{project.title}</Link>
        </h3>
        <p className="wk-case__summary" data-reveal style={i(3)}>
          {project.summary}
        </p>

        <dl className="wk-facts" data-reveal style={i(4)}>
          <div>
            <dt>The need</dt>
            <dd>{project.problem}</dd>
          </div>
          <div>
            <dt>My role</dt>
            <dd>{project.role}</dd>
          </div>
        </dl>

        <div className="wk-did" data-reveal style={i(5)}>
          <p className="wk-did__label">What I built</p>
          <ul role="list">
            {project.contribution.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>

        {feature && modules.length ? (
          <div className="wk-modules" data-reveal style={i(6)}>
            <p className="wk-did__label">{modules.length} modules</p>
            <ul className="module-chips" role="list">
              {modules.map((m) => (
                <li key={m.name}>{m.name}</li>
              ))}
            </ul>
          </div>
        ) : null}

        <ul className="wk-stack" role="list" aria-label="Technologies" data-reveal style={i(7)}>
          {project.stack.map((id) => (
            <li key={id}>{techLabel(id)}</li>
          ))}
          {(project.stackExtra ?? []).map((s) => (
            <li key={s} className="wk-stack__extra">
              {s}
            </li>
          ))}
        </ul>

        <div className="wk-case__foot" data-reveal style={i(8)}>
          <Link href={href} className="wk-case__cta">
            Read the case study <ArrowRight />
          </Link>
          <ul className="wk-links" role="list">
            {external.map((l) => (
              <li key={l.href}>
                <a href={l.href} target="_blank" rel="noopener noreferrer">
                  {l.label}
                  {l.note ? <span className="wk-links__note">{l.note}</span> : null}
                  <ArrowUpRight />
                </a>
              </li>
            ))}
          </ul>
          {feature && repos.length ? (
            <p className="wk-case__note">
              The source code lives in the InventoryPro-Frontend and InventoryPro-Backend repositories — the repo name is
              older than the product name.
            </p>
          ) : null}
        </div>
      </div>
    </article>
  );
}
