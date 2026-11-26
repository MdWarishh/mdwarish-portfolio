import type { CSSProperties } from "react";

/**
 * Simplified entity diagram of the Limra CRM database.
 * Model and field names are taken verbatim from InventoryPro-Backend/prisma/schema.prisma.
 */
type Entity = { name: string; x: number; y: number; fields: string[]; accent?: boolean };

const ENTITIES: Entity[] = [
  { name: "Branch", x: 24, y: 28, fields: ["name", "isMainBranch"] },
  { name: "User", x: 24, y: 168, fields: ["role", "branchId"] },
  { name: "Permission", x: 24, y: 300, fields: ["module", "canView · canEdit"] },
  { name: "Product", x: 236, y: 28, fields: ["sku", "gstRate"] },
  { name: "SerialNumber", x: 236, y: 168, fields: ["serialNumber", "status"], accent: true },
  { name: "StockTransfer", x: 236, y: 300, fields: ["fromBranchId", "toBranchId"] },
  { name: "Dealer", x: 448, y: 28, fields: ["gstNumber", "branchId"] },
  { name: "StockIn · StockOut", x: 448, y: 168, fields: ["origin", "quantity"] },
  { name: "Invoice", x: 448, y: 300, fields: ["invoiceNumber", "gstAmount"] },
];

const W = 168;
const H = 84;

// Relations drawn as orthogonal hairlines between entity edges.
const LINKS = [
  "M192 70 H236", // Branch–Product
  "M108 112 V168", // Branch–User
  "M108 252 V300", // User–Permission
  "M320 112 V168", // Product–SerialNumber
  "M404 210 H448", // SerialNumber–StockIn/Out
  "M320 252 V300", // SerialNumber–StockTransfer
  "M532 112 V168", // Dealer–StockIn (dealer supply)
  "M532 252 V300", // StockOut–Invoice
  "M192 210 H236", // User–SerialNumber (branch scope)
];

const d = (ms: number) => ({ "--d": ms }) as CSSProperties;

/** With caption=false the diagram is decorative (aria-hidden) and safe to repeat on a page. */
export function SchemaDiagram({ caption = true, animate = true }: { caption?: boolean; animate?: boolean }) {
  return (
    <svg
      className="diagram"
      viewBox="0 0 640 410"
      role={caption ? "img" : undefined}
      aria-labelledby={caption ? "schema-title schema-desc" : undefined}
      aria-hidden={caption ? undefined : true}
    >
      {caption ? (
        <>
          <title id="schema-title">Core data model of Limra CRM</title>
          <desc id="schema-desc">
            Branches have users with per-module permissions. Products have serial numbers, which move through
            stock-in, stock-out and branch transfers, and end on invoices. Dealers supply stock.
          </desc>
        </>
      ) : null}
      {LINKS.map((path, i) => (
        <path
          key={path}
          className={`d-line${animate ? " draw" : ""}`}
          pathLength={1}
          style={d(300 + i * 60)}
          d={path}
        />
      ))}
      {ENTITIES.map((e, i) => (
        <g key={e.name} className={animate ? "pop" : undefined} style={d(i * 70)}>
          <rect
            className={`d-node${e.accent ? " d-node--accent" : ""}`}
            x={e.x}
            y={e.y}
            width={W}
            height={H}
            rx="8"
          />
          <path className="d-line" d={`M${e.x} ${e.y + 30} H${e.x + W}`} />
          <text className="d-label" x={e.x + 14} y={e.y + 20} style={{ letterSpacing: "0.04em", textTransform: "none", fontSize: 12.5, fill: "var(--ink)" }}>
            {e.name}
          </text>
          {e.fields.map((f, j) => (
            <text key={f} className="d-small" x={e.x + 14} y={e.y + 52 + j * 18}>
              {f}
            </text>
          ))}
          {e.accent ? <circle className="d-dot" cx={e.x + W - 14} cy={e.y + 15} r="3.5" /> : null}
        </g>
      ))}
      {caption ? (
        <text className="d-small" x="24" y="404">
          Simplified from prisma/schema.prisma — 30 models in total
        </text>
      ) : null}
    </svg>
  );
}
