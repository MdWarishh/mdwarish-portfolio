
import type { MetadataRoute } from "next";

import { PROJECTS } from "@/data/projects";
import { getSiteUrl } from "@/lib/utils";

/**
 * MD Warish — XML Sitemap
 *
 * Only public, canonical, indexable routes.
 *
 * Important:
 * Add lastModified only when a verified
 * content-update date is available.
 */

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl().replace(/\/+$/, "");

  const staticPaths = [
    "/",
    "/about",
    "/skills",
    "/projects",
    "/experience",
    "/services",
    "/contact",
  ];

  const staticRoutes: MetadataRoute.Sitemap =
    staticPaths.map((path) => ({
      url: new URL(path, `${siteUrl}/`).toString(),
    }));

  // Deduplicate and validate project slugs.
  const projectSlugs = [
    ...new Set(
      PROJECTS.map((project) => project.slug.trim())
        .filter(
          (slug) =>
            slug.length > 0 &&
            /^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/.test(slug)
        )
    ),
  ];

  const projectRoutes: MetadataRoute.Sitemap =
    projectSlugs.map((slug) => ({
      url: new URL(
        `/projects/${encodeURIComponent(slug)}`,
        `${siteUrl}/`
      ).toString(),
    }));

  return [...staticRoutes, ...projectRoutes];
}
