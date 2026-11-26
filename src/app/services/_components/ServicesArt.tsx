import type { CSSProperties } from "react";

/**
 * Services hero art — "from a website to a whole system": a website nested inside an application,
 * nested inside a system, wired out to the integrations the services list (email, Google Sheets,
 * payments) and down to the server it runs on. Draws on load; faint traces run along the
 * integration lines afterwards (shared .pa-* classes, paused offscreen, still with reduced motion).
 */
const d = (ms: number) => ({ "--d": ms }) as CSSProperties;
const n = (i: number) => ({ "--n": i }) as CSSProperties;

const OUT = [
  { y: 112, label: "Email" },
  { y: 190, label: "Google Sheets" },
  { y: 268, label: "Payments" },
];

export function ServicesArt() {
  return (
    <svg className="pa pa--services" viewBox="0 0 560 420" fill="none" focusable={false} data-ambient>
      {/* system */}
      <rect className="pa-line draw" style={d(150)} pathLength={1} x="16" y="36" width="344" height="312" rx="16" />
      <text className="pa-label pop" style={d(900)} x="34" y="62">
        System
      </text>
      {/* application */}
      <rect className="pa-line draw" style={d(320)} pathLength={1} x="46" y="80" width="284" height="226" rx="12" />
      <text className="pa-label pop" style={d(1000)} x="62" y="104">
        Application
      </text>
      {/* website */}
      <g className="pop" style={d(700)}>
        <rect className="pa-node" x="76" y="124" width="150" height="104" rx="8" />
        <path className="pa-soft" d="M76 144 H226" />
        <circle className="pa-key-fill" cx="88" cy="134" r="3" />
        <path className="pa-soft" d="M92 166 H170 M92 182 H200 M92 198 H150" />
      </g>
      <text className="pa-label pop" style={d(1100)} x="76" y="250">
        Website
      </text>
      {/* API + data inside the application */}
      <path className="pa-line draw" style={d(1000)} pathLength={1} d="M226 176 H262" />
      <g className="pop" style={d(1150)}>
        <rect className="pa-node" x="262" y="150" width="46" height="52" rx="8" />
        <path className="pa-soft" d="M272 166 H298 M272 176 H298 M272 186 H290" />
      </g>
      <g className="pop" style={d(1250)}>
        <ellipse className="pa-node" cx="285" cy="262" rx="22" ry="7" />
        <path className="pa-line" d="M263 262 V280 A22 7 0 0 0 307 280 V262" />
      </g>
      <path className="pa-line draw" style={d(1200)} pathLength={1} d="M285 202 V255" />

      {/* integrations */}
      {OUT.map((o, i) => (
        <g key={o.label}>
          <path className="pa-line draw" style={d(1300 + i * 120)} pathLength={1} d={`M360 190 C 400 190, 400 ${o.y}, 440 ${o.y}`} />
          <path className="pa-trace" style={n(i)} pathLength={1} d={`M360 190 C 400 190, 400 ${o.y}, 440 ${o.y}`} />
          <g className="pop" style={d(1500 + i * 120)}>
            <g className="pa-float" style={n(i)}>
              <circle className="pa-node" cx="448" cy={o.y} r="8" />
              <text className="pa-label" x="464" y={o.y + 4}>
                {o.label}
              </text>
            </g>
          </g>
        </g>
      ))}
      <circle className="pa-key-fill pop" style={d(1250)} cx="360" cy="190" r="4" />

      {/* server */}
      <path className="pa-line draw" style={d(1600)} pathLength={1} d="M188 348 V384" />
      <g className="pop" style={d(1800)}>
        <rect className="pa-node" x="128" y="384" width="120" height="22" rx="5" />
        <circle className="pa-key-fill" cx="140" cy="395" r="2.5" />
        <text className="pa-label" x="152" y="399">
          VPS · Nginx
        </text>
      </g>
    </svg>
  );
}
