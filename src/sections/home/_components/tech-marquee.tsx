"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

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

/* Presentation-only */
const COPIES = 4; // identical groups per row (seamless loop on wide screens)
const SPEED_A = 42; // px / second (row 1, moves left)
const SPEED_B = 34; // px / second (row 2, moves right)

const MASK =
  "[mask-image:linear-gradient(to_right,transparent_0,#000_12%,#000_88%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_right,transparent_0,#000_12%,#000_88%,transparent_100%)]";

/* Keeps x inside [-width, 0) so the loop never shows a gap */
const wrapX = (value: number, width: number) =>
  ((value % width) + width) % width - width;

/* ==========================================================
   TECH PILL
   ========================================================== */

function TechnologyMark({ name }: { name: string }) {
  const icon = ICONS[name];

  return (
    <span
      aria-hidden="true"
      className="
        flex h-9 w-9 shrink-0 items-center justify-center
        rounded-full border border-border bg-bg-soft
        transition-[background-color,border-color] duration-300
        group-hover/tech:border-[color:var(--accent)]
        group-hover/tech:bg-[var(--accent-soft)]
      "
    >
      {icon ? (
        <svg
          viewBox="0 0 24 24"
          focusable="false"
          className="h-[18px] w-[18px] fill-current text-ink transition-colors duration-300 group-hover/tech:text-accent"
        >
          <path d={icon.path} />
        </svg>
      ) : (
        <Sparkles className="h-[17px] w-[17px] text-accent" />
      )}
    </span>
  );
}

const TechnologyGroup = ({
  items,
  copy,
  groupRef,
  wrapped = false,
}: {
  items: readonly string[];
  copy: boolean;
  groupRef?: React.Ref<HTMLUListElement>;
  wrapped?: boolean;
}) => (
  <ul
    ref={groupRef}
    aria-hidden={copy ? true : undefined}
    className={
      wrapped
        ? "flex flex-wrap items-center justify-center gap-3 px-5"
        : "flex shrink-0 items-center gap-3 pr-3 sm:gap-4 sm:pr-4"
    }
  >
    {items.map((item) => (
      <li key={item} className="shrink-0">
        <span
          className="
            group/tech inline-flex items-center gap-3
            rounded-full border border-border bg-bg-elevated
            py-2 pl-2 pr-6
            text-[13px] font-medium tracking-[-0.01em] text-ink
            transition-[background-color,border-color,transform]
            duration-300
            hover:-translate-y-0.5
            hover:border-[color:var(--accent)]
            sm:text-sm
          "
        >
          <TechnologyMark name={item} />
          {item}
        </span>
      </li>
    ))}
  </ul>
);

/* ==========================================================
   MARQUEE ROW (framer-motion driven)
   ========================================================== */

function MarqueeRow({
  items,
  direction,
  speed,
  label,
}: {
  items: readonly string[];
  direction: "left" | "right";
  speed: number;
  label: string;
}) {
  const reducedMotion = useReducedMotion();

  const groupRef = useRef<HTMLUListElement>(null);
  const [groupWidth, setGroupWidth] = useState(0);

  const x = useMotionValue(0);

  /* 1 = full speed, 0 = paused. Spring gives smooth ease in/out */
  const factor = useSpring(1, { stiffness: 90, damping: 24, mass: 0.6 });

  /* Measure one group so we know exactly where to loop */
  useEffect(() => {
    const el = groupRef.current;
    if (!el) return;

    const measure = () => setGroupWidth(el.offsetWidth);
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [items]);

  useAnimationFrame((_, delta) => {
    if (reducedMotion || groupWidth === 0) return;

    const dir = direction === "left" ? -1 : 1;
    const next = x.get() + dir * speed * factor.get() * (delta / 1000);
    x.set(wrapX(next, groupWidth));
  });

  if (items.length === 0) return null;

  /* Reduced motion: static, wrapped, readable list */
  if (reducedMotion) {
    return (
      <div role="group" aria-label={label}>
        <TechnologyGroup items={items} copy={false} wrapped />
      </div>
    );
  }

  return (
    <div
      role="group"
      aria-label={label}
      onMouseEnter={() => factor.set(0)}
      onMouseLeave={() => factor.set(1)}
      onFocusCapture={() => factor.set(0)}
      onBlurCapture={() => factor.set(1)}
      className={`relative overflow-hidden ${MASK}`}
    >
      <motion.div style={{ x }} className="flex w-max items-center will-change-transform">
        {Array.from({ length: COPIES }).map((_, i) => (
          <TechnologyGroup
            key={i}
            items={items}
            copy={i > 0}
            groupRef={i === 0 ? groupRef : undefined}
          />
        ))}
      </motion.div>
    </div>
  );
}

/* ==========================================================
   SECTION
   ========================================================== */

export function TechMarquee() {
  const stack: readonly string[] = TECH_STACK;
  const mid = Math.ceil(stack.length / 2);
  const rowA = stack.slice(0, mid);
  const rowB = stack.slice(mid);

  return (
    <section
      id="tech-stack"
      aria-labelledby="tech-marquee-title"
      className="relative overflow-hidden border-b border-border bg-bg-soft py-14 sm:py-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="container-x mb-10 flex flex-wrap items-end justify-between gap-x-8 gap-y-4 sm:mb-14"
      >
        <div className="max-w-xl">
          <span className="label-mono">The toolkit / 001</span>
          <h2
            id="tech-marquee-title"
            className="
              mt-4 font-display
              text-[clamp(2rem,4vw,3.25rem)]
              leading-[1.05] tracking-[-0.025em] text-ink
            "
          >
            Technologies I{" "}
            <span className="italic text-accent">build with.</span>
          </h2>
        </div>

        <div className="flex items-center gap-5 font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted">
          <span className="inline-flex items-center gap-2">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-accent"
            />
            {stack.length} Technologies
          </span>
          <span className="hidden sm:inline">Hover to pause</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.1, delay: 0.15 }}
        className="flex flex-col gap-3 sm:gap-4"
      >
        <MarqueeRow
          items={rowA}
          direction="left"
          speed={SPEED_A}
          label="Core technologies"
        />
        <MarqueeRow
          items={rowB}
          direction="right"
          speed={SPEED_B}
          label="Supporting technologies"
        />
      </motion.div>
    </section>
  );
}