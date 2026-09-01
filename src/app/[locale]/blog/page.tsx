import type { UiLocale } from "@/i18n";
import { localeAlternates } from "@/lib/seo/locale";
import type { Metadata } from "next";
import { ArticleList } from "@/components/blog/article-list";
import { TagFilter } from "@/components/blog/tag-filter";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { Container } from "@/components/common/container";
import { SectionTitle } from "@/components/common/section-title";
import { blogArticles, getBlogTags } from "@/content/blog";
import { siteConfig } from "@/config/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: UiLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Blog",
    description:
      "Guides d'achat Findlydeal : pourquoi acheter reconditionné, comment repérer une vraie bonne affaire et bien choisir entre neuf, occasion et reconditionné.",
    alternates: localeAlternates(locale, "/blog"),
  };
}

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
        as="h1"
        title="Guides d'achat : reconditionné, occasion et bonnes affaires"
        description={`Guides d'achat et méthodes pour acheter mieux, sans jargon et sans rien vous vendre. ${siteConfig.name} ne vend rien, il compare.`}
      />

      <TagFilter tags={getBlogTags()} />

      <ArticleList articles={blogArticles} highlightFirst />
    </Container>
  );
}
