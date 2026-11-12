import { getReferencePrices, REFERENCE_PRICES_CHECKED_AT } from "@/config/reference-prices";
import { lowestNewCents } from "@/lib/catalogue/market";
import { formatPrice } from "@/lib/utils";
import type { Offer } from "@/types";

const eur = (euros: number) => formatPrice({ amount: Math.round(euros * 100), currency: "EUR" });
const checkedOn = new Date(`${REFERENCE_PRICES_CHECKED_AT}T12:00:00Z`).toLocaleDateString("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

/**
 * The new price at official sellers (the brand's store, retailers selling in
 * their own name), read on a given day. It lets a visitor check the "new"
 * figure against more than the marketplaces: one eBay seller can list a new
 * item far above or below what the shops ask.
 */
export function OfficialNewPrices({ slug, offers }: { slug: string; offers: Offer[] }) {
  const prices = getReferencePrices(slug);
  if (prices.length === 0) return null;
  const lowest = prices[0]!;
  const marketNew = lowestNewCents(offers);
  const gap = marketNew ? Math.round(((marketNew / 100 - lowest.euros) / lowest.euros) * 100) : 0;

  return (
    <section aria-labelledby="official-new" className="space-y-2">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h2 id="official-new" className="text-sm font-semibold">
          Prix neuf chez les vendeurs officiels
        </h2>
        <p className="text-xs text-muted-foreground">Relevés le {checkedOn}</p>
      </div>
      <ul className="divide-y border-y text-sm">
        {prices.map((price) => (
          <li key={price.seller} className="flex items-baseline justify-between gap-4 py-2">
            <span>
              <a
                href={price.url}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="underline-offset-2 hover:underline"
              >
                {price.seller}
              </a>
              <span className="text-muted-foreground">
                {price.kind === "brand" ? ", boutique de la marque" : ""}
                {price.note ? ` (${price.note})` : ""}
              </span>
            </span>
            <span className="font-medium tabular-nums">{eur(price.euros)}</span>
          </li>
        ))}
      </ul>
      <p className="text-xs leading-relaxed text-muted-foreground">
        Prix affichés par ces vendeurs le jour du relevé, susceptibles d&apos;avoir changé depuis.
        {marketNew && Math.abs(gap) >= 3
          ? ` Le neuf le moins cher sur eBay est ${gap < 0 ? `${-gap} % en dessous` : `${gap} % au-dessus`} du prix officiel le plus bas.`
          : ""}
      </p>
    </section>
  );
}
