import { Container } from "@/components/common/container";
import { LocaleLink } from "@/components/common/locale-link";
import { Motif } from "@/components/common/motif";
import { CONDITION_TONE } from "@/components/product/condition-ladder";
import { activeSelection, type SeasonalSelection } from "@/config/selections";
import { getPricedCatalogue } from "@/lib/catalogue";
import { marketByCondition } from "@/lib/catalogue/market";
import { CONDITION_LABELS } from "@/lib/constants";
import { isDemoCatalogueActive } from "@/lib/mock";
import { formatPrice } from "@/lib/utils";
import type { Product, ProductCondition } from "@/types";

/** The cheapest second-hand price of a product, refurbished or used. */
export function secondHandPrice(
  product: Product,
): { condition: ProductCondition; cents: number } | undefined {
  const rows = marketByCondition(product.offers).filter(
    (row) => row.condition !== "new" && row.lowestCents,
  );
  const best = rows.sort((a, b) => (a.lowestCents ?? 0) - (b.lowestCents ?? 0))[0];
  return best ? { condition: best.condition, cents: best.lowestCents as number } : undefined;
}

/** The selection's products that are priced right now, in its order. */
export async function selectionProducts(selection: SeasonalSelection): Promise<Product[]> {
  if (isDemoCatalogueActive()) return [];
  const catalogue = await getPricedCatalogue();
  return selection.products
    .map((slug) => catalogue.find((product) => product.id === slug))
    .filter((product): product is Product => Boolean(product && product.offers.length > 0));
}

/**
 * A band for the occasion of the moment (Christmas, the sales…), shown on the
 * home page during its dates only. It names a few products of the selection
 * with their second-hand price, and links to the full selection.
 */
export async function SeasonalBanner() {
  const selection = activeSelection();
  if (!selection) return null;
  const products = (await selectionProducts(selection)).slice(0, 6);
  if (products.length < 3) return null;

  return (
    <section aria-labelledby={`selection-${selection.slug}`} className="py-10">
      <Container>
        <div className="bg-brand-50 relative overflow-hidden rounded-xl border px-6 py-7 text-foreground sm:px-8 sm:py-8">
          <Motif kind={selection.motif} className="text-primary opacity-[0.28]" />
          <div className="relative max-w-2xl space-y-3">
            <p className="text-sm font-medium text-primary">{selection.name}</p>
            <h2
              id={`selection-${selection.slug}`}
              className="text-2xl leading-tight font-bold tracking-tight text-balance sm:text-3xl"
            >
              {selection.title}
            </h2>
            <p className="text-muted-foreground">{selection.lead}</p>
          </div>
          <ul className="relative mt-6 flex flex-wrap gap-2">
            {products.map((product) => {
              const price = secondHandPrice(product);
              return (
                <li key={product.id}>
                  <LocaleLink
                    href={`/product/${encodeURIComponent(product.id)}`}
                    className="inline-flex items-center gap-2 rounded-lg border bg-white py-1.5 pr-1.5 pl-3 text-sm hover:border-primary"
                  >
                    <span className="font-medium">{product.title}</span>
                    {price ? (
                      <span
                        className={`rounded-md px-1.5 py-0.5 text-xs font-medium tabular-nums ${CONDITION_TONE[price.condition]}`}
                      >
                        {formatPrice({ amount: price.cents, currency: "EUR" })}{" "}
                        {CONDITION_LABELS[price.condition].toLowerCase()}
                      </span>
                    ) : null}
                  </LocaleLink>
                </li>
              );
            })}
          </ul>
          <p className="relative mt-5">
            <LocaleLink
              href={`/selection/${selection.slug}`}
              className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
            >
              Voir toute la sélection {selection.name}
            </LocaleLink>
          </p>
        </div>
      </Container>
    </section>
  );
}
