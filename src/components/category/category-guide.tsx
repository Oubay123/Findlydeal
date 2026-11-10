import { CheckCircle2 } from "lucide-react";
import { LocaleLink } from "@/components/common/locale-link";
import { categoryGuides } from "@/config/category-guides";
import { getArticleBySlug } from "@/content/blog";
import type { CategorySlug } from "@/types";

/**
 * Editorial guide at the bottom of a category page: how to buy well in this
 * category, and the blog articles that develop (and source) the rules cited.
 * Content lives in `src/config/category-guides.ts`.
 */
export function CategoryGuide({ slug, name }: { slug: CategorySlug; name: string }) {
  const guide = categoryGuides[slug];
  if (!guide) return null;

  const articles = guide.articles
    .map((articleSlug) => getArticleBySlug(articleSlug))
    .filter((article) => article !== undefined);

  return (
    <section aria-labelledby={`guide-${slug}`} className="space-y-6 border-t pt-10">
      <div className="max-w-[70ch] space-y-4">
        <h2 id={`guide-${slug}`} className="font-display text-2xl leading-tight font-bold">
          Bien acheter en {name}
        </h2>
        {guide.intro.map((paragraph) => (
          <p key={paragraph.slice(0, 32)} className="leading-relaxed text-muted-foreground">
            {paragraph}
          </p>
        ))}
      </div>

      <ul className="grid gap-4 sm:grid-cols-2">
        {guide.checks.map((check) => (
          <li key={check.title} className="flex gap-3 rounded-2xl border bg-white p-4">
            <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
            <div>
              <h3 className="text-sm font-semibold">{check.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{check.detail}</p>
            </div>
          </li>
        ))}
      </ul>

      {articles.length > 0 ? (
        <div>
          <h3 className="font-display text-sm font-semibold tracking-wider text-muted-foreground uppercase">
            Pour aller plus loin
          </h3>
          <ul className="mt-2 space-y-1.5 text-sm">
            {articles.map((article) => (
              <li key={article.slug}>
                <LocaleLink
                  href={`/blog/${article.slug}`}
                  className="text-primary underline-offset-4 hover:underline"
                >
                  {article.title}
                </LocaleLink>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}
