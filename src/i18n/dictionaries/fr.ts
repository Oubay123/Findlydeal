/**
 * French strings — the reference dictionary.
 *
 * Its shape is the contract: `en.ts` is typed against it, so adding a key here
 * makes TypeScript demand the English one too. That is the only mechanism that
 * keeps two languages from drifting apart.
 *
 * Content that is not interface text stays out of here on purpose: the blog
 * articles are MDX files, the legal pages are long-form prose, and the
 * catalogue is data. Translating those is editorial work, not a lookup table.
 */
export const fr = {
  nav: {
    home: "Accueil",
    search: "Recherche",
    blog: "Guides",
    faq: "FAQ",
    howItWorks: "Comment ça marche",
    about: "À propos",
    categories: "Catégories",
    menu: "Menu",
    close: "Fermer",
    skipToContent: "Aller au contenu",
    languageLabel: "Langue",
    switchLanguage: "Changer de langue",
  },

  search: {
    title: "Recherche",
    subtitle: "Offres neuves, reconditionnées et d'occasion, classées par prix livré.",
    placeholder: "iPhone 13, PS5, Thermomix…",
    filters: "Filtres",
    reset: "Réinitialiser",
    activeFilters: "Filtres actifs",
    clearAll: "Tout effacer",
    removeFilter: "Retirer le filtre",
    seeResults: "Voir les résultats",
    sortBy: "Trier par",
    category: "Catégorie",
    price: "Prix (€)",
    condition: "État",
    platform: "Site marchand",
    deals: "Bonnes affaires",
    dealsOnly: "Bonnes affaires uniquement",
    results: "Résultats",
    productCount: "produit",
    productCountPlural: "produits",
  },

  emptyState: {
    startTitle: "Que cherchez-vous ?",
    startBody:
      "Tapez le nom d'un produit : les offres neuves, reconditionnées et d'occasion s'affichent ensemble.",
    noMatchTitle: "Aucune offre trouvée",
    noMatchBody: "Essayez un terme plus large, ou une autre orthographe.",
    filteredTitle: "Aucun produit avec ces filtres",
    filteredBodyWithTerm:
      "Aucune offre ne correspond à la fois à votre recherche et aux filtres appliqués.",
    filteredBody: "Les filtres appliqués ne laissent passer aucune offre du catalogue.",
    resetFilters: "Réinitialiser les filtres",
  },

  product: {
    bestPrice: "Prix livré le plus bas",
    offersCompared: "offres comparées",
    seeOffer: "Voir l'offre",
    compareOffers: "Voir l'offre",
    cheapest: "Moins cher",
    specs: "Fiche technique",
    reviews: "Avis clients",
    similar: "Produits similaires",
    similarBody: "Même catégorie, prix proche.",
    discovery: "Dans d'autres catégories",
    discoveryBody: "Des modèles à l'écart de prix marqué entre neuf et seconde main.",
    unavailableTitle: "Ce produit n'est plus disponible",
    unavailableBody:
      "L'annonce a peut-être été retirée par le vendeur. Recherchez le modèle pour voir les offres actuelles.",
    backToSearch: "Rechercher le modèle",
    shippingIncluded: "frais de port inclus",
  },

  compare: {
    title: "Comparaison",
    aligned: "produits alignés sur les mêmes critères.",
    backToResults: "Retour aux résultats",
    similarTitle: "Produits similaires",
    similarBody: "D'autres références proches de celles que vous comparez.",
    minimumTitle: "Sélectionnez au moins {min} produits à comparer",
    minimumBody:
      "Depuis les résultats de recherche, cochez « Comparer » sur les produits qui vous intéressent (jusqu'à {max}), puis revenez ici.",
    goToComparator: "Aller à la recherche",
  },

  home: {
    newest: "Nouveautés",
    newestBody: "Les modèles les plus récents du catalogue.",
    bestDeals: "Les plus gros écarts avec le neuf",
    bestDealsBody: "Les modèles où la seconde main coûte le moins par rapport au neuf.",
    mostReviewed: "Les plus populaires",
    mostReviewedBody: "Les produits qui rassemblent le plus d'avis.",
    seeAll: "Voir tout",
    seeCategory: "Voir la catégorie",
    allCategories: "Voir toutes les catégories",
  },

  blog: {
    title: "Guides",
    readingTime: "min de lecture",
    allArticles: "Tous les articles",
  },

  footer: {
    tagline:
      "Les prix du neuf, du reconditionné et de l'occasion, côte à côte. Offres eBay livrables en France.",
    legal: "Légal",
  },

  common: {
    loading: "Chargement en cours",
    breadcrumb: "Fil d'ariane",
    horizontalScroll: "défilement horizontal",
    previous: "Produits précédents",
    next: "Produits suivants",
  },
};

/** The shape every other dictionary must match. */
export type Dictionary = typeof fr;
