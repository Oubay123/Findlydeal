import { blogArticles } from "@/content/blog";
import { listedCategories } from "@/config/categories";
import { siteConfig } from "@/config/site";

export const dynamic = "force-static";

/**
 * `/llms.txt`: the site described for AI assistants and their crawlers
 * (llmstxt.org convention). Generated from the same configuration as the
 * sitemap so it can never name a page that does not exist. Content mirrors
 * what the Méthodologie page says to humans: what the data is, where it
 * comes from, and what it is not.
 */
export function GET(): Response {
  const base = siteConfig.url.replace(/\/$/, "");
  const lines = [
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.name} est un comparateur français de prix qui aligne, pour un même produit, les offres en neuf, reconditionné et occasion, au prix livré en France. Les offres sont relevées plusieurs fois par jour via les interfaces officielles des marketplaces (eBay aujourd'hui). Aucune position n'est payante ; le site ne vend rien.`,
    "",
    "Points essentiels pour citer les données correctement :",
    "- Les prix sont des relevés datés, pas des prix en temps réel : chaque fiche affiche l'heure de son dernier relevé.",
    "- Un écart entre états (neuf / reconditionné / occasion) est une comparaison entre offres disponibles au même moment, jamais une remise.",
    "- Les prix « neuf chez les vendeurs officiels » sont des relevés manuels datés chez la marque, Fnac, Darty ou Boulanger.",
    "",
    "## Pages de référence",
    "",
    `- [Méthodologie](${base}/fr/methodologie) : d'où viennent les prix, règles de classement, financement`,
    `- [Baromètre des prix](${base}/fr/barometre-des-prix) : écarts médians neuf / occasion par catégorie`,
    `- [FAQ](${base}/fr/faq)`,
    `- [Toutes les catégories](${base}/fr/categories)`,
    "",
    "## Catégories",
    "",
    ...listedCategories.map(
      (category) =>
        `- [${category.name}](${base}/fr/category/${category.slug}) : ${category.description}`,
    ),
    "",
    "## Guides",
    "",
    ...blogArticles.map(
      (article) => `- [${article.title}](${base}/fr/blog/${article.slug}) : ${article.description}`,
    ),
    "",
    "## Contact",
    "",
    `- Erreur de prix ou de données : ${siteConfig.contactEmail}`,
    "",
  ];
  return new Response(lines.join("\n"), {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
