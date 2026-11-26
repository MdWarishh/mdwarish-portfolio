import type { ExperienceItem } from "@/types/content";

/**
 * Roles as stated by Md Warish. Dates stay undefined until confirmed —
 * add e.g. period: "Jan 2025 – Present" and they appear everywhere.
 */
export const EXPERIENCE: ExperienceItem[] = [
  {
    id: "futurex",
    company: "Futurex Trade Fair & Events Pvt. Ltd.",
    companyUrl: "https://futurextrade.com/",
    role: "Full-Stack Development & Solutions Architecture",
    location: "New Delhi",
    summary:
      "Futurex runs B2B trade shows across India, Nepal, Bangladesh, Sri Lanka and East Africa. I build and run the websites behind them.",
    highlights: [
      "Built the group website and its calendar of upcoming shows.",
      "Built exhibition sites for shows in Odisha and Kathmandu: stall booking, visitor sign-up, downloads.",
      "Set up metadata, social cards, indexing and cookie consent across the sites.",
      "Plan how each site is structured and deployed so new editions launch on the same base.",
    ],
    stack: ["nextjs", "react", "typescript", "tailwindcss", "nodejs"],
    relatedProjects: [
      "futurex-group-corporate-website",
      "odisha-mining-expo",
      "nepal-wood-international-expo",
      "nepal-electric-power-lights-expo",
      "nepal-buildcon-expo",
      "futurex-studio",
    ],
  },
  {
    id: "nodalxpoint",
    company: "NodalXPoint",
    role: "Full Stack Developer Intern",
    summary: "My internship in full-stack web development — where I started working across the frontend, the API and the database of one product.",
    highlights: [],
    stack: [],
    relatedProjects: [],
  },
];
