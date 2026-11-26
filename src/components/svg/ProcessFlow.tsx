import type { CSSProperties } from "react";

/**
 * Background for the home "How I work" section: a ribbon of hairlines rising from lower left to
 * upper right — the same direction as the four steps climbing in front of it. The lines draw in
 * when the section arrives; then one vermilion trace travels slowly along the centre line and the
 * ribbon sways very gently. Decorative only; paused offscreen (data-ambient), still with reduced motion.
 */
const RIBBON = "M-40 560 C 260 552, 420 470, 600 360 S 900 120, 1240 70";
const OFFSETS = [-36, -18, 0, 18, 36];

export function ProcessFlow() {
  return (
    <div className="flow-art" aria-hidden data-ambient>
      <svg viewBox="0 0 1200 620" preserveAspectRatio="xMidYMid slice" fill="none" focusable={false} data-reveal>
        <g className="flow-art__ribbon">
          {OFFSETS.map((y, n) => (
            <path
              key={y}
              className={`flow-art__line${y === 0 ? " flow-art__line--core" : ""}`}
              style={{ "--n": n } as CSSProperties}
              transform={`translate(${y * -0.6} ${y})`}
              pathLength={1}
              d={RIBBON}
            />
          ))}
          <path className="flow-art__trace" pathLength={1} d={RIBBON} />
        </g>
      </svg>
    </div>
  );
}
