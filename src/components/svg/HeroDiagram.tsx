import type { CSSProperties } from "react";

/**
 * Home hero illustration — the whole product one developer builds, as one composed frame:
 * an interface (a dashboard with a live chart) overlapping the API that serves it (routes, auth)
 * and the data behind it (a table with one record highlighted), all wired together and standing on
 * the server they are deployed to. Same language as the rest of the site: hairlines, paper
 * surfaces, one vermilion signal.
 *
 * Motion (CSS, "Home hero art" in globals.css): the server rail draws, the three panels rise into place
 * (transform only — the drawing is visible from the first paint, so it never holds back LCP), the
 * chart and the wiring draw, labels follow; then small packets travel along the wires and
 * the newest chart point and the active record pulse. Loops pause offscreen and are off on phones
 * and with reduced motion. One responsive SVG — on phones the code lines become bars and labels grow.
 */
const d = (ms: number) => ({ "--d": ms }) as CSSProperties;

const WIRES = {
  uiToApi: "M380 128 H500 Q520 128 520 148 V200",
  apiToData: "M330 350 H290",
  uiToData: "M150 256 V318",
  dataToRail: "M165 488 V520",
  apiToRail: "M600 376 V506",
};

export function HeroDiagram() {
  return (
    <figure className="hero-visual" data-ambient>
      <svg className="hero-art" viewBox="0 0 640 540" fill="none" role="img" aria-labelledby="ha-title ha-desc">
        <title id="ha-title">The parts of a product I build</title>
        <desc id="ha-desc">
          A web interface connected to a Node.js and Express API and a PostgreSQL database, all deployed on a server
          behind Nginx — the full stack, built by one developer.
        </desc>

        {/* server rail */}
        <path className="ha-rail draw" style={d(120)} pathLength={1} d="M24 520 H616" />
        <g className="ha-in" style={d(1500)}>
          {[548, 572, 596].map((x) => (
            <rect key={x} className="ha-unit" x={x} y="506" width="18" height="10" rx="2" />
          ))}
          <circle className="ha-key-fill" cx="551" cy="511" r="1.8" />
          <text className="ha-label" x="24" y="508">
            Deployed · VPS + Nginx
          </text>
        </g>

        {/* wiring (behind the panels) */}
        {Object.entries(WIRES).map(([k, w], i) => (
          <path key={k} className="ha-wire draw" style={d(1050 + i * 90)} pathLength={1} d={w} />
        ))}
        <path className="ha-flow" d={WIRES.uiToApi} />
        <path className="ha-flow ha-flow--b" d={WIRES.apiToData} />
        <path className="ha-flow ha-flow--c" d={WIRES.uiToData} />

        {/* data */}
        <g className="ha-panel ha-in" style={d(420)}>
          <rect className="ha-shadow" x="46" y="326" width="250" height="170" rx="14" />
          <rect className="ha-frame" x="40" y="318" width="250" height="170" rx="14" />
          <path className="ha-soft" d="M40 350 H290 M110 318 V488 M200 318 V488" />
          {[378, 406, 434, 462].map((y) => (
            <path key={y} className="ha-soft" d={`M40 ${y + 14} H290`} />
          ))}
          <rect className="ha-row" x="41" y="392" width="248" height="28" />
          <rect className="ha-key-fill" x="41" y="392" width="3" height="28" />
          {[364, 406, 434, 462].map((y, i) => (
            <path key={y} className={i === 1 ? "ha-text ha-text--strong" : "ha-text"} d={`M54 ${y} H92 M124 ${y} H178 M214 ${y} H262`} />
          ))}
          <circle className="ha-key-fill ha-pulse" cx="276" cy="406" r="3" />
        </g>
        <text className="ha-label ha-in" style={d(1350)} x="40" y="308">
          Data · PostgreSQL
        </text>

        {/* interface */}
        <g className="ha-panel ha-in" style={d(250)}>
          <rect className="ha-shadow" x="30" y="36" width="356" height="228" rx="14" />
          <rect className="ha-frame" x="24" y="28" width="356" height="228" rx="14" />
          <path className="ha-soft" d="M24 58 H380 M96 58 V256" />
          <circle className="ha-dot" cx="42" cy="43" r="3" />
          <circle className="ha-dot" cx="54" cy="43" r="3" />
          <circle className="ha-key-fill" cx="66" cy="43" r="3" />
          <rect className="ha-pill" x="86" y="35" width="150" height="16" rx="8" />
          <path className="ha-text" d="M98 43 H170" />
          {/* sidebar */}
          {[80, 98, 116, 134].map((y, i) => (
            <path key={y} className={i === 1 ? "ha-key" : "ha-text"} d={`M40 ${y} H${i === 1 ? 82 : 76}`} />
          ))}
          {/* tiles */}
          {[112, 198, 284].map((x, i) => (
            <g key={x}>
              <rect className="ha-tile" x={x} y="74" width="80" height="48" rx="8" />
              <path className="ha-text" d={`M${x + 12} 90 H${x + 44}`} />
              <path className={i === 0 ? "ha-text ha-text--strong" : "ha-text"} d={`M${x + 12} 106 H${x + 62}`} />
            </g>
          ))}
          {/* chart */}
          <path className="ha-soft" d="M112 236 H364" />
          <path
            className="ha-chart draw"
            style={d(900)}
            pathLength={1}
            d="M112 222 C 140 218, 160 196, 190 202 S 240 178, 270 184 S 324 152, 358 158"
          />
          <circle className="ha-key-fill ha-pulse" cx="358" cy="158" r="3.5" />
        </g>
        <text className="ha-label ha-in" style={d(1250)} x="24" y="18">
          Interface · Next.js + React
        </text>

        {/* API */}
        <g className="ha-panel ha-in" style={d(600)}>
          <rect className="ha-shadow" x="336" y="208" width="286" height="176" rx="14" />
          <rect className="ha-frame" x="330" y="200" width="286" height="176" rx="14" />
          <path className="ha-soft" d="M330 232 H616" />
          <text className="ha-mini" x="348" y="221">
            routes
          </text>
          <rect className="ha-ok" x="566" y="210" width="34" height="14" rx="7" />
          <text className="ha-mini ha-mini--ok" x="573" y="221">
            200
          </text>
          <g className="ha-code">
            {[
              ["GET", "/invoices"],
              ["POST", "/stock/transfer"],
              ["GET", "/reports/gst"],
            ].map(([m, p], i) => (
              <text key={p} className="ha-mono" x="348" y={262 + i * 28}>
                <tspan className="ha-mono__m">{m}</tspan>
                <tspan dx="10">{p}</tspan>
              </text>
            ))}
            <text className="ha-mono ha-mono--dim" x="348" y="350">
              auth · role · branch · validate
            </text>
          </g>
          <g className="ha-code-bars">
            {[258, 286, 314, 346].map((y, i) => (
              <path key={y} className={i === 0 ? "ha-key" : "ha-text"} d={`M348 ${y} H${i === 3 ? 520 : 380} ${i === 3 ? "" : `M392 ${y} H${480 + i * 20}`}`} />
            ))}
          </g>
        </g>
        <text className="ha-label ha-in" style={d(1450)} x="332" y="398">
          API · Node.js + Express
        </text>
      </svg>
      <figcaption className="diagram-caption">One developer across the whole stack.</figcaption>
    </figure>
  );
}
