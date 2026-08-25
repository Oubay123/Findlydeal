import { Info } from "lucide-react";
import { Container } from "@/components/common/container";
import { isDemoCatalogueActive } from "@/lib/mock";
import { cn } from "@/lib/utils";

/**
 * Honesty notices for the demonstration catalogue.
 *
 * Affiliate networks (eBay Partner Network, Awin) check that a site does not
 * present fabricated prices as live offers. Both components below render
 * nothing once a real source is configured, so the disclosure and the mock
 * data always appear and disappear together.
 */

/** Thin banner placed at the top of every page that shows product data. */
export function DemoBanner({ className }: { className?: string }) {
  if (!isDemoCatalogueActive()) return null;

  return (
    <div className={cn("border-b bg-cream", className)}>
      <Container className="flex items-start gap-2.5 py-2.5">
        <Info className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
        <p className="text-xs leading-relaxed text-muted-foreground">
          <span className="font-medium text-foreground">Données de démonstration.</span> Findlydeal
          finalise ses partenariats marchands : les produits, prix et avis affichés sont des
          exemples destinés à illustrer le service, et non des offres relevées en temps réel.
        </p>
      </Container>
    </div>
  );
}

/** Small "Exemple" pill, overlaid on product imagery. */
export function DemoBadge({ className }: { className?: string }) {
  if (!isDemoCatalogueActive()) return null;

  return (
    <span
      className={cn(
        "rounded-md bg-white/85 px-2 py-0.5 text-[11px] font-medium text-foreground/70 backdrop-blur-sm",
        className,
      )}
      title="Donnée de démonstration, pas une offre réelle"
    >
      Exemple
    </span>
  );
}

/** One-line footnote for the bottom of a product section. */
export function DemoFootnote({ className }: { className?: string }) {
  if (!isDemoCatalogueActive()) return null;

  return (
    <p className={cn("text-xs text-muted-foreground", className)}>
      Les offres ci-dessus sont des exemples de démonstration. Les prix réels seront relevés en
      direct auprès des marketplaces dès l&apos;activation de nos partenariats.
    </p>
  );
}
