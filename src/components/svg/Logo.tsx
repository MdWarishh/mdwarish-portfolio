/**
 * The existing "MW" monogram from the previous mdwarish.com build, kept as the brand mark.
 * Two overlapping zig-zag strokes form an M above a W, with a bronze corner tick.
 */
export function LogoMark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <path d="M5 36V12L15 25L24 12L33 25V12" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="miter" />
      <path d="M15 30L21 38L27 30L33 38L43 18" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="miter" />
      <path d="M38 9H43V14" stroke="var(--accent-deco)" strokeWidth="2" />
    </svg>
  );
}
