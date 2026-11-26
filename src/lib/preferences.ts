/**
 * Theme and motion preferences.
 *
 * State lives on <html> as data-theme / data-motion so CSS can react before React hydrates.
 * PREFERENCES_SCRIPT runs inline in <head> (see app/layout.tsx) and applies the right values
 * before first paint, which prevents a flash of the wrong theme or a burst of unwanted motion.
 *
 * Theme: an explicit visitor choice saved in localStorage, else prefers-color-scheme.
 * Motion: always on, except when the operating system asks for reduced motion
 * (prefers-reduced-motion). There is no on-site animation switch, so no motion choice is stored.
 */

export const THEME_KEY = "mw-theme";

export type Theme = "light" | "dark";
export type Motion = "full" | "reduce";

/** Kept dependency-free and ES5 so it can be inlined verbatim. */
export const PREFERENCES_SCRIPT = `(function(){var d=document.documentElement;function g(k){try{return localStorage.getItem(k)}catch(e){return null}}function q(m){try{return window.matchMedia(m).matches}catch(e){return false}}var t=g("${THEME_KEY}");if(t!=="light"&&t!=="dark"){t=q("(prefers-color-scheme: dark)")?"dark":"light"}var m=q("(prefers-reduced-motion: reduce)")?"reduce":"full";d.setAttribute("data-theme",t);d.setAttribute("data-motion",m)})();`;

function readStorage(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(key: string, value: string | null) {
  try {
    if (value === null) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, value);
  } catch {
    /* private mode / storage disabled: the choice still applies for this page view */
  }
}

export function getSavedTheme(): Theme | null {
  const v = readStorage(THEME_KEY);
  return v === "light" || v === "dark" ? v : null;
}

export function systemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function systemMotion(): Motion {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "reduce" : "full";
}

export function applyTheme(theme: Theme, persist = true) {
  document.documentElement.setAttribute("data-theme", theme);
  if (persist) writeStorage(THEME_KEY, theme);
}

export function applyMotion(motion: Motion) {
  document.documentElement.setAttribute("data-motion", motion);
}

/** Subscribe to changes of an attribute on <html> (used with useSyncExternalStore). */
export function subscribeHtmlAttribute(attribute: string, callback: () => void): () => void {
  const observer = new MutationObserver((records) => {
    if (records.some((r) => r.attributeName === attribute)) callback();
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: [attribute] });
  return () => observer.disconnect();
}

export function readHtmlAttribute(attribute: string): string | null {
  return document.documentElement.getAttribute(attribute);
}
