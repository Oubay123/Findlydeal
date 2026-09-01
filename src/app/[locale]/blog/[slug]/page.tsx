import type { UiLocale } from "@/i18n";
import { localeAlternates } from "@/lib/seo/locale";
import type { Metadata } from "next";
import { LocaleLink } from "@/components/common/locale-link";
import { notFound } from "next/navigation";
import { Clock } from "lucide-react";
import { ArticleCard } from "@/components/blog/article-card";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { Container } from "@/components/common/container";
import { JsonLd } from "@/components/common/json-ld";
import { SmartImage } from "@/components/common/smart-image";
import { Button } from "@/components/ui/button";
import { getArticleBySlug, getArticleSlugs, getRelatedArticles, tagSlug } from "@/content/blog";
import { buildArticleSchema } from "@/lib/seo/json-ld";
import { formatArticleDate } from "@/lib/utils";

interface ArticlePageProps {
  params: Promise<{ locale: UiLocale; slug: string }>;
}

/** The article set is known at build time: prerender every one of them. */
export function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.description,
    alternates: localeAlternates(locale, `/blog/${article.slug}`),
    openGraph: {
      type: "article",
      title: article.title,
      description: article.description,
      publishedTime: article.date,
      modifiedTime: article.updatedAt ?? article.date,
      tags: article.tags,
      images: [{ url: article.cover.src, alt: article.cover.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: [article.cover.src],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const { Content } = article;
  const related = getRelatedArticles(slug);

  return (
    <>
      <JsonLd data={buildArticleSchema(article)} />

      <Container className="max-w-3xl py-10">
        <Breadcrumbs items={[{ name: "Blog", href: "/blog" }, { name: article.title }]} />

        <header className="mx-auto mt-8 max-w-[68ch] space-y-4">
          <ul className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <li key={tag}>
                <LocaleLink
                  href={`/blog/theme/${tagSlug(tag)}`}
                  className="rounded-full bg-brand-100 px-2.5 py-0.5 text-xs font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  {tag}
                </LocaleLink>
              </li>
            ))}
          </ul>

          <h1 className="text-3xl leading-tight font-bold text-balance sm:text-4xl">
            {article.title}
          </h1>

          <p className="text-lg leading-relaxed text-pretty text-muted-foreground">
            {article.description}
          </p>

          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t pt-4 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{article.author.name}</span>
            <span aria-hidden>·</span>
            <time dateTime={article.date}>{formatArticleDate(article.date)}</time>
            <span aria-hidden>·</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="size-4" aria-hidden />
              {article.readingMinutes} min
            </span>
          </p>
        </header>

        <div className="relative my-8 aspect-[16/9] w-full overflow-hidden rounded-2xl bg-muted">
          {/* Cover is the LCP of this page. */}
          <SmartImage
            src={article.cover.src}
            alt={article.cover.alt}
            fill
            priority
            context="blogCover"
            className="object-cover"
          />
        </div>

        {/*
          ~68 characters per line. The container above is wider so the cover
          photo can breathe, but running text past ~75 characters makes the eye
          lose the start of the next line.
        */}
        <div className="mx-auto max-w-[68ch] text-base">
          <Content />
        </div>

        <aside className="mx-auto mt-14 max-w-[68ch] space-y-3 rounded-2xl bg-cream p-8 text-center">
          <h2 className="font-display text-xl font-bold">Passez de la théorie à la pratique</h2>
          <p className="text-sm text-muted-foreground">
            Comparez le prix d&apos;un produit sur toutes les plateformes en une seule recherche.
          </p>
          <Button asChild size="md" className="mt-2">
            <LocaleLink href="/search">Lancer une comparaison</LocaleLink>
          </Button>
        </aside>
      </Container>

      {related.length > 0 ? (
        <Container className="max-w-5xl pb-16">
          <h2 className="mb-6 font-display text-xl font-bold">À lire ensuite</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {related.map((item) => (
              <ArticleCard key={item.slug} article={item} />
            ))}
          </div>
        </Container>
      ) : null}
    </>
  );
}
