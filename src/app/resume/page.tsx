import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { TECH_ICONS } from "@/components/icons/tech-icons";
import { JsonLd } from "@/components/layout/JsonLd";
import { PageHero } from "@/components/sections/PageHero";
import { ArrowRight } from "@/components/ui/Icons";
import { PrintButton } from "@/components/ui/PrintButton";
import { PERSON, SITE } from "@/config/site";
import { EXPERIENCE } from "@/content/experience";
import { getProject } from "@/content/projects";
import { SKILL_GROUPS } from "@/content/skills";
import { breadcrumbJsonLd, graph, pageMetadata } from "@/lib/seo";
import { ResumeArt } from "./_components/ResumeArt";

export const metadata: Metadata = pageMetadata({
  title: "Resume — Full-Stack Software Engineer",
  description:
    "Resume of Md Warish, full-stack software engineer: experience, selected projects, technical skills and education. Printable as PDF.",
  path: "/resume",
});

/**
 * Download integration point. There is no resume PDF in /public yet, so the page offers the
 * browser's "Save as PDF" (print styles turn the page into a clean A4 resume). When a real file is
 * added — e.g. public/md-warish-resume.pdf — set this to "/md-warish-resume.pdf" and a direct
 * download button appears next to it.
 */
const RESUME_PDF: string | null = null;

const RESUME_PROJECTS = ["limra-crm", "futurex-group-corporate-website", "odisha-mining-expo", "nepal-wood-international-expo"];

const SECTIONS = [
  { id: "r-summary", label: "Summary" },
  { id: "r-skills", label: "Technical skills" },
  { id: "r-exp", label: "Experience" },
  { id: "r-projects", label: "Selected projects" },
  { id: "r-edu", label: "Education" },
];

const i = (n: number) => ({ "--i": n }) as CSSProperties;

export default function ResumePage() {
  const projects = RESUME_PROJECTS.map((slug) => getProject(slug)).filter((p) => p !== undefined);
  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Resume", path: "/resume" },
          ]),
        )}
      />

      <div className="no-print">
        <PageHero
          id="resume-title"
          variant="resume"
          eyebrow="Resume"
          mark="Resume"
          lines={[PERSON.name, <em key="e">{PERSON.title}.</em>]}
          art={<ResumeArt />}
        >
          <p className="lede enter" style={{ "--d": 460 } as CSSProperties}>
            I build web apps end to end — schemas, APIs, interfaces and deployment. {PERSON.availability}.
          </p>
          <div className="actions rs-actions enter" style={{ "--d": 580 } as CSSProperties}>
            {RESUME_PDF ? (
              <a href={RESUME_PDF} className="btn btn--accent" download>
                Download PDF <ArrowRight />
              </a>
            ) : null}
            <PrintButton />
            <a href="#resume-doc" className="btn btn--ghost">
              View resume
            </a>
          </div>
          <p className="ph__meta enter" style={{ "--d": 680 } as CSSProperties}>
            Want more detail? See{" "}
            <Link href="/experience" className="link">
              Experience
            </Link>{" "}
            and{" "}
            <Link href="/projects" className="link">
              Work
            </Link>
            .
          </p>
        </PageHero>
      </div>

      <section className="rs-sec" aria-label="Resume">
        <div className="container">
          <article className="resume" id="resume-doc" aria-label={`Resume of ${PERSON.name}`}>
            <header className="resume__head">
              <p className="resume__name">{PERSON.name}</p>
              <p className="resume__title">{PERSON.title}</p>
              <ul className="resume-contact" role="list">
                <li>{PERSON.region}</li>
                <li>
                  <a href={`mailto:${PERSON.email}`}>{PERSON.email}</a>
                </li>
                <li>
                  <a href={PERSON.linkedin}>linkedin.com/in/md-warish</a>
                </li>
                <li>
                  <a href={PERSON.github}>github.com/{PERSON.githubHandle}</a>
                </li>
                <li>{SITE.domain}</li>
              </ul>
              <nav className="resume__nav no-print" aria-label="Resume sections">
                <ul role="list">
                  {SECTIONS.map((s) => (
                    <li key={s.id}>
                      <a href={`#${s.id}`}>{s.label}</a>
                    </li>
                  ))}
                </ul>
              </nav>
            </header>

            <div className="resume__body">
              <section aria-labelledby="r-summary" data-reveal>
                <h2 id="r-summary">Summary</h2>
                <p className="r-lead">
                  Full-stack developer. I build web apps end to end: PostgreSQL and MongoDB schemas, Node.js and Express
                  APIs, Next.js and React interfaces, and VPS deployment. I built and run Limra CRM, an 18-module business
                  CRM, and I build websites for international B2B trade shows. {PERSON.availability}.
                </p>
              </section>

              <section aria-labelledby="r-skills" data-reveal>
                <h2 id="r-skills">Technical skills</h2>
                <dl className="r-skills">
                  {SKILL_GROUPS.map((g) => (
                    <div key={g.title}>
                      <dt>{g.title}</dt>
                      <dd>
                        <ul role="list">
                          {[...g.icons.map((id) => TECH_ICONS[id].label), ...g.text].map((s) => (
                            <li key={s}>{s}</li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>

              <section aria-labelledby="r-exp" data-reveal>
                <h2 id="r-exp">Experience</h2>
                <div className="r-timeline">
                  {EXPERIENCE.map((item, n) => (
                    <div key={item.id} className="r-item" style={i(n)}>
                      <h3>
                        {item.role} — {item.company}
                      </h3>
                      {item.period || item.location ? (
                        <p className="r-meta">{[item.period, item.location].filter(Boolean).join(" · ")}</p>
                      ) : null}
                      <p className="r-text">{item.summary}</p>
                      {item.highlights.length ? (
                        <ul className="r-bullets">
                          {item.highlights.map((h) => (
                            <li key={h}>{h}</li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  ))}
                </div>
              </section>

              <section aria-labelledby="r-projects" data-reveal>
                <h2 id="r-projects">Selected projects</h2>
                <div className="r-projects">
                  {projects.map((p) => (
                    <div key={p.slug} className="r-item">
                      <h3>
                        <Link href={`/projects/${p.slug}`}>{p.title}</Link>
                      </h3>
                      <p className="r-meta">
                        {p.client} · {p.stack.map((id) => TECH_ICONS[id].label).join(", ")}
                      </p>
                      <p className="r-text">{p.summary}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section aria-labelledby="r-edu" data-reveal>
                <h2 id="r-edu">Education</h2>
                <div className="r-item">
                  <h3>{PERSON.education.degree}</h3>
                  <p className="r-meta">
                    {PERSON.education.institution} · {PERSON.education.period}
                  </p>
                </div>
              </section>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
