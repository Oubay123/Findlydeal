import { define } from "./define";

const scooter = define("mobility", "Trottinette électrique", {
  exclude: ["pneu", "chambre a air", "chargeur seul", "garde boue", "batterie seule"],
});
const bike = define("mobility", "Vélo");
const ebike = define("mobility", "Vélo électrique", {
  exclude: ["batterie seule", "chargeur seul", "moteur seul"],
});

export const mobilityCatalogue = [
  scooter(
    "Xiaomi",
    "Xiaomi Electric Scooter 4 Pro",
    "xiaomi | scooter 4 pro/trottinette 4 pro",
    280,
    1200,
  ),
  scooter("Segway-Ninebot", "Segway Ninebot Max G30", "ninebot/segway | max g30/g30", 200, 900, {
    exclude: ["g30d", "g30lp", "pneu", "chambre a air", "chargeur seul"],
  }),
  scooter("Segway-Ninebot", "Segway Ninebot Max G2", "ninebot/segway | max g2/g2", 300, 1000, {
    exclude: ["pneu", "chambre a air", "chargeur seul"],
  }),
  scooter("Segway-Ninebot", "Segway Ninebot F2 Pro", "ninebot/segway | f2 pro", 250, 800),
  scooter("Xiaomi", "Xiaomi Electric Scooter 4 Ultra", "xiaomi | scooter 4 ultra", 450, 1300),

  bike("Brompton", "Brompton vélo pliant", "brompton | velo/pliant/m6l/c line/h6l/s2l", 600, 3200, {
    exclude: ["sacoche", "selle", "pedale"],
  }),
  ebike("VanMoof", "VanMoof S3", "vanmoof | s3", 500, 3000, { exclude: ["s5", "a5"] }),
  ebike("Decathlon", "BTWIN Elops 920 E", "elops | 920", 500, 2000),
  ebike("Decathlon", "Rockrider E-ST 100", "rockrider | e-st 100/est 100/e st 100", 400, 1300),
];
