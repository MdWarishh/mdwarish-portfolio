
import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/lib/utils";

/**
 * MD Warish — Robots.txt
 *
 * Public portfolio pages are crawlable.
 * API endpoints are excluded from crawling.
 */

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl().replace(/\/+$/, "");

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],

    sitemap: `${siteUrl}/sitemap.xml`,

    host: new URL(siteUrl).host,
  };
}
