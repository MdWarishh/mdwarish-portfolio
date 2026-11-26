/** Contour linework used behind the closing call-to-action. Pure decoration. */
export function ContourArt({ className }: { className?: string }) {
  const rings = [40, 70, 100, 130, 160, 190, 220];
  return (
    <svg className={className} viewBox="0 0 520 420" fill="none" aria-hidden focusable={false}>
      {rings.map((r, i) => (
        <ellipse
          key={r}
          cx="330"
          cy="300"
          rx={r * 1.25}
          ry={r}
          stroke="currentColor"
          strokeWidth={i === 2 ? 1.4 : 0.8}
          transform={`rotate(-12 330 300)`}
        />
      ))}
      <circle cx="330" cy="300" r="4" fill="currentColor" />
      <path d="M330 300 L470 90" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 6" />
      <circle cx="470" cy="90" r="3" stroke="currentColor" />
    </svg>
  );
}

/** Thin section divider with a centred registration mark. */
export function RuleMark() {
  return (
    <div className="rule-mark" aria-hidden>
      <span />
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" focusable={false}>
        <circle cx="12" cy="12" r="6.5" stroke="currentColor" />
        <path d="M12 1v22M1 12h22" stroke="currentColor" />
      </svg>
      <span />
    </div>
  );
}
