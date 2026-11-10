import { Scale, Search, ThumbsUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/common/container";

/**
 * The three-step explanation. Reused, in a longer form, by `/how-it-works` —
 * keep these steps as the single source.
 */
export const HOW_IT_WORKS_STEPS: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Search,
    title: "Cherchez un modèle",
    description: "Tapez son nom, ou parcourez les catégories.",
  },
  {
    icon: Scale,
    title: "Comparez neuf, reconditionné et occasion",
    description:
      "Les offres eBay livrables en France sont classées par prix livré, avec l'état et le type de vendeur de chacune.",
  },
  {
    icon: ThumbsUp,
    title: "Achetez chez le vendeur",
    description:
      "Un clic vous mène à l'annonce. Findlydeal ne vend rien et ne touche jamais à votre paiement.",
  },
];

export function HowItWorks() {
  return (
    <section aria-labelledby="how-it-works" className="py-16">
      <Container className="space-y-8">
        <h2 id="how-it-works" className="text-2xl font-bold tracking-tight sm:text-3xl">
          Comment ça marche
        </h2>
        <ol className="grid gap-8 md:grid-cols-3">
          {HOW_IT_WORKS_STEPS.map((step, index) => (
            <li key={step.title} className="flex gap-4">
              <span
                aria-hidden
                className="flex size-8 shrink-0 items-center justify-center rounded-full border text-sm font-semibold"
              >
                {index + 1}
              </span>
              <div>
                <h3 className="text-base font-semibold">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
