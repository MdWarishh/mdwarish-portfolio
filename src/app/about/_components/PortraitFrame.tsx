import Image from "next/image";
import type { CSSProperties } from "react";

/**
 * About hero: the real portrait inside a drafting frame — crop marks, a measured edge, and one line
 * that starts loose (an idea), turns square (code) and ends at a small browser window (a product).
 * The frame draws on load; a faint trace walks the line afterwards (shared .pa-* classes).
 */
const d = (ms: number) => ({ "--d": ms }) as CSSProperties;

const JOURNEY =
  "M520 30 C 548 52, 500 78, 528 104 S 506 150, 528 172 V 260 H 506 V 340 H 528 V 470";

export function PortraitFrame() {
  return (
    <figure className="ab-portrait">
      <div className="ab-portrait__img">
        <Image
          src="/images/md-warish-portrait.webp"
          alt="Portrait of Md Warish, arms folded, smiling"
          width={433}
          height={577}
          sizes="(min-width: 960px) 360px, 70vw"
          priority
        />
      </div>
      <svg className="pa ab-portrait__art" viewBox="0 0 560 650" fill="none" aria-hidden focusable={false} data-ambient>
        {/* crop marks */}
        {[
          "M14 36 H30 M33 14 V30",
          "M488 36 H472 M466 14 V30",
          "M14 613 H30 M33 636 V620",
          "M488 613 H472 M466 636 V620",
        ].map((m, i) => (
          <path key={m} className="pa-line draw" style={d(200 + i * 90)} pathLength={1} d={m} />
        ))}
        {/* measured left edge */}
        <path className="pa-soft draw" style={d(500)} pathLength={1} d="M8 36 V613" />
        {[36, 180, 324, 468, 613].map((y, i) => (
          <path key={y} className="pa-soft pop" style={d(800 + i * 60)} d={`M3 ${y} H13`} />
        ))}
        {/* idea → code → product */}
        <path className="pa-line draw" style={d(700)} pathLength={1} d={JOURNEY} />
        <path className="pa-trace" pathLength={1} d={JOURNEY} />
        <circle className="pa-key-fill pop" style={d(650)} cx="520" cy="30" r="4" />
        <g className="pop" style={d(1700)}>
          <rect className="pa-node" x="500" y="470" width="56" height="40" rx="5" />
          <path className="pa-soft" d="M500 481 H556 M508 492 H540 M508 500 H530" />
          <circle className="pa-key-fill" cx="506" cy="475.5" r="2" />
        </g>
      </svg>
    </figure>
  );
}
