import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { ContactForm } from "@/components/forms/ContactForm";
import { JsonLd } from "@/components/layout/JsonLd";
import { PageHero } from "@/components/sections/PageHero";
import { PERSON } from "@/config/site";
import { breadcrumbJsonLd, graph, pageMetadata } from "@/lib/seo";
import { ContactArt, GitHubIcon, LinkedInIcon, MailIcon, PinIcon } from "./_components/ContactArt";

export const metadata: Metadata = pageMetadata({
  title: "Contact — Hire a Full-Stack Developer in Delhi NCR",
  description:
    "Contact Md Warish about a freelance website, web app or CRM project, or a full-time software engineering role. Based in Delhi NCR, working with clients in India and abroad.",
  path: "/contact",
});

const d = (ms: number) => ({ "--d": ms }) as CSSProperties;

export default function ContactPage() {
  const direct = [
    { icon: <MailIcon />, label: "Email", value: PERSON.email, href: `mailto:${PERSON.email}` },
    { icon: <LinkedInIcon />, label: "LinkedIn", value: "linkedin.com/in/md-warish", href: PERSON.linkedin, external: true },
    { icon: <GitHubIcon />, label: "GitHub", value: `github.com/${PERSON.githubHandle}`, href: PERSON.github, external: true },
  ];

  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        )}
      />

      <PageHero id="contact-title" variant="contact" eyebrow="Contact" mark="Contact" lines={["Let’s", <em key="e">talk.</em>]} art={<ContactArt />}>
        <p className="lede enter" style={d(460)}>
          A project to build or a role to fill — send a few lines. I read every message myself and reply with questions
          or a first plan.
        </p>
      </PageHero>

      <section className="ct" aria-label="Get in touch">
        <div className="container ct__grid">
          <aside className="ct__side enter" style={d(520)} aria-label="Direct contact">
            <div className="ct__cases">
              <p>
                <strong>Got a project?</strong> Tell me what it should do and who will use it. A rough idea is fine.
              </p>
              <p>
                <strong>Hiring?</strong> Tell me about the role and the team.
              </p>
            </div>
            <ul className="ct-direct" role="list">
              {direct.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    className="ct-direct__link"
                    {...(c.external ? { target: "_blank", rel: "noopener noreferrer me" } : {})}
                  >
                    <span className="ct-direct__icon">{c.icon}</span>
                    <span className="ct-direct__text">
                      <span className="ct-direct__label">{c.label}</span>
                      <span className="ct-direct__value">{c.value}</span>
                    </span>
                  </a>
                </li>
              ))}
              <li>
                <span className="ct-direct__link ct-direct__link--static">
                  <span className="ct-direct__icon">
                    <PinIcon />
                  </span>
                  <span className="ct-direct__text">
                    <span className="ct-direct__label">Based in</span>
                    <span className="ct-direct__value">{PERSON.region} — clients in Delhi, Noida, Gurgaon, across India and abroad</span>
                  </span>
                </span>
              </li>
            </ul>
            <p className="ct__status">
              <span className="status-dot" aria-hidden />
              {PERSON.availability}
            </p>
          </aside>
          <div className="ct__panel enter" style={d(620)}>
            <ContactForm fallbackEmail={PERSON.email} />
          </div>
        </div>
      </section>
    </>
  );
}
