import { Check } from "lucide-react";

interface ArticleSummaryProps {
  /** Three to six takeaways. Beyond that it stops being a summary. */
  points: string[];
}

/**
 * The "En résumé" box placed near the top of an article.
 *
 * It exists for the reader who will not read the whole piece, which is most of
 * them, and it gives search engines a clean, extractable list of the article's
 * claims. Written by hand per article rather than generated: a summary that
 * merely repeats the first paragraph is worse than none.
 */
export function ArticleSummary({ points }: ArticleSummaryProps) {
  return (
    <aside
      aria-labelledby="article-summary"
      className="not-prose my-8 rounded-2xl bg-cream px-6 py-5"
    >
      <h2
        id="article-summary"
        className="font-display text-xs font-semibold tracking-wider text-muted-foreground uppercase"
      >
        En résumé
      </h2>
      <ul className="mt-3 space-y-2">
        {points.map((point) => (
          <li key={point} className="flex gap-2.5 text-sm leading-relaxed text-foreground/85">
            <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
