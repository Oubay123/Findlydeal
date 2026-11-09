# Déploiement sur Cloudflare et offres eBay

Le site tourne sur Cloudflare Workers via l'adaptateur OpenNext
(`wrangler.jsonc`, `open-next.config.ts`). Cloudflare Workers Builds lance
`npm run build`, qui exécute `opennextjs-cloudflare build` (lui-même lance
`next build`). Il produit `.open-next/worker.js`, que `wrangler` publie.

## Réglages du projet Workers Builds

| Réglage                                         | Valeur                         |
| ----------------------------------------------- | ------------------------------ |
| Commande de build                               | `npm run build`                |
| Commande de déploiement (branche de production) | `npx wrangler deploy`          |
| Commande de déploiement (autres branches)       | `npx wrangler versions upload` |
| Répertoire racine                               | `/`                            |

## Variables et secrets

Ils se règlent dans le tableau de bord Cloudflare : **Workers & Pages >
findlydeal > Settings > Variables and Secrets**. Une autre solution est
`npx wrangler secret put NOM`. Ils ne vont jamais dans le dépôt.
`keep_vars: true` dans `wrangler.jsonc` empêche un déploiement d'effacer
ceux saisis dans le tableau de bord.

| Nom                   | Type                   | Rôle                                                                      |
| --------------------- | ---------------------- | ------------------------------------------------------------------------- |
| `EBAY_CLIENT_ID`      | Secret                 | App ID du jeu de clés **Production** (developer.ebay.com > My Keys)       |
| `EBAY_CLIENT_SECRET`  | Secret                 | Cert ID du même jeu de clés                                               |
| `EBAY_CAMPAIGN_ID`    | Variable               | Campaign ID eBay Partner Network : sans lui, les liens ne rapportent rien |
| `EBAY_REFERENCE_ID`   | Variable (optionnelle) | Étiquette remontée dans les rapports EPN, `findlydeal` par défaut         |
| `EBAY_MARKETPLACE_ID` | Variable               | `EBAY_FR` (déjà dans `wrangler.jsonc`)                                    |

Tant que `EBAY_CLIENT_ID` et `EBAY_CLIENT_SECRET` manquent, le site reste en
mode démonstration : catalogue d'exemple, bandeau « démo », pages en
`noindex` et sitemap réduit. Il n'affiche donc jamais de faux prix comme réels.

Les pages qui affichent des prix sont rendues à la demande
(`dynamic = "force-dynamic"`) : les secrets n'existent qu'à l'exécution,
pas pendant le build.

## Ce qui se passe en mode réel

- **Catalogue.** Les fiches listées dans `src/config/catalogue-ebay.ts`
  gardent leur description. Elles sont tarifées par les annonces eBay
  correspondantes (filtres de titre, prix minimum, état). Le catalogue entier
  est reconstruit au plus une fois toutes les 3 h par centre de données
  Cloudflare (Cache API), soit une recherche eBay par fiche.
- **Recherche.** La recherche interroge eBay en direct. Les réponses sont
  mises en cache 1 h.
- **Liens.** Les liens sont les `itemAffiliateWebUrl` renvoyés par eBay grâce
  à l'en-tête `X-EBAY-C-ENDUSERCTX` (campagne EPN). À défaut, l'application
  construit un lien EPN avec `campid`.
- **Images.** Les photos viennent des annonces eBay (`i.ebayimg.com`).

## Vérifier après un déploiement

```bash
npm run check:schema -- --base https://findlydeal.com
```

Ce script parcourt le sitemap en ligne. Il signale toute URL listée qui ne
répond pas 200, qui porte `noindex`, ou dont le JSON-LD sort du profil
`src/lib/seo/schema/profile.json`.

## Limites connues

- La recherche eBay plafonne autour de 40 fiches dans la limite gratuite de
  50 sous-requêtes par visite. Au-delà, il faut reconstruire le catalogue
  par une tâche planifiée (Cron Trigger) qui écrit dans une base
  (Supabase prévu).
- Les frais de Protection des acheteurs eBay chez les vendeurs particuliers
  ne sont pas inclus dans le prix total : ils sont signalés sur la ligne
  de l'offre.
- La correspondance annonce ↔ fiche repose sur les titres : à surveiller et
  ajuster dans `catalogue-ebay.ts`.
