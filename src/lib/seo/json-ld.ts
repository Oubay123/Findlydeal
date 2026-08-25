import { siteConfig } from "@/config/site";
import type { BlogArticle } from "@/types/blog";
import type { Product } from "@/types";

/**
 * schema.org builders.
 *
 * Structured data is what lets a search engine show a price, a rating or a
 * publication date directly in the results. Every builder here returns a plain
 * object; `<JsonLd>` serialises it into the page.
 *
 * Honesty note: prices come from the demonstration catalogue for now. The
 * `Offer` nodes below therefore describe example data — which is why
 * `availability` is the only claim made, and why no `priceValidUntil` is
 * emitted. Revisit when real sources are live.
 */

const CONDITION_SCHEMA: Record<string, string> = {
  new: "https://schema.org/NewCondition",
  refurbished: "https://schema.org/RefurbishedCondition",
  used: "https://schema.org/UsedCondition",
  unknown: "https://schema.org/UsedCondition",
};

function absoluteUrl(path: string): string {
  return new URL(path, siteConfig.url).toString();
}

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    logo: absoluteUrl("/icon.svg"),
  };
}

export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: absoluteUrl("/search?q={search_term_string}"),
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function buildProductSchema(product: Product) {
  const offers = product.offers.map((offer) => ({
    "@type": "Offer",
    url: absoluteUrl(`/product/${encodeURIComponent(product.id)}`),
    price: (offer.totalPrice.amount / 100).toFixed(2),
    priceCurrency: offer.totalPrice.currency,
    itemCondition: CONDITION_SCHEMA[offer.condition],
    availability:
      offer.availability === "in_stock"
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    seller: offer.seller ? { "@type": "Organization", name: offer.seller.name } : undefined,
  }));

  const prices = product.offers.map((offer) => offer.totalPrice.amount);

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.images?.length
      ? product.images
      : product.imageUrl
        ? [product.imageUrl]
        : undefined,
    brand: product.brand ? { "@type": "Brand", name: product.brand } : undefined,
    model: product.model,
    aggregateRating: product.rating
      ? {
          "@type": "AggregateRating",
          ratingValue: product.rating.value,
          reviewCount: product.rating.count,
          bestRating: 5,
          worstRating: 1,
        }
      : undefined,
    review: product.reviews?.map((review) => ({
      "@type": "Review",
      author: { "@type": "Person", name: review.author },
      datePublished: review.date,
      reviewBody: review.comment,
      reviewRating: {
        "@type": "Rating",
        ratingValue: review.rating,
        bestRating: 5,
        worstRating: 1,
      },
    })),
    offers:
      offers.length > 1
        ? {
            "@type": "AggregateOffer",
            offerCount: offers.length,
            lowPrice: (Math.min(...prices) / 100).toFixed(2),
            highPrice: (Math.max(...prices) / 100).toFixed(2),
            priceCurrency: product.offers[0]?.totalPrice.currency,
            offers,
          }
        : offers[0],
  };
}

export function buildArticleSchema(article: BlogArticle) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: [article.cover.src],
    datePublished: article.date,
    dateModified: article.updatedAt ?? article.date,
    author: { "@type": "Organization", name: article.author.name, url: siteConfig.url },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: { "@type": "ImageObject", url: absoluteUrl("/icon.svg") },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(`/blog/${article.slug}`),
    },
    keywords: article.tags.join(", "),
  };
}

export function buildBreadcrumbSchema(items: { name: string; href?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.href ? { item: absoluteUrl(item.href) } : {}),
    })),
  };
}
