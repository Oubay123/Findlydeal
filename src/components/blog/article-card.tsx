import { LocaleLink } from "@/components/common/locale-link";
import { Clock } from "lucide-react";
import { SmartImage } from "@/components/common/smart-image";
import { formatArticleDate } from "@/lib/utils";
import type { BlogArticle } from "@/types/blog";

interface ArticleCardProps {
  article: BlogArticle;
  /** Larger treatment for the newest article at the top of the listing. */
  featured?: boolean;
}

/** One article in the blog listing. */
export function ArticleCard({ article, featured }: ArticleCardProps) {
  const href = `/blog/${article.slug}`;

  return (
    <article
      className={`group flex overflow-hidden rounded-2xl border bg-white transition-shadow hover:shadow-lg hover:shadow-black/5 ${
        featured ? "flex-col md:flex-row" : "flex-col"
      }`}
    >
      <LocaleLink
        href={href}
        tabIndex={-1}
        aria-hidden
        className={`relative block overflow-hidden ${
          featured ? "aspect-[16/10] md:aspect-auto md:w-1/2" : "aspect-[16/10]"
        }`}
      >
        <SmartImage
          src={article.cover.src}
          alt={article.cover.alt}
          fill
          context="blogCard"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </LocaleLink>

      <div
        className={`flex min-w-0 flex-1 flex-col gap-3 p-5 ${featured ? "md:justify-center md:p-8" : ""}`}
      >
        <ul className="flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full bg-brand-100 px-2.5 py-0.5 text-xs font-medium text-primary"
            >
              {tag}
            </li>
          ))}
        </ul>

        <h2 className={`font-display font-bold break-words ${featured ? "text-2xl" : "text-lg"}`}>
          <LocaleLink href={href} className="transition-colors hover:text-primary">
            {article.title}
          </LocaleLink>
        </h2>

        <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {article.description}
        </p>

        <p className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-1 text-xs text-muted-foreground">
          <time dateTime={article.date}>{formatArticleDate(article.date)}</time>
          <span aria-hidden>·</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3.5" aria-hidden />
            {article.readingMinutes} min de lecture
          </span>
        </p>
      </div>
    </article>
  );
}
