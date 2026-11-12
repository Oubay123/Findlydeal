import { Scale, Search, ThumbsUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/common/container";
import { LocaleLink } from "@/components/common/locale-link";

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

/**
 * Right under the photos: the three steps, in order, on one line that links
 * them. It is a real sequence, so the numbers carry meaning. As the section
 * scrolls into view the line draws itself from step to step (CSS
 * scroll-driven animation, see `.step-line` in globals.css; still for
 * visitors who asked for less motion and in browsers without support).
 */
export function HowItWorks() {
  return (
    <section aria-labelledby="how-it-works" className="bg-brand-50 border-b">
      <Container className="py-14 sm:py-16">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <h2 id="how-it-works" className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Comment ça marche
          </h2>
          <LocaleLink
            href="/how-it-works"
            className="text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            Le détail, étape par étape
          </LocaleLink>
        </div>
        <ol className="step-track mt-10 grid gap-8 md:grid-cols-3 md:gap-10">
          {HOW_IT_WORKS_STEPS.map((step, index) => (
            <li key={step.title} className="relative pl-14 md:pt-14 md:pl-0">
              {index < HOW_IT_WORKS_STEPS.length - 1 ? (
                <span
                  aria-hidden
                  className="step-line absolute top-10 bottom-[-2rem] left-[1.1875rem] w-px bg-foreground/20 md:top-[1.1875rem] md:right-[-2.5rem] md:bottom-auto md:left-12 md:h-px md:w-auto"
                />
              ) : null}
              <span
                aria-hidden
                className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-full border border-foreground/20 bg-white text-sm font-semibold tabular-nums"
              >
                {index + 1}
              </span>
              <h3 className="pt-2 text-base font-semibold md:pt-0">{step.title}</h3>
              <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
