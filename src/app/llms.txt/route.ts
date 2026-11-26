import { TECH_ICONS } from "@/components/icons/tech-icons";
import { NAV_ITEMS, PERSON, SITE } from "@/config/site";
import { EXPERIENCE } from "@/content/experience";
import { CATEGORY_LABELS, PROJECTS } from "@/content/projects";
import { SERVICES } from "@/content/services";
import { SKILL_GROUPS } from "@/content/skills";
import { absoluteUrl } from "@/lib/seo";

/**
 * /llms.txt — a plain-text map of the site for language-model crawlers (llmstxt.org format).
 * Built at build time from the same content files the pages render, so it can never say anything
 * the site does not. It is a convenience for AI tools, not a ranking or indexing guarantee.
 */
export const dynamic = "force-static";

export function GET() {
  const lines = [
    `# ${PERSON.name}`,
    "",
    `> ${SITE.description}`,
    "",
    `${PERSON.name} is a ${PERSON.title.toLowerCase()} based in ${PERSON.region}, working with clients in Delhi, Noida, Gurgaon, across India and abroad. ${PERSON.availability}.`,
    "",
    "## Contact",
    "",
    `- Email: ${PERSON.email}`,
    `- Contact form: ${absoluteUrl("/contact")}`,
    `- GitHub: ${PERSON.github}`,
    `- LinkedIn: ${PERSON.linkedin}`,
    "",
    "## Pages",
    "",
    `- [Home](${absoluteUrl("/")}): who ${PERSON.givenName} is and what he builds`,
    ...NAV_ITEMS.map((n) => `- [${n.label}](${absoluteUrl(n.href)})`),
    `- [Contact](${absoluteUrl("/contact")})`,
    "",
    "## Services",
    "",
    ...SERVICES.map((s) => `- [${s.title}](${absoluteUrl(`/services#${s.slug}`)}): ${s.lede}`),
    "",
    "## Projects",
    "",
    ...PROJECTS.map((p) => {
      const live = p.links.map((l) => `${l.label} ${l.href}`).join("; ");
      return `- [${p.title}](${absoluteUrl(`/projects/${p.slug}`)}) (${CATEGORY_LABELS[p.category]}, ${p.year}): ${p.summary} Role: ${p.role}. Links: ${live}`;
    }),
    "",
    "## Experience",
    "",
    ...EXPERIENCE.map((e) => `- ${e.role}, ${e.company}${e.location ? ` (${e.location})` : ""}: ${e.summary}`),
    `- Education: ${PERSON.education.degree}, ${PERSON.education.institution} (${PERSON.education.period})`,
    "",
    "## Skills",
    "",
    ...SKILL_GROUPS.map((g) => `- ${g.title}: ${[...g.icons.map((id) => TECH_ICONS[id].label), ...g.text].join(", ")}`),
    "",
  ];
  return new Response(lines.join("\n"), {
    headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=3600" },
  });
}
