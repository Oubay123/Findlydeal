import type { MetadataRoute } from "next";
import { categories } from "@/config/categories";
import { siteConfig } from "@/config/site";
import { blogArticles, getBlogTags, tagSlug } from "@/content/blog";
import { DEFAULT_UI_LOCALE, UI_LOCALE_HREFLANG, getPublishedLocales, localePath } from "@/i18n";
import { getMockProducts, isDemoCatalogueActive } from "@/lib/mock";

/**
 * Sitemap, assembled from the same sources the pages read.
 *
 * Nothing is listed by hand: adding a category, an article or a product makes
 * it appear here automatically. Excluded on purpose:
 * - `/compare` — a personal, ephemeral selection, also marked `noindex`;
 * - filtered `/search?…` URLs — near-duplicates of each other;
 * - every page that shows product data (comparator, categories, products)
 *   while the demonstration catalogue is active: they are `noindex` until real
 *   offers are live, and the sitemap must never list a noindexed URL;
 * - any locale whose dictionary is not finished. `getPublishedLocales()` is
 *   the same check that marks such a locale `noindex`, so the sitemap and the
 *   robots directive can never disagree.
 *
 * The file itself stays at the root of the domain rather than under a locale:
 * `/sitemap.xml` is the address crawlers look for by convention, and it
 * carries every language through `alternates.languages`.
 *
 * When real sources replace the demonstration catalogue, swap
 * `getMockProducts()` for the real product listing; the rest stands.
 */

interface Route {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
  lastModified?: Date;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");
  const locales = getPublishedLocales();
  const showsRealOffers = !isDemoCatalogueActive();

  const routes: Route[] = [
    { path: "/", changeFrequency: "daily", priority: 1 },
    { path: "/blog", changeFrequency: "weekly", priority: 0.8 },
    { path: "/how-it-works", changeFrequency: "monthly", priority: 0.6 },
    { path: "/methodologie", changeFrequency: "monthly", priority: 0.6 },
    { path: "/faq", changeFrequency: "monthly", priority: 0.6 },
    { path: "/categories", changeFrequency: "weekly", priority: 0.7 },
    { path: "/about", changeFrequency: "yearly", priority: 0.4 },
    { path: "/legal/privacy", changeFrequency: "yearly", priority: 0.2 },
    { path: "/legal/terms", changeFrequency: "yearly", priority: 0.2 },
    { path: "/legal/cookies", changeFrequency: "yearly", priority: 0.2 },
    { path: "/legal/legal-notice", changeFrequency: "yearly", priority: 0.2 },
    { path: "/legal/affiliate-disclosure", changeFrequency: "yearly", priority: 0.3 },

    ...blogArticles.map((article) => ({
      path: `/blog/${article.slug}`,
      lastModified: new Date(article.updatedAt ?? article.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),

    ...getBlogTags().map((tag) => ({
      path: `/blog/theme/${tagSlug(tag)}`,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),

    ...(showsRealOffers
      ? [
          { path: "/search", changeFrequency: "daily" as const, priority: 0.9 },
          ...categories.map((category) => ({
            path: `/category/${category.slug}`,
            changeFrequency: "daily" as const,
            priority: 0.8,
          })),
          // Swap for the real product listing when the live pipeline lands.
          ...getMockProducts().map((product) => ({
            path: `/product/${encodeURIComponent(product.id)}`,
            changeFrequency: "daily" as const,
            priority: 0.7,
          })),
        ]
      : []),
  ];

  return routes.flatMap((route) =>
    locales.map((locale) => ({
      url: `${base}${localePath(locale, route.path)}`,
      lastModified: route.lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      // Emitted only once a second locale is published; a single-language
      // sitemap declaring alternates to itself is noise.
      ...(locales.length > 1
        ? {
            alternates: {
              languages: {
                ...Object.fromEntries(
                  locales.map((other) => [
                    UI_LOCALE_HREFLANG[other],
                    `${base}${localePath(other, route.path)}`,
                  ]),
                ),
                "x-default": `${base}${localePath(DEFAULT_UI_LOCALE, route.path)}`,
              },
            },
          }
        : {}),
    })),
  );
}
