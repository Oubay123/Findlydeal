import type { Dictionary } from "@/i18n/dictionaries/fr";

/**
 * English strings — the structure, waiting for its translation.
 *
 * Every value is an empty string on purpose. Two consequences, both wanted:
 *
 * 1. `getDictionary("en")` falls back to the French string for any key that is
 *    still empty, so `/en` renders a readable page rather than a blank one.
 * 2. `isLocaleTranslated("en")` stays `false` while any value is empty, which
 *    keeps `/en` out of the sitemap and marks it `noindex`. An empty or
 *    half-French English page indexed by Google is worse than no English page
 *    at all.
 *
 * Both flip on their own as soon as the last string is filled in. Nothing else
 * has to be edited: no flag to remember, no route to add.
 *
 * The type annotation is what guarantees the two files stay in step — adding a
 * key to `fr.ts` breaks this file until it is added here too.
 */
export const en: Dictionary = {
  nav: {
    home: "",
    search: "",
    blog: "",
    faq: "",
    howItWorks: "",
    about: "",
    categories: "",
    menu: "",
    close: "",
    skipToContent: "",
    languageLabel: "",
    switchLanguage: "",
  },

  search: {
    title: "",
    subtitle: "",
    placeholder: "",
    filters: "",
    reset: "",
    activeFilters: "",
    clearAll: "",
    removeFilter: "",
    seeResults: "",
    sortBy: "",
    category: "",
    price: "",
    condition: "",
    platform: "",
    deals: "",
    dealsOnly: "",
    results: "",
    productCount: "",
    productCountPlural: "",
  },

  emptyState: {
    startTitle: "",
    startBody: "",
    noMatchTitle: "",
    noMatchBody: "",
    filteredTitle: "",
    filteredBodyWithTerm: "",
    filteredBody: "",
    resetFilters: "",
  },

  product: {
    bestPrice: "",
    offersCompared: "",
    seeOffer: "",
    compareOffers: "",
    cheapest: "",
    specs: "",
    reviews: "",
    similar: "",
    similarBody: "",
    discovery: "",
    discoveryBody: "",
    unavailableTitle: "",
    unavailableBody: "",
    backToSearch: "",
    shippingIncluded: "",
  },

  compare: {
    title: "",
    aligned: "",
    backToResults: "",
    similarTitle: "",
    similarBody: "",
    minimumTitle: "",
    minimumBody: "",
    goToComparator: "",
  },

  home: {
    newest: "",
    newestBody: "",
    bestDeals: "",
    bestDealsBody: "",
    mostReviewed: "",
    mostReviewedBody: "",
    seeAll: "",
    seeCategory: "",
    allCategories: "",
  },

  blog: {
    title: "",
    readingTime: "",
    allArticles: "",
  },

  footer: {
    tagline: "",
    legal: "",
  },

  common: {
    loading: "",
    breadcrumb: "",
    horizontalScroll: "",
    previous: "",
    next: "",
  },
};
