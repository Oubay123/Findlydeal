/**
 * New prices taken from official sellers: the brand's own store, and the large
 * French retailers selling the product in their own name (Fnac, Darty,
 * Boulanger). Marketplace sellers hosted on those sites are not counted.
 *
 * These are prices read by hand on the date below, product page by product
 * page. They are shown as such ("relevé le …"), never as a live price, and
 * never as a former or reference price that an offer would be "reduced"
 * from: a retailer's price is one more new price, side by side with the
 * marketplaces' (art. L. 112-1-1 du Code de la consommation).
 *
 * Covered: the catalogue's popular products that an official seller still
 * sells new. A model the brand has replaced (Babyzen YOYO², Toniebox 1st
 * generation) or that only marketplace sellers offer new (PS5 Slim with disc
 * drive, Xbox Series X, De'Longhi Magnifica S…) has no entry rather than a
 * doubtful one. Refresh the whole file at once and update the date.
 */
export const REFERENCE_PRICES_CHECKED_AT = "2026-11-12";

export interface ReferencePrice {
  /** Who sells: "Apple", "Fnac", "Boulanger"… */
  seller: string;
  /** The brand's own store, or a retailer selling in its own name. */
  kind: "brand" | "retailer";
  /** Price incl. VAT, in euros, as displayed on the day. */
  euros: number;
  url: string;
  /** What exactly was priced, when the catalogue model is broader. */
  note?: string;
}

const brand = (seller: string, euros: number, url: string, note?: string): ReferencePrice => ({
  seller,
  kind: "brand",
  euros,
  url,
  note,
});
const fnac = (euros: number, url: string): ReferencePrice => ({
  seller: "Fnac",
  kind: "retailer",
  euros,
  url,
});
const darty = (euros: number, url: string): ReferencePrice => ({
  seller: "Darty",
  kind: "retailer",
  euros,
  url,
});
const boulanger = (euros: number, ref: string): ReferencePrice => ({
  seller: "Boulanger",
  kind: "retailer",
  euros,
  url: `https://www.boulanger.com/ref/${ref}`,
});

export const referencePrices: Record<string, ReferencePrice[]> = {
  // Tech
  "apple-iphone-16-128-go": [
    brand(
      "Apple",
      1019,
      "https://www.apple.com/fr/shop/buy-iphone/iphone-16/%C3%A9cran-de-6,1-pouces-128go-noir",
    ),
    boulanger(1019, "1207406"),
    darty(
      1019.99,
      "https://www.darty.com/nav/achat/telephonie/telephone_mobile_seul/iphone/apple_iph16_128go_bk.html",
    ),
    fnac(
      1019.99,
      "https://www.fnac.com/Apple-iPhone-16-6-1-5G-128-Go-Double-SIM-Noir/a19813594/w-4",
    ),
  ],
  "apple-airpods-max": [
    boulanger(509, "1212723"),
    darty(
      479,
      "https://www.darty.com/nav/achat/accessoires/casque_ecouteurs/casque_arceau/apple_airpods_max_minuit.html",
    ),
  ],
  "sony-wh-1000xm5-noir": [
    boulanger(279.99, "1178789"),
    darty(
      269.99,
      "https://www.darty.com/nav/achat/accessoires/casque_ecouteurs/casque_arceau/sony_wh1000xm5b_ce7.html",
    ),
  ],
  "sony-wf-1000xm5": [
    boulanger(196.99, "1192706"),
    fnac(
      197.98,
      "https://www.fnac.com/Ecouteurs-intra-auriculaires-sans-fil-Sony-WF-1000XM5-a-reduction-de-bruit-Argent/a18240996/w-4",
    ),
  ],
  "sonos-era-100": [brand("Sonos", 229, "https://www.sonos.com/fr-fr/shop/era-100")],
  "sonos-move-2": [
    brand("Sonos", 499, "https://www.sonos.com/fr-fr/shop/move-2"),
    boulanger(499.99, "1194886"),
  ],
  "marshall-stanmore-iii": [
    brand("Marshall", 299, "https://www.marshall.com/fr/fr/product/stanmore-iii?pid=1006010"),
    boulanger(292.99, "1180373"),
    fnac(
      292,
      "https://www.fnac.com/Enceinte-sans-fil-Bluetooth-Marshal-Stanmore-III-Noir/a17089113/w-4",
    ),
  ],

  // Jeux vidéo
  "nintendo-switch-2": [
    boulanger(469.99, "1220464"),
    fnac(429.99, "https://www.fnac.com/Console-Nintendo-Switch-2-Noir/a21424368/w-4"),
  ],
  "nintendo-switch-oled": [
    fnac(
      319.99,
      "https://www.fnac.com/Nintendo-Switch-modele-OLED-avec-station-d-accueil-et-manettes-Joy-Con-blanches/a15620618/w-4",
    ),
  ],
  "nintendo-switch-lite": [boulanger(229.99, "1163068")],
  "sony-playstation-5-edition-numerique": [
    boulanger(599.99, "1228868"),
    fnac(
      599.99,
      "https://www.fnac.com/Console-Sony-PS5-Slim-Edition-Digital-chassis-E-Blanc/a21985466/w-4",
    ),
  ],
  "microsoft-xbox-series-s-512-go": [
    fnac(499.99, "https://www.fnac.com/Console-Microsoft-Xbox-Series-S-512-Go-Blanc/a20908046/w-4"),
  ],
  "sony-playstation-portal": [
    boulanger(249.99, "1197678"),
    fnac(
      249.99,
      "https://www.fnac.com/Lecteur-a-distance-Sony-PlayStation-Portal-pour-PS5-Blanc-et-noir/a18698278/w-4",
    ),
  ],
  "manette-sony-dualsense-ps5": [
    fnac(74.99, "https://www.fnac.com/Manette-Sony-DualSense-V2-pour-PS5-Blanc/a19078363/w-4"),
  ],
  "mario-kart-8-deluxe-switch": [
    boulanger(49.99, "1084738"),
    fnac(
      49.99,
      "https://www.fnac.com/a10337751/Mario-Kart-8-Deluxe-Nintendo-Switch-Jeu-video-Nintendo-Switch",
    ),
  ],

  // Maison
  "dyson-v15-detect-absolute": [
    boulanger(549, "1241521"),
    fnac(
      549,
      "https://www.fnac.com/Aspirateur-sans-fil-Dyson-V15-Detect-Absolute-Gris-anthracite/a23183903/w-4",
    ),
  ],
  "dyson-supersonic": [
    brand(
      "Dyson",
      449,
      "https://www.dyson.fr/soin-des-cheveux/seche-cheveux/supersonic/nickel-cuivre-hd07",
      "Supersonic HD07",
    ),
  ],
  "kitchenaid-artisan-4-8-l": [boulanger(599.99, "1083284")],
  "ikea-poang-fauteuil": [
    brand(
      "IKEA",
      69.99,
      "https://www.ikea.com/fr/fr/p/poaeng-fauteuil-plaque-bouleau-knisa-noir-s69240823/",
      "plaqué bouleau, Knisa noir",
    ),
  ],
  "ikea-kallax-4x4": [
    brand("IKEA", 149, "https://www.ikea.com/fr/fr/p/kallax-etagere-blanc-30275861/", "blanc"),
  ],
  "ikea-markus-chaise-de-bureau": [
    brand(
      "IKEA",
      199,
      "https://www.ikea.com/fr/fr/p/markus-chaise-de-bureau-vissle-gris-fonce-70261150/",
    ),
  ],

  // Enfant
  "stokke-tripp-trapp": [
    brand(
      "Stokke",
      279,
      "https://www.stokke.com/FRA/fr-fr/category/chaises-hautes",
      "prix d'entrée de gamme",
    ),
  ],
  "lunii-ma-fabrique-a-histoires": [brand("Lunii", 69.9, "https://lunii.com/fr-fr/boutique")],

  // Loisirs
  "fujifilm-instax-mini-12": [
    boulanger(79, "1189465"),
    fnac(
      79.99,
      "https://www.fnac.com/Appareil-photo-instantane-Fujifilm-Instax-Mini-12-Vert/a17814325/w-4",
    ),
  ],
  "dji-osmo-pocket-3": [
    boulanger(329, "1197572"),
    fnac(339.99, "https://www.fnac.com/Camera-sport-Dji-Osmo-Pocket-3-Noir/a18757321/w-4"),
  ],

  // Montres et mode
  "tissot-prx-powermatic-80": [
    brand(
      "Tissot",
      775,
      "https://www.tissotwatches.com/fr-be/T1374071104100.html",
      "PRX 40 mm, cadran bleu",
    ),
  ],
  "longchamp-le-pliage": [
    brand(
      "Longchamp",
      125,
      "https://www.longchamp.com/fr/fr/products/sac-cabas-m-L2605089001.html",
      "sac cabas M, toile recyclée",
    ),
  ],
  "adidas-samba-og": [brand("adidas", 140, "https://www.adidas.fr/samba")],
  "birkenstock-arizona": [
    brand(
      "Birkenstock",
      90,
      "https://www.birkenstock.com/fr/arizona-birko-flor/arizona-birkoflor-birkoflor-0-eva-u_1624.html",
      "Birko-Flor",
    ),
  ],
};

export function getReferencePrices(slug: string): ReferencePrice[] {
  return [...(referencePrices[slug] ?? [])].sort((a, b) => a.euros - b.euros);
}
