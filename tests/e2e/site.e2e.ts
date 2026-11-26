/**
 * Browser tests. Run against a running site:
 *
 *   npm run build && npm run start          # terminal 1
 *   BASE_URL=http://localhost:3000 npm run test:e2e   # terminal 2
 *
 * Needs a Chromium for Playwright: `npx playwright install chromium`
 * (or set PW_EXECUTABLE_PATH to an installed Chrome).
 * The contact API is intercepted with page.route, so no real lead, sheet row or email is created.
 */
import assert from "node:assert/strict";
import { after, before, describe, it } from "node:test";
import { chromium, type Browser, type BrowserContext, type Page } from "playwright";

const BASE = (process.env.BASE_URL ?? "http://localhost:3000").replace(/\/$/, "");
const ROUTES = ["/", "/about", "/projects", "/services", "/experience", "/contact", "/resume"];
const CASE_STUDY = "/projects/limra-crm";

let browser: Browser;

before(async () => {
  browser = await chromium.launch({
    executablePath: process.env.PW_EXECUTABLE_PATH || undefined,
    args: ["--no-sandbox"],
  });
});
after(async () => {
  await browser?.close();
});

async function open(
  path: string,
  options: Parameters<Browser["newContext"]>[0] = {},
): Promise<{ context: BrowserContext; page: Page; errors: string[] }> {
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, ...options });
  const page = await context.newPage();
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  await page.goto(BASE + path, { waitUntil: "networkidle" });
  return { context, page, errors };
}

const attr = (page: Page, name: string) => page.evaluate((n) => document.documentElement.getAttribute(n), name);

describe("pages and navigation", () => {
  for (const route of [...ROUTES, CASE_STUDY]) {
    it(`${route} renders with one h1, a title, description and canonical, without errors`, async () => {
      const { context, page, errors } = await open(route);
      assert.equal(await page.locator("h1").count(), 1);
      assert.ok((await page.title()).includes("Md Warish"));
      const description = await page.locator('meta[name="description"]').getAttribute("content");
      assert.ok(description && description.length > 50);
      const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
      assert.match(canonical ?? "", /^https:\/\/mdwarish\.com/);
      assert.deepEqual(errors, []);
      await context.close();
    });
  }

  it("primary navigation reaches every section and marks the current page", async () => {
    const { context, page } = await open("/");
    for (const label of ["Work", "Services", "About", "Experience", "Resume"]) {
      const link = page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: label, exact: true });
      const href = (await link.getAttribute("href")) ?? "";
      await link.click();
      // prefetched routes change client-side without network traffic, so wait for the URL itself
      await page.waitForURL((url) => url.pathname === href);
      await page.waitForLoadState("networkidle");
      const current = page.getByRole("navigation", { name: "Primary" }).locator('[aria-current="page"]');
      assert.equal((await current.textContent())?.trim(), label);
    }
    await context.close();
  });

  it("supports browser back and forward", async () => {
    const { context, page } = await open("/");
    await page.getByRole("link", { name: "Explore My Work" }).first().click();
    await page.waitForURL(/\/projects\/?$/);
    await page.goBack();
    await page.waitForURL(new RegExp(`^${BASE}/?$`));
    await page.goForward();
    await page.waitForURL(/\/projects\/?$/);
    await context.close();
  });

  it("every case study in the index opens", async () => {
    const { context, page } = await open("/projects");
    const hrefs = await page.locator('[data-testid="project-index"] a[href^="/projects/"]').evaluateAll((as) => as.map((a) => a.getAttribute("href")));
    assert.ok(hrefs.length >= 6);
    for (const href of new Set(hrefs)) {
      const res = await page.goto(BASE + href, { waitUntil: "domcontentloaded" });
      assert.equal(res?.status(), 200, String(href));
    }
    await context.close();
  });

  it("unknown routes return the 404 page", async () => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const res = await page.goto(`${BASE}/this-page-does-not-exist`);
    assert.equal(res?.status(), 404);
    assert.match((await page.locator("h1").textContent()) ?? "", /doesn.t exist/);
    await context.close();
  });

  it("external links open safely", async () => {
    const { context, page } = await open(CASE_STUDY);
    const rels = await page.locator('a[target="_blank"]').evaluateAll((as) => as.map((a) => a.getAttribute("rel") ?? ""));
    assert.ok(rels.length > 0);
    for (const rel of rels) assert.match(rel, /noopener/);
    await context.close();
  });

  it("project filter narrows the index", async () => {
    const { context, page } = await open("/projects");
    const rows = page.locator('[data-testid="project-index"] > li');
    const total = await rows.count();
    await page.getByRole("button", { name: /Business software/ }).click();
    assert.equal(await rows.locator("visible=true").count(), 1);
    await page.getByRole("button", { name: /All work/ }).click();
    assert.equal(await rows.locator("visible=true").count(), total);
    await context.close();
  });
});

describe("theme", () => {
  it("follows the OS on first visit, before any interaction", async () => {
    const { context, page } = await open("/", { colorScheme: "dark" });
    assert.equal(await attr(page, "data-theme"), "dark");
    await context.close();
  });

  it("toggles and persists across reloads", async () => {
    const { context, page } = await open("/", { colorScheme: "light" });
    assert.equal(await attr(page, "data-theme"), "light");
    await page.getByTestId("theme-toggle").click();
    assert.equal(await attr(page, "data-theme"), "dark");
    assert.equal(await page.getByTestId("theme-toggle").getAttribute("aria-label"), "Switch to light theme");
    await page.reload({ waitUntil: "networkidle" });
    assert.equal(await attr(page, "data-theme"), "dark");
    const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    assert.equal(bg, "rgb(15, 15, 14)"); // --paper in the dark theme (#0f0f0e)
    await context.close();
  });
});

describe("motion preference", () => {
  it("is on by default, with no animation switch anywhere, and ignores a legacy saved 'off' choice", async () => {
    const { context, page } = await open("/", { reducedMotion: "no-preference" });
    assert.equal(await attr(page, "data-motion"), "full");
    assert.equal(await page.getByTestId("motion-toggle").count(), 0);
    await page.evaluate(() => localStorage.setItem("mw-motion", "reduce"));
    await page.reload({ waitUntil: "networkidle" });
    assert.equal(await attr(page, "data-motion"), "full");
    await context.close();
  });

  it("respects prefers-reduced-motion", async () => {
    const { context, page } = await open("/", { reducedMotion: "reduce" });
    assert.equal(await attr(page, "data-motion"), "reduce");
    await context.close();
  });

  it("runs the full hero entrance and SVG motion when motion is on, and only soft fades when reduced", async () => {
    const on = await open("/", { reducedMotion: "no-preference" });
    const running = await on.page.evaluate(() =>
      document.getAnimations().map((a) => (a as CSSAnimation).animationName).filter(Boolean),
    );
    for (const name of ["rise", "lift", "draw", "ha-in", "ha-flow", "trace"]) assert.ok(running.includes(name), `${name} runs`);
    await on.context.close();

    const off = await open("/", { reducedMotion: "reduce" });
    const names = await off.page.evaluate(() => ({
      entrances: [...document.querySelectorAll(".enter, .line__in")].map((el) => getComputedStyle(el).animationName),
      movement: [...document.querySelectorAll(".draw, .ha-in, .ha-flow, .ha-pulse, .pm-trace")].map((el) => getComputedStyle(el).animationName),
    }));
    assert.ok(names.entrances.every((n) => n === "fade"), `entrances fade: ${names.entrances.join(",")}`);
    assert.ok(names.movement.every((n) => n === "none"), `no movement or loops: ${names.movement.join(",")}`);
    await off.context.close();
  });

  it("reveals sections on scroll", async () => {
    const { context, page } = await open("/projects", { reducedMotion: "no-preference" });
    const target = page.locator(".wk-item").last();
    await target.scrollIntoViewIfNeeded();
    // Allow for the longest staggered entrance (delay + duration).
    await page.waitForTimeout(1800);
    // The runtime reveals an element once it passes the bottom 8% of the viewport; anything above that line must be visible.
    const hiddenAfterScroll = await page.evaluate(
      () => [...document.querySelectorAll("[data-reveal]")].filter((el) => {
        const r = el.getBoundingClientRect();
        return r.top < innerHeight * 0.9 && r.bottom > 0 && getComputedStyle(el).opacity === "0";
      }).length,
    );
    assert.equal(hiddenAfterScroll, 0);
    await context.close();
  });
});

describe("navbar never changes the animation setting (v1 bug regression)", () => {
  const animated = (page: Page) =>
    page.evaluate(() => document.getAnimations().map((a) => (a as CSSAnimation).animationName).filter(Boolean));

  it("shows no motion switch in the header or footer", async () => {
    const { context, page } = await open("/");
    assert.equal(await page.locator('[data-testid="motion-toggle"]').count(), 0);
    assert.equal(await page.locator("footer").getByText(/Animations/).count(), 0);
    await context.close();
  });

  it("animations keep running through repeated nav clicks, theme toggles, back and forward", async () => {
    const { context, page } = await open("/", { reducedMotion: "no-preference" });
    const nav = page.getByRole("navigation", { name: "Primary" });
    for (let round = 0; round < 3; round++) {
      for (const label of ["Work", "Services", "About", "Experience", "Resume"]) {
        await nav.getByRole("link", { name: label, exact: true }).click();
        await page.waitForLoadState("networkidle");
        assert.equal(await attr(page, "data-motion"), "full", `after clicking ${label} (round ${round + 1})`);
      }
      await page.getByTestId("theme-toggle").click();
      await page.getByTestId("theme-toggle").click();
      await page.getByRole("link", { name: /home/i }).first().click();
      await page.waitForURL((url) => url.pathname === "/");
      await page.waitForLoadState("networkidle");
      assert.equal(await attr(page, "data-motion"), "full");
      const names = await animated(page);
      assert.ok(names.includes("rise") && names.includes("draw"), `hero animates on return home (round ${round + 1}): ${names.join(",")}`);
    }
    await page.goBack();
    await page.waitForLoadState("networkidle");
    await page.goForward();
    await page.waitForLoadState("networkidle");
    assert.equal(await attr(page, "data-motion"), "full");
    assert.ok((await animated(page)).includes("rise"), "still animating after back/forward");
    assert.equal(await page.evaluate(() => localStorage.getItem("mw-motion")), null, "nothing was saved by navigation");
    await context.close();
  });

  it("opening and closing the mobile menu repeatedly never changes the setting", async () => {
    const { context, page } = await open("/", { viewport: { width: 390, height: 844 }, reducedMotion: "no-preference" });
    for (let i = 0; i < 6; i++) await page.getByTestId("menu-toggle").click();
    assert.equal(await attr(page, "data-motion"), "full");
    await page.getByTestId("menu-toggle").click();
    await page.getByTestId("mobile-menu").getByRole("link", { name: /Work/ }).click();
    await page.waitForLoadState("networkidle");
    assert.equal(await attr(page, "data-motion"), "full");
    await context.close();
  });
});

describe("process visual", () => {
  it("lights steps in sequence as they scroll in and highlights the latest one", async () => {
    const { context, page } = await open("/", { viewport: { width: 390, height: 700 }, reducedMotion: "no-preference" });
    const steps = page.locator("[data-process] .process__step");
    assert.equal(await steps.count(), 4);
    await steps.nth(0).scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    const current = async () =>
      page.evaluate(() => [...document.querySelectorAll("[data-process] .process__step")].findIndex((s) => s.getAttribute("data-current") === "true"));
    const first = await current();
    assert.ok(first >= 0, "a step is highlighted");
    await steps.nth(3).scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    assert.ok((await current()) > first, "highlight moves forward as you scroll");
    const visible = await steps.evaluateAll((els) => els.filter((e) => e.classList.contains("is-visible")).length);
    assert.equal(visible, 4);
    await context.close();
  });

  it("does not shift layout while steps animate", async () => {
    const { context, page } = await open("/", { reducedMotion: "no-preference" });
    const cls = await page.evaluate(async () => {
      let total = 0;
      new PerformanceObserver((list) => {
        for (const e of list.getEntries() as (PerformanceEntry & { value: number; hadRecentInput: boolean })[]) if (!e.hadRecentInput) total += e.value;
      }).observe({ type: "layout-shift", buffered: false });
      document.querySelector("[data-process]")?.scrollIntoView();
      await new Promise((r) => setTimeout(r, 1800));
      return total;
    });
    assert.ok(cls < 0.01, `layout shift during process animation: ${cls}`);
    await context.close();
  });
});

describe("first-visit intro", () => {
  const intro = (page: Page) =>
    page.evaluate(() => ({
      flag: document.documentElement.getAttribute("data-intro"),
      display: getComputedStyle(document.querySelector(".intro")!).display,
    }));

  it("plays once per session: not on internal navigation, not on refresh, again in a new session", async () => {
    const hidden = () => {
      const cs = getComputedStyle(document.querySelector(".intro")!);
      return cs.display === "none" || cs.visibility === "hidden";
    };
    const { context, page } = await open("/");
    assert.equal((await intro(page)).flag, "play", "plays on first load");
    await page.waitForFunction(hidden, null, { timeout: 6000 }); // and always clears itself
    for (const [label, path] of [["About", "/about"], ["Services", "/services"], ["Work", "/projects"]] as const) {
      await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: label, exact: true }).click();
      await page.waitForURL((url) => url.pathname === path);
      assert.ok(await page.evaluate(hidden), `no intro after navigating to ${path}`);
      await page.waitForFunction(() => !document.documentElement.hasAttribute("data-intro"), null, { timeout: 3000 });
    }
    await page.reload({ waitUntil: "networkidle" });
    assert.deepEqual(await intro(page), { flag: null, display: "none" }, "no intro on refresh in the same session");
    await context.close();

    const fresh = await open("/about");
    assert.equal((await intro(fresh.page)).flag, "play", "plays again in a new session");
    await fresh.context.close();
  });
});

describe("mobile", () => {
  it("has no horizontal overflow at 360px on any page", async () => {
    for (const route of [...ROUTES, CASE_STUDY]) {
      const { context, page } = await open(route, { viewport: { width: 360, height: 780 } });
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      assert.ok(overflow <= 1, `${route} overflows by ${overflow}px`);
      await context.close();
    }
  });

  it("opens and closes the menu with keyboard support", async () => {
    const { context, page } = await open("/", { viewport: { width: 390, height: 844 } });
    const button = page.getByTestId("menu-toggle");
    assert.equal(await button.getAttribute("aria-expanded"), "false");
    await button.click();
    assert.equal(await button.getAttribute("aria-expanded"), "true");
    await page.getByTestId("mobile-menu").getByRole("link", { name: /Services/ }).waitFor({ state: "visible" });
    await page.keyboard.press("Escape");
    assert.equal(await button.getAttribute("aria-expanded"), "false");
    assert.equal(await page.evaluate(() => document.activeElement?.getAttribute("data-testid")), "menu-toggle");
    await button.click();
    await page.getByTestId("mobile-menu").getByRole("link", { name: /Services/ }).click();
    await page.waitForURL(/\/services\/?$/);
    await context.close();
  });
});

describe("contact form", () => {
  async function fill(page: Page, message = "We need a CRM for three clinic branches with serial stock tracking.") {
    await page.getByLabel("Your name").fill("Priya Sharma");
    await page.getByLabel("Email").fill("priya@example.com");
    await page.getByLabel("Message").fill(message);
  }

  it("shows field errors without calling the API when required fields are missing", async () => {
    const { context, page } = await open("/contact");
    let calls = 0;
    await page.route("**/api/contact", (route) => {
      calls += 1;
      return route.fulfill({ status: 201, json: { ok: true, message: "ok" } });
    });
    await page.getByTestId("submit").click();
    assert.equal(calls, 0);
    assert.equal(await page.getByLabel("Your name").getAttribute("aria-invalid"), "true");
    assert.equal(await page.evaluate(() => document.activeElement?.id), "cf-name");
    await context.close();
  });

  it("submits once even on a double click, shows success and resets", async () => {
    const { context, page } = await open("/contact");
    const bodies: Record<string, unknown>[] = [];
    await page.route("**/api/contact", async (route) => {
      bodies.push(JSON.parse(route.request().postData() ?? "{}"));
      await new Promise((r) => setTimeout(r, 400));
      return route.fulfill({ status: 201, json: { ok: true, message: "Thanks — your message has been received." } });
    });
    await fill(page);
    await page.getByTestId("submit").dblclick();
    await page.getByTestId("form-status").waitFor();
    assert.equal(bodies.length, 1);
    assert.equal(bodies[0].intent, "freelance");
    assert.match(String(bodies[0].idempotencyKey), /^[A-Za-z0-9-]{16,64}$/);
    assert.match((await page.getByTestId("form-status").textContent()) ?? "", /received/);
    assert.equal(await page.getByLabel("Your name").inputValue(), "");
    await context.close();
  });

  it("shows server-side field errors", async () => {
    const { context, page } = await open("/contact");
    await page.route("**/api/contact", (route) =>
      route.fulfill({ status: 422, json: { ok: false, message: "Check fields", errors: { email: "That email address doesn't look right." } } }),
    );
    await fill(page);
    await page.getByTestId("submit").click();
    await page.locator("#email-error").waitFor();
    await context.close();
  });

  it("shows an error with the fallback email when the service is unavailable, and keeps the input", async () => {
    const { context, page } = await open("/contact");
    await page.route("**/api/contact", (route) =>
      route.fulfill({ status: 503, json: { ok: false, message: "The form is temporarily unavailable. Please email warishmohd987@gmail.com directly." } }),
    );
    await fill(page);
    await page.getByTestId("submit").click();
    await page.getByTestId("form-status").waitFor();
    assert.match((await page.getByTestId("form-status").textContent()) ?? "", /warishmohd987@gmail\.com/);
    assert.equal(await page.getByLabel("Your name").inputValue(), "Priya Sharma");
    await context.close();
  });

  it("preselects the enquiry type from the link", async () => {
    const { context, page } = await open("/contact?intent=job");
    // The choice is applied once the form hydrates, which can land just after network idle.
    await page.waitForFunction(() => (document.querySelector('input[name="intent"][value="job"]') as HTMLInputElement | null)?.checked === true, null, { timeout: 5000 });
    assert.equal(await page.getByRole("radio", { name: /Full-time opportunity/ }).isChecked(), true);
    assert.equal(await page.locator("#cf-type").count(), 0, "project type only shown for freelance");
    await context.close();
  });
});
