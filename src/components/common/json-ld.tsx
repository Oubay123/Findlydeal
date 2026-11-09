import type { JsonLdGraph } from "@/lib/seo/json-ld";

interface JsonLdProps {
  /** A graph built by `buildGraph()` in `@/lib/seo/json-ld`. */
  data: JsonLdGraph;
}

/**
 * Serialises structured data into the page.
 *
 * `<` is escaped so a string coming from content can never close the script
 * tag early. `undefined` values are dropped by `JSON.stringify`, which is what
 * lets the builders return optional fields without guarding each one.
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
