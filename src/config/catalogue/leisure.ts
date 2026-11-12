import { define } from "./define";

const camera = define("leisure", "Appareil photo");
const music = define("leisure", "Instrument");
// A set or a puzzle is described by its number of pieces: not a spare part.
const toy = define("leisure", "Jeu", { allow: ["piece", "pieces"] });
const outdoor = define("leisure", "Équipement de plein air");

export const leisureCatalogue = [
  camera("Sony", "Sony A7 III boîtier", "sony | a7 iii/a7iii/alpha 7 iii/ilce-7m3", 700, 2600, {
    exclude: ["a7r", "a7s", "objectif seul"],
  }),
  camera("Sony", "Sony A6400", "sony | a6400", 450, 1500),
  camera("Sony", "Sony ZV-E10", "zve10/zv-e10", 380, 1200),
  camera("Canon", "Canon EOS R6", "canon | eos r6/eosr6", 900, 3600, { exclude: ["mark ii"] }),
  camera("Canon", "Canon EOS 90D", "canon | 90d", 600, 2000),
  camera("Fujifilm", "Fujifilm X-T4", "fujifilm xt4/fujifilm x-t4/fuji xt4/fuji x-t4", 750, 2600),
  camera("Fujifilm", "Fujifilm X100V", "x100v", 900, 2700),
  camera("Fujifilm", "Fujifilm Instax Mini 12", "instax mini 12", 40, 160),
  camera("Nikon", "Nikon Z6 II", "nikon z6 ii/nikon z6ii/nikon z 6ii", 800, 2900),
  camera("GoPro", "GoPro HERO12 Black", "gopro | hero 12/hero12", 180, 650),
  camera("GoPro", "GoPro HERO11 Black", "gopro | hero 11/hero11", 140, 600, { exclude: ["mini"] }),
  camera("DJI", "DJI Mini 3 Pro", "dji mini 3 pro", 380, 1400),
  camera("DJI", "DJI Mini 4 Pro", "dji mini 4 pro", 500, 1600),
  camera("DJI", "DJI Osmo Pocket 3", "osmo pocket 3", 320, 1000),
  camera("Insta360", "Insta360 X3", "insta360 x3", 200, 700),

  music("Fender", "Fender Player Stratocaster", "fender | player | stratocaster/strat", 380, 1400),
  music("Fender", "Fender Player Telecaster", "fender | player | telecaster/tele", 380, 1400),
  music(
    "Squier",
    "Squier Classic Vibe Stratocaster",
    "squier | classic vibe | stratocaster/strat",
    200,
    700,
  ),
  music("Gibson", "Gibson Les Paul Standard", "gibson les paul standard", 1100, 4500),
  music("Epiphone", "Epiphone Les Paul Standard", "epiphone les paul standard", 250, 950),
  music("Yamaha", "Yamaha FG800", "yamaha fg800", 110, 450),
  music("Yamaha", "Yamaha P-45 piano numérique", "yamaha p45/yamaha p-45", 220, 750),
  music("Yamaha", "Yamaha P-125 piano numérique", "yamaha p125/yamaha p-125", 350, 1100),
  music("Roland", "Roland FP-30X", "roland fp30x/roland fp-30x", 420, 1300),
  music("Boss", "Boss Katana 50 MkII", "boss katana 50", 140, 480),
  music("Focusrite", "Focusrite Scarlett 2i2", "scarlett 2i2", 60, 300),
  music("Shure", "Shure SM7B", "shure sm7b", 220, 700),
  music(
    "Teenage Engineering",
    "Teenage Engineering OP-1",
    "teenage engineering | op1/op-1",
    700,
    2700,
  ),
  music("Pioneer DJ", "Pioneer DJ DDJ-FLX4", "ddjflx4/ddj-flx4", 180, 520),
  music("Rega", "Rega Planar 1 platine vinyle", "rega planar 1", 180, 650),
  music("Audio-Technica", "Audio-Technica AT-LP120X", "atlp120/at-lp120", 160, 580),

  toy("LEGO", "LEGO Star Wars Millennium Falcon 75192", "lego | 75192", 450, 1400),
  toy("LEGO", "LEGO Icons Orchidée 10311", "lego | 10311", 25, 110),
  toy("LEGO", "LEGO Technic Porsche 911 GT3 RS 42056", "lego | 42056", 300, 1300),
  toy("LEGO", "LEGO Ideas Machine à écrire 21327", "lego | 21327", 150, 520),
  toy("LEGO", "LEGO Titanic 10294", "lego | 10294", 450, 1200),
  toy("Kosmos", "Catan jeu de base", "catan | base/jeu de base/colons", 15, 90, {
    exclude: ["extension"],
  }),
  toy("Days of Wonder", "Les Aventuriers du Rail Europe", "aventuriers du rail | europe", 20, 100),
  toy("Ravensburger", "Ravensburger puzzle 5000 pièces", "ravensburger | 5000", 25, 180),
  toy("Anbernic", "Anbernic RG35XX", "anbernic rg35xx", 35, 160),
  toy("Analogue", "Analogue Pocket", "analogue pocket", 220, 750),

  outdoor("Weber", "Weber Q 1200", "weber | q1200/q 1200", 130, 600),
  outdoor("Weber", "Weber Master-Touch 57 cm", "weber master touch", 150, 700),
  outdoor("Big Green Egg", "Big Green Egg Large", "big green egg | large", 700, 3200),
  outdoor("Thule", "Thule Motion XT coffre de toit", "thule motion xt", 350, 1500),
  outdoor("Yeti", "Yeti Tundra 45", "yeti tundra 45", 200, 700),
  outdoor("MSR", "MSR Hubba Hubba NX", "msr hubba hubba", 250, 900),
  outdoor("Osprey", "Osprey Atmos AG 65", "osprey atmos | 65", 140, 550),
  outdoor("Stanley", "Stanley Quencher 1,2 L", "stanley quencher", 25, 110),
];
