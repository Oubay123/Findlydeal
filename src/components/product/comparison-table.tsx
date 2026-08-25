import Link from "next/link";
import { Check, Minus } from "lucide-react";
import { RatingStars } from "@/components/common/rating-stars";
import { ScrollableTable } from "@/components/common/scrollable-table";
import { SmartImage } from "@/components/common/smart-image";
import { DealBadge } from "@/components/product/deal-badge";
import { Button } from "@/components/ui/button";
import { CONDITION_LABELS } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

interface ComparisonTableProps {
  /** Two to six products, in the order the visitor selected them. */
  products: Product[];
}

/** Label column width, and the floor a product column may shrink to. */
const LABEL_WIDTH_REM = 6.5;
const COLUMN_MIN_REM = 8;

/**
 * Side-by-side comparison of two to six products.
 *
 * Two decisions drive the layout:
 *
 * - **The label column is sticky.** With six products the table has to scroll
 *   horizontally; if the criterion names scrolled away with it, the values
 *   would become anonymous numbers. They stay pinned to the left instead.
 * - **`minWidth` is computed from the number of products**, so the common case
 *   (two products) fits a 375 px phone with no scrolling at all, while six
 *   still get a readable column each rather than being crushed to fit.
 *
 * Spec rows are the union of every product's spec sheet, so a characteristic
 * one product documents and another does not still gets a row, with an
 * explicit "non renseigné" rather than a silent blank.
 */
export function ComparisonTable({ products }: ComparisonTableProps) {
  const specLabels = [
    ...new Set(products.flatMap((p) => p.specs?.map((spec) => spec.label) ?? [])),
  ];
  const prices = products
    .map((p) => p.bestOffer?.totalPrice.amount)
    .filter((amount): amount is number => amount !== undefined);
  const cheapest = prices.length > 0 ? Math.min(...prices) : undefined;

  return (
    <ScrollableTable
      minWidth={`${LABEL_WIDTH_REM + products.length * COLUMN_MIN_REM}rem`}
      caption={`Comparaison de ${products.length} produits : prix, état, note et fiche technique`}
    >
      <thead>
        <tr className="border-b">
          <StickyHeadCell>
            <span className="sr-only">Caractéristique</span>
          </StickyHeadCell>

          {products.map((product) => (
            <th key={product.id} scope="col" className="p-3 align-bottom">
              <Link href={`/product/${encodeURIComponent(product.id)}`} className="group block">
                <span className="relative mb-2.5 block aspect-[4/3] overflow-hidden rounded-lg bg-muted">
                  {product.imageUrl ? (
                    <SmartImage
                      src={product.imageUrl}
                      alt={product.imageAlt ?? product.title}
                      fill
                      context="productCardGrid"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : null}
                </span>
                <span className="block text-left text-xs leading-snug font-medium text-balance transition-colors group-hover:text-primary sm:text-sm">
                  {product.title}
                </span>
              </Link>
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        <Row label="Meilleur prix">
          {products.map((product) => {
            const price = product.bestOffer?.totalPrice;
            const isCheapest = cheapest !== undefined && price?.amount === cheapest;
            return (
              <Cell key={product.id} highlight={isCheapest}>
                {price ? (
                  <span className="flex flex-col items-start gap-1">
                    <span
                      className={`font-display text-base font-bold sm:text-lg ${isCheapest ? "text-deal" : ""}`}
                    >
                      {formatPrice(price)}
                    </span>
                    {isCheapest ? (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-deal">
                        <Check className="size-3.5 shrink-0" aria-hidden />
                        Le moins cher
                      </span>
                    ) : null}
                  </span>
                ) : (
                  <Missing />
                )}
              </Cell>
            );
          })}
        </Row>

        <Row label="Bonne affaire">
          {products.map((product) => (
            <Cell key={product.id}>
              {product.bestOffer?.deal ? (
                <DealBadge deal={product.bestOffer.deal} />
              ) : (
                <span className="text-xs text-muted-foreground">Prix dans la moyenne</span>
              )}
            </Cell>
          ))}
        </Row>

        <Row label="État">
          {products.map((product) => (
            <Cell key={product.id}>
              {product.bestOffer ? CONDITION_LABELS[product.bestOffer.condition] : <Missing />}
            </Cell>
          ))}
        </Row>

        <Row label="Note">
          {products.map((product) => (
            <Cell key={product.id}>
              {product.rating ? (
                <RatingStars value={product.rating.value} count={product.rating.count} />
              ) : (
                <Missing />
              )}
            </Cell>
          ))}
        </Row>

        <Row label="Offres">
          {products.map((product) => {
            const platforms = new Set(product.offers.map((offer) => offer.source)).size;
            return (
              <Cell key={product.id}>
                {product.offers.length} sur {platforms} plateforme{platforms > 1 ? "s" : ""}
              </Cell>
            );
          })}
        </Row>

        {specLabels.map((label) => (
          <Row key={label} label={label}>
            {products.map((product) => {
              const spec = product.specs?.find((item) => item.label === label);
              return <Cell key={product.id}>{spec ? spec.value : <Missing />}</Cell>;
            })}
          </Row>
        ))}

        <Row label="">
          {products.map((product) => (
            <Cell key={product.id}>
              <Button asChild size="sm" className="h-9 w-full rounded-lg">
                <Link href={`/product/${encodeURIComponent(product.id)}`}>Voir les offres</Link>
              </Button>
            </Cell>
          ))}
        </Row>
      </tbody>
    </ScrollableTable>
  );
}

/**
 * Shared sticky styling for the left column.
 *
 * The opaque background is not decoration: without it, the scrolling product
 * columns would show through the pinned labels.
 *
 * Written as a literal string, never interpolated: Tailwind scans the source
 * for class names, so `w-[${X}rem]` would produce no CSS at all. Keep this
 * width in step with `LABEL_WIDTH_REM` above, which only feeds the inline
 * `minWidth` calculation.
 */
const STICKY_CELL =
  "sticky left-0 z-10 w-[6.5rem] min-w-[6.5rem] bg-background align-top " +
  "after:absolute after:inset-y-0 after:right-0 after:w-px after:bg-border after:content-['']";

function StickyHeadCell({ children }: { children: React.ReactNode }) {
  return (
    <th scope="col" className={`${STICKY_CELL} p-3 text-left`}>
      {children}
    </th>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <tr className="border-t align-top">
      <th
        scope="row"
        className={`${STICKY_CELL} p-3 text-left text-[11px] leading-tight font-medium tracking-wide text-muted-foreground uppercase sm:text-xs`}
      >
        {label}
      </th>
      {children}
    </tr>
  );
}

function Cell({ highlight, children }: { highlight?: boolean; children: React.ReactNode }) {
  return <td className={`p-3 text-xs sm:text-sm ${highlight ? "bg-cream" : ""}`}>{children}</td>;
}

function Missing() {
  return (
    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
      <Minus className="size-3.5 shrink-0" aria-hidden />
      non renseigné
    </span>
  );
}
