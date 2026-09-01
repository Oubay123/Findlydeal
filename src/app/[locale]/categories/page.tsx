import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { Container } from "@/components/common/container";
import { SectionTitle } from "@/components/common/section-title";
import { CategoryGrid } from "@/components/category/category-grid";
import { getDictionary, type UiLocale } from "@/i18n";
import { localeAlternates } from "@/lib/seo/locale";

/**
 * The full list of categories.
 *
 * The landing page shelves three of them and links here for the rest, so this
 * page is the one place where all eight are laid out. It also gives the
 * category grid a home: it used to sit on the landing page, where it competed
 * with the product shelves for the same job.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: UiLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Toutes les catégories",
    description:
      "Toutes les catégories comparées par Findlydeal : tech, électroménager, meubles, montres et bijoux, mode, loisirs, reconditionné et occasion, sur plusieurs marketplaces.",
    alternates: localeAlternates(locale, "/categories"),
  };
}

export default async function CategoriesPage({
  params,
}: {
  params: Promise<{ locale: UiLocale }>;
}) {
  const { locale } = await params;
  const t = getDictionary(locale);

  return (
    <Container className="max-w-5xl space-y-8 py-16">
      <Breadcrumbs items={[{ name: t.nav.categories }]} />

      <SectionTitle
        as="h1"
        title="Toutes les catégories"
        description="Chaque univers renvoie vers les offres comparées sur plusieurs plateformes, en neuf, reconditionné et occasion."
      />

      <CategoryGrid />
    </Container>
  );
}
