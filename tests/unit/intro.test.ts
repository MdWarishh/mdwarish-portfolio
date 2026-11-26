import assert from "node:assert/strict";
import { describe, it } from "node:test";
import vm from "node:vm";
import { INTRO_KEY, INTRO_SCRIPT } from "@/lib/intro";

/** Runs the inline intro script against a fake document and sessionStorage. */
function run(session: Record<string, string>, { storageThrows = false } = {}) {
  const attrs: Record<string, string> = {};
  const context = {
    document: { documentElement: { setAttribute: (k: string, v: string) => (attrs[k] = v) } },
    window: {
      get sessionStorage() {
        if (storageThrows) throw new Error("SecurityError");
        return {
          getItem: (k: string) => session[k] ?? null,
          setItem: (k: string, v: string) => (session[k] = v),
        };
      },
    },
  };
  vm.runInNewContext(INTRO_SCRIPT, context);
  return attrs;
}

describe("first-visit intro script", () => {
  it("plays on the first load of a session and records it", () => {
    const session: Record<string, string> = {};
    assert.deepEqual(run(session), { "data-intro": "play" });
    assert.equal(session[INTRO_KEY], "1");
  });

  it("does not play again in the same session (refresh)", () => {
    const session: Record<string, string> = {};
    run(session);
    assert.deepEqual(run(session), {});
  });

  it("is skipped, without throwing, when storage is unavailable", () => {
    assert.deepEqual(run({}, { storageThrows: true }), {});
  });
});
