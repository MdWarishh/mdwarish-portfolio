import type { CSSProperties, ReactNode } from "react";
import { Eyebrow } from "@/components/sections/SectionHead";

const d = (ms: number) => ({ "--d": ms }) as CSSProperties;

/**
 * Opening section shared by Services, About, Experience, Contact and Resume. Same language as the
 * Work page opening: an oversized watermark that fades in and drifts, a headline whose lines lift
 * out of a mask (shared .line__in), the supporting copy rising in (.enter), and a page-specific
 * SVG composition beside it. All entrance motion is the shared CSS; reduced motion softens it to fades.
 */
export function PageHero({
  id,
  eyebrow,
  lines,
  mark,
  art,
  variant,
  artDecorative = true,
  children,
}: {
  id: string;
  eyebrow: string;
  lines: ReactNode[];
  mark: string;
  art?: ReactNode;
  variant: string;
  /** false when the art carries real content (e.g. the About portrait with its alt text). */
  artDecorative?: boolean;
  children?: ReactNode;
}) {
  return (
    <section className={`ph ph--${variant}`} aria-labelledby={id}>
      <div className="ph-mark" aria-hidden data-ambient>
        <span className="ph-mark__text enter-fade" style={d(200)}>
          {mark}
        </span>
      </div>
      <div className={`container ph__grid${art ? "" : " ph__grid--solo"}`}>
        <div className="ph__intro">
          <div className="enter">
            <Eyebrow>{eyebrow}</Eyebrow>
          </div>
          <h1 className="h1 ph__title" id={id}>
            {lines.map((line, i) => (
              <span key={i} className="ph-line">
                <span className="line__in" style={d(120 + i * 110)}>
                  {line}
                </span>
              </span>
            ))}
          </h1>
          {children}
        </div>
        {art ? (
          <div className="ph__art enter-fade" style={d(250)} aria-hidden={artDecorative || undefined}>
            {art}
          </div>
        ) : null}
      </div>
    </section>
  );
}
