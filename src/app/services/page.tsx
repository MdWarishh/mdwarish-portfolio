import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { JsonLd } from "@/components/layout/JsonLd";
import { ProjectRefs } from "@/components/projects/ProjectRefs";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { SectionHead } from "@/components/sections/SectionHead";
import { PERSON } from "@/config/site";
import { SERVICES } from "@/content/services";
import { absoluteUrl, breadcrumbJsonLd, graph, pageMetadata } from "@/lib/seo";
import { ServiceGlyph, ServiceSpread } from "./_components/ServiceSpread";
import { ServicesArt } from "./_components/ServicesArt";
import { StackLayers } from "./_components/StackLayers";

export const metadata: Metadata = pageMetadata({
  title: "Freelance Web Developer in Delhi NCR",
  description:
    "Freelance website, web app and CRM development by Md Warish for businesses in Delhi, Noida, Gurgaon and across India — plus integrations, hosting and upkeep.",
  path: "/services",
});

/** Where the services are offered: Delhi NCR first, then the rest of India and remote clients abroad. */
const AREA_SERVED = [
  { "@type": "AdministrativeArea", name: "Delhi NCR" },
  { "@type": "City", name: "New Delhi" },
  { "@type": "City", name: "Noida" },
  { "@type": "City", name: "Gurugram" },
  { "@type": "Country", name: "India" },
];

/** Short answers to the questions clients actually ask — each one restates something already on the site. */
const FAQ = [
  {
    q: "Who do you work with?",
    a: "Businesses and teams in Delhi NCR — Delhi, Noida and Gurgaon — and clients across India and abroad, on fixed-scope projects or ongoing work.",
  },
  {
    q: "Which technologies do you build with?",
    a: "Next.js, React and TypeScript for interfaces; Node.js and Express for APIs; PostgreSQL or MongoDB for data; and deployment to a VPS with Nginx, or managed hosting.",
  },
  {
    q: "How long will my project take?",
    a: "I give you a timeline once we agree what's being built — not before. You get a short written scope first, then a working link early.",
  },
  {
    q: "Who owns the code?",
    a: "You do. The code lives in your repository and comes with handover notes, so anyone can pick it up.",
  },
  {
    q: "Can you look after a site or app after launch?",
    a: "Yes — servers, domains, SSL, dependency and security updates, and small fixes on an agreed schedule.",
  },
  {
    q: "How do we start?",
    a: "Send a few lines through the contact form or by email: what it should do and who will use it. I reply with questions or a first plan.",
  },
];

/** Client-facing working terms, as stated on the About page ("Working with me"). */
const TERMS = [
  { title: "You talk to the person writing the code.", note: "No account manager in between, from the first call to launch." },
  { title: "A written scope first, a working link early.", note: "What's in, what's out, and something you can click soon after." },
  { title: "The code and handover notes are yours.", note: "Your repo, your domain, notes anyone can pick up." },
  { title: "English or Hindi, whichever is easier.", note: "For clients in India and abroad." },
];

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }]),
          ...SERVICES.map((s) => ({
            "@type": "Service",
            name: s.title,
            description: s.lede,
            url: absoluteUrl(`/services#${s.slug}`),
            serviceType: s.title,
            provider: { "@id": `${absoluteUrl("/")}/#person`, name: PERSON.name },
            areaServed: AREA_SERVED,
          })),
          {
            "@type": "FAQPage",
            mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          },
        )}
      />

      <PageHero
        id="services-title"
        variant="services"
        eyebrow="Services"
        mark="Services"
        lines={[
          "What I can build",
          <em key="e">for you.</em>,
        ]}
        art={<ServicesArt />}
      >
        <p className="lede enter" style={{ "--d": 460 } as CSSProperties}>
          Fixed-scope projects or ongoing work, for businesses in Delhi, Noida and Gurgaon and clients across India and
          abroad. Pick what&apos;s closest — we&apos;ll shape the rest together.
        </p>
        <nav aria-label="Services on this page" className="sv-index enter" style={{ "--d": 600 } as CSSProperties}>
          <ul role="list">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <a href={`#${s.slug}`}>
                  <ServiceGlyph slug={s.slug} className="sv-glyph--sm" />
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      <section className="sv-list" aria-label="Services">
        <div className="container">
          {SERVICES.map((s) => (
            <ServiceSpread key={s.slug} service={s} />
          ))}
        </div>
      </section>

      <section className="section rule-top" aria-labelledby="terms-title">
        <div className="container">
          <SectionHead
            eyebrow="Approach"
            id="terms-title"
            title={
              <>
                Working <em>with me.</em>
              </>
            }
            aside={<p>The same terms on a one-page site or a multi-branch system.</p>}
          />
          <ul className="terms" role="list">
            {TERMS.map((t, n) => (
              <li key={t.title} className="term" data-reveal style={{ "--i": n } as CSSProperties}>
                <svg className="term__mark" viewBox="0 0 40 12" aria-hidden focusable={false}>
                  <path d="M0 6 H28" pathLength={1} />
                  <circle cx="34" cy="6" r="3" />
                </svg>
                <p className="term__title">{t.title}</p>
                <p className="term__note">{t.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section rule-top" aria-labelledby="stack-title">
        <div className="container">
          <SectionHead
            eyebrow="Engineering"
            id="stack-title"
            title={
              <>
                The stack, <em>layer by layer.</em>
              </>
            }
            aside={<p>One person across all of it — interface, API, data and the server it runs on.</p>}
          />
          <StackLayers />
        </div>
      </section>

      <section className="section rule-top flow" aria-labelledby="process-title">
        <div className="container">
          <SectionHead
            eyebrow="Process"
            id="process-title"
            title={
              <>
                How a project <em>runs.</em>
              </>
            }
            aside={<p>I give you a timeline once we agree what&apos;s being built — not before.</p>}
          />
          <ProcessSteps glyphs />
        </div>
      </section>

      <section className="section rule-top" aria-labelledby="proof-title">
        <div className="container">
          <SectionHead
            eyebrow="In production"
            id="proof-title"
            title={
              <>
                Built with these <em>services.</em>
              </>
            }
            aside={<p>A CRM, a company website and an exhibition site — all live.</p>}
          />
          <ProjectRefs slugs={["limra-crm", "futurex-group-corporate-website", "nepal-wood-international-expo"]} />
        </div>
      </section>

      <section className="section rule-top" aria-labelledby="faq-title">
        <div className="container">
          <SectionHead
            eyebrow="Questions"
            id="faq-title"
            title={
              <>
                Before you <em>get in touch.</em>
              </>
            }
          />
          <dl className="faq">
            {FAQ.map((f, n) => (
              <div key={f.q} className="faq__item" data-reveal style={{ "--i": n % 2 } as CSSProperties}>
                <dt>{f.q}</dt>
                <dd>{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <CtaBand secondary={{ label: "See the work first", href: "/projects" }} />
    </>
  );
}
