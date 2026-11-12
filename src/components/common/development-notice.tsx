import { Container } from "@/components/common/container";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * `mailto:` link for reporting a wrongly displayed price, with the subject
 * (and the page, when known) filled in so the report is actionable.
 */
export function priceErrorMailto(product?: { title: string; url?: string }): string {
  const subject = product ? `Prix erroné : ${product.title}` : "Prix erroné sur Findlydeal";
  const body = product?.url
    ? `Page concernée : ${product.url}\n\nPrix affiché et prix constaté chez le vendeur :\n`
    : "Page concernée :\n\nPrix affiché et prix constaté chez le vendeur :\n";
  return `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * Site-wide line under the header: the site is still being built and looks
 * for affiliate partners, so a figure can be wrong. The address is for
 * wrongly displayed prices only; delivery, quality or an order is the
 * seller's business, and the line says so to keep the mailbox usable.
 */
export function DevelopmentNotice({ className }: { className?: string }) {
  return (
    <div className={cn("bg-brand-50 border-b", className)}>
      <Container className="py-2 text-xs leading-relaxed text-muted-foreground">
        <span className="font-medium text-foreground">Site en cours de développement</span>, à la
        recherche de partenaires d&apos;affiliation : certaines informations peuvent être erronées.
        Un prix mal affiché ? Écrivez à{" "}
        <a
          href={priceErrorMailto()}
          className="font-medium text-foreground underline underline-offset-2"
        >
          {siteConfig.contactEmail}
        </a>{" "}
        (uniquement pour les erreurs de prix ; pour la livraison, la qualité ou une commande,
        contactez le vendeur).
      </Container>
    </div>
  );
}
