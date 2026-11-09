import { unsplash } from "@/lib/utils/images";
import type { Category, CategorySlug } from "@/types";

/**
 * Declarative catalogue of the categories Findlydeal covers.
 *
 * Adding a category = adding an entry here + adding its slug to `CategorySlug`
 * in `@/types` + mapping its icon in `CategoryCard`. The dynamic route
 * `/category/[slug]`, the header menu and the footer pick it up automatically.
 *
 * `image` is what the tile shows; `icon` is a Lucide name used by the header
 * menus. To use your own asset, drop a file in `public/images/` and replace the
 * `unsplash(...)` call with `"/images/<file>"`.
 */
export const categories: Category[] = [
  {
    slug: "tech",
    seoTitle: "Tech et électronique : prix neuf, reconditionné, occasion",
    name: "Tech & Électronique",
    description: "Smartphones, ordinateurs, consoles et accessoires.",
    metaDescription:
      "Comparez les prix des smartphones, ordinateurs, consoles et casques entre de nombreux vendeurs : neuf, reconditionné et occasion, bonnes affaires signalées.",
    icon: "Smartphone",
    image: unsplash("photo-1531297484001-80022131f5a1", 700),
    sources: ["ebay", "backmarket"],
  },
  {
    slug: "home-appliances",
    seoTitle: "Électroménager : comparer les prix neuf et reconditionné",
    name: "Électroménager",
    description: "Gros et petit électroménager pour toute la maison.",
    metaDescription:
      "Comparez les prix de l'électroménager entre de nombreux vendeurs : aspirateurs, machines à café et petit électroménager, avec les bonnes affaires signalées.",
    icon: "WashingMachine",
    image: unsplash("photo-1556909212-d5b604d0c90d", 700),
    sources: ["ebay"],
  },
  {
    slug: "furniture",
    seoTitle: "Meubles et déco : comparer les prix neuf et occasion",
    name: "Meubles & Déco",
    description: "Canapés, tables, rangements et décoration.",
    metaDescription:
      "Comparez les prix des meubles et de la déco entre de nombreux vendeurs : canapés, chaises, luminaires et rangements, avec les bonnes affaires signalées.",
    icon: "Armchair",
    image: unsplash("photo-1567016432779-094069958ea5", 700),
    sources: ["wayfair"],
  },
  {
    slug: "watches-jewelry",
    seoTitle: "Montres et bijoux : comparer les prix neuf et occasion",
    name: "Montres & Bijoux",
    description: "Montres connectées, montres classiques et bijoux.",
    metaDescription:
      "Comparez les prix des montres et bijoux entre de nombreux vendeurs : montres automatiques, chronographes, montres connectées et bijoux en argent ou plaqué or.",
    icon: "Watch",
    image: unsplash("photo-1509941943102-10c232535736", 700),
    sources: ["ebay", "creationwatches"],
  },
  {
    slug: "refurbished",
    seoTitle: "Reconditionné : comparer les prix et les garanties",
    name: "Reconditionné",
    description: "Du matériel testé, remis en état et garanti, à prix réduit.",
    metaDescription:
      "Comparez les prix du matériel reconditionné entre de nombreux vendeurs : smartphones, ordinateurs et montres remis en état et vendus moins cher que le neuf.",
    icon: "RefreshCcw",
    image: unsplash("photo-1588508065123-287b28e013da", 700),
    sources: ["backmarket"],
  },
  {
    slug: "fashion",
    seoTitle: "Mode : comparer les prix du neuf et de la seconde main",
    name: "Mode",
    description: "Vêtements, chaussures et accessoires.",
    metaDescription:
      "Comparez les prix de la mode entre de nombreux vendeurs : vêtements, chaussures et accessoires, en neuf comme en seconde main, avec les bonnes affaires signalées.",
    icon: "Shirt",
    image: unsplash("photo-1523381210434-271e8be1f52b", 700),
    sources: ["ebay"],
  },
  {
    slug: "second-hand",
    seoTitle: "Occasion : comparer les prix de la seconde main",
    name: "Occasion",
    description: "Les bonnes affaires de seconde main, toutes catégories.",
    metaDescription:
      "Comparez les prix des produits d'occasion entre de nombreux vendeurs : tech, mobilier, montres et mode de seconde main, avec les bonnes affaires signalées.",
    icon: "Recycle",
    image: unsplash("photo-1556742049-0cfed4f6a45d", 700),
    sources: ["ebay", "backmarket"],
  },
  {
    slug: "leisure",
    seoTitle: "Loisirs : comparer les prix neuf et occasion",
    name: "Loisirs",
    description: "Sport, jeux, instruments et matériel de plein air.",
    metaDescription:
      "Comparez les prix des articles de loisirs entre de nombreux vendeurs : vélos, instruments de musique et matériel de plein air, bonnes affaires signalées.",
    icon: "Bike",
    image: unsplash("photo-1461896836934-ffe607ba8211", 700),
    sources: ["ebay"],
  },
];

/**
 * Categories advertised in the menus, the footer and the category grids: the
 * ones the live catalogue (`src/config/catalogue-ebay.ts`) covers, plus the
 * two transversal ones (by condition). Furniture, fashion and leisure have no
 * real product yet: their pages stay reachable (and `noindex` while empty) but
 * are not advertised. Add a slug back here when its products arrive.
 */
const LISTED_CATEGORY_SLUGS: readonly CategorySlug[] = [
  "tech",
  "home-appliances",
  "watches-jewelry",
  "refurbished",
  "second-hand",
];

export const listedCategories: Category[] = categories.filter((category) =>
  LISTED_CATEGORY_SLUGS.includes(category.slug),
);

/** O(1) lookup used by the `/category/[slug]` route. */
const categoriesBySlug = new Map<string, Category>(categories.map((c) => [c.slug, c]));

export function getCategoryBySlug(slug: string): Category | undefined {
  return categoriesBySlug.get(slug);
}

export function getCategorySlugs(): CategorySlug[] {
  return categories.map((category) => category.slug);
}
