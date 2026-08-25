import { SEARCH_PARAM_KEYS } from "@/lib/constants";

/**
 * Curated entry points of the browse menu.
 *
 * These are not extra pages: every link is a pre-filled `/search` URL that the
 * existing parser (`lib/search/params.ts`) already understands. Adding a
 * shortcut here therefore costs nothing beyond one line — and it keeps the
 * menu useful for a price comparator, where "what state" and "what budget"
 * matter as much as "what product".
 */

export interface MenuLink {
  title: string;
  href: string;
}

export interface MenuGroup {
  title: string;
  items: MenuLink[];
}

const search = (params: Record<string, string>) =>
  `/search?${new URLSearchParams(params).toString()}`;

export const browseMenuGroups: MenuGroup[] = [
  {
    title: "Bons plans",
    items: [
      {
        title: "Meilleures affaires",
        href: search({
          [SEARCH_PARAM_KEYS.sort]: "deal_score",
          [SEARCH_PARAM_KEYS.dealsOnly]: "1",
        }),
      },
      {
        title: "Prix les plus bas",
        href: search({ [SEARCH_PARAM_KEYS.sort]: "price_asc" }),
      },
      {
        title: "Tout le catalogue",
        href: "/search",
      },
    ],
  },
  {
    title: "Par état",
    items: [
      { title: "Neuf", href: search({ [SEARCH_PARAM_KEYS.condition]: "new" }) },
      {
        title: "Reconditionné",
        href: search({ [SEARCH_PARAM_KEYS.condition]: "refurbished" }),
      },
      { title: "Occasion", href: search({ [SEARCH_PARAM_KEYS.condition]: "used" }) },
    ],
  },
  {
    title: "Par budget",
    items: [
      { title: "Moins de 50 €", href: search({ [SEARCH_PARAM_KEYS.maxPrice]: "50" }) },
      {
        title: "50 € à 200 €",
        href: search({ [SEARCH_PARAM_KEYS.minPrice]: "50", [SEARCH_PARAM_KEYS.maxPrice]: "200" }),
      },
      {
        title: "200 € à 500 €",
        href: search({ [SEARCH_PARAM_KEYS.minPrice]: "200", [SEARCH_PARAM_KEYS.maxPrice]: "500" }),
      },
      { title: "Plus de 500 €", href: search({ [SEARCH_PARAM_KEYS.minPrice]: "500" }) },
    ],
  },
];
