"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTheme } from "next-themes";
import { ArrowUpRight } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

function ThemeIllustration({ dark, reduce }: { dark: boolean; reduce: boolean }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className="h-9 w-9 shrink-0">
      <AnimatePresence mode="wait" initial={false}>
        <motion.g
          key={dark ? "night" : "day"}
          initial={reduce ? false : { opacity: 0, rotate: dark ? -15 : 15, scale: 0.85 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.85 }}
          transition={{ duration: reduce ? 0 : 0.38, ease: EASE }}
          style={{ transformOrigin: "24px 24px" }}
        >
          {dark ? (
            <>
              <path
                d="M34 31A14 14 0 0 1 17 14A14 14 0 1 0 34 31Z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
              <path d="M34 8v8m-4-4h8M39 22v4m-2-2h4" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" />
            </>
          ) : (
            <>
              <path d="M13 29a11 11 0 0 1 22 0M7 32h34M13 37h22" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              <path d="M24 5v6M10.5 11l4.2 4.2M37.5 11l-4.2 4.2M5 24h6M37 24h6" stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="round" />
            </>
          )}
        </motion.g>
      </AnimatePresence>
    </svg>
  );
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const reduce = Boolean(useReducedMotion());
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const dark = !mounted || resolvedTheme !== "light";
  const next = dark ? "light" : "dark";

  return (
    <button
      type="button"
      disabled={!mounted}
      onClick={() => setTheme(next)}
      aria-label={`Switch to ${next} theme`}
      className="group flex min-h-14 w-full items-center justify-between gap-4 bg-transparent p-0 text-left text-ink transition-colors duration-300 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent disabled:cursor-default"
    >
      <span className="flex min-w-0 items-center gap-3.5">
        <ThemeIllustration dark={dark} reduce={reduce} />
        <span className="flex flex-col gap-1">
          <span className="text-[13px] font-semibold tracking-[-0.01em]">
            {dark ? "Light appearance" : "Dark appearance"}
          </span>
          <span className="font-mono text-[10px] text-text-muted">
            {dark ? "Currently dark" : "Currently light"}
          </span>
        </span>
      </span>
      <ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0 text-text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </button>
  );
}
