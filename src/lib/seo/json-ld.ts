import { siteConfig } from "@/config/site";
import { localePath, type UiLocale } from "@/i18n";
import type { FaqItem } from "@/config/faq";
import type { BlogArticle } from "@/types/blog";
import type { Product } from "@/types";
import profile from "@/lib/seo/schema/profile.json";

/**
 * schema.org structured data, emitted as one linked graph per page.
 *
 * The rules come from `./schema/profile.json` — the single reference shared
 * with the build check (`npm run check:schema`) and explained in
 * `docs/donnees-structurees.md`. In short:
 *
 * 1. **One entity, one stable `@id`.** The organization, the website, each
 *    page and what it is about get an identifier built from the page URL plus a
 *    fragment. Blocks refer to each other by `@id` instead of repeating
 *    themselves, so search engines and answer engines read one graph, not a
 *    pile of unrelated fragments.
 * 2. **Only what the page shows.** A property is emitted when a real value
 *    exists and is visible to the visitor. Nothing is defaulted or guessed: an
 *    unknown condition or availability is left out rather than invented.
 * 3. **Controlled vocabularies.** Conditions and availability use the official
 *    schema.org URIs. Refurbishment grades, which schema.org has no term for,
 *    are a `DefinedTermSet` published on the page that explains them.
 */

type JsonLdNode = { [key: string]: unknown };

export interface JsonLdGraph {
  "@context": string;
  "@graph": JsonLdNode[];
}

const LANGUAGE = profile.language;

/** Absolute URL for a site-relative path that already carries its locale. */
export function absoluteUrl(path: string): string {
  return new URL(path, siteConfig.url).toString();
}

/** Absolute URL of a route (`/search`) in a given locale (`/fr/search`). */
export function pageUrl(locale: UiLocale, path: string): string {
  return absoluteUrl(localePath(locale, path));
}

/** Stable identifiers, as declared in `profile.json` (`ids`). */
export const schemaIds = {
  organization: () => `${siteConfig.url}/#organization`,
  website: () => `${siteConfig.url}/#website`,
  webPage: (url: string) => `${url}#webpage`,
  breadcrumb: (url: string) => `${url}#breadcrumb`,
  product: (url: string) => `${url}#product`,
  itemList: (url: string) => `${url}#itemlist`,
  article: (url: string) => `${url}#article`,
} as const;

const ref = (id: string) => ({ "@id": id });

/** Drops `undefined` and empty arrays so absent data never reaches the page. */
function compact(node: JsonLdNode): JsonLdNode {
  return Object.fromEntries(
    Object.entries(node).filter(
      ([, value]) => value !== undefined && !(Array.isArray(value) && value.length === 0),
    ),
  );
}

/** Wraps nodes into a single `@graph`, skipping the ones not emitted. */
export function buildGraph(
  ...nodes: (JsonLdNode | JsonLdNode[] | false | undefined)[]
): JsonLdGraph {
  return {
    "@context": profile.context,
    "@graph": nodes.flat().filter((node): node is JsonLdNode => Boolean(node)),
  };
}

// ---------------------------------------------------------------------------
// Site-wide entities, emitted once by the root layout.
// ---------------------------------------------------------------------------

export function organizationNode(): JsonLdNode {
  return compact({
    "@type": "Organization",
    "@id": schemaIds.organization(),
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    // Raster, at least 112 px: what Google asks of an organization logo.
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/apple-icon.png"),
      width: 180,
      height: 180,
    },
    areaServed: { "@type": "Country", name: "France" },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: siteConfig.contactEmail,
      availableLanguage: "French",
    },
    // `sameAs` is added the day official profiles exist. Never a placeholder.
  });
}

/** No `potentialAction`: the sitelinks search box was retired in November 2024. */
export function webSiteNode(): JsonLdNode {
  return {
    "@type": "WebSite",
    "@id": schemaIds.website(),
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: LANGUAGE,
    publisher: ref(schemaIds.organization()),
  };
}

// ---------------------------------------------------------------------------
// Page-level entities.
// ---------------------------------------------------------------------------

export type WebPageType = "WebPage" | "CollectionPage" | "ItemPage" | "AboutPage" | "FAQPage";

interface WebPageOptions {
  url: string;
  name: string;
  description?: string;
  type?: WebPageType;
  /** `@id` of the entity the page is about (a product, an article…). */
  about?: string;
  /** `@id` or inline node of the page's main entity. */
  mainEntity?: string | JsonLdNode | JsonLdNode[];
  /** Set when the page renders `<Breadcrumbs path=…>`, which carries this `@id`. */
  hasBreadcrumb?: boolean;
  dateModified?: string;
}

export function webPageNode({
  url,
  name,
  description,
  type = "WebPage",
  about,
  mainEntity,
  hasBreadcrumb,
  dateModified,
}: WebPageOptions): JsonLdNode {
  return compact({
    "@type": type,
    "@id": schemaIds.webPage(url),
    url,
    name,
    description,
    inLanguage: LANGUAGE,
    isPartOf: ref(schemaIds.website()),
    publisher: ref(schemaIds.organization()),
    about: about ? ref(about) : undefined,
    mainEntity: typeof mainEntity === "string" ? ref(mainEntity) : mainEntity,
    breadcrumb: hasBreadcrumb ? ref(schemaIds.breadcrumb(url)) : undefined,
    dateModified,
  });
}

/**
 * `items` hold site-relative paths without locale, as `<Breadcrumbs>` receives
 * them; they are localised here, so the structured trail points at the same
 * URLs as the visible one rather than at a redirect.
 */
export function breadcrumbNode(
  locale: UiLocale,
  items: { name: string; href?: string }[],
  url?: string,
): JsonLdNode {
  return compact({
    "@type": "BreadcrumbList",
    "@id": url ? schemaIds.breadcrumb(url) : undefined,
    itemListElement: items.map((item, index) =>
      compact({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.href ? pageUrl(locale, item.href) : undefined,
      }),
    ),
  });
}

const CONDITIONS = profile.vocabularies.itemCondition as Record<string, string>;
const AVAILABILITY = profile.vocabularies.availability as Record<string, string>;

/**
 * A product and its offers.
 *
 * Callers must not emit it for the demonstration catalogue: its prices are
 * examples. `review` and `aggregateRating` are never emitted (see the profile):
 * they come back only with genuine, visible, disclosed reviews.
 */
export function productNode(product: Product, url: string, categoryName?: string): JsonLdNode {
  const offers = product.offers.map((offer) =>
    compact({
      "@type": "Offer",
      url,
      price: (offer.totalPrice.amount / 100).toFixed(2),
      priceCurrency: offer.totalPrice.currency,
      itemCondition: CONDITIONS[offer.condition],
      availability: AVAILABILITY[offer.availability],
      seller: offer.seller ? { "@type": "Organization", name: offer.seller.name } : undefined,
    }),
  );
  const prices = product.offers.map((offer) => offer.totalPrice.amount);
  const images = product.images?.length
    ? product.images
    : product.imageUrl
      ? [product.imageUrl]
      : undefined;

  return compact({
    "@type": "Product",
    "@id": schemaIds.product(url),
    name: product.title,
    description: product.description,
    image: images,
    brand: product.brand ? { "@type": "Brand", name: product.brand } : undefined,
    model: product.model,
    category: categoryName,
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
  });
}

/** The products a listing page shows, in display order. */
export function itemListNode(url: string, items: { name: string; url: string }[]): JsonLdNode {
  return {
    "@type": "ItemList",
    "@id": schemaIds.itemList(url),
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: item.url,
    })),
  };
}

export function articleNode(article: BlogArticle, url: string): JsonLdNode {
  return compact({
    "@type": "Article",
    "@id": schemaIds.article(url),
    headline: article.title,
    description: article.description,
    image: [article.cover.src],
    datePublished: article.date,
    dateModified: article.updatedAt ?? article.date,
    inLanguage: LANGUAGE,
    // The byline is the editorial team, i.e. the organization itself.
    author: ref(schemaIds.organization()),
    publisher: ref(schemaIds.organization()),
    mainEntityOfPage: ref(schemaIds.webPage(url)),
    keywords: article.tags.join(", "),
    // The documents the article's claims come from.
    citation: article.sources?.map((source) => ({
      "@type": "CreativeWork",
      name: source.title,
      url: source.url,
      publisher: { "@type": "Organization", name: source.publisher },
    })),
  });
}

/** Questions as they appear on the page, word for word. */
export function faqEntities(items: FaqItem[]): JsonLdNode[] {
  return items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  }));
}

/**
 * The refurbishment grades, as a controlled vocabulary.
 *
 * Emitted only on the page that explains them (`vocabularies.refurbishedGrades
 * .pagePath`), whose visible text the definitions are taken from. Every grade
 * gets its own `@id`, so other pages can point at a grade instead of repeating
 * a free-text label.
 */
export function refurbishedGradesNodes(url: string): JsonLdNode[] {
  const set = profile.vocabularies.refurbishedGrades;
  const setId = `${url}#${set.slug}`;

  return [
    {
      "@type": "DefinedTermSet",
      "@id": setId,
      name: set.name,
      description: set.description,
      url,
      hasDefinedTerm: set.terms.map((term) => ref(`${setId}-${term.slug}`)),
    },
    ...set.terms.map((term) => ({
      "@type": "DefinedTerm",
      "@id": `${setId}-${term.slug}`,
      name: term.name,
      description: term.description,
      inDefinedTermSet: ref(setId),
    })),
  ];
}

/** Route of the page that carries the grade vocabulary. */
export const REFURBISHED_GRADES_PATH = profile.vocabularies.refurbishedGrades.pagePath;
