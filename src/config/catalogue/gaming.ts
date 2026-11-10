import { define } from "./define";

const consoleDef = define("gaming", "Console de jeux");
const handheld = define("gaming", "Console portable");
const retro = define("gaming", "Console rétro");
const pad = define("gaming", "Manette");
const game = define("gaming", "Jeu vidéo");

const NOT_A_CONSOLE = ["manette seule", "jeu seul", "coque", "housse", "boite vide", "carton vide"];

/**
 * Video games: a market where second hand is the norm (consoles, retro
 * machines, cartridges). The current PlayStation 5 Slim and Xbox Series X
 * entries live in the described catalogue (`catalogue-ebay.ts`).
 */
export const gamingCatalogue = [
  consoleDef("Nintendo", "Nintendo Switch 2", "switch 2", 300, 700, {
    exclude: [...NOT_A_CONSOLE, "jeu", "compatible"],
  }),
  consoleDef(
    "Nintendo",
    "Nintendo Switch (modèle 2019)",
    "nintendo switch | 2019/v2/hac-001/hac001/autonomie",
    120,
    400,
    {
      query: "Nintendo Switch V2",
      exclude: [...NOT_A_CONSOLE, "oled", "lite", "switch 2"],
    },
  ),
  consoleDef("Sony", "Sony PlayStation 4 Pro 1 To", "ps4 pro/playstation 4 pro", 120, 400, {
    exclude: NOT_A_CONSOLE,
  }),
  consoleDef(
    "Sony",
    "Sony PlayStation 4 Slim 500 Go",
    "ps4 slim/playstation 4 slim | 500",
    80,
    280,
    {
      exclude: NOT_A_CONSOLE,
    },
  ),
  consoleDef("Microsoft", "Microsoft Xbox One X 1 To", "xbox one x", 110, 380, {
    exclude: NOT_A_CONSOLE,
  }),
  handheld("Valve", "Valve Steam Deck 512 Go", "steam deck | 512", 260, 900),
  handheld("Valve", "Valve Steam Deck OLED 512 Go", "steam deck oled | 512", 380, 900),
  handheld("Asus", "Asus ROG Ally", "rog ally", 300, 900, { exclude: ["ally x"] }),
  handheld("Nintendo", "Nintendo New 3DS XL", "new 3ds xl/new nintendo 3ds xl", 110, 400, {
    exclude: NOT_A_CONSOLE,
  }),
  handheld("Sony", "Sony PS Vita", "ps vita/playstation vita", 90, 400, { exclude: NOT_A_CONSOLE }),
  retro(
    "Nintendo",
    "Nintendo Game Boy Advance SP",
    "game boy advance sp/gameboy advance sp/gba sp",
    50,
    300,
    {
      exclude: NOT_A_CONSOLE,
    },
  ),
  retro("Nintendo", "Nintendo GameCube", "gamecube/game cube", 70, 350, { exclude: NOT_A_CONSOLE }),
  retro("Nintendo", "Nintendo 64", "nintendo 64/n64", 70, 400, { exclude: NOT_A_CONSOLE }),
  retro("Nintendo", "Super Nintendo (SNES)", "super nintendo/snes", 70, 400, {
    exclude: [...NOT_A_CONSOLE, "mini", "classic"],
  }),
  retro(
    "Nintendo",
    "Nintendo Classic Mini : Super Nintendo",
    "super nintendo | mini/classic",
    40,
    160,
  ),
  retro("Sony", "Sony PlayStation 2 Slim", "ps2 slim/playstation 2 slim", 40, 200, {
    exclude: NOT_A_CONSOLE,
  }),
  pad("Sony", "Manette Sony DualSense (PS5)", "dualsense", 30, 110, {
    exclude: ["edge", "coque", "skin"],
  }),
  pad("Sony", "Manette Sony DualSense Edge", "dualsense edge", 110, 280),
  pad("Microsoft", "Manette Xbox Elite Series 2", "elite | series 2", 70, 220, {
    exclude: ["coque", "batterie seule"],
  }),
  pad("Nintendo", "Manette Nintendo Switch Pro", "switch pro | manette/controller", 30, 90, {
    exclude: ["coque"],
  }),
  game("Nintendo", "Mario Kart 8 Deluxe (Switch)", "mario kart 8 deluxe", 25, 70, {
    exclude: ["boite vide", "pass", "code"],
  }),
  game(
    "Nintendo",
    "The Legend of Zelda: Tears of the Kingdom (Switch)",
    "zelda | tears of the kingdom",
    25,
    90,
    {
      exclude: ["collector", "amiibo", "boite vide"],
    },
  ),
  game(
    "Nintendo",
    "Animal Crossing: New Horizons (Switch)",
    "animal crossing | new horizons",
    20,
    70,
    {
      exclude: ["amiibo", "carte", "boite vide"],
    },
  ),
  game("Nintendo", "Super Mario Bros. Wonder (Switch)", "mario | wonder", 25, 70, {
    exclude: ["boite vide"],
  }),
  game("Nintendo", "Pokémon Écarlate (Switch)", "pokemon | ecarlate", 20, 70, {
    exclude: ["violet", "carte", "boite vide"],
  }),
];
