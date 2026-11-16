export type ProjectCategory =
  | "CRM & Applications"
  | "E-commerce"
  | "Exhibition & B2B Websites";

export interface Project {
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: ProjectCategory;
  technologies: string[];
  image: string;
  hasRealScreenshot?: boolean;
  gallery?: string[];
  liveUrl?: string;
  frontendGithub?: string;
  backendGithub?: string;
  contribution: string;
  keyFeatures: string[];
  featured: boolean;
  loginRequired?: boolean;
  year?: string;
  accentColor?: string;
}

export interface SkillGroup {
  id: string;
  number: string;
  category: string;
  description: string;
  skills: {
    name: string;
    role: string;
  }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  summary: string;
  responsibilities: string[];
  technologies: string[];
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  deliverables: string[];
}

export interface NavItem {
  label: string;
  href: string;
  number: string;
}
