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
    alternates: localeAlternates(locale, "/legal/legal-notice"),
    title: "Mentions légales",
    description:
      "Mentions légales de Findlydeal : éditeur du site, hébergeur, coordonnées de contact et propriété intellectuelle du comparateur de prix.",
  };
}

const SECTIONS = [
  { title: "Nature du service" },
  { title: "Propriété intellectuelle" },
  { title: "Signaler un contenu" },
];

/**
 * GENERIC TEMPLATE, NOT LEGAL ADVICE.
 *
 * Written as a reasonable starting point for an affiliate price comparison
 * site operated from Switzerland and also addressing the French market. It has
 * not been reviewed by a lawyer. Have it validated by a legal professional
 * before real commercial operation: obligations differ with the legal form
 * chosen, the country of establishment and the turnover.
 *
 * ## The hosting provider must match reality
 *
 * The "Hébergement" section names Cloudflare. Naming an operator's hosting
 * provider is a legal requirement in both France and Switzerland, and naming
 * the wrong one is a false statement rather than a stale detail. If the
 * deployment target ever moves away from Cloudflare, this block moves with it.
 *
 * ## Identification of the publisher is missing on purpose
 *
 * Name, postal address, legal status and company number were removed at the
 * operator's request. They are not optional in the long run: France's LCEN
 * (art. 6 III) and Switzerland's LCD (art. 3 para. 1 let. s) both require a
 * commercial site to identify who runs it, and an affiliate network reviewing
 * an application will look for exactly that. Put them back before real
 * commercial operation, along with the publication director, which is a
 * separate French obligation.
 */
export default function LegalNoticePage() {
  return (
    <LegalPage
      title="Mentions légales"
      intro="Informations sur l'éditeur, l'hébergeur et le fonctionnement du site, conformément aux obligations d'identification applicables aux services en ligne."
      lastUpdated="2026-08-23"
      sections={SECTIONS}
    >
            <h2 id={slugify("Nature du service")}>Nature du service</h2>
      <p>
        {siteConfig.name} est un comparateur de prix. Le site ne vend aucun produit, ne détient
        aucun stock et n&apos;intervient dans aucune transaction. Il présente des offres provenant
        de marketplaces tierces et redirige le visiteur vers celles-ci. L&apos;achat, le paiement,
        la livraison, la garantie et le service après-vente relèvent exclusivement du marchand
        choisi.
      </p>
      <p>
        Le service est financé par des commissions d&apos;affiliation, détaillées sur la page{" "}
        <LocaleLink href="/legal/affiliate-disclosure">
          transparence sur l&apos;affiliation
        </LocaleLink>
        .
      </p>

      <h2 id={slugify("Propriété intellectuelle")}>Propriété intellectuelle</h2>
      <p>
        La structure du site, sa charte graphique, ses textes éditoriaux et son code source sont
        protégés par le droit d&apos;auteur. Toute reproduction ou représentation, totale ou
        partielle, sans autorisation écrite préalable est interdite.
      </p>
      <p>
        Les marques, dénominations commerciales et logos des marchands et des fabricants cités
        appartiennent à leurs titulaires respectifs. Ils sont utilisés pour identifier les produits
        comparés, sans que cela implique un partenariat autre que ceux mentionnés sur la page dédiée
        à l&apos;affiliation.
      </p>
      <p>
        Les photographies illustrant le site proviennent de banques d&apos;images sous licence libre
        autorisant l&apos;usage commercial.
      </p>

      <h2 id={slugify("Signaler un contenu")}>Signaler un contenu</h2>
      <p>
        Pour signaler une information erronée, une atteinte à un droit ou un contenu inapproprié,
        écrivez à <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a> en
        précisant l&apos;adresse de la page concernée et la nature du problème. Toute demande
        motivée reçoit une réponse dans un délai raisonnable.
      </p>
    </LegalPage>
  );
}
