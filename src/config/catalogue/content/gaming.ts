import { spec, type CatalogueContent } from "./define";

/**
 * Video games: one entry per slug of `src/config/catalogue/gaming.ts`
 * (the Steam Deck 512 Go keeps its sheet in `tech.ts`).
 */
export const gamingContent: Record<string, CatalogueContent> = {
  "nintendo-switch-2": {
    description:
      "La seconde génération de la Switch, sortie en juin 2025 : écran plus grand, Joy-Con aimantés, rétrocompatible avec la plupart des jeux Switch. En occasion, vérifiez qu'elle n'est pas liée à un compte Nintendo bloqué et que la station d'accueil est fournie.",
    specs: [
      spec("Écran", "LCD 7,9 pouces, 1080p"),
      spec("Sortie", "Juin 2025"),
      spec("Rétrocompatibilité", "La plupart des jeux Nintendo Switch"),
    ],
  },
  "nintendo-switch-modele-2019": {
    description:
      "La Switch d'origine dans sa révision de 2019, à l'autonomie nettement meilleure que le modèle de 2017. Repérez-la à sa boîte rouge ou à la référence HAC-001(-01) sous la console : c'est la version à privilégier en occasion.",
    specs: [
      spec("Écran", "LCD 6,2 pouces, 720p"),
      spec("Référence", "HAC-001(-01)"),
      spec("Révision", "2019, autonomie améliorée"),
    ],
  },
  "sony-playstation-4-pro-1-to": {
    description:
      "La PS4 la plus puissante, capable d'afficher certains jeux en 4K. Une console d'occasion très abordable pour profiter de l'immense ludothèque PS4. Écoutez la ventilation : un souffle fort indique qu'un nettoyage ou une pâte thermique neuve s'impose.",
    specs: [spec("Stockage", "1 To"), spec("Sortie", "Novembre 2016"), spec("Lecteur", "Blu-ray")],
  },
  "sony-playstation-4-slim-500-go": {
    description:
      "La PS4 compacte et silencieuse, l'une des consoles d'occasion les moins chères pour jouer aux grands titres de la génération précédente. Vérifiez que la manette tient la charge : c'est la pièce qui s'use le plus.",
    specs: [
      spec("Stockage", "500 Go"),
      spec("Sortie", "Septembre 2016"),
      spec("Lecteur", "Blu-ray"),
    ],
  },
  "microsoft-xbox-one-x-1-to": {
    description:
      "La Xbox One la plus puissante, avec lecteur Blu-ray 4K. Elle fait tourner l'essentiel du catalogue Xbox One et de nombreux jeux rétrocompatibles Xbox 360 : une bonne affaire d'occasion pour un salon équipé d'un téléviseur 4K.",
    specs: [
      spec("Stockage", "1 To"),
      spec("Sortie", "Novembre 2017"),
      spec("Lecteur", "Blu-ray UHD"),
    ],
  },
  "valve-steam-deck-oled-512-go": {
    description:
      "La révision OLED du Steam Deck : écran plus grand et plus lumineux, meilleure autonomie, Wi-Fi 6E. Elle fait tourner une grande partie de la bibliothèque Steam. En occasion, testez les sticks et demandez si l'écran a des marques de rétention.",
    specs: [
      spec("Écran", "OLED 7,4 pouces, HDR"),
      spec("Stockage", "512 Go"),
      spec("Sortie", "Novembre 2023"),
    ],
  },
  "asus-rog-ally": {
    description:
      "Le PC portable de jeu sous Windows d'Asus, avec écran 120 Hz. Plus ouvert que le Steam Deck (toutes les boutiques PC), mais moins endurant. Un défaut connu de lecteur de carte microSD touche certains exemplaires : demandez s'il fonctionne.",
    specs: [
      spec("Écran", "7 pouces, 1080p, 120 Hz"),
      spec("Système", "Windows 11"),
      spec("Sortie", "2023"),
    ],
  },
  "nintendo-new-3ds-xl": {
    description:
      "La dernière grande portable à double écran de Nintendo, avec 3D stabilisée. Sa ludothèque (Pokémon, Zelda, Mario Kart 7) en fait une valeur sûre d'occasion. Les charnières et l'écran du haut se rayent facilement : regardez les photos de près.",
    specs: [
      spec("Écrans", "Double écran, 3D sans lunettes"),
      spec("Sortie", "2015 en Europe"),
      spec("Rétrocompatibilité", "Jeux Nintendo DS"),
    ],
  },
  "sony-ps-vita": {
    description:
      "La portable de Sony, devenue une console de collection. Le modèle 1000 à écran OLED est le plus recherché. Prévoyez une carte mémoire Sony propriétaire : sans elle, la plupart des jeux ne se lancent pas.",
    specs: [
      spec("Écran", "5 pouces (OLED sur le modèle 1000)"),
      spec("Sortie", "Février 2012 en Europe"),
      spec("Stockage", "Carte mémoire PS Vita propriétaire"),
    ],
  },
  "nintendo-game-boy-advance-sp": {
    description:
      "La Game Boy Advance repliable et rétroéclairée, qui lit aussi les cartouches Game Boy et Game Boy Color. Préférez le modèle AGS-101 à l'écran rétroéclairé, plus lumineux, et vérifiez l'état de la batterie et de la charnière.",
    specs: [
      spec("Écran", "2,9 pouces, éclairé"),
      spec("Sortie", "2003"),
      spec("Rétrocompatibilité", "Game Boy et Game Boy Color"),
    ],
  },
  "nintendo-gamecube": {
    description:
      "La console de salon de Nintendo des années 2000, très recherchée par les collectionneurs pour Super Smash Bros. Melee ou Zelda Wind Waker. Vérifiez que le lecteur lit sans bruit anormal et que la console est fournie avec son alimentation.",
    specs: [
      spec("Support", "Mini-disque 8 cm"),
      spec("Sortie", "Mai 2002 en Europe"),
      spec("Manettes", "4 ports"),
    ],
  },
  "nintendo-64": {
    description:
      "La console de Super Mario 64, de Zelda Ocarina of Time et de GoldenEye, toujours très demandée. Les sticks analogiques s'usent avec le temps : un stick qui ne revient pas au centre est le défaut le plus courant.",
    specs: [
      spec("Support", "Cartouche"),
      spec("Sortie", "Mars 1997 en Europe"),
      spec("Manettes", "4 ports"),
    ],
  },
  "super-nintendo-snes": {
    description:
      "La console 16 bits de Nintendo, version européenne (PAL). Les cartouches japonaises ou américaines ne s'y insèrent pas sans adaptateur. Un boîtier jauni est fréquent et sans conséquence sur le fonctionnement.",
    specs: [
      spec("Support", "Cartouche"),
      spec("Sortie", "Avril 1992 en France"),
      spec("Version", "PAL européenne"),
    ],
  },
  "nintendo-classic-mini-super-nintendo": {
    description:
      "La réédition miniature de la Super Nintendo, avec 21 jeux préinstallés dont Star Fox 2, inédit à l'époque. Branchement HDMI, deux manettes fournies : vérifiez qu'elles sont bien dans l'annonce.",
    specs: [
      spec("Jeux", "21 préinstallés"),
      spec("Sortie", "Septembre 2017"),
      spec("Connectique", "HDMI, alimentation USB"),
    ],
  },
  "sony-playstation-2-slim": {
    description:
      "La console la plus vendue de l'histoire, dans sa version compacte. Une immense ludothèque disponible pour quelques euros d'occasion. Le lecteur est la pièce fragile : demandez si les DVD et les jeux se lancent sans erreur.",
    specs: [
      spec("Support", "DVD et CD"),
      spec("Sortie", "Novembre 2004"),
      spec("Rétrocompatibilité", "Jeux PlayStation 1"),
    ],
  },
  "manette-sony-dualsense-ps5": {
    description:
      "La manette d'origine de la PS5, avec retour haptique et gâchettes adaptatives. Le défaut le plus courant en occasion est la dérive des sticks (le personnage bouge seul) : demandez explicitement si la manette en souffre.",
    specs: [spec("Compatibilité", "PS5, PC"), spec("Batterie", "Intégrée, recharge USB-C")],
  },
  "manette-sony-dualsense-edge": {
    description:
      "La manette « pro » de la PS5 : palettes arrière, profils personnalisables et modules de sticks remplaçables, ce qui limite le problème de dérive. Vérifiez que l'étui et le câble tressé sont fournis.",
    specs: [
      spec("Compatibilité", "PS5, PC"),
      spec("Sticks", "Modules remplaçables"),
      spec("Sortie", "Janvier 2023"),
    ],
  },
  "manette-xbox-elite-series-2": {
    description:
      "La manette haut de gamme de Microsoft : palettes, tension des sticks réglable, batterie de longue durée. Elle a eu des soucis de bumpers et de revêtement qui se décolle sur certains lots : regardez les photos des grips.",
    specs: [
      spec("Compatibilité", "Xbox Series, Xbox One, PC"),
      spec("Batterie", "Intégrée, jusqu'à 40 h selon Microsoft"),
    ],
  },
  "manette-nintendo-switch-pro": {
    description:
      "La manette classique de la Switch, plus confortable que les Joy-Con pour les longues sessions. Autonomie très élevée. Méfiez-vous des copies très bon marché : le logo et la qualité des boutons les trahissent.",
    specs: [
      spec("Compatibilité", "Nintendo Switch et Switch 2"),
      spec("Batterie", "Intégrée, recharge USB-C"),
    ],
  },
  "mario-kart-8-deluxe-switch": {
    description:
      "Le jeu Switch le plus vendu, qui garde une très bonne cote d'occasion. Une cartouche nue suffit pour jouer ; une boîte complète se revend mieux. Les packs DLC sont liés au compte et ne s'achètent pas avec une cartouche d'occasion.",
    specs: [spec("Plateforme", "Nintendo Switch"), spec("Support", "Cartouche")],
  },
  "the-legend-of-zelda-tears-of-the-kingdom-switch": {
    description:
      "La suite de Breath of the Wild, sortie en 2023. Très demandée d'occasion, sa cote baisse lentement. Vérifiez qu'il s'agit bien de la version européenne si vous tenez aux textes en français sur la boîte.",
    specs: [
      spec("Plateforme", "Nintendo Switch"),
      spec("Sortie", "Mai 2023"),
      spec("Support", "Cartouche"),
    ],
  },
  "animal-crossing-new-horizons-switch": {
    description:
      "Le jeu de vie sur une île déserte de Nintendo. Attention, une seule île par console : si vous partagez une Switch déjà équipée, un second exemplaire ne permet pas de créer une deuxième île.",
    specs: [
      spec("Plateforme", "Nintendo Switch"),
      spec("Sortie", "Mars 2020"),
      spec("Support", "Cartouche"),
    ],
  },
  "super-mario-bros-wonder-switch": {
    description:
      "Le Mario en 2D de 2023, jouable à quatre sur la même console. Un jeu qui se revend bien, donc un achat d'occasion peu risqué.",
    specs: [
      spec("Plateforme", "Nintendo Switch"),
      spec("Sortie", "Octobre 2023"),
      spec("Support", "Cartouche"),
    ],
  },
  "pokemon-ecarlate-switch": {
    description:
      "Le Pokémon en monde ouvert de 2022. Écarlate et Violet ne diffèrent que par quelques Pokémon et professeurs : prenez la version la moins chère si cela vous est égal. Les extensions sont vendues à part.",
    specs: [
      spec("Plateforme", "Nintendo Switch"),
      spec("Sortie", "Novembre 2022"),
      spec("Support", "Cartouche"),
    ],
  },
  "sony-playstation-5-pro": {
    description:
      "La PS5 Pro affiche les jeux compatibles avec plus de détails et de fluidité. Elle est vendue sans lecteur de disque : comparez les offres à équipement égal, le lecteur s'achète à part.",
    specs: [
      spec("Stockage", "SSD 2 To"),
      spec("Lecteur de disque", "Vendu séparément"),
      spec("Sortie", "Novembre 2024"),
    ],
  },
  "meta-quest-3s-128-go": {
    description:
      "Le Quest 3S reprend la puce du Quest 3 dans un casque moins cher, avec des lentilles plus simples. D'occasion, demandez la réinitialisation et la dissociation du compte Meta du vendeur.",
    specs: [
      spec("Puce", "Snapdragon XR2 Gen 2"),
      spec("Stockage", "128 Go"),
      spec("Sortie", "Octobre 2024"),
    ],
  },
};
