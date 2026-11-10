#!/usr/bin/env node
/**
 * Catalogue consistency: `npm run check:catalogue`.
 *
 * Builds the catalogue configuration with esbuild and checks that every
 * product has an editorial sheet (description, and specs for the extended
 * entries), that every rule matches its own title, that content entries do
 * not point at unknown slugs, and that buckets stay within the subrequest
 * budget of a Worker refresh.
 */
import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const dir = mkdtempSync(join(tmpdir(), "fd-catalogue-"));
const entry = join(dir, "entry.ts");
// The bundle must live inside the repo so externals resolve from node_modules.
const out = join(root, ".check-catalogue.tmp.cjs");

writeFileSync(
  entry,
  `
  export { catalogueEbayEntries } from "@/config/catalogue-ebay";
  export { catalogueContent } from "@/config/catalogue/content";
  export { catalogueSeeds } from "@/lib/mock";
  export { matchesEntry } from "@/lib/catalogue";
  export { bucketOf, BUCKET_COUNT } from "@/lib/catalogue/store";
  `,
);
execFileSync(
  join(root, "node_modules", ".bin", "esbuild"),
  [
    entry,
    "--bundle",
    "--platform=node",
    `--tsconfig=${join(root, "tsconfig.json")}`,
    `--outfile=${out}`,
    "--log-level=error",
    "--external:@opennextjs/cloudflare",
  ],
  { cwd: root },
);
const {
  catalogueEbayEntries,
  catalogueContent,
  catalogueSeeds,
  matchesEntry,
  bucketOf,
  BUCKET_COUNT,
} = await import(pathToFileURL(out).href);
rmSync(dir, { recursive: true, force: true });
rmSync(out, { force: true });

const errors = [];
const seeded = new Set(catalogueSeeds.map((seed) => seed.slug));
const known = new Set(catalogueEbayEntries.map((entry) => entry.slug));

for (const entry of catalogueEbayEntries) {
  const content = catalogueContent[entry.slug];
  if (!seeded.has(entry.slug)) {
    if (!content) errors.push(`${entry.slug}: aucune fiche éditoriale (description)`);
    else {
      if (content.description.length < 80) errors.push(`${entry.slug}: description trop courte`);
      if (!content.specs?.length) errors.push(`${entry.slug}: aucune caractéristique (specs)`);
    }
  }
  // The product's own name must pass its rules: the extended catalogue's
  // title, else the described catalogue's, else the query.
  const seedTitle = catalogueSeeds.find((seed) => seed.slug === entry.slug)?.title;
  const titles = [entry.title, seedTitle, entry.query].filter(Boolean);
  if (!titles.some((title) => matchesEntry(title, entry))) {
    errors.push(`${entry.slug}: les règles ne reconnaissent pas son propre titre`);
  }
}
for (const slug of Object.keys(catalogueContent)) {
  if (!known.has(slug)) errors.push(`content/${slug}: ne correspond à aucun produit du catalogue`);
}

const sizes = Array.from({ length: BUCKET_COUNT }, () => 0);
for (const entry of catalogueEbayEntries) sizes[bucketOf(entry.slug)]++;
const max = Math.max(...sizes);
if (max > 30) errors.push(`un lot compte ${max} produits : au-delà de 30, augmenter BUCKET_COUNT`);

if (errors.length > 0) {
  console.error(errors.map((error) => `  - ${error}`).join("\n"));
  process.exit(1);
}
console.log(
  `${catalogueEbayEntries.length} produits : fiches éditoriales, règles et lots (max ${max}/lot) cohérents.`,
);
