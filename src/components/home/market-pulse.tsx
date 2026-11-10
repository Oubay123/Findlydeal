import { ArrowRight } from "lucide-react";
import { Container } from "@/components/common/container";
import { LocaleLink } from "@/components/common/locale-link";
import { getPricedCatalogue } from "@/lib/catalogue";
import { marketByCondition, summarize } from "@/lib/catalogue/market";
import { isDemoCatalogueActive } from "@/lib/mock";

/**
 * Home band with the live market figures: how much refurbished and used
 * cost against new right now, over the whole catalogue. Links to the
 * barometer. Hidden in demonstration mode and while too few products have
 * both conditions for a median to mean anything.
 */
export async function MarketPulse() {
  if (isDemoCatalogueActive()) return null;
  const products = await getPricedCatalogue();
  const summary = summarize(
    products.map((product) => ({ product, market: marketByCondition(product.offers) })),
  );
  if (summary.refurbishedGap === undefined && summary.usedGap === undefined) return null;

  const figures = [
    { value: String(summary.products), label: "produits suivis, prix relevés toutes les 3 h" },
    summary.refurbishedGap !== undefined
      ? {
          value: `−${summary.refurbishedGap} %`,
          label: "en reconditionné face au neuf (écart médian)",
        }
      : null,
    summary.usedGap !== undefined
      ? { value: `−${summary.usedGap} %`, label: "en occasion face au neuf (écart médian)" }
      : null,
  ].filter((figure): figure is { value: string; label: string } => figure !== null);

  return (
    <section aria-labelledby="market-pulse" className="bg-cream/60 py-14">
      <Container className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 id="market-pulse" className="font-display text-2xl font-bold sm:text-3xl">
              Le marché en ce moment
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Ce que coûte la seconde main par rapport au neuf, sur les offres réelles.
            </p>
          </div>
          <LocaleLink
            href="/barometre-des-prix"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
          >
            Voir le baromètre des prix <ArrowRight className="size-4" aria-hidden />
          </LocaleLink>
        </div>
        <dl className="grid gap-3 sm:grid-cols-3">
          {figures.map((figure) => (
            <div key={figure.label} className="rounded-2xl border bg-white px-6 py-5">
              <dt className="sr-only">{figure.label}</dt>
              <dd className="font-display text-3xl font-bold tabular-nums">{figure.value}</dd>
              <dd className="mt-1 text-sm text-muted-foreground">{figure.label}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
