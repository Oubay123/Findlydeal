import { Button } from "@/components/ui/button";
import type { Product } from "@/types";
import { marketByCondition } from "@/lib/catalogue/market";
import { formatPrice } from "@/lib/utils";
import { CONDITION_LABELS } from "@/lib/constants";
import type { UiLocale } from "@/i18n";
import { localeAlternates } from "@/lib/seo/locale";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { Container } from "@/components/common/container";
import { DemoBanner } from "@/components/common/demo-notice";
import { JsonLd } from "@/components/common/json-ld";
import { RatingStars } from "@/components/common/rating-stars";
import { ConditionPrices } from "@/components/product/condition-prices";
import { PriceHistory } from "@/components/product/price-history";
import { ProductComparison } from "@/components/product/product-comparison";
import { ProductRow } from "@/components/product/product-row";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductReviews } from "@/components/product/product-reviews";
import { ProductSpecs } from "@/components/product/product-specs";
import { VideoReview } from "@/components/product/video-review";
import { CompareBar } from "@/components/search/compare-bar";
import { CompareToggle } from "@/components/search/compare-toggle";
import { getCategoryBySlug } from "@/config/categories";
import { getPriceHistory } from "@/lib/catalogue";
import { getSourcePresentation } from "@/config/sources";
import { getDictionary } from "@/i18n";
import { isDemoCatalogueActive } from "@/lib/mock";
import { getProductById } from "@/lib/products";
import { getSimilarProducts } from "@/lib/products/related";
import { buildGraph, pageUrl, productNode, schemaIds, webPageNode } from "@/lib/seo/json-ld";

interface ProductPageProps {
  params: Promise<{ locale: UiLocale; id: string }>;
}

/**
 * Rendered on each request, never at build time: whether prices come from
 * the demonstration catalogue or from live eBay offers depends on the
 * Worker's runtime secrets, which the build machine does not have. Live
 * marketplace answers are cached by the adapters (src/lib/ebay/cache.ts).
 */
export const dynamic = "force-dynamic";

/**
 * Only catalogue products with real offers are worth indexing. Not indexed:
 * example prices (demonstration catalogue), a product with no offer right
 * now, and a single marketplace listing (`ebay:…`), which expires within
 * days and duplicates the listing itself.
 */
function isIndexable(product: { id: string; offers: unknown[] }): boolean {
  if (isDemoCatalogueActive()) return false;
  if (product.id.includes(":")) return false;
  return product.offers.length > 0;
}

/** Title shown in search results: the model plus the intent, within ~60 characters. */
/**
 * The search result title carries the site's angle (new, refurbished, used)
 * when it fits in the ~60 characters Google shows, else a shorter intent.
 */
function productTitle(title: string): string {
  for (const suffix of [
    " : prix neuf, reconditionné, occasion",
    " : neuf ou reconditionné",
    " : comparer les prix",
  ]) {
    if (title.length + suffix.length <= 60) return title + suffix;
  }
  return title;
}

/**
 * Meta description built from the live figures when there are offers: what
 * a searcher wants to know before clicking, and true at the time of the crawl.
 */
function productDescription(product: Product): string {
  const market = marketByCondition(product.offers);
  const prices = market
    .filter((row) => row.lowestCents)
    .map(
      (row) =>
        `${CONDITION_LABELS[row.condition].toLowerCase()} dès ${formatPrice({ amount: row.lowestCents as number, currency: "EUR" })}`,
    );
  const count = product.offerCount ?? product.offers.length;
  if (prices.length > 0 && count > 0) {
    const lead = `${product.title} : ${prices.join(", ")}. ${count} offres comparées, livraison comprise.`;
    const rest = product.description ? ` ${product.description}` : "";
    return (lead + rest).length <= 158 ? lead + rest : lead.slice(0, 158);
  }
  return product.description
    ? product.description.slice(0, 155)
    : `Comparez toutes les offres pour ${product.title}.`;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { locale, id } = await params;
  const product = await getProductById(decodeURIComponent(id));
  if (!product) return { title: getDictionary(locale).product.unavailableTitle };

  const description = productDescription(product);

  return {
    /**
     * `absolute` opts out of the "%s · Findlydeal" template. On a product
     * query the brand suffix earns nothing and pushed 24 titles past the ~60
     * characters Google displays, truncating the model name instead.
     */
    title: { absolute: productTitle(product.title) },
    description,
    alternates: localeAlternates(locale, `/product/${encodeURIComponent(product.id)}`),
    ...(isIndexable(product) ? {} : { robots: { index: false, follow: true } }),
    openGraph: {
      type: "website",
      title: product.title,
      description,
      images: product.imageUrl
        ? [{ url: product.imageUrl, alt: product.imageAlt ?? product.title }]
        : undefined,
    },
  };
}

/**
 * Price comparison page for a single product.
 *
 * A missing product renders the not-found page, which Next marks `noindex`.
 * It used to answer with an "unavailable" message instead: with live
 * marketplace data, every expired listing would have become an indexable empty
 * page. The HTTP status stays 200 because this route has a `loading.tsx` and
 * streams before the lookup ends; a real 404 status needs the existence check
 * to run before streaming (see the model-page plan in docs/donnees-structurees.md).
 */
export default async function ProductPage({ params }: ProductPageProps) {
  const { locale, id } = await params;
  const product = await getProductById(decodeURIComponent(id));
  const t = getDictionary(locale);

  if (!product) notFound();

  // The similar products and the price history: one await for both.
  const [similar, priceHistory] = await Promise.all([
    getSimilarProducts(product),
    getPriceHistory(product.id),
  ]);

  const category = product.categorySlug ? getCategoryBySlug(product.categorySlug) : undefined;
  const { bestOffer } = product;
  const path = `/product/${encodeURIComponent(product.id)}`;
  const url = pageUrl(locale, path);
  // No Product, Offer or Review markup for example prices: see the schema profile.
  const isDemo = isDemoCatalogueActive();

  return (
    <>
      <DemoBanner />
      <JsonLd
        data={buildGraph(
          webPageNode({
            url,
            name: product.title,
            description: product.description,
            type: "ItemPage",
            about: isDemo ? undefined : schemaIds.product(url),
            mainEntity: isDemo ? undefined : schemaIds.product(url),
            hasBreadcrumb: true,
          }),
          !isDemo && productNode(product, url, category?.name),
        )}
      />

      <Container className="max-w-6xl space-y-10 py-10">
        <Breadcrumbs
          path={path}
          items={[
            ...(category ? [{ name: category.name, href: `/category/${category.slug}` }] : []),
            { name: product.title },
          ]}
        />

        <div className="grid gap-10 lg:grid-cols-2">
          <ProductGallery
            title={product.title}
            alt={product.imageAlt}
            images={product.images ?? []}
          />

          <div className="space-y-5">
            <div className="space-y-1.5">
              {product.brand ? (
                <p className="text-sm text-muted-foreground">{product.brand}</p>
              ) : null}
              <h1 className="text-2xl leading-tight font-semibold tracking-tight sm:text-3xl">
                {product.title}
              </h1>
            </div>

            {product.rating ? (
              <RatingStars value={product.rating.value} count={product.rating.count} size="md" />
            ) : null}

            <ConditionPrices offers={product.offers} />

            {bestOffer ? (
              <div className="space-y-2">
                <Button
                  asChild
                  size="lg"
                  className="h-12 w-full rounded-lg text-base sm:w-auto sm:px-8"
                >
                  <a
                    href={bestOffer.url}
                    target="_blank"
                    rel="sponsored nofollow noopener noreferrer"
                  >
                    Voir l&apos;offre à {formatPrice(bestOffer.totalPrice)} sur{" "}
                    {getSourcePresentation(bestOffer.source).label}
                  </a>
                </Button>
                <p className="text-xs text-muted-foreground">
                  {CONDITION_LABELS[bestOffer.condition]}, livraison comprise.
                  {product.offers.length > 1 ? (
                    <>
                      {" "}
                      <a href="#offres" className="underline underline-offset-2">
                        Voir les {product.offers.length} offres
                      </a>
                    </>
                  ) : null}
                </p>
              </div>
            ) : null}

            {product.description ? (
              <p className="text-sm leading-relaxed text-muted-foreground">{product.description}</p>
            ) : null}

            {/* Lets a visitor build a comparison without going back to the results. */}
            <Suspense fallback={null}>
              <CompareToggle
                productId={product.id}
                productTitle={product.title}
                className="sm:max-w-xs"
              />
            </Suspense>
          </div>
        </div>

        <ProductSpecs product={product} category={category} />

        <ProductComparison product={product} />

        {priceHistory.length > 0 ? <PriceHistory history={priceHistory} /> : null}

        <div className="space-y-4">
          {/* Only reviews Findlydeal can stand behind: none for live products. */}
          {!isDemo ? null : (
            <ProductReviews reviews={product.reviews ?? []} rating={product.rating} />
          )}
          {/* Renders nothing until a review video is attached to the product. */}
          <VideoReview videoId={product.videoReviewId} title={`Test de ${product.title}`} />
        </div>

        <ProductRow
          title={t.product.similar}
          description={t.product.similarBody}
          products={similar}
          href={category ? `/category/${category.slug}` : "/search"}
          linkLabel={category ? `Voir ${category.name}` : "Voir tout"}
        />
      </Container>

      <Suspense fallback={null}>
        <CompareBar />
      </Suspense>
    </>
  );
}
