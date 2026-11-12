import { spec, type CatalogueContent } from "./define";

/** Sport and fitness: one entry per new slug of `src/config/catalogue/sport.ts`. */
export const sportContent: Record<string, CatalogueContent> = {
  "wahoo-elemnt-bolt-v2": {
    description:
      "Un compteur GPS de vélo compact à écran couleur, avec navigation et cartes. D'occasion, demandez que l'appareil soit retiré du compte du vendeur et vérifiez la fixation fournie.",
    specs: [spec("Écran", "Couleur"), spec("Navigation", "Cartes et itinéraires")],
  },
  "zwift-hub": {
    description:
      "Le home trainer à transmission directe de Zwift, parmi les moins chers de sa catégorie. Vérifiez la cassette fournie et sa compatibilité avec votre transmission.",
    specs: [
      spec("Type", "Home trainer à transmission directe"),
      spec("Puissance maximale", "1 800 W"),
    ],
  },
  "elite-suito-t": {
    description:
      "Un home trainer à transmission directe d'Elite, vendu sans cassette dans sa version « T ». Ajoutez le prix d'une cassette pour comparer avec un modèle qui en est équipé.",
    specs: [spec("Puissance maximale", "1 900 W"), spec("Cassette", "Non fournie (version T)")],
  },
  "theragun-mini": {
    description:
      "Le pistolet de massage compact de Therabody, facile à emporter. D'occasion, vérifiez l'autonomie de la batterie et la présence de l'embout d'origine.",
    specs: [spec("Format", "Compact"), spec("Vitesses", "3")],
  },
  "hyperice-hypervolt-2-pro": {
    description:
      "Un pistolet de massage puissant, à plusieurs vitesses et connecté en Bluetooth. Comptez les embouts fournis : ils diffèrent selon les versions.",
    specs: [spec("Vitesses", "5"), spec("Connexion", "Bluetooth")],
  },
};
