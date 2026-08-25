/**
 * FAQ content, shared by the landing page section and the `/faq` page.
 * Editorial content lives here so the two can never drift apart.
 */
export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: "Findlydeal est-il gratuit ?",
    answer:
      "Oui, totalement. Vous ne payez jamais rien. Lorsque vous achetez via l'un de nos liens, c'est la marketplace qui nous verse une commission, et le prix que vous payez reste identique.",
  },
  {
    question: "Sur quelles plateformes comparez-vous ?",
    answer:
      "Nous agrégeons des marketplaces établies comme eBay, Back Market ou Wayfair. La liste s'étend au fur et à mesure que les programmes d'affiliation sont validés.",
  },
  {
    question: "Comment sont détectées les bonnes affaires ?",
    answer:
      "Chaque offre est comparée à un prix de référence calculé à partir des offres concurrentes. Un badge n'apparaît que lorsque l'écart est réellement significatif, pour qu'il garde du sens.",
  },
  {
    question: "Findlydeal vend-il des produits directement ?",
    answer:
      "Non. Findlydeal est un comparateur. L'achat, le paiement, la livraison et la garantie sont assurés par la marketplace vers laquelle vous êtes redirigé.",
  },
  {
    question: "Dans quels pays fonctionne le service ?",
    answer:
      "La recherche est multilingue et interroge les marketplaces de plusieurs pays européens. Les frais de port sont inclus dans le prix comparé pour éviter les mauvaises surprises.",
  },
  {
    question: "Une commission influence-t-elle le classement des offres ?",
    answer:
      "Non. Les offres sont triées par prix total ou par score de bonne affaire. Le montant qu'une source nous reverse n'entre jamais dans le calcul.",
  },
];
