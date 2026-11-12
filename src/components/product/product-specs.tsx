import { LocaleLink } from "@/components/common/locale-link";
import { categoryGuides } from "@/config/category-guides";
import type { Category, Product, ProductSpec } from "@/types";

interface ProductSpecsProps {
  product: Product;
  category?: Category;
}

const MONTHS = "fr-FR";

/** Rows every product can answer from its identity, before the editorial ones. */
function identityRows(product: Product): ProductSpec[] {
  const rows: ProductSpec[] = [];
  if (product.subject) rows.push({ label: "Type", value: product.subject });
  if (product.brand) rows.push({ label: "Marque", value: product.brand });
  if (product.model) rows.push({ label: "Modèle", value: product.model });
  if (product.releasedAt && !product.specs?.some((spec) => /sortie/i.test(spec.label))) {
    const date = new Date(product.releasedAt);
    if (!Number.isNaN(date.getTime())) {
      rows.push({
        label: "Sortie",
        value: date.toLocaleDateString(MONTHS, { month: "long", year: "numeric" }),
      });
    }
  }
  return rows;
}

/**
 * The spec sheet, open under the product: what it is, then its editorial
 * characteristics, beside what to check before buying it second hand (the
 * category's guide). The two columns answer the two questions a visitor has
 * before scrolling to the offers: is this the exact model, and what should
 * I look at in a used one.
 */
export function ProductSpecs({ product, category }: ProductSpecsProps) {
  const editorial = (product.specs ?? []).filter(
    (spec) => !["type", "marque", "modèle"].includes(spec.label.toLowerCase()),
  );
  const rows = [...identityRows(product), ...editorial];
  const guide = category ? categoryGuides[category.slug] : undefined;
  const checks = guide?.checks.slice(0, 4) ?? [];
  if (rows.length === 0 && checks.length === 0) return null;

  return (
    <section aria-labelledby="specs" className="grid gap-8 lg:grid-cols-[3fr_2fr] lg:gap-12">
      {rows.length > 0 ? (
        <div className="space-y-4">
          <h2 id="specs" className="text-xl font-semibold">
            Fiche technique
          </h2>
          <dl className="divide-y border-y">
            {rows.map((spec) => (
              <div key={spec.label} className="grid gap-1 py-3 sm:grid-cols-[11rem_1fr] sm:gap-4">
                <dt className="text-sm text-muted-foreground">{spec.label}</dt>
                <dd className="text-sm font-medium">{spec.value}</dd>
              </div>
            ))}
          </dl>
          {product.offers.some((offer) => offer.source === "ebay") ? (
            <p className="text-xs text-muted-foreground">
              Chaque annonce décrit son propre exemplaire : capacité, couleur ou accessoires peuvent
              différer de cette fiche. Vérifiez le titre de l&apos;offre avant d&apos;acheter.
            </p>
          ) : null}
        </div>
      ) : null}

      {checks.length > 0 && category ? (
        <aside aria-labelledby="specs-checks" className="space-y-4">
          <h2 id="specs-checks" className="text-xl font-semibold">
            Avant d&apos;acheter d&apos;occasion
          </h2>
          <ul className="space-y-3">
            {checks.map((check) => (
              <li key={check.title} className="text-sm">
                <p className="font-medium">{check.title}</p>
                <p className="text-muted-foreground">{check.detail}</p>
              </li>
            ))}
          </ul>
          <p className="text-sm">
            <LocaleLink
              href={`/category/${category.slug}#guide-${category.slug}`}
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Le guide complet, {category.name}
            </LocaleLink>
          </p>
        </aside>
      ) : null}
    </section>
  );
}
