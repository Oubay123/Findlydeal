import { Suspense } from "react";
import { Container } from "@/components/common/container";
import { LocaleLink } from "@/components/common/locale-link";
import { HeroBackdrop } from "@/components/home/hero-backdrop";
import { SearchBar } from "@/components/search/search-bar";
import { getPricedCatalogue } from "@/lib/catalogue";
import { isDemoCatalogueActive } from "@/lib/mock";
import { unsplash } from "@/lib/utils/images";
import type { Product } from "@/types";

/**
 * Product photographs behind the headline, one per universe the site covers.
 * Editorial photos (Unsplash licence, free commercial use): an object on a
 * calm surface, lots of empty space, no people, no shopping bags. Listing
 * photos from eBay are never used here: they belong to their sellers.
 */
const PHOTOS = [
  unsplash("photo-1517336714731-489689fd1ca8", 1920), // ordinateur portable
  unsplash("photo-1505740420928-5e560c06d30e", 1920), // casque
  unsplash("photo-1546868871-7041f2a55e12", 1920), // montre connectée
  unsplash("photo-1555041469-a586c61ea9bc", 1920), // canapé
  unsplash("photo-1606813907291-d86efa9b94db", 1920), // manette
  unsplash("photo-1524592094714-0f0654e20314", 1920), // montre
];

/** Products people look for second hand, offered as one-click starting points. */
const POPULAR = [
  "apple-iphone-13-128go-minuit",
  "nintendo-switch-oled",
  "sony-playstation-5-slim-standard",
  "apple-macbook-air-m1-13-256-go",
  "dyson-v15-detect-absolute",
  "vorwerk-thermomix-tm6",
];

/**
 * Above the fold: photographs fading one into the next behind a single
 * sentence and the search. A dark veil keeps the white text above 4.5:1
 * whatever the photo; the search field is the only control.
 */
export async function HeroSection() {
  const products = isDemoCatalogueActive() ? [] : await getPricedCatalogue();
  const popular = POPULAR.map((slug) => products.find((product) => product.id === slug)).filter(
    (product): product is Product => Boolean(product),
  );

  return (
    <section className="relative isolate overflow-hidden bg-neutral-900 text-white">
      <HeroBackdrop photos={PHOTOS} />
      <div aria-hidden className="absolute inset-0 -z-10 bg-black/50" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-b from-black/30 via-transparent to-black/50"
      />

      <Container className="hero-exit flex min-h-[34rem] flex-col items-center justify-center py-20 text-center sm:min-h-[40rem] sm:py-28">
        <h1 className="max-w-3xl text-4xl leading-[1.06] font-semibold tracking-tight text-balance sm:text-6xl">
          Le même produit, neuf, reconditionné ou d&apos;occasion.
        </h1>
        <p className="mt-5 max-w-xl text-lg text-pretty text-white/80">
          Les prix livrés en France, côte à côte, pour chaque modèle.
        </p>
        <div className="mt-9 w-full max-w-xl">
          <Suspense fallback={null}>
            <SearchBar variant="hero" />
          </Suspense>
        </div>
        {popular.length > 0 ? (
          <p className="mt-6 flex max-w-xl flex-wrap justify-center gap-x-5 gap-y-0 text-sm text-white/75">
            {popular.map((product) => (
              <LocaleLink
                key={product.id}
                href={`/product/${encodeURIComponent(product.id)}`}
                className="py-1.5 underline-offset-4 hover:text-white hover:underline"
              >
                {product.model ?? product.title.replace(`${product.brand ?? ""} `, "")}
              </LocaleLink>
            ))}
          </p>
        ) : null}
      </Container>
    </section>
  );
}
