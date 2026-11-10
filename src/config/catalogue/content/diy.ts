import { spec, type CatalogueContent } from "./define";

/** DIY and garden: one entry per slug of `src/config/catalogue/diy.ts`. */
export const diyContent: Record<string, CatalogueContent> = {
  "makita-dhp482-perceuse-visseuse-a-percussion-18-v": {
    description:
      "La perceuse-visseuse à percussion 18 V la plus répandue de Makita, compatible avec toutes les batteries LXT. Souvent vendue « machine nue » : vérifiez si batteries et chargeur sont inclus, ils représentent une bonne part du prix.",
    specs: [
      spec("Tension", "18 V, batteries Makita LXT"),
      spec("Usage", "Perçage, vissage, percussion"),
    ],
  },
  "makita-dtd153-visseuse-a-chocs-18-v": {
    description:
      "La visseuse à chocs sans charbon de Makita, pour visser longtemps sans forcer le poignet. Comme tout outil 18 V d'occasion, regardez si elle est vendue nue ou avec batterie.",
    specs: [spec("Tension", "18 V, batteries Makita LXT"), spec("Moteur", "Sans charbon")],
  },
  "makita-dga504-meuleuse-18-v": {
    description:
      "La meuleuse 125 mm sans fil de Makita. Vérifiez que le carter de protection et la poignée latérale sont fournis : ce sont des éléments de sécurité.",
    specs: [spec("Tension", "18 V, batteries Makita LXT"), spec("Disque", "125 mm")],
  },
  "dewalt-dcd796-perceuse-visseuse-a-percussion-18-v": {
    description:
      "La perceuse-visseuse à percussion compacte de DeWalt, sans charbon. Compatible avec les batteries XR 18 V de la marque, très répandues d'occasion.",
    specs: [spec("Tension", "18 V, batteries DeWalt XR"), spec("Moteur", "Sans charbon")],
  },
  "dewalt-dcf887-visseuse-a-chocs-18-v": {
    description:
      "La visseuse à chocs 18 V de DeWalt, à trois vitesses. Un outil d'artisan qui encaisse bien l'usage : un exemplaire d'occasion bien entretenu reste fiable.",
    specs: [spec("Tension", "18 V, batteries DeWalt XR"), spec("Moteur", "Sans charbon")],
  },
  "bosch-professional-gsr-18v-55": {
    description:
      "La perceuse-visseuse de la gamme bleue de Bosch, destinée aux professionnels. Elle utilise les batteries Bosch Professional 18 V, à ne pas confondre avec la gamme verte grand public, incompatible.",
    specs: [
      spec("Tension", "18 V, batteries Bosch Professional"),
      spec("Usage", "Perçage et vissage"),
    ],
  },
  "bosch-professional-gbh-2-26": {
    description:
      "Le perforateur filaire SDS-plus de Bosch Professional, increvable et très présent d'occasion. Écoutez-le tourner : un bruit de roulement ou une frappe faible signale une usure interne.",
    specs: [spec("Alimentation", "Filaire, 800 W"), spec("Emmanchement", "SDS-plus")],
  },
  "milwaukee-m18-fpd2-perceuse-a-percussion": {
    description:
      "La perceuse à percussion haut de gamme de Milwaukee, parmi les plus puissantes de sa catégorie. Les batteries M18 sont chères : un lot avec batteries est souvent plus intéressant qu'une machine nue.",
    specs: [spec("Tension", "18 V, batteries Milwaukee M18"), spec("Moteur", "Sans charbon")],
  },
  "festool-domino-df-500": {
    description:
      "La fraiseuse à tourillons plats qui a changé l'assemblage en menuiserie. Elle garde une très forte valeur d'occasion. Vérifiez que le coffret Systainer et les fraises sont inclus.",
    specs: [spec("Usage", "Assemblage par tourillons Domino"), spec("Alimentation", "Filaire")],
  },
  "festool-ets-150-ponceuse-excentrique": {
    description:
      "La ponceuse excentrique de Festool, appréciée pour ses faibles vibrations et son aspiration. Le patin s'use et se remplace : regardez son état sur les photos.",
    specs: [spec("Plateau", "150 mm"), spec("Alimentation", "Filaire")],
  },
  "festool-ctl-midi-aspirateur": {
    description:
      "L'aspirateur d'atelier de Festool, qui se déclenche avec l'outil branché dessus. Indispensable avec les ponceuses de la marque. Vérifiez le flexible et la présence du filtre.",
    specs: [spec("Classe de poussières", "L"), spec("Usage", "Aspiration d'outils, atelier")],
  },
  "fein-multimaster-outil-multifonction": {
    description:
      "L'outil oscillant à l'origine du genre : découpe, ponçage, grattage. Les lames Starlock se trouvent partout. Précisez la génération et la fixation (Starlock ou plus ancienne) avant d'acheter des accessoires.",
    specs: [spec("Usage", "Découpe, ponçage, grattage")],
  },
  "dremel-4000-outil-multifonction": {
    description:
      "Le mini-outil rotatif filaire de Dremel, pour graver, poncer, polir ou couper. Les kits d'occasion sont souvent fournis avec un grand nombre d'accessoires : comparez ce qui est inclus.",
    specs: [
      spec("Alimentation", "Filaire, 175 W"),
      spec("Usage", "Gravure, ponçage, découpe, polissage"),
    ],
  },
  "bosch-professional-gll-3-80-laser-lignes": {
    description:
      "Le laser à trois lignes à 360° de Bosch Professional, pour poser carrelage, cloisons ou meubles. Contrôlez la précision avant achat : un laser qui a chuté peut être décalibré.",
    specs: [spec("Lignes", "3 lignes à 360°"), spec("Usage", "Mise à niveau, aplomb")],
  },
  "leica-disto-d2-telemetre-laser": {
    description:
      "Le télémètre laser compact de Leica, précis et connecté en Bluetooth. Un outil simple, peu sujet à l'usure : l'état de l'écran et du compartiment à piles suffit à le juger.",
    specs: [spec("Portée", "Jusqu'à 100 m"), spec("Connexion", "Bluetooth")],
  },
  "stihl-ms-170-tronconneuse": {
    description:
      "La petite tronçonneuse thermique de Stihl pour le bois de chauffage et l'élagage. Vérifiez qu'elle démarre facilement, que le frein de chaîne fonctionne et l'état du guide.",
    specs: [spec("Moteur", "Thermique, 30 cm³"), spec("Usage", "Élagage, bois de chauffage")],
  },
  "stihl-ms-181-tronconneuse": {
    description:
      "Un cran au-dessus de la MS 170, avec un moteur plus économe et moins polluant. Mêmes points à contrôler : démarrage, frein de chaîne, guide et pignon.",
    specs: [spec("Moteur", "Thermique, 31,8 cm³"), spec("Usage", "Élagage, bois de chauffage")],
  },
  "husqvarna-automower-305-robot-tondeuse": {
    description:
      "Le robot tondeuse compact de Husqvarna, pour les petits jardins. La station de charge et le câble périphérique sont indispensables : vérifiez qu'ils sont fournis, et demandez le code PIN de l'antivol.",
    specs: [spec("Surface", "Petits jardins"), spec("Guidage", "Câble périphérique")],
  },
  "worx-landroid-robot-tondeuse": {
    description:
      "Les robots tondeuses Worx, nombreux en occasion. Les modèles se distinguent par la surface couverte (de 300 à plusieurs milliers de m²) : vérifiez la référence exacte et demandez au vendeur de retirer le robot de son compte.",
    specs: [spec("Guidage", "Câble périphérique"), spec("Batterie", "Worx PowerShare 20 V")],
  },
  "makita-dub184-souffleur-18-v": {
    description:
      "Le souffleur sans fil de Makita, compatible avec les batteries LXT 18 V : idéal si vous avez déjà des outils de la marque.",
    specs: [spec("Tension", "18 V, batteries Makita LXT")],
  },
  "karcher-wd-5-aspirateur-eau-et-poussiere": {
    description:
      "L'aspirateur eau et poussière de Kärcher pour le garage, l'atelier et les travaux. Vérifiez le filtre et le flexible ; les sacs sont des consommables bon marché.",
    specs: [spec("Usage", "Poussières, gravats, liquides"), spec("Alimentation", "Filaire")],
  },
};
