import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { TechIcon, techLabel } from "@/components/icons/TechIcon";
import type { TechId } from "@/components/icons/tech-icons";
import { PERSON } from "@/config/site";
import { EXPERIENCE } from "@/content/experience";
import { getProject } from "@/content/projects";

/**
 * Career timeline. A spine runs down the page; each entry's segment draws and its marker fills as
 * the entry is revealed. Entries come straight from EXPERIENCE, plus Limra CRM (a client project,
 * labelled as such) and education from PERSON. Dates appear only where they are confirmed in the data.
 */
type Entry = {
  id: string;
  kind: string;
  title: string;
  titleUrl?: string;
  role: string;
  meta?: string;
  summary: string;
  highlights: string[];
  stack: TechId[];
  related: string[];
};

const i = (n: number) => ({ "--i": n }) as CSSProperties;

function entries(): Entry[] {
  const crm = getProject("limra-crm");
  const [futurex, ...rest] = EXPERIENCE;
  const fromExp = (e: (typeof EXPERIENCE)[number], kind: string): Entry => ({
    id: e.id,
    kind,
    title: e.company,
    titleUrl: e.companyUrl,
    role: e.role,
    meta: [e.period, e.location].filter(Boolean).join(" · ") || undefined,
    summary: e.summary,
    highlights: e.highlights,
    stack: e.stack,
    related: e.relatedProjects,
  });
  const list: Entry[] = [];
  if (futurex) list.push(fromExp(futurex, "Work"));
  if (crm)
    list.push({
      id: "limra",
      kind: "Client project",
      title: "Limra",
      role: crm.role,
      meta: crm.client,
      summary:
        "I designed and built a full business CRM for Limra — 18 modules on Next.js, Express and PostgreSQL — and I keep it running in production.",
      highlights: crm.contribution,
      stack: crm.stack,
      related: [crm.slug],
    });
  rest.forEach((e) => list.push(fromExp(e, "Internship")));
  list.push({
    id: "education",
    kind: "Education",
    title: PERSON.education.institution,
    role: PERSON.education.degree,
    meta: PERSON.education.period,
    summary: "",
    highlights: [],
    stack: [],
    related: [],
  });
  return list;
}

export function Timeline() {
  return (
    <ol className="tl" role="list">
      {entries().map((e) => {
        const related = e.related.map((s) => getProject(s)).filter((p) => p !== undefined);
        return (
          <li key={e.id} className={`tl__item tl__item--${e.id}`} data-reveal style={i(0)}>
            <span className="tl__marker" aria-hidden>
              <span className="tl__dot" />
            </span>
            <div className="tl__meta">
              <p className="label tl__kind">{e.kind}</p>
              <h3 className="tl__title">
                {e.titleUrl ? (
                  <a href={e.titleUrl} target="_blank" rel="noopener noreferrer">
                    {e.title}
                  </a>
                ) : (
                  e.title
                )}
              </h3>
              <p className="tl__role">{e.role}</p>
              {e.meta ? <p className="tl__when">{e.meta}</p> : null}
            </div>
            <div className="tl__body">
              {e.summary ? <p className="tl__summary">{e.summary}</p> : null}
              {e.highlights.length ? (
                <ul className="checklist" role="list">
                  {e.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              ) : null}
              {e.stack.length ? (
                <ul className="tl__stack" role="list" aria-label="Technologies used">
                  {e.stack.map((id) => (
                    <li key={id}>
                      <TechIcon id={id} className="" size={13} mono />
                      {techLabel(id)}
                    </li>
                  ))}
                </ul>
              ) : null}
              {related.length ? (
                <div className="tl__work">
                  <p className="tl__work-label">Related work</p>
                  <ul role="list">
                    {related.map((p) => (
                      <li key={p.slug}>
                        <Link href={`/projects/${p.slug}`}>
                          <span className="tl__thumb" aria-hidden>
                            <Image src={p.gallery[0].src} alt="" width={p.gallery[0].width} height={p.gallery[0].height} sizes="72px" />
                          </span>
                          <span>{p.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
