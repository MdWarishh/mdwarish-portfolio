import type { CSSProperties } from "react";

/**
 * Experience hero art — how the work actually moves: a main line of commits, feature branches that
 * split off and merge back, and a release that ends on a server. Draws on load; a faint trace runs
 * along main afterwards (shared .pa-* classes, paused offscreen, still with reduced motion).
 */
const d = (ms: number) => ({ "--d": ms }) as CSSProperties;

const MAIN_Y = 170;
const MAIN = `M24 ${MAIN_Y} H470`;
const BRANCH_A = "M96 170 C 130 170, 130 92, 168 92 H 236 C 274 92, 274 170, 308 170";
const BRANCH_B = "M268 170 C 300 170, 300 246, 336 246 H 384 C 420 246, 420 170, 452 170";

const COMMITS_MAIN = [56, 96, 308, 360, 452];
const COMMITS_A = [182, 222];
const COMMITS_B = [350, 372];

export function BranchArt() {
  return (
    <svg className="pa pa--experience" viewBox="0 0 560 320" fill="none" focusable={false} data-ambient>
      <path className="pa-line draw" style={d(150)} pathLength={1} d={MAIN} />
      <path className="pa-trace" pathLength={1} d={MAIN} />
      <path className="pa-line draw" style={d(500)} pathLength={1} d={BRANCH_A} />
      <path className="pa-line draw" style={d(800)} pathLength={1} d={BRANCH_B} />

      {COMMITS_MAIN.map((x, k) => (
        <circle key={x} className="pa-node pop" style={d(300 + k * 120)} cx={x} cy={MAIN_Y} r="6" />
      ))}
      {COMMITS_A.map((x, k) => (
        <circle key={x} className="pa-node pop" style={d(800 + k * 120)} cx={x} cy={92} r="5" />
      ))}
      {COMMITS_B.map((x, k) => (
        <circle key={x} className="pa-node pop" style={d(1100 + k * 120)} cx={x} cy={246} r="5" />
      ))}

      <text className="pa-label pop" style={d(1200)} x="24" y={MAIN_Y - 16}>
        main
      </text>
      <text className="pa-label pop" style={d(1300)} x="168" y="76">
        feature
      </text>
      <text className="pa-label pop" style={d(1400)} x="336" y="274">
        fix
      </text>

      {/* release → server */}
      <path className="pa-line draw" style={d(1300)} pathLength={1} d={`M470 ${MAIN_Y} H498`} />
      <g className="pop" style={d(1600)}>
        <circle className="pa-key-fill" cx="470" cy={MAIN_Y} r="6" />
        <rect className="pa-node" x="498" y={MAIN_Y - 30} width="50" height="26" rx="4" />
        <rect className="pa-node" x="498" y={MAIN_Y + 4} width="50" height="26" rx="4" />
        <circle className="pa-key-fill" cx="508" cy={MAIN_Y - 17} r="2.5" />
        <path className="pa-soft" d={`M516 ${MAIN_Y - 17} H538 M516 ${MAIN_Y + 17} H538`} />
        <text className="pa-label" x="498" y={MAIN_Y + 52}>
          live
        </text>
      </g>
    </svg>
  );
}
