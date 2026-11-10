import { define } from "./define";

const drill = define("diy", "Outil électroportatif");
const garden = define("diy", "Outil de jardin");
const measure = define("diy", "Outil de mesure");

/**
 * DIY and garden: professional tools last for decades and resell well.
 * Cordless tools are compared "bare" or with batteries depending on the
 * listing: the guide tells buyers to check what is included.
 */
export const diyCatalogue = [
  drill("Makita", "Makita DHP482 perceuse-visseuse à percussion 18 V", "dhp482", 50, 260),
  drill("Makita", "Makita DTD153 visseuse à chocs 18 V", "dtd153", 50, 260),
  drill("Makita", "Makita DGA504 meuleuse 18 V", "dga504", 60, 280),
  drill("DeWalt", "DeWalt DCD796 perceuse-visseuse à percussion 18 V", "dcd796", 50, 280),
  drill("DeWalt", "DeWalt DCF887 visseuse à chocs 18 V", "dcf887", 60, 300),
  drill(
    "Bosch Professional",
    "Bosch Professional GSR 18V-55",
    "gsr 18v-55/gsr18v-55/gsr 18v 55",
    60,
    300,
  ),
  drill("Bosch Professional", "Bosch Professional GBH 2-26", "gbh 2-26/gbh2-26/gbh 2 26", 70, 300),
  drill("Milwaukee", "Milwaukee M18 FPD2 perceuse à percussion", "m18 | fpd2", 90, 420),
  drill("Festool", "Festool Domino DF 500", "domino | df 500/df500", 450, 1300),
  drill("Festool", "Festool ETS 150 ponceuse excentrique", "festool | ets 150/ets150", 180, 600, {
    exclude: ["ets ec"],
  }),
  drill("Festool", "Festool CTL MIDI aspirateur", "festool | ctl midi", 250, 800),
  drill("Fein", "Fein MultiMaster outil multifonction", "fein | multimaster", 120, 600),
  drill("Dremel", "Dremel 4000 outil multifonction", "dremel 4000", 50, 200),
  measure(
    "Bosch Professional",
    "Bosch Professional GLL 3-80 laser lignes",
    "gll 3-80/gll3-80/gll 3 80",
    150,
    650,
  ),
  measure("Leica", "Leica Disto D2 télémètre laser", "disto | d2", 60, 220),
  garden("Stihl", "Stihl MS 170 tronçonneuse", "stihl | ms 170/ms170", 90, 330, {
    exclude: ["chaine seule", "guide seul"],
  }),
  garden("Stihl", "Stihl MS 181 tronçonneuse", "stihl | ms 181/ms181", 130, 450, {
    exclude: ["chaine seule", "guide seul"],
  }),
  garden("Husqvarna", "Husqvarna Automower 305 robot tondeuse", "automower | 305", 300, 1300),
  garden("Worx", "Worx Landroid robot tondeuse", "worx | landroid", 250, 1300, {
    exclude: ["lame seule", "batterie seule"],
  }),
  garden("Makita", "Makita DUB184 souffleur 18 V", "dub184", 50, 220),
  garden("Kärcher", "Kärcher WD 5 aspirateur eau et poussière", "karcher | wd 5/wd5", 80, 300, {
    exclude: ["filtre seul", "sac"],
  }),
];
