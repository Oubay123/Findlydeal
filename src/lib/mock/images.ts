/**
 * Photo pool for the demonstration catalogue.
 *
 * Every id below was checked against `images.unsplash.com` and returns 200,
 * and every photo was looked at before being assigned: the subject has to be
 * the object the slot claims to show, not merely something from the same
 * category. Unsplash is used because its licence allows free commercial use
 * with no attribution requirement - see https://unsplash.com/license.
 *
 * Two rules hold across the whole site and are worth keeping:
 *
 * 1. **One photo, one place.** No id appears twice, here or in
 *    `config/categories.ts`, `components/home/hero-section.tsx` and the blog
 *    articles. A category tile showing the same picture as a product card
 *    reads as a bug.
 * 2. **One slot, one product.** Sharing a slot between two different products
 *    puts the same photo on two cards, which is the same problem by another
 *    route. Add a slot rather than reuse one.
 *
 * A slot may hold a single photo: `ProductGallery` simply omits the thumbnail
 * strip. That is preferable to padding the set with an off-subject picture.
 *
 * When real sources go live these are replaced by the marketplaces' own CDN
 * URLs; remember to add their hostnames to `images.remotePatterns` in
 * `next.config.ts`, exactly as `images.unsplash.com` is declared today.
 */

import { unsplash } from "@/lib/utils/images";

function set(...photoIds: string[]): string[] {
  return photoIds.map((id) => unsplash(id));
}

/** Named photo sets, grouped by what they actually show. */
export const productImages = {
  // Téléphonie
  phoneApple: set(
    "photo-1511707171634-5f897ff02aa9",
    "photo-1592899677977-9c10ca588bbd",
    "photo-1580910051074-3eb694886505",
  ),
  phoneAndroid: set("photo-1610945265064-0e34e5519bbf", "photo-1546054454-aa26e2b734c7"),
  phoneGeneric: set("photo-1598327105666-5b89351aff97"),

  // Informatique
  laptopApple: set("photo-1517336714731-489689fd1ca8", "photo-1541807084-5c52b6b3adef"),
  laptopWindows: set("photo-1588872657578-7efd1f1555ed", "photo-1593642632823-8f785ba67e45"),
  tablet: set("photo-1544244015-0df4b3ffc6b0", "photo-1585790050230-5dd28404ccb9"),

  // Audio
  headphonesOverEar: set("photo-1505740420928-5e560c06d30e", "photo-1583394838336-acd977736f90"),
  headphonesStudio: set("photo-1546435770-a3e426bf472b", "photo-1484704849700-f032a568e944"),

  // Jeu vidéo. `consoleGaming` sert une Xbox : les photos montrent une partie
  // en cours et un poste de jeu, faute de photo de Xbox sous licence libre.
  // Mieux vaut ne montrer aucune console qu'en montrer une d'une autre marque.
  consolePlaystation: set("photo-1606813907291-d86efa9b94db", "photo-1592840496694-26d035b52b48"),
  consoleGaming: set("photo-1493711662062-fa541adb3fc8", "photo-1542751371-adc38448a05e"),

  // Électroménager
  vacuum: set("photo-1527515637462-cff94eecc1ac"),
  vacuumWasher: set("photo-1581578949510-fa7315c4c350"),
  coffeeMachine: set("photo-1509785307050-d4066910ec1e", "photo-1442512595331-e89e73853f31"),
  espressoManual: set("photo-1558618666-fcd25c85cd64"),
  airFryer: set("photo-1574269909862-7e1d70bb8078"),

  // Mobilier
  sofaFabric: set("photo-1555041469-a586c61ea9bc", "photo-1493663284031-b7e3aefcae8e"),
  sofaModern: set("photo-1540574163026-643ea20ade25"),
  chairWood: set("photo-1598300042247-d088f8ab3a91", "photo-1506439773649-6e0eb8cfb237"),
  chairDesign: set("photo-1540638349517-3abd5afc5847"),
  lampTable: set("photo-1517991104123-1d56a6e81ed9", "photo-1507473885765-e6ed057f782c"),
  lampFloor: set("photo-1524758631624-e2822e304c36", "photo-1513694203232-719a280e022f"),

  // Montres
  watchClassic: set("photo-1524592094714-0f0654e20314", "photo-1547996160-81dfa63595aa"),
  watchLuxury: set("photo-1522312346375-d1a52e2b99b3", "photo-1539874754764-5a96559165b0"),
  watchSmart: set("photo-1546868871-7041f2a55e12", "photo-1434493789847-2f02dc6ca35d"),
  watchDiver: set("photo-1533139502658-0198f920d8e8", "photo-1526045431048-f857369baa09"),
  watchChrono: set("photo-1523170335258-f5ed11844a49", "photo-1542496658-e33a6d0d50f6"),
  watchDress: set("photo-1587836374828-4dbafa94cf0e", "photo-1612817159949-195b6eb9e31a"),
  watchField: set("photo-1495856458515-0637185db551", "photo-1548171915-e79a380a2a4b"),
  watchDigital: set("photo-1553545204-4f7d339aa06a", "photo-1544117519-31a4b719223d"),

  // Bijoux
  braceletGold: set("photo-1617038220319-276d3cfab638", "photo-1611591437281-460bfbe1220a"),
  braceletSteel: set("photo-1434056886845-dac89ffe9b56", "photo-1508057198894-247b23fe5ade"),
  jewelryRing: set("photo-1605100804763-247f67b3557e", "photo-1602751584552-8ba73aad10e1"),
  necklace: set("photo-1611085583191-a3b181a88401", "photo-1515562141207-7a88fb7ce338"),

  // Mode
  sneakers: set("photo-1595950653106-6c9ebd614d3a", "photo-1542291026-7eec264c27ff"),
  jacket: set("photo-1551028719-00167b16eac5", "photo-1520975954732-35dd22299614"),

  // Loisirs
  bicycle: set("photo-1571068316344-75bc76f77890", "photo-1485965120184-e220f721d03e"),
  guitar: set("photo-1510915361894-db8b60106cb1", "photo-1525201548942-d8732f6617a0"),
} as const;
