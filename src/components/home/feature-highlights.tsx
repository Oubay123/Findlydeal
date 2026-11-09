import { Layers, Scale, ShieldCheck, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/common/container";

/**
 * Only what the site does today. Price history and price alerts are planned
 * (they need stored prices) and must not be announced before they exist.
 */
const FEATURES: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Scale,
    title: "Prix total comparé",
    description:
      "Le prix de l'objet et les frais de port, du moins cher au plus cher, chez de nombreux vendeurs.",
  },
  {
    icon: Layers,
    title: "Neuf, reconditionné, occasion",
    description: "Chaque offre affiche son état, et une affaire se mesure toujours à état égal.",
  },
  {
    icon: Zap,
    title: "Bonnes affaires vérifiées",
    description:
      "Signalées seulement nettement sous la médiane ; un prix trop bas pour être vrai est marqué « à vérifier ».",
  },
  {
    icon: ShieldCheck,
    title: "Classement indépendant",
    description:
      "Aucune position n'est payante : la commission d'affiliation n'entre jamais dans le classement.",
  },
];

/** Four-column reassurance strip between the deals and the FAQ. */
export function FeatureHighlights() {
  return (
    <section className="bg-cream py-16">
      <Container className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((feature) => (
          <div key={feature.title} className="flex gap-4">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white text-primary">
              <feature.icon className="size-5" strokeWidth={2} aria-hidden />
            </span>
            <div className="space-y-1.5">
              <h3 className="text-sm font-semibold">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
            </div>
          </div>
        ))}
      </Container>
    </section>
  );
}
