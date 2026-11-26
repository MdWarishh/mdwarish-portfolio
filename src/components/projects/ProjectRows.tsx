import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight } from "@/components/ui/Icons";
import { CATEGORY_LABELS } from "@/content/projects";
import type { Project } from "@/types/content";

/** Alternating image/text rows — used instead of a grid of identical cards. */
export function ProjectRows({ projects, start = 1, headingLevel = 3 }: { projects: Project[]; start?: number; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <ol className="zz-list" role="list">
      {projects.map((p, i) => {
        const cover = p.gallery[0];
        return (
          <li key={p.slug} className="zz" data-reveal style={{ "--i": 0 } as CSSProperties}>
            <div className="zz__media" aria-hidden>
              <Image src={cover.src} alt="" width={cover.width} height={cover.height} sizes="(min-width: 860px) 55vw, 100vw" />
            </div>
            <div className="zz__body">
              <span className="zz__index" aria-hidden>
                {String(start + i).padStart(2, "0")}
              </span>
              <p className="label">{CATEGORY_LABELS[p.category]} · {p.sector}</p>
              <Heading className="zz__title">
                <Link href={`/projects/${p.slug}`}>{p.title}</Link>
              </Heading>
              <p className="zz__summary">{p.summary}</p>
              <span className="arrow-link">
                Case study <ArrowRight />
              </span>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
