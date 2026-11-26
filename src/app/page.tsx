import type { Metadata } from "next";
import Link from "next/link";
import { ProjectShowcase } from "@/components/projects/ProjectShowcase";
import { CtaBand } from "@/components/sections/CtaBand";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { Eyebrow, SectionHead } from "@/components/sections/SectionHead";
import { ServicesList } from "@/components/sections/ServicesList";
import { HeroDiagram } from "@/components/svg/HeroDiagram";
import { PageMark } from "@/components/svg/PageMark";
import { ProcessFlow } from "@/components/svg/ProcessFlow";
import { ArrowRight } from "@/components/ui/Icons";
import { PERSON, SITE } from "@/config/site";
import { getProject, PROJECTS } from "@/content/projects";
import { pageMetadata } from "@/lib/seo";

const TITLE = `${PERSON.name} — ${PERSON.title} in Delhi NCR`;

export const metadata: Metadata = {
  ...pageMetadata({ title: TITLE, description: SITE.description, path: "/", absoluteTitle: true }),
};

const HOME_ROWS = ["futurex-group-corporate-website", "odisha-mining-expo", "nepal-wood-international-expo"];

export default function HomePage() {
  const crm = getProject("limra-crm")!;
  const rows = HOME_ROWS.map((slug) => getProject(slug)).filter((p) => p !== undefined);

  return (
    <>
      {/* Who I am, what I build */}
      <section className="hero has-mark" aria-labelledby="hero-title">
        <PageMark variant="home" />
        <div className="container hero__grid">
          <div className="hero__intro">
            <div className="enter">
              <Eyebrow>
                {PERSON.title} · Delhi NCR
              </Eyebrow>
            </div>
            <h1 className="display hero__title" id="hero-title">
              <span className="line">
                <span className="line__in" style={{ ["--d" as string]: 120 }}>
                  I build software
                </span>
              </span>
              <span className="line">
                <span className="line__in" style={{ ["--d" as string]: 230 }}>
                  that runs <em>real businesses.</em>
                </span>
              </span>
            </h1>
            <p className="lede enter" style={{ ["--d" as string]: 520 }}>
              I&apos;m Md Warish, a full-stack software engineer. I build websites, web applications and CRM systems end
              to end — the interface, the API, the database and the server they run on.
            </p>
            <div className="actions enter" style={{ ["--d" as string]: 640 }}>
              <Link href="/contact?intent=freelance" className="btn btn--accent">
                Discuss a Project <ArrowRight />
              </Link>
              <Link href="/projects" className="btn btn--ghost">
                Explore My Work
              </Link>
            </div>
            <p className="hero__meta enter" style={{ ["--d" as string]: 740 }}>
              <span>
                <span className="status-dot" aria-hidden />
                {PERSON.availability}.
              </span>
            </p>
          </div>
          <HeroDiagram />
        </div>
      </section>

      {/* Best work */}
      <ProjectShowcase feature={crm} projects={rows} total={PROJECTS.length} />

      {/* Services overview */}
      <section className="section rule-top svc" aria-labelledby="services-title">
        <div className="svc-mark" aria-hidden data-ambient>
          <span className="svc-mark__text" data-reveal>
            Services
          </span>
        </div>
        <div className="container">
          <SectionHead
            eyebrow="What I can build for you"
            id="services-title"
            title={
              <>
                From a website to <em>a whole system.</em>
              </>
            }
            aside={<p>For clients in India and abroad. Fixed scope or ongoing.</p>}
          />
          <ServicesList />
        </div>
      </section>

      {/* How I work */}
      <section className="section rule-top flow" aria-labelledby="process-title">
        <div className="flow-mark" aria-hidden data-ambient>
          <span className="flow-mark__text" data-reveal>
            How I work
          </span>
        </div>
        <ProcessFlow />
        <div className="container">
          <SectionHead
            eyebrow="How I work"
            id="process-title"
            title={
              <>
                Four steps, <em>no surprises.</em>
              </>
            }
            aside={<p>You talk to the person writing the code, the whole way through.</p>}
          />
          <ProcessSteps glyphs />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
