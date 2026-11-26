import type { MetadataRoute } from "next";
import { PROJECTS } from "@/content/projects";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const pages: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/projects", priority: 0.9 },
    { path: "/services", priority: 0.9 },
    { path: "/about", priority: 0.7 },
    { path: "/experience", priority: 0.7 },
    { path: "/resume", priority: 0.6 },
    { path: "/contact", priority: 0.8 },
  ];
  return [
    ...pages.map((p) => ({ url: absoluteUrl(p.path), lastModified, changeFrequency: "monthly" as const, priority: p.priority })),
    ...PROJECTS.map((p) => ({
      url: absoluteUrl(`/projects/${p.slug}`),
      lastModified,
      changeFrequency: "yearly" as const,
      priority: p.featured ? 0.8 : 0.6,
    })),
  ];
}
