# Findlydeal

Comparateur de prix multi-plateformes : une recherche, plusieurs marketplaces (eBay, Back Market,
Wayfair…), un prix total comparable et une détection des vraies bonnes affaires.

**Stack :** Next.js 16 (App Router, Turbopack) · TypeScript strict · Tailwind CSS v4 · shadcn/ui ·
ESLint + Prettier. Structure compatible avec un déploiement futur sur Cloudflare Workers via
l'adaptateur OpenNext.

> Le code, les noms de fichiers et les commentaires sont en anglais. L'interface et ce README sont
> en français.

## Démarrer

```bash
npm install
npm run dev                  # http://localhost:3000
```

Aucune clé d'API n'est nécessaire pour lancer l'app. Créez `.env.local` à partir de `.env.example`
uniquement le jour où une source d'affiliation est validée.

| Script              | Rôle                                    |
| ------------------- | --------------------------------------- |
| `npm run dev`       | Serveur de développement (Turbopack)    |
| `npm run build`     | Build de production                     |
| `npm run start`     | Sert le build de production             |
| `npm run lint`      | ESLint (`lint:fix` pour corriger)       |
| `npm run format`    | Prettier (`format:check` pour vérifier) |
| `npm run typecheck` | `tsc --noEmit`                          |

## Design system

Toute la charte est définie dans **[src/app/globals.css](src/app/globals.css)**, et nulle part
ailleurs. Les composants ne référencent que des noms sémantiques (`bg-primary`, `text-deal`,
`bg-cream`…), jamais une couleur en dur.

| Token                            | Valeur    | Usage                                    |
| -------------------------------- | --------- | ---------------------------------------- |
| `--brand-500` → `bg-primary`     | `#e8763a` | Orange principal, boutons, accents       |
| `--brand-400` → `text-brand-400` | `#f0996b` | Fin du dégradé, mot mis en avant du hero |
| `--brand-100` → `bg-brand-100`   | `#fbe4d5` | Tuiles d'icônes                          |
| `--brand-50` → `bg-cream`        | `#fdf5ef` | Fond des sections chaudes                |
| `--ink` → `bg-ink`               | `#1f1d1b` | Hero et footer                           |
| `--deal` → `text-deal`           | `#3fa46a` | Prix remisé                              |
| `--deal-soft` → `bg-deal-soft`   | `#6ecf97` | Badge « Meilleure affaire »              |

- Utilitaire `brand-gradient` pour le dégradé orange (bouton Rechercher, section CTA finale).
- Typographie : **Poppins** pour les titres (`font-display`, appliqué d'office à `h1/h2/h3`),
  **Inter** pour le texte.
- Le thème est **volontairement clair uniquement** : aucun mode sombre n'est exposé.
- Deux ajouts maison dans [button.tsx](src/components/ui/button.tsx) : variantes `brand` et
  `outline-brand`, tailles `md` et `xl` (boutons pilules).

### Images

**Toutes les images passent par [`SmartImage`](src/components/common/smart-image.tsx)**, un wrapper
autour de `next/image` qui rend impossible d'oublier trois choses : un `sizes` adapté au contexte
d'affichage, un placeholder flou pendant le chargement, et un `alt`, que le type rend obligatoire.

```tsx
<SmartImage src={product.imageUrl} alt={product.imageAlt} fill context="productCardGrid" />
```

Le `context` est la seule chose à choisir : il détermine le `sizes` (`productCardGrid`,
`productCardList`, `productHero`, `thumbnail`, `categoryTile`, `blogCard`, `blogCover`,
`fullBleed`), défini dans [`IMAGE_SIZES`](src/lib/utils/images.ts). Sans `sizes` correct, le
navigateur télécharge un fichier pleine largeur pour une vignette de 120 px.

AVIF et WebP sont négociés automatiquement, le lazy loading est le défaut. Ne passez `priority` que
sur **une seule** image par page : celle qui est le LCP (photo produit principale, couverture
d'article, première diapositive du hero).

**Sur les `alt`** : ils sont descriptifs partout où l'image porte de l'information. Les produits
utilisent `imageAlt`, construit à partir d'un `imageSubject` déclaré sur chaque fiche
(« Smartphone » + le titre → « Smartphone Apple iPhone 13 128 Go - Minuit »). En revanche les images
**décoratives** portent `alt=""` volontairement : le slideshow du hero et les tuiles de catégorie
ont déjà leur libellé écrit à côté, et un alt dupliquerait l'annonce du lecteur d'écran.

| Où                  | Défini dans                                                                 |
| ------------------- | --------------------------------------------------------------------------- |
| Slideshow du hero   | `HERO_IMAGES` dans [hero-section.tsx](src/components/home/hero-section.tsx) |
| Tuiles de catégorie | champ `image` de [categories.ts](src/config/categories.ts)                  |
| Photos produit      | [lib/mock/images.ts](src/lib/mock/images.ts)                                |
| Couvertures blog    | `meta.cover` de chaque `.mdx`                                               |

Pour vos propres fichiers : posez-les dans `public/images/` et remplacez l'appel `unsplash(...)` par
`"/images/<fichier>"`. Pour d'autres hôtes distants, ajoutez-les dans `images.remotePatterns` de
[next.config.ts](next.config.ts), car `next/image` refuse les hôtes inconnus.

## Données de démonstration

Tant qu'aucun programme d'affiliation n'est validé, le site est peuplé par un **catalogue fictif**
de 37 produits (tech, électroménager, meubles, montres & bijoux, mode, loisirs), avec descriptions,
notes, fiches techniques, avis clients et 3 à 4 offres concurrentes par produit.

**Tout est confiné dans [src/lib/mock/](src/lib/mock/).** Ce module expose exactement les mêmes
signatures que le pipeline réel :

| Mock                        | Équivalent réel                               |
| --------------------------- | --------------------------------------------- |
| `searchMockProducts(query)` | `searchAllSources(query)`, dans `lib/search/` |
| `getMockProductById(id)`    | `getProductById(id)`, dans `lib/products/`    |
| `getFeaturedMockDeals(n)`   | à écrire quand une source sera branchée       |

### Comment il disparaît

Le repli est **automatique** : [aggregate.ts](src/lib/search/aggregate.ts) et
[get-product.ts](src/lib/products/get-product.ts) n'appellent le mock que si
`getConfiguredSources().length === 0`. Dès qu'un adaptateur renvoie `isConfigured() === true`,
c'est-à-dire dès que ses clés sont dans `.env.local`, le catalogue fictif n'est plus jamais lu, et
les mentions « Exemple » et le bandeau de démonstration disparaissent avec lui.

Le jour de la bascule, il suffit donc de :

1. renseigner les clés dans `.env.local` (voir `.env.example`) ;
2. implémenter `search()` / `getOffer()` dans l'adaptateur concerné ;
3. remplacer `getFeaturedMockDeals(8)` dans `app/(marketing)/page.tsx` par une vraie requête ;
4. supprimer le dossier `src/lib/mock/` et les trois imports qui le référencent.

Les badges « meilleure affaire » et les pourcentages d'économie ne sont **pas** écrits en dur dans
le mock : ils sont calculés par le vrai moteur `annotateOffersWithDeals()`
([lib/deals/score.ts](src/lib/deals/score.ts)). Aucune logique métier n'est dupliquée.

### Creation Watches : liens simples aujourd'hui, affiliés demain

Les 6 produits de [creation-watches.ts](src/lib/mock/catalog/creation-watches.ts) pointent vers de
**vraies pages publiques** de creationwatches.com, sans aucun paramètre de suivi : le programme
d'affiliation n'est pas validé, et un lien tagué laisserait croire à une relation qui n'existe pas.

**Toute URL Creation Watches est construite à un seul endroit**,
[src/lib/sources/creationwatches.ts](src/lib/sources/creationwatches.ts). Le jour de la validation :

1. renseigner `CREATIONWATCHES_AFFILIATE_ID` dans `.env.local` ;
2. ajuster le paramètre dans `buildAffiliateUrl()` si le programme n'utilise pas `?aff=`.

C'est tout : `buildAffiliateUrl()` renvoie l'URL inchangée tant que l'identifiant est absent, donc
la bascule ne touche aucun autre fichier.

### Honnêteté (indispensable pour l'affiliation)

[demo-notice.tsx](src/components/common/demo-notice.tsx) fournit trois niveaux de mention, tous
conditionnés à `isDemoCatalogueActive()` :

- `DemoBanner` : bandeau fin sous le header sur la landing, la recherche, les catégories et les
  fiches produit ;
- `DemoBadge` : pastille « Exemple » sur chaque visuel produit ;
- `DemoFootnote` : note en bas des sections de résultats, du comparatif et des avis.

Le statut du service est également écrit noir sur blanc dans [/about](<src/app/(marketing)/about/page.tsx>)
et dans [/legal/affiliate-disclosure](src/app/legal/affiliate-disclosure/page.tsx).

## Blog

Les articles sont des fichiers **MDX** dans [src/content/blog/](src/content/blog/). Chacun exporte
ses propres métadonnées, donc tout tient dans un seul fichier :

```mdx
export const meta = {
  title: "…",
  description: "…",
  date: "2026-07-28",
  authorId: "equipe",
  cover: { src: "…", alt: "…" },
  tags: ["Reconditionné"],
  readingMinutes: 6,
};

Le corps de l'article en markdown, avec des composants React si besoin.
```

**Publier un article :** créer le `.mdx`, puis ajouter une ligne dans
[src/content/blog/index.ts](src/content/blog/index.ts). C'est tout : la liste, le filtre par tag, le
sitemap, les articles liés et le JSON-LD lisent tous ce registre.

Les imports sont **statiques**, pas des lectures disque : pas de `fs`, donc compatible edge, et un
fichier manquant devient une erreur de build plutôt qu'une page vide en production. Les métadonnées
sont typées à l'import via l'augmentation de `*.mdx` dans [src/types/mdx.d.ts](src/types/mdx.d.ts).
Attention, ce typage porte sur le _site d'import_, donc un `meta` malformé dans un article n'est pas
attrapé par `tsc` : gardez `BlogArticleMeta` comme référence en écrivant.

Le style du corps des articles est défini une seule fois dans
[src/mdx-components.tsx](src/mdx-components.tsx), qui mappe **toutes** les balises que le markdown
peut produire sur les classes du site. Une balise non mappée retombe silencieusement sur les styles
par défaut du navigateur, ce qui est exactement le genre de casse que personne ne remarque avant la
mise en ligne.

`remark-gfm` est activé dans [next.config.ts](next.config.ts) : sans lui, MDX se limite à
CommonMark, qui **ne connaît pas les tableaux**. Les lignes de `|` s'affichaient alors en texte brut.

La largeur de lecture du corps est bornée à `68ch` (environ 68 caractères par ligne). Au-delà de
75, l'œil perd le début de la ligne suivante.

## Comparateur

`/search` est le cœur fonctionnel. Tout son état vit dans l'URL (terme, filtres, affichage,
sélection de comparaison), ce qui rend chaque écran partageable, rendu côté serveur et cachable.

| Paramètre               | Effet                                          |
| ----------------------- | ---------------------------------------------- |
| `q`                     | terme recherché                                |
| `category`              | filtre par univers                             |
| `min` / `max`           | fourchette de prix en euros, livraison incluse |
| `condition` (multi)     | neuf / reconditionné / occasion                |
| `source` (multi)        | plateforme                                     |
| `sort`                  | pertinence, prix, meilleure affaire            |
| `deals=1`               | bonnes affaires uniquement                     |
| `view=list`             | bascule grille → liste                         |
| `compare=slug-a,slug-b` | panier de comparaison (4 max)                  |

### Comparaison côte à côte

De **2 à 6 produits** ([`MIN_COMPARED_PRODUCTS` / `MAX_COMPARED_PRODUCTS`](src/lib/constants/search.ts)),
sélectionnables depuis la grille de résultats **comme depuis une fiche produit**.

Le panier vit dans **`sessionStorage`**, pas dans l'URL ([`useCompare`](src/hooks/use-compare.ts)) :
la sélection doit survivre à une navigation, or une query string disparaît dès qu'on quitte
`/search`. La comparaison elle-même reste partageable, puisque
[`/compare`](src/app/compare/page.tsx) lit ses produits depuis `?compare=a,b`. Le titre est stocké
à côté de l'identifiant pour que la barre flottante étiquette ses vignettes sans que le serveur
expédie tout le catalogue au client.

Le tableau ([`ComparisonTable`](src/components/product/comparison-table.tsx)) a **une colonne de
libellés figée à gauche** : à six produits il faut défiler, et sans cela les valeurs deviendraient
des nombres anonymes. Sa `min-width` est calculée selon le nombre de produits, de sorte que le cas
courant (deux produits) tienne sur un écran de 375 px **sans aucun défilement**. Les lignes de specs
sont **l'union** des fiches techniques comparées, avec un « non renseigné » explicite plutôt qu'une
case vide. La page est en `noindex` : une sélection personnelle n'a rien à faire dans un index.

## SEO technique

- **Métadonnées uniques** sur chaque route, avec un `canonical` posé **page par page**. Un
  `canonical` dans le layout racine serait hérité par tous les enfants et pointerait le site entier
  vers l'accueil.
- **[sitemap.ts](src/app/sitemap.ts)** : 58 URLs générées depuis les mêmes sources que les pages
  (catégories, articles, produits). Rien n'est listé à la main.
- **[robots.ts](src/app/robots.ts)** : `/compare` exclu (sélection personnelle, également en `noindex`).
- **Données structurées** via [lib/seo/json-ld.ts](src/lib/seo/json-ld.ts) : `Organization` +
  `WebSite` (avec `SearchAction`) sur tout le site, `Product` + `AggregateOffer` + `Review` sur les
  fiches, `Article` sur les billets, `BreadcrumbList` partout où il y a un fil d'Ariane.
- **[Breadcrumbs](src/components/common/breadcrumbs.tsx)** émet le fil visible _et_ son JSON-LD
  depuis le même tableau, pour qu'ils ne puissent pas diverger.
- **Vidéo en façade** : [VideoReview](src/components/product/video-review.tsx) affiche une vignette
  et ne monte l'iframe YouTube qu'au clic. Un embed classique tire ~1 Mo de JavaScript au chargement,
  que le visiteur lance la vidéo ou non.

## Performance

Mesures prises sur un build de production, JS chargé par page (gzip) :

| Page       | JS gzip | Mode de rendu            |
| ---------- | ------- | ------------------------ |
| `/about`   | 221 Ko  | statique                 |
| `/blog`    | 226 Ko  | statique                 |
| `/`        | 230 Ko  | statique                 |
| `/product` | 231 Ko  | SSG + ISR 1 h            |
| `/search`  | 239 Ko  | dynamique (searchParams) |

**Le plancher est le framework, pas le code applicatif** : React 19 + le runtime Next pèsent à eux
seuls ~490 Ko non compressés sur les ~730 d'une page. Le code du site est minoritaire.

Ce qui a été fait, par ordre d'impact :

1. **Hero** : seule la 1ʳᵉ diapo est rendue ; les suivantes sont montées après
   `requestIdleCallback`. Avant, quatre images plein écran se chargeaient dans le viewport à
   opacité 0 et volaient de la bande passante à l'image qui décide du LCP.
2. **Rendu statique** : il ne reste que `/search` et `/compare` en dynamique, et c'est correct :
   toutes deux lisent `searchParams`. Les fiches produit sont prérendues (`generateStaticParams`)
   avec `dynamicParams: true` pour que de futurs ids inconnus rendent quand même.
3. **Logique serveur hors du client** : `SearchFilters` recevait le registre des sources par import ;
   il reçoit maintenant deux libellés en prop. `CompareBar` ne sérialise plus les 31 titres du
   catalogue mais seulement ceux sélectionnés.
4. **`loading.tsx`** sur search, product, category, blog et compare : sans eux, Next garde l'ancienne
   page à l'écran et la navigation paraît figée.
5. **Polices** : Poppins 500 était chargé sans être jamais utilisé (`font-display` n'apparaît
   qu'avec `font-semibold` et `font-bold`). 16 fichiers woff2 → 13.
6. **`radix-ui`** ajouté à `optimizePackageImports`, car `lucide-react` y est par défaut dans Next 16,
   pas `radix-ui`.
7. **`cache()` React** sur `getProductById`, appelé deux fois par requête (metadata + page).

### Trois optimisations tentées puis annulées

`next/dynamic` sur le tiroir mobile (Radix Dialog) et sur l'embed vidéo : **mesuré à 5 Ko de gain**.
Next expédie le chunk de tout composant client de l'arbre de la page en `<script async>`, donc le
découpage ne différait rien. Les deux ont été remis en ligne plutôt que de garder un fichier de plus et une animation
d'ouverture perdue pour rien.

Une redirection `/blog?tag=…` → `/blog/theme/…` a aussi été retirée : la règle transmettait le tag
brut au lieu de son slug, produisait un double encodage et renvoyait un 500 là où la page servait
simplement la liste complète. Le site n'ayant jamais été déployé, aucune ancienne URL n'existe.

### Ce qui ne dépendra pas du code

- **Compression** : Cloudflare applique Brotli automatiquement ; les chiffres ci-dessus sont en gzip,
  comptez ~15 % de moins.
- **Cache CDN** : c'est là que le passage en statique paie vraiment : pages servies depuis le POP
  le plus proche, TTFB de quelques millisecondes.
- **ISR sur Workers** : `revalidate` demande un cache incrémental côté OpenNext ; à vérifier au
  moment du déploiement.

### Comment mesurer

```bash
npm run build && npm run start
npx lighthouse http://localhost:3000 --view --preset=desktop
```

Puis PageSpeed Insights sur l'URL de production, qui donne les données terrain (CrUX). Cibles
raisonnables : **LCP < 2,5 s**, **CLS < 0,1**, **INP < 200 ms**, score Performance > 90 sur les pages
statiques. `/search` restera en dessous : elle est dynamique par nature.

## Bilingue (français rempli, anglais à traduire)

Le site est publié en deux langues, chacune sur son propre préfixe d'URL : `/fr/...` et
`/en/...`. Aujourd'hui **seul le français est complet** ; l'anglais existe, se visite, mais
n'est pas encore traduit.

### Comment ça marche

```
/               -> 307 vers /fr ou /en selon l'en-tête Accept-Language  (src/proxy.ts)
/fr/search      -> app/[locale]/search/page.tsx avec locale = "fr"
/en/search      -> la même page avec locale = "en"
/de/quoi        -> 404
```

Toutes les routes vivent sous `app/[locale]/`, y compris le layout racine : c'est ce qui permet
au `<html lang>` de suivre la langue. `sitemap.xml` et `robots.txt` restent à la racine du
domaine, sans préfixe, parce que ce sont les adresses que les moteurs vont chercher par
convention.

Le nom du segment n'est pas décoratif : `app/[locale]` fait que `next/root-params` exporte un
getter `locale`, ce qui laisse n'importe quel Server Component lire la langue courante sans
qu'on la fasse descendre en prop à travers quatre niveaux.

### Lire la langue et les textes

| Contexte         | Locale          | Textes                  | Liens                         |
| ---------------- | --------------- | ----------------------- | ----------------------------- |
| Server Component | `getUiLocale()` | `getServerDictionary()` | `<LocaleLink href="/search">` |
| Client Component | `useUiLocale()` | `useDictionary()`       | `useLocalePath()`             |

`next/root-params` ne fonctionne pas dans un Client Component : ceux-ci relisent la locale
depuis le pathname, où elle se trouve de toute façon puisque c'est le routing qui la définit.

### Traduire l'anglais

Tout se joue dans **`src/i18n/dictionaries/en.ts`**, dont chaque valeur est aujourd'hui une
chaîne vide. Remplacez-les par la traduction ; il n'y a rien d'autre à toucher.

Deux comportements en découlent, tous deux automatiques :

- **Tant qu'une valeur est vide**, elle affiche le texte français à la place. `/en` reste donc
  lisible plutôt que vide.
- **Tant qu'il reste une seule valeur vide**, `isLocaleTranslated("en")` vaut `false`, ce qui
  met les pages `/en` en `noindex`, les exclut du `sitemap.xml` et supprime les balises
  `hreflang`. Une page anglaise à moitié française indexée par Google ferait plus de mal que pas
  de page anglaise du tout.

Dès la dernière chaîne remplie, les trois se réactivent seuls : le sitemap passe de 69 à 138 URLs,
les `hreflang` `fr` / `en` / `x-default` apparaissent, et `/en` devient indexable. Aucun
drapeau à basculer, aucune route à ajouter.

Ajouter une clé dans `fr.ts` casse volontairement la compilation de `en.ts` tant qu'elle n'y est
pas ajoutée : c'est le seul mécanisme qui empêche les deux langues de diverger.

### Ce qui n'est pas dans le dictionnaire

Le dictionnaire couvre l'**interface** : navigation, filtres, boutons, états vides, titres de
sections. Restent en français et relèvent d'un travail éditorial, pas d'une table de
correspondance :

- les articles du blog (`src/content/blog/*.mdx`) ;
- le corps des pages légales ;
- les libellés du catalogue de démonstration (titres produits, avis, catégories).

### Attention à ne pas confondre deux `Locale`

- `UiLocale` (`src/i18n/config.ts`) : `fr` | `en`, **la langue du site**.
- `Locale` (`src/types/index.ts`) : `fr` | `en` | `de` | `es` | `it`, **les langues dans
  lesquelles une recherche est envoyée aux marketplaces**, parce que le même produit s'appelle
  « casque audio », « headphones » ou « Kopfhörer » selon le pays du vendeur.

Publier le site en français ne dit rien des marketplaces interrogées : les deux listes bougent
indépendamment, et sont séparées pour cette raison.

## Arborescence

```
src/
  proxy.ts                 # Redirige / vers /fr ou /en selon Accept-Language
  app/                     # App Router : routing uniquement, pas de logique métier
    [locale]/              # TOUTES les routes vivent sous /fr ou /en
      (marketing)/         # Groupe de routes vitrine (n'apparaît pas dans l'URL)
        page.tsx           #   /fr          landing
        how-it-works/      #   /fr/how-it-works
        faq/               #   /fr/faq
        about/             #   /fr/about
      blog/                #   /fr/blog, /fr/blog/[slug], /fr/blog/theme/[tag]
      compare/             #   /fr/compare  comparaison côte à côte (noindex)
      search/              #   /fr/search      cœur fonctionnel
      category/[slug]/     #   /fr/category/tech
      product/[id]/        #   /fr/product/<slug>     page de comparaison
      legal/               #   privacy, terms, cookies, legal-notice, affiliate-disclosure
      layout.tsx           # Layout racine : lang, polices, Header, Footer, metadata
      not-found.tsx        # 404
    globals.css            # Tailwind v4 + tokens de la charte
    icon.svg               # Favicon (loupe orange), source de favicon.ico et apple-icon.png
    sitemap.ts             # sitemap.xml généré depuis les catégories, articles et produits
    robots.ts              # robots.txt

  components/
    ui/                    # Primitives shadcn/ui, générées par la CLI
    layout/                # Header, Footer, Navbar, MobileMenu, LegalPage
    common/                # Container, SectionTitle, Logo, FaqAccordion, RatingStars,
                           #   DemoNotice, CollapsibleSection, SmartImage, Breadcrumbs, JsonLd
    home/                  # Sections de la landing, dans l'ordre d'affichage :
                           #   HeroSection · CategoryShowcase · HowItWorks · FeaturedDeals
                           #   FeatureHighlights · FaqSection · FinalCta
    blog/                  # ArticleCard, TagFilter
    search/                # SearchBar, SearchFilters, FilterPill, SearchResults,
                           #   PriceRangeFilter, ViewToggle, CompareToggle, CompareBar
    product/               # ProductCard, ProductListRow, ProductComparison, ComparisonTable,
                           #   OfferRow, PriceBadge, DealBadge, ProductGallery, ProductSpecs,
                           #   ProductReviews, VideoReview
    category/              # CategoryCard, CategoryGrid, CategoryIcon

  lib/                     # Logique métier, aucun JSX ici
    sources/               # Un fichier par source d'affiliation + contrat commun
      types.ts             #   SourceAdapter : l'interface que TOUTE source implémente
      ebay.ts              #   stub, en attente de validation eBay Partner Network
      creationwatches.ts   #   stub + construction des URLs Creation Watches
      backmarket.ts        #   stub, en attente de validation Back Market
      index.ts             #   registre des sources
    search/                # normalize · translate (multilingue) · params (URL) · aggregate
    deals/                 # score : prix de référence + score de bonne affaire
    products/              # récupération d'un produit et de ses offres concurrentes
    mock/                  # CATALOGUE DE DÉMONSTRATION, voir la section dédiée
      images.ts            #   pool de photos Unsplash vérifiées
      build.ts             #   types de seed + constructeur vers `Product`
      catalog/             #   un fichier par univers, dont creation-watches.ts
      index.ts             #   API de requête : searchMockProducts, getMockProductById…
    seo/                   # json-ld : Product, Article, BreadcrumbList, Organization
    utils/                 # cn, format (prix, dates), currency, slug, images (Unsplash)
    constants/             # langues, clés d'URL, seuils de deals

  i18n/                    # Architecture bilingue, voir la section dédiée
    config.ts              #   locales d'interface, préfixage des chemins
    dictionaries/fr.ts     #   dictionnaire de référence (rempli)
    dictionaries/en.ts     #   même structure, valeurs vides (à traduire)
    index.ts               #   getDictionary, isLocaleTranslated, format
    server.ts              #   lecture de la locale en Server Component
    use-locale.ts          #   idem en Client Component

  content/blog/            # Articles .mdx + registre typé
  mdx-components.tsx       # Style du corps des articles MDX
  types/
    index.ts               # Modèle de domaine partagé (Offer, Product, SearchQuery…)
    blog.ts                # Modèle éditorial (BlogArticle, BlogArticleMeta)
    mdx.d.ts               # Typage du `meta` exporté par les .mdx
  hooks/                   # useSearch, useFilters, useCompare, useDebouncedValue
  config/
    site.ts                # Nom, description, navigation header/footer
    categories.ts          # Catalogue des catégories
    faq.ts                 # Contenu de la FAQ (landing + page /faq)
    menu.ts                # Raccourcis du méga-menu (bons plans, état, budget)
    blog.ts                # Auteurs du blog

public/images/             # Assets statiques
```

### Les règles qui tiennent la structure

1. **`app/` ne contient que du routing.** Une page compose des composants et appelle `lib/`.
2. **Une seule direction d'import :** `app/` → `components/` → `lib/` → `types/`.
   `lib/` n'importe jamais un composant.
3. **`config/` décrit le site** (nom, navigation, catégories, FAQ) ; **`lib/constants/` décrit le
   domaine** (langues, seuils, clés de query string). Pas de recouvrement.
4. **Les données brutes des sources ne sortent jamais de `lib/sources/`.** Le reste de l'app ne
   manipule que des `Offer` / `Product` normalisés (`src/types/index.ts`).
5. **L'URL est la source de vérité d'une recherche.** `lib/search/params.ts` est le seul endroit qui
   lit et écrit la query string, si bien que les résultats restent partageables et rendus côté serveur.
6. **Les prix sont stockés en centimes** (`Money.amount`) et formatés uniquement via `formatPrice()`.
7. **Aucune couleur en dur** dans un composant : tout passe par les tokens de `globals.css`.
8. **Aucun lien interne en dur.** Un `href="/search"` écrit tel quel renverrait un visiteur
   anglophone dans l'arbre français. Les Server Components passent par `<LocaleLink>`, les Client
   Components par `useLocalePath()`.

## Où ajouter les choses ensuite

| Ce que tu veux ajouter       | Où                                                                                                                             |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Une source d'affiliation     | `src/lib/sources/<source>.ts` + id dans `SourceId` (`src/types`) + registre `sources/index.ts` + variables dans `.env.example` |
| Une catégorie                | `src/config/categories.ts` + slug dans `CategorySlug` + icône dans `CategoryCard`                                              |
| Un lien de navigation        | `src/config/site.ts` (`mainNav` / `footerNav`)                                                                                 |
| Une question de FAQ          | `src/config/faq.ts` (alimente la landing et `/faq`)                                                                            |
| Une section de la landing    | `src/components/home/`, puis l'ajouter dans `app/(marketing)/page.tsx`                                                         |
| Un composant shadcn          | `npx shadcn@latest add <composant>`                                                                                            |
| Une règle de bonne affaire   | `src/lib/deals/score.ts` (seuils dans `src/lib/constants/deals.ts`)                                                            |
| La vraie logique multilingue | `src/lib/search/translate.ts`                                                                                                  |
| Le regroupement d'offres     | `groupOffersIntoProducts()` dans `src/lib/search/aggregate.ts`                                                                 |

## État actuel

- Les adaptateurs de sources sont des **stubs volontaires** : interfaces, registre et pipeline
  d'agrégation sont en place, mais aucune requête réseau n'est faite tant que les programmes
  d'affiliation ne sont pas validés.
- Le site est peuplé par un catalogue de démonstration, voir la section « Données de
  démonstration » plus haut.
- **Aucune notion de compte** : Findlydeal compare et redirige vers les marketplaces, il n'y a rien à quoi se connecter.
- Les pages `legal/` sont des **placeholders à faire relire par un juriste** avant mise en ligne.
- Les articles de blog sont **rédigés et publiables en l'état** : ils ne contiennent aucune donnée
  fictive, seulement des conseils d'achat.
- Aucun produit n'a encore de `videoReviewId` : la section « Test en vidéo » est câblée mais
  invisible tant qu'aucun identifiant YouTube n'est renseigné.

## Déploiement (plus tard)

Cible : Cloudflare Workers via [OpenNext](https://opennext.js.org/cloudflare).

```bash
npm i -D @opennextjs/cloudflare wrangler
npx @opennextjs/cloudflare   # génère open-next.config.ts et wrangler.jsonc
```

En attendant, le code serveur reste agnostique du runtime : pas de `fs`, pas de `path`, pas de
globals Node en dehors des scripts de build.
