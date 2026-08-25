import type { MDXContent } from "mdx/types";

/**
 * Editorial model for the blog.
 *
 * Kept apart from `@/types` (the commerce domain) because nothing is shared
 * between the two: an article never becomes a product.
 */

/** Author byline. One entry per contributor in `@/config/blog`. */
export interface BlogAuthor {
  name: string;
  role: string;
}

/**
 * Front matter of an article, exported as `meta` from its `.mdx` file.
 * Typed at the import site through the augmentation in `src/types/mdx.d.ts`.
 */
export interface BlogArticleMeta {
  title: string;
  /** Meta description *and* the excerpt shown on the listing card. */
  description: string;
  /** ISO 8601 publication date. */
  date: string;
  /** ISO 8601, set when an article is revised. Feeds `dateModified`. */
  updatedAt?: string;
  authorId: string;
  cover: { src: string; alt: string };
  tags: string[];
  /** Estimated reading time in minutes, written by hand at publication. */
  readingMinutes: number;
}

/** An article once its slug and rendered body have been attached. */
export interface BlogArticle extends BlogArticleMeta {
  slug: string;
  author: BlogAuthor;
  /** The compiled MDX body. */
  Content: MDXContent;
}
