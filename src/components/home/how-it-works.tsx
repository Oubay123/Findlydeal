import { Scale, Search, ThumbsUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/common/container";
import { SectionTitle } from "@/components/common/section-title";

/**
 * The three-step explanation. Reused, in a longer form, by `/how-it-works` —
 * keep these steps as the single source.
 */
export const HOW_IT_WORKS_STEPS: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Search,
    title: "Recherchez un produit",
    description: "Tapez le nom du produit dans la barre de recherche.",
  },
  {
    icon: Scale,
    title: "Comparez les prix partout",
    description:
      "Findlydeal interroge simultanément des dizaines de marketplaces pour vous, en temps réel.",
  },
  {
    icon: ThumbsUp,
    title: "Trouvez la meilleure affaire",
    description:
      "Les meilleures offres sont mises en avant automatiquement. Cliquez, achetez, économisez.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-cream py-20">
      <Container className="space-y-12">
        <SectionTitle
          centered
          title="Comment ça marche ?"
          description="Trois étapes, zéro effort."
        />

        <ol className="grid gap-6 md:grid-cols-3">
          {HOW_IT_WORKS_STEPS.map((step, index) => (
            <li
              key={step.title}
              className="relative overflow-hidden rounded-2xl bg-white p-8 text-center"
            >
              <span
                aria-hidden
                className="absolute top-3 right-5 font-display text-5xl font-bold text-primary/10"
              >
                {index + 1}
              </span>

              <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-brand-100 text-primary">
                <step.icon className="size-6" strokeWidth={2} aria-hidden />
              </span>

              <h3 className="mt-6 text-base font-semibold">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
