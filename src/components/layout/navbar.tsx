"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { NAV_ITEMS, PERSONAL_INFO } from "@/data/navigation";
import { ThemeToggle } from "./theme-toggle";

const EASE = [0.22, 1, 0.36, 1] as const;

function BrandMark() {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className="h-10 w-10">
      <path d="M5 36V12L15 25L24 12L33 25V12" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="miter" />
      <path d="M15 30L21 38L27 30L33 38L43 18" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="miter" />
      <path d="M38 9H43V14" stroke="var(--accent)" strokeWidth="2" />
    </svg>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const reduce = Boolean(useReducedMotion());
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback((returnFocus = false) => {
    setOpen(false);
    if (returnFocus) {
      requestAnimationFrame(() => triggerRef.current?.focus());
    }
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    if (!open) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusFrame = requestAnimationFrame(() => {
      panelRef.current?.querySelector<HTMLAnchorElement>("a[href]")?.focus();
    });

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu(true);
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;

      const panel = panelRef.current;
      const elements = Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => el.getClientRects().length > 0);

      if (!elements.length) return;
      const first = elements[0];
      const last = elements[elements.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || !panel.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || !panel.contains(active))) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(focusFrame);
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, closeMenu]);

  const duration = reduce ? 0 : 0.58;

  return (
    <>
      <header
        className={`sticky top-0 z-[90] w-full border-b border-border transition-[background-color,box-shadow] duration-500 ${
          scrolled || open
            ? "bg-bg shadow-[0_9px_30px_rgba(0,0,0,0.045)]"
            : "bg-bg/95 backdrop-blur-xl"
        }`}
      >
        <div className="container-x flex h-[72px] items-center justify-between gap-4 sm:h-[78px]">
          <Link
            href="/"
            aria-label="MD Warish — Home"
            onClick={() => closeMenu()}
            className="inline-flex h-12 w-12 items-center justify-center text-ink transition-colors duration-300 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            <BrandMark />
          </Link>

          <div className="flex items-center gap-5 sm:gap-7">
            <Link
              href="/contact"
              onClick={() => closeMenu()}
              className="group inline-flex items-center gap-2 border-b border-accent pb-1 text-[13px] font-semibold text-ink transition-colors duration-300 hover:text-accent"
            >
              Let's Talk
              <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>

            {/* The two existing lines rotate into X; no circular background. */}
            <button
              ref={triggerRef}
              type="button"
              aria-label={open ? "Close navigation" : "Open navigation"}
              aria-expanded={open}
              aria-controls="site-navigation-panel"
              onClick={() => setOpen((wasOpen) => !wasOpen)}
              className="group relative inline-flex h-11 w-11 items-center justify-center bg-transparent text-ink transition-colors duration-300 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <span aria-hidden="true" className="relative block h-6 w-7">
                <motion.span
                  initial={false}
                  animate={{ y: open ? 0 : -5, rotate: open ? 45 : 0 }}
                  transition={{ duration: reduce ? 0 : 0.46, ease: EASE }}
                  className="absolute left-0 top-1/2 block h-[1.5px] w-7 -translate-y-1/2 bg-current"
                />
                <motion.span
                  initial={false}
                  animate={{ y: open ? 0 : 5, rotate: open ? -45 : 0 }}
                  transition={{ duration: reduce ? 0 : 0.46, ease: EASE }}
                  className="absolute left-0 top-1/2 block h-[1.5px] w-7 -translate-y-1/2 bg-current"
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence initial={false}>
        {open && (
            <motion.button
              key="drawer-backdrop"
              type="button"
              tabIndex={-1}
              aria-label="Close navigation"
              onClick={() => closeMenu(true)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.4, ease: EASE }}
              className="fixed inset-0 z-[70] cursor-default bg-[#030508]/55 backdrop-blur-[4px]"
            />
        )}
        {open && (
            <motion.aside
              key="navigation-drawer"
              id="site-navigation-panel"
              initial={reduce ? { opacity: 0 } : { x: "100%" }}
              animate={reduce ? { opacity: 1 } : { x: "0%" }}
              exit={reduce ? { opacity: 0 } : { x: "100%" }}
              transition={{ duration, ease: EASE }}
              className="fixed bottom-0 right-0 top-[72px] z-[80] w-full border-l border-border bg-bg shadow-[-25px_0_70px_rgba(0,0,0,0.13)] sm:top-[78px] sm:w-[min(430px,100%)]"
            >
              {/* Native ref only, avoiding motion/ref type mismatch. */}
              <div
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                aria-label="Site navigation"
                className="flex h-full min-h-0 flex-col overflow-y-auto overscroll-contain px-6 pb-7 pt-6 sm:px-9 sm:pb-9 sm:pt-8"
              >
                <p className="label-mono text-[10px]">Explore</p>

                <nav aria-label="Portfolio pages" className="mt-4">
                  <ul className="divide-y divide-border">
                    {NAV_ITEMS.map((item, index) => {
                      const active = item.href === "/"
                        ? pathname === "/"
                        : pathname === item.href || pathname.startsWith(`${item.href}/`);

                      return (
                        <motion.li
                          key={item.href}
                          initial={reduce ? false : { opacity: 0, x: 16 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: reduce ? 0 : 0.48,
                            delay: reduce ? 0 : 0.08 + index * 0.045,
                            ease: EASE,
                          }}
                        >
                          <Link
                            href={item.href}
                            aria-current={active ? "page" : undefined}
                            onClick={() => closeMenu()}
                            className="group flex min-h-[55px] items-center justify-between gap-4 py-2.5 sm:min-h-[59px]"
                          >
                            <span className={`font-display text-[clamp(1.65rem,3vw,2.15rem)] leading-[1.1] tracking-[-0.025em] transition-[color,transform] duration-300 group-hover:translate-x-1.5 ${
                              active ? "italic text-accent" : "text-ink group-hover:text-accent"
                            }`}>
                              {item.label}
                            </span>
                            <ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0 text-text-muted/65 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                          </Link>
                        </motion.li>
                      );
                    })}
                  </ul>
                </nav>

                <div className="mt-auto pt-7">
                  <div className="border-t border-border pt-3">
                    <ThemeToggle />
                  </div>
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5">
                    <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-text-muted">
                      Independent developer
                    </span>
                    {PERSONAL_INFO.email && (
                      <a
                        href={`mailto:${PERSONAL_INFO.email}`}
                        className="text-xs font-medium text-text-muted transition-colors hover:text-accent"
                      >
                        Email me
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
