import type { CSSProperties } from "react";
import { TECH_ICONS, type TechId } from "./tech-icons";

/**
 * Brand colours below 3:1 contrast against the light-theme tile (measured: React 1.6, JavaScript 1.3,
 * Tailwind 2.4, Spring Boot 2.5). Rather than altering brand colours, these sit on a small espresso chip
 * in the light theme. Every brand colour clears 3:1 on the dark theme.
 */
const LIGHT_UNSAFE = new Set<TechId>(["react", "javascript", "tailwindcss", "springboot"]);

export function TechIcon({
  id,
  className = "tech__icon",
  size,
  mono = false,
}: {
  id: TechId;
  className?: string;
  size?: number;
  /** Render in the current text colour (used inside small tags). */
  mono?: boolean;
}) {
  const icon = TECH_ICONS[id];
  const style = !mono && icon.color ? ({ "--brand": icon.color } as CSSProperties) : undefined;
  return (
    <svg
      viewBox={icon.viewBox}
      className={className}
      width={size}
      height={size}
      style={style}
      fill="currentColor"
      aria-hidden
      focusable={false}
      data-chip={!mono && LIGHT_UNSAFE.has(id) ? "light-unsafe" : undefined}
    >
      {icon.paths.map((d) => (
        <path key={d.slice(0, 24)} d={d} />
      ))}
    </svg>
  );
}

export function techLabel(id: TechId): string {
  return TECH_ICONS[id].label;
}
