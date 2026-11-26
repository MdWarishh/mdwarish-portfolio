import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowUpRight } from "@/components/ui/Icons";
import { CATEGORY_LABELS, getProject } from "@/content/projects";

/**
 * A short strip of real projects (cover screenshot, kind, title) linking to their case studies.
 * Used on Services, About and Experience as "the proof" for what the page claims.
 */
export function ProjectRefs({ slugs, headingLevel = 3 }: { slugs: string[]; headingLevel?: 2 | 3 }) {
  const projects = slugs.map((s) => getProject(s)).filter((p) => p !== undefined);
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <ul className="prefs" role="list">
      {projects.map((p, i) => {
        const cover = p.gallery[0];
        return (
          <li key={p.slug} className="pref" data-reveal style={{ "--i": i } as CSSProperties}>
            <span className="pref__img" aria-hidden>
              <Image src={cover.src} alt="" width={cover.width} height={cover.height} sizes="(min-width: 900px) 30vw, 90vw" />
            </span>
            <p className="label">{CATEGORY_LABELS[p.category]}</p>
            <Heading className="pref__title">
              <Link href={`/projects/${p.slug}`}>
                {p.title} <ArrowUpRight />
              </Link>
            </Heading>
            <p className="pref__sum">{p.summary}</p>
          </li>
        );
      })}
    </ul>
  );
}
