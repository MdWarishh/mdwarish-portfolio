"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { applyMotion, systemMotion } from "@/lib/preferences";

/**
 * The only JavaScript behind the site's motion. Animations are always on; the only thing that
 * changes the motion setting is the OS reduced-motion preference, which it follows live.
 *  - [data-reveal] → .is-visible once, the first time it enters the viewport (or is scrolled past)
 *  - [data-process] steps → .is-visible as each enters; the latest gets data-current="true"
 *  - [data-ambient] → data-paused while offscreen, so looping SVG work stops costing paint time
 * Re-scans on every route change. Nothing runs per frame.
 */
export function MotionRuntime() {
  const pathname = usePathname();
  const firstPath = useRef(pathname);

  // The first-visit intro belongs to the page it opened on. On the first client-side navigation,
  // drop its flag so later pages never wait for it (the intro itself never replays: see lib/intro.ts).
  useEffect(() => {
    if (pathname !== firstPath.current) document.documentElement.removeAttribute("data-intro");
  }, [pathname]);

  // Route-change fade (.page-enter, app/template.tsx) only for client-side navigations. The page
  // that was server-rendered is marked first, in the same tick, so it never fades or flashes.
  useEffect(() => {
    const html = document.documentElement;
    document.querySelectorAll(".page-enter").forEach((el) => el.classList.add("page-enter--initial"));
    html.setAttribute("data-nav", "");
  }, []);

  // Colour crossfade only after hydration (no transition on first paint).
  useEffect(() => {
    const id = requestAnimationFrame(() => document.documentElement.classList.add("theme-ready"));
    return () => cancelAnimationFrame(id);
  }, []);

  // Follow live OS reduced-motion changes.
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => applyMotion(systemMotion());
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  // Header border once scrolled.
  useEffect(() => {
    const header = document.querySelector<HTMLElement>("[data-site-header]");
    if (!header) return;
    let ticking = false;
    const update = () => {
      header.dataset.scrolled = window.scrollY > 8 ? "true" : "false";
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    const reveals = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)"));
    const ambient = Array.from(document.querySelectorAll<HTMLElement>("[data-ambient]"));
    const processes = Array.from(document.querySelectorAll<HTMLElement>("[data-process]"));
    const steps = processes.flatMap((p) => Array.from(p.querySelectorAll<HTMLElement>(".process__step")));

    const markCurrent = (list: HTMLElement) => {
      const all = Array.from(list.querySelectorAll<HTMLElement>(".process__step"));
      const visible = all.filter((s) => s.classList.contains("is-visible"));
      const current = visible[visible.length - 1];
      all.forEach((s) => s.setAttribute("data-current", s === current ? "true" : "false"));
    };

    if (!("IntersectionObserver" in window)) {
      [...reveals, ...steps].forEach((el) => el.classList.add("is-visible"));
      processes.forEach(markCurrent);
      return;
    }

    // Anything already in view is revealed immediately so the first screen never waits.
    const fold = window.innerHeight * 0.92;
    reveals.forEach((el) => {
      if (el.getBoundingClientRect().top < fold) el.classList.add("is-visible");
    });
    html.classList.add("reveal-armed");

    const pending = new Set(reveals.filter((el) => !el.classList.contains("is-visible")));
    const reveal = (el: Element) => {
      el.classList.add("is-visible");
      revealObserver.unobserve(el);
      pending.delete(el as HTMLElement);
      if (!pending.size) window.removeEventListener("scroll", onScrollCatchUp);
    };
    const revealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) reveal(entry.target);
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    pending.forEach((el) => revealObserver.observe(el));

    // A fast jump (End key, scrollbar drag) can carry an element past the viewport without it ever
    // intersecting, which would leave it hidden. Anything already scrolled past is shown at once.
    let catchUpFrame = 0;
    const catchUp = () => {
      catchUpFrame = 0;
      for (const el of pending) if (el.getBoundingClientRect().top < 0) reveal(el);
    };
    const onScrollCatchUp = () => {
      if (!catchUpFrame) catchUpFrame = requestAnimationFrame(catchUp);
    };
    if (pending.size) window.addEventListener("scroll", onScrollCatchUp, { passive: true });

    // Process steps: sequenced by CSS delays; the highlight follows the most recently revealed step.
    const stepObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          stepObserver.unobserve(entry.target);
          const list = entry.target.closest<HTMLElement>("[data-process]");
          if (list) markCurrent(list);
        }
      },
      { rootMargin: "0px 0px -18% 0px", threshold: 0.5 },
    );
    steps.forEach((s) => stepObserver.observe(s));

    // Desktop: hover/focus moves the highlight.
    const onEnter = (event: Event) => {
      const step = (event.target as HTMLElement).closest<HTMLElement>(".process__step");
      const list = step?.closest<HTMLElement>("[data-process]");
      if (!step || !list || !step.classList.contains("is-visible")) return;
      list.querySelectorAll(".process__step").forEach((s) => s.setAttribute("data-current", s === step ? "true" : "false"));
    };
    processes.forEach((p) => p.addEventListener("pointerover", onEnter));

    const ambientObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) (entry.target as HTMLElement).dataset.paused = entry.isIntersecting ? "false" : "true";
    });
    ambient.forEach((el) => ambientObserver.observe(el));

    return () => {
      window.removeEventListener("scroll", onScrollCatchUp);
      cancelAnimationFrame(catchUpFrame);
      revealObserver.disconnect();
      stepObserver.disconnect();
      ambientObserver.disconnect();
      processes.forEach((p) => p.removeEventListener("pointerover", onEnter));
    };
  }, [pathname]);

  return null;
}
