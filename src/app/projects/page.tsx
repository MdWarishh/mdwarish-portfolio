import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { JsonLd } from "@/components/layout/JsonLd";
import { WorkCase, WorkSeam, type WorkVariant } from "@/components/projects/WorkCase";
import { WorkFilter } from "@/components/projects/WorkFilter";
import { Eyebrow } from "@/components/sections/SectionHead";
import { WorkTree } from "@/components/svg/WorkTree";
import { CATEGORY_LABELS, PROJECTS } from "@/content/projects";
import { absoluteUrl, breadcrumbJsonLd, graph, pageMetadata } from "@/lib/seo";
import type { ProjectCategory } from "@/types/content";

export const metadata: Metadata = pageMetadata({
  title: "Projects — CRM, Web Apps & Business Websites",
  description:
    "Projects by Md Warish: Limra CRM, a full business CRM with 18 modules, plus the Futurex Group website and exhibition sites for trade shows in Odisha and Kathmandu.",
  path: "/projects",
});

const d = (ms: number) => ({ "--d": ms }) as CSSProperties;

export default function ProjectsPage() {
  // Limra CRM leads; the rest keep their data order and alternate sides.
  const ordered = [...PROJECTS].sort((a, b) => Number(b.slug === "limra-crm") - Number(a.slug === "limra-crm"));
  const categories = (Object.keys(CATEGORY_LABELS) as ProjectCategory[]).filter((c) => PROJECTS.some((p) => p.category === c));
  const options = [
    { value: "all", label: "All work", count: PROJECTS.length },
    ...categories.map((c) => ({ value: c, label: CATEGORY_LABELS[c], count: PROJECTS.filter((p) => p.category === c).length })),
  ];
  let side = 0;

  return (
    <>
      <JsonLd
        data={graph(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Work", path: "/projects" }]), {
          "@type": "ItemList",
          itemListElement: PROJECTS.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: absoluteUrl(`/projects/${p.slug}`), name: p.title })),
        })}
      />

      {/* Opening: what this page is, and the shape of the work */}
      <section className="wk-hero" aria-labelledby="work-title">
        <div className="wk-mark wk-mark--hero" aria-hidden data-ambient>
          <span className="wk-mark__text enter-fade" style={d(200)}>
            Work
          </span>
        </div>
        <div className="container wk-hero__grid">
          <div className="wk-hero__intro">
            <div className="enter">
              <Eyebrow>Work</Eyebrow>
            </div>
            <h1 className="h1 wk-hero__title" id="work-title">
              <span className="wk-line">
                <span className="line__in" style={d(120)}>
                  Live software,
                </span>
              </span>
              <span className="wk-line">
                <span className="line__in" style={d(230)}>
                  <em>live sites.</em>
                </span>
              </span>
            </h1>
            <p className="lede enter" style={d(480)}>
              Business software, company websites and exhibition sites. Everything here is in production — each case
              study says what I built and how, and links to where you can check it.
            </p>
          </div>
          <figure className="wk-hero__art enter-fade" style={d(300)}>
            <WorkTree projects={PROJECTS} />
          </figure>
        </div>
      </section>

      {/* Every project as a case study */}
      <section className="wk-cases" aria-labelledby="cases-title">
        <div className="wk-mark wk-mark--cases" aria-hidden data-ambient>
          <span className="wk-mark__text" data-reveal>
            Case studies
          </span>
        </div>
        <div className="container">
          <div className="wk-cases__head">
            <h2 className="h2" id="cases-title" data-reveal>
              Every project, <em>in production.</em>
            </h2>
          </div>
          <WorkFilter options={options} total={PROJECTS.length}>
            <ul className="wk-list" role="list" data-testid="project-index">
              {ordered.map((p, n) => {
                const variant: WorkVariant = n === 0 ? "feature" : side++ % 2 === 0 ? "right" : "left";
                return (
                  <li key={p.slug} className="wk-item" data-category={p.category}>
                    {n > 0 ? <WorkSeam /> : null}
                    <WorkCase project={p} variant={variant} />
                  </li>
                );
              })}
            </ul>
          </WorkFilter>
        </div>
      </section>
    </>
  );
}
