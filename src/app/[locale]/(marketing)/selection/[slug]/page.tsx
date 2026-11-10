import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { Container } from "@/components/common/container";
import { DemoBanner } from "@/components/common/demo-notice";
import { JsonLd } from "@/components/common/json-ld";
import { LocaleLink } from "@/components/common/locale-link";
import { selectionProducts } from "@/components/home/seasonal-banner";
import { ProductCard } from "@/components/product/product-card";
import { getSelection, seasonalSelections } from "@/config/selections";
import type { UiLocale } from "@/i18n";
import { isDemoCatalogueActive } from "@/lib/mock";
import { buildGraph, itemListNode, pageUrl, schemaIds, webPageNode } from "@/lib/seo/json-ld";
import { localeAlternates } from "@/lib/seo/locale";

interface SelectionPageProps {
  params: Promise<{ locale: UiLocale; slug: string }>;
}

/** Prices come from the runtime catalogue, never from the build. */
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: SelectionPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const selection = getSelection(slug);
  if (!selection) return { title: "Sélection introuvable" };
  return {
    title: { absolute: `${selection.title} : prix neuf, reconditionné, occasion` },
    description: selection.lead,
    alternates: localeAlternates(locale, `/selection/${selection.slug}`),
  };
}

/**
 * A seasonal selection: the products of `src/config/selections.ts` that
 * are priced right now, as cards. The page exists all year; the home page
 * only points to it during the selection's dates.
 */
export default async function SelectionPage({ params }: SelectionPageProps) {
  const { locale, slug } = await params;
  const selection = getSelection(slug);
  if (!selection) notFound();

  const products = await selectionProducts(selection);
  const path = `/selection/${selection.slug}`;
  const url = pageUrl(locale, path);
  const listsProducts = !isDemoCatalogueActive() && products.length > 0;
  const others = seasonalSelections.filter((other) => other.slug !== selection.slug);

  return (
    <>
      <DemoBanner />
      <JsonLd
        data={buildGraph(
          webPageNode({
            url,
            name: selection.title,
            description: selection.lead,
            type: "CollectionPage",
            mainEntity: listsProducts ? schemaIds.itemList(url) : undefined,
            hasBreadcrumb: true,
          }),
          listsProducts &&
            itemListNode(
              url,
              products.map((product) => ({
                name: product.title,
                url: pageUrl(locale, `/product/${encodeURIComponent(product.id)}`),
              })),
            ),
        )}
      />

      <section className="bg-brand-50 border-b">
        <Container className="space-y-4 py-10 sm:py-14">
          <Breadcrumbs path={path} items={[{ name: `Sélection ${selection.name}` }]} />
          <h1 className="max-w-3xl text-3xl leading-tight font-bold tracking-tight text-balance sm:text-4xl">
            {selection.title}
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">{selection.lead}</p>
        </Container>
      </section>

      <Container className="space-y-10 py-10">
        {products.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="bg-brand-50 rounded-xl border p-8 text-center text-sm text-muted-foreground">
            Les prix de cette sélection arrivent avec la prochaine mise à jour du catalogue.
          </p>
        )}

        <p className="text-sm text-muted-foreground">
          Prix livrés les plus bas relevés sur les offres eBay livrables en France, par état. Les
          produits de la sélection sont choisis par Findlydeal, sans contrepartie des vendeurs.
        </p>

        <nav aria-label="Autres sélections" className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <span className="text-muted-foreground">Autres sélections :</span>
          {others.map((other) => (
            <LocaleLink
              key={other.slug}
              href={`/selection/${other.slug}`}
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              {other.name}
            </LocaleLink>
          ))}
        </nav>
      </Container>
    </>
  );
}
