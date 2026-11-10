import { spec, type CatalogueContent } from "./define";

/** Leisure: one entry per slug of `src/config/catalogue/leisure.ts`. */
export const leisureContent: Record<string, CatalogueContent> = {
  "sony-a7-iii-boitier": {
    description:
      "L'hybride plein format qui a démocratisé la catégorie : autofocus excellent, double slot SD, parc d'objectifs immense. En occasion, demandez le nombre de déclenchements — c'est le kilométrage d'un boîtier.",
    specs: [
      spec("Capteur", "Plein format 24 Mpx, stabilisé"),
      spec("Monture", "Sony E"),
      spec("Vidéo", "4K 30p"),
      spec("Sortie", "2018"),
    ],
  },
  "sony-a6400": {
    description:
      "L'APS-C polyvalent de Sony : autofocus de haut niveau, écran selfie, format compact. Très bon premier hybride à objectifs interchangeables, abondant en seconde main.",
    specs: [
      spec("Capteur", "APS-C 24 Mpx"),
      spec("Monture", "Sony E"),
      spec("Vidéo", "4K 30p"),
      spec("Sortie", "2019"),
    ],
  },
  "sony-zv-e10": {
    description:
      "L'hybride pensé pour la vidéo et le vlog : micro directionnel intégré, écran orientable, bascule produit. Souvent vendu avec le zoom motorisé 16-50 : vérifiez si l'objectif est inclus.",
    specs: [
      spec("Capteur", "APS-C 24 Mpx"),
      spec("Orientation", "Vlog : écran rotatif, bonnette fournie d'origine"),
      spec("Sortie", "2021"),
    ],
  },
  "canon-eos-r6": {
    description:
      "Le plein format Canon réputé pour son autofocus et sa stabilisation 8 stops. Très bon en basse lumière ; la version II a fait baisser sa cote, au profit des acheteurs d'occasion.",
    specs: [
      spec("Capteur", "Plein format 20 Mpx, stabilisé"),
      spec("Monture", "Canon RF"),
      spec("Rafale", "Jusqu'à 20 i/s (obturateur électronique)"),
      spec("Sortie", "2020"),
    ],
  },
  "canon-eos-90d": {
    description:
      "Le dernier grand reflex APS-C de Canon : visée optique, autonomie généreuse, parc EF immense et bradé. Le choix malin de l'occasion pour sport et animalier à budget contenu.",
    specs: [
      spec("Capteur", "APS-C 32,5 Mpx"),
      spec("Monture", "Canon EF/EF-S"),
      spec("Visée", "Optique (reflex)"),
      spec("Sortie", "2019"),
    ],
  },
  "fujifilm-x-t4": {
    description:
      "L'hybride APS-C expert aux molettes mécaniques et aux simulations de films Fuji. Stabilisé, double slot : la cote baisse à chaque génération, le plaisir d'usage reste.",
    specs: [
      spec("Capteur", "APS-C 26 Mpx X-Trans, stabilisé"),
      spec("Monture", "Fujifilm X"),
      spec("Sortie", "2020"),
    ],
  },
  "fujifilm-x100v": {
    description:
      "Le compact expert à objectif fixe 35 mm équivalent, rendu culte par les réseaux : il s'est vendu au-dessus de son prix neuf pendant des mois. Comparez systématiquement à la cote du X100VI.",
    specs: [
      spec("Capteur", "APS-C 26 Mpx"),
      spec("Objectif", "Fixe 23 mm f/2 (équiv. 35 mm)"),
      spec("Viseur", "Hybride optique/électronique"),
      spec("Sortie", "2020"),
    ],
  },
  "fujifilm-instax-mini-12": {
    description:
      "L'instantané le plus vendu : simple, films Instax Mini partout en vente. Le coût réel est dans les films (environ 1 € la photo) : la machine, elle, ne vaut pas cher d'occasion.",
    specs: [
      spec("Film", "Instax Mini (62 × 46 mm)"),
      spec("Mise au point", "0,3 m à l'infini, mode selfie"),
      spec("Sortie", "2023"),
    ],
  },
  "nikon-z6-ii": {
    description:
      "Le plein format équilibré de Nikon : ergonomie saluée, double processeur, compatible objectifs F via bague FTZ. Une valeur sûre de l'occasion pour qui vient du reflex Nikon.",
    specs: [
      spec("Capteur", "Plein format 24,5 Mpx, stabilisé"),
      spec("Monture", "Nikon Z (F via FTZ)"),
      spec("Sortie", "2020"),
    ],
  },
  "gopro-hero12-black": {
    description:
      "L'action cam de référence : 5,3K, stabilisation HyperSmooth, filetage trépied intégré. Les batteries vieillissent vite en usage intensif : prévoyez-en une neuve dans votre budget d'occasion.",
    specs: [
      spec("Vidéo", "5,3K 60p, HyperSmooth 6.0"),
      spec("Étanchéité", "10 m sans caisson"),
      spec("Sortie", "2023"),
    ],
  },
  "gopro-hero11-black": {
    description:
      "Quasi identique à la 12 (capteur 8:7, 5,3K) pour nettement moins cher depuis sa succession. Le meilleur rapport qualité-prix GoPro en seconde main.",
    specs: [
      spec("Vidéo", "5,3K 60p, capteur 8:7"),
      spec("Étanchéité", "10 m sans caisson"),
      spec("Sortie", "2022"),
    ],
  },
  "dji-mini-3-pro": {
    description:
      "Le drone de moins de 249 g avec capteurs d'évitement et vraie qualité d'image : la limite de poids simplifie les obligations, pas d'examen pour l'usage loisir de base en catégorie ouverte. Vérifiez l'enregistrement AlphaTango et l'état des hélices.",
    specs: [
      spec("Poids", "Moins de 249 g"),
      spec("Caméra", '4K 60p, capteur 1/1,3"'),
      spec("Évitement", "Capteurs avant, arrière, dessous"),
      spec("Sortie", "2022"),
    ],
  },
  "dji-mini-4-pro": {
    description:
      "Le successeur à évitement omnidirectionnel et suivi actif amélioré, toujours sous 249 g. En occasion, le nombre de batteries incluses change beaucoup la valeur réelle.",
    specs: [
      spec("Poids", "Moins de 249 g"),
      spec("Caméra", "4K 60p HDR"),
      spec("Évitement", "Omnidirectionnel"),
      spec("Sortie", "2023"),
    ],
  },
  "dji-osmo-pocket-3": {
    description:
      "La caméra de poche stabilisée sur nacelle, capteur 1 pouce et écran rotatif : l'outil à vlog qui a supplanté bien des caméras plus grosses. Très demandée, décote faible.",
    specs: [
      spec("Capteur", "1 pouce, 4K 120p"),
      spec("Stabilisation", "Nacelle mécanique 3 axes"),
      spec("Sortie", "2023"),
    ],
  },
  "insta360-x3": {
    description:
      "La caméra 360° qui permet de recadrer après coup : on filme tout, on choisit le plan ensuite. L'objectif bombé se raye facilement : inspectez les lentilles avant tout achat d'occasion.",
    specs: [
      spec("Capture", "360°, 5,7K"),
      spec("Écran", "Tactile 2,29 pouces"),
      spec("Sortie", "2022"),
    ],
  },
  "fender-player-stratocaster": {
    description:
      "La Stratocaster mexicaine de série Player : l'instrument sérieux d'entrée dans l'univers Fender. Le marché de l'occasion guitare est très liquide : une Player se revend sans peine.",
    specs: [
      spec("Fabrication", "Mexique (Ensenada)"),
      spec("Micros", "3 simples Alnico 5"),
      spec("Manche", "Érable, profil C moderne"),
    ],
  },
  "fender-player-telecaster": {
    description:
      "La Telecaster de série Player : simplicité, claquant caractéristique, fabrication mexicaine constante. Comme toute guitare d'occasion : frettes, manche droit et électronique propre font le prix.",
    specs: [spec("Fabrication", "Mexique"), spec("Micros", "2 simples Alnico 5")],
  },
  "squier-classic-vibe-stratocaster": {
    description:
      "La meilleure Squier : lutherie étonnante pour le prix, esthétique vintage 50s/60s/70s. Souvent conseillée au-dessus de Fender d'entrée de gamme ; occasion très abordable.",
    specs: [
      spec("Gamme", "Classic Vibe (50s, 60s ou 70s)"),
      spec("Fabrication", "Indonésie/Chine selon années"),
    ],
  },
  "gibson-les-paul-standard": {
    description:
      "La Les Paul Standard américaine : acajou, table érable, humbuckers. Sur l'occasion, l'état du manche (cassures de tête recollées, fréquentes chez Gibson) conditionne tout : exigez des photos du joint de tête.",
    specs: [
      spec("Fabrication", "Nashville, USA"),
      spec("Bois", "Acajou, table érable"),
      spec("Micros", "2 humbuckers"),
    ],
  },
  "epiphone-les-paul-standard": {
    description:
      "La Les Paul d'Epiphone (groupe Gibson) : le son et la silhouette pour une fraction du prix. Les séries récentes « Inspired by Gibson » sont nettement meilleures que les anciennes : datez l'instrument.",
    specs: [spec("Gamme", "Inspired by Gibson (récentes)"), spec("Micros", "2 humbuckers")],
  },
  "yamaha-fg800": {
    description:
      "La folk acoustique recommandée à tous les débutants : table massive en épicéa, justesse de fabrication Yamaha. Quasi impossible de se tromper, neuve comme d'occasion.",
    specs: [spec("Table", "Épicéa massif"), spec("Dos et éclisses", "Nato/okoumé")],
  },
  "yamaha-p-45-piano-numerique": {
    description:
      "Le piano numérique d'étude le plus vendu : 88 touches à mécanique lestée, son correct, prix serré. Remplacé par le P-145 : l'occasion du P-45 est devenue très abordable.",
    specs: [
      spec("Clavier", "88 touches lestées GHS"),
      spec("Polyphonie", "64 voix"),
      spec("Sortie", "2015"),
    ],
  },
  "yamaha-p-125-piano-numerique": {
    description:
      "Le cran au-dessus du P-45 : meilleur son (Pure CF), haut-parleurs doublés, rythmes. Pour un élève qui progresse ; successeur P-125a identique en pratique.",
    specs: [
      spec("Clavier", "88 touches lestées GHS"),
      spec("Sonorité", "Échantillons Pure CF (CFIIIS)"),
      spec("Polyphonie", "192 voix"),
    ],
  },
  "roland-fp-30x": {
    description:
      "Le concurrent direct des Yamaha P : toucher PHA-4 réputé, Bluetooth MIDI et audio. Souvent préféré pour la mécanique du clavier ; comparez les trois à prix proche.",
    specs: [
      spec("Clavier", "88 touches PHA-4 Standard"),
      spec("Connexions", "Bluetooth MIDI et audio, USB"),
      spec("Polyphonie", "256 voix"),
    ],
  },
  "boss-katana-50-mkii": {
    description:
      "L'ampli guitare à modélisation le plus vendu : sons convaincants du clean au high-gain, effets intégrés, édition sur ordinateur. Increvable : l'occasion est sans grand risque.",
    specs: [
      spec("Puissance", "50 W, célestion 12 pouces"),
      spec("Effets", "Plus de 60 effets BOSS intégrés"),
    ],
  },
  "focusrite-scarlett-2i2": {
    description:
      "L'interface audio USB de home studio la plus répandue au monde : deux préamplis propres, latence faible, pilotes stables. Vérifiez la génération (2e, 3e, 4e) : les prix diffèrent.",
    specs: [
      spec("Entrées", "2 préamplis micro/ligne/instrument"),
      spec("Résolution", "24 bits/192 kHz"),
      spec("Générations", "3e (2019) et 4e (2023) les plus courantes"),
    ],
  },
  "shure-sm7b": {
    description:
      "Le micro broadcast des podcasts et du chant studio, descendant du micro de « Thriller ». Dynamique très gourmand en gain : prévoyez une interface qui suit, ou un booster type CloudLifter.",
    specs: [
      spec("Type", "Dynamique, directivité cardioïde"),
      spec("Usage", "Voix parlée et chantée, broadcast"),
      spec("Alimentation", "Aucune, mais +60 dB de gain requis"),
    ],
  },
  "teenage-engineering-op-1": {
    description:
      "Le synthétiseur-studio de poche culte, à l'ergonomie unique et à la cote très ferme. L'OP-1 original cohabite avec le Field, bien plus cher : identifiez la version exacte.",
    specs: [
      spec("Type", "Synthé, sampleur, enregistreur 4 pistes"),
      spec("Versions", "OP-1 (2011) et OP-1 Field (2022)"),
    ],
  },
  "pioneer-dj-ddj-flx4": {
    description:
      "Le contrôleur DJ débutant de référence, compatible rekordbox ET Serato sans licence payante. Succède au DDJ-400 : les deux se comparent, le FLX4 ajoute l'USB-C et le jeu sur smartphone.",
    specs: [
      spec("Canaux", "2, jog wheels pleine taille"),
      spec("Logiciels", "rekordbox et Serato DJ Lite inclus"),
      spec("Sortie", "2022"),
    ],
  },
  "rega-planar-1-platine-vinyle": {
    description:
      "La platine hi-fi d'initiation la plus recommandée : bras Rega RB110, cellule Carbon pré-réglée, montage en dix minutes. L'état de la cellule (pointe) est le seul vrai point de contrôle d'occasion.",
    specs: [
      spec("Bras", "Rega RB110"),
      spec("Cellule", "Rega Carbon montée d'usine"),
      spec("Entraînement", "Courroie, 33/45 tours"),
    ],
  },
  "audio-technica-at-lp120x": {
    description:
      "La platine à entraînement direct au look technics, préampli phono intégré et USB. Polyvalente hi-fi/DJ amateur ; robuste, elle supporte bien la seconde main.",
    specs: [
      spec("Entraînement", "Direct, 33/45/78 tours"),
      spec("Préampli", "Phono intégré débrayable, sortie USB"),
    ],
  },
  "brompton-velo-pliant": {
    description:
      "Le pliant londonien au pliage le plus compact du marché, increvable et entièrement réparable. Très coté d'occasion ; vérifiez le numéro de cadre (vols fréquents) et l'année via le registre Brompton.",
    specs: [
      spec("Pliage", "Trois mouvements, format 64 × 58 × 27 cm"),
      spec("Vitesses", "2, 3, 6 ou 12 selon version"),
      spec("Fabrication", "Londres"),
    ],
  },
  "garmin-edge-530": {
    description:
      "Le compteur GPS vélo au meilleur rapport fonctions-prix de sa génération : navigation, métriques de puissance, 20 h d'autonomie. Interface à boutons, appréciée sous la pluie.",
    specs: [
      spec("Écran", "2,6 pouces, boutons"),
      spec("Autonomie", "Jusqu'à 20 h"),
      spec("Sortie", "2019"),
    ],
  },
  "garmin-edge-1040": {
    description:
      "Le grand compteur GPS : cartographie complète, autonomie jusqu'à 45 h (plus en Solar), multi-bandes. Pour l'ultra-distance et le bikepacking ; la version Solar cote au-dessus.",
    specs: [
      spec("Écran", "3,5 pouces tactile"),
      spec("Autonomie", "Jusqu'à 45 h (Solar : davantage)"),
      spec("GPS", "Multi-bandes"),
      spec("Sortie", "2022"),
    ],
  },
  "wahoo-kickr-core": {
    description:
      "Le home trainer à transmission directe du juste prix : précis, silencieux, compatible Zwift. Vérifiez si une cassette est montée (souvent non incluse neuve, souvent incluse d'occasion).",
    specs: [
      spec("Type", "Transmission directe"),
      spec("Précision", "±2 %"),
      spec("Pente simulée", "Jusqu'à 16 %"),
    ],
  },
  "tacx-neo-2t": {
    description:
      "Le haut de gamme Garmin/Tacx : silence quasi total, simulation de pavés, aucune calibration requise. Lourd (21 kg) : une remise en main propre s'impose.",
    specs: [
      spec("Type", "Transmission directe, sans calibration"),
      spec("Précision", "±1 %"),
      spec("Pente simulée", "Jusqu'à 25 %"),
    ],
  },
  "peloton-bike": {
    description:
      "Le vélo connecté à écran et cours en direct. Les cours exigent l'abonnement All-Access : sans lui, le vélo est très limité — intégrez ce coût mensuel avant de comparer.",
    specs: [
      spec("Écran", "Tactile HD 21,5 pouces"),
      spec("Résistance", "Magnétique, réglage manuel"),
      spec("Abonnement", "Requis pour les cours (All-Access)"),
    ],
  },
  "concept2-rowerg": {
    description:
      "Le rameur des salles et des compétitions d'aviron indoor, inchangé dans son principe depuis des décennies. Pièces toutes disponibles : un RowErg d'occasion bien noté au moniteur (PM5) est un achat sûr.",
    specs: [
      spec("Résistance", "Air, roue à aubes"),
      spec("Moniteur", "PM5, Bluetooth"),
      spec("Entretien", "Toutes pièces disponibles chez Concept2"),
    ],
  },
  "xiaomi-electric-scooter-4-pro": {
    description:
      "La trottinette urbaine grande roue de Xiaomi : 25 km/h bridés France, bonne autonomie annoncée. Batterie = pièce maîtresse : kilométrage et cycles de charge à demander avant tout achat.",
    specs: [
      spec("Vitesse", "25 km/h (réglementation française)"),
      spec("Autonomie annoncée", "Jusqu'à 55 km (conditions idéales)"),
      spec("Roues", "10 pouces tubeless"),
    ],
  },
  "theragun-elite": {
    description:
      "Le pistolet de massage haut de gamme de Therabody : bras triangulaire, amplitude de 16 mm, appli de routines. Les génériques font le même usage pour moins : à vous de juger l'écart.",
    specs: [
      spec("Amplitude", "16 mm, moteur QuietForce"),
      spec("Autonomie", "Environ 2 h"),
      spec("Embouts", "5 fournis d'origine"),
    ],
  },
  "bowflex-selecttech-552": {
    description:
      "Les haltères réglables 2-24 kg qui remplacent 15 paires : un cadran, un geste. Mécanique à vérifier d'occasion (crans, jeu) ; économise surtout de la place.",
    specs: [spec("Plage", "2 à 24 kg par haltère"), spec("Réglage", "Cadran, incréments fins")],
  },
  "lego-star-wars-millennium-falcon-75192": {
    description:
      "Le plus grand Faucon Millenium LEGO (7 541 pièces), set emblématique de la gamme UCS. En occasion, « complet avec notice et boîte » change tout : exigez l'inventaire.",
    specs: [
      spec("Pièces", "7 541"),
      spec("Gamme", "Ultimate Collector Series"),
      spec("Sortie", "2017, toujours édité"),
    ],
  },
  "lego-icons-orchidee-10311": {
    description:
      "L'orchidée LEGO de la gamme botanique, best-seller des sets adultes. Petit prix neuf : l'occasion n'a de sens que nettement sous le tarif boutique.",
    specs: [spec("Pièces", "608"), spec("Gamme", "Icons Botanical"), spec("Sortie", "2022")],
  },
  "lego-technic-porsche-911-gt3-rs-42056": {
    description:
      "Le premier grand Technic « Ultimate » : boîte orange, séquence de montage pensée comme un livre. Retiré de la vente : c'est un set de collection, scellé il cote très haut.",
    specs: [
      spec("Pièces", "2 704"),
      spec("Statut", "Retiré (2016-2019), valeur de collection"),
      spec("Échelle", "1:8"),
    ],
  },
  "lego-ideas-machine-a-ecrire-21327": {
    description:
      "La machine à écrire fonctionnelle (chariot mobile) issue de LEGO Ideas, retirée de la vente. Objet déco autant que set : les exemplaires complets montés gardent une belle valeur.",
    specs: [spec("Pièces", "2 079"), spec("Statut", "Retiré, gamme Ideas"), spec("Sortie", "2021")],
  },
  "lego-titanic-10294": {
    description:
      "Le Titanic de 1,35 m, l'un des plus grands sets LEGO jamais produits (9 090 pièces). Boîte énorme : les frais de port pèsent lourd, comparez au prix livré.",
    specs: [spec("Pièces", "9 090"), spec("Longueur", "135 cm"), spec("Sortie", "2021")],
  },
  "catan-jeu-de-base": {
    description:
      "Le jeu de société moderne le plus vendu au monde : commerce, dés et stratégie pour 3-4 joueurs. Les boîtes d'occasion sont fréquentes et fiables si l'inventaire des pièces est complet.",
    specs: [
      spec("Joueurs", "3-4 (extensions pour 5-6)"),
      spec("Durée", "60-120 min"),
      spec("Âge", "10+"),
    ],
  },
  "les-aventuriers-du-rail-europe": {
    description:
      "Le jeu familial de construction de lignes ferroviaires, porte d'entrée classique du jeu de société moderne. Vérifiez le compte des wagons (240) : c'est ce qui manque le plus souvent d'occasion.",
    specs: [spec("Joueurs", "2-5"), spec("Durée", "30-60 min"), spec("Âge", "8+")],
  },
  "ravensburger-puzzle-5000-pieces": {
    description:
      "Les grands formats Ravensburger, référence de la découpe sans poussière. D'occasion, le risque est la pièce manquante : privilégiez les puzzles refaits une fois et recomptés en sachets d'origine.",
    specs: [spec("Pièces", "5 000"), spec("Dimensions", "Environ 153 × 101 cm")],
  },
  "anbernic-rg35xx": {
    description:
      "La console rétro de poche au format Game Boy, écran 3,5 pouces, qui émule jusqu'à la PS1. Les jeux ne sont pas fournis légalement : l'appareil seul vaut quelques dizaines d'euros, pas plus.",
    specs: [
      spec("Écran", "3,5 pouces 640 × 480"),
      spec("Émulation", "Consoles 8/16/32 bits, PS1"),
      spec("Stockage", "microSD"),
    ],
  },
  "analogue-pocket": {
    description:
      "La console FPGA qui lit les vraies cartouches Game Boy/GBA sur écran moderne haute densité. Vendue uniquement sur le site d'Analogue avec de longues attentes : l'occasion se paie au-dessus du neuf.",
    specs: [
      spec("Compatibilité", "Cartouches GB, GBC, GBA (adaptateurs : GG, NGP…)"),
      spec("Écran", "3,5 pouces 1600 × 1440"),
      spec("Technologie", "FPGA, pas d'émulation logicielle"),
    ],
  },
  "weber-q-1200": {
    description:
      "Le barbecue gaz nomade de Weber : grille fonte, couvercle, format balcon et camping. Increvable ; brûleur et grille se remplacent, ce qui rend l'occasion très rationnelle.",
    specs: [
      spec("Type", "Gaz, portable"),
      spec("Surface", "Grille fonte émaillée 43 × 32 cm"),
      spec("Pièces", "Détachées disponibles chez Weber"),
    ],
  },
  "weber-master-touch-57-cm": {
    description:
      "Le kettle charbon de 57 cm en version Master-Touch (système GBS, cheminées réglables). Les cuves émaillées traversent les décennies : un occasion saine se remet en route pour le prix d'une grille.",
    specs: [
      spec("Type", "Charbon, cuve 57 cm émaillée"),
      spec("Système", "Grille GBS (accessoires fonte)"),
      spec("Garantie neuve", "10 ans sur la cuve"),
    ],
  },
  "big-green-egg-large": {
    description:
      "Le kamado en céramique de référence : braise, fumage, pizza, hiver comme été. Très lourd et quasi indestructible hors choc : l'occasion locale avec remise en main propre est la voie royale.",
    specs: [
      spec("Type", "Kamado céramique, taille Large"),
      spec("Diamètre grille", "46 cm"),
      spec("Garantie neuve", "À vie sur la céramique (enregistrée)"),
    ],
  },
  "thule-motion-xt-coffre-de-toit": {
    description:
      "Le coffre de toit haut de gamme : ouverture double côté, fixation rapide PowerClick. Les tailles (M à XXL) et l'état des fixations font le prix ; vérifiez les clés et la compatibilité barres.",
    specs: [
      spec("Tailles", "M (400 L) à XXL (610 L)"),
      spec("Fixation", "PowerClick à couple pré-réglé"),
      spec("Ouverture", "Des deux côtés"),
    ],
  },
  "yeti-tundra-45": {
    description:
      "La glacière rotomoulée culte : plusieurs jours de glace, construction d'une pièce certifiée anti-ours. Chère neuve, elle garde une forte valeur : l'occasion décote peu.",
    specs: [
      spec("Construction", "Rotomoulée, isolation PermaFrost"),
      spec("Capacité", "32,9 L réels"),
      spec("Certification", "Résistante aux grizzlis (IGBC)"),
    ],
  },
  "msr-hubba-hubba-nx": {
    description:
      "La tente de randonnée deux places la plus répandue : 1,7 kg, montage autoportant. Sur l'occasion, imperméabilité des coutures et état des arceaux priment sur l'aspect du tissu.",
    specs: [
      spec("Places", "2"),
      spec("Poids", "Environ 1,7 kg"),
      spec("Structure", "Autoportante, un arceau unifié"),
    ],
  },
  "osprey-atmos-ag-65": {
    description:
      "Le sac de trek au dos suspendu Anti-Gravity, régulièrement élu meilleur portage de sa catégorie. Garantie Osprey très généreuse sur les défauts : un argument de plus pour la seconde main.",
    specs: [
      spec("Volume", "65 L"),
      spec("Portage", "Filet AntiGravity, tailles de dos réglables"),
      spec("Garantie", "All Mighty Guarantee (réparations Osprey)"),
    ],
  },
  "stanley-quencher-1-2-l": {
    description:
      "Le gobelet isotherme à paille devenu phénomène mondial : 1,18 L, poignée, compatible porte-gobelet. Attention aux copies : le poids et la gravure du fond distinguent l'original.",
    specs: [
      spec("Capacité", "1,18 L (40 oz)"),
      spec("Isolation", "Double paroi inox, couvercle 3 positions"),
    ],
  },
};
