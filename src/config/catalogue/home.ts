import { define } from "./define";

const vacuum = define("home-appliances", "Aspirateur");
const kitchen = define("home-appliances", "Appareil de cuisine");
const coffee = define("home-appliances", "Machine à café");
const home = define("home-appliances", "Appareil ménager");

export const homeAppliancesCatalogue = [
  vacuum("Dyson", "Dyson V8", "dyson v8", 110, 600, { exclude: ["batterie", "filtre", "v8 slim"] }),
  vacuum("Dyson", "Dyson V11", "dyson v11", 180, 900, { exclude: ["batterie", "filtre"] }),
  vacuum("Dyson", "Dyson V12 Detect Slim", "v12 | detect", 250, 1000),
  vacuum("Dyson", "Dyson Gen5detect", "gen5detect/gen5 detect/gen 5 detect", 380, 1300),
  vacuum("Roborock", "Roborock S8", "roborock s8", 250, 1400, { exclude: ["brosse", "filtre"] }),
  vacuum("Roborock", "Roborock Q7 Max", "roborock q7 max", 160, 800),
  vacuum("iRobot", "iRobot Roomba j7", "roomba j7", 170, 1100),
  vacuum("Dreame", "Dreame L10s Ultra", "dreame l10s ultra", 280, 1500),
  vacuum("Kärcher", "Kärcher K5 nettoyeur haute pression", "karcher k5/karcher k 5", 140, 750),

  kitchen("Vorwerk", "Vorwerk Thermomix TM7", "thermomix tm7", 1000, 2000, {
    exclude: ["varoma seul", "bol seul", "couvercle"],
  }),
  kitchen("Vorwerk", "Vorwerk Thermomix TM6", "thermomix tm6", 550, 2200, {
    exclude: ["bol", "varoma"],
  }),
  kitchen("Vorwerk", "Vorwerk Thermomix TM5", "thermomix tm5", 280, 1500, {
    exclude: ["bol", "varoma"],
  }),
  kitchen("KitchenAid", "KitchenAid Artisan 4,8 L", "kitchenaid artisan", 220, 1100, {
    exclude: ["bol", "fouet", "mini"],
  }),
  kitchen("Moulinex", "Moulinex Cookeo+ Connect", "cookeo | connect", 90, 500, {
    exclude: ["cuve"],
  }),
  kitchen("Moulinex", "Moulinex Companion XL", "companion xl", 250, 1300),
  kitchen("Magimix", "Magimix Cook Expert", "magimix cook expert", 450, 1900),
  kitchen("Kenwood", "Kenwood Cooking Chef XL", "cooking chef xl", 450, 2200),
  kitchen("Philips", "Philips Airfryer XXL", "airfryer xxl", 90, 500),
  kitchen("Ninja", "Ninja Foodi 11-en-1 OL750", "ninja | ol750", 130, 550),
  kitchen("Ninja", "Ninja Creami", "ninja creami", 110, 450),
  kitchen("Ooni", "Ooni Koda 12 four à pizza", "ooni koda 12", 170, 650),
  kitchen("SMEG", "SMEG grille-pain TSF01", "smeg | tsf01", 70, 320),
  kitchen("SMEG", "SMEG bouilloire KLF03", "smeg | klf03", 70, 320),
  kitchen("SodaStream", "SodaStream Duo", "sodastream duo", 60, 300),
  kitchen("Vitamix", "Vitamix E310", "vitamix e310", 200, 800),

  coffee("De'Longhi", "De'Longhi Magnifica S ECAM22.110", "magnifica s | ecam22/ecam 22", 150, 700),
  coffee("De'Longhi", "De'Longhi Dedica EC685", "dedica | ec685", 90, 420),
  coffee("Sage", "Sage Bambino Plus", "bambino plus", 200, 750),
  coffee("Jura", "Jura E8", "jura e8", 450, 2200),
  coffee("Philips", "Philips LatteGo série 3200", "lattego | 3200/ep3241/ep3246", 250, 1000),
  coffee("Nespresso", "Nespresso Vertuo Next", "vertuo next", 45, 280),
  coffee("Rocket", "Rocket Appartamento", "rocket appartamento", 800, 2700),

  home("Dyson", "Dyson Purifier Cool TP07", "dyson | tp07", 220, 950),
  home(
    "Philips",
    "Philips Hue kit de démarrage E27",
    "philips hue | starter/demarrage/kit | e27",
    60,
    350,
  ),
  home("Google", "Google Nest Learning Thermostat", "nest learning", 100, 480),
  home("Ring", "Ring Video Doorbell 4", "ring | doorbell 4", 70, 380),
  home("Laurastar", "Laurastar Lift", "laurastar lift", 130, 800),
];
