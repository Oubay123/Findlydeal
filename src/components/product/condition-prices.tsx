import { LocaleLink } from "@/components/common/locale-link";
import { CONDITION_TONE } from "@/components/product/condition-ladder";
import { CONDITION_LABELS } from "@/lib/constants";
import { lastFetchedAt, marketByCondition } from "@/lib/catalogue/market";
import { formatPrice, formatRelativeTime } from "@/lib/utils";
import type { Offer } from "@/types";

const eur = (cents: number) => formatPrice({ amount: cents, currency: "EUR" });

/**
 * The market at a glance: for new, refurbished and used, the cheapest offer,
 * how many offers, and how much a second-hand condition saves against the
 * cheapest new offer right now. Only offers priced in line with the others
 * count; a doubtful listing never sets a figure.
 */
export function ConditionPrices({ offers }: { offers: Offer[] }) {
  const market = marketByCondition(offers);
  if (market.filter((row) => row.lowestCents).length < 2) return null;
  const fetchedAt = lastFetchedAt(offers);

  return (
    <section aria-labelledby="market-now" className="space-y-2">
      <h2 id="market-now" className="text-sm font-semibold">
        Prix livrés les plus bas
      </h2>
      <dl className="grid grid-cols-3 divide-x overflow-hidden rounded-xl border bg-white text-center">
        {market.map(({ condition, lowestCents, count, gapWithNewPercent }) => (
          <div key={condition} className="px-2 py-3.5">
            <dt>
              <span
                className={`inline-block rounded-md px-1.5 py-0.5 text-xs font-medium ${CONDITION_TONE[condition]}`}
              >
                {CONDITION_LABELS[condition]}
              </span>
            </dt>
            <dd className="mt-1">
              {lowestCents ? (
                <>
                  <span className="block text-lg font-bold tabular-nums">{eur(lowestCents)}</span>
                  <span className="block text-[0.7rem] text-muted-foreground">
                    {count} offre{count > 1 ? "s" : ""}
                  </span>
                  {gapWithNewPercent ? (
                    <span className="mt-0.5 block text-xs font-medium text-deal">
                      −{gapWithNewPercent} % par rapport au neuf
                    </span>
                  ) : null}
                </>
              ) : (
                <span className="block pt-1 text-sm text-muted-foreground">Aucune offre</span>
              )}
            </dd>
          </div>
        ))}
      </dl>
      <p className="text-[0.7rem] leading-relaxed text-muted-foreground">
        Offre la moins chère de chaque état, livraison comprise
        {fetchedAt ? `, relevée ${formatRelativeTime(fetchedAt)}` : ""}. L&apos;écart compare deux
        offres disponibles au même moment ; ce n&apos;est pas une remise.{" "}
        <LocaleLink href="/barometre-des-prix" className="underline underline-offset-2">
          Baromètre des prix
        </LocaleLink>
      </p>
    </section>
  );
}
