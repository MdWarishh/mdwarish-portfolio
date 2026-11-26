/**
 * Re-capture real screenshots of the live project websites.
 *
 *   npm run screenshots              # all public projects
 *   npm run screenshots -- nepal-wood-1
 *
 * Requires the `playwright` dev dependency and a browser: `npx playwright install chromium`.
 * Output: public/images/projects/<name>.webp (via sharp, which Next.js installs) or .jpg as fallback.
 * The Limra CRM is behind a login, so only its public login screen is captured.
 */
import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const OUT = path.join(process.cwd(), "public", "images", "projects");

/** name → [url, scrollY]. Keep in sync with src/content/projects.ts. */
const SHOTS = {
  "futurex-trade-1": ["https://futurextrade.com/", 0],
  "futurex-trade-2": ["https://futurextrade.com/", 1100],
  "futurex-studio-1": ["https://futurexstudio.com/", 0],
  "futurex-studio-2": ["https://futurexstudio.com/", 1100],
  "odisha-mining-1": ["https://odishaminingexpo.com/", 0],
  "odisha-mining-2": ["https://odishaminingexpo.com/", 1250],
  "nepal-wood-1": ["https://nepalwood.com.np/", 0],
  "nepal-wood-2": ["https://nepalwood.com.np/", 1000],
  "nepal-power-1": ["https://nepalpowerelec.com/", 0],
  "nepal-power-2": ["https://nepalpowerelec.com/", 1450],
  "propack-odisha-1": ["https://propackodisha.com/", 0],
  "propack-odisha-2": ["https://propackodisha.com/", 1100],
  "nepal-buildcon-1": ["https://www.nepalbuildcon.com.np/", 0],
  "nepal-buildcon-2": ["https://www.nepalbuildcon.com.np/", 2000],
  "limra-crm-login": ["https://crm.limrahearingcare.com/auth/login", 0],
};

let sharp = null;
try {
  sharp = (await import("sharp")).default;
} catch {
  console.warn("sharp not found — saving JPEG files instead of WebP. Update the paths in projects.ts if you keep them.");
}

const only = process.argv.slice(2);
const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 1 });
await mkdir(OUT, { recursive: true });

for (const [name, [url, scrollY]] of Object.entries(SHOTS)) {
  if (only.length && !only.includes(name)) continue;
  const page = await context.newPage();
  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 45_000 });
    // Decline optional cookies where a banner offers it, so it is not in the shot.
    for (const label of [/reject non-essential/i, /reject optional/i]) {
      const button = page.getByRole("button", { name: label });
      if (await button.count()) await button.first().click().catch(() => {});
    }
    await page.evaluate((y) => window.scrollTo(0, y), scrollY);
    await page.waitForTimeout(1500);
    const png = await page.screenshot({ type: "png" });
    if (sharp) {
      await sharp(png).resize(1280, 800).webp({ quality: 82 }).toFile(path.join(OUT, `${name}.webp`));
    } else {
      await writeFile(path.join(OUT, `${name}.jpg`), await page.screenshot({ type: "jpeg", quality: 85 }));
    }
    console.log(`✓ ${name}`);
  } catch (error) {
    console.error(`✗ ${name}: ${error.message}`);
  } finally {
    await page.close();
  }
}
await browser.close();
console.log("Done. If you changed image sizes, update width/height in src/content/projects.ts (default 800×500).");
