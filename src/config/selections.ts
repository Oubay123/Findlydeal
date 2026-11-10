/**
 * Seasonal selections: a handful of catalogue products put forward while an
 * occasion lasts (Christmas, the winter sales, back to school…). Each one has
 * its page (`/selection/[slug]`) all year round and a band on the home page
 * during its dates. Nothing here is a price or a promise: the band only
 * points to products whose prices the catalogue already shows.
 */

export type SelectionMotif = "winter" | "sales" | "school" | "summer";

export interface SeasonalSelection {
  slug: string;
  /** Short name used in links and breadcrumbs. */
  name: string;
  /** Headline of the band and the page. */
  title: string;
  /** One sentence under the headline. */
  lead: string;
  /** Inclusive dates of the band on the home page, as "MM-DD". */
  from: string;
  to: string;
  /** Catalogue slugs, shown in this order; absent or unpriced ones are skipped. */
  products: string[];
  motif: SelectionMotif;
}

export const seasonalSelections: SeasonalSelection[] = [
  {
    slug: "noel",
    name: "Noël",
    title: "Les cadeaux de Noël, au prix du reconditionné ou de l'occasion",
    lead: "Consoles, jouets, casques et appareils photo : le même produit, souvent bien moins cher qu'en neuf, livré avant le 24.",
    from: "11-01",
    to: "12-24",
    motif: "winter",
    products: [
      "nintendo-switch-2",
      "sony-playstation-5-slim-standard",
      "nintendo-switch-oled",
      "lego-star-wars-millennium-falcon-75192",
      "toniebox-coffret-de-demarrage",
      "playmobil-grand-bateau-pirate",
      "manette-sony-dualsense-ps5",
      "fujifilm-instax-mini-12",
      "apple-airpods-pro-2",
      "lunii-ma-fabrique-a-histoires",
      "strider-12-sport-draisienne",
      "lego-titanic-10294",
      "sylvanian-families-grande-maison",
      "apple-watch-se-2e-generation-44-mm",
      "amazon-kindle-paperwhite-11e-generation",
      "bose-quietcomfort-ultra",
    ],
  },
  {
    slug: "soldes-hiver",
    name: "Soldes d'hiver",
    title: "Pendant les soldes, comparez le prix barré au prix de l'occasion",
    lead: "Une remise de 30 % sur du neuf reste souvent au-dessus d'un exemplaire reconditionné. Les prix ci-dessous sont relevés aujourd'hui, pas calculés sur un prix de référence.",
    from: "01-07",
    to: "02-05",
    motif: "sales",
    products: [
      "apple-iphone-15-128-go",
      "apple-macbook-air-m2-256go",
      "dyson-v15-detect-absolute",
      "samsung-galaxy-s24-128-go",
      "sony-wh-1000xm5-noir",
      "apple-ipad-10-2022-64-go",
      "nintendo-switch-oled",
      "vorwerk-thermomix-tm6",
    ],
  },
  {
    slug: "rentree",
    name: "Rentrée",
    title: "La rentrée sans payer le neuf",
    lead: "Ordinateurs portables, tablettes, casques et cartables à roulettes : ce qui sert dix mois par an se trouve en reconditionné avec la garantie légale.",
    from: "08-15",
    to: "09-20",
    motif: "school",
    products: [
      "apple-macbook-air-m1-13-256-go",
      "apple-ipad-10-2022-64-go",
      "lenovo-thinkpad-x1-carbon-gen-9",
      "sony-wh-1000xm4",
      "amazon-kindle-paperwhite-11e-generation",
      "babyzen-yoyo2",
      "micro-maxi-deluxe-trottinette",
      "apple-watch-se-2e-generation-44-mm",
    ],
  },
  {
    slug: "ete",
    name: "Été",
    title: "L'été en seconde main",
    lead: "Appareils photo, caméras d'action, drones et vélos : du matériel qui sert quelques semaines par an, à acheter d'occasion et à revendre ensuite.",
    from: "06-01",
    to: "07-31",
    motif: "summer",
    products: [
      "gopro-hero12-black",
      "dji-mini-4-pro",
      "fujifilm-x100v",
      "sony-zv-e10",
      "insta360-x3",
      "fujifilm-instax-mini-12",
      "garmin-fenix-7",
      "dji-osmo-pocket-3",
    ],
  },
];

export function getSelection(slug: string): SeasonalSelection | undefined {
  return seasonalSelections.find((selection) => selection.slug === slug);
}

/** The selection whose dates include `date` (Paris time), if any. */
export function activeSelection(date = new Date()): SeasonalSelection | undefined {
  const key = date
    .toLocaleDateString("fr-CA", { timeZone: "Europe/Paris", month: "2-digit", day: "2-digit" })
    .slice(-5);
  return seasonalSelections.find((selection) =>
    selection.from <= selection.to
      ? key >= selection.from && key <= selection.to
      : key >= selection.from || key <= selection.to,
  );
}
