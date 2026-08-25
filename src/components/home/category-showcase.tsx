import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { CategoryGrid } from "@/components/category/category-grid";
import { Container } from "@/components/common/container";
import { SectionTitle } from "@/components/common/section-title";
import { Button } from "@/components/ui/button";

/** "Explorez par catégorie" block of the landing page. */
export function CategoryShowcase() {
  return (
    <section className="py-20">
      <Container className="space-y-10">
        <SectionTitle
          title="Explorez par catégorie"
          description="Des milliers d'offres dans chaque univers, comparées en temps réel."
        />

        <CategoryGrid />

        <div className="flex justify-center pt-2">
          <Button asChild variant="outline-brand" size="md">
            <Link href="/search">
              Voir toutes les catégories
              <ChevronRight data-icon="inline-end" aria-hidden />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
