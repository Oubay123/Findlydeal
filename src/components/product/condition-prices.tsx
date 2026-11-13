import { LocaleLink } from "@/components/common/locale-link";
import { CONDITION_LABELS } from "@/lib/constants";
import { isStale, lastFetchedAt, marketByCondition } from "@/lib/catalogue/market";
import { cn, formatPrice, formatRelativeTime } from "@/lib/utils";
import type { Offer } from "@/types";

const eur = (cents: number) => formatPrice({ amount: cents, currency: "EUR" });

/**
 * The market at a glance: for new, refurbished and used, the cheapest
 * delivered offer, drawn as a bar whose length is the price. The bars make
 * the gap readable before any figure is: no tint per condition, only the
 * cheapest bar takes the brand colour. Only offers priced in line with the
 * others count; a doubtful listing never sets a figure.
 */
export function ConditionPrices({ offers }: { offers: Offer[] }) {
  const market = marketByCondition(offers);
  const priced = market.filter((row) => row.lowestCents);
  if (priced.length < 2) return null;
  const fetchedAt = lastFetchedAt(offers);
  const highest = Math.max(...priced.map((row) => row.lowestCents as number));
  const lowest = Math.min(...priced.map((row) => row.lowestCents as number));

  return (
    <section aria-labelledby="market-now">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h2 id="market-now" className="text-sm font-semibold">
          Prix livrés les plus bas
        </h2>
        {fetchedAt ? (
          <p className="text-xs text-muted-foreground">
            {isStale(offers)
              ? "Derniers relevés anciens : les prix ont pu changer"
              : `Relevés ${formatRelativeTime(fetchedAt)}`}
          </p>
        ) : null}
      </div>
      <dl className="reveal-group mt-2 divide-y border-y">
        {market.map(({ condition, lowestCents, count, gapWithNewPercent }) => {
          const isLowest = lowestCents === lowest;
          return (
            <div
              key={condition}
              className="grid grid-cols-[6.5rem_minmax(0,1fr)_7.5rem] items-center gap-x-4 py-3 sm:grid-cols-[8rem_minmax(0,1fr)_8rem]"
            >
              <dt>
                <span className="block text-sm font-medium">{CONDITION_LABELS[condition]}</span>
                <span className="block text-xs text-muted-foreground">
                  {count > 0 ? `${count} offre${count > 1 ? "s" : ""}` : "Aucune offre"}
                </span>
              </dt>
              <div aria-hidden className="h-1.5 overflow-hidden rounded-full bg-muted">
                {lowestCents ? (
                  <span
                    className={cn(
                      "reveal-bar block h-full rounded-full",
                      isLowest ? "bg-primary" : "bg-foreground/30",
                    )}
                    style={{ width: `${Math.max(6, (lowestCents / highest) * 100)}%` }}
                  />
                ) : null}
              </div>
              <dd className="text-right">
                {lowestCents ? (
                  <>
                    <span
                      className={cn(
                        "block text-lg leading-tight font-semibold tabular-nums",
                        isLowest && "text-primary",
                      )}
                    >
                      {eur(lowestCents)}
                    </span>
                    <span className="block text-xs text-muted-foreground tabular-nums">
                      {gapWithNewPercent ? `${gapWithNewPercent} % sous le neuf` : " "}
                    </span>
                  </>
                ) : (
                  <span className="text-sm text-muted-foreground">-</span>
                )}
              </dd>
            </div>
          );
        })}
      </dl>
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
        Offre la moins chère de chaque état, livraison comprise. L&apos;écart compare deux offres
        disponibles au même moment ; ce n&apos;est pas une remise.{" "}
        <LocaleLink href="/barometre-des-prix" className="underline underline-offset-2">
          Baromètre des prix
        </LocaleLink>
      </p>
    </section>
  );
}
