import { blogAuthors, DEFAULT_BLOG_AUTHOR } from "@/config/blog";
import { slugify } from "@/lib/utils";
import type { BlogArticle } from "@/types/blog";

import ReconditionneGuide, {
  meta as reconditionneGuideMeta,
} from "./bien-acheter-produit-reconditionne.mdx";
import GradesExpliques, {
  meta as gradesExpliquesMeta,
} from "./grades-reconditionnement-expliques.mdx";
import NeufOuOccasion, {
  meta as neufOuOccasionMeta,
} from "./neuf-reconditionne-occasion-que-choisir.mdx";
import BonneAffaire, { meta as bonneAffaireMeta } from "./reperer-une-vraie-bonne-affaire.mdx";

/**
 * The blog index.
 *
 * Articles are imported statically rather than read from disk: no `fs`, so the
 * whole blog stays compatible with an edge runtime, and a missing file becomes
 * a build error instead of an empty page at runtime.
 *
 * **To publish a new article:** create `src/content/blog/<slug>.mdx` with its
 * `meta` export (see `BlogArticleMeta`), then add one line below. Nothing else
 * — the listing, the tag filter, the sitemap and the related articles all read
 * from this array.
 */
const articles: BlogArticle[] = [
  {
    slug: "bien-acheter-produit-reconditionne",
    Content: ReconditionneGuide,
    ...reconditionneGuideMeta,
    author: blogAuthors[reconditionneGuideMeta.authorId] ?? DEFAULT_BLOG_AUTHOR,
  },
  {
    slug: "neuf-reconditionne-occasion-que-choisir",
    Content: NeufOuOccasion,
    ...neufOuOccasionMeta,
    author: blogAuthors[neufOuOccasionMeta.authorId] ?? DEFAULT_BLOG_AUTHOR,
  },
  {
    slug: "reperer-une-vraie-bonne-affaire",
    Content: BonneAffaire,
    ...bonneAffaireMeta,
    author: blogAuthors[bonneAffaireMeta.authorId] ?? DEFAULT_BLOG_AUTHOR,
  },
  {
    slug: "grades-reconditionnement-expliques",
    Content: GradesExpliques,
    ...gradesExpliquesMeta,
    author: blogAuthors[gradesExpliquesMeta.authorId] ?? DEFAULT_BLOG_AUTHOR,
  },
];

/** Newest first — the order the listing and the sitemap use. */
export const blogArticles: BlogArticle[] = [...articles].sort((a, b) =>
  b.date.localeCompare(a.date),
);

const articlesBySlug = new Map(blogArticles.map((article) => [article.slug, article]));

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return articlesBySlug.get(slug);
}

export function getArticleSlugs(): string[] {
  return blogArticles.map((article) => article.slug);
}

/**
 * Tags travel in URLs as slugs (`Guide d'achat` -> `guide-d-achat`), so each
 * theme gets one clean, prerenderable route instead of a query string.
 */
export function tagSlug(tag: string): string {
  return slugify(tag);
}

export function getTagBySlug(slug: string): string | undefined {
  return getBlogTags().find((tag) => tagSlug(tag) === slug);
}

/** Every tag used across the blog, deduplicated and alphabetical. */
export function getBlogTags(): string[] {
  return [...new Set(blogArticles.flatMap((article) => article.tags))].sort((a, b) =>
    a.localeCompare(b, "fr"),
  );
}

export function getArticlesByTag(tag?: string): BlogArticle[] {
  if (!tag) return blogArticles;
  return blogArticles.filter((article) => article.tags.includes(tag));
}

/** Other articles sharing at least one tag, for the end of an article page. */
export function getRelatedArticles(slug: string, limit = 2): BlogArticle[] {
  const current = getArticleBySlug(slug);
  if (!current) return [];

  return blogArticles
    .filter((article) => article.slug !== slug)
    .map((article) => ({
      article,
      shared: article.tags.filter((tag) => current.tags.includes(tag)).length,
    }))
    .sort((a, b) => b.shared - a.shared)
    .slice(0, limit)
    .map((entry) => entry.article);
}
