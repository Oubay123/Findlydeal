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
      className="not-prose my-8 border-l-2 border-primary py-1 pl-5"
    >
      <h2 id="article-summary" className="text-sm font-semibold">
        L&apos;essentiel
      </h2>
      <ul className="mt-2 list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-foreground/85 marker:text-primary">
        {points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    </aside>
  );
}
