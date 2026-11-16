import {
  siAngular,
  siExpress,
  siMongodb,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPrisma,
  siReact,
  siSocketdotio,
  siTailwindcss,
  siTypescript,
} from "simple-icons";
import { Sparkles } from "lucide-react";
import { TECH_STACK } from "@/data/home";

type BrandIcon = { title: string; path: string; hex: string };

const ICONS: Record<string, BrandIcon> = {
  "Next.js": siNextdotjs,
  Angular: siAngular,
  React: siReact,
  TypeScript: siTypescript,
  "Node.js": siNodedotjs,
  Express: siExpress,
  PostgreSQL: siPostgresql,
  Prisma: siPrisma,
  MongoDB: siMongodb,
  "Socket.io": siSocketdotio,
  "Tailwind CSS": siTailwindcss,
};

function TechnologyMark({ name }: { name: string }) {
  const icon = ICONS[name];

  if (!icon) {
    return <Sparkles className="h-[19px] w-[19px] text-accent" aria-hidden="true" />;
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[20px] w-[20px] shrink-0 fill-current text-ink transition-colors duration-300 group-hover/tech:text-accent"
      aria-hidden="true"
      focusable="false"
    >
      <path d={icon.path} />
    </svg>
  );
}

function TechnologyGroup({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <ul
      className="flex shrink-0 items-center gap-3 pr-3 sm:gap-4 sm:pr-4"
      aria-hidden={duplicate ? true : undefined}
    >
      {TECH_STACK.map((item) => (
        <li key={item} className="shrink-0">
          <span className="group/tech inline-flex min-h-[56px] items-center gap-3 rounded-full border border-border bg-bg-elevated px-5 text-[13px] font-medium tracking-[-0.01em] text-ink transition-[background-color,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-[color:var(--accent)] hover:bg-[var(--accent-soft)] sm:min-h-[62px] sm:px-6 sm:text-sm">
            <TechnologyMark name={item} />
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

/**
 * CSS-driven marquee: two identical groups make an exact seamless loop.
 * The second group is excluded from the accessibility tree.
 * Reduced-motion users get a wrapped, readable technology list.
 */
export function TechMarquee() {
  return (
    <section
      id="tech-stack"
      aria-labelledby="tech-marquee-title"
      className="relative overflow-hidden border-b border-border bg-bg-soft py-8 sm:py-10"
    >
      <div className="container-x mb-6 flex flex-wrap items-end justify-between gap-3 sm:mb-7">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="label-mono">The toolkit / 001</span>
          <h2 id="tech-marquee-title" className="font-display text-2xl italic leading-none text-ink sm:text-3xl">
            Technologies I build with.
          </h2>
        </div>
        <p className="hidden font-mono text-[10px] uppercase tracking-[0.15em] text-text-muted sm:block">
          Hover to pause
        </p>
      </div>

      <div className="tech-marquee-mask group relative overflow-hidden" tabIndex={0} aria-label="Technology list, hover or focus to pause animation">
        <div className="tech-marquee-track flex w-max items-center motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-3 motion-reduce:px-5">
          <TechnologyGroup />
          <div className="motion-reduce:hidden">
            <TechnologyGroup duplicate />
          </div>
        </div>
      </div>
    </section>
  );
}
