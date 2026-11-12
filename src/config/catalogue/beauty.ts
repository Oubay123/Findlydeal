import { define } from "./define";

const hair = define("beauty", "Appareil de coiffure", { exclude: ["embout seul", "accessoire"] });
const care = define("beauty", "Appareil de soin");

export const beautyCatalogue = [
  hair("Dyson", "Dyson Airwrap", "dyson airwrap", 220, 900, { exclude: ["embout", "accessoire"] }),
  hair("Dyson", "Dyson Supersonic", "dyson supersonic", 160, 750, { exclude: ["embout"] }),
  hair("Dyson", "Dyson Airstrait", "dyson airstrait", 250, 650),
  hair("Dyson", "Dyson Corrale", "dyson corrale", 180, 550),
  hair("ghd", "ghd Platinum+", "ghd platinum", 100, 480),
  hair("ghd", "ghd Chronos", "ghd chronos", 120, 380),
  hair("Shark", "Shark FlexStyle", "shark flexstyle/shark flex style", 120, 400),

  care("Philips", "Philips Lumea Prestige", "lumea prestige", 150, 850),
  care("Braun", "Braun Silk-expert Pro 5", "braun | silk expert pro 5/silk-expert pro 5", 150, 500),
  care("Braun", "Braun Series 9 Pro", "braun | series 9/serie 9 | pro", 150, 750),
  care("Oral-B", "Oral-B iO Series 9", "oral b io | 9/io9", 110, 550, {
    exclude: ["brossette", "tete"],
  }),
  care(
    "Philips",
    "Philips Sonicare DiamondClean 9000",
    "sonicare | diamondclean/diamond clean | 9000",
    80,
    320,
    { exclude: ["brossette", "tete"] },
  ),
  care("Foreo", "Foreo Luna 4", "foreo | luna 4", 60, 300, { exclude: ["mini", "go"] }),
];
