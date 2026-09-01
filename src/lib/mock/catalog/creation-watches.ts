import type { MockProductSeed } from "@/lib/mock/build";
import { productImages } from "@/lib/mock/images";

/**
 * Montres & Bijoux: the Creation Watches selection.
 *
 * Kept in its own file rather than merged into `watches-jewelry.ts` so the
 * whole block can be replaced in one move the day the real feed arrives.
 *
 * Every offer here points at `creationwatches`, whose outbound URL is built by
 * `src/lib/sources/creationwatches.ts`. Those links are **plain public store
 * URLs**: the affiliate application has not been approved, so nothing is
 * tagged. See the adapter for how that changes later.
 *
 * Prices are indicative and, like the rest of the catalogue, fabricated.
 */
export const creationWatchesSeeds: MockProductSeed[] = [
  {
    slug: "seiko-prospex-turtle-srpe93",
    title: "Seiko Prospex Turtle SRPE93K1, plongée 200 m",
    brand: "Seiko",
    model: "Prospex SRPE93K1",
    category: "watches-jewelry",
    releasedAt: "2019-03-01",
    imageSubject: "Montre de plongée automatique",
    description:
      "Le boîtier coussin surnommé « Turtle » revient dans sa version moderne, avec le calibre 4R36 à remontage automatique et manuel. La lunette tournante unidirectionnelle et le Lumibrite sur les index en font une vraie montre de plongée, homologuée à 200 mètres, qui reste portable au quotidien malgré ses 45 millimètres.",
    rating: { value: 4.7, count: 842 },
    images: productImages.watchDiver,
    specs: [
      { label: "Mouvement", value: "Automatique Seiko 4R36, 24 rubis" },
      { label: "Réserve de marche", value: "41 heures" },
      { label: "Diamètre du boîtier", value: "45 mm (44,3 mm sans la couronne)" },
      { label: "Épaisseur", value: "13 mm" },
      { label: "Étanchéité", value: "20 ATM (200 m), norme ISO plongée" },
      { label: "Verre", value: "Hardlex bombé" },
      { label: "Bracelet", value: "Silicone noir, 22 mm" },
      { label: "Lunette", value: "Tournante unidirectionnelle 120 crans" },
    ],
    reviews: [
      {
        author: "Sébastien V.",
        rating: 5,
        comment:
          "Format imposant mais très bien équilibré au poignet grâce aux cornes courtes. Le Lumibrite tient toute la nuit.",
        date: "2026-07-24",
      },
      {
        author: "Karine J.",
        rating: 4,
        comment:
          "Offerte à mon mari, il ne la quitte plus. Le bracelet silicone d'origine mérite d'être remplacé par un acier.",
        date: "2026-06-02",
      },
      {
        author: "Yann P.",
        rating: 5,
        comment: "Précision mesurée à +6 s/jour après deux mois. Excellent pour un 4R36.",
        date: "2026-04-15",
      },
    ],
    offers: [
      {
        source: "creationwatches",
        price: 289,
        condition: "new",
        seller: "Creation Watches",
        sellerRating: 4.7,
        sellerReviewCount: 18420,
      },
      {
        source: "ebay",
        price: 349,
        shipping: 8.9,
        condition: "new",
        seller: "HorlogerieDirect",
        sellerRating: 4.8,
        sellerReviewCount: 5610,
      },
      {
        source: "ebay",
        price: 399,
        condition: "new",
        seller: "TimeGallery",
        sellerRating: 4.7,
        sellerReviewCount: 3980,
      },
    ],
  },
  {
    slug: "citizen-eco-drive-chrono-ca4500",
    title: "Citizen Eco-Drive Chronographe CA4500-91X, cadran vert",
    brand: "Citizen",
    model: "Eco-Drive CA4500-91X",
    category: "watches-jewelry",
    releasedAt: "2021-06-01",
    imageSubject: "Montre chronographe solaire",
    description:
      "La technologie Eco-Drive supprime la pile : la montre se recharge à la lumière, même artificielle, et tient six mois dans le noir une fois pleine. Le chronographe compte jusqu'à soixante minutes au 1/5ᵉ de seconde, et le cadran vert soleillé change nettement d'intensité selon l'angle.",
    rating: { value: 4.6, count: 1129 },
    images: productImages.watchChrono,
    specs: [
      { label: "Mouvement", value: "Quartz solaire Citizen Eco-Drive B620" },
      { label: "Réserve de marche", value: "6 mois dans l'obscurité, pleine charge" },
      { label: "Diamètre du boîtier", value: "44 mm" },
      { label: "Épaisseur", value: "11,5 mm" },
      { label: "Étanchéité", value: "10 ATM (100 m)" },
      { label: "Verre", value: "Minéral traité antireflet" },
      { label: "Bracelet", value: "Acier inoxydable, boucle déployante" },
      { label: "Complications", value: "Chronographe 60 min, date" },
    ],
    reviews: [
      {
        author: "Olivier M.",
        rating: 5,
        comment:
          "Plus jamais de pile à changer, c'est le vrai argument. Deux ans d'usage, aucune faiblesse.",
        date: "2026-07-08",
      },
      {
        author: "Sandra L.",
        rating: 4,
        comment: "Cadran magnifique en extérieur. Un peu épaisse sous une manche de chemise fine.",
        date: "2026-05-19",
      },
    ],
    offers: [
      {
        source: "creationwatches",
        price: 229,
        condition: "new",
        seller: "Creation Watches",
        sellerRating: 4.7,
        sellerReviewCount: 18420,
      },
      {
        source: "ebay",
        price: 299,
        shipping: 6.9,
        condition: "new",
        seller: "SonCenter",
        sellerRating: 4.8,
        sellerReviewCount: 6740,
      },
      {
        source: "ebay",
        price: 319,
        condition: "new",
        seller: "HorlogerieDirect",
        sellerRating: 4.8,
        sellerReviewCount: 5610,
      },
    ],
  },
  {
    slug: "orient-bambino-version-4-classique",
    title: "Orient Bambino Version 4 RA-AC0002S, cadran blanc",
    brand: "Orient",
    model: "Bambino V4 RA-AC0002S",
    category: "watches-jewelry",
    releasedAt: "2016-09-01",
    imageSubject: "Montre habillée automatique",
    description:
      "La Bambino est devenue la référence de la montre habillée abordable : verre minéral bombé façon plexi d'époque, cadran blanc dépouillé et aiguilles dauphine polies. Le calibre F6724 d'Orient est un mouvement maison, avec remontage manuel et arrêt de la seconde, ce qui reste rare sous les 200 euros.",
    rating: { value: 4.8, count: 2317 },
    images: productImages.watchDress,
    specs: [
      { label: "Mouvement", value: "Automatique Orient F6724, 22 rubis" },
      { label: "Réserve de marche", value: "40 heures" },
      { label: "Diamètre du boîtier", value: "40,5 mm" },
      { label: "Épaisseur", value: "12 mm" },
      { label: "Étanchéité", value: "3 ATM (30 m), résistance aux éclaboussures" },
      { label: "Verre", value: "Minéral bombé" },
      { label: "Bracelet", value: "Cuir de veau marron, 21 mm" },
      { label: "Complications", value: "Date à 3 h" },
    ],
    reviews: [
      {
        author: "Thibaut R.",
        rating: 5,
        comment:
          "Le verre bombé donne un cachet vintage que peu de montres de ce prix arrivent à avoir.",
        date: "2026-06-21",
      },
      {
        author: "Marine D.",
        rating: 5,
        comment: "Parfaite sous une chemise, très fine. Le cuir d'origine est correct sans plus.",
        date: "2026-05-03",
      },
      {
        author: "Alexandre B.",
        rating: 4,
        comment: "Attention aux 3 ATM : ce n'est vraiment pas une montre pour la douche.",
        date: "2026-03-11",
      },
    ],
    offers: [
      {
        source: "creationwatches",
        price: 139,
        condition: "new",
        seller: "Creation Watches",
        sellerRating: 4.7,
        sellerReviewCount: 18420,
      },
      {
        source: "ebay",
        price: 179,
        shipping: 5.9,
        condition: "new",
        seller: "TimeGallery",
        sellerRating: 4.7,
        sellerReviewCount: 3980,
      },
      {
        source: "ebay",
        price: 199,
        condition: "new",
        seller: "MaisonJoaillerie",
        sellerRating: 4.7,
        sellerReviewCount: 2680,
      },
    ],
  },
  {
    slug: "bulova-lunar-pilot-chronographe",
    title: "Bulova Lunar Pilot 96B251, chronographe haute fréquence",
    brand: "Bulova",
    model: "Lunar Pilot 96B251",
    category: "watches-jewelry",
    releasedAt: "2015-11-01",
    imageSubject: "Montre chronographe de pilote",
    description:
      "Réédition du chronographe porté sur la Lune lors d'Apollo 15, avec le mouvement quartz haute fréquence à 262 kHz de Bulova, précis au 1/1000ᵉ de seconde et doté d'une aiguille de chronographe qui balaie le cadran de façon fluide. Le boîtier de 45 millimètres reprend fidèlement les proportions de l'original.",
    rating: { value: 4.5, count: 673 },
    images: productImages.watchField,
    specs: [
      { label: "Mouvement", value: "Quartz haute fréquence 262 kHz" },
      { label: "Précision", value: "±10 s par an" },
      { label: "Diamètre du boîtier", value: "45 mm" },
      { label: "Épaisseur", value: "13,5 mm" },
      { label: "Étanchéité", value: "5 ATM (50 m)" },
      { label: "Verre", value: "Saphir traité antireflet" },
      { label: "Bracelet", value: "Cuir noir surpiqué, 22 mm, bracelet nylon fourni" },
      { label: "Complications", value: "Chronographe 4 h, échelle tachymétrique" },
    ],
    reviews: [
      {
        author: "Grégory T.",
        rating: 5,
        comment:
          "L'aiguille de chrono qui balaie à 16 battements par seconde est fascinante à regarder.",
        date: "2026-07-13",
      },
      {
        author: "Hélène C.",
        rating: 4,
        comment: "Superbe pièce d'histoire, mais 45 mm c'est vraiment gros sur un poignet fin.",
        date: "2026-04-28",
      },
    ],
    offers: [
      {
        source: "creationwatches",
        price: 449,
        condition: "new",
        seller: "Creation Watches",
        sellerRating: 4.7,
        sellerReviewCount: 18420,
      },
      {
        source: "ebay",
        price: 529,
        shipping: 9.9,
        condition: "new",
        seller: "HorlogerieDirect",
        sellerRating: 4.8,
        sellerReviewCount: 5610,
      },
      {
        source: "ebay",
        price: 589,
        condition: "new",
        seller: "TimeGallery",
        sellerRating: 4.7,
        sellerReviewCount: 3980,
      },
    ],
  },
  {
    slug: "casio-g-shock-ga-2100-carbon-core",
    title: "Casio G-Shock GA-2100-1A1 Carbon Core Guard",
    brand: "Casio",
    model: "G-Shock GA-2100-1A1",
    category: "watches-jewelry",
    releasedAt: "2019-08-01",
    imageSubject: "Montre de sport résistante aux chocs",
    description:
      "Surnommée « CasiOak » pour sa lunette octogonale, la GA-2100 est la G-Shock la plus fine et la plus légère de la gamme grâce à sa structure Carbon Core Guard. Affichage analogique et numérique combiné, résistance aux chocs, étanchéité 200 mètres et une pile annoncée pour trois ans.",
    rating: { value: 4.8, count: 4386 },
    images: productImages.watchDigital,
    specs: [
      { label: "Mouvement", value: "Quartz analogique-numérique" },
      { label: "Autonomie de la pile", value: "Environ 3 ans (CR2016)" },
      { label: "Diamètre du boîtier", value: "45,4 × 44,4 mm" },
      { label: "Épaisseur", value: "11,8 mm" },
      { label: "Étanchéité", value: "20 ATM (200 m)" },
      { label: "Verre", value: "Minéral" },
      { label: "Bracelet", value: "Résine noire, 16 mm" },
      { label: "Résistance", value: "Antichoc, structure Carbon Core Guard" },
      { label: "Fonctions", value: "Chronomètre, compte à rebours, 5 alarmes, calendrier auto" },
    ],
    reviews: [
      {
        author: "Nicolas A.",
        rating: 5,
        comment:
          "51 grammes, on l'oublie au poignet. Je la porte au sport comme au bureau, elle passe partout.",
        date: "2026-07-30",
      },
      {
        author: "Émilie F.",
        rating: 5,
        comment: "Indestructible et enfin une G-Shock qui ne fait pas 18 mm d'épaisseur.",
        date: "2026-06-09",
      },
      {
        author: "Rachid B.",
        rating: 4,
        comment: "L'affichage numérique est petit, un peu juste à lire sans lunettes.",
        date: "2026-02-25",
      },
    ],
    offers: [
      {
        source: "creationwatches",
        price: 89,
        condition: "new",
        seller: "Creation Watches",
        sellerRating: 4.7,
        sellerReviewCount: 18420,
      },
      {
        source: "ebay",
        price: 109,
        shipping: 4.9,
        condition: "new",
        seller: "TimeGallery",
        sellerRating: 4.7,
        sellerReviewCount: 3980,
      },
      {
        source: "ebay",
        price: 129,
        condition: "new",
        seller: "SonCenter",
        sellerRating: 4.8,
        sellerReviewCount: 6740,
      },
    ],
  },
  {
    slug: "bracelet-acier-milanais-20mm",
    title: "Bracelet milanais acier inoxydable 20 mm, fermoir papillon",
    brand: "Creation Straps",
    model: "Milanese 20",
    category: "watches-jewelry",
    releasedAt: "2024-02-01",
    imageSubject: "Bracelet de montre en maille milanaise",
    description:
      "La maille milanaise tissée serrée s'ajuste au millimètre grâce à son fermoir papillon coulissant, sans outil ni maillon à retirer. Acier 316L brossé, compatible avec la plupart des montres à cornes de 20 millimètres, livré avec des barrettes à ressort de rechange.",
    rating: { value: 4.4, count: 918 },
    images: productImages.braceletSteel,
    specs: [
      { label: "Matériau", value: "Acier inoxydable 316L brossé" },
      { label: "Entrecorne", value: "20 mm" },
      { label: "Longueur", value: "Ajustable de 145 à 215 mm" },
      { label: "Fermoir", value: "Papillon coulissant, réglage sans outil" },
      { label: "Épaisseur", value: "2,8 mm" },
      { label: "Poids", value: "48 g" },
      { label: "Inclus", value: "2 barrettes à ressort de rechange" },
    ],
    reviews: [
      {
        author: "Franck L.",
        rating: 5,
        comment:
          "Le réglage sans outil est un vrai confort, on ajuste selon la température de la journée.",
        date: "2026-06-30",
      },
      {
        author: "Valérie N.",
        rating: 4,
        comment: "Belle maille, bien finie. Elle accroche un peu les poils de bras au début.",
        date: "2026-04-17",
      },
    ],
    offers: [
      {
        source: "creationwatches",
        price: 29,
        condition: "new",
        seller: "Creation Watches",
        sellerRating: 4.7,
        sellerReviewCount: 18420,
      },
      {
        source: "ebay",
        price: 39,
        shipping: 2.9,
        condition: "new",
        seller: "BijouxAtelier",
        sellerRating: 4.5,
        sellerReviewCount: 4120,
      },
      {
        source: "ebay",
        price: 45,
        condition: "new",
        seller: "MaisonJoaillerie",
        sellerRating: 4.7,
        sellerReviewCount: 2680,
      },
    ],
  },
];
