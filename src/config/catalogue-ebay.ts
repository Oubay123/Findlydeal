/**
 * Which catalogue products get live eBay offers, and how to find them.
 *
 * A catalogue product (`src/lib/mock/catalog/`) is a model we describe: its
 * title, specs, release date. Once eBay is configured, its offers come from
 * the eBay listings matched below instead of the demonstration prices.
 *
 * Matching is deliberately strict, because a wrong match is worse than a
 * missing one: an "iPhone 13 Pro" or a phone case listed under an iPhone 13
 * would corrupt the median and the deal badges.
 *
 * - `query`: the keywords sent to eBay.
 * - `require`: every group must match, through at least one of its
 *   alternatives, in the listing title (case, accents and punctuation
 *   ignored: "GA-2100" matches "ga2100").
 * - `exclude`: whole words or phrases that disqualify a listing, on top of
 *   `GLOBAL_EXCLUDED_WORDS` (broken, locked or counterfeit items).
 * - `minPrice`: euros; below it, a listing is an accessory or a scam.
 * - `maxPrice`: euros, about 1.5 times the new retail price; above it, a
 *   listing is a bundle, a lot, another model or a speculative price.
 * - `description`: replaces the catalogue text when that text describes a
 *   specific offer (a grade, a battery level) rather than the model.
 *
 * Products of the demonstration catalogue that are not listed here are
 * invented examples (sofas, jewellery, a bike…): they have no eBay
 * equivalent and stop being shown when eBay is live.
 */

export interface CatalogueEbayEntry {
  slug: string;
  query: string;
  require: string[][];
  exclude?: string[];
  minPrice: number;
  maxPrice: number;
  description?: string;
}

/**
 * Words or phrases that mark a broken, locked or counterfeit item. Accessories
 * ("coque", "chargeur") are not listed: many genuine listings mention one
 * offered with the device, and `minPrice` already keeps accessories out.
 */
export const GLOBAL_EXCLUDED_WORDS = [
  "pour pieces",
  "piece",
  "pieces",
  "hs",
  "hors service",
  "en panne",
  "defectueux",
  "defectueuse",
  "casse",
  "cassee",
  "bloque",
  "bloquee",
  "icloud",
  "replique",
  "replica",
  "boite vide",
  "carte mere",
  "lot de",
];

export const catalogueEbayEntries: CatalogueEbayEntry[] = [
  // --- Tech ---------------------------------------------------------------
  {
    slug: "apple-iphone-13-128go-minuit",
    query: "iPhone 13 128 Go",
    require: [["iphone 13"], ["128"]],
    exclude: ["mini", "pro", "max"],
    minPrice: 150,
    maxPrice: 700,
    description:
      "L'iPhone 13 conserve la puce A15 Bionic, largement suffisante pour tous les usages actuels, et une autonomie nettement supérieure à celle du 12. Son double capteur 12 Mpx avec stabilisation par décalage du capteur reste une référence en photo de nuit.",
  },
  {
    slug: "samsung-galaxy-s23-256go-noir",
    query: "Samsung Galaxy S23 256 Go",
    require: [["s23"], ["256"]],
    exclude: ["ultra", "plus", "fe"],
    minPrice: 200,
    maxPrice: 800,
  },
  {
    slug: "google-pixel-8-128go-obsidienne",
    query: "Google Pixel 8 128 Go",
    require: [["pixel 8"], ["128"]],
    exclude: ["pro", "8a"],
    minPrice: 150,
    maxPrice: 700,
  },
  {
    slug: "apple-macbook-air-m2-256go",
    query: "MacBook Air M2 13 256 Go",
    require: [["macbook air"], ["m2"], ["256"]],
    exclude: ["15", "15 pouces"],
    minPrice: 450,
    maxPrice: 1400,
  },
  {
    slug: "dell-xps-13-plus-i7-512go",
    query: "Dell XPS 13 Plus i7 512",
    require: [["xps 13 plus", "xps 9320"]],
    minPrice: 350,
    maxPrice: 1900,
  },
  {
    slug: "apple-ipad-air-m1-64go",
    query: "iPad Air M1 64 Go",
    require: [["ipad air"], ["m1", "5e generation", "5eme generation", "5th"], ["64"]],
    minPrice: 200,
    maxPrice: 750,
  },
  {
    slug: "sony-wh-1000xm5-noir",
    query: "Sony WH-1000XM5",
    require: [["1000xm5"]],
    exclude: ["xm4", "xm6", "coussinet", "coussinets", "oreillette"],
    minPrice: 120,
    maxPrice: 450,
  },
  {
    slug: "bose-quietcomfort-ultra",
    query: "Bose QuietComfort Ultra casque",
    require: [["quietcomfort ultra", "qc ultra"]],
    exclude: ["earbuds", "ecouteurs"],
    minPrice: 150,
    maxPrice: 550,
  },
  {
    slug: "sony-playstation-5-slim-standard",
    query: "PS5 Slim standard lecteur",
    require: [["ps5", "playstation 5"], ["slim"]],
    exclude: ["digital", "digitale", "pro", "manette", "jeu"],
    minPrice: 250,
    maxPrice: 700,
  },
  {
    slug: "xbox-series-x-1to",
    query: "Xbox Series X 1 To",
    require: [["series x"]],
    exclude: ["manette", "jeu"],
    minPrice: 250,
    maxPrice: 800,
  },
  // --- Montres ------------------------------------------------------------
  {
    slug: "seiko-5-sports-srpd-automatique",
    query: "Seiko SRPD55K1",
    require: [["srpd55"]],
    minPrice: 120,
    maxPrice: 450,
  },
  {
    slug: "tissot-prx-powermatic-80",
    query: "Tissot PRX Powermatic 80 40 mm bleu",
    require: [["prx"], ["powermatic"]],
    exclude: ["35", "35mm"],
    minPrice: 300,
    maxPrice: 900,
  },
  {
    slug: "apple-watch-series-9-45mm",
    query: "Apple Watch Series 9 45 mm GPS",
    require: [["series 9"], ["45"]],
    exclude: ["41", "41mm"],
    minPrice: 150,
    maxPrice: 550,
  },
  {
    slug: "seiko-prospex-turtle-srpe93",
    query: "Seiko SRPE93K1",
    require: [["srpe93"]],
    minPrice: 200,
    maxPrice: 600,
  },
  {
    slug: "citizen-eco-drive-chrono-ca4500",
    query: "Citizen CA4500-91X",
    require: [["ca4500"]],
    minPrice: 100,
    maxPrice: 400,
  },
  {
    slug: "orient-bambino-version-4-classique",
    query: "Orient Bambino RA-AC0002S",
    require: [["ac0002s"]],
    minPrice: 80,
    maxPrice: 300,
  },
  {
    slug: "bulova-lunar-pilot-chronographe",
    query: "Bulova Lunar Pilot 96B251",
    require: [["96b251"]],
    minPrice: 200,
    maxPrice: 900,
  },
  {
    slug: "casio-g-shock-ga-2100-carbon-core",
    query: "Casio G-Shock GA-2100-1A1",
    require: [["ga2100"]],
    minPrice: 50,
    maxPrice: 180,
  },
  // --- Électroménager -----------------------------------------------------
  {
    slug: "dyson-v15-detect-absolute",
    query: "Dyson V15 Detect Absolute",
    require: [["v15"], ["detect"]],
    exclude: ["filtre", "brosse", "batterie"],
    minPrice: 250,
    maxPrice: 900,
  },
  {
    slug: "rowenta-x-force-flex-14-60",
    query: "Rowenta X-Force Flex 14.60 Aqua",
    require: [["xforce"], ["1460"]],
    minPrice: 150,
    maxPrice: 750,
  },
  {
    slug: "delonghi-magnifica-evo-ecam290",
    query: "De'Longhi Magnifica Evo ECAM290.61",
    require: [["ecam290"]],
    minPrice: 200,
    maxPrice: 650,
  },
  {
    slug: "sage-barista-express-ses875",
    query: "Sage Barista Express SES875",
    require: [["ses875", "barista express"]],
    exclude: ["impress", "pro", "touch"],
    minPrice: 250,
    maxPrice: 850,
  },
  {
    slug: "ninja-foodi-max-af400",
    query: "Ninja Foodi MAX AF400",
    require: [["af400"]],
    minPrice: 80,
    maxPrice: 330,
  },
];
