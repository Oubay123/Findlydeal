import type { Category, CategorySlug } from "@/types";

/**
 * Declarative catalogue of the categories Findlydeal covers.
 *
 * Adding a category = adding an entry here + adding its slug to `CategorySlug`
 * in `@/types` + mapping its icon in `CategoryCard`. The dynamic route
 * `/category/[slug]`, the header menu and the footer pick it up automatically.
 *
 * `icon` is a Lucide name, resolved by `CategoryCard`, which draws the tile.
 * Categories carry no photo: a stock shot of a generic scene said nothing the
 * label did not already say, and cost an image download on the landing page.
 */
export const categories: Category[] = [
  {
    slug: "tech",
    name: "Tech & Électronique",
    description: "Smartphones, ordinateurs, consoles et accessoires.",
    metaDescription:
      "Comparez les prix des smartphones, ordinateurs, consoles et casques sur plusieurs marketplaces à la fois : neuf, reconditionné et occasion, remises vérifiées.",
    icon: "Smartphone",
    sources: ["ebay", "backmarket"],
  },
  {
    slug: "home-appliances",
    name: "Électroménager",
    description: "Gros et petit électroménager pour toute la maison.",
    metaDescription:
      "Comparez les prix de l'électroménager sur plusieurs marketplaces : aspirateurs, machines à café et petit électroménager, avec les vraies remises signalées.",
    icon: "WashingMachine",
    sources: ["ebay"],
  },
  {
    slug: "furniture",
    name: "Meubles & Déco",
    description: "Canapés, tables, rangements et décoration.",
    metaDescription:
      "Comparez les prix des meubles et de la déco sur plusieurs marketplaces : canapés, chaises, luminaires et rangements, avec les vraies remises signalées.",
    icon: "Armchair",
    sources: ["wayfair"],
  },
  {
    slug: "watches-jewelry",
    name: "Montres & Bijoux",
    description: "Montres connectées, montres classiques et bijoux.",
    metaDescription:
      "Comparez les prix des montres et bijoux sur plusieurs marketplaces : montres automatiques, chronographes, montres connectées et bijoux en argent ou plaqué or.",
    icon: "Watch",
    sources: ["ebay", "creationwatches"],
  },
  {
    slug: "refurbished",
    name: "Reconditionné",
    description: "Du matériel remis à neuf, garanti, à prix réduit.",
    metaDescription:
      "Comparez les prix du matériel reconditionné sur plusieurs marketplaces : smartphones, ordinateurs et montres remis à neuf, garantis et vendus à prix réduit.",
    icon: "RefreshCcw",
    sources: ["backmarket"],
  },
  {
    slug: "fashion",
    name: "Mode",
    description: "Vêtements, chaussures et accessoires.",
    metaDescription:
      "Comparez les prix de la mode sur plusieurs marketplaces : vêtements, chaussures et accessoires, en neuf comme en seconde main, avec les remises vérifiées.",
    icon: "Shirt",
    sources: ["ebay"],
  },
  {
    slug: "second-hand",
    name: "Occasion",
    description: "Les bonnes affaires de seconde main, toutes catégories.",
    metaDescription:
      "Comparez les prix des produits d'occasion sur plusieurs marketplaces : tech, mobilier, montres et mode de seconde main, avec les vraies remises signalées.",
    icon: "Recycle",
    sources: ["ebay", "backmarket"],
  },
  {
    slug: "leisure",
    name: "Loisirs",
    description: "Sport, jeux, instruments et matériel de plein air.",
    metaDescription:
      "Comparez les prix des articles de loisirs sur plusieurs marketplaces : vélos, instruments de musique et matériel de plein air, remises vérifiées à l'appui.",
    icon: "Bike",
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
