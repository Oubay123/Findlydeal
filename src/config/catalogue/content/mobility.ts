import { spec, type CatalogueContent } from "./define";

/** Electric mobility: one entry per new slug of `src/config/catalogue/mobility.ts`. */
export const mobilityContent: Record<string, CatalogueContent> = {
  "segway-ninebot-max-g30": {
    description:
      "La trottinette longue autonomie la plus vendue d'occasion, réputée solide. Bridée à 25 km/h en France ; sur un exemplaire d'occasion, l'autonomie réelle dépend surtout de l'état de la batterie : demandez le kilométrage et le nombre de cycles affichés dans l'application.",
    specs: [
      spec("Autonomie annoncée", "Jusqu'à 65 km"),
      spec("Roues", "10 pouces, pneus sans chambre"),
    ],
  },
  "segway-ninebot-max-g2": {
    description:
      "La remplaçante de la Max G30, avec des suspensions avant et arrière qui changent le confort sur les pavés. Vérifiez sur l'annonce qu'il s'agit bien de la version européenne bridée à 25 km/h.",
    specs: [spec("Autonomie annoncée", "Jusqu'à 70 km"), spec("Suspensions", "Avant et arrière")],
  },
  "segway-ninebot-f2-pro": {
    description:
      "Une trottinette de milieu de gamme, plus légère que la Max G30, pensée pour les trajets urbains quotidiens. Comme pour toute trottinette d'occasion, regardez l'usure des pneus et le jeu de la colonne de direction.",
    specs: [spec("Autonomie annoncée", "Jusqu'à 55 km"), spec("Roues", "10 pouces")],
  },
  "xiaomi-electric-scooter-4-ultra": {
    description:
      "Le haut de gamme de Xiaomi, avec double suspension et grande batterie. Plus lourde que la 4 Pro : vérifiez que le poids reste compatible avec vos escaliers ou les transports en commun.",
    specs: [spec("Autonomie annoncée", "Jusqu'à 70 km"), spec("Suspensions", "Avant et arrière")],
  },
  "vanmoof-s3": {
    description:
      "Le vélo électrique urbain néerlandais à batterie intégrée et antivol dans le cadre. La marque a fait faillite en 2023 avant d'être reprise : avant d'acheter d'occasion, assurez-vous que le vélo est transféré sur votre compte et que les pièces propres au modèle restent disponibles.",
    specs: [
      spec("Batterie", "Intégrée au cadre"),
      spec("Transmission", "4 vitesses à passage automatique"),
    ],
  },
  "btwin-elops-920-e": {
    description:
      "Le vélo de ville électrique de Decathlon, apprécié pour son entretien simple et la disponibilité des pièces en magasin. Demandez l'âge de la batterie : c'est la pièce la plus chère à remplacer.",
    specs: [spec("Type", "Vélo de ville à assistance électrique"), spec("Vendu par", "Decathlon")],
  },
  "rockrider-e-st-100": {
    description:
      "Le VTT électrique semi-rigide d'entrée de gamme de Decathlon, fait pour les chemins plus que pour le pilotage engagé. Vérifiez la fourche et les freins, et la présence du chargeur d'origine.",
    specs: [spec("Type", "VTT électrique semi-rigide"), spec("Roues", "27,5 pouces")],
  },
};
