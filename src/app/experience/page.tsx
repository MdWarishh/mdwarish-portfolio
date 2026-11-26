import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { JsonLd } from "@/components/layout/JsonLd";
import { ProjectRefs } from "@/components/projects/ProjectRefs";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHead } from "@/components/sections/SectionHead";
import { TechStack } from "@/components/sections/TechStack";
import { PERSON } from "@/config/site";
import { EXPERIENCE } from "@/content/experience";
import { getProject } from "@/content/projects";
import { breadcrumbJsonLd, graph, pageMetadata } from "@/lib/seo";
import { BranchArt } from "./_components/BranchArt";
import { Timeline } from "./_components/Timeline";

export const metadata: Metadata = pageMetadata({
  title: "Experience — Full-Stack Developer",
  description:
    "Experience of Md Warish, full-stack developer: development and solutions architecture at Futurex Trade Fair & Events, an internship at NodalXPoint, and Limra CRM.",
  path: "/experience",
});

const i = (n: number) => ({ "--i": n }) as CSSProperties;

export default function ExperiencePage() {
  const futurex = EXPERIENCE.find((e) => e.id === "futurex");
  const crm = getProject("limra-crm");
  // Areas of contribution — each one quotes the line it comes from.
  const areas = [
    { title: "Data modelling", quote: crm?.contribution[0], source: "Limra CRM", href: "/projects/limra-crm" },
    { title: "APIs and security", quote: crm?.contribution[1], source: "Limra CRM", href: "/projects/limra-crm" },
    { title: "Websites people find", quote: futurex?.highlights[2], source: "Futurex", href: "/projects/futurex-group-corporate-website" },
    { title: "Structure and deployment", quote: futurex?.highlights[3], source: "Futurex", href: "/projects/odisha-mining-expo" },
  ].filter((a): a is { title: string; quote: string; source: string; href: string } => Boolean(a.quote));

  return (
    <>
      <JsonLd data={graph(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Experience", path: "/experience" }]))} />

      <PageHero
        id="experience-title"
        variant="experience"
        eyebrow="Experience"
        mark="Experience"
        lines={["Where I’ve", <em key="e">worked.</em>]}
        art={<BranchArt />}
      >
        <p className="lede enter" style={{ "--d": 460 } as CSSProperties}>
          Websites for international B2B trade shows, a business CRM in production, and the internship where I started
          working across the whole stack.
        </p>
        <p className="ph__meta enter" style={{ "--d": 580 } as CSSProperties}>
          <span className="status-dot" aria-hidden />
          {PERSON.availability}. Want it on one page? See the{" "}
          <Link href="/resume" className="link">
            resume
          </Link>
          .
        </p>
      </PageHero>

      <section className="section rule-top tl-sec" aria-labelledby="roles-title">
        <div className="container">
          <SectionHead
            eyebrow="Timeline"
            id="roles-title"
            title={
              <>
                Roles, projects <em>and study.</em>
              </>
            }
            aside={<p>Each role links to the work it produced.</p>}
          />
          <Timeline />
        </div>
      </section>

      <section className="section rule-top" aria-labelledby="areas-title">
        <div className="container">
          <SectionHead
            eyebrow="Contribution"
            id="areas-title"
            title={
              <>
                Where I <em>add the most.</em>
              </>
            }
            aside={<p>Each area quotes the work it comes from.</p>}
          />
          <ul className="areas" role="list">
            {areas.map((a, n) => (
              <li key={a.title} className="area" data-reveal style={i(n)}>
                <h3 className="area__title">{a.title}</h3>
                <p className="area__quote">{a.quote}</p>
                <Link href={a.href} className="area__src">
                  {a.source}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section rule-top" aria-labelledby="skills-title">
        <div className="container">
          <SectionHead
            eyebrow="Expertise"
            id="skills-title"
            title={
              <>
                Technical <em>skills.</em>
              </>
            }
          />
          <TechStack />
        </div>
      </section>

      <section className="section rule-top" aria-labelledby="refs-title">
        <div className="container">
          <SectionHead
            eyebrow="Selected work"
            id="refs-title"
            title={
              <>
                What these roles <em>shipped.</em>
              </>
            }
          />
          <ProjectRefs slugs={["limra-crm", "odisha-mining-expo", "nepal-electric-power-lights-expo"]} />
        </div>
      </section>

      <CtaBand
        title={
          <>
            Hiring a full-stack developer? <em>Let&apos;s talk.</em>
          </>
        }
        body="Tell me about the role, the team and the stack. I'm open to full-time engineering roles."
        secondary={{ label: "View resume", href: "/resume" }}
      />
    </>
  );
}
