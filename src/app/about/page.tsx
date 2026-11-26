import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { JsonLd } from "@/components/layout/JsonLd";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHead } from "@/components/sections/SectionHead";
import { TechStack } from "@/components/sections/TechStack";
import { ArrowRight } from "@/components/ui/Icons";
import { PERSON } from "@/config/site";
import { EXPERIENCE } from "@/content/experience";
import { getProject, PROJECTS } from "@/content/projects";
import { breadcrumbJsonLd, graph, pageMetadata, profilePageJsonLd } from "@/lib/seo";
import { PortraitFrame } from "./_components/PortraitFrame";

export const metadata: Metadata = pageMetadata({
  title: "About Md Warish — Full-Stack Developer in Delhi NCR",
  absoluteTitle: true,
  description:
    "Md Warish is a full-stack developer in Delhi NCR who builds CRMs, web apps and business websites with Next.js, React, Node.js and PostgreSQL — from schema to deployment.",
  path: "/about",
  ogType: "profile",
});

const i = (n: number) => ({ "--i": n }) as CSSProperties;

/** Each habit gets a small line mark: look closely · rules behind a wall · small steps · a joint that can be undone. */
const PRINCIPLES = [
  {
    title: "Learn the business first",
    body: "Before any screen, I want to know who enters the data and who reads the report.",
    mark: ["M10.5 4.5a6 6 0 1 1 0 12 6 6 0 0 1 0-12Z", "M15 15l5 5"],
  },
  {
    title: "Rules live on the server",
    body: "Permissions and validation go in the API, so they hold even if someone edits a request.",
    mark: ["M12 3.5l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9v-5Z", "M9 12l2.2 2.2L15.5 10"],
  },
  {
    title: "Ship small, ship early",
    body: "A working link early finds misunderstandings while they're cheap to fix.",
    mark: ["M4 19.5h4v-4h4v-4h4v-4h4"],
  },
  {
    title: "Leave it easy to change",
    body: "Typed code, clear modules and short notes, so the next change is quick.",
    mark: ["M4 7h9v10H4Z", "M13 12h7", "M17 9l3 3-3 3"],
  },
];

export default function AboutPage() {
  const futurex = EXPERIENCE.find((e) => e.id === "futurex");
  const intern = EXPERIENCE.find((e) => e.id === "nodalxpoint");
  const crm = getProject("limra-crm");
  const expoCount = PROJECTS.filter((p) => p.category === "exhibition").length;

  // The path so far, in the order the facts give it: study → first full-stack work → current work.
  const journey = [
    { kind: "Study", title: PERSON.education.degree, where: `${PERSON.education.institution} · ${PERSON.education.period}` },
    intern ? { kind: "Internship", title: intern.role, where: intern.company, body: intern.summary } : null,
    futurex ? { kind: "Work", title: futurex.role, where: futurex.company, body: futurex.summary } : null,
    crm
      ? {
          kind: "Client project",
          title: crm.title,
          where: "Sole developer",
          body: "A full business CRM — 18 modules on Next.js, Express and PostgreSQL — that I built and keep running in production.",
          href: `/projects/${crm.slug}`,
        }
      : null,
  ].filter((x) => x !== null);

  const facts = [
    { value: "18", label: "modules in Limra CRM, from sales and billing to attendance", href: "/projects/limra-crm" },
    { value: "30", label: "Prisma models in its PostgreSQL database", href: "/projects/limra-crm" },
    { value: "19", label: "API route groups with auth, role checks and rate limiting", href: "/projects/limra-crm" },
    { value: String(expoCount), label: "live exhibition websites for trade shows in India and Nepal", href: "/projects" },
  ];

  return (
    <>
      <JsonLd data={graph(profilePageJsonLd("/about"), breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "About", path: "/about" }]))} />

      <PageHero
        id="about-title"
        variant="about"
        eyebrow="About"
        mark="About"
        lines={["I care how the business works,", <em key="e">not just the code.</em>]}
        art={<PortraitFrame />}
        artDecorative={false}
      >
        <div className="prose ab-intro enter" style={{ "--d": 460 } as CSSProperties}>
          <p>
            I&apos;m <strong>{PERSON.name}</strong>, a full-stack developer in {PERSON.region}. I build from the database up:
            schema, API, interface, then deployment.
          </p>
          <p>
            My biggest project is{" "}
            <Link href="/projects/limra-crm" className="link">
              Limra CRM
            </Link>{" "}
            — 18 modules, from sales and billing to attendance, that a multi-branch business runs on.
          </p>
          <p>At Futurex, I build the websites behind international B2B trade shows.</p>
          <p>
            I studied for a BCA at {PERSON.education.institution} ({PERSON.education.period}).
          </p>
        </div>
      </PageHero>

      <section className="section rule-top ab-journey-sec" aria-labelledby="journey-title">
        <div className="container">
          <SectionHead
            eyebrow="The path so far"
            id="journey-title"
            title={
              <>
                From a degree to <em>systems in production.</em>
              </>
            }
          />
          <ol className="journey" role="list">
            {journey.map((s, n) => (
              <li key={s.kind} className="journey__stop" data-reveal style={i(n)}>
                <span className="journey__node" aria-hidden />
                <p className="label">{s.kind}</p>
                <h3 className="journey__title">{s.title}</h3>
                <p className="journey__where">{s.where}</p>
                {"body" in s && s.body ? <p className="journey__body">{s.body}</p> : null}
                {"href" in s && s.href ? (
                  <Link href={s.href} className="arrow-link journey__link">
                    Case study <ArrowRight />
                  </Link>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section rule-top" aria-labelledby="approach-title">
        <div className="container">
          <SectionHead
            eyebrow="How I work"
            id="approach-title"
            title={
              <>
                Four <em>habits.</em>
              </>
            }
            aside={<p>What decides how I build, whatever the project.</p>}
          />
          <ul className="habits" role="list">
            {PRINCIPLES.map((p, n) => (
              <li key={p.title} className="habit" data-reveal style={i(n % 2)}>
                <svg className="habit__mark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" aria-hidden focusable={false}>
                  {p.mark.map((m, k) => (
                    <path key={m} className="sv-g" style={{ "--n": k } as CSSProperties} pathLength={1} d={m} />
                  ))}
                </svg>
                <h3 className="habit__title">{p.title}</h3>
                <p className="habit__body">{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section rule-top" aria-labelledby="fit-title">
        <div className="container">
          <SectionHead
            eyebrow="What I focus on"
            id="fit-title"
            title={
              <>
                For teams, <em>for clients.</em>
              </>
            }
          />
          <div className="ab-fit">
            <div className="ab-fit__col" data-reveal>
              <p className="label">For teams</p>
              <h3 className="ab-fit__title">What I bring</h3>
              <ul className="checklist" role="list">
                <li>I can own a feature from schema to UI to deploy.</li>
                <li>I&apos;ve modelled real rules: roles, branches, invoices, GST.</li>
                <li>I&apos;m at home in production: logs, env config, VPS, Nginx.</li>
                <li>I write accessible frontends in Next.js, React and Angular.</li>
              </ul>
              <Link href="/experience" className="arrow-link">
                Experience <ArrowRight />
              </Link>
            </div>
            <div className="ab-fit__col" data-reveal style={i(1)}>
              <p className="label">For clients</p>
              <h3 className="ab-fit__title">Working with me</h3>
              <ul className="checklist" role="list">
                <li>You talk to the person writing the code.</li>
                <li>A written scope first, a working link early.</li>
                <li>The code and handover notes are yours.</li>
                <li>English or Hindi, whichever is easier.</li>
              </ul>
              <Link href="/services" className="arrow-link">
                Services <ArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section rule-top" aria-labelledby="facts-title">
        <div className="container">
          <SectionHead
            eyebrow="From the work"
            id="facts-title"
            title={
              <>
                A few numbers, <em>all checkable.</em>
              </>
            }
            aside={<p>Counted from the Limra CRM source code and the live sites.</p>}
          />
          <ul className="facts" role="list">
            {facts.map((f, n) => (
              <li key={f.label} className="fact" data-reveal style={i(n)}>
                <Link href={f.href}>
                  <span className="fact__value">{f.value}</span>
                  <span className="fact__label">{f.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section rule-top" aria-labelledby="skills-title">
        <div className="container">
          <SectionHead
            eyebrow="Tools"
            id="skills-title"
            title={
              <>
                What I use <em>day to day.</em>
              </>
            }
            aside={<p>No skill bars. The projects show the level.</p>}
          />
          <TechStack />
        </div>
      </section>

      <nav className="next-links" aria-label="Keep reading">
        <div className="container next-links__grid">
          <Link href="/experience" className="next-link" data-reveal>
            <span className="label">Next</span>
            <span className="next-link__title">
              Where I&apos;ve <em>worked.</em>
            </span>
            <ArrowRight />
          </Link>
          <Link href="/projects" className="next-link" data-reveal style={i(1)}>
            <span className="label">Or</span>
            <span className="next-link__title">
              Live software, <em>live sites.</em>
            </span>
            <ArrowRight />
          </Link>
        </div>
      </nav>

      <CtaBand />
    </>
  );
}
