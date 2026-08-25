/**
 * Photo pool for the demonstration catalogue.
 *
 * Every id below was checked against `images.unsplash.com` and returns 200.
 * Unsplash is used because its licence allows free commercial use with no
 * attribution requirement — see https://unsplash.com/license.
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
  phoneApple: set("photo-1511707171634-5f897ff02aa9", "photo-1592899677977-9c10ca588bbd"),
  phoneAndroid: set("photo-1616348436168-de43ad0db179", "photo-1510557880182-3d4d3cba35a5"),
  phoneGeneric: set("photo-1580910051074-3eb694886505", "photo-1592899677977-9c10ca588bbd"),

  laptopApple: set("photo-1517336714731-489689fd1ca8", "photo-1541807084-5c52b6b3adef"),
  laptopWindows: set("photo-1496181133206-80ce9b88a853", "photo-1531297484001-80022131f5a1"),
  tablet: set("photo-1544244015-0df4b3ffc6b0", "photo-1517336714731-489689fd1ca8"),

  headphonesOverEar: set("photo-1505740420928-5e560c06d30e", "photo-1583394838336-acd977736f90"),
  headphonesStudio: set("photo-1546435770-a3e426bf472b", "photo-1484704849700-f032a568e944"),

  consolePlaystation: set("photo-1606813907291-d86efa9b94db", "photo-1592840496694-26d035b52b48"),
  consoleGaming: set("photo-1486401899868-0e435ed85128", "photo-1493711662062-fa541adb3fc8"),

  vacuum: set("photo-1558618666-fcd25c85cd64", "photo-1527515637462-cff94eecc1ac"),
  kitchenAppliance: set("photo-1584622650111-993a426fbf0a", "photo-1517668808822-9ebb02f2a0e6"),
  coffeeMachine: set("photo-1495474472287-4d71bcdd2085", "photo-1510972527921-ce03766a1cf1"),

  sofaFabric: set("photo-1555041469-a586c61ea9bc", "photo-1493663284031-b7e3aefcae8e"),
  sofaModern: set("photo-1567016432779-094069958ea5", "photo-1550226891-ef816aed4a98"),
  chairWood: set("photo-1592078615290-033ee584e267", "photo-1506439773649-6e0eb8cfb237"),
  chairDesign: set("photo-1503602642458-232111445657", "photo-1592078615290-033ee584e267"),
  lampTable: set("photo-1507473885765-e6ed057f782c", "photo-1513506003901-1e6a229e2d15"),
  lampFloor: set("photo-1524484485831-a92ffc0de03f", "photo-1507473885765-e6ed057f782c"),

  watchClassic: set("photo-1524592094714-0f0654e20314", "photo-1547996160-81dfa63595aa"),
  watchLuxury: set("photo-1523275335684-37898b6baf30", "photo-1434056886845-dac89ffe9b56"),
  watchSmart: set("photo-1622434641406-a158123450f9", "photo-1526170375885-4d8ecf77b99f"),
  braceletGold: set("photo-1515562141207-7a88fb7ce338", "photo-1573408301185-9146fe634ad0"),
  jewelryRing: set("photo-1611591437281-460bfbe1220a", "photo-1599643478518-a784e5dc4c8f"),
  // Creation Watches
  watchDiver: set("photo-1533139502658-0198f920d8e8", "photo-1548169874-53e85f753f1e"),
  watchChrono: set("photo-1594534475808-b18fc33b045e", "photo-1620625515032-6ed0c1790c75"),
  watchDress: set("photo-1587836374828-4dbafa94cf0e", "photo-1612817159949-195b6eb9e31a"),
  watchField: set("photo-1509048191080-d2984bad6ae5", "photo-1495856458515-0637185db551"),
  watchDigital: set("photo-1617038220319-276d3cfab638", "photo-1596944924616-7b38e7cfac36"),
  braceletSteel: set("photo-1544376798-89aa6b82c6cd", "photo-1573408301185-9146fe634ad0"),

  necklace: set("photo-1560343090-f0409e92791a", "photo-1515562141207-7a88fb7ce338"),

  sneakers: set("photo-1542291026-7eec264c27ff", "photo-1595950653106-6c9ebd614d3a"),
  jacket: set("photo-1551028719-00167b16eac5", "photo-1523381210434-271e8be1f52b"),
  backpack: set("photo-1576871337622-98d48d1cf531", "photo-1532298229144-0ec0c57515c7"),

  bicycle: set("photo-1571068316344-75bc76f77890", "photo-1485965120184-e220f721d03e"),
  guitar: set("photo-1511556820780-d912e42b4980", "photo-1516035069371-29a1b244cc32"),
  camera: set("photo-1502920917128-1aa500764cbd", "photo-1487222477894-8943e31ef7b2"),
} as const;
