import { spec, type CatalogueContent } from "./define";

/** Home appliances: one entry per slug of `src/config/catalogue/home.ts`. */
export const homeContent: Record<string, CatalogueContent> = {
  "dyson-v8": {
    description:
      "Le balai sans fil Dyson le plus répandu : léger, efficace sur sols durs et tapis, batterie remplaçable. En occasion, la batterie est le point à vérifier ; des batteries neuves compatibles existent à prix doux.",
    specs: [
      spec("Type", "Aspirateur balai sans fil"),
      spec("Autonomie", "Jusqu'à 40 min en mode standard"),
      spec("Batterie", "Remplaçable"),
    ],
  },
  "dyson-v11": {
    description:
      "Plus puissant que le V8, avec écran d'autonomie et mode automatique qui adapte l'aspiration au sol. Un bon compromis performance-prix en reconditionné face aux derniers modèles.",
    specs: [
      spec("Type", "Aspirateur balai sans fil"),
      spec("Autonomie", "Jusqu'à 60 min"),
      spec("Écran", "LCD, autonomie restante en temps réel"),
    ],
  },
  "dyson-v12-detect-slim": {
    description:
      "Le format léger avec laser qui révèle la poussière fine sur sols durs et comptage des particules. Pensé pour les logements moyens ; bouton marche/arrêt au lieu de la gâchette.",
    specs: [
      spec("Type", "Aspirateur balai sans fil compact"),
      spec("Particularité", "Brosse laser Fluffy Optic, capteur piézo"),
      spec("Autonomie", "Jusqu'à 60 min"),
    ],
  },
  "dyson-gen5detect": {
    description:
      "Le haut de gamme Dyson : aspiration record, filtration HEPA complète et laser de détection. Lourd et cher ; son intérêt se joue à l'écart de prix avec le V15 en promotion.",
    specs: [
      spec("Type", "Aspirateur balai sans fil"),
      spec("Filtration", "HEPA, scelle l'ensemble du circuit d'air"),
      spec("Autonomie", "Jusqu'à 70 min"),
    ],
  },
  "roborock-s8": {
    description:
      "Robot aspirateur et laveur avec double brosse caoutchouc et serpillière vibrante. Cartographie laser précise, application complète : l'une des références des robots de milieu-haut de gamme.",
    specs: [
      spec("Type", "Robot aspirateur-laveur"),
      spec("Navigation", "LiDAR, cartographie multi-étages"),
      spec("Aspiration", "6 000 Pa"),
    ],
  },
  "roborock-q7-max": {
    description:
      "Le Roborock « rationnel » : navigation laser fiable, grande autonomie et lavage simple, sans station coûteuse. Très bon premier robot pour grands logements.",
    specs: [
      spec("Type", "Robot aspirateur-laveur"),
      spec("Navigation", "LiDAR"),
      spec("Aspiration", "4 200 Pa"),
    ],
  },
  "irobot-roomba-j7": {
    description:
      "Le Roomba qui reconnaît et évite câbles et déjections d'animaux (garantie P.O.O.P. d'iRobot). Pièces détachées très faciles à trouver : un robot qui s'entretient longtemps.",
    specs: [
      spec("Type", "Robot aspirateur"),
      spec("Navigation", "Caméra, évitement d'obstacles par IA"),
      spec("Entretien", "Brosses et filtres standard, pièces courantes"),
    ],
  },
  "dreame-l10s-ultra": {
    description:
      "Station tout-en-un à prix contenu : vidage automatique, lavage et séchage des serpillières. Beaucoup de fonctions haut de gamme pour moins cher que Roborock équivalent.",
    specs: [
      spec("Type", "Robot aspirateur-laveur à station complète"),
      spec("Station", "Vidage, lavage et séchage automatiques"),
      spec("Aspiration", "5 300 Pa"),
    ],
  },
  "karcher-k5-nettoyeur-haute-pression": {
    description:
      "Le nettoyeur haute pression du milieu de gamme Kärcher, dimensionné pour terrasses, voitures et façades. Moteur refroidi à l'eau ; les accessoires (rotabuse, kit mousse) font la différence dans les annonces.",
    specs: [
      spec("Type", "Nettoyeur haute pression"),
      spec("Pression", "145 bar max"),
      spec("Usage", "Terrasses, véhicules, mobilier de jardin"),
    ],
  },
  "vorwerk-thermomix-tm6": {
    description:
      "Le robot cuiseur de référence, à écran tactile et recettes guidées Cookidoo. Très forte valeur de revente ; en occasion, vérifiez l'état du bol et du couteau, pièces les plus chères à remplacer.",
    specs: [
      spec("Type", "Robot cuiseur multifonction"),
      spec("Écran", "Tactile, recettes guidées Cookidoo (abonnement)"),
      spec("Fonctions", "Cuisson, mixage, vapeur, fermentation, sous-vide"),
    ],
  },
  "vorwerk-thermomix-tm5": {
    description:
      "La génération précédente du Thermomix : mêmes bases de cuisson guidée, sans Wi-Fi natif. Nettement moins cher que le TM6 d'occasion, pour un usage très proche au quotidien.",
    specs: [
      spec("Type", "Robot cuiseur multifonction"),
      spec("Écran", "Tactile, recettes sur clé Cook-Key"),
      spec("Sortie", "2014-2019"),
    ],
  },
  "kitchenaid-artisan-4-8-l": {
    description:
      "Le robot pâtissier iconique, fabriqué dans l'Ohio depuis des décennies : transmission directe, bols et accessoires standardisés. Quasi inusable, c'est l'un des achats d'occasion les plus sûrs en cuisine.",
    specs: [
      spec("Type", "Robot pâtissier à mouvement planétaire"),
      spec("Bol", "Acier inoxydable 4,8 L"),
      spec("Accessoires", "Fouet, feuille, crochet ; hub d'extensions avant"),
    ],
  },
  "moulinex-cookeo-connect": {
    description:
      "Le multicuiseur sous pression le plus vendu de France : recettes pas à pas sur l'appareil et via l'application. Cuve antiadhésive remplaçable, pièces faciles à trouver.",
    specs: [
      spec("Type", "Multicuiseur sous pression"),
      spec("Capacité", "6 L, environ 6 personnes"),
      spec("Recettes", "Programmes guidés + application Bluetooth"),
    ],
  },
  "moulinex-companion-xl": {
    description:
      "Le concurrent français du Thermomix : cuiseur-mixeur grand bol, accessoires inclus et prix nettement inférieur. Moins de recettes guidées, mais une vraie polyvalence au quotidien.",
    specs: [
      spec("Type", "Robot cuiseur multifonction"),
      spec("Bol", "3 L utile (XL)"),
      spec("Accessoires", "Couteau hachoir, mélangeur, batteur, vapeur"),
    ],
  },
  "magimix-cook-expert": {
    description:
      "Robot cuiseur français à moteur garanti 30 ans, doublé d'un vrai robot multifonction (râpe, tranche). Fabrication réputée durable : un excellent candidat à l'achat d'occasion.",
    specs: [
      spec("Type", "Robot cuiseur + robot multifonction"),
      spec("Garantie moteur", "30 ans (fabricant)"),
      spec("Fabrication", "France"),
    ],
  },
  "kenwood-cooking-chef-xl": {
    description:
      "Le robot pâtissier qui cuit : mouvement planétaire de pâtissier professionnel et cuisson par induction jusqu'à 180 °C dans le bol. Pour qui pâtisse ET cuisine ; volumineux.",
    specs: [
      spec("Type", "Robot pâtissier cuiseur à induction"),
      spec("Cuisson", "Induction 20-180 °C dans le bol"),
      spec("Bol", "6,7 L"),
    ],
  },
  "philips-airfryer-xxl": {
    description:
      "La friteuse à air grand format de Philips, pionnier de la catégorie : cuissons homogènes et nettoyage facile. Format XXL pour 4-6 personnes ; encombrant sur un petit plan de travail.",
    specs: [
      spec("Type", "Friteuse à air chaud"),
      spec("Capacité", "Famille, environ 1,4 kg de frites"),
      spec("Nettoyage", "Panier compatible lave-vaisselle"),
    ],
  },
  "ninja-foodi-11-en-1-ol750": {
    description:
      "Multicuiseur à pression et friteuse à air dans un seul appareil, avec la technologie SmartLid. Remplace plusieurs appareils ; prévoir la place d'un gros autocuiseur.",
    specs: [
      spec("Type", "Multicuiseur pression + air fryer"),
      spec("Capacité", "7,5 L"),
      spec("Fonctions", "11 modes dont pression, vapeur, air chaud, gril"),
    ],
  },
  "ninja-creami": {
    description:
      "La machine à glaces qui transforme un bac congelé en crème glacée, sorbet ou milkshake en quelques minutes. Très populaire pour les recettes protéinées ; bacs supplémentaires utiles.",
    specs: [
      spec("Type", "Machine à glaces et sorbets"),
      spec("Principe", "Rabotage de bacs congelés 24 h à l'avance"),
      spec("Programmes", "Glace, sorbet, milkshake, smoothie bowl"),
    ],
  },
  "ooni-koda-12-four-a-pizza": {
    description:
      "Four à pizza gaz qui atteint 500 °C en quinze minutes : pizza napolitaine cuite en 60 secondes sur pierre. Sans entretien de flamme ; prévoir une bouteille de gaz et une pelle.",
    specs: [
      spec("Type", "Four à pizza d'extérieur au gaz"),
      spec("Température", "Jusqu'à 500 °C, préchauffe en 15 min"),
      spec("Taille", "Pizzas jusqu'à 30 cm"),
    ],
  },
  "smeg-grille-pain-tsf01": {
    description:
      "Le grille-pain au design années 50 devenu objet de déco autant qu'appareil. Robuste et réparable ; les coloris rares se revendent bien.",
    specs: [
      spec("Type", "Grille-pain 2 tranches"),
      spec("Fonctions", "6 niveaux, décongélation, réchauffage"),
      spec("Fabrication", "Acier, design Smeg années 50"),
    ],
  },
  "smeg-bouilloire-klf03": {
    description:
      "La bouilloire assortie au grille-pain TSF01 : 1,7 L, arrêt automatique, inox laqué. On l'achète pour la cuisine qu'elle habille autant que pour l'eau qu'elle chauffe.",
    specs: [
      spec("Type", "Bouilloire électrique"),
      spec("Capacité", "1,7 L"),
      spec("Fabrication", "Acier laqué, socle 360°"),
    ],
  },
  "sodastream-duo": {
    description:
      "La machine à gazéifier avec bouteilles en verre ET en plastique de gamme. Les cylindres de CO₂ s'échangent partout en France : vérifiez qu'un cylindre plein accompagne l'annonce.",
    specs: [
      spec("Type", "Machine à eau gazeuse"),
      spec("Bouteilles", "Verre 1 L et plastique 1 L compatibles"),
      spec("Cylindre", "CO₂ standard SodaStream, échangeable"),
    ],
  },
  "vitamix-e310": {
    description:
      "Le blender haute performance d'entrée de gamme Vitamix : moteur surdimensionné, lames inusables, garantie fabricant longue. Soupe chauffée par friction, purées d'oléagineux : il fait tout, longtemps.",
    specs: [
      spec("Type", "Blender haute performance"),
      spec("Bol", "1,4 L"),
      spec("Garantie fabricant", "5 ans (neuf)"),
    ],
  },
  "de-longhi-magnifica-s-ecam22-110": {
    description:
      "La machine à grain la plus vendue d'Europe : espresso correct, broyeur réglable, entretien simple. Parfaite première machine automatique ; détartrage régulier indispensable, demandez l'historique.",
    specs: [
      spec("Type", "Machine espresso automatique à grain"),
      spec("Broyeur", "13 positions"),
      spec("Buse vapeur", "Manuelle, pour cappuccino"),
    ],
  },
  "de-longhi-dedica-ec685": {
    description:
      "La machine espresso manuelle la plus fine du marché (15 cm) : café honnête, buse vapeur, prix contenu. Idéale pour débuter en café moulu sans sacrifier le plan de travail.",
    specs: [
      spec("Type", "Machine espresso manuelle"),
      spec("Largeur", "15 cm"),
      spec("Pompe", "15 bar"),
    ],
  },
  "sage-bambino-plus": {
    description:
      "L'espresso de spécialité sans l'encombrement : chauffe en 3 secondes, vraie buse vapeur automatique pour latte art. La marche d'entrée du café sérieux, souvent conseillée aux débutants exigeants.",
    specs: [
      spec("Type", "Machine espresso manuelle compacte"),
      spec("Chauffe", "ThermoJet, prête en 3 s"),
      spec("Vapeur", "Automatique ou manuelle, lait micro-moussé"),
    ],
  },
  "jura-e8": {
    description:
      "L'automatique haut de gamme suisse : mousse de lait fine sans démontage, entretien largement automatisé. Chère neuve, intéressante en reconditionné ; exigez l'historique d'entretien.",
    specs: [
      spec("Type", "Machine espresso automatique à grain"),
      spec("Boissons", "17 spécialités, lait automatique"),
      spec("Entretien", "Programmes de rinçage et détartrage intégrés"),
    ],
  },
  "philips-lattego-serie-3200": {
    description:
      "L'automatique au système de lait le plus simple à nettoyer du marché : deux pièces, aucun tuyau. Le choix familial pour cappuccinos quotidiens sans corvée d'entretien.",
    specs: [
      spec("Type", "Machine espresso automatique à grain"),
      spec("Lait", "Carafe LatteGo sans tuyau, 2 pièces"),
      spec("Boissons", "5 recettes dont cappuccino et latte macchiato"),
    ],
  },
  "nespresso-vertuo-next": {
    description:
      "Le système Vertuo : capsules à code-barres, du ristretto au mug de 414 ml. Machine peu chère, capsules plus coûteuses au café : faites le calcul sur votre consommation avant d'acheter.",
    specs: [
      spec("Type", "Machine à capsules Nespresso Vertuo"),
      spec("Formats", "5 tailles de tasse, capsules dédiées"),
      spec("Fabrication", "54 % de plastique recyclé"),
    ],
  },
  "rocket-appartamento": {
    description:
      "La machine espresso prosumer italienne par excellence : échangeur thermique, fabrication artisanale à Milan, esthétique intemporelle. Un achat de passionné qui se garde des décennies et se revend très bien.",
    specs: [
      spec("Type", "Machine espresso à échangeur thermique"),
      spec("Chaudière", "1,8 L cuivre"),
      spec("Fabrication", "Milan, Italie"),
    ],
  },
  "dyson-airwrap": {
    description:
      "Le multistyler qui coiffe par effet Coanda, sans températures extrêmes. Vérifiez quels embouts accompagnent l'annonce : ils représentent une grande part de la valeur.",
    specs: [
      spec("Type", "Multistyler (boucles, brushing, lissage)"),
      spec("Technologie", "Effet Coanda, chaleur contrôlée"),
      spec("Embouts", "Selon édition ; vérifier le contenu de la boîte"),
    ],
  },
  "dyson-supersonic": {
    description:
      "Le sèche-cheveux au moteur dans la poignée : rapide, mesure de température 40 fois par seconde pour protéger le cheveu. Cher neuf, courant en reconditionné officiel.",
    specs: [
      spec("Type", "Sèche-cheveux"),
      spec("Technologie", "Moteur V9, contrôle thermique continu"),
      spec("Embouts", "Magnétiques (concentrateur, diffuseur…)"),
    ],
  },
  "ghd-platinum": {
    description:
      "Le lisseur professionnel à température constante de 185 °C, le réglage que ghd juge le plus sûr pour le cheveu. Plaques remplaçables en SAV ; très répandu chez les coiffeurs.",
    specs: [
      spec("Type", "Lisseur"),
      spec("Température", "185 °C constants, capteurs prédictifs"),
      spec("Chauffe", "Prêt en 20 s"),
    ],
  },
  "philips-lumea-prestige": {
    description:
      "L'épilateur à lumière pulsée domestique le plus documenté : embouts par zone du corps, programme d'entretien espacé. Résultats progressifs sur plusieurs mois ; lisez les contre-indications (peaux et poils très clairs ou très foncés).",
    specs: [
      spec("Type", "Épilateur à lumière pulsée (IPL)"),
      spec("Embouts", "Corps, visage, aisselles, maillot selon coffret"),
      spec("Usage", "Cycle d'attaque puis entretien toutes les 4-8 semaines"),
    ],
  },
  "braun-series-9-pro": {
    description:
      "Le rasoir électrique haut de gamme de Braun, réputé pour les barbes de plusieurs jours et les peaux sensibles. La tête se remplace tous les 18 mois environ : comptez ce coût dans la comparaison.",
    specs: [
      spec("Type", "Rasoir électrique à grille"),
      spec("Étanchéité", "100 % étanche, usage sec ou mousse"),
      spec("Entretien", "Cassette de rasage remplaçable"),
    ],
  },
  "oral-b-io-series-9": {
    description:
      "La brosse à dents électrique haut de gamme d'Oral-B : moteur magnétique silencieux, capteur de pression et suivi de zones sur écran. Les brossettes iO, spécifiques, coûtent plus cher que les classiques.",
    specs: [
      spec("Type", "Brosse à dents électrique"),
      spec("Technologie", "iO magnétique, capteur de pression"),
      spec("Brossettes", "Spécifiques iO"),
    ],
  },
  "dyson-purifier-cool-tp07": {
    description:
      "Purificateur et ventilateur : filtration HEPA scellée, capteurs de qualité d'air et rapport dans l'application. Le filtre se remplace environ une fois par an, comptez ce consommable.",
    specs: [
      spec("Type", "Purificateur d'air + ventilateur"),
      spec("Filtration", "HEPA H13 + charbon actif, circuit scellé"),
      spec("Capteurs", "Particules, COV, NO₂, affichage temps réel"),
    ],
  },
  "philips-hue-kit-de-demarrage-e27": {
    description:
      "Le standard des ampoules connectées : fiable, compatible avec tous les assistants, écosystème immense. Le pont (bridge) du kit ouvre les automatisations complètes ; vérifiez qu'il est inclus.",
    specs: [
      spec("Contenu", "Ampoules E27 + pont Hue selon kit"),
      spec("Compatibilité", "HomeKit, Alexa, Google Home, Matter"),
      spec("Protocole", "Zigbee via pont Hue"),
    ],
  },
  "google-nest-learning-thermostat": {
    description:
      "Le thermostat connecté qui apprend vos horaires et ajuste le chauffage seul. Économies réelles surtout avec chauffage individuel ; vérifiez la compatibilité avec votre chaudière avant l'achat.",
    specs: [
      spec("Type", "Thermostat connecté apprenant"),
      spec("Compatibilité", "La plupart des chaudières individuelles ; à vérifier"),
      spec("Installation", "Professionnelle recommandée"),
    ],
  },
  "ring-video-doorbell-4": {
    description:
      "La sonnette vidéo sur batterie la plus répandue : détection de mouvement, réponse depuis le téléphone. L'enregistrement vidéo requiert l'abonnement Ring : incluez-le dans le coût réel.",
    specs: [
      spec("Type", "Sonnette vidéo connectée"),
      spec("Alimentation", "Batterie amovible ou câblage existant"),
      spec("Vidéo", "1080p, pré-roll ; historique sur abonnement"),
    ],
  },
  "laurastar-lift": {
    description:
      "Le fer-centrale vapeur suisse à vapeur pulsée, qui repasse et assainit les tissus. Lourd investissement neuf, décote intéressante en occasion ; entretien anticalcaire à suivre.",
    specs: [
      spec("Type", "Centrale vapeur compacte"),
      spec("Vapeur", "Pulsée, hygiénisation des textiles"),
      spec("Fabrication", "Suisse"),
    ],
  },
};
