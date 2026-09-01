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
    search: "Comparateur",
    blog: "Blog",
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
    title: "Comparateur de prix",
    subtitle: "Une recherche, toutes les plateformes, les vraies remises signalées.",
    placeholder: "Rechercher un produit",
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
    platform: "Plateforme",
    deals: "Bonnes affaires",
    dealsOnly: "Bonnes affaires uniquement",
    results: "Résultats de recherche",
    productCount: "produit",
    productCountPlural: "produits",
  },

  emptyState: {
    startTitle: "Lancez une recherche",
    startBody:
      "Tapez ce que vous cherchez et Findlydeal compare toutes les plateformes en une fois.",
    noMatchTitle: "Aucune offre trouvée",
    noMatchBody: "Essayez un terme plus large, ou une autre orthographe.",
    filteredTitle: "Aucun produit ne passe ces filtres",
    filteredBodyWithTerm:
      "Aucune offre ne correspond à la fois à votre recherche et aux filtres appliqués.",
    filteredBody: "Les filtres appliqués ne laissent passer aucune offre du catalogue.",
    resetFilters: "Réinitialiser les filtres",
  },

  product: {
    bestPrice: "Meilleur prix trouvé",
    offersCompared: "offres comparées",
    seeOffer: "Voir l'offre",
    compareOffers: "Comparer les offres",
    cheapest: "Moins cher",
    specs: "Fiche technique",
    reviews: "Avis clients",
    similar: "Produits similaires",
    similarBody: "D'autres références de la même catégorie, à un prix comparable.",
    discovery: "Ces produits pourraient vous intéresser",
    discoveryBody: "Une sélection dans les autres univers du comparateur.",
    unavailableTitle: "Ce produit n'est plus disponible",
    unavailableBody:
      "L'offre a peut-être expiré, ou aucune source n'est encore connectée. Essayez de le rechercher à nouveau.",
    backToSearch: "Retour à la recherche",
    shippingIncluded: "frais de port inclus",
  },

  compare: {
    title: "Comparaison côte à côte",
    aligned: "produits alignés sur les mêmes critères.",
    backToResults: "Retour aux résultats",
    similarTitle: "Produits similaires",
    similarBody: "D'autres références proches de celles que vous comparez.",
    minimumTitle: "Sélectionnez au moins {min} produits à comparer",
    minimumBody:
      "Depuis les résultats de recherche, cochez « Comparer » sur les produits qui vous intéressent (jusqu'à {max}), puis revenez ici.",
    goToComparator: "Aller au comparateur",
  },

  home: {
    newest: "Nouveautés",
    newestBody: "Les modèles les plus récents du catalogue.",
    bestDeals: "Meilleures offres du moment",
    bestDealsBody: "Les remises les plus fortes face au prix de référence.",
    mostReviewed: "Les plus populaires",
    mostReviewedBody: "Les produits qui rassemblent le plus d'avis.",
    seeAll: "Voir tout",
    seeCategory: "Voir la catégorie",
    allCategories: "Voir toutes les catégories",
  },

  blog: {
    title: "Blog",
    readingTime: "min de lecture",
    allArticles: "Tous les articles",
  },

  footer: {
    tagline:
      "Le comparateur malin qui trouve les meilleures offres à votre place, sur toutes les plateformes.",
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
