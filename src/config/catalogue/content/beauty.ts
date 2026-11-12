import { spec, type CatalogueContent } from "./define";

/** Beauty and care: one entry per new slug of `src/config/catalogue/beauty.ts`. */
export const beautyContent: Record<string, CatalogueContent> = {
  "dyson-airstrait": {
    description:
      "Un lisseur qui sèche et lisse en même temps à l'air, sans plaques chauffantes, à partir de cheveux mouillés. Cher en neuf, il se trouve couramment en reconditionné : vérifiez la garantie proposée.",
    specs: [
      spec("Technologie", "Flux d'air, sans plaques"),
      spec("Usage", "Cheveux mouillés ou secs"),
    ],
  },
  "dyson-corrale": {
    description:
      "Le lisseur de Dyson à plaques flexibles, qui épousent la mèche pour chauffer moins. Il fonctionne avec ou sans fil : sur un modèle d'occasion, demandez l'autonomie restante de la batterie.",
    specs: [spec("Plaques", "Flexibles"), spec("Alimentation", "Sans fil ou sur secteur")],
  },
  "ghd-chronos": {
    description:
      "Le lisseur ghd le plus récent, plus rapide que la gamme Platinum+. Sur le marché de l'occasion, préférez un vendeur qui fournit la facture : les contrefaçons de ghd sont nombreuses.",
    specs: [spec("Température", "200 °C"), spec("Marque", "ghd")],
  },
  "shark-flexstyle": {
    description:
      "Un sèche-cheveux qui se transforme en multistyler grâce à sa poignée pivotante et à ses embouts boucleurs. Comparez les prix à accessoires égaux : le nombre d'embouts varie selon les packs.",
    specs: [
      spec("Type", "Sèche-cheveux et multistyler"),
      spec("Embouts", "Selon le pack, à vérifier sur l'annonce"),
    ],
  },
  "braun-silk-expert-pro-5": {
    description:
      "Un épilateur à lumière pulsée (IPL) pour un usage à domicile, qui adapte l'intensité à la carnation grâce à son capteur. Le nombre de flashs restants n'est pas affiché : un prix d'occasion bas doit tenir compte de l'usure.",
    specs: [
      spec("Technologie", "Lumière pulsée (IPL)"),
      spec("Capteur", "Adaptation à la carnation"),
    ],
  },
  "philips-sonicare-diamondclean-9000": {
    description:
      "La brosse à dents sonique haut de gamme de Philips, avec plusieurs modes et intensités. Pour des raisons d'hygiène, ne comparez que des offres neuves ou reconditionnées vendues avec une tête neuve.",
    specs: [spec("Technologie", "Sonique"), spec("Modes", "4 modes, 3 intensités")],
  },
  "foreo-luna-4": {
    description:
      "Une brosse nettoyante pour le visage en silicone, à pulsations, pilotée par une application. Le silicone ne se change pas : préférez le neuf ou le reconditionné vendu par un professionnel.",
    specs: [spec("Matière", "Silicone"), spec("Recharge", "USB")],
  },
};
