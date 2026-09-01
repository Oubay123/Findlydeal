import { LocaleLink } from "@/components/common/locale-link";
import { Container } from "@/components/common/container";
import { Button } from "@/components/ui/button";

/** Closing call to action, on the brand gradient. */
export function FinalCta() {
  return (
    <section className="brand-gradient py-20">
      <Container className="flex flex-col items-center gap-5 text-center">
        <h2 className="max-w-2xl text-3xl leading-tight font-bold text-balance text-white sm:text-4xl">
          Prêt à dénicher votre prochaine bonne affaire ?
        </h2>
        <p className="max-w-xl text-white/85">
          Des milliers d&apos;offres vous attendent. Comparez en quelques secondes.
        </p>
        <Button
          asChild
          size="xl"
          className="mt-2 bg-white font-semibold text-primary hover:bg-white/90"
        >
          <LocaleLink href="/search">Voir les produits</LocaleLink>
        </Button>
      </Container>
    </section>
  );
}
