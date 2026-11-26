import type { CSSProperties, SVGProps } from "react";

/**
 * Contact hero art — two ends of one conversation: a message leaving your side, a reply coming back
 * from mine, on two curves between the same two points. Draws on load; afterwards one trace runs
 * each way and a ring widens gently from my side (shared .pa-* classes; paused offscreen, still
 * with reduced motion).
 */
const d = (ms: number) => ({ "--d": ms }) as CSSProperties;

const OUT = "M96 196 C 200 96, 360 96, 464 170";
const BACK = "M464 206 C 360 300, 200 300, 96 222";

export function ContactArt() {
  return (
    <svg className="pa pa--contact" viewBox="0 0 560 400" fill="none" focusable={false} data-ambient>
      <path className="pa-line draw" style={d(400)} pathLength={1} d={OUT} />
      <path className="pa-soft draw" style={d(700)} pathLength={1} d={BACK} />
      <path className="pa-trace" pathLength={1} d={OUT} />
      <path className="pa-trace pa-trace--b" pathLength={1} d={BACK} />

      {/* you: a message */}
      <g className="pop" style={d(150)}>
        <circle className="pa-node" cx="72" cy="208" r="40" />
        <path className="pa-line" d="M54 194 h36 a4 4 0 0 1 4 4 v16 a4 4 0 0 1 -4 4 h-22 l-8 7 v-7 h-6 a4 4 0 0 1 -4 -4 v-16 a4 4 0 0 1 4 -4 Z" />
        <path className="pa-soft" d="M60 203 H86 M60 210 H78" />
      </g>
      <text className="pa-label pop" style={d(1200)} x="46" y="276">
        You
      </text>

      {/* me: an editor window */}
      <circle className="pa-ripple" cx="488" cy="188" r="44" />
      <g className="pop" style={d(300)}>
        <circle className="pa-node" cx="488" cy="188" r="44" />
        <rect className="pa-line" x="464" y="170" width="48" height="36" rx="4" />
        <path className="pa-soft" d="M464 179 H512 M471 188 h14 M475 195 h20 M471 201 h10" />
        <circle className="pa-key-fill" cx="469" cy="174.5" r="2" />
      </g>
      <text className="pa-label pop" style={d(1300)} x="470" y="260">
        Me
      </text>

      <circle className="pa-key-fill pop" style={d(1400)} cx="280" cy="121" r="3.5" />
      <text className="pa-label pop" style={d(1500)} x="246" y="102">
        Message
      </text>
      <text className="pa-label pop" style={d(1600)} x="258" y="300">
        Reply
      </text>
    </svg>
  );
}

const glyph = { viewBox: "0 0 24 24", width: 18, height: 18, "aria-hidden": true, focusable: false } as const;

export function MailIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...glyph} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4.5 6.5h15a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1Z" />
      <path d="m4 7.5 8 6 8-6" />
    </svg>
  );
}

export function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...glyph} fill="currentColor" {...props}>
      <path d="M5.3 8.6h3v9.9h-3Zm1.5-4.8a1.73 1.73 0 1 1 0 3.46 1.73 1.73 0 0 1 0-3.46ZM10.2 8.6h2.86v1.35h.04c.4-.75 1.38-1.55 2.84-1.55 3.03 0 3.6 2 3.6 4.6v5.5h-3v-4.88c0-1.16-.02-2.66-1.62-2.66-1.62 0-1.87 1.27-1.87 2.58v4.96h-2.85Z" />
    </svg>
  );
}

export function GitHubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...glyph} fill="currentColor" {...props}>
      <path d="M12 2.5a9.5 9.5 0 0 0-3 18.52c.47.09.65-.2.65-.46v-1.6c-2.64.57-3.2-1.27-3.2-1.27-.43-1.1-1.05-1.39-1.05-1.39-.86-.59.07-.58.07-.58.95.07 1.45.98 1.45.98.85 1.45 2.22 1.03 2.76.79.09-.61.33-1.03.6-1.27-2.1-.24-4.31-1.05-4.31-4.68 0-1.03.37-1.88.98-2.54-.1-.24-.43-1.2.09-2.5 0 0 .8-.26 2.6.97a9 9 0 0 1 4.74 0c1.8-1.23 2.6-.97 2.6-.97.52 1.3.19 2.26.09 2.5.61.66.98 1.51.98 2.54 0 3.64-2.22 4.44-4.33 4.67.34.3.64.88.64 1.77v2.63c0 .26.17.56.66.46A9.5 9.5 0 0 0 12 2.5Z" />
    </svg>
  );
}

export function PinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...glyph} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.3" />
    </svg>
  );
}
