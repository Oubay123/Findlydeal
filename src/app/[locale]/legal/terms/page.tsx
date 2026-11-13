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
    title: "Conditions générales d'utilisation",
    description:
      "Conditions générales d'utilisation de Findlydeal : nature du service de comparaison, exactitude des prix affichés, responsabilité, droit applicable et for.",
  };
}

const SECTIONS = [
  { title: "Objet et acceptation" },
  { title: "Nature du service" },
  { title: "Ce que Findlydeal ne fait pas" },
  { title: "Accès au service" },
  { title: "Exactitude et actualité des prix" },
  { title: "Rôle des marketplaces et des marchands" },
  { title: "Utilisation acceptable" },
  { title: "Propriété intellectuelle" },
  { title: "Responsabilité" },
  { title: "Liens vers des sites tiers" },
  { title: "Données personnelles" },
  { title: "Modification du service et des conditions" },
  { title: "Nullité partielle" },
  { title: "Droit applicable et for" },
];

/**
 * GENERIC TEMPLATE, NOT LEGAL ADVICE.
 *
 * Drafted for a price comparison service that sells nothing itself, operated
 * from Switzerland and also addressing French consumers. The structure
 * follows what established Swiss (comparis.ch, digitec) and French
 * (idealo.fr, leDénicheur) comparators publish: nature of the service, limits
 * on price accuracy, the marketplaces' own terms, acceptable use, liability,
 * applicable law. Swiss law is designated, but mandatory consumer-protection
 * rules of the visitor's country of residence (France in particular) apply
 * regardless of that clause, and the Lugano Convention can give a consumer a
 * forum at their own domicile. The publisher's identity is read from
 * `siteConfig.publisher` and stays blank until it is filled in; have the
 * whole page validated by a lawyer before real commercial operation.
 */
export default function TermsPage() {
  const { publisher } = siteConfig;
  return (
    <LegalPage
      title="Conditions générales d'utilisation"
      intro="Les règles qui encadrent la consultation et l'utilisation du comparateur. Elles s'appliquent à tout visiteur, sans création de compte."
      lastUpdated="2026-11-13"
      sections={SECTIONS}
    >
      <h2 id={slugify("Objet et acceptation")}>1. Objet et acceptation</h2>
      <p>
        Les présentes conditions générales d&apos;utilisation (les «&nbsp;CGU&nbsp;») régissent
        l&apos;accès au site {siteConfig.name}, accessible à l&apos;adresse{" "}
        <a href={siteConfig.url}>{siteConfig.url.replace("https://", "")}</a>, et son utilisation.
        En consultant le site, vous acceptez les CGU dans leur version en vigueur au moment de votre
        visite. Si vous n&apos;acceptez pas l&apos;une de ces règles, il vous appartient de ne pas
        utiliser le service.
      </p>
      <p>
        Le site est édité par {publisher.name ? publisher.name : "l'éditeur du site"} (voir les{" "}
        <LocaleLink href="/legal/legal-notice">mentions légales</LocaleLink>
        {publisher.name
          ? ")."
          : " ; l'identification complète de l'éditeur y sera publiée avant l'exploitation commerciale du service)."}
      </p>

      <h2 id={slugify("Nature du service")}>2. Nature du service</h2>
      <p>
        {siteConfig.name} est un comparateur de prix. Il relève, via leurs interfaces officielles,
        des offres publiées sur des marketplaces tierces pour un catalogue de produits défini par la
        rédaction, les ramène à un format comparable (prix livré en France, état du produit, type de
        vendeur) et renvoie le visiteur vers l&apos;annonce du marchand de son choix. La liste des
        marketplaces interrogées et les règles de classement sont décrites sur la page{" "}
        <LocaleLink href="/methodologie">Méthodologie</LocaleLink>, conformément aux articles
        L.&nbsp;111-7 et D.&nbsp;111-7 et suivants du Code de la consommation français.
      </p>
      <p>
        L&apos;utilisation du comparateur est gratuite. Le site ne perçoit aujourd&apos;hui aucune
        rémunération des marchands&nbsp;; son mode de financement prévu et son état actuel sont
        décrits sur la page{" "}
        <LocaleLink href="/legal/affiliate-disclosure">
          Transparence sur l&apos;affiliation
        </LocaleLink>
        . Aucune position dans un classement n&apos;est payante.
      </p>

      <h2 id={slugify("Ce que Findlydeal ne fait pas")}>3. Ce que {siteConfig.name} ne fait pas</h2>
      <ul>
        <li>
          Il ne vend aucun produit, ne détient aucun stock et n&apos;est partie à aucun contrat de
          vente conclu entre vous et un marchand.
        </li>
        <li>Il n&apos;encaisse aucun paiement et ne traite aucune livraison ni aucun retour.</li>
        <li>
          Il ne fournit ni garantie commerciale ni service après-vente pour les produits présentés.
        </li>
        <li>
          Il ne vérifie pas physiquement les produits&nbsp;: les descriptions, photographies et
          états annoncés relèvent de chaque vendeur.
        </li>
        <li>
          Il ne fournit aucun conseil personnalisé, juridique ou financier&nbsp;; ses guides ont une
          vocation d&apos;information générale.
        </li>
      </ul>

      <h2 id={slugify("Accès au service")}>4. Accès au service</h2>
      <p>
        Le site est accessible sans compte, 24&nbsp;heures sur&nbsp;24 dans la mesure du possible.
        L&apos;éditeur ne garantit aucune disponibilité ni absence d&apos;erreur&nbsp;: le service
        est en développement actif, ce qu&apos;un bandeau rappelle sur chaque page, et peut être
        suspendu à tout moment pour maintenance ou mise à jour, sans préavis ni indemnité.
      </p>

      <h2 id={slugify("Exactitude et actualité des prix")}>5. Exactitude et actualité des prix</h2>
      <p>
        Les prix, frais de livraison, états et disponibilités affichés sont relevés automatiquement
        auprès des marketplaces à intervalles réguliers. Chaque fiche produit indique la date ou
        l&apos;ancienneté du dernier relevé, et signale expressément les relevés anciens. Entre deux
        relevés, un marchand peut modifier ou retirer son offre à tout moment&nbsp;:{" "}
        <strong>
          seuls le prix et les conditions affichés sur le site du marchand au moment de la commande
          font foi
        </strong>
        .
      </p>
      <p>
        Certaines marketplaces ajoutent des frais au moment du paiement qui ne figurent pas dans le
        prix de l&apos;annonce (par exemple les frais de «&nbsp;Protection des acheteurs&nbsp;»
        d&apos;eBay sur les annonces de particuliers). Lorsque c&apos;est le cas, le site le signale
        sous les offres concernées et en affiche, quand c&apos;est possible, une estimation. Les
        prix de référence «&nbsp;neuf chez les vendeurs officiels&nbsp;» sont des relevés manuels
        datés, non des prix en temps réel. Les écarts de prix entre états sont des comparaisons
        entre offres disponibles au même moment, jamais des remises (article L.&nbsp;112-1-1 du Code
        de la consommation).
      </p>
      <p>
        Si vous constatez un prix mal affiché, signalez-le à{" "}
        <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>&nbsp;: la
        correction des erreurs fait partie du fonctionnement normal du service.
      </p>

      <h2 id={slugify("Rôle des marketplaces et des marchands")}>
        6. Rôle des marketplaces et des marchands
      </h2>
      <p>
        Lorsque vous cliquez sur une offre, vous quittez {siteConfig.name} et arrivez sur le site de
        la marketplace, où s&apos;appliquent ses propres conditions générales, sa politique de
        confidentialité et ses mécanismes de protection des acheteurs. Le contrat de vente est
        conclu exclusivement entre vous et le vendeur. Les droits attachés à l&apos;achat (droit de
        rétractation, garantie légale de conformité des articles L.&nbsp;217-3 et suivants du Code
        de la consommation pour un vendeur professionnel, garanties des articles 197 et suivants du
        Code suisse des obligations le cas échéant) s&apos;exercent auprès du vendeur ou de la
        marketplace, pas auprès de {siteConfig.name}.
      </p>
      <p>
        N&apos;étant pas vendeur, {siteConfig.name} n&apos;entre pas dans le champ de la médiation
        de la consommation (articles L.&nbsp;611-1 et suivants du Code de la consommation)&nbsp;:
        pour un litige lié à un achat, adressez-vous au vendeur, puis au dispositif de médiation que
        la marketplace désigne dans ses propres conditions.
      </p>

      <h2 id={slugify("Utilisation acceptable")}>7. Utilisation acceptable</h2>
      <p>Vous vous engagez à ne pas&nbsp;:</p>
      <ul>
        <li>
          perturber le fonctionnement du service, tenter d&apos;accéder à des parties non publiques
          du site ou contourner ses mesures techniques&nbsp;;
        </li>
        <li>
          extraire de manière substantielle ou systématique le contenu du site (extraction massive,
          «&nbsp;scraping&nbsp;», réutilisation de la base de données au sens des articles
          L.&nbsp;342-1 et suivants du Code de la propriété intellectuelle) sans autorisation
          écrite&nbsp;;
        </li>
        <li>
          présenter le contenu du site d&apos;une manière qui laisse croire à un partenariat ou à
          une approbation qui n&apos;existe pas&nbsp;;
        </li>
        <li>utiliser le service à des fins illicites ou au préjudice de tiers.</li>
      </ul>

      <h2 id={slugify("Propriété intellectuelle")}>8. Propriété intellectuelle</h2>
      <p>
        La structure du site, ses textes éditoriaux, sa charte graphique, son code et sa base de
        données sont protégés par le droit d&apos;auteur et le droit des bases de données. Toute
        reproduction ou représentation non autorisée est interdite. Les marques et visuels des
        produits et des marchands appartiennent à leurs titulaires&nbsp;; ils sont utilisés aux
        seules fins d&apos;identification des produits comparés. La courte citation avec mention de
        la source reste libre.
      </p>

      <h2 id={slugify("Responsabilité")}>9. Responsabilité</h2>
      <p>
        {siteConfig.name} fournit un service d&apos;information. Dans les limites de la loi,
        l&apos;éditeur ne répond ni des décisions d&apos;achat prises sur la base des informations
        affichées, ni de l&apos;exécution des ventes conclues avec les marchands, ni des contenus
        publiés par les marketplaces et les vendeurs, ni des dommages indirects liés à
        l&apos;utilisation du site. Rien dans les CGU n&apos;exclut la responsabilité de
        l&apos;éditeur pour son dol ou sa faute grave (article 100 du Code suisse des obligations),
        ni aucune responsabilité qui ne peut être exclue selon le droit impératif applicable, ni ne
        prive un consommateur des droits que lui confère la loi de son pays de résidence.
      </p>

      <h2 id={slugify("Liens vers des sites tiers")}>10. Liens vers des sites tiers</h2>
      <p>
        Les liens vers les marketplaces, les vendeurs officiels cités dans les relevés de prix neufs
        et les sources citées dans les guides sont fournis pour information. L&apos;éditeur
        n&apos;exerce aucun contrôle sur ces sites et n&apos;assume aucune responsabilité quant à
        leur contenu.
      </p>

      <h2 id={slugify("Données personnelles")}>11. Données personnelles</h2>
      <p>
        Le site fonctionne sans compte et sans traceur publicitaire. Les traitements de données sont
        décrits dans la <LocaleLink href="/legal/privacy">politique de confidentialité</LocaleLink>{" "}
        et la <LocaleLink href="/legal/cookies">politique de cookies</LocaleLink>.
      </p>

      <h2 id={slugify("Modification du service et des conditions")}>
        12. Modification du service et des conditions
      </h2>
      <p>
        L&apos;éditeur peut faire évoluer le service (catalogue, fonctionnalités, marketplaces
        interrogées) et les présentes CGU. La version en vigueur est celle publiée sur cette page,
        avec sa date de mise à jour&nbsp;; les modifications substantielles sont signalées sur le
        site. Les CGU s&apos;appliquent à l&apos;utilisation du site postérieure à leur publication.
      </p>

      <h2 id={slugify("Nullité partielle")}>13. Nullité partielle</h2>
      <p>
        Si une stipulation des CGU est jugée nulle ou inopposable, les autres stipulations restent
        en vigueur&nbsp;; la stipulation concernée est remplacée par la règle valable la plus proche
        de son objet.
      </p>

      <h2 id={slugify("Droit applicable et for")}>14. Droit applicable et for</h2>
      <p>
        Les CGU sont régies par le droit suisse, sous réserve des règles impératives du pays de
        résidence habituelle du visiteur&nbsp;: si vous consultez le site en tant que consommateur
        depuis la France ou un autre État de l&apos;Union européenne, vous conservez la protection
        des dispositions impératives de votre droit national (article 6 du règlement
        «&nbsp;Rome&nbsp;I&nbsp;»).
      </p>
      <p>
        Pour tout litige relatif aux CGU, le for est au siège de l&apos;éditeur
        {publisher.address
          ? ` (${publisher.address})`
          : ", tel qu'indiqué dans les mentions légales"}
        . Les consommateurs domiciliés dans un État lié par la Convention de Lugano du 30 octobre
        2007 ou par le règlement (UE) n°&nbsp;1215/2012 peuvent également saisir les tribunaux de
        leur domicile lorsque ces textes le leur permettent.
      </p>
    </LegalPage>
  );
}
