/**
 * Single source of truth for identity, links and navigation.
 * Every value here was verified against existing material (see HANDOVER.md → Content sources).
 */

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://mdwarish.com").replace(/\/$/, "");

export const PERSON = {
  name: "Md Warish",
  givenName: "Warish",
  title: "Full-Stack Software Engineer",
  email: "warishmohd987@gmail.com",
  github: "https://github.com/MdWarishh",
  githubHandle: "MdWarishh",
  linkedin: "https://www.linkedin.com/in/md-warish/",
  region: "Delhi NCR, India",
  /** Shown in the hero and resume. Sourced from the existing site's availability statement. */
  availability: "Open to freelance projects and full-time engineering roles",
  education: {
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "Khwaja Moinuddin Chishti Language University, Lucknow",
    period: "2022 – 2025",
  },
} as const;

export const SITE = {
  name: "Md Warish",
  domain: "mdwarish.com",
  description:
    "Md Warish is a full-stack software engineer in Delhi NCR building websites, web applications, CRM systems and B2B platforms with Next.js, React, Node.js and PostgreSQL.",
  locale: "en_IN",
} as const;

export type NavItem = { label: string; href: string };

export const NAV_ITEMS: NavItem[] = [
  { label: "Work", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experience" },
  { label: "Resume", href: "/resume" },
];

export const CONTACT_CTA = { label: "Discuss a Project", href: "/contact?intent=freelance" } as const;
