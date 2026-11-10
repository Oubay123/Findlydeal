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
import {
  REFURBISHED_GRADES_PATH,
  articleNode,
  buildGraph,
  pageUrl,
  refurbishedGradesNodes,
  schemaIds,
  webPageNode,
} from "@/lib/seo/json-ld";
import { siteConfig } from "@/config/site";
import { formatArticleDate, slugify } from "@/lib/utils";

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
  const { locale, slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const { Content } = article;
  const related = getRelatedArticles(slug);
  const path = `/blog/${article.slug}`;
  const url = pageUrl(locale, path);

  return (
    <>
      <JsonLd
        data={buildGraph(
          webPageNode({
            url,
            name: article.title,
            description: article.description,
            about: schemaIds.article(url),
            mainEntity: schemaIds.article(url),
            hasBreadcrumb: true,
            dateModified: article.updatedAt ?? article.date,
          }),
          articleNode(article, url),
          // The grade vocabulary lives on the page whose text defines it.
          path === REFURBISHED_GRADES_PATH && refurbishedGradesNodes(url),
        )}
      />

      <Container className="max-w-3xl py-10">
        <Breadcrumbs
          path={path}
          items={[{ name: "Blog", href: "/blog" }, { name: article.title }]}
        />

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
            <span>
              Publié le <time dateTime={article.date}>{formatArticleDate(article.date)}</time>
            </span>
            {article.updatedAt && article.updatedAt !== article.date ? (
              <>
                <span aria-hidden>·</span>
                <span>
                  Mis à jour le{" "}
                  <time dateTime={article.updatedAt}>{formatArticleDate(article.updatedAt)}</time>
                </span>
              </>
            ) : null}
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
        {article.outline.length > 2 ? (
          <nav
            aria-labelledby="article-toc"
            className="mx-auto mb-8 max-w-[68ch] rounded-2xl border bg-white px-6 py-5"
          >
            <h2 id="article-toc" className="text-sm font-semibold">
              Dans cet article
            </h2>
            <ol className="mt-3 space-y-1.5 text-sm">
              {article.outline.map((heading) => (
                <li key={heading}>
                  <a
                    href={`#${slugify(heading)}`}
                    className="text-foreground/80 underline-offset-4 hover:text-primary hover:underline"
                  >
                    {heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        <div className="mx-auto max-w-[68ch] text-base">
          <Content />
        </div>

        {article.faq?.length ? (
          <section aria-labelledby="article-faq" className="mx-auto mt-12 max-w-[68ch]">
            <h2 id="article-faq" className="font-display text-2xl leading-tight font-bold">
              Questions fréquentes
            </h2>
            <dl className="mt-4 divide-y rounded-2xl border bg-white">
              {article.faq.map((item) => (
                <div key={item.question} className="px-6 py-4">
                  <dt className="font-display text-base font-semibold">{item.question}</dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-foreground/80">
                    {item.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        ) : null}

        {article.sources?.length ? (
          <section aria-labelledby="article-sources" className="mx-auto mt-12 max-w-[68ch]">
            <h2 id="article-sources" className="font-display text-xl font-bold">
              Sources
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Les règles de droit, dates et chiffres de cet article viennent des documents suivants,
              consultés le {formatArticleDate(article.updatedAt ?? article.date)}.
            </p>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm marker:text-muted-foreground">
              {article.sources.map((source) => (
                <li key={source.url}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="break-words text-primary underline underline-offset-4"
                  >
                    {source.title}
                  </a>
                  <span className="text-muted-foreground">, {source.publisher}</span>
                </li>
              ))}
            </ol>
          </section>
        ) : null}

        <p className="mx-auto mt-10 max-w-[68ch] border-t pt-5 text-xs leading-relaxed text-muted-foreground">
          Article rédigé par {article.author.name}. Findlydeal ne vend aucun produit et aucun
          marchand ne paie pour être cité dans nos guides ; les liens vers le comparateur mènent à
          des offres dont les liens sont affiliés, selon les règles décrites dans notre{" "}
          <LocaleLink href="/methodologie" className="underline underline-offset-2">
            méthodologie
          </LocaleLink>
          . Une erreur ? Écrivez à{" "}
          <a href={`mailto:${siteConfig.contactEmail}`} className="underline underline-offset-2">
            {siteConfig.contactEmail}
          </a>
          .
        </p>

        <aside className="mx-auto mt-14 max-w-[68ch] space-y-3 rounded-2xl bg-cream p-8 text-center">
          <h2 className="font-display text-xl font-bold">Passez de la théorie à la pratique</h2>
          <p className="text-sm text-muted-foreground">
            Comparez le prix d&apos;un produit chez de nombreux vendeurs en une seule recherche.
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
