import Link from "next/link";
import { Container } from "@/components/common/container";
import { DemoFootnote } from "@/components/common/demo-notice";
import { SectionTitle } from "@/components/common/section-title";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types";

interface FeaturedDealsProps {
  products: Product[];
}

/** "Les bonnes affaires du moment" block of the landing page. */
export function FeaturedDeals({ products }: FeaturedDealsProps) {
  if (products.length === 0) return null;

  return (
    <section className="py-20">
      <Container className="space-y-10">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <SectionTitle
            title="Les bonnes affaires du moment"
            description="Sélectionnées et comparées pour vous, sur toutes les plateformes."
          />
          <Button asChild variant="outline-brand" size="md">
            <Link href="/search">Voir tout</Link>
          </Button>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <DemoFootnote />
      </Container>
    </section>
  );
}
