import { Container } from "@/components/common/container";
import { LocaleLink } from "@/components/common/locale-link";
import { SmartImage } from "@/components/common/smart-image";
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
  const products = (await selectionProducts(selection))
    .filter((product) => product.imageUrl)
    .slice(0, 6);
  if (products.length < 3) return null;

  return (
    <section aria-labelledby={`selection-${selection.slug}`} className="border-b py-14">
      <Container className="space-y-8">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
          <div className="max-w-2xl space-y-2">
            <p className="text-sm font-medium text-primary">{selection.name}</p>
            <h2
              id={`selection-${selection.slug}`}
              className="text-2xl leading-tight font-bold tracking-tight text-balance sm:text-3xl"
            >
              {selection.title}
            </h2>
            <p className="text-muted-foreground">{selection.lead}</p>
          </div>
          <LocaleLink
            href={`/selection/${selection.slug}`}
            className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            Toute la sélection {selection.name}
          </LocaleLink>
        </div>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
          {products.map((product) => {
            const price = secondHandPrice(product);
            return (
              <li key={product.id}>
                <LocaleLink
                  href={`/product/${encodeURIComponent(product.id)}`}
                  className="group block space-y-2"
                >
                  <span className="flex aspect-square items-center justify-center overflow-hidden rounded-2xl border bg-white transition-colors group-hover:border-primary">
                    {product.imageUrl ? (
                      <SmartImage
                        context="tile"
                        src={product.imageUrl}
                        alt=""
                        width={160}
                        height={160}
                        className="size-[80%] object-contain"
                      />
                    ) : null}
                  </span>
                  <span className="block text-sm leading-snug font-medium">{product.title}</span>
                  {price ? (
                    <span
                      className={`inline-block rounded-md px-1.5 py-0.5 text-xs font-medium tabular-nums ${CONDITION_TONE[price.condition]}`}
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
      </Container>
    </section>
  );
}
