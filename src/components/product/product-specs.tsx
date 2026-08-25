import { CollapsibleSection } from "@/components/common/collapsible-section";
import type { ProductSpec } from "@/types";

interface ProductSpecsProps {
  specs: ProductSpec[];
}

/** Spec sheet as a definition list, folded into a disclosure section. */
export function ProductSpecs({ specs }: ProductSpecsProps) {
  if (specs.length === 0) return null;

  return (
    <CollapsibleSection
      title="Fiche technique"
      meta={
        <span className="text-sm font-normal text-muted-foreground">
          {specs.length} caractéristiques
        </span>
      }
    >
      <dl className="overflow-hidden rounded-xl border">
        {specs.map((spec, index) => (
          <div
            key={spec.label}
            className={`grid gap-1 px-5 py-3.5 sm:grid-cols-[13rem_1fr] sm:gap-4 ${
              index % 2 === 1 ? "bg-cream" : "bg-white"
            }`}
          >
            <dt className="text-sm text-muted-foreground">{spec.label}</dt>
            <dd className="text-sm font-medium">{spec.value}</dd>
          </div>
        ))}
      </dl>
    </CollapsibleSection>
  );
}
