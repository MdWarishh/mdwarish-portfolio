import type { CSSProperties } from "react";

/**
 * Background for the closing CTA: many lines arriving from the left and converging on one point —
 * messages coming in, all read by one person. Quiet rings sit around that point and one ripple
 * slowly widens from it; two faint traces travel in along the lines. The lines draw when the band is
 * revealed. Decorative only; paused offscreen (data-ambient), still with reduced motion.
 */
const F = { x: 640, y: 250 };
const LINES = [30, 100, 175, 250, 325, 400, 470];

const curve = (y: number) => `M-20 ${y} C 250 ${y}, 420 ${F.y}, ${F.x} ${F.y}`;

export function CtaArt() {
  return (
    <div className="cta-art" aria-hidden data-ambient>
      <svg viewBox="0 0 800 500" preserveAspectRatio="xMaxYMid slice" fill="none" focusable={false}>
        {LINES.map((y, n) => (
          <path key={y} className="cta-art__line" style={{ "--n": n } as CSSProperties} pathLength={1} d={curve(y)} />
        ))}
        <path className="cta-art__trace" pathLength={1} d={curve(100)} />
        <path className="cta-art__trace cta-art__trace--b" pathLength={1} d={curve(400)} />
        {[44, 92, 150].map((r, n) => (
          <circle key={r} className="cta-art__ring" style={{ "--n": n } as CSSProperties} cx={F.x} cy={F.y} r={r} pathLength={1} />
        ))}
        <circle className="cta-art__ripple" cx={F.x} cy={F.y} r={44} />
        <circle className="cta-art__node" cx={F.x} cy={F.y} r={5} />
      </svg>
    </div>
  );
}
