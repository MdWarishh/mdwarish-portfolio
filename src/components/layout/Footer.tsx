import Link from "next/link";
import type { CSSProperties, SVGProps } from "react";
import { CONTACT_CTA, NAV_ITEMS, PERSON } from "@/config/site";
import { SERVICES } from "@/content/services";
import { LogoMark } from "@/components/svg/Logo";
import { ArrowRight, ArrowUpRight } from "@/components/ui/Icons";

const i = (n: number) => ({ "--i": n }) as CSSProperties;

/** Footer navigation: Home, the primary pages (Work shown as "Projects"), then Contact. */
const PAGES = [
  { label: "Home", href: "/" },
  ...NAV_ITEMS.map((item) => (item.href === "/projects" ? { ...item, label: "Projects" } : item)),
  { label: "Contact", href: "/contact" },
];

const glyph = {
  viewBox: "0 0 24 24",
  width: 18,
  height: 18,
  "aria-hidden": true,
  focusable: false,
} as const;

function GitHubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...glyph} fill="currentColor" {...props}>
      <path d="M12 2.5a9.5 9.5 0 0 0-3 18.52c.47.09.65-.2.65-.46v-1.6c-2.64.57-3.2-1.27-3.2-1.27-.43-1.1-1.05-1.39-1.05-1.39-.86-.59.07-.58.07-.58.95.07 1.45.98 1.45.98.85 1.45 2.22 1.03 2.76.79.09-.61.33-1.03.6-1.27-2.1-.24-4.31-1.05-4.31-4.68 0-1.03.37-1.88.98-2.54-.1-.24-.43-1.2.09-2.5 0 0 .8-.26 2.6.97a9 9 0 0 1 4.74 0c1.8-1.23 2.6-.97 2.6-.97.52 1.3.19 2.26.09 2.5.61.66.98 1.51.98 2.54 0 3.64-2.22 4.44-4.33 4.67.34.3.64.88.64 1.77v2.63c0 .26.17.56.66.46A9.5 9.5 0 0 0 12 2.5Z" />
    </svg>
  );
}

function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...glyph} fill="currentColor" {...props}>
      <path d="M5.3 8.6h3v9.9h-3Zm1.5-4.8a1.73 1.73 0 1 1 0 3.46 1.73 1.73 0 0 1 0-3.46ZM10.2 8.6h2.86v1.35h.04c.4-.75 1.38-1.55 2.84-1.55 3.03 0 3.6 2 3.6 4.6v5.5h-3v-4.88c0-1.16-.02-2.66-1.62-2.66-1.62 0-1.87 1.27-1.87 2.58v4.96h-2.85Z" />
    </svg>
  );
}

function MailGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...glyph} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4.5 6.5h15a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1Z" />
      <path d="m4 7.5 8 6 8-6" />
    </svg>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-grid">
          {/* 1 — Brand */}
          <div className="footer-intro" data-reveal style={i(0)}>
            <Link href="/" className="footer-brand" aria-label={`${PERSON.name} — home`}>
              <LogoMark className="footer-brand__mark" />
            </Link>
            <p className="footer-title">
              Need it to <em>work,</em> not just look good?
            </p>
            <p className="footer-desc">
              {PERSON.title} in Delhi NCR, building business web applications, CRM systems, B2B platforms and
              production websites.
            </p>
            <ul className="footer-social" role="list" aria-label="Profiles">
              <li>
                <a href={PERSON.github} target="_blank" rel="noopener noreferrer me" aria-label="GitHub (opens in a new tab)">
                  <GitHubIcon />
                </a>
              </li>
              <li>
                <a href={PERSON.linkedin} target="_blank" rel="noopener noreferrer me" aria-label="LinkedIn (opens in a new tab)">
                  <LinkedInIcon />
                </a>
              </li>
              <li>
                <a href={`mailto:${PERSON.email}`} aria-label={`Write to ${PERSON.email}`}>
                  <MailGlyph />
                </a>
              </li>
            </ul>
          </div>

          {/* 2 — Pages */}
          <nav aria-label="Footer" className="footer-col" data-reveal style={i(1)}>
            <p className="label footer-label">Pages</p>
            <ul className="footer-list" role="list">
              {PAGES.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* 3 — Services */}
          <div className="footer-col" data-reveal style={i(2)}>
            <p className="label footer-label">Services</p>
            <ul className="footer-list" role="list">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services#${s.slug}`}>{s.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 4 — Connect */}
          <div className="footer-col footer-connect" data-reveal style={i(3)}>
            <p className="label footer-label">Connect</p>
            <ul className="footer-list" role="list">
              <li>
                <a href={`mailto:${PERSON.email}`} className="footer-email">
                  {PERSON.email}
                </a>
              </li>
              <li>
                <a href={PERSON.linkedin} target="_blank" rel="noopener noreferrer me">
                  LinkedIn <ArrowUpRight className="footer-ext" />
                </a>
              </li>
              <li>
                <a href={PERSON.github} target="_blank" rel="noopener noreferrer me">
                  GitHub <ArrowUpRight className="footer-ext" />
                </a>
              </li>
            </ul>
            <Link href={CONTACT_CTA.href} className="btn btn--sm footer-cta">
              {CONTACT_CTA.label} <ArrowRight />
            </Link>
          </div>
        </div>

        {/* Decorative oversized wordmark, set between the columns and the base line, never over them. */}
        <div className="footer-wordmark" aria-hidden="true">
          {/* SVG text with textLength: always exactly the container's width, whatever font renders it,
              so the full name — final H included — can never overflow and be clipped. */}
          <svg className="footer-wordmark__text" viewBox="0 0 1000 212" focusable="false" data-reveal>
            <text x="500" y="196" textAnchor="middle" textLength="992" lengthAdjust="spacingAndGlyphs">
              MD WARISH
            </text>
          </svg>
        </div>

        <div className="footer-base">
          <span>
            © {year} {PERSON.name}
          </span>
          <span className="footer-base__region">
            <span className="status-dot" aria-hidden />
            {PERSON.region}
          </span>
        </div>
      </div>
    </footer>
  );
}
