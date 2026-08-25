import type { BlogAuthor } from "@/types/blog";

/**
 * Blog contributors, referenced by `authorId` from each article's `meta`.
 * One entry per byline, so a name change never has to be done article by
 * article.
 */
export const blogAuthors: Record<string, BlogAuthor> = {
  equipe: {
    name: "L'équipe Findlydeal",
    role: "Rédaction",
  },
};

export const DEFAULT_BLOG_AUTHOR: BlogAuthor = {
  name: "L'équipe Findlydeal",
  role: "Rédaction",
};
