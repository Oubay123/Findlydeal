import { Container } from "@/components/common/container";
import { LocaleLink } from "@/components/common/locale-link";
import { ProductCard } from "@/components/product/product-card";
import { getPricedCatalogue } from "@/lib/catalogue";
import { marketByCondition } from "@/lib/catalogue/market";
import { isDemoCatalogueActive } from "@/lib/mock";
import { getBestDeals } from "@/lib/products/collections";
import type { Product } from "@/types";

const COUNT = 8;

/** Largest saving of a refurbished or used offer against the cheapest new one. */
function largestGap(product: Product): number {
  return Math.max(0, ...marketByCondition(product.offers).map((row) => row.gapWithNewPercent ?? 0));
}

/**
 * The one product grid of the home page: the models where second hand saves
 * the most right now, against the cheapest new offer. One category is not
 * allowed to fill the grid, so the selection shows the range of the catalogue.
 * In demonstration mode, the deals of the demo catalogue instead.
 */
export async function HomeDeals() {
  let products: Product[];
  if (isDemoCatalogueActive()) {
    products = await getBestDeals(COUNT);
  } else {
    const ranked = (await getPricedCatalogue())
      .filter((product) => largestGap(product) >= 15)
      .sort((a, b) => largestGap(b) - largestGap(a));
    const perCategory = new Map<string, number>();
    products = [];
    for (const product of ranked) {
      const key = product.categorySlug ?? "";
      if ((perCategory.get(key) ?? 0) >= 2) continue;
      perCategory.set(key, (perCategory.get(key) ?? 0) + 1);
      products.push(product);
      if (products.length === COUNT) break;
    }
  }
  if (products.length === 0) return null;

  return (
    <section aria-labelledby="home-deals" className="py-16">
      <Container className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 id="home-deals" className="text-2xl font-bold tracking-tight sm:text-3xl">
              Les plus gros écarts avec le neuf
            </h2>
            <p className="mt-1 text-muted-foreground">
              Modèles où le reconditionné ou l&apos;occasion coûte le moins par rapport au neuf, en
              ce moment.
            </p>
          </div>
          <LocaleLink
            href="/barometre-des-prix"
            className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            Tous les écarts de prix
          </LocaleLink>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {products.map((product, index) => (
            // Four on a phone, where eight cards would push everything else away.
            <div key={product.id} className={index >= 4 ? "hidden sm:contents" : "contents"}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
