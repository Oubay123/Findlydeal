import type { UiLocale } from "@/i18n";
import { localeAlternates } from "@/lib/seo/locale";
import { LocaleLink } from "@/components/common/locale-link";
import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";
import { siteConfig } from "@/config/site";
import { slugify } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: UiLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    alternates: localeAlternates(locale, "/legal/terms"),
    title: "Conditions d'utilisation",
    description:
      "Conditions d'utilisation de Findlydeal : nature du service de comparaison, exactitude des prix affichés, responsabilité et relations avec les marketplaces.",
  };
}

const SECTIONS = [
  { title: "Objet du service" },
  { title: "Ce que Findlydeal ne fait pas" },
  { title: "Exactitude et actualité des prix" },
  { title: "Utilisation acceptable" },
  { title: "Propriété intellectuelle" },
  { title: "Limitation de responsabilité" },
  { title: "Liens vers des sites tiers" },
  { title: "Modification des conditions" },
  { title: "Droit applicable et for" },
];

/**
 * GENERIC TEMPLATE, NOT LEGAL ADVICE.
 *
 * Drafted for an affiliate price comparison service operated from Switzerland
 * and also addressing French consumers. Swiss law is designated, but mandatory
 * consumer-protection rules of a customer's country of residence can still
 * apply regardless of that clause. Have a lawyer confirm the jurisdiction
 * wording before real commercial operation.
 */
export default function TermsPage() {
  return (
    <LegalPage
      title="Conditions d'utilisation"
      intro="Les règles qui encadrent l'utilisation du comparateur. En parcourant le site, vous acceptez ces conditions."
      lastUpdated="2026-08-23"
      sections={SECTIONS}
    >
      <h2 id={slugify("Objet du service")}>Objet du service</h2>
      <p>
        {siteConfig.name} est un service de comparaison de prix. Il agrège des offres publiées par
        des marketplaces tierces, les présente dans un format comparable et redirige le visiteur
        vers le marchand de son choix.
      </p>
      <p>
        L&apos;accès est gratuit et ne nécessite pas de compte. Le service est financé par des
        commissions d&apos;affiliation, décrites sur la page{" "}
        <LocaleLink href="/legal/affiliate-disclosure">
          transparence sur l&apos;affiliation
        </LocaleLink>
        .
      </p>

      <h2 id={slugify("Ce que Findlydeal ne fait pas")}>Ce que {siteConfig.name} ne fait pas</h2>
      <p>
        Le site ne vend rien, ne détient aucun stock et n&apos;est partie à aucun contrat de vente.
        Il n&apos;intervient ni dans le paiement, ni dans la livraison, ni dans le service
        après-vente.
      </p>
      <p>
        Lorsque vous achetez, le contrat vous lie exclusivement au marchand. Ce sont ses conditions
        générales, sa politique de retour et sa garantie qui s&apos;appliquent. Toute réclamation
        portant sur une commande doit lui être adressée directement.
      </p>

      <h2 id={slugify("Exactitude et actualité des prix")}>Exactitude et actualité des prix</h2>
      <p>
        Les prix, disponibilités et caractéristiques proviennent de sources tierces. Ils peuvent
        être incomplets, obsolètes ou erronés, et changer à tout moment sans que le site en soit
        informé.
      </p>
      <p>
        <strong>Seul le prix affiché par le marchand au moment du paiement fait foi.</strong> Aucune
        information présentée sur {siteConfig.name} ne constitue une offre contractuelle.
      </p>

      <h2 id={slugify("Utilisation acceptable")}>Utilisation acceptable</h2>
      <p>Il est interdit :</p>
      <ul>
        <li>
          d&apos;extraire massivement le contenu du site par des moyens automatisés, notamment par
          moissonnage ou aspiration ;
        </li>
        <li>
          d&apos;émettre un volume de requêtes de nature à dégrader le service pour les autres
          visiteurs ;
        </li>
        <li>de contourner une limitation technique ou une mesure de sécurité ;</li>
        <li>de reproduire tout ou partie du site pour en proposer un service concurrent ;</li>
        <li>d&apos;utiliser le site à des fins illicites ou pour porter atteinte à un tiers.</li>
      </ul>
      <p>
        L&apos;accès peut être restreint, temporairement ou définitivement, en cas de manquement à
        ces règles.
      </p>

      <h2 id={slugify("Propriété intellectuelle")}>Propriété intellectuelle</h2>
      <p>
        La charte graphique, les textes éditoriaux, la structure et le code source du site sont
        protégés. Les marques et logos des marchands et des fabricants restent la propriété de leurs
        titulaires et ne sont utilisés que pour identifier les produits comparés.
      </p>
      <p>
        Une citation courte de nos contenus éditoriaux est autorisée, à condition d&apos;indiquer la
        source et d&apos;ajouter un lien vers la page d&apos;origine.
      </p>

      <h2 id={slugify("Limitation de responsabilité")}>Limitation de responsabilité</h2>
      <p>
        Le service est fourni en l&apos;état, sans garantie de disponibilité continue ni
        d&apos;absence d&apos;erreur. Dans les limites permises par le droit applicable, la
        responsabilité de l&apos;éditeur ne saurait être engagée pour :
      </p>
      <ul>
        <li>un prix ou une disponibilité inexacts provenant d&apos;une source tierce ;</li>
        <li>
          un litige né d&apos;une commande passée chez un marchand, y compris un défaut de
          livraison, de conformité ou de remboursement ;
        </li>
        <li>une interruption du service ou une perte de données ;</li>
        <li>le contenu ou les pratiques des sites tiers vers lesquels le site renvoie.</li>
      </ul>
      <p>
        Ces limitations ne s&apos;appliquent pas en cas de faute intentionnelle ou de négligence
        grave, ni lorsque la loi les écarte.
      </p>

      <h2 id={slugify("Liens vers des sites tiers")}>Liens vers des sites tiers</h2>
      <p>
        Le site renvoie vers des marketplaces et, dans ses articles, vers des ressources externes.
        Ces sites sont indépendants : leur contenu, leurs conditions et leur traitement des données
        personnelles ne relèvent pas de notre responsabilité.
      </p>

      <h2 id={slugify("Modification des conditions")}>Modification des conditions</h2>
      <p>
        Ces conditions peuvent évoluer avec le service. La version applicable est celle publiée sur
        cette page, dont la date de mise à jour figure en tête. En cas de modification
        substantielle, un avis sera affiché sur le site.
      </p>

      <h2 id={slugify("Droit applicable et for")}>Droit applicable et for</h2>
      <p>
        Les présentes conditions sont régies par le droit suisse. Le for est celui du domicile de
        l&apos;éditeur en Suisse.
      </p>
      <p>
        Si vous êtes un consommateur résidant dans l&apos;Union européenne, cette clause ne vous
        prive pas de la protection que vous accordent les dispositions impératives du droit de votre
        pays de résidence.
      </p>
      <p>
        Pour toute question :{" "}
        <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
      </p>
    </LegalPage>
  );
}
