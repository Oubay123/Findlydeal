import type { MetadataRoute } from "next";
import { categories } from "@/config/categories";
import { siteConfig } from "@/config/site";
import { blogArticles, getBlogTags, tagSlug } from "@/content/blog";
import { getMockProducts } from "@/lib/mock";

/**
 * Sitemap, assembled from the same sources the pages read.
 *
 * Nothing is listed by hand: adding a category, an article or a product makes
 * it appear here automatically. Excluded on purpose:
 * - `/compare` — a personal, ephemeral selection, also marked `noindex`;
 * - filtered `/search?…` URLs — near-duplicates of each other.
 *
 * When real sources replace the demonstration catalogue, swap
 * `getMockProducts()` for the real product listing; the rest stands.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");
  const url = (path: string) => `${base}${path}`;

  const staticPages: MetadataRoute.Sitemap = [
    { url: url("/"), changeFrequency: "daily", priority: 1 },
    { url: url("/search"), changeFrequency: "daily", priority: 0.9 },
    { url: url("/blog"), changeFrequency: "weekly", priority: 0.8 },
    { url: url("/how-it-works"), changeFrequency: "monthly", priority: 0.6 },
    { url: url("/faq"), changeFrequency: "monthly", priority: 0.6 },
    { url: url("/about"), changeFrequency: "yearly", priority: 0.4 },
    { url: url("/legal/privacy"), changeFrequency: "yearly", priority: 0.2 },
    { url: url("/legal/terms"), changeFrequency: "yearly", priority: 0.2 },
    { url: url("/legal/cookies"), changeFrequency: "yearly", priority: 0.2 },
    { url: url("/legal/legal-notice"), changeFrequency: "yearly", priority: 0.2 },
    { url: url("/legal/affiliate-disclosure"), changeFrequency: "yearly", priority: 0.3 },
  ];

  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: url(`/category/${category.slug}`),
    changeFrequency: "daily",
    priority: 0.8,
  }));

  const articlePages: MetadataRoute.Sitemap = blogArticles.map((article) => ({
    url: url(`/blog/${article.slug}`),
    lastModified: new Date(article.updatedAt ?? article.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const themePages: MetadataRoute.Sitemap = getBlogTags().map((tag) => ({
    url: url(`/blog/theme/${tagSlug(tag)}`),
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  const productPages: MetadataRoute.Sitemap = getMockProducts().map((product) => ({
    url: url(`/product/${encodeURIComponent(product.id)}`),
    changeFrequency: "daily",
    priority: 0.7,
  }));

  return [...staticPages, ...categoryPages, ...articlePages, ...themePages, ...productPages];
}
