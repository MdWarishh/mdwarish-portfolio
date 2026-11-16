import type { Metadata } from "next";
import { AboutContent } from "@/sections/about/_components/about-content";
import { NextPageStrip } from "@/components/shared/next-page-strip";
import { PERSONAL_INFO } from "@/data/navigation";
import { getSiteUrl } from "@/lib/utils";

const siteUrl = getSiteUrl().replace(/\/+$/, "");
const title = "About MD Warish | Full Stack Software Engineer";
const description =
  "Meet MD Warish, a full stack software engineer building CRM platforms, inventory tools, e-commerce experiences and B2B websites with Next.js, Angular, Node.js and Java.";

export const metadata: Metadata = {
  // Root layout supplies the '| MD Warish' suffix.
  title: "About | Full Stack Software Engineer",
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    type: "profile",
    locale: "en_IN",
    url: `${siteUrl}/about`,
    siteName: "MD Warish — Portfolio",
    title,
    description,
    images: [{ url: `${siteUrl}/og-image.jpg`, width: 1200, height: 630, alt: "MD Warish — Full Stack Software Engineer" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [`${siteUrl}/og-image.jpg`],
  },
};

export default function AboutPage() {
  const profile = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${siteUrl}/about#profile`,
    url: `${siteUrl}/about`,
    name: "About MD Warish",
    description,
    inLanguage: "en-IN",
    isPartOf: { "@id": `${siteUrl}/#website` },
    mainEntity: {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: PERSONAL_INFO.name,
      url: siteUrl,
      jobTitle: "Full Stack Software Engineer",
      ...(PERSONAL_INFO.github || PERSONAL_INFO.linkedin
        ? { sameAs: [PERSONAL_INFO.github, PERSONAL_INFO.linkedin].filter(Boolean) }
        : {}),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profile).replace(/</g, "\\u003c") }}
      />
      <AboutContent />
      <NextPageStrip
        label="Skills"
        title="Explore the technologies behind my work."
        description="From frontend interfaces and backend architecture to databases and production infrastructure."
        href="/skills"
      />
    </>
  );
}
