import type { TechId } from "@/components/icons/tech-icons";

export type ProjectCategory = "business-app" | "corporate" | "exhibition";

export type CoverMotif = "schema" | "network" | "grain" | "contour" | "waveform" | "fold" | "frame" | "grid";

export type ProjectLink = { label: string; href: string; note?: string };

export type Shot = { src: string; alt: string; width: number; height: number; caption: string };

export type CaseSection ={ heading: string; body: string[] };

export type Project = {
  slug: string;
  title: string;
  client: string;
  category: ProjectCategory;
  sector: string;
  /** One sentence used on cards and in meta descriptions. */
  summary: string;
  role: string;
  /** Year the work was live / last verified. */
  year: string;
  stack: TechId[];
  /** Plain-text stack items without a reliable brand icon. */
  stackExtra?: string[];
  links: ProjectLink[];
  featured: boolean;
  cover: { motif: CoverMotif; label: string };
  /**
   * Real screenshots captured from the live project (see HANDOVER.md → Screenshots).
   * The first image is the card/cover image. Never point this at a mock-up.
   */
  gallery: Shot[];
  overview: string;
  problem: string;
  objective: string;
  contribution: string[];
  architecture: CaseSection;
  implementation: CaseSection[];
  challenges: { challenge: string; solution: string }[];
  /** What is publicly verifiable about the project; no invented metrics. */
  evidence: string[];
  /** Module-by-module breakdown, verified against the source code (Limra CRM only). */
  modules?: { name: string; does: string }[];
};

export type ExperienceItem = {
  id: string;
  company: string;
  companyUrl?: string;
  role: string;
  /** Leave undefined until dates are confirmed — the UI hides the field rather than inventing one. */
  period?: string;
  location?: string;
  summary: string;
  highlights: string[];
  stack: TechId[];
  relatedProjects: string[];
};

export type Service = {
  slug: string;
  title: string;
  lede: string;
  includes: string[];
  forWho: string;
  problem: string;
  deliverables: string[];
};
