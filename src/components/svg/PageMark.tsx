import type { CSSProperties } from "react";

/**
 * Background linework that replaces the old grid. One quiet drawing per page,
 * each echoing the work: a request path, contour rings, a stepped circuit, a timeline.
 * Hairline strokes in --deco, at most one vermilion node. Draws once, then stays still.
 */
export type PageMarkVariant = "home" | "projects" | "case" | "services" | "about" | "contact";

const d = (ms: number) => ({ "--d": ms }) as CSSProperties;

export function PageMark({ variant }: { variant: PageMarkVariant }) {
  const common = {
    className: `page-mark page-mark--${variant}`,
    fill: "none",
    "aria-hidden": true,
    focusable: false,
    stroke: "currentColor",
    strokeWidth: 1,
    vectorEffect: "non-scaling-stroke",
  } as const;

  switch (variant) {
    case "home":
      // One long request path sweeping from the browser (top right) down past the diagram.
      // Once drawn, faint traces of light travel slowly along the same lines (paused offscreen).
      return (
        <svg {...common} viewBox="0 0 1100 760" data-ambient>
          <path className="draw" style={d(200)} pathLength={1} d="M1090 40 C 880 60, 820 200, 640 230 S 330 260, 250 420 S 120 690, -20 740" />
          <path className="draw" style={d(450)} pathLength={1} d="M1090 110 C 900 140, 860 260, 700 300 S 420 360, 360 520" />
          <path className="pm-trace" pathLength={1} d="M1090 40 C 880 60, 820 200, 640 230 S 330 260, 250 420 S 120 690, -20 740" />
          <path className="pm-trace pm-trace--b" pathLength={1} d="M1090 110 C 900 140, 860 260, 700 300 S 420 360, 360 520" />
          <circle className="pm-node" cx="640" cy="230" r="4" />
        </svg>
      );
    case "projects":
    case "case":
      // Off-canvas contour rings — "layers" of a system.
      return (
        <svg {...common} viewBox="0 0 760 760">
          {[120, 190, 260, 330, 400].map((r, i) => (
            <ellipse key={r} className="draw" style={d(150 + i * 120)} pathLength={1} cx="440" cy="300" rx={r * 1.15} ry={r} transform="rotate(-14 440 300)" />
          ))}
          <circle className="pm-node" cx="440" cy="300" r="4" />
        </svg>
      );
    case "services":
      // Stepped, circuit-like line: scope → build → launch.
      return (
        <svg {...common} viewBox="0 0 620 360">
          <path className="draw" style={d(200)} pathLength={1} d="M10 300 H170 V200 H330 V110 H500 V30 H610" />
          <path className="draw" style={d(500)} pathLength={1} d="M10 330 H200 V230 H360 V140 H530 V60 H610" opacity="0.6" />
          <circle className="pm-node" cx="500" cy="30" r="4" />
        </svg>
      );
    case "about":
      // A single oversized arc — the one geometric mark on the page.
      return (
        <svg {...common} viewBox="0 0 720 720">
          <circle className="draw" style={d(200)} pathLength={1} cx="360" cy="360" r="330" />
          <circle className="draw" style={d(450)} pathLength={1} cx="360" cy="360" r="250" opacity="0.6" />
          <circle className="pm-node" cx="126" cy="127" r="4" />
        </svg>
      );
    case "contact":
      // Several lines converging on one point — messages arriving.
      return (
        <svg {...common} viewBox="0 0 820 520">
          {[60, 160, 260, 360, 460].map((y, i) => (
            <path key={y} className="draw" style={d(150 + i * 110)} pathLength={1} d={`M0 ${y} C 300 ${y}, 420 300, 640 300`} />
          ))}
          <circle className="pm-node" cx="640" cy="300" r="4" />
        </svg>
      );
  }
}
