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

- **Catalogue.** Les produits comparés sont déclarés dans
  `src/config/catalogue-ebay.ts` et `src/config/catalogue/` (un fichier par
  catégorie, environ 330 produits). Chacun est tarifé par les annonces eBay
  qui lui correspondent (filtres de titre, prix minimum et maximum, état).
  Le catalogue est découpé en 16 lots. Une **tâche planifiée** toutes les
  10 minutes (`triggers.crons` dans `wrangler.jsonc`, gérée par
  `cloudflare/worker.js`) reconstruit le lot le plus ancien : une recherche
  eBay par produit du lot, soit un tour complet en un peu moins de 3 h. Les
  pages ne contactent jamais eBay : elles lisent le catalogue stocké.
- **Stockage.** Supabase quand `SUPABASE_URL` et `SUPABASE_SERVICE_ROLE_KEY`
  sont définis, sinon Workers KV (binding `CATALOGUE`). Voir « Supabase »
  ci-dessous.
- **Bonnes affaires.** La médiane est calculée par état (neuf, reconditionné,
  occasion), sans les prix aberrants. Une offre à plus de 45 % sous la
  médiane est marquée « Prix inhabituel, à vérifier ».
- **Recherche.** La recherche interroge eBay en direct. Les réponses sont
  mises en cache 1 h.
- **Liens.** Les liens sont les `itemAffiliateWebUrl` renvoyés par eBay grâce
  à l'en-tête `X-EBAY-C-ENDUSERCTX` (campagne EPN). À défaut, l'application
  construit un lien EPN avec `campid`.
- **Images.** Les photos viennent des annonces eBay (`i.ebayimg.com`).

## Supabase

La base stocke le catalogue (une ligne par produit, une par offre),
l'historique des prix (`price_points`, affiché sur les fiches produit) et le
journal des reconstructions (`ingest_runs`). Sans elle, le site fonctionne
avec Workers KV, sans historique.

Le projet existe : **findlydeal** (réf. `htemgvbkiaeiqowztttb`, région
eu-west-3 Paris, organisation Findlydeal), tables créées par la migration
`supabase/migrations/0001_catalogue.sql`. Pour que le site l'utilise :

1. Dans Supabase, **Project Settings > API Keys**, copier la clé
   `service_role` (ou une clé secrète `sb_secret_…`).
2. Dans Cloudflare, **Workers & Pages > findlydeal > Settings > Variables and
   Secrets** (pas la section Build), ajouter :

| Nom                         | Type   | Valeur                         |
| --------------------------- | ------ | ------------------------------ |
| `SUPABASE_URL`              | Text   | `https://<projet>.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | Secret | la clé `service_role`          |

5. Cliquer sur **Deploy**. Le catalogue se remplit lot par lot dans les trois
   heures ; `select * from ingest_status;` montre l'avancement.

La clé `service_role` contourne la sécurité par ligne : elle ne doit exister
que dans les secrets Cloudflare. Les tables ont la sécurité par ligne activée
sans aucune règle, donc la clé publique `anon` ne peut rien lire.

## Vérifier après un déploiement

```bash
npm run check:schema -- --base https://findlydeal.com
```

Ce script parcourt le sitemap en ligne. Il signale toute URL listée qui ne
répond pas 200, qui porte `noindex`, ou dont le JSON-LD sort du profil
`src/lib/seo/schema/profile.json`.

## Limites connues

- Un lot compte au plus une trentaine de produits : avec les écritures, une
  reconstruction reste sous la limite gratuite de 50 sous-requêtes. Au-delà
  d'environ 450 produits, augmenter `BUCKET_COUNT` (`src/lib/catalogue/store.ts`).
- Un produit ajouté ou modifié dans la configuration est pris en compte au
  prochain passage de son lot (au plus 3 h).
- Les frais de Protection des acheteurs eBay (vendeurs particuliers) sont
  estimés sous l'offre selon le barème eBay France, sans être ajoutés au
  total : l'API ne dit pas si le prix renvoyé les inclut.
- La correspondance annonce ↔ fiche repose sur les titres : à surveiller et
  ajuster dans `catalogue-ebay.ts`.
