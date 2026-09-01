import { SmartImage } from "@/components/common/smart-image";

interface ArticleFigureProps {
  src: string;
  /** Descriptive alt. Required by the type, on purpose. */
  alt: string;
  /** Sentence under the image. Adds context the photo alone cannot carry. */
  caption: string;
  /** Source credit, e.g. "Photo : Unsplash". */
  credit?: string;
}

/**
 * An illustration inside an article body, with its caption and credit.
 *
 * Separate from the plain markdown `![]()` mapping because a caption is not
 * decoration: it is often the only part of a long article a scanning reader
 * actually reads.
 */
export function ArticleFigure({ src, alt, caption, credit }: ArticleFigureProps) {
  return (
    <figure className="my-8">
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-muted">
        <SmartImage src={src} alt={alt} fill context="blogCover" className="object-cover" />
      </div>
      <figcaption className="mt-2 flex flex-wrap justify-between gap-2 text-xs text-muted-foreground">
        <span>{caption}</span>
        {credit ? <span className="opacity-70">{credit}</span> : null}
      </figcaption>
    </figure>
  );
}
