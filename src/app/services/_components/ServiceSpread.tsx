import Link from "next/link";
import type { CSSProperties } from "react";
import { SERVICE_GLYPHS } from "@/components/sections/ServicesList";
import { ArrowRight } from "@/components/ui/Icons";
import type { Service } from "@/types/content";

const i = (n: number) => ({ "--i": n }) as CSSProperties;

/** The service's line glyph at display size; strokes draw when the spread is revealed. */
export function ServiceGlyph({ slug, className = "" }: { slug: string; className?: string }) {
  const glyph = SERVICE_GLYPHS[slug];
  if (!glyph) return null;
  return (
    <svg className={`sv-glyph ${className}`} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={1.1} strokeLinecap="round" strokeLinejoin="round" aria-hidden focusable={false}>
      {glyph.paths.map((p, k) => (
        <path key={p} className="sv-g" style={{ "--n": k } as CSSProperties} pathLength={1} d={p} />
      ))}
      <circle className="sv-g-dot" cx={glyph.dot[0]} cy={glyph.dot[1]} r={1.5} />
    </svg>
  );
}

/**
 * One service as an editorial spread: glyph, title, one line and a direct ask on the left; the
 * problem it solves as a pull quote, then what's included, who it suits and what you get.
 * The section id is the service slug so /services#slug links from the home page and footer land here.
 */
export function ServiceSpread({ service }: { service: Service }) {
  return (
    <article id={service.slug} className="sv" aria-labelledby={`${service.slug}-title`}>
      <div className="sv__head" data-reveal>
        <span className="sv__mark">
          <ServiceGlyph slug={service.slug} />
        </span>
        <h2 className="sv__title" id={`${service.slug}-title`}>
          {service.title}
        </h2>
        <p className="sv__lede">{service.lede}</p>
        <Link href={`/contact?intent=freelance&service=${service.slug}`} className="sv__ask">
          Ask about this <ArrowRight />
        </Link>
      </div>
      <div className="sv__body">
        <blockquote className="sv__problem" data-reveal style={i(1)}>
          <p className="sv-k">The problem</p>
          <p className="sv__quote">{service.problem}</p>
        </blockquote>
        <div className="sv__cols">
          <div data-reveal style={i(2)}>
            <p className="sv-k">Includes</p>
            <ul className="checklist" role="list">
              {service.includes.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
          <div data-reveal style={i(3)}>
            <p className="sv-k">Good fit if</p>
            <p className="sv__fit">{service.forWho}</p>
            <p className="sv-k sv-k--gap">You get</p>
            <ul className="sv__get" role="list">
              {service.deliverables.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}
