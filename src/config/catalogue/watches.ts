import { define } from "./define";

const watch = define("watches-jewelry", "Montre");
const smart = define("watches-jewelry", "Montre connectée");
const jewel = define("watches-jewelry", "Bijou");

const STRAP = ["bracelet seul", "boitier seul", "cadran seul", "lunette seule", "maillon"];

export const watchesCatalogue = [
  watch("Seiko", "Seiko Presage Cocktail Time SRPB43", "srpb43", 220, 800),
  watch("Seiko", "Seiko Prospex Samurai SRPB51", "srpb51", 250, 900),
  watch("Seiko", "Seiko 5 Sports GMT SSK003", "ssk003", 250, 800),
  watch("Seiko", "Seiko SKX007", "skx007", 220, 1100, { exclude: STRAP }),
  watch("Seiko", "Seiko Alpinist SPB121", "spb121", 420, 1300),
  watch("Tissot", "Tissot PRX Quartz 40 mm", "tissot prx | quartz/t137.410", 180, 650, {
    exclude: ["powermatic", "chronographe", "35"],
  }),
  watch("Tissot", "Tissot Seastar 1000", "tissot seastar 1000", 200, 1200),
  watch("Tissot", "Tissot Gentleman Powermatic 80", "tissot gentleman | powermatic", 380, 1300),
  watch(
    "Hamilton",
    "Hamilton Khaki Field Mechanical 38 mm",
    "khaki field | mechanical/mecanique",
    280,
    950,
  ),
  watch("Hamilton", "Hamilton Jazzmaster Open Heart", "jazzmaster open heart", 420, 1600),
  watch("Casio", "Casio G-Shock GW-M5610", "gwm5610", 70, 280),
  watch("Casio", "Casio G-Shock GA-B2100", "gab2100", 90, 300),
  watch("Casio", "Casio Vintage A168", "casio | a168", 20, 110),
  watch("Casio", "Casio Edifice EFR-S108D", "efrs108d", 90, 350),
  watch("Orient", "Orient Kamasu", "orient kamasu", 160, 550),
  watch("Orient", "Orient Mako II", "orient mako", 110, 480),
  watch("Citizen", "Citizen Promaster Diver BN0150", "bn0150", 110, 480),
  watch("Citizen", "Citizen Tsuyosa NJ0150", "tsuyosa/nj0150/nj0151", 170, 600),
  watch("Swatch", "Swatch MoonSwatch", "moonswatch", 170, 650),
  watch("Longines", "Longines HydroConquest 41 mm", "longines hydroconquest", 550, 2800),
  watch("Longines", "Longines Spirit", "longines spirit", 1000, 4500),
  watch("Omega", "Omega Seamaster Diver 300M", "omega seamaster | 300", 2000, 9500),
  watch(
    "Omega",
    "Omega Speedmaster Professional Moonwatch",
    "omega speedmaster | professional/moonwatch",
    2800,
    12000,
  ),
  watch("Tudor", "Tudor Black Bay 58", "tudor black bay | 58/fifty-eight/fifty eight", 2000, 6500),
  watch("TAG Heuer", "TAG Heuer Aquaracer", "tag heuer aquaracer", 600, 5000),
  watch("TAG Heuer", "TAG Heuer Carrera Calibre 5", "tag heuer carrera | calibre 5", 900, 4500),
  watch("Certina", "Certina DS Action Diver", "certina ds action", 300, 1500),
  watch("Mido", "Mido Ocean Star 200", "mido ocean star", 400, 1900),
  watch("Yema", "Yema Superman", "yema superman", 350, 2200),
  watch("Baltic", "Baltic Aquascaphe", "baltic aquascaphe", 350, 1200),
  watch("Nomos", "Nomos Tangente", "nomos tangente", 800, 3800),
  watch("Cartier", "Cartier Tank Must", "cartier tank must", 1200, 6000),

  smart(
    "Apple",
    "Apple Watch SE (2e génération) 44 mm",
    "apple watch se | 44 | 2022/2023/se 2/se (2/2e gen/2eme gen/2nd gen/gen 2",
    110,
    480,
  ),
  smart("Apple", "Apple Watch Ultra 2", "apple watch ultra 2", 420, 1400),
  smart("Samsung", "Samsung Galaxy Watch6 44 mm", "galaxy watch 6/watch6 | 44", 90, 520, {
    exclude: ["classic"],
  }),
  smart("Garmin", "Garmin Fenix 7", "garmin fenix 7", 280, 1300, { exclude: ["7s", "7x"] }),
  smart("Garmin", "Garmin Forerunner 255", "forerunner 255", 130, 550),
  smart("Garmin", "Garmin Forerunner 965", "forerunner 965", 330, 1000),
  smart("Garmin", "Garmin Venu 3", "garmin venu 3", 220, 750),
  smart("Withings", "Withings ScanWatch 2", "scanwatch 2", 170, 600),

  jewel(
    "Pandora",
    "Pandora Moments bracelet maille serpent",
    "pandora | moments | bracelet",
    25,
    180,
    {
      exclude: ["charm seul"],
    },
  ),
  jewel("Swarovski", "Swarovski Tennis bracelet", "swarovski | tennis", 50, 380),
  jewel("Tiffany & Co.", "Tiffany & Co. Return to Tiffany collier", "return to tiffany", 120, 900),
  jewel("Cartier", "Cartier Love bracelet", "cartier love | bracelet", 2500, 12000),
  jewel("Hermès", "Hermès Clic H bracelet", "hermes clic h/hermes clic clac", 250, 1300),
];
