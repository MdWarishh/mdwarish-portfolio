import type { CSSProperties } from "react";
import { PERSON } from "@/config/site";

/**
 * The first-visit intro: the MW monogram is *built* as a small engineering graph — its two strokes
 * draw like traces, a node lights up at every vertex, and the logo's accent tick completes it.
 * Registration corners settle around the composition, MD WARISH rises letter by letter, the title
 * tightens into place, and a hairline draws out from the centre with a spark running along it.
 * Then the composition lifts and the whole layer wipes upward to reveal the site (≈1.7 s).
 *
 * Plain server-rendered markup, hidden unless INTRO_SCRIPT (lib/intro.ts) set html[data-intro="play"]
 * before first paint. The exit is part of the same CSS animation, so the layer always clears itself
 * even if JavaScript fails; it never takes pointer events. Decorative: hidden from assistive tech.
 * Paths are the existing LogoMark geometry (components/svg/Logo.tsx).
 */
const STROKES = ["M5 36V12L15 25L24 12L33 25V12", "M15 30L21 38L27 30L33 38L43 18"];
const NODES: [number, number][] = [
  [5, 36],
  [5, 12],
  [15, 25],
  [24, 12],
  [33, 25],
  [33, 12],
  [15, 30],
  [21, 38],
  [27, 30],
  [33, 38],
  [43, 18],
];

const v = (name: string, n: number) => ({ [name]: n }) as CSSProperties;

export function IntroLoader() {
  const letters = Array.from(PERSON.name.toUpperCase());
  return (
    <div className="intro" aria-hidden="true">
      <div className="intro__inner">
        <span className="intro__corner intro__corner--tl" />
        <span className="intro__corner intro__corner--tr" />
        <span className="intro__corner intro__corner--bl" />
        <span className="intro__corner intro__corner--br" />

        <svg className="intro__mark" viewBox="0 0 48 48" fill="none" focusable="false">
          {STROKES.map((d, i) => (
            <path key={d} className="intro__stroke" style={v("--s", i)} pathLength={1} d={d} />
          ))}
          <path className="intro__tick" pathLength={1} d="M38 9H43V14" />
          {NODES.map(([x, y], i) => (
            <circle key={`${x}-${y}`} className={`intro__node${i === NODES.length - 1 ? " intro__node--key" : ""}`} style={v("--n", i)} cx={x} cy={y} r={1.7} />
          ))}
        </svg>

        <p className="intro__name">
          {letters.map((ch, i) => (
            <span key={i} className="intro__ch" style={v("--c", i)}>
              {ch === " " ? " " : ch}
            </span>
          ))}
        </p>
        <p className="intro__title">{PERSON.title}</p>
        <span className="intro__rule">
          <span className="intro__spark" />
        </span>
      </div>
    </div>
  );
}
