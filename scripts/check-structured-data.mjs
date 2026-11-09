#!/usr/bin/env node
/**
 * Structured data check.
 *
 * - `npm run check:schema` reads every prerendered page in `.next/server/app`
 *   after `next build`;
 * - `npm run check:schema -- --base https://findlydeal.com` (or a local
 *   server) fetches every URL of the live sitemap instead, which covers the
 *   pages rendered on demand (products, categories) with their real data.
 *
 * Each page's JSON-LD is checked against `src/lib/seo/schema/profile.json`,
 * the same profile the builders in `src/lib/seo/json-ld.ts` follow:
 *
 * - every block parses as JSON and declares the schema.org context;
 * - every typed node has the properties the profile marks as required, and
 *   none of the forbidden ones (no Review / AggregateRating, no SearchAction);
 * - every `{ "@id": … }` reference resolves to a node present on the page, so
 *   the graph has no dangling links;
 * - every URL listed in the sitemap is a page that does not say `noindex`.
 *
 * Exit code 1 on any error. No dependency: Node 20+ only.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const appDir = join(root, ".next", "server", "app");
const profile = JSON.parse(
  readFileSync(join(root, "src", "lib", "seo", "schema", "profile.json"), "utf8"),
);

const baseArg = process.argv.indexOf("--base");
const base = baseArg > -1 ? process.argv[baseArg + 1]?.replace(/\/$/, "") : undefined;

if (!base && !existsSync(appDir)) {
  console.error("No build found in .next/server/app: run `npm run build` first.");
  process.exit(1);
}

/** Required / forbidden lists of a type, following `extends`. */
function rulesFor(type) {
  const own = profile.types[type];
  if (!own) return undefined;
  const parent = own.extends ? rulesFor(own.extends) : { required: [], forbidden: [] };
  return {
    required: [...new Set([...(parent.required ?? []), ...(own.required ?? [])])],
    forbidden: [...new Set([...(parent.forbidden ?? []), ...(own.forbidden ?? [])])],
  };
}

function htmlFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return htmlFiles(path);
    return entry.name.endsWith(".html") ? [path] : [];
  });
}

const isNoindex = (html) => /<meta[^>]+name="robots"[^>]+content="[^"]*noindex/i.test(html);

/** Walks a JSON-LD value, calling `visit` on every object with its parent key. */
function walk(value, visit, key = null) {
  if (Array.isArray(value)) value.forEach((item) => walk(item, visit, key));
  else if (value && typeof value === "object") {
    visit(value, key);
    for (const [childKey, child] of Object.entries(value)) walk(child, visit, childKey);
  }
}

const errors = [];
const summary = [];

function checkPage(page, html) {
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)];
  if (blocks.length === 0) return;

  const nodes = [];
  for (const [, raw] of blocks) {
    let data;
    try {
      data = JSON.parse(raw);
    } catch (error) {
      errors.push(`${page}: JSON-LD invalide (${error.message})`);
      continue;
    }
    if (data["@context"] !== profile.context) {
      errors.push(`${page}: @context attendu ${profile.context}`);
    }
    walk(data, (node) => nodes.push(node));
  }

  const ids = new Set(nodes.filter((node) => node["@id"] && node["@type"]).map((n) => n["@id"]));
  const types = new Map();

  for (const node of nodes) {
    const keys = Object.keys(node);
    // A bare reference: must point at a node defined on this page.
    if (keys.length === 1 && keys[0] === "@id") {
      if (!ids.has(node["@id"])) errors.push(`${page}: référence sans cible ${node["@id"]}`);
      continue;
    }
    const type = node["@type"];
    if (!type) continue;
    types.set(type, (types.get(type) ?? 0) + 1);

    const rules = rulesFor(type);
    if (!rules) continue;
    // An anonymous organization is a seller or a brand owner, described by
    // its name only; the profile's Organization rules are for the site itself.
    if (type === "Organization" && !node["@id"]) {
      if (!node.name) errors.push(`${page}: Organization sans nom`);
      continue;
    }
    for (const property of rules.required) {
      if (node[property] === undefined) {
        errors.push(`${page}: ${type} sans « ${property} » (requis par le profil)`);
      }
    }
    for (const property of rules.forbidden) {
      if (node[property] !== undefined) {
        errors.push(`${page}: ${type} porte « ${property} », interdit par le profil`);
      }
    }
  }

  summary.push({
    page,
    noindex: isNoindex(html),
    types: [...types.entries()].map(([type, count]) => `${type}×${count}`).join(", "),
  });
}

if (base) {
  // Live mode: every page listed in the sitemap, as served right now.
  const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
  const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(([, loc]) => new URL(loc).pathname);
  for (const path of urls) {
    const response = await fetch(`${base}${path}`, { redirect: "manual" });
    if (response.status !== 200) {
      errors.push(`sitemap: ${path} répond ${response.status}`);
      continue;
    }
    const html = await response.text();
    if (isNoindex(html)) errors.push(`sitemap: ${path} est listé mais porte noindex`);
    checkPage(path, html);
  }
  summary.push({ page: "(sitemap)", noindex: false, types: `${urls.length} URL` });
} else {
  for (const file of htmlFiles(appDir)) {
    const page =
      "/" +
      relative(appDir, file)
        .split(sep)
        .join("/")
        .replace(/\.html$/, "");
    checkPage(page, readFileSync(file, "utf8"));
  }

  // The sitemap must only list indexable pages.
  const sitemapFile = join(appDir, "sitemap.xml.body");
  if (existsSync(sitemapFile)) {
    const urls = [...readFileSync(sitemapFile, "utf8").matchAll(/<loc>(.*?)<\/loc>/g)].map(
      ([, loc]) => new URL(loc).pathname,
    );
    for (const path of urls) {
      const file = join(appDir, `${path}.html`);
      if (!existsSync(file)) continue; // rendered on demand: use --base to check it
      if (isNoindex(readFileSync(file, "utf8"))) {
        errors.push(`sitemap: ${path} est listé mais porte noindex`);
      }
    }
    summary.push({ page: "(sitemap)", noindex: false, types: `${urls.length} URL` });
  }
}

for (const row of summary.sort((a, b) => a.page.localeCompare(b.page))) {
  console.log(`${row.noindex ? "noindex " : "        "}${row.page.padEnd(58)} ${row.types}`);
}

if (errors.length > 0) {
  console.error(`\n${errors.length} erreur(s) :`);
  for (const error of errors) console.error(`  - ${error}`);
  process.exit(1);
}
console.log(`\nDonnées structurées conformes au profil ${profile.version}.`);
