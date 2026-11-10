import { define } from "./define";

const shoe = define("fashion", "Chaussures");
const coat = define("fashion", "Veste");
const garment = define("fashion", "Vêtement");
const bag = define("fashion", "Sac");
const accessory = define("fashion", "Accessoire");

const KIDS = ["enfant", "bebe", "junior", "kids", "cadet"];

export const fashionCatalogue = [
  shoe("Nike", "Nike Air Force 1 '07", "air force 1", 40, 220, { exclude: KIDS }),
  shoe("Nike", "Nike Dunk Low", "nike dunk low", 50, 320, { exclude: KIDS }),
  shoe("Nike", "Nike Air Max 90", "air max 90", 45, 280, { exclude: KIDS }),
  shoe("Nike", "Nike Air Jordan 1 Mid", "jordan 1 mid", 60, 330, { exclude: KIDS }),
  shoe("Adidas", "Adidas Stan Smith", "stan smith", 30, 200, { exclude: KIDS }),
  shoe("Adidas", "Adidas Samba OG", "adidas samba", 50, 250, { exclude: KIDS }),
  shoe("Adidas", "Adidas Gazelle", "adidas gazelle", 40, 220, { exclude: KIDS }),
  shoe("New Balance", "New Balance 574", "new balance 574", 35, 220, { exclude: KIDS }),
  shoe("New Balance", "New Balance 990v5", "new balance 990 | v5", 90, 420),
  shoe("New Balance", "New Balance 2002R", "new balance 2002r", 70, 320),
  shoe("Converse", "Converse Chuck Taylor All Star", "converse | chuck taylor/all star", 25, 160, {
    exclude: KIDS,
  }),
  shoe("Veja", "Veja V-10", "veja v10/veja v-10", 45, 240),
  shoe("Veja", "Veja Campo", "veja campo", 45, 240),
  shoe("Dr. Martens", "Dr. Martens 1460", "martens 1460", 50, 320, { exclude: KIDS }),
  shoe("Dr. Martens", "Dr. Martens 1461", "martens 1461", 45, 280),
  shoe("Birkenstock", "Birkenstock Arizona", "birkenstock arizona", 30, 200, { exclude: KIDS }),
  shoe("Birkenstock", "Birkenstock Boston", "birkenstock boston", 50, 260),
  shoe("Salomon", "Salomon XT-6", "salomon xt6/salomon xt-6", 80, 330),
  shoe(
    "Timberland",
    "Timberland 6-Inch Premium Boot",
    "timberland | 6 inch/premium/6-inch",
    60,
    350,
    {
      exclude: KIDS,
    },
  ),
  shoe("Clarks", "Clarks Desert Boot", "clarks desert boot", 45, 260),
  shoe("Paraboot", "Paraboot Michael", "paraboot michael", 160, 750),
  shoe("Hoka", "Hoka Clifton 9", "hoka clifton 9", 60, 260),
  shoe("On", "On Cloudmonster", "cloudmonster", 70, 280),

  coat("The North Face", "The North Face Nuptse 1996", "north face | nuptse", 110, 620, {
    exclude: KIDS,
  }),
  coat("Patagonia", "Patagonia Better Sweater", "patagonia better sweater", 45, 250),
  coat("Patagonia", "Patagonia Nano Puff", "patagonia nano puff", 70, 380),
  coat("Barbour", "Barbour Bedale", "barbour bedale", 90, 520),
  coat("Barbour", "Barbour Beaufort", "barbour beaufort", 100, 600),
  coat("Carhartt", "Carhartt Detroit Jacket", "carhartt detroit", 90, 480),
  coat("Canada Goose", "Canada Goose Expedition Parka", "canada goose expedition", 350, 2200),
  coat("Arc'teryx", "Arc'teryx Beta LT", "arcteryx beta lt", 190, 850),
  coat("Levi's", "Levi's Trucker Jacket", "levis | trucker", 35, 260),
  coat("Schott", "Schott Perfecto", "schott perfecto", 180, 1300),
  coat("Moncler", "Moncler Maya doudoune", "moncler maya", 450, 2600),

  garment("Levi's", "Levi's 501 Original", "levis 501", 25, 220, { exclude: KIDS }),
  garment("Levi's", "Levi's 511 Slim", "levis 511", 25, 190),
  garment(
    "A.P.C.",
    "A.P.C. Petit Standard jean",
    "apc petit standard/a.p.c. petit standard",
    60,
    330,
  ),
  garment("Ralph Lauren", "Ralph Lauren polo classique", "ralph lauren | polo", 25, 220, {
    exclude: KIDS,
  }),
  garment("Lacoste", "Lacoste polo L.12.12", "lacoste | l1212/l.12.12", 30, 220),
  garment("Saint James", "Saint James marinière", "saint james | mariniere", 25, 170),
  garment("Uniqlo", "Uniqlo Ultra Light Down", "uniqlo ultra light down", 25, 160),
  garment("Fjällräven", "Fjällräven Greenland veste", "fjallraven greenland", 80, 420),

  bag("Longchamp", "Longchamp Le Pliage", "longchamp | pliage", 35, 300),
  bag("Fjällräven", "Fjällräven Kånken", "fjallraven kanken", 30, 190),
  bag("Eastpak", "Eastpak Padded Pak'r", "eastpak padded", 15, 110),
  bag("Rimowa", "Rimowa Essential Cabin", "rimowa essential cabin", 300, 1200),
  bag("Louis Vuitton", "Louis Vuitton Speedy 30", "louis vuitton speedy 30", 350, 2800),
  bag("Louis Vuitton", "Louis Vuitton Neverfull MM", "louis vuitton neverfull mm", 600, 3200),
  bag("Chanel", "Chanel Classique Timeless", "chanel | timeless/classique", 2200, 15000),
  bag("Hermès", "Hermès Evelyne", "hermes evelyne", 1300, 6500),
  bag("Polène", "Polène Numéro Un", "polene | numero un", 180, 750),
  bag("Sézane", "Sézane Milo sac", "sezane milo", 110, 550),

  accessory("Ray-Ban", "Ray-Ban Wayfarer", "ray ban wayfarer", 45, 320),
  accessory("Ray-Ban", "Ray-Ban Aviator", "ray ban aviator", 45, 320),
  accessory("Persol", "Persol 714", "persol 714", 110, 550),
  accessory("Hermès", "Hermès carré de soie 90", "hermes | carre | 90", 130, 900),
  accessory("Montblanc", "Montblanc Meisterstück 149", "montblanc | 149", 280, 1500),
];
