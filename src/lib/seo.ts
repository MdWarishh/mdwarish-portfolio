import type { Metadata } from "next";
import { PERSON, SITE, SITE_URL } from "@/config/site";

export const absoluteUrl = (path = "/") => `${SITE_URL}${path === "/" ? "" : path}`;

/** The site-wide social card (app/opengraph-image.png, 1200×630). */
const OG_IMAGE = {
  url: "/opengraph-image.png",
  width: 1200,
  height: 630,
  alt: `${PERSON.name} — ${PERSON.title} in Delhi NCR`,
};

/**
 * Per-page metadata with canonical URL, Open Graph and Twitter card.
 * `title` goes through the layout template ("%s — Md Warish") unless `absoluteTitle` is set; the
 * social title is always the full title, and every page carries the social image (a page-level
 * openGraph object replaces the layout's, so the image must be set here).
 */
export function pageMetadata({
  title,
  description,
  path,
  ogType = "website",
  absoluteTitle = false,
  image = OG_IMAGE,
}: {
  title: string;
  description: string;
  path: string;
  ogType?: "website" | "article" | "profile";
  absoluteTitle?: boolean;
  image?: { url: string; width: number; height: number; alt: string };
}): Metadata {
  const url = absoluteUrl(path);
  const fullTitle = absoluteTitle ? title : `${title} — ${PERSON.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: ogType,
      url,
      title: fullTitle,
      description,
      siteName: SITE.name,
      locale: SITE.locale,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image.url],
    },
  };
}

const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export function personJsonLd() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: PERSON.name,
    givenName: PERSON.givenName,
    url: SITE_URL,
    image: absoluteUrl("/images/md-warish-portrait.webp"),
    jobTitle: PERSON.title,
    description: SITE.description,
    email: `mailto:${PERSON.email}`,
    address: { "@type": "PostalAddress", addressRegion: "Delhi NCR", addressCountry: "IN" },
    hasOccupation: {
      "@type": "Occupation",
      name: PERSON.title,
      occupationLocation: { "@type": "AdministrativeArea", name: "Delhi NCR, India" },
      skills: "Next.js, React, TypeScript, Node.js, Express, PostgreSQL, MongoDB, Prisma",
    },
    worksFor: { "@type": "Organization", name: "Futurex Trade Fair & Events Pvt. Ltd.", url: "https://futurextrade.com/" },
    alumniOf: { "@type": "CollegeOrUniversity", name: PERSON.education.institution },
    knowsLanguage: ["English", "Hindi"],
    knowsAbout: [
      "Full-stack web development",
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "MongoDB",
      "Prisma",
      "CRM development",
      "B2B and exhibition websites",
    ],
    sameAs: [PERSON.github, PERSON.linkedin],
  };
}

export function websiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: SITE.name,
    description: SITE.description,
    inLanguage: "en-IN",
    publisher: { "@id": PERSON_ID },
    about: { "@id": PERSON_ID },
  };
}

export function profilePageJsonLd(path: string) {
  return {
    "@type": "ProfilePage",
    "@id": `${absoluteUrl(path)}#profile`,
    url: absoluteUrl(path),
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: { "@id": PERSON_ID },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}

/** Serialise JSON-LD safely for an inline <script> (no "</script>" breakout). */
export function serializeJsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
