import type { CSSProperties } from "react";
import { SKILL_GROUPS } from "@/content/skills";

/**
 * Resume hero art — a structured profile: a document outline whose sections are wired to the four
 * skill layers they draw on (the real SKILL_GROUPS titles). Draws on load; a faint trace runs along
 * one wire afterwards (shared .pa-* classes; paused offscreen, still with reduced motion).
 */
const d = (ms: number) => ({ "--d": ms }) as CSSProperties;
const n = (i: number) => ({ "--n": i }) as CSSProperties;

const ROWS = [118, 182, 246, 310];

export function ResumeArt() {
  const layers = SKILL_GROUPS.slice(0, 4).map((g) => g.title.split(" ")[0]);
  return (
    <svg className="pa pa--resume" viewBox="0 0 560 400" fill="none" focusable={false} data-ambient>
      {/* the document */}
      <rect className="pa-node draw" style={d(150)} pathLength={1} x="40" y="40" width="220" height="320" rx="10" />
      <g className="pop" style={d(500)}>
        <path className="pa-line" d="M64 74 H170" />
        <path className="pa-soft" d="M64 90 H138" />
        <circle className="pa-key-fill" cx="236" cy="74" r="4" />
      </g>
      {ROWS.map((y, i) => (
        <g key={y} className="pop" style={d(650 + i * 110)}>
          <path className="pa-key" d={`M64 ${y} H96`} />
          <path className="pa-soft" d={`M64 ${y + 14} H232 M64 ${y + 26} H200`} />
        </g>
      ))}

      {/* wires to the skill layers */}
      {ROWS.map((y, i) => {
        const ty = 96 + i * 62;
        const wire = `M260 ${y + 14} C 320 ${y + 14}, 330 ${ty}, 380 ${ty}`;
        return (
          <g key={y}>
            <path className="pa-line draw" style={d(1100 + i * 120)} pathLength={1} d={wire} />
            {i === 0 ? <path className="pa-trace" style={n(0)} pathLength={1} d={wire} /> : null}
            <g className="pop" style={d(1300 + i * 120)}>
              <rect className="pa-node" x="380" y={ty - 20} width="140" height="40" rx="8" />
              <text className="pa-label" x="398" y={ty + 4}>
                {layers[i]}
              </text>
            </g>
          </g>
        );
      })}
    </svg>
  );
}
