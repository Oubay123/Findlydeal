/**
 * Short eBay queries for products whose full title found nothing.
 *
 * The Browse API returns listings containing **every** keyword of the query:
 * a descriptive title ("Thule Motion XT coffre de toit", "LG OLED C3 55
 * pouces") excludes most real listings, whose titles are written otherwise.
 * These queries keep only the distinctive words (brand, model, reference);
 * the matching rules of each product (`require`, `exclude`, prices) still
 * decide which listings belong to it.
 *
 * Written after the first production pass (10 November 2026): 56 products
 * without any offer, 38 with one or two.
 */
export const queryOverrides: Record<string, string> = {
  // Watches: the reference alone, without suffix (K1…) or collection name.
  "certina-ds-action-diver": "Certina DS Action",
  "citizen-eco-drive-chrono-ca4500": "Citizen CA4500",
  "orient-bambino-version-4-classique": "Orient Bambino",
  "seiko-alpinist-spb121": "Seiko SPB121",
  "seiko-prospex-samurai-srpb51": "Seiko SRPB51",
  "seiko-5-sports-gmt-ssk003": "Seiko SSK003",
  "seiko-prospex-turtle-srpe93": "Seiko SRPE93",
  "seiko-presage-cocktail-time-srpb43": "Seiko SRPB43",
  "apple-watch-se-2e-generation-44-mm": "Apple Watch SE 44mm",

  // Tech
  "sony-playstation-5-slim-standard": "PS5 Slim",
  "sony-playstation-5-edition-numerique": "PS5 digital",
  "dell-xps-13-plus-i7-512go": "Dell XPS 13 Plus",
  "lg-oled-c3-55-pouces": "LG OLED C3",
  "lg-ultragear-27gp850": "LG 27GP850",
  "dell-ultrasharp-u2723qe": "Dell U2723QE",
  "apple-tv-4k-2022-64-go": "Apple TV 4K 2022",
  "apple-airpods-max": "AirPods Max",
  "kobo-libra-2": "Kobo Libra 2",
  "samsung-galaxy-tab-s9-128-go": "Galaxy Tab S9",
  "amazon-kindle-paperwhite-11e-generation": "Kindle Paperwhite",
  "asus-rog-zephyrus-g14-2023": "Zephyrus G14",
  "audio-technica-at-lp120x": "Audio Technica LP120",
  "rega-planar-1-platine-vinyle": "Rega Planar 1",
  "boss-katana-50-mkii": "Boss Katana 50",
  "sonos-move-2": "Sonos Move 2",

  // Home appliances
  "sage-barista-express-ses875": "Sage Barista Express",
  "sage-bambino-plus": "Sage Bambino Plus",
  "dyson-gen5detect": "Dyson Gen5",
  "dyson-purifier-cool-tp07": "Dyson TP07",
  "dyson-solarcycle-morph": "Dyson Solarcycle",
  "ninja-foodi-11-en-1-ol750": "Ninja OL750",
  "ring-video-doorbell-4": "Ring Doorbell 4",
  "philips-lattego-serie-3200": "Philips LatteGo",
  "rowenta-x-force-flex-14-60": "Rowenta X-Force 14.60",
  "google-nest-learning-thermostat": "Nest Learning Thermostat",
  "jura-e8": "Jura E8",
  "ooni-koda-12-four-a-pizza": "Ooni Koda 12",
  "philips-airfryer-xxl": "Airfryer XXL",
  "kenwood-cooking-chef-xl": "Kenwood Cooking Chef XL",
  "rocket-appartamento": "Rocket Appartamento",
  "roborock-q7-max": "Roborock Q7 Max",

  // Furniture and lighting
  "steelcase-leap-v2": "Steelcase Leap",
  "steelcase-gesture": "Steelcase Gesture",
  "ikea-markus-chaise-de-bureau": "IKEA Markus",
  "vitra-eames-plastic-chair-dsw": "Vitra DSW",
  "kartell-louis-ghost": "Louis Ghost",
  "kartell-masters-chaise": "Kartell Masters",
  "fatboy-original-pouf": "Fatboy Original",
  "hay-about-a-chair-aac22": "Hay About A Chair",
  "fermob-bistro-chaise": "Fermob Bistro",
  "fermob-luxembourg-fauteuil": "Fermob Luxembourg",
  "string-pocket-etagere": "String Pocket",
  "ikea-kallax-4x4": "Kallax",
  "ikea-bekant-bureau-assis-debout": "IKEA Bekant",
  "flexispot-e7-bureau-assis-debout": "Flexispot E7",
  "montana-etagere": "Montana",
  "vitra-uten-silo": "Uten Silo",
  "flos-arco": "Flos Arco",
  "flos-ic-lights": "Flos IC",
  "louis-poulsen-ph-5": "Louis Poulsen PH5",
  "louis-poulsen-panthella": "Panthella",
  "tradition-flowerpot-vp3": "Flowerpot VP3",
  "simba-hybrid-matelas-160x200": "Simba matelas",
  "tolix-chaise-a": "Tolix",
  "ikea-strandmon-fauteuil": "Strandmon",
  "artemide-tolomeo-lampe-de-bureau": "Tolomeo",
  "artemide-nesso": "Artemide Nesso",
  "herman-miller-sayl": "Herman Miller Sayl",
  "vitra-eames-lounge-chair": "Eames Lounge Chair",
  "jielde-signal-lampe": "Jielde",
  "anglepoise-original-1227": "Anglepoise 1227",
  "emma-original-matelas-140x190": "Emma matelas 140",
  "tediber-matelas-140x190": "Tediber matelas",
  "ikea-malm-commode-6-tiroirs": "Malm commode",

  // Fashion
  "new-balance-990v5": "New Balance 990",
  "rimowa-essential-cabin": "Rimowa Essential",
  "patagonia-nano-puff": "Nano Puff",
  "sezane-milo-sac": "Sezane Milo",
  "veja-v-10": "Veja V10",
  "pandora-moments-bracelet-maille-serpent": "Pandora bracelet moments",

  // Leisure and outdoors
  "peloton-bike": "Peloton",
  "concept2-rowerg": "Concept2",
  "theragun-elite": "Theragun Elite",
  "bowflex-selecttech-552": "Bowflex 552",
  "big-green-egg-large": "Big Green Egg",
  "thule-motion-xt-coffre-de-toit": "Thule Motion XT",
  "yeti-tundra-45": "Yeti Tundra 45",
  "msr-hubba-hubba-nx": "MSR Hubba Hubba",
  "stanley-quencher-1-2-l": "Stanley Quencher",
  "yamaha-p-125-piano-numerique": "Yamaha P125",
  "brompton-velo-pliant": "Brompton",
  "xiaomi-electric-scooter-4-pro": "Xiaomi Scooter 4 Pro",
  "weber-master-touch-57-cm": "Weber Master Touch",
  "wahoo-kickr-core": "Kickr Core",
};
