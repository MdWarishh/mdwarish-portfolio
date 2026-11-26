/**
 * First-visit intro (see components/layout/IntroLoader.tsx).
 *
 * Lifecycle:
 *  - fresh browser session, first page load → plays once
 *  - client-side navigation → never (the layout, and this script, do not run again)
 *  - refresh in the same session → never (the session flag is already set)
 *  - new browser session (new tab/window after closing, or a new context) → plays again
 *
 * INTRO_SCRIPT runs inline in <head> before first paint, so there is no flash of the page before
 * the intro and no hydration mismatch (React never renders data-intro; <html> already has
 * suppressHydrationWarning for the theme attributes). The flag is written *before* the intro plays,
 * so an interrupted intro is never repeated. If storage is unavailable the intro is skipped.
 */
export const INTRO_KEY = "mw-intro";

/** Kept dependency-free and ES5 so it can be inlined verbatim. */
export const INTRO_SCRIPT = `(function(){try{var s=window.sessionStorage;if(s.getItem("${INTRO_KEY}"))return;s.setItem("${INTRO_KEY}","1");document.documentElement.setAttribute("data-intro","play")}catch(e){}})();`;
