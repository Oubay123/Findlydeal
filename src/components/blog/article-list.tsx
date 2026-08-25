import { ArticleCard } from "@/components/blog/article-card";
import type { BlogArticle } from "@/types/blog";

interface ArticleListProps {
  articles: BlogArticle[];
  /** Give the newest article the wide treatment. Off on theme pages. */
  highlightFirst?: boolean;
}

/**
 * The article grid, shared by `/blog` and every `/blog/theme/<tag>` page so
 * the two listings can never drift apart.
 */
export function ArticleList({ articles, highlightFirst = false }: ArticleListProps) {
  if (articles.length === 0) {
    return (
      <p className="rounded-2xl bg-cream p-12 text-center text-sm text-muted-foreground">
        Aucun article pour ce thème pour le moment.
      </p>
    );
  }

  const [featured, ...rest] = highlightFirst ? articles : [];
  const grid = highlightFirst ? rest : articles;

  return (
    <div className="space-y-6">
      {featured ? <ArticleCard article={featured} featured /> : null}

      {grid.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {grid.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
