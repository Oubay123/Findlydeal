import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { Container } from "@/components/common/container";
import { DemoBanner } from "@/components/common/demo-notice";
import { JsonLd } from "@/components/common/json-ld";
import { RatingStars } from "@/components/common/rating-stars";
import { PriceBadge } from "@/components/product/price-badge";
import { ProductComparison } from "@/components/product/product-comparison";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductReviews } from "@/components/product/product-reviews";
import { ProductSpecs } from "@/components/product/product-specs";
import { VideoReview } from "@/components/product/video-review";
import { CompareBar } from "@/components/search/compare-bar";
import { CompareToggle } from "@/components/search/compare-toggle";
import { Button } from "@/components/ui/button";
import { getCategoryBySlug } from "@/config/categories";
import { getMockProducts } from "@/lib/mock";
import { getProductById } from "@/lib/products";
import { buildProductSchema } from "@/lib/seo/json-ld";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

/**
 * Prerender every product we already know about, so a visit is served from
 * cache instead of re-rendering the page.
 *
 * `dynamicParams` stays true: once a real source is connected, ids that did
 * not exist at build time must still render on demand rather than 404.
 */
export function generateStaticParams() {
  return getMockProducts().map((product) => ({ id: product.id }));
}

export const dynamicParams = true;

/**
 * Rebuild a product page at most once an hour.
 *
 * No effect today — the demonstration catalogue is a compiled constant and
 * cannot change between builds. It is here as the shape the real pipeline
 * needs: when adapters start returning live prices, this is the knob that
 * decides how stale a displayed price may be.
 */
export const revalidate = 3600;

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(decodeURIComponent(id));
  if (!product) return { title: "Produit introuvable" };

  const description = product.description
    ? product.description.slice(0, 155)
    : `Comparez toutes les offres pour ${product.title}.`;

  return {
    title: product.title,
    description,
    alternates: { canonical: `/product/${encodeURIComponent(product.id)}` },
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
 * Not a 404 when the product is missing: an offer id can expire between the
 * search and the click, and a dead end here would waste the visit.
 */
export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProductById(decodeURIComponent(id));

  if (!product) {
    return (
      <Container className="max-w-2xl space-y-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Ce produit n&apos;est plus disponible</h1>
        <p className="text-sm leading-relaxed text-muted-foreground">
          L&apos;offre a peut-être expiré, ou aucune source n&apos;est encore connectée. Essayez de
          le rechercher à nouveau.
        </p>
        <Button asChild size="md">
          <Link href="/search">Retour à la recherche</Link>
        </Button>
      </Container>
    );
  }

  const category = product.categorySlug ? getCategoryBySlug(product.categorySlug) : undefined;
  const { bestOffer } = product;

  return (
    <>
      <DemoBanner />
      <JsonLd data={buildProductSchema(product)} />

      <Container className="max-w-6xl space-y-10 py-10">
        <Breadcrumbs
          items={[
            { name: "Comparateur", href: "/search" },
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
            {product.brand ? (
              <p className="text-sm font-semibold tracking-wide text-primary uppercase">
                {product.brand}
              </p>
            ) : null}

            <h1 className="text-2xl leading-tight font-bold sm:text-3xl">{product.title}</h1>

            {product.rating ? (
              <RatingStars value={product.rating.value} count={product.rating.count} size="md" />
            ) : null}

            {bestOffer ? (
              <div className="space-y-1.5 rounded-2xl bg-cream p-5">
                <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  Meilleur prix trouvé
                </p>
                <PriceBadge
                  size="lg"
                  price={bestOffer.totalPrice}
                  comparedTo={bestOffer.deal?.referencePrice}
                />
                <p className="text-xs text-muted-foreground">
                  sur {bestOffer.source} · livraison incluse · {product.offers.length} offres
                  comparées
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

        <ProductComparison product={product} />

        <div className="space-y-4">
          <ProductSpecs specs={product.specs ?? []} />
          <ProductReviews reviews={product.reviews ?? []} rating={product.rating} />
          {/* Renders nothing until a review video is attached to the product. */}
          <VideoReview videoId={product.videoReviewId} title={`Test de ${product.title}`} />
        </div>
      </Container>

      <Suspense fallback={null}>
        <CompareBar />
      </Suspense>
    </>
  );
}
