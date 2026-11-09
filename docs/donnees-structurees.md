# Données structurées de Findlydeal

Findlydeal décrit ses pages aux moteurs de recherche et aux moteurs de réponse IA par un **graphe JSON-LD schema.org relié**. Ce graphe est construit depuis les mêmes données que le HTML et vérifié à chaque build.

| Fichier                                                                     | Rôle                                                                                                                         |
| --------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| [`src/lib/seo/schema/profile.json`](../src/lib/seo/schema/profile.json)     | Le profil : types autorisés, propriétés requises, recommandées et interdites, vocabulaires contrôlés, règles. Source unique. |
| [`src/lib/seo/json-ld.ts`](../src/lib/seo/json-ld.ts)                       | Les constructeurs du graphe (`organizationNode`, `webPageNode`, `productNode`…).                                             |
| [`scripts/check-structured-data.mjs`](../scripts/check-structured-data.mjs) | Le contrôle après build : `npm run build && npm run check:schema`.                                                           |

## D'où viennent ces choix

Le profil applique ce que trois articles de recherche montrent sur Schema.org. L'analyse détaillée a été faite à part. Ce qui suit est l'interprétation retenue pour Findlydeal, pas une conclusion des articles eux-mêmes.

1. **Wu et al. (2023), _An Analysis of Crosswalks from Research Data Schemas to Schema.org_, Data Intelligence 5(1), DOI 10.1162/dint_a_00186.**
   - Les métadonnées descriptives (nom, description) sont bien remplies et interopérables.
   - Le grand manque est **structurel** (les relations entre entités) et les **vocabulaires contrôlés**.
   - Une propriété prévue n'est pas forcément remplie : hors nom, description, fournisseur, mots-clés et URL, la couverture tombe sous 50 % dans les données citées.
   - Les auteurs recommandent un cœur commun complété par des extensions, et des termes contrôlés à URI (`DefinedTerm`) plutôt que du texte libre.
2. **Abbasi et al. (2022), _Autonomous schema markups based on intelligent computing for search engine optimization_, PeerJ Computer Science 8:e1163, DOI 10.7717/peerj-cs.1163.**
   - Le balisage manuel ne passe pas à l'échelle.
   - La valeur tient aux relations entre classes (par exemple, une personne `worksFor` une organisation).
   - Le JSON-LD produit est validé automatiquement.
3. **Iliadis et al., _One schema to rule them all: How Schema.org models the world of search_, JASIST, DOI 10.1002/asi.24744.**
   - Le vocabulaire commerce est mûr et ancien : offres, état d'usage, livraison, retours.
   - Google privilégie le JSON-LD.
   - Le balisage nourrit aussi des réponses qui retiennent l'utilisateur chez le moteur.

D'où les règles du profil :

| Constat                                                       | Règle appliquée                                                                                                 |
| ------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Les relations comptent plus que les blocs isolés (Wu, Abbasi) | Chaque entité porte un `@id` stable. Les blocs se référencent au lieu de se répéter.                            |
| Cœur commun + extensions (Wu)                                 | `profile.json` fixe, type par type, le requis, le recommandé et l'interdit.                                     |
| Vocabulaires contrôlés à URI (Wu)                             | États et disponibilités utilisent les URI schema.org. Les grades de reconditionnement sont un `DefinedTermSet`. |
| Propriétés prévues mais vides, ou remplies à tort (Wu)        | On n'émet une propriété que si une donnée réelle existe et s'affiche sur la page.                               |
| Le manuel ne passe pas à l'échelle ; il faut valider (Abbasi) | Le graphe est généré depuis les données. `check:schema` le valide à chaque build.                               |
| Le balisage peut servir une réponse sans clic (Iliadis)       | On balise les faits qui justifient le clic (prix du jour, offres, méthode), et non un résumé qui s'y substitue. |

## Le graphe

Le layout émet sur toutes les pages l'organisation et le site. Chaque page ajoute son propre nœud et le relie à ces deux-là par `@id`.

```
Organization  https://findlydeal.com/#organization
   ▲ publisher
WebSite       https://findlydeal.com/#website
   ▲ isPartOf
WebPage       {url}#webpage ──breadcrumb──▶ BreadcrumbList {url}#breadcrumb
   │ about / mainEntity
   ▼
Product {url}#product     (pages produit, données réelles uniquement)
ItemList {url}#itemlist   (pages catégorie, données réelles uniquement)
Article {url}#article     (blog ; author et publisher → #organization)
Question[]                (FAQ)
DefinedTermSet {url}#grades → DefinedTerm {url}#grades-tres-bon-etat …
```

| Page                                          | Nœuds émis                                                                        |
| --------------------------------------------- | --------------------------------------------------------------------------------- |
| Toutes                                        | `Organization`, `WebSite`                                                         |
| Accueil, pages légales, blog (liste)          | + `BreadcrumbList` selon la page                                                  |
| `/fr/blog/[slug]`                             | `WebPage` + `Article` + `BreadcrumbList`                                          |
| `/fr/blog/grades-reconditionnement-expliques` | + `DefinedTermSet` et 4 `DefinedTerm`                                             |
| `/fr/faq`                                     | `FAQPage` avec ses `Question` / `Answer`, mot pour mot comme à l'écran            |
| `/fr/methodologie`                            | `AboutPage`, `about` → l'organisation                                             |
| `/fr/category/[slug]`                         | `CollectionPage` ; + `ItemList` dès que les prix sont réels                       |
| `/fr/product/[id]`                            | `ItemPage` ; + `Product` / `AggregateOffer` / `Offer` dès que les prix sont réels |

## Règles

1. **Ne baliser que ce qui est visible**, avec les mêmes valeurs.
2. **Aucun produit, offre ni avis balisé tant que le catalogue de démonstration est actif.** Ces pages sont aussi en `noindex` et hors du sitemap.
3. **`review` et `aggregateRating` sont interdits** jusqu'à ce que des avis réels, vérifiables et dont l'incitation est déclarée soient affichés (règles Google sur les avis du 24 juillet 2026).
4. **Rien n'est deviné** : un état ou une disponibilité inconnus sont omis, jamais remplacés par une valeur par défaut.
5. **Pas de `SearchAction`** : Google a retiré la sitelinks search box en novembre 2024.
6. **JSON-LD uniquement**, échappé (`<` devient `<`).

## Ajouter un type ou une propriété

1. Déclarer le type ou la propriété dans `profile.json` (requis, recommandé ou interdit).
2. Ajouter ou étendre le constructeur dans `json-ld.ts`, en partant des données de la page.
3. `npm run build && npm run check:schema`, puis tester une page dans le [Rich Results Test](https://search.google.com/test/rich-results) et le [Schema Markup Validator](https://validator.schema.org/).

## Prochaines étapes prévues

- **Pages modèle** (`/fr/reconditionne/[modele]`). Une page par modèle et non par annonce, avec un `Product` stable et une `Offer` par vendeur. L'existence du modèle doit être vérifiée avant le streaming pour renvoyer un vrai 404 : aujourd'hui, une fiche absente renvoie 200 + `noindex` à cause de `loading.tsx`.
- **Baromètre des prix** (`Dataset`, déjà déclaré « prévu » dans le profil). Il comprendra `temporalCoverage`, `variableMeasured`, `license` et `distribution` (CSV).
- **`sameAs`** sur l'organisation, dès que des profils officiels existent. Jamais de lien de remplissage.
- **Auteur nommé** (`Person`) pour les guides, avec une page profil, quand un rédacteur signe en son nom.
