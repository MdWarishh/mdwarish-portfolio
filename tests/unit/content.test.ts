import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, it } from "node:test";
import { TECH_ICONS } from "@/components/icons/tech-icons";
import { EXPERIENCE } from "@/content/experience";
import { getRelatedProjects, PROJECTS } from "@/content/projects";
import { SERVICES } from "@/content/services";
import { SKILL_GROUPS } from "@/content/skills";

const root = process.cwd();

/** Lists "file:line" hits for a pattern across source folders (user-facing copy lives in .ts/.tsx). */
function grepSource(pattern: RegExp, dirs = ["src"]): string[] {
  const hits: string[] = [];
  const walk = (dir: string) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (/\.(tsx?|css)$/.test(entry.name)) {
        readFileSync(full, "utf8")
          .split("\n")
          .forEach((line, i) => {
            // comments may legitimately describe history (e.g. the v1 bug note)
            if (pattern.test(line) && !/^\s*(\*|\/\/|\/\*)/.test(line)) hits.push(`${path.relative(root, full)}:${i + 1}`);
          });
      }
    }
  };
  dirs.forEach((d) => walk(path.join(root, d)));
  return hits;
}

/** Reads width/height from a WebP header (VP8, VP8L or VP8X). */
function webpSize(file: string): { width: number; height: number } {
  const b = readFileSync(file);
  assert.equal(b.toString("ascii", 0, 4), "RIFF");
  const chunk = b.toString("ascii", 12, 16);
  if (chunk === "VP8 ") return { width: b.readUInt16LE(26) & 0x3fff, height: b.readUInt16LE(28) & 0x3fff };
  if (chunk === "VP8L") {
    const bits = b.readUInt32LE(21);
    return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
  }
  if (chunk === "VP8X") return { width: b.readUIntLE(24, 3) + 1, height: b.readUIntLE(27, 3) + 1 };
  throw new Error(`unknown webp chunk ${chunk}`);
}

describe("project content integrity", () => {
  it("has unique slugs", () => {
    const slugs = PROJECTS.map((p) => p.slug);
    assert.equal(new Set(slugs).size, slugs.length);
  });

  it("shows Limra CRM once, never as a separate InventoryPro project", () => {
    const crm = PROJECTS.filter((p) => /limra|inventory/i.test(`${p.slug} ${p.title}`));
    assert.equal(crm.length, 1);
    assert.equal(crm[0].title, "Limra CRM");
    assert.equal(crm[0].slug, "limra-crm");
  });

  it("never uses the old 'Limra Hearing Clinic CRM' wording anywhere in the source", () => {
    const hits = grepSource(/Limra Hearing Clinic CRM|hearing clinic crm/i);
    assert.deepEqual(hits, []);
  });

  it("lists the CRM's modules — every one backed by a backend module or dashboard route", () => {
    const crm = PROJECTS.find((p) => p.slug === "limra-crm")!;
    const names = (crm.modules ?? []).map((m) => m.name);
    assert.equal(names.length, 18);
    for (const expected of ["Dashboard", "Sales", "Invoices & billing", "Dealers", "Attendance", "Expenses", "Reports", "Users, roles & permissions"]) {
      assert.ok(names.includes(expected), expected);
    }
    // No module that does not exist in the code base
    assert.ok(!names.some((n) => /customer/i.test(n)), "there is no separate customers module in the code");
  });

  it("does not include Fusion POS anywhere in the content", () => {
    const blob = JSON.stringify({ PROJECTS, EXPERIENCE, SERVICES });
    assert.doesNotMatch(blob, /fusion\s*pos/i);
  });

  it("references only real screenshot files, with correct dimensions", () => {
    for (const project of PROJECTS) {
      assert.ok(project.gallery.length > 0, `${project.slug} has at least one image`);
      for (const shot of project.gallery) {
        const file = path.join(root, "public", shot.src);
        assert.ok(existsSync(file), `${shot.src} exists`);
        assert.deepEqual(webpSize(file), { width: shot.width, height: shot.height }, `${shot.src} size`);
        assert.ok(shot.alt.length > 20, `${shot.src} has descriptive alt text`);
      }
    }
  });

  it("uses only known technology icons", () => {
    for (const p of PROJECTS) for (const id of p.stack) assert.ok(id in TECH_ICONS, `${p.slug}: ${id}`);
    for (const g of SKILL_GROUPS) for (const id of g.icons) assert.ok(id in TECH_ICONS, `${g.title}: ${id}`);
  });

  it("links experience to existing projects", () => {
    const slugs = new Set(PROJECTS.map((p) => p.slug));
    for (const e of EXPERIENCE) for (const s of e.relatedProjects) assert.ok(slugs.has(s), s);
  });

  it("finds related projects for every case study", () => {
    for (const p of PROJECTS) {
      const related = getRelatedProjects(p.slug, 2);
      assert.equal(related.length, 2);
      assert.ok(related.every((r) => r.slug !== p.slug));
    }
  });

  it("uses https for every external link", () => {
    for (const p of PROJECTS) for (const l of p.links) assert.match(l.href, /^https:\/\//);
  });

  it("contains no banned generic slogans", () => {
    const banned = [
      /turning ideas into reality/i,
      /crafting/i,
      /passionate/i,
      /code is my superpower/i,
      /one line at a time/i,
      /cutting[- ]edge/i,
      /seamless/i,
      /robust/i,
      /leverag/i,
      /synerg/i,
      /world[- ]class/i,
    ];
    for (const b of banned) assert.deepEqual(grepSource(b, ["src/app", "src/content", "src/components"]), [], String(b));
  });
});
