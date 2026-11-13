# Référencement : ce que le site fait seul, et ce qui reste à faire à la main

Mis à jour le 13 novembre 2026.

## Déjà en place dans le code

- `sitemap.xml` généré depuis la configuration (catégories, produits avec offres réelles, articles, thèmes) avec dates de modification.
- `robots.txt` : tout est explorable sauf `/compare`, `/api/` et les pages de résultats de recherche (URL infinies).
- Métadonnées par page (titre, description, canonique, hreflang fr/en, Open Graph).
- Données structurées JSON-LD : Organization, WebSite, produits avec offres, articles, FAQ, fils d'Ariane, CollectionPage.
- `/llms.txt` : le site décrit pour les assistants IA (AEO/GEO), généré depuis la même configuration que le sitemap.
- Clé IndexNow servie à la racine + script `node scripts/indexnow-ping.mjs` à lancer après un déploiement pour prévenir Bing et les moteurs compatibles.
- Articles avec auteur, dates, sources citées, FAQ : extractibles par les moteurs de réponse.

## À faire une fois, à la main (impossible depuis le code)

1. **Google Search Console** (search.google.com/search-console) : ajouter la propriété `findlydeal.com` (validation DNS via Cloudflare, deux minutes), soumettre `https://findlydeal.com/sitemap.xml`, puis « Demander une indexation » pour la page d'accueil. C'est l'action qui pèse le plus : sans elle, Google découvre le site lentement.
2. **Bing Webmaster Tools** (bing.com/webmasters) : importer la propriété depuis Search Console en un clic, ou valider par DNS. Bing alimente aussi DuckDuckGo, Ecosia, Qwant — et les réponses de Copilot.
3. Après chaque déploiement qui ajoute des pages : `node scripts/indexnow-ping.mjs`.
4. Quelques liens entrants réels (profils, annuaires de comparateurs, un post) : un site sans aucun lien entrant reste loin dans les résultats, quelle que soit sa qualité technique.

## Où en attendre les effets

« findlydeal » (requête de marque) : première page dès l'indexation faite, car la marque est unique.
Requêtes génériques (« iphone 13 reconditionné prix »…) : des mois, et surtout des liens entrants ;
les pages produit et le baromètre sont construits pour ça, mais rien ne remplace l'ancienneté.
