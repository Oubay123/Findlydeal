import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/**
 * Crawl policy.
 *
 * Disallowed paths are the ones with no indexable value: a personal comparison
 * basket, API routes, and search result pages. A search URL can be made up
 * endlessly (`?q=anything`), so letting crawlers follow them would spend the
 * marketplace quota on pages nobody reads. The bare `/search` page and the
 * category pages stay crawlable. Paths start with the locale (`/fr/...`),
 * hence the leading wildcard.
 */
export default function robots(): MetadataRoute.Robots {
  const base = siteConfig.url.replace(/\/$/, "");

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/*/compare", "/api/", "/*/search?"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
