import type { CSSProperties } from "react";
import { PROCESS } from "@/content/services";

/**
 * How I work — four steps on one connecting line.
 * Phones: vertical; each step lights up as it scrolls into view and the most recent one is highlighted.
 * Desktop: horizontal; the steps light up left to right when the row enters the viewport, and
 * hovering or focusing a step moves the highlight.
 * Behaviour lives in MotionRuntime (IntersectionObserver); the line grows with transform only.
 *
 * `glyphs` (home page): each node shows a small line drawing of the step instead of its number;
 * the order is still carried by the <ol> and the connecting line.
 */
const GLYPHS: string[][] = [
  // Understand — looking closely.
  ["M10.5 4.5a6 6 0 1 1 0 12 6 6 0 0 1 0-12Z", "M15 15l5 5"],
  // Agree the scope — a written plan, signed off.
  ["M6.5 3.5h7.5l3.5 3.5v13.5h-11Z", "M9 10h6", "M9.5 15l1.8 1.8 3.7-3.7"],
  // Build in steps — rising in small increments.
  ["M4 19.5h4v-4h4v-4h4v-4h4"],
  // Launch and hand over — out into the world.
  ["M14 4.5h5.5V10", "M19.5 4.5l-8 8", "M17 13.5v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V8.5a1 1 0 0 1 1-1h5"],
];

function StepGlyph({ index }: { index: number }) {
  const paths = GLYPHS[index];
  if (!paths) return <>{String(index + 1).padStart(2, "0")}</>;
  return (
    <svg className="process__glyph" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" focusable={false}>
      {paths.map((d, n) => (
        <path key={d} className="pg" style={{ "--n": n } as CSSProperties} pathLength={1} d={d} />
      ))}
    </svg>
  );
}

export function ProcessSteps({ glyphs = false }: { glyphs?: boolean }) {
  return (
    <ol className="process" data-process>
      {PROCESS.map((step, i) => (
        <li key={step.title} className="process__step" style={{ "--i": i } as CSSProperties}>
          <div className="process__marker" aria-hidden>
            <span className="process__node">{glyphs ? <StepGlyph index={i} /> : String(i + 1).padStart(2, "0")}</span>
            <span className="process__track" />
            <span className="process__fill" />
          </div>
          <div className="process__body">
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
