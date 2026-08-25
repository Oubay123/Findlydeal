import { unsplash } from "@/lib/utils/images";
import type { Category, CategorySlug } from "@/types";

/**
 * Declarative catalogue of the categories Findlydeal covers.
 *
 * Adding a category = adding an entry here + adding its slug to `CategorySlug`
 * in `@/types` + mapping its icon in `CategoryCard`. The dynamic route
 * `/category/[slug]`, the header menu and the footer pick it up automatically.
 *
 * `image` is what the tile shows; the `icon` is the fallback when no photo is
 * set. To use your own asset, drop a file in `public/images/` and replace the
 * `unsplash(...)` call with `"/images/<file>"`.
 */
export const categories: Category[] = [
  {
    slug: "tech",
    name: "Tech & Électronique",
    description: "Smartphones, ordinateurs, consoles et accessoires.",
    icon: "Smartphone",
    image: unsplash("photo-1531297484001-80022131f5a1", 700),
    sources: ["ebay", "backmarket"],
  },
  {
    slug: "home-appliances",
    name: "Électroménager",
    description: "Gros et petit électroménager pour toute la maison.",
    icon: "WashingMachine",
    image: unsplash("photo-1584622650111-993a426fbf0a", 700),
    sources: ["ebay"],
  },
  {
    slug: "furniture",
    name: "Meubles & Déco",
    description: "Canapés, tables, rangements et décoration.",
    icon: "Armchair",
    image: unsplash("photo-1567016432779-094069958ea5", 700),
    sources: ["wayfair"],
  },
  {
    slug: "watches-jewelry",
    name: "Montres & Bijoux",
    description: "Montres connectées, montres classiques et bijoux.",
    icon: "Watch",
    image: unsplash("photo-1523275335684-37898b6baf30", 700),
    sources: ["ebay", "creationwatches"],
  },
  {
    slug: "refurbished",
    name: "Reconditionné",
    description: "Du matériel remis à neuf, garanti, à prix réduit.",
    icon: "RefreshCcw",
    image: unsplash("photo-1588508065123-287b28e013da", 700),
    sources: ["backmarket"],
  },
  {
    slug: "fashion",
    name: "Mode",
    description: "Vêtements, chaussures et accessoires.",
    icon: "Shirt",
    image: unsplash("photo-1523381210434-271e8be1f52b", 700),
    sources: ["ebay"],
  },
  {
    slug: "second-hand",
    name: "Occasion",
    description: "Les bonnes affaires de seconde main, toutes catégories.",
    icon: "Recycle",
    image: unsplash("photo-1556742049-0cfed4f6a45d", 700),
    sources: ["ebay", "backmarket"],
  },
  {
    slug: "leisure",
    name: "Loisirs",
    description: "Sport, jeux, instruments et matériel de plein air.",
    icon: "Bike",
    image: unsplash("photo-1571068316344-75bc76f77890", 700),
    sources: ["ebay"],
  },
];

/** O(1) lookup used by the `/category/[slug]` route. */
const categoriesBySlug = new Map<string, Category>(categories.map((c) => [c.slug, c]));

export function getCategoryBySlug(slug: string): Category | undefined {
  return categoriesBySlug.get(slug);
}

export function getCategorySlugs(): CategorySlug[] {
  return categories.map((category) => category.slug);
}
