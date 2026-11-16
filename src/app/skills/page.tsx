
import type { Metadata } from "next";
import { SkillsBento } from "@/sections/skills/_components/skills-bento";

const title = "Technical Skills & Technology Stack";
const description =
  "Explore MD Warish's full-stack development skills across Next.js, React, Angular, TypeScript, Node.js, Java, databases, API engineering and production deployment.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/skills",
  },
  openGraph: {
    type: "website",
    title: `${title} | MD Warish`,
    description,
    url: "/skills",
    siteName: "MD Warish Portfolio",
    locale: "en_IN",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MD Warish — Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | MD Warish`,
    description,
    images: ["/og-image.jpg"],
  },
};

export default function SkillsPage() {
  return <SkillsBento />;
}
