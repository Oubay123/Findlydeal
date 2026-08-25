import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleList } from "@/components/blog/article-list";
import { TagFilter } from "@/components/blog/tag-filter";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { Container } from "@/components/common/container";
import { SectionTitle } from "@/components/common/section-title";
import { getArticlesByTag, getBlogTags, getTagBySlug, tagSlug } from "@/content/blog";

interface ThemePageProps {
  params: Promise<{ tag: string }>;
}

/** One prerendered page per theme; anything else is a 404, not a rebuild. */
export function generateStaticParams() {
  return getBlogTags().map((tag) => ({ tag: tagSlug(tag) }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: ThemePageProps): Promise<Metadata> {
  const { tag: slug } = await params;
  const tag = getTagBySlug(slug);
  if (!tag) return {};

  return {
    title: `Blog : ${tag}`,
    description: `Tous les articles Findlydeal sur le thème « ${tag} » : guides d'achat et conseils pratiques.`,
    alternates: { canonical: `/blog/theme/${slug}` },
  };
}

export default async function BlogThemePage({ params }: ThemePageProps) {
  const { tag: slug } = await params;
  const tag = getTagBySlug(slug);
  if (!tag) notFound();

  const articles = getArticlesByTag(tag);

  return (
    <Container className="max-w-5xl space-y-10 py-10">
      <Breadcrumbs items={[{ name: "Blog", href: "/blog" }, { name: tag }]} />

      <SectionTitle
        title={tag}
        description={`${articles.length} article${articles.length > 1 ? "s" : ""} sur ce thème.`}
      />

      <TagFilter tags={getBlogTags()} active={tag} />

      <ArticleList articles={articles} />
    </Container>
  );
}
