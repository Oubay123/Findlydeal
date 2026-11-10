import { define } from "./define";

const stroller = define("kids", "Poussette");
const seat = define("kids", "Siège auto");
const nursery = define("kids", "Équipement bébé");
const toy = define("kids", "Jouet");

const PARTS = [
  "habillage pluie",
  "ombrelle seule",
  "chancelière",
  "housse",
  "adaptateur",
  "roue",
  "nacelle seule",
];

/**
 * Children: the category where second hand is most common (gear outgrown in a
 * few months). Car seats are kept to models whose history a buyer can check:
 * the guide says why a used seat must never have been in an accident.
 */
export const kidsCatalogue = [
  stroller("Babyzen", "Babyzen YOYO2", "yoyo2/yoyo 2/yoyo²/yoyo", 150, 650, {
    query: "Babyzen Yoyo",
    exclude: [...PARTS, "pack 0+", "sac"],
  }),
  stroller("Bugaboo", "Bugaboo Fox 3", "bugaboo fox 3", 250, 1100, { exclude: PARTS }),
  stroller("Bugaboo", "Bugaboo Butterfly", "bugaboo butterfly", 160, 520, { exclude: PARTS }),
  stroller("Cybex", "Cybex Priam", "cybex priam", 300, 1400, { exclude: PARTS }),
  stroller("Joolz", "Joolz Day+", "joolz day", 220, 1000, { exclude: PARTS }),
  stroller("Thule", "Thule Urban Glide 2", "urban glide 2", 200, 650, { exclude: PARTS }),
  seat("Maxi-Cosi", "Maxi-Cosi Pebble 360", "pebble 360", 90, 330, {
    exclude: ["base seule", "familyfix seule"],
  }),
  seat("Cybex", "Cybex Cloud T i-Size", "cybex cloud t", 120, 400, { exclude: ["base seule"] }),
  seat("Doona", "Doona i siège auto-poussette", "doona", 180, 550, {
    exclude: ["base seule", "sac", "housse"],
  }),
  nursery("Stokke", "Stokke Tripp Trapp", "tripp trapp", 90, 350, {
    exclude: ["coussin seul", "baby set seul", "plateau seul", "harnais seul"],
  }),
  nursery("BabyBjörn", "BabyBjörn transat Bliss", "babybjorn | bliss", 70, 260),
  nursery("BabyBjörn", "BabyBjörn porte-bébé Harmony", "babybjorn | harmony", 70, 260),
  nursery("Ergobaby", "Ergobaby Omni 360", "ergobaby | omni 360", 50, 220),
  nursery("Chicco", "Chicco Next2Me Magic lit cododo", "next2me", 70, 280),
  nursery("Béaba", "Béaba Babycook", "babycook", 40, 180),
  toy("Boxine", "Toniebox (coffret de démarrage)", "toniebox", 40, 140, {
    exclude: ["figurine seule", "tonies seuls"],
  }),
  toy("Lunii", "Lunii Ma Fabrique à Histoires", "lunii", 30, 120),
  toy("Yoto", "Yoto Player (3e génération)", "yoto | player", 40, 140, {
    exclude: ["mini", "carte"],
  }),
  toy("Strider", "Strider 12 Sport draisienne", "strider | 12", 40, 160),
  toy("Micro", "Micro Maxi Deluxe trottinette", "maxi micro | deluxe/maxi deluxe", 50, 180, {
    query: "Maxi Micro Deluxe",
  }),
  toy(
    "Mattel",
    "Barbie maison de rêve (Dreamhouse)",
    "barbie | dreamhouse/maison de reve",
    60,
    300,
  ),
  toy("Playmobil", "Playmobil grand bateau pirate", "playmobil | bateau pirate", 30, 200),
  toy("Sylvanian Families", "Sylvanian Families grande maison", "sylvanian | maison", 30, 200, {
    exclude: ["meubles seuls", "personnages seuls"],
  }),
];
