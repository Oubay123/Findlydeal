import { define } from "./define";

const seat = define("furniture", "Siège");
const storage = define("furniture", "Meuble");
const light = define("furniture", "Luminaire");
const bed = define("furniture", "Literie");

export const furnitureCatalogue = [
  seat("Herman Miller", "Herman Miller Aeron", "herman miller aeron", 250, 2200, {
    exclude: ["accoudoir", "roulette", "verin"],
  }),
  seat("Herman Miller", "Herman Miller Sayl", "herman miller sayl", 180, 1100),
  seat("Steelcase", "Steelcase Leap V2", "steelcase leap", 180, 1600),
  seat("Steelcase", "Steelcase Gesture", "steelcase gesture", 280, 1900),
  seat("Secretlab", "Secretlab Titan Evo", "secretlab titan", 200, 900),
  seat("IKEA", "IKEA Poäng fauteuil", "poang | fauteuil", 30, 250, {
    exclude: ["housse", "coussin seul"],
  }),
  seat("IKEA", "IKEA Markus chaise de bureau", "ikea markus", 60, 320),
  seat("IKEA", "IKEA Strandmon fauteuil", "strandmon", 90, 480, { exclude: ["housse"] }),
  seat("Vitra", "Vitra Eames Plastic Chair DSW", "vitra | dsw", 150, 900),
  seat("Vitra", "Vitra Eames Lounge Chair", "vitra | lounge chair", 3500, 13000),
  seat("Kartell", "Kartell Louis Ghost", "kartell louis ghost", 110, 600),
  seat("Kartell", "Kartell Masters chaise", "kartell masters", 90, 480),
  seat("Tolix", "Tolix chaise A", "tolix | chaise", 90, 550),
  seat("Fatboy", "Fatboy Original pouf", "fatboy original", 80, 420, { exclude: ["housse"] }),
  seat("Hay", "Hay About A Chair AAC22", "hay | aac22/aac 22/about a chair", 110, 650),
  seat("Fermob", "Fermob Bistro chaise", "fermob bistro | chaise", 40, 250),
  seat("Fermob", "Fermob Luxembourg fauteuil", "fermob luxembourg | fauteuil", 130, 700),
  seat("Stressless", "Stressless fauteuil relax", "stressless | fauteuil", 250, 3000),
  seat("Ligne Roset", "Ligne Roset Togo", "ligne roset togo/togo ligne roset", 600, 6500),

  storage("USM", "USM Haller buffet", "usm haller", 350, 4500),
  storage("String", "String Pocket étagère", "string pocket", 80, 320),
  storage("IKEA", "IKEA Kallax 4x4", "kallax | 4x4/147", 50, 320),
  storage("IKEA", "IKEA Billy bibliothèque", "ikea billy | bibliotheque/etagere", 25, 260),
  storage(
    "IKEA",
    "IKEA Bekant bureau assis-debout",
    "bekant | assis debout/electrique/reglable",
    150,
    800,
  ),
  storage("IKEA", "IKEA Malm commode 6 tiroirs", "malm | commode | 6", 60, 350),
  storage("Flexispot", "Flexispot E7 bureau assis-debout", "flexispot e7", 200, 850),
  storage("Montana", "Montana étagère", "montana | etagere/module/furniture", 180, 2200),
  storage("Kartell", "Kartell Componibili", "kartell componibili", 70, 420),
  storage("Vitra", "Vitra Uten.Silo", "uten silo/utensilo", 150, 650),

  light("Artemide", "Artemide Tolomeo lampe de bureau", "artemide tolomeo", 110, 650),
  light("Artemide", "Artemide Nesso", "artemide nesso", 180, 750),
  light("Flos", "Flos Arco", "flos arco", 900, 4200),
  light("Flos", "Flos IC Lights", "flos ic", 200, 1100),
  light("Louis Poulsen", "Louis Poulsen PH 5", "louis poulsen ph 5/louis poulsen ph5", 350, 1700),
  light("Louis Poulsen", "Louis Poulsen Panthella", "panthella", 250, 1400),
  light("Jieldé", "Jieldé Signal lampe", "jielde | signal", 150, 700),
  light("Anglepoise", "Anglepoise Original 1227", "anglepoise | 1227", 110, 550),
  light("&Tradition", "&Tradition Flowerpot VP3", "flowerpot vp3", 130, 550),
  light("Dyson", "Dyson Solarcycle Morph", "dyson | solarcycle/lightcycle", 220, 950),

  bed("Emma", "Emma Original matelas 140x190", "emma | matelas | 140", 140, 800),
  bed("Tediber", "Tediber matelas 140x190", "tediber | 140", 220, 1000),
  bed("Simba", "Simba Hybrid matelas 160x200", "simba | 160", 280, 1700),
];
