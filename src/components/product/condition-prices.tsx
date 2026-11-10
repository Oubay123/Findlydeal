import { LocaleLink } from "@/components/common/locale-link";
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
      <h2
        id="market-now"
        className="text-xs font-semibold tracking-wide text-muted-foreground uppercase"
      >
        Le marché en ce moment
      </h2>
      <dl className="grid grid-cols-3 divide-x overflow-hidden rounded-2xl border bg-white text-center">
        {market.map(({ condition, lowestCents, count, gapWithNewPercent }) => (
          <div key={condition} className="px-2 py-3.5">
            <dt className="text-xs font-medium text-muted-foreground">
              {CONDITION_LABELS[condition]}
            </dt>
            <dd className="mt-1">
              {lowestCents ? (
                <>
                  <span className="block font-display text-base font-bold tabular-nums sm:text-lg">
                    {eur(lowestCents)}
                  </span>
                  <span className="block text-[0.7rem] text-muted-foreground">
                    dès · {count} offre{count > 1 ? "s" : ""}
                  </span>
                  {gapWithNewPercent ? (
                    <span className="mt-1 inline-block rounded-md bg-emerald-50 px-1.5 py-0.5 text-[0.7rem] font-semibold text-emerald-800">
                      {gapWithNewPercent} % de moins que le neuf
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
