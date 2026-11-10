#!/usr/bin/env node
/**
 * Blog consistency check: `npm run check:blog`.
 *
 * - `meta.outline` lists the article's `## ` headings, in order (it feeds the
 *   table of contents, so a drift means dead anchors);
 * - every article declares at least one source;
 * - internal links point at an article or a page that exists.
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const dir = join(fileURLToPath(new URL(".", import.meta.url)), "..", "src", "content", "blog");
const files = readdirSync(dir).filter((file) => file.endsWith(".mdx"));
const slugs = new Set(files.map((file) => file.replace(/\.mdx$/, "")));
const errors = [];

for (const file of files) {
  const source = readFileSync(join(dir, file), "utf8");
  const headings = [...source.matchAll(/^## (.+)$/gm)].map(([, text]) =>
    text.replace(/\*\*/g, "").trim(),
  );
  const outlineBlock = /outline: \[([\s\S]*?)\n {2}\],/.exec(source)?.[1] ?? "";
  const outline = [...outlineBlock.matchAll(/"((?:[^"\\]|\\.)*)"/g)].map(([, text]) =>
    JSON.parse(`"${text}"`),
  );
  if (JSON.stringify(outline) !== JSON.stringify(headings)) {
    errors.push(`${file}: meta.outline ne correspond pas aux titres « ## » de l'article`);
  }
  if (!/sources: \[\s*\{/.test(source)) errors.push(`${file}: aucune source déclarée`);
  for (const [, slug] of source.matchAll(/\]\(\/blog\/([a-z0-9-]+)\)/g)) {
    if (!slugs.has(slug)) errors.push(`${file}: lien vers un article inexistant (${slug})`);
  }
}

if (errors.length > 0) {
  console.error(errors.map((error) => `  - ${error}`).join("\n"));
  process.exit(1);
}
console.log(`${files.length} articles vérifiés : sommaires, sources et liens internes cohérents.`);
