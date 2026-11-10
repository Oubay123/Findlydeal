import { Suspense } from "react";
import { Container } from "@/components/common/container";
import { LocaleLink } from "@/components/common/locale-link";
import { ProductStrip } from "@/components/home/product-strip";
import { SearchBar } from "@/components/search/search-bar";
import { getPricedCatalogue } from "@/lib/catalogue";
import { marketByCondition } from "@/lib/catalogue/market";
import { isDemoCatalogueActive } from "@/lib/mock";
import type { Product } from "@/types";

/** Products people look for second hand, offered as one-click starting points. */
const POPULAR = [
  "apple-iphone-13-128go-minuit",
  "nintendo-switch-oled",
  "sony-playstation-5-slim-standard",
  "apple-macbook-air-m1-13-256-go",
  "dyson-v15-detect-absolute",
  "vorwerk-thermomix-tm6",
  "babyzen-yoyo2",
  "stokke-tripp-trapp",
];

/** Products with a photo and a price in every condition, at most two per category. */
function stripProducts(products: Product[]): Product[] {
  const perCategory = new Map<string, number>();
  const picked: Product[] = [];
  const ordered = [
    ...POPULAR.map((slug) => products.find((product) => product.id === slug)),
    ...products,
  ].filter((product): product is Product => Boolean(product));
  for (const product of ordered) {
    if (picked.includes(product) || !product.imageUrl) continue;
    if (marketByCondition(product.offers).filter((row) => row.lowestCents).length < 3) continue;
    const key = product.categorySlug ?? "";
    const count = perCategory.get(key) ?? 0;
    if (count >= 2) continue;
    perCategory.set(key, count + 1);
    picked.push(product);
    if (picked.length === 14) break;
  }
  return picked;
}

/**
 * Above the fold: one sentence, the search, and under them a slow strip of
 * product photos from the catalogue. Nothing else competes with the search
 * field.
 */
export async function HeroSection() {
  const products = isDemoCatalogueActive() ? [] : await getPricedCatalogue();
  const popular = POPULAR.map((slug) => products.find((product) => product.id === slug)).filter(
    (product): product is Product => Boolean(product),
  );

  return (
    <section className="bg-brand-50 overflow-hidden border-b">
      <Container className="flex flex-col items-center pt-16 pb-10 text-center sm:pt-24 sm:pb-14">
        <h1 className="max-w-2xl text-4xl leading-[1.08] font-bold tracking-tight text-balance sm:text-5xl">
          Le même produit, neuf, reconditionné ou d&apos;occasion.
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted-foreground">
          Les prix livrés en France, côte à côte, pour chaque modèle.
        </p>
        <div className="mt-8 w-full max-w-xl">
          <Suspense fallback={null}>
            <SearchBar variant="hero" />
          </Suspense>
        </div>
        {popular.length > 0 ? (
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-sm">
            {popular.slice(0, 6).map((product) => (
              <LocaleLink
                key={product.id}
                href={`/product/${encodeURIComponent(product.id)}`}
                className="rounded-full border bg-white px-3 py-1 text-foreground/85 hover:border-primary hover:text-primary"
              >
                {product.model ?? product.title.replace(`${product.brand ?? ""} `, "")}
              </LocaleLink>
            ))}
          </div>
        ) : null}
      </Container>
      <ProductStrip products={stripProducts(products)} className="strip-fade pb-12 sm:pb-16" />
    </section>
  );
}
