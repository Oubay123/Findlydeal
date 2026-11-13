import { describeLiveSources } from "@/lib/sources/describe";

/**
 * FAQ content, shared by the landing page section and the `/faq` page.
 * Editorial content lives here so the two can never drift apart.
 *
 * Every answer must be true of the site as it runs today: the marketplace
 * answer names the sources actually connected, and nothing announces a
 * feature (price history, alerts, other countries) that does not exist yet.
 */
export interface FaqItem {
  question: string;
  answer: string;
}

export function getFaqItems(): FaqItem[] {
  return [
    {
      question: "Findlydeal est-il gratuit ?",
      answer:
        "Oui, totalement. Vous ne payez jamais rien, et les prix affichés sont ceux des marchands. Le site ne perçoit aujourd'hui aucune commission ; à terme, il a vocation à être financé par des programmes d'affiliation, qui ne changent ni le prix payé ni l'ordre des offres.",
    },
    {
      question: "Sur quelles plateformes comparez-vous ?",
      answer: `Aujourd'hui, les offres viennent de ${describeLiveSources()}, auprès de vendeurs professionnels comme de particuliers. D'autres marketplaces seront ajoutées quand leurs conditions d'accès le permettront ; chacune sera indiquée ici et sur la page Méthodologie.`,
    },
    {
      question: "Comment sont détectées les bonnes affaires ?",
      answer:
        "Chaque offre est comparée à la médiane des offres du même produit dans le même état (neuf, reconditionné ou occasion), prix aberrants écartés. Un badge n'apparaît que lorsque l'écart est significatif, et un prix trop bas pour être vraisemblable est signalé « à vérifier » plutôt que présenté comme une affaire.",
    },
    {
      question: "Findlydeal vend-il des produits directement ?",
      answer:
        "Non. Findlydeal est un comparateur. L'achat, le paiement, la livraison et la garantie sont assurés par la marketplace vers laquelle vous êtes redirigé.",
    },
    {
      question: "Dans quels pays fonctionne le service ?",
      answer:
        "En France : les offres comparées sont livrables en France et affichées en euros. Le prix affiché est celui communiqué par le vendeur au moment du relevé : vérifiez toujours le total sur son site avant de valider.",
    },
    {
      question: "Une commission influence-t-elle le classement des offres ?",
      answer:
        "Non. Les offres sont triées par prix total ou par score de bonne affaire. Le montant qu'une source nous reverse n'entre jamais dans le calcul.",
    },
  ];
}
