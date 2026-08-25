import { CollapsibleSection } from "@/components/common/collapsible-section";
import { DemoFootnote } from "@/components/common/demo-notice";
import { RatingStars } from "@/components/common/rating-stars";
import type { ProductRating, ProductReview } from "@/types";

interface ProductReviewsProps {
  reviews: ProductReview[];
  rating?: ProductRating;
}

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

/** Customer reviews collected from the marketplaces, folded by default. */
export function ProductReviews({ reviews, rating }: ProductReviewsProps) {
  if (reviews.length === 0) return null;

  return (
    <CollapsibleSection
      title="Avis clients"
      meta={rating ? <RatingStars value={rating.value} count={rating.count} size="md" /> : null}
    >
      <ul className="space-y-3">
        {reviews.map((review) => (
          <li key={review.id} className="space-y-2 rounded-xl bg-cream p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-sm font-medium">{review.author}</span>
              <time dateTime={review.date} className="text-xs text-muted-foreground">
                {dateFormatter.format(new Date(review.date))}
              </time>
            </div>
            <RatingStars value={review.rating} />
            <p className="text-sm leading-relaxed text-muted-foreground">{review.comment}</p>
          </li>
        ))}
      </ul>

      <DemoFootnote className="mt-4" />
    </CollapsibleSection>
  );
}
