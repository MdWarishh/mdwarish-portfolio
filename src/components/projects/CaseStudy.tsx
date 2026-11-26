import Image from "next/image";
import Link from "next/link";
import { TechIcon, techLabel } from "@/components/icons/TechIcon";
import { Eyebrow } from "@/components/sections/SectionHead";
import { PageMark } from "@/components/svg/PageMark";
import { SchemaDiagram } from "@/components/svg/SchemaDiagram";
import { ArrowUpRight } from "@/components/ui/Icons";
import { CATEGORY_LABELS, getRelatedProjects } from "@/content/projects";
import type { Project } from "@/types/content";
import { ProjectRows } from "./ProjectRows";

export function CaseStudy({ project }: { project: Project }) {
  const related = getRelatedProjects(project.slug, 2);
  const [lead, ...rest] = project.gallery;
  const mobile = rest.find((s) => s.height > s.width);
  const desktopRest = rest.filter((s) => s !== mobile);
  const isCrm = Boolean(project.modules?.length);

  const sections = [
    { id: "brief", label: "The brief" },
    ...(isCrm ? [{ id: "modules", label: `Modules (${project.modules?.length})` }] : []),
    { id: "built", label: "What I built" },
    { id: "architecture", label: "Architecture" },
    { id: "stack", label: "Stack" },
    { id: "screens", label: "Screens" },
    { id: "challenges", label: "Problems I solved" },
    { id: "evidence", label: "Check it yourself" },
  ];
  const extraScreens = isCrm ? [lead] : desktopRest;

  return (
    <>
      <section className="page-head has-mark">
        <PageMark variant="case" />
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <ol>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/projects">Work</Link>
              </li>
              <li aria-current="page">{project.title}</li>
            </ol>
          </nav>
          <div style={{ marginTop: "2rem" }}>
            <Eyebrow>{CATEGORY_LABELS[project.category]}</Eyebrow>
          </div>
          <h1 className="h1 enter" style={{ maxWidth: "16ch" }}>
            {project.title}
          </h1>
          <p className="lede enter" style={{ ["--d" as string]: 120 }}>
            {project.summary}
          </p>
          <dl className="case-facts enter" style={{ ["--d" as string]: 220 }}>
            <div>
              <dt className="label">Client</dt>
              <dd>{project.client}</dd>
            </div>
            <div>
              <dt className="label">Role</dt>
              <dd>{project.role}</dd>
            </div>
            <div>
              <dt className="label">Area</dt>
              <dd>{project.sector}</dd>
            </div>
            <div>
              <dt className="label">Year</dt>
              <dd>{project.year}</dd>
            </div>
          </dl>
          <div className="links-row">
            {project.links.map((link, i) => (
              <a key={link.href} href={link.href} className={`btn${i === 0 ? " btn--accent" : " btn--ghost"}`} target="_blank" rel="noopener noreferrer">
                {link.label}
                {link.note ? <span className="sr-only"> ({link.note})</span> : null}
                <ArrowUpRight />
              </a>
            ))}
          </div>
          {project.links.some((l) => l.note) ? (
            <p className="small muted" style={{ marginTop: "0.75rem" }}>
              {project.links.find((l) => l.note)?.note}.
            </p>
          ) : null}
        </div>
      </section>

      <section style={{ paddingBottom: "var(--s-6)" }}>
        <div className="container">
          {isCrm ? (
            <figure className="case-media">
              <div style={{ padding: "clamp(1rem, 3vw, 2.5rem)" }}>
                <SchemaDiagram />
              </div>
              <figcaption>The core data model. Every device is a serial-numbered record, from stock-in to invoice.</figcaption>
            </figure>
          ) : (
            <figure className="case-media">
              <Image src={lead.src} alt={lead.alt} width={lead.width} height={lead.height} sizes="(min-width: 1280px) 1200px, 100vw" priority />
              <figcaption>{lead.caption}</figcaption>
            </figure>
          )}
        </div>
      </section>

      <div className="container section--tight" style={{ paddingTop: "var(--s-5)" }}>
        <div className="case-layout">
          <aside className="case-toc" aria-label="On this page">
            <ol>
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`}>{s.label}</a>
                </li>
              ))}
            </ol>
          </aside>

          <div>
            <section className="case-block" id="brief" aria-labelledby="h-brief">
              <h2 id="h-brief">The brief</h2>
              <div className="prose">
                <p>{project.overview}</p>
                <h3>The problem</h3>
                <p>{project.problem}</p>
                <h3>The goal</h3>
                <p>{project.objective}</p>
              </div>
            </section>

            {isCrm ? (
              <section className="case-block" id="modules" aria-labelledby="h-modules">
                <h2 id="h-modules">{project.modules?.length} modules, one system</h2>
                <p className="muted" style={{ maxWidth: "var(--measure)", marginBottom: "var(--s-5)" }}>
                  Every module below exists in the code — each has its own API routes and dashboard pages. I built all of them.
                </p>
                <ol className="modules" role="list">
                  {project.modules?.map((m) => (
                    <li key={m.name} className="module">
                      <h3>{m.name}</h3>
                      <p>{m.does}</p>
                    </li>
                  ))}
                </ol>
              </section>
            ) : null}

            <section className="case-block" id="built" aria-labelledby="h-built">
              <h2 id="h-built">What I built</h2>
              <ul className="checklist prose" role="list">
                {project.contribution.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </section>

            <section className="case-block" id="architecture" aria-labelledby="h-architecture">
              <h2 id="h-architecture">{project.architecture.heading}</h2>
              <div className="prose">
                {project.architecture.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </section>

            <section className="case-block" id="stack" aria-labelledby="h-stack">
              <h2 id="h-stack">Stack</h2>
              <ul className="tech-list" role="list">
                {project.stack.map((id) => (
                  <li key={id} className="tech">
                    <TechIcon id={id} />
                    <span>{techLabel(id)}</span>
                  </li>
                ))}
                {(project.stackExtra ?? []).map((t) => (
                  <li key={t} className="tech tech--text">
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="case-block" id="screens" aria-labelledby="h-screens">
              <h2 id="h-screens">Screens</h2>
              <div className={`gallery${mobile ? " gallery--with-mobile" : ""}`}>
                <div className="gallery">
                  {extraScreens.map((s) => (
                    <figure key={s.src} className="case-media">
                      <Image src={s.src} alt={s.alt} width={s.width} height={s.height} sizes="(min-width: 1024px) 900px, 100vw" />
                      <figcaption>{s.caption}</figcaption>
                    </figure>
                  ))}
                </div>
                {mobile ? (
                  <figure className="case-media">
                    <Image src={mobile.src} alt={mobile.alt} width={mobile.width} height={mobile.height} sizes="(min-width: 1024px) 300px, 80vw" />
                    <figcaption>{mobile.caption}</figcaption>
                  </figure>
                ) : null}
              </div>
              <p className="small muted" style={{ marginTop: "1rem" }}>
                Captured from the live {isCrm ? "app" : "site"} in November 2026.
              </p>
            </section>

            <section className="case-block" id="challenges" aria-labelledby="h-challenges">
              <h2 id="h-challenges">Problems I solved</h2>
              <ul className="pc-list" role="list">
                {project.challenges.map((c) => (
                  <li key={c.challenge} className="pc">
                    <div>
                      <span className="label">Problem</span>
                      <p>{c.challenge}</p>
                    </div>
                    <div>
                      <span className="label">What I did</span>
                      <p className="muted">{c.solution}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section className="case-block" id="evidence" aria-labelledby="h-evidence">
              <h2 id="h-evidence">Check it yourself</h2>
              <ul className="checklist prose" role="list">
                {project.evidence.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>

      {related.length ? (
        <section className="section rule-top" aria-labelledby="related-title">
          <div className="container">
            <h2 className="h2" id="related-title" style={{ marginBottom: "var(--s-6)" }}>
              More <em>work</em>
            </h2>
            <ProjectRows projects={related} />
          </div>
        </section>
      ) : null}
    </>
  );
}
