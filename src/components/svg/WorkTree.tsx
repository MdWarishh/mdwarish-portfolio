import type { CSSProperties } from "react";
import { CATEGORY_LABELS } from "@/content/projects";
import type { Project, ProjectCategory } from "@/types/content";

/**
 * Work page hero art: the actual body of work drawn as a tree. One root (me) branches into the
 * three kinds of product I build, and each branch ends in one small browser window per real project
 * — so the shape changes if PROJECTS changes. Lines draw on load (.draw), windows pop in, then faint
 * traces run out along the branches (paused offscreen, off on phones and with reduced motion).
 */
const d = (ms: number) => ({ "--d": ms }) as CSSProperties;

const ROOT = { x: 36, y: 190 };
const CAT_X = 196;
const LEAF_X = 360;
const LEAF_W = 46;
const LEAF_H = 28;
const GAP = 34;

const curve = (x1: number, y1: number, x2: number, y2: number) => {
  const mx = (x1 + x2) / 2;
  return `M${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`;
};

export function WorkTree({ projects }: { projects: Project[] }) {
  const cats = (Object.keys(CATEGORY_LABELS) as ProjectCategory[])
    .map((c) => ({ c, count: projects.filter((p) => p.category === c).length }))
    .filter((g) => g.count > 0);

  // Stack the groups vertically, each group as tall as its leaves.
  let cursor = 24;
  const groups = cats.map((g) => {
    const h = (g.count - 1) * GAP;
    const top = cursor;
    cursor += h + GAP * 1.6;
    const leaves = Array.from({ length: g.count }, (_, k) => top + k * GAP + LEAF_H / 2);
    return { ...g, y: top + h / 2 + LEAF_H / 2, leaves };
  });
  const height = cursor - GAP * 1.6 + LEAF_H + 24;
  const rootY = Math.round(height / 2);

  let n = 0;
  return (
    <svg className="wk-tree" viewBox={`0 0 640 ${height}`} fill="none" aria-hidden focusable={false} data-ambient>
      {groups.map((g, gi) => (
        <g key={g.c}>
          <path className="wk-tree__line draw" style={d(200 + gi * 120)} pathLength={1} d={curve(ROOT.x, rootY, CAT_X, g.y)} />
          <path className="wk-tree__trace" style={{ "--n": gi } as CSSProperties} pathLength={1} d={curve(ROOT.x, rootY, CAT_X, g.y)} />
          {g.leaves.map((ly) => {
            const k = n++;
            return (
              <g key={ly}>
                <path className="wk-tree__line wk-tree__line--leaf draw" style={d(650 + k * 70)} pathLength={1} d={curve(CAT_X, g.y, LEAF_X, ly)} />
                <g className="pop" style={d(950 + k * 70)}>
                  <rect className="wk-tree__win" x={LEAF_X} y={ly - LEAF_H / 2} width={LEAF_W} height={LEAF_H} rx={4} />
                  <path className="wk-tree__bar" d={`M${LEAF_X} ${ly - LEAF_H / 2 + 8} H${LEAF_X + LEAF_W}`} />
                  <circle className={g.c === "business-app" ? "wk-tree__dot wk-tree__dot--key" : "wk-tree__dot"} cx={LEAF_X + 6} cy={ly - LEAF_H / 2 + 4} r={1.6} />
                </g>
              </g>
            );
          })}
          <circle className="wk-tree__cat pop" style={d(600 + gi * 120)} cx={CAT_X} cy={g.y} r={4.5} />
          <text className="wk-tree__label pop" style={d(1300 + gi * 120)} x={LEAF_X + LEAF_W + 18} y={g.y + 4}>
            {CATEGORY_LABELS[g.c]}
          </text>
        </g>
      ))}
      <circle className="wk-tree__root pop" style={d(100)} cx={ROOT.x} cy={rootY} r={6} />
    </svg>
  );
}
