import { Suspense } from "react";
import { Container } from "@/components/common/container";
import { LocaleLink } from "@/components/common/locale-link";
import { Motif } from "@/components/common/motif";
import { ConditionLadder } from "@/components/product/condition-ladder";
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

/** The example shown beside the search: a well-known product priced in all three conditions. */
function pickExample(products: Product[]): Product | undefined {
  const complete = (product: Product) =>
    marketByCondition(product.offers).filter((row) => row.lowestCents).length === 3;
  return (
    products.find((product) => product.id === POPULAR[0] && complete(product)) ??
    products.find((product) => POPULAR.includes(product.id) && complete(product)) ??
    products.find(complete)
  );
}

/**
 * Above the fold: what the site does, said once, the search, and a real
 * product priced new, refurbished and used right now. No stock photo: the
 * prices are the picture.
 */
export async function HeroSection() {
  const products = isDemoCatalogueActive() ? [] : await getPricedCatalogue();
  const example = pickExample(products);
  const popular = POPULAR.map((slug) => products.find((product) => product.id === slug)).filter(
    (product): product is Product => Boolean(product),
  );

  return (
    <section className="bg-brand-50 relative overflow-hidden border-b">
      <Motif kind="dots" className="text-primary opacity-30" />
      <Container className="relative grid grid-cols-1 gap-10 py-14 sm:py-20 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:items-center">
        <div className="space-y-6">
          <h1 className="max-w-xl text-4xl leading-[1.1] font-bold tracking-tight text-balance sm:text-5xl">
            Le même produit, neuf, reconditionné ou d&apos;occasion.
          </h1>
          <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">
            Findlydeal relève les offres livrables en France et vous montre, pour chaque modèle, ce
            que vous économisez en passant à la seconde main.
          </p>
          <div className="max-w-xl">
            <Suspense fallback={null}>
              <SearchBar variant="hero" />
            </Suspense>
          </div>
          {popular.length > 0 ? (
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="text-muted-foreground">Recherchés :</span>
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
        </div>

        {example ? (
          <LocaleLink
            href={`/product/${encodeURIComponent(example.id)}`}
            className="block rounded-2xl border bg-white p-6 transition-colors hover:border-primary sm:p-7"
          >
            <p className="text-sm text-muted-foreground">En ce moment</p>
            <p className="mt-1 text-xl font-semibold">{example.title}</p>
            <ConditionLadder offers={example.offers} size="large" className="mt-5" />
            <p className="mt-5 text-sm text-muted-foreground">
              Prix livrés les plus bas, relevés sur {example.offerCount ?? example.offers.length}{" "}
              annonces.
            </p>
          </LocaleLink>
        ) : null}
      </Container>
    </section>
  );
}
