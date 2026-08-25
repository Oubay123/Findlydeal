import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/**
 * Crawl policy.
 *
 * Disallowed paths are the ones with no indexable value: a personal comparison
 * basket, and future API routes. Filtered `/search`
 * URLs are left crawlable but are not in the sitemap — they are useful entry
 * points, just not worth advertising as canonical pages.
 */
export default function robots(): MetadataRoute.Robots {
  const base = siteConfig.url.replace(/\/$/, "");

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/compare", "/api/"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
