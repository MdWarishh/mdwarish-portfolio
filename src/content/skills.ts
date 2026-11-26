import type { TechId } from "@/components/icons/tech-icons";

export type SkillGroup = { title: string; note: string; icons: TechId[]; text: string[] };

/** Grouped exactly as listed by Md Warish. Items without a reliable brand mark are shown as text. */
export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: "Frontend",
    note: "Interfaces, dashboards and websites",
    icons: ["nextjs", "react", "typescript", "javascript", "angular", "tailwindcss"],
    text: [],
  },
  {
    title: "Backend",
    note: "APIs, business logic and integrations",
    icons: ["nodejs", "express", "java", "springboot"],
    text: ["REST APIs"],
  },
  {
    title: "Database",
    note: "Data modelling and queries",
    icons: ["mongodb", "postgresql", "prisma"],
    text: [],
  },
  {
    title: "Tools & infrastructure",
    note: "Shipping and running software",
    icons: ["git", "github", "nginx", "googlesheets"],
    text: ["VPS deployment", "API integrations", "Nodemailer"],
  },
];
