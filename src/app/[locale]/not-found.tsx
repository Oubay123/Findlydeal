import Link from "next/link";
import { Container } from "@/components/common/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Container className="flex max-w-xl flex-col items-center gap-4 py-28 text-center">
      <p className="font-display text-sm font-semibold text-primary">404</p>
      <h1 className="text-3xl font-bold">Cette page n&apos;existe pas</h1>
      <p className="text-muted-foreground">
        Le lien est peut-être obsolète. Repartez d&apos;une recherche : c&apos;est là que nous
        sommes bons.
      </p>
      <div className="mt-2 flex flex-wrap justify-center gap-3">
        <Button asChild size="md">
          <Link href="/search">Rechercher un produit</Link>
        </Button>
        <Button asChild variant="outline-brand" size="md">
          <Link href="/">Retour à l&apos;accueil</Link>
        </Button>
      </div>
    </Container>
  );
}
