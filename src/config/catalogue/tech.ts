import { define } from "./define";

const phone = define("tech", "Smartphone");
const laptop = define("tech", "Ordinateur portable");
const tablet = define("tech", "Tablette");
const audio = define("tech", "Casque ou écouteurs");
// Consoles are in the "gaming" category (`gaming.ts`).
const consoleDef = define("gaming", "Console de jeux");
const screen = define("tech", "Écran");
const gear = define("tech", "Appareil");

const PRO = ["pro", "max", "plus", "mini"];

export const techCatalogue = [
  // Smartphones
  phone("Apple", "Apple iPhone 11 64 Go", "iphone 11 | 64", 90, 400, { exclude: PRO }),
  phone("Apple", "Apple iPhone 12 64 Go", "iphone 12 | 64", 110, 500, { exclude: PRO }),
  phone("Apple", "Apple iPhone 12 Pro 128 Go", "iphone 12 pro | 128", 170, 700, {
    exclude: ["max"],
  }),
  phone("Apple", "Apple iPhone 13 mini 128 Go", "iphone 13 mini | 128", 170, 650),
  phone("Apple", "Apple iPhone 13 Pro 128 Go", "iphone 13 pro | 128", 260, 900, {
    exclude: ["max"],
  }),
  phone("Apple", "Apple iPhone 14 128 Go", "iphone 14 | 128", 250, 900, { exclude: PRO }),
  phone("Apple", "Apple iPhone 14 Pro 128 Go", "iphone 14 pro | 128", 380, 1200, {
    exclude: ["max"],
  }),
  phone("Apple", "Apple iPhone 15 128 Go", "iphone 15 | 128", 380, 1100, { exclude: PRO }),
  phone("Apple", "Apple iPhone 15 Pro 128 Go", "iphone 15 pro | 128", 520, 1500, {
    exclude: ["max"],
  }),
  phone("Apple", "Apple iPhone 16 128 Go", "iphone 16 | 128", 480, 1200, {
    exclude: [...PRO, "16e", "16 e"],
  }),
  phone("Apple", "Apple iPhone 15 Pro Max 256 Go", "iphone 15 pro max | 256", 650, 1800),
  phone("Apple", "Apple iPhone SE 2022 64 Go", "iphone se | 64 | 2022/3e/3rd/3eme/2022", 110, 500),
  phone("Samsung", "Samsung Galaxy S22 128 Go", "galaxy s22/samsung s22 | 128", 140, 650, {
    exclude: ["ultra", "plus"],
  }),
  phone("Samsung", "Samsung Galaxy S23 Ultra 256 Go", "s23 ultra | 256", 400, 1500),
  phone("Samsung", "Samsung Galaxy S24 128 Go", "galaxy s24/samsung s24 | 128", 300, 1000, {
    exclude: ["ultra", "plus", "fe"],
  }),
  phone("Samsung", "Samsung Galaxy S24 Ultra 256 Go", "s24 ultra | 256", 550, 1800),
  phone("Samsung", "Samsung Galaxy A54 5G 128 Go", "a54 | 128", 120, 500),
  phone("Samsung", "Samsung Galaxy Z Flip5 256 Go", "z flip 5/flip5 | 256", 280, 1300),
  phone("Google", "Google Pixel 7a 128 Go", "pixel 7a", 140, 550),
  phone("Google", "Google Pixel 7 128 Go", "pixel 7 | 128", 130, 650, { exclude: ["pro", "7a"] }),
  phone("Google", "Google Pixel 8 Pro 128 Go", "pixel 8 pro | 128", 300, 1100),
  phone("Google", "Google Pixel 8a 128 Go", "pixel 8a", 220, 600),
  phone("Xiaomi", "Xiaomi Redmi Note 13 Pro 5G 256 Go", "redmi note 13 pro | 256", 130, 500, {
    exclude: ["plus"],
  }),
  phone("Nothing", "Nothing Phone (2) 256 Go", "nothing phone 2/phone (2) | 256", 220, 750, {
    exclude: ["2a"],
  }),
  phone("Fairphone", "Fairphone 4 128 Go", "fairphone 4", 130, 650),

  // Laptops
  laptop("Apple", 'Apple MacBook Air M1 13" 256 Go', "macbook air | m1 | 256", 330, 1300),
  laptop("Apple", 'Apple MacBook Pro 14" M1 Pro 512 Go', "macbook pro | 14 | m1 pro", 700, 2600),
  laptop("Apple", 'Apple MacBook Pro 13" M2 256 Go', "macbook pro | 13 | m2 | 256", 550, 1900),
  laptop("Lenovo", "Lenovo ThinkPad T14 Gen 2", "thinkpad t14 | gen 2/g2", 220, 1500, {
    exclude: ["t14s"],
  }),
  laptop("Lenovo", "Lenovo ThinkPad X1 Carbon Gen 9", "x1 carbon | gen 9/g9/9th", 320, 2200),
  laptop("Dell", "Dell Latitude 7420", "latitude 7420", 200, 1500),
  laptop("HP", "HP EliteBook 840 G8", "elitebook 840 g8", 220, 1500),
  laptop("Microsoft", 'Microsoft Surface Laptop 5 13,5"', "surface laptop 5", 350, 1600),
  laptop("Microsoft", "Microsoft Surface Pro 9", "surface pro 9", 380, 1700),
  laptop("Asus", "Asus ROG Zephyrus G14 (2023)", "zephyrus g14", 600, 2600),

  // Tablets and e-readers
  tablet(
    "Apple",
    "Apple iPad 9 (2021) 64 Go",
    "ipad 9/ipad (9/ipad 2021/9e generation/9eme generation/9th gen | 64",
    140,
    550,
    {
      exclude: ["air", "pro", "mini"],
    },
  ),
  tablet(
    "Apple",
    "Apple iPad 10 (2022) 64 Go",
    "ipad 10/ipad (10/ipad 2022/10e generation/10eme generation/10th gen | 64",
    200,
    700,
    {
      exclude: ["air", "pro", "mini", "10,2", "10.2"],
    },
  ),
  tablet(
    "Apple",
    "Apple iPad mini 6 64 Go",
    "ipad mini 6/ipad mini (6/ipad mini 2021 | 64",
    240,
    850,
  ),
  tablet("Apple", 'Apple iPad Pro 11" M2 128 Go', "ipad pro | 11 | m2 | 128", 480, 1500),
  tablet("Samsung", "Samsung Galaxy Tab S9 128 Go", "tab s9 | 128", 350, 1300, {
    exclude: ["fe", "ultra", "plus"],
  }),
  tablet("Amazon", "Amazon Kindle Paperwhite (11e génération)", "kindle paperwhite", 60, 260, {
    query: "Kindle Paperwhite 11e génération",
  }),
  tablet("Kobo", "Kobo Libra 2", "kobo libra 2", 80, 300),

  // Audio
  audio(
    "Apple",
    "Apple AirPods Pro 2",
    "airpods pro 2/airpods pro (2/pro 2e/pro 2nd/pro 2eme/usb-c | airpods pro",
    90,
    420,
  ),
  audio("Apple", "Apple AirPods Max", "airpods max", 220, 900),
  audio("Sony", "Sony WH-1000XM4", "wh1000xm4", 110, 520),
  audio("Sony", "Sony WF-1000XM5", "wf1000xm5", 110, 480),
  audio("Bose", "Bose QuietComfort 45", "quietcomfort 45/qc45/qc 45", 110, 500),
  audio("Sennheiser", "Sennheiser Momentum 4 Wireless", "momentum 4", 140, 580),
  audio("Sonos", "Sonos Era 100", "sonos era 100", 130, 450),
  audio("Sonos", "Sonos Move 2", "sonos move 2", 220, 750),
  audio("JBL", "JBL Charge 5", "jbl charge 5", 70, 320),
  audio("Marshall", "Marshall Stanmore III", "stanmore iii/stanmore 3", 170, 650),

  // Consoles
  consoleDef(
    "Sony",
    "Sony PlayStation 5 édition numérique",
    "ps5/playstation 5 | digital/numerique",
    230,
    750,
    {
      exclude: ["manette", "jeu"],
    },
  ),
  consoleDef("Microsoft", "Microsoft Xbox Series S 512 Go", "xbox series s", 130, 500, {
    exclude: ["manette"],
  }),
  consoleDef("Nintendo", "Nintendo Switch OLED", "switch oled", 170, 600, {
    exclude: ["jeu", "coque"],
  }),
  consoleDef("Nintendo", "Nintendo Switch Lite", "switch lite", 90, 380, {
    exclude: ["jeu", "coque"],
  }),
  consoleDef("Meta", "Meta Quest 3 128 Go", "quest 3 | 128", 260, 850, { exclude: ["3s"] }),
  consoleDef("Sony", "Sony PlayStation Portal", "playstation portal/ps portal", 130, 400),

  // Screens, TV, peripherals
  screen("LG", "LG OLED C3 55 pouces", "oled | c3 | 55", 600, 2500),
  screen("Samsung", "Samsung The Frame 55 pouces", "the frame | 55", 450, 2200),
  screen("Dell", "Dell UltraSharp U2723QE", "u2723qe", 280, 1000),
  screen("LG", "LG UltraGear 27GP850", "27gp850", 180, 700),
  gear("Logitech", "Logitech MX Master 3S", "mx master 3s", 50, 200),
  gear("Apple", "Apple TV 4K (2022) 64 Go", "apple tv 4k | 2022/3e/3rd/3eme", 80, 300),
  gear("Synology", "Synology DS224+", "ds224+/ds224 +/ds224plus", 250, 700),

  phone("Apple", "Apple iPhone 16 Pro 128 Go", "iphone 16 pro | 128", 600, 1400, {
    exclude: ["max", "coque"],
  }),
  phone("Apple", "Apple iPhone 17 256 Go", "iphone 17 | 256", 650, 1300, {
    exclude: ["pro", "air", "max", "coque"],
  }),
  phone("Samsung", "Samsung Galaxy S25 128 Go", "galaxy s25/s25 | 128", 400, 1000, {
    exclude: ["ultra", "plus", "edge", "fe", "coque"],
  }),
  phone("Google", "Google Pixel 9 128 Go", "pixel 9 | 128", 300, 900, {
    exclude: ["pro", "xl", "fold", "9a", "coque"],
  }),
  laptop("Apple", 'Apple MacBook Air M4 13" 256 Go', "macbook air | m4 | 256", 750, 1400, {
    exclude: ["15", "coque"],
  }),
  audio("Apple", "Apple AirPods Pro 3", "airpods pro 3/airpods pro (3", 150, 300, {
    exclude: ["boitier seul", "ecouteur seul", "gauche", "droit"],
  }),
];
