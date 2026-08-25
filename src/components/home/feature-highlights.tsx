import { Bell, Globe, Search, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/common/container";

const FEATURES: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Search,
    title: "Comparaison multi-plateformes",
    description: "Des dizaines de marketplaces comparées en une seule recherche.",
  },
  {
    icon: Globe,
    title: "Historique des prix",
    description: "Suivez l'évolution du prix d'un produit dans le temps et achetez au bon moment.",
  },
  {
    icon: Bell,
    title: "Alertes de baisse de prix",
    description:
      "Recevez une notification dès que le prix d'un produit suivi passe sous votre seuil.",
  },
  {
    icon: Zap,
    title: "Bonnes affaires auto-détectées",
    description: "Notre algorithme repère les vraies économies et les met en avant pour vous.",
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
