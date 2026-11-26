import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { ArrowRight } from "@/components/ui/Icons";
import { SERVICES } from "@/content/services";
import type { Service } from "@/types/content";

/**
 * Home-page overview of services: every service (title + one line) grouped by scale, from what
 * visitors see to what keeps it all running — "from a website to a whole system".
 * Each service has a small line glyph that draws itself when its row scrolls into view; a hairline
 * spine runs beside each group and fills with the accent as the group is revealed. CSS only.
 */
const i = (n: number) => ({ "--i": n }) as CSSProperties;

const GROUPS: { kicker: string; title: ReactNode; slugs: string[] }[] = [
  {
    kicker: "What visitors see",
    title: (
      <>
        Sites &amp; <em>stores</em>
      </>
    ),
    slugs: ["custom-websites", "ecommerce", "redesign-modernisation"],
  },
  {
    kicker: "What your team runs on",
    title: (
      <>
        Systems &amp; <em>portals</em>
      </>
    ),
    slugs: ["full-stack-applications", "crm-business-systems", "b2b-portals"],
  },
  {
    kicker: "What keeps it all working",
    title: (
      <>
        Connected &amp; <em>kept live</em>
      </>
    ),
    slugs: ["api-integrations", "deployment-maintenance"],
  },
];

/** 32×32 line glyphs, one per service. Paths draw (pathLength=1); the dot is the single accent. */
export const SERVICE_GLYPHS: Record<string, { paths: string[]; dot: [number, number] }> = {
  // A browser window with a page inside.
  "custom-websites": {
    paths: ["M6 7h20a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z", "M4 12h24", "M8 17h11", "M8 21h7"],
    dot: [7.5, 9.5],
  },
  // A shopping bag.
  ecommerce: {
    paths: ["M7.5 11h17l-1.6 15.5H9.1Z", "M12 11V9a4 4 0 0 1 8 0v2"],
    dot: [16, 18.5],
  },
  // Old page → new page.
  "redesign-modernisation": {
    paths: ["M4 5h12v10H4Z", "M15 15h13v12H15Z", "M8 17v4a3 3 0 0 0 3 3h2", "M11.5 21.5l2 2.5-2 2.5"],
    dot: [21.5, 21],
  },
  // Interface, API and data as stacked planes (the hero's language).
  "full-stack-applications": {
    paths: ["M16 4.5l11 5-11 5-11-5Z", "M5 15.5l11 5 11-5", "M5 21.5l11 5 11-5"],
    dot: [16, 9.5],
  },
  // A table of records.
  "crm-business-systems": {
    paths: ["M7 6h18a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z", "M5 12h22", "M5 19h22", "M12 6v20"],
    dot: [19.5, 15.5],
  },
  // An event badge on a lanyard.
  "b2b-portals": {
    paths: ["M12 3.5l4 5.5 4-5.5", "M10 9h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2V11a2 2 0 0 1 2-2Z", "M16 13.5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z", "M12 23.5h8"],
    dot: [16, 16.5],
  },
  // Two tools joined by a line.
  "api-integrations": {
    paths: ["M8 12a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z", "M24 12a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z", "M12 16h8", "M8 12V7h16v5"],
    dot: [16, 16],
  },
  // A server, two units.
  "deployment-maintenance": {
    paths: ["M7.5 5h17A1.5 1.5 0 0 1 26 6.5v6a1.5 1.5 0 0 1-1.5 1.5h-17A1.5 1.5 0 0 1 6 12.5v-6A1.5 1.5 0 0 1 7.5 5Z", "M7.5 18h17a1.5 1.5 0 0 1 1.5 1.5v6a1.5 1.5 0 0 1-1.5 1.5h-17A1.5 1.5 0 0 1 6 25.5v-6A1.5 1.5 0 0 1 7.5 18Z", "M16 14v4", "M10 9.5h6", "M10 22.5h6"],
    dot: [21.5, 9.5],
  },
};

const GLYPHS = SERVICE_GLYPHS;

function Glyph({ slug }: { slug: string }) {
  const glyph = GLYPHS[slug];
  if (!glyph) return <span className="svc-row__glyph" aria-hidden />;
  return (
    <span className="svc-row__glyph" aria-hidden>
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={1.25} strokeLinecap="round" strokeLinejoin="round" focusable={false}>
        {glyph.paths.map((p, n) => (
          <path key={p} className="svc-g" style={{ "--n": n } as CSSProperties} pathLength={1} d={p} />
        ))}
        <circle className="svc-g-dot" cx={glyph.dot[0]} cy={glyph.dot[1]} r={1.6} />
      </svg>
    </span>
  );
}

function Row({ service, index }: { service: Service; index: number }) {
  return (
    <li data-reveal style={i(index + 1)}>
      <Link href={`/services#${service.slug}`} className="svc-row">
        <Glyph slug={service.slug} />
        <span className="svc-row__title">{service.title}</span>
        <span className="svc-row__line">{service.lede}</span>
        <ArrowRight />
      </Link>
    </li>
  );
}

export function ServicesList() {
  const bySlug = new Map(SERVICES.map((s) => [s.slug, s]));
  const grouped = new Set(GROUPS.flatMap((g) => g.slugs));
  // Anything added to SERVICES later but not placed in a group still shows, in the last group.
  const leftovers = SERVICES.filter((s) => !grouped.has(s.slug));

  return (
    <div className="svc-groups">
      {GROUPS.map((group, gi) => {
        const items = group.slugs.map((slug) => bySlug.get(slug)).filter((s) => s !== undefined);
        if (gi === GROUPS.length - 1) items.push(...leftovers);
        if (!items.length) return null;
        return (
          <div key={group.kicker} className="svc-group" role="group" aria-label={group.kicker}>
            <div className="svc-group__head" data-reveal>
              <p className="label">{group.kicker}</p>
              <h3 className="svc-group__title">{group.title}</h3>
            </div>
            <ul className="svc-rows" role="list">
              {items.map((s, n) => (
                <Row key={s.slug} service={s} index={n} />
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
