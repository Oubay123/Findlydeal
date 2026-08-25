/**
 * Types the named exports of every `.mdx` file.
 *
 * `@types/mdx` only types the default export (the compiled component); the
 * pattern below is the one it documents for adding your own. Declaration
 * merging means we only add `meta` — the default export keeps its own type.
 *
 * Caveat worth knowing: this types the *import site*, not the MDX file itself.
 * A malformed `meta` inside an article is not caught by `tsc`, so keep the
 * shape in `src/types/blog.ts` as the reference when writing a new article.
 */
declare module "*.mdx" {
  import type { BlogArticleMeta } from "@/types/blog";

  export const meta: BlogArticleMeta;
}
