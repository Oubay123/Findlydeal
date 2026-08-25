import type { Metadata } from "next";
import { ArticleList } from "@/components/blog/article-list";
import { TagFilter } from "@/components/blog/tag-filter";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { Container } from "@/components/common/container";
import { SectionTitle } from "@/components/common/section-title";
import { blogArticles, getBlogTags } from "@/content/blog";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Guides d'achat, conseils sur le reconditionné et méthodes pour repérer une vraie bonne affaire, par l'équipe Findlydeal.",
  alternates: { canonical: "/blog" },
};

/**
 * Fully static: the listing reads a compiled registry, never a request. Theme
 * filtering lives at `/blog/theme/<tag>` rather than in a query string, which
 * keeps this page — and each theme — servable straight from cache.
 */
export default function BlogPage() {
  return (
    <Container className="max-w-5xl space-y-10 py-10">
      <Breadcrumbs items={[{ name: "Blog" }]} />

      <SectionTitle
        title="Le blog Findlydeal"
        description={`Guides d'achat et méthodes pour acheter mieux, sans jargon et sans rien vous vendre. ${siteConfig.name} ne vend rien, il compare.`}
      />

      <TagFilter tags={getBlogTags()} />

      <ArticleList articles={blogArticles} highlightFirst />
    </Container>
  );
}
