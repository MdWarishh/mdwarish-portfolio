import assert from "node:assert/strict";
import { describe, it } from "node:test";
import vm from "node:vm";
import { PREFERENCES_SCRIPT, THEME_KEY } from "@/lib/preferences";

/** Runs the inline <head> script in a sandbox with a fake document, storage and media queries. */
function run({
  stored = {},
  prefersDark = false,
  prefersReducedMotion = false,
  storageThrows = false,
}: {
  stored?: Record<string, string>;
  prefersDark?: boolean;
  prefersReducedMotion?: boolean;
  storageThrows?: boolean;
}) {
  const attrs: Record<string, string> = {};
  const context = {
    document: { documentElement: { setAttribute: (k: string, v: string) => (attrs[k] = v) } },
    localStorage: {
      getItem: (k: string) => {
        if (storageThrows) throw new Error("SecurityError");
        return stored[k] ?? null;
      },
    },
    window: {
      matchMedia: (q: string) => ({
        matches: q.includes("dark") ? prefersDark : q.includes("reduced-motion") ? prefersReducedMotion : false,
      }),
    },
  };
  vm.runInNewContext(PREFERENCES_SCRIPT, context);
  return attrs;
}

describe("preference bootstrap script", () => {
  it("defaults to light theme and full motion", () => {
    assert.deepEqual(run({}), { "data-theme": "light", "data-motion": "full" });
  });

  it("follows the OS when the visitor has not chosen", () => {
    const attrs = run({ prefersDark: true, prefersReducedMotion: true });
    assert.equal(attrs["data-theme"], "dark");
    assert.equal(attrs["data-motion"], "reduce");
  });

  it("lets an explicit theme choice override the OS — in both directions", () => {
    assert.equal(run({ stored: { [THEME_KEY]: "light" }, prefersDark: true })["data-theme"], "light");
    assert.equal(run({ stored: { [THEME_KEY]: "dark" }, prefersDark: false })["data-theme"], "dark");
  });

  it("keeps motion on, ignoring any legacy stored motion choice, unless the OS asks for reduced motion", () => {
    assert.equal(run({ stored: { "mw-motion": "reduce" } })["data-motion"], "full");
    assert.equal(run({ stored: { "mw-motion": "full" }, prefersReducedMotion: true })["data-motion"], "reduce");
  });

  it("ignores corrupted stored values", () => {
    const attrs = run({ stored: { [THEME_KEY]: "purple" }, prefersDark: true });
    assert.equal(attrs["data-theme"], "dark");
    assert.equal(attrs["data-motion"], "full");
  });

  it("still works when storage is blocked", () => {
    const attrs = run({ storageThrows: true, prefersReducedMotion: true });
    assert.equal(attrs["data-motion"], "reduce");
    assert.equal(attrs["data-theme"], "light");
  });
});
