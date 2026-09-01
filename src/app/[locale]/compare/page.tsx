import type { Metadata } from "next";
import { LocaleLink } from "@/components/common/locale-link";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { Container } from "@/components/common/container";
import { DemoBanner, DemoFootnote } from "@/components/common/demo-notice";
import { SectionTitle } from "@/components/common/section-title";
import { ComparisonTable } from "@/components/product/comparison-table";
import { ProductRow } from "@/components/product/product-row";
import { Button } from "@/components/ui/button";
import { MAX_COMPARED_PRODUCTS, MIN_COMPARED_PRODUCTS, SEARCH_PARAM_KEYS } from "@/lib/constants";
import { getProductById } from "@/lib/products";
import { getSimilarToAll } from "@/lib/products/related";

export const metadata: Metadata = {
  title: "Comparer des produits",
  description:
    "Mettez jusqu'à six produits côte à côte : prix, état, note et fiche technique alignés sur une seule page.",
  // A comparison is a personal, ephemeral selection: useful to share by link,
  // useless in a search index.
  robots: { index: false, follow: true },
};

interface ComparePageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ComparePage({ searchParams }: ComparePageProps) {
  const params = await searchParams;
  const raw = params[SEARCH_PARAM_KEYS.compare];
  const ids = (Array.isArray(raw) ? raw[0] : raw)?.split(",").filter(Boolean) ?? [];

  const products = (
    await Promise.all(ids.slice(0, MAX_COMPARED_PRODUCTS).map((id) => getProductById(id)))
  ).filter((product) => product !== null);

  // Alternatives à l'ensemble du panier, pas à un seul de ses produits.
  const alternatives =
    products.length >= MIN_COMPARED_PRODUCTS ? await getSimilarToAll(products) : [];

  return (
    <>
      <DemoBanner />

      <Container className="space-y-8 py-10">
        <Breadcrumbs items={[{ name: "Comparateur", href: "/search" }, { name: "Comparaison" }]} />

        <SectionTitle
          as="h1"
          title="Comparaison côte à côte"
          description={
            products.length > 0
              ? `${products.length} produits alignés sur les mêmes critères.`
              : undefined
          }
        />

        {products.length >= MIN_COMPARED_PRODUCTS ? (
          <>
            <ComparisonTable products={products} />
            <DemoFootnote />
            <div>
              <Button asChild variant="outline-brand" size="md">
                <LocaleLink href="/search">Retour aux résultats</LocaleLink>
              </Button>
            </div>

            <ProductRow
              title="Produits similaires"
              description="D'autres références proches de celles que vous comparez."
              products={alternatives}
              href="/search"
            />
          </>
        ) : (
          <div className="space-y-3 rounded-2xl bg-cream p-12 text-center">
            <h2 className="font-display font-semibold">
              Sélectionnez au moins {MIN_COMPARED_PRODUCTS} produits à comparer
            </h2>
            <p className="mx-auto max-w-md text-sm leading-relaxed text-muted-foreground">
              Depuis les résultats de recherche, cochez « Comparer » sur les produits qui vous
              intéressent (jusqu&apos;à {MAX_COMPARED_PRODUCTS}), puis revenez ici.
            </p>
            <Button asChild size="md" className="mt-2">
              <LocaleLink href="/search">Aller au comparateur</LocaleLink>
            </Button>
          </div>
        )}
      </Container>
    </>
  );
}
