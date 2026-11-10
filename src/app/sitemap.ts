import { seasonalSelections } from "@/config/selections";
import type { MetadataRoute } from "next";
import { categories } from "@/config/categories";
import { siteConfig } from "@/config/site";
import { blogArticles, getBlogTags, tagSlug } from "@/content/blog";
import { DEFAULT_UI_LOCALE, UI_LOCALE_HREFLANG, getPublishedLocales, localePath } from "@/i18n";
import { getPricedCatalogue } from "@/lib/catalogue";
import { DEFAULT_LOCALE } from "@/lib/constants";
import { isDemoCatalogueActive } from "@/lib/mock";
import { filterProducts } from "@/lib/search/filter";
import type { CategorySlug } from "@/types";

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
 * Products listed are the catalogue products that currently have live
 * offers; single marketplace listings are never listed (they are `noindex`).
 * Generated on request, like the pages it lists, so it reflects the Worker's
 * runtime configuration rather than the build machine's.
 */

export const dynamic = "force-dynamic";

interface Route {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
  lastModified?: Date;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url.replace(/\/$/, "");
  const locales = getPublishedLocales();
  const showsRealOffers = !isDemoCatalogueActive();
  const pricedProducts = showsRealOffers ? await getPricedCatalogue() : [];
  const hasProducts = (categorySlug: CategorySlug) =>
    filterProducts(pricedProducts, {
      term: "",
      locale: DEFAULT_LOCALE,
      page: 1,
      perPage: 1,
      filters: { sort: "relevance", categorySlug },
    }).length > 0;

  const routes: Route[] = [
    { path: "/", changeFrequency: "daily", priority: 1 },
    { path: "/blog", changeFrequency: "weekly", priority: 0.8 },
    { path: "/how-it-works", changeFrequency: "monthly", priority: 0.6 },
    { path: "/methodologie", changeFrequency: "monthly", priority: 0.6 },
    ...(!showsRealOffers
      ? []
      : [
          { path: "/barometre-des-prix", changeFrequency: "daily" as const, priority: 0.7 },
          ...seasonalSelections.map((selection) => ({
            path: `/selection/${selection.slug}`,
            changeFrequency: "weekly" as const,
            priority: 0.6,
          })),
        ]),
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
          // Only categories with live offers: an empty one is `noindex`.
          ...categories
            .filter((category) => hasProducts(category.slug))
            .map((category) => ({
              path: `/category/${category.slug}`,
              changeFrequency: "daily" as const,
              priority: 0.8,
            })),
          ...pricedProducts.map((product) => ({
            path: `/product/${encodeURIComponent(product.id)}`,
            changeFrequency: "daily" as const,
            priority: 0.7,
            // When its prices were last fetched: the date a crawler can trust.
            lastModified: product.bestOffer ? new Date(product.bestOffer.fetchedAt) : undefined,
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
