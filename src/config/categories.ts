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
    name: "Tech & Électronique",
    description: "Smartphones, ordinateurs, consoles et accessoires.",
    metaDescription:
      "Comparez les prix des smartphones, ordinateurs, consoles et casques sur plusieurs marketplaces à la fois : neuf, reconditionné et occasion, remises vérifiées.",
    icon: "Smartphone",
    image: unsplash("photo-1531297484001-80022131f5a1", 700),
    sources: ["ebay", "backmarket"],
  },
  {
    slug: "home-appliances",
    name: "Électroménager",
    description: "Gros et petit électroménager pour toute la maison.",
    metaDescription:
      "Comparez les prix de l'électroménager sur plusieurs marketplaces : aspirateurs, machines à café et petit électroménager, avec les vraies remises signalées.",
    icon: "WashingMachine",
    image: unsplash("photo-1556909212-d5b604d0c90d", 700),
    sources: ["ebay"],
  },
  {
    slug: "furniture",
    name: "Meubles & Déco",
    description: "Canapés, tables, rangements et décoration.",
    metaDescription:
      "Comparez les prix des meubles et de la déco sur plusieurs marketplaces : canapés, chaises, luminaires et rangements, avec les vraies remises signalées.",
    icon: "Armchair",
    image: unsplash("photo-1567016432779-094069958ea5", 700),
    sources: ["wayfair"],
  },
  {
    slug: "watches-jewelry",
    name: "Montres & Bijoux",
    description: "Montres connectées, montres classiques et bijoux.",
    metaDescription:
      "Comparez les prix des montres et bijoux sur plusieurs marketplaces : montres automatiques, chronographes, montres connectées et bijoux en argent ou plaqué or.",
    icon: "Watch",
    image: unsplash("photo-1509941943102-10c232535736", 700),
    sources: ["ebay", "creationwatches"],
  },
  {
    slug: "refurbished",
    name: "Reconditionné",
    description: "Du matériel remis à neuf, garanti, à prix réduit.",
    metaDescription:
      "Comparez les prix du matériel reconditionné sur plusieurs marketplaces : smartphones, ordinateurs et montres remis à neuf, garantis et vendus à prix réduit.",
    icon: "RefreshCcw",
    image: unsplash("photo-1588508065123-287b28e013da", 700),
    sources: ["backmarket"],
  },
  {
    slug: "fashion",
    name: "Mode",
    description: "Vêtements, chaussures et accessoires.",
    metaDescription:
      "Comparez les prix de la mode sur plusieurs marketplaces : vêtements, chaussures et accessoires, en neuf comme en seconde main, avec les remises vérifiées.",
    icon: "Shirt",
    image: unsplash("photo-1523381210434-271e8be1f52b", 700),
    sources: ["ebay"],
  },
  {
    slug: "second-hand",
    name: "Occasion",
    description: "Les bonnes affaires de seconde main, toutes catégories.",
    metaDescription:
      "Comparez les prix des produits d'occasion sur plusieurs marketplaces : tech, mobilier, montres et mode de seconde main, avec les vraies remises signalées.",
    icon: "Recycle",
    image: unsplash("photo-1556742049-0cfed4f6a45d", 700),
    sources: ["ebay", "backmarket"],
  },
  {
    slug: "leisure",
    name: "Loisirs",
    description: "Sport, jeux, instruments et matériel de plein air.",
    metaDescription:
      "Comparez les prix des articles de loisirs sur plusieurs marketplaces : vélos, instruments de musique et matériel de plein air, remises vérifiées à l'appui.",
    icon: "Bike",
    image: unsplash("photo-1461896836934-ffe607ba8211", 700),
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
