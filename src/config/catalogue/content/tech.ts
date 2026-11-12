import { spec, type CatalogueContent } from "./define";

/**
 * Tech: phones, laptops, tablets, audio, consoles, screens.
 * One entry per slug of `src/config/catalogue/tech.ts`.
 */
export const techContent: Record<string, CatalogueContent> = {
  "apple-iphone-11-64-go": {
    description:
      "L'iPhone le moins cher encore mis à jour par Apple, très présent en reconditionné et d'occasion. Écran LCD, pas de 5G : un bon premier smartphone ou un téléphone de secours. La batterie a souvent plusieurs années, vérifiez sa capacité maximale (Réglages, Batterie).",
    specs: [
      spec("Écran", "LCD Liquid Retina 6,1 pouces"),
      spec("Puce", "Apple A13 Bionic"),
      spec("Stockage", "64 Go, non extensible"),
      spec("Photo", "Double capteur 12 Mpx (grand-angle + ultra grand-angle)"),
      spec("Sortie", "Septembre 2019"),
    ],
  },
  "apple-iphone-12-64-go": {
    description:
      "Premier iPhone à écran OLED et 5G sur toute la gamme, toujours mis à jour par Apple. Son prix en reconditionné en fait une porte d'entrée raisonnable dans l'écosystème iOS ; vérifiez l'état de la batterie, qui a souvent plusieurs années.",
    specs: [
      spec("Écran", "OLED Super Retina XDR 6,1 pouces"),
      spec("Puce", "Apple A14 Bionic"),
      spec("Stockage", "64 Go, non extensible"),
      spec("Photo", "Double capteur 12 Mpx (grand-angle + ultra grand-angle)"),
      spec("Sortie", "Octobre 2020"),
    ],
  },
  "apple-iphone-12-pro-128-go": {
    description:
      "La version Pro ajoute un téléobjectif, le scanner LiDAR et un cadre en acier inoxydable. En seconde main, l'écart de prix avec l'iPhone 12 classique s'est resserré : comparez les deux avant de choisir.",
    specs: [
      spec("Écran", "OLED Super Retina XDR 6,1 pouces"),
      spec("Puce", "Apple A14 Bionic"),
      spec("Stockage", "128 Go"),
      spec("Photo", "Triple capteur 12 Mpx + LiDAR"),
      spec("Sortie", "Octobre 2020"),
    ],
  },
  "apple-iphone-13-mini-128-go": {
    description:
      "Le dernier petit iPhone : 5,4 pouces, un gabarit qu'Apple ne fabrique plus. Recherché pour cette raison même en occasion ; l'autonomie est correcte mais inférieure aux modèles de taille standard.",
    specs: [
      spec("Écran", "OLED Super Retina XDR 5,4 pouces"),
      spec("Puce", "Apple A15 Bionic"),
      spec("Stockage", "128 Go"),
      spec("Poids", "141 g"),
      spec("Sortie", "Septembre 2021"),
    ],
  },
  "apple-iphone-13-pro-128-go": {
    description:
      "Écran 120 Hz ProMotion, téléobjectif et mode macro : le 13 Pro reste très capable pour la photo. En reconditionné, c'est souvent l'un des meilleurs rapports qualité-prix de la gamme Pro.",
    specs: [
      spec("Écran", "OLED ProMotion 120 Hz 6,1 pouces"),
      spec("Puce", "Apple A15 Bionic"),
      spec("Stockage", "128 Go"),
      spec("Photo", "Triple capteur 12 Mpx + LiDAR, macro"),
      spec("Sortie", "Septembre 2021"),
    ],
  },
  "apple-iphone-14-128-go": {
    description:
      "Évolution douce de l'iPhone 13 : même puce A15 (version 5 cœurs GPU), détection d'accident et photo de nuit améliorée. Son intérêt se joue entièrement au prix face au 13 et au 15.",
    specs: [
      spec("Écran", "OLED Super Retina XDR 6,1 pouces"),
      spec("Puce", "Apple A15 Bionic (GPU 5 cœurs)"),
      spec("Stockage", "128 Go"),
      spec("Photo", "Double capteur 12 Mpx"),
      spec("Sortie", "Septembre 2022"),
    ],
  },
  "apple-iphone-14-pro-128-go": {
    description:
      "Premier iPhone à Dynamic Island et à capteur principal 48 Mpx, avec écran toujours allumé. Un jalon de la gamme : il reste performant et très demandé en reconditionné.",
    specs: [
      spec("Écran", "OLED ProMotion 120 Hz 6,1 pouces, always-on"),
      spec("Puce", "Apple A16 Bionic"),
      spec("Stockage", "128 Go"),
      spec("Photo", "Capteur principal 48 Mpx + LiDAR"),
      spec("Sortie", "Septembre 2022"),
    ],
  },
  "apple-iphone-15-128-go": {
    description:
      "Le passage à l'USB-C et la Dynamic Island arrivent sur le modèle standard, avec le capteur 48 Mpx du 14 Pro. Un choix sûr pour plusieurs années de mises à jour.",
    specs: [
      spec("Écran", "OLED Super Retina XDR 6,1 pouces"),
      spec("Puce", "Apple A16 Bionic"),
      spec("Stockage", "128 Go"),
      spec("Connecteur", "USB-C"),
      spec("Sortie", "Septembre 2023"),
    ],
  },
  "apple-iphone-15-pro-128-go": {
    description:
      "Châssis en titane, bouton Action configurable et puce A17 Pro taillée pour le jeu. L'USB-C passe en vitesse USB 3 sur les modèles Pro, utile pour décharger photos et vidéos ProRes.",
    specs: [
      spec("Écran", "OLED ProMotion 120 Hz 6,1 pouces"),
      spec("Puce", "Apple A17 Pro"),
      spec("Stockage", "128 Go"),
      spec("Châssis", "Titane"),
      spec("Sortie", "Septembre 2023"),
    ],
  },
  "apple-iphone-16-128-go": {
    description:
      "L'iPhone de base de 2024, avec bouton Action, bouton Commande de l'appareil photo et puce A18. Récent, il se trouve surtout en reconditionné à quelques mois d'âge : l'écart avec le neuf est plus faible que sur les anciens modèles, comparez-le bien. Ne le confondez pas avec l'iPhone 16e, moins cher et moins équipé.",
    specs: [
      spec("Écran", "OLED Super Retina XDR 6,1 pouces"),
      spec("Puce", "Apple A18"),
      spec("Stockage", "128 Go, non extensible"),
      spec("Photo", "Double capteur 48 Mpx + 12 Mpx ultra grand-angle"),
      spec("Sortie", "Septembre 2024"),
    ],
  },
  "apple-iphone-15-pro-max-256-go": {
    description:
      "Le plus grand iPhone de sa génération, seul à embarquer le téléobjectif périscopique x5. Son prix en seconde main reste élevé : comparez bien l'état de la batterie et la facture d'origine.",
    specs: [
      spec("Écran", "OLED ProMotion 120 Hz 6,7 pouces"),
      spec("Puce", "Apple A17 Pro"),
      spec("Stockage", "256 Go"),
      spec("Photo", "Téléobjectif périscopique x5"),
      spec("Sortie", "Septembre 2023"),
    ],
  },
  "apple-iphone-se-2022-64-go": {
    description:
      "Le dernier iPhone à bouton Touch ID : format compact, puce A15 rapide, mais écran LCD 4,7 pouces d'ancienne génération. Pensé pour qui veut iOS au prix le plus bas, neuf ou reconditionné.",
    specs: [
      spec("Écran", "LCD Retina HD 4,7 pouces"),
      spec("Puce", "Apple A15 Bionic"),
      spec("Stockage", "64 Go"),
      spec("Biométrie", "Touch ID"),
      spec("Sortie", "Mars 2022"),
    ],
  },
  "samsung-galaxy-s22-128-go": {
    description:
      "Format compact (6,1 pouces) et dos en verre : le S22 vieillit bien et se trouve à bon prix en reconditionné. Vérifiez la version du logiciel, le suivi des mises à jour est de quatre générations d'Android.",
    specs: [
      spec("Écran", "AMOLED 120 Hz 6,1 pouces"),
      spec("Stockage", "128 Go"),
      spec("Photo", "Triple capteur, principal 50 Mpx"),
      spec("Sortie", "Février 2022"),
    ],
  },
  "samsung-galaxy-s23-ultra-256-go": {
    description:
      "Capteur 200 Mpx, zoom optique x10 et stylet S Pen intégré : l'Ultra de 2023 reste un photophone de référence. Lourd et grand, mais très complet ; les reconditionnés sont nombreux.",
    specs: [
      spec("Écran", "AMOLED 120 Hz 6,8 pouces"),
      spec("Stockage", "256 Go"),
      spec("Photo", "Principal 200 Mpx, zoom optique x3 et x10"),
      spec("Stylet", "S Pen intégré"),
      spec("Sortie", "Février 2023"),
    ],
  },
  "samsung-galaxy-s24-128-go": {
    description:
      "Le format compact de Samsung avec sept ans de mises à jour annoncées et les fonctions Galaxy AI. Un bon candidat à l'achat reconditionné : il restera à jour longtemps.",
    specs: [
      spec("Écran", "AMOLED 120 Hz 6,2 pouces"),
      spec("Stockage", "128 Go"),
      spec("Mises à jour", "7 ans annoncés (OS et sécurité)"),
      spec("Sortie", "Janvier 2024"),
    ],
  },
  "samsung-galaxy-s24-ultra-256-go": {
    description:
      "Cadre en titane, écran plat anti-reflets et S Pen : le haut de gamme Samsung de 2024, avec sept ans de mises à jour. Son prix d'occasion dépend beaucoup de l'état de l'écran.",
    specs: [
      spec("Écran", "AMOLED 120 Hz 6,8 pouces, anti-reflets"),
      spec("Stockage", "256 Go"),
      spec("Photo", "Principal 200 Mpx, zoom optique x5"),
      spec("Châssis", "Titane"),
      spec("Sortie", "Janvier 2024"),
    ],
  },
  "samsung-galaxy-a54-5g-128-go": {
    description:
      "Le milieu de gamme le plus vendu de Samsung : écran AMOLED 120 Hz, étanchéité IP67 et une autonomie solide. En neuf comme en occasion, il vise ceux qui veulent un téléphone fiable sans payer un S.",
    specs: [
      spec("Écran", "AMOLED 120 Hz 6,4 pouces"),
      spec("Stockage", "128 Go + microSD"),
      spec("Étanchéité", "IP67"),
      spec("Sortie", "Mars 2023"),
    ],
  },
  "samsung-galaxy-z-flip5-256-go": {
    description:
      "Pliant à clapet avec grand écran externe de 3,4 pouces, utilisable sans ouvrir le téléphone. Sur un pliant d'occasion, inspectez la pliure de l'écran et la charnière : c'est là que tout se joue.",
    specs: [
      spec("Écran", "AMOLED pliable 6,7 pouces + externe 3,4 pouces"),
      spec("Stockage", "256 Go"),
      spec("Format", "Clapet pliant"),
      spec("Sortie", "Août 2023"),
    ],
  },
  "google-pixel-7a-128-go": {
    description:
      "Le Pixel « a » de 2023 reprend la puce Tensor G2 du Pixel 7 et sa qualité photo pour nettement moins cher. Android pur, mises à jour directes de Google : une valeur sûre du milieu de gamme.",
    specs: [
      spec("Écran", "OLED 90 Hz 6,1 pouces"),
      spec("Puce", "Google Tensor G2"),
      spec("Stockage", "128 Go"),
      spec("Sortie", "Mai 2023"),
    ],
  },
  "google-pixel-7-128-go": {
    description:
      "Photo de référence à son prix et interface Google sans surcouche. Son format raisonnable et sa cote d'occasion douce en font un excellent premier Pixel.",
    specs: [
      spec("Écran", "OLED 90 Hz 6,3 pouces"),
      spec("Puce", "Google Tensor G2"),
      spec("Stockage", "128 Go"),
      spec("Sortie", "Octobre 2022"),
    ],
  },
  "google-pixel-8-pro-128-go": {
    description:
      "Le grand Pixel de 2023 : écran très lumineux, sept ans de mises à jour annoncés et les outils photo IA de Google (gomme magique, meilleure prise). Un reconditionné pérenne.",
    specs: [
      spec("Écran", "OLED 120 Hz 6,7 pouces"),
      spec("Puce", "Google Tensor G3"),
      spec("Stockage", "128 Go"),
      spec("Mises à jour", "7 ans annoncés"),
      spec("Sortie", "Octobre 2023"),
    ],
  },
  "google-pixel-8a-128-go": {
    description:
      "La formule Pixel au meilleur prix : Tensor G3, sept ans de mises à jour et la photo de la série 8. Le choix rationnel du milieu de gamme Android en 2024-2025.",
    specs: [
      spec("Écran", "OLED 120 Hz 6,1 pouces"),
      spec("Puce", "Google Tensor G3"),
      spec("Stockage", "128 Go"),
      spec("Mises à jour", "7 ans annoncés"),
      spec("Sortie", "Mai 2024"),
    ],
  },
  "xiaomi-redmi-note-13-pro-5g-256-go": {
    description:
      "Beaucoup de fiche technique pour le prix : AMOLED 120 Hz, capteur 200 Mpx et charge rapide 67 W. Le logiciel est plus chargé que chez Google ou Samsung, à savoir avant d'acheter.",
    specs: [
      spec("Écran", "AMOLED 120 Hz 6,67 pouces"),
      spec("Stockage", "256 Go"),
      spec("Photo", "Principal 200 Mpx"),
      spec("Charge", "67 W filaire"),
      spec("Sortie", "Janvier 2024"),
    ],
  },
  "nothing-phone-2-256-go": {
    description:
      "Design transparent à LED « Glyph », interface soignée proche d'Android pur et bon équilibre performances-prix. Une alternative originale aux marques établies, bien suivie en mises à jour.",
    specs: [
      spec("Écran", "OLED 120 Hz 6,7 pouces"),
      spec("Puce", "Snapdragon 8+ Gen 1"),
      spec("Stockage", "256 Go"),
      spec("Sortie", "Juillet 2023"),
    ],
  },
  "fairphone-4-128-go": {
    description:
      "Conçu pour être réparé soi-même : batterie, écran et modules photo se changent au tournevis, pièces vendues à l'unité. Garantie fabricant longue ; le choix durable par conception, idéal en seconde main.",
    specs: [
      spec("Écran", "LCD 6,3 pouces"),
      spec("Stockage", "128 Go + microSD"),
      spec("Réparabilité", "Modules remplaçables par l'utilisateur"),
      spec("Sortie", "Octobre 2021"),
    ],
  },
  "apple-macbook-air-m1-13-256-go": {
    description:
      "Le portable qui a inauguré les puces Apple Silicon : silencieux (sans ventilateur), autonome une journée, encore très à l'aise en bureautique et retouche légère. Le meilleur rapport qualité-prix du reconditionné Apple.",
    specs: [
      spec("Écran", "Retina 13,3 pouces"),
      spec("Puce", "Apple M1, 8 Go de mémoire unifiée"),
      spec("Stockage", "SSD 256 Go"),
      spec("Refroidissement", "Passif, sans ventilateur"),
      spec("Sortie", "Novembre 2020"),
    ],
  },
  "apple-macbook-pro-14-m1-pro-512-go": {
    description:
      "Écran mini-LED 120 Hz, ports HDMI et SD de retour, et une puce M1 Pro encore très rapide pour le montage et le développement. En reconditionné, il concurrence des machines neuves bien plus chères.",
    specs: [
      spec("Écran", "Liquid Retina XDR 14,2 pouces, 120 Hz"),
      spec("Puce", "Apple M1 Pro, 16 Go de mémoire unifiée"),
      spec("Stockage", "SSD 512 Go"),
      spec("Ports", "HDMI, SDXC, MagSafe, 3× Thunderbolt 4"),
      spec("Sortie", "Octobre 2021"),
    ],
  },
  "apple-macbook-pro-13-m2-256-go": {
    description:
      "Dernier MacBook Pro à Touch Bar : châssis de 2016, mais puce M2 et grande autonomie. Souvent moins cher que l'Air M2 en seconde main ; comparez les deux avant de choisir.",
    specs: [
      spec("Écran", "Retina 13,3 pouces"),
      spec("Puce", "Apple M2, 8 Go de mémoire unifiée"),
      spec("Stockage", "SSD 256 Go"),
      spec("Sortie", "Juin 2022"),
    ],
  },
  "lenovo-thinkpad-t14-gen-2": {
    description:
      "Le portable d'entreprise par excellence, massivement remis sur le marché à la fin des contrats de location : robuste, réparable, clavier excellent. Les reconditionnés professionnels sont très bon marché.",
    specs: [
      spec("Écran", "14 pouces (Full HD selon configuration)"),
      spec("Processeur", "Intel Core i5/i7 11e gén. ou AMD Ryzen 5000"),
      spec("Mémoire", "Un module remplaçable + une partie soudée"),
      spec("Clavier", "ThinkPad rétroéclairé, TrackPoint"),
      spec("Sortie", "2021"),
    ],
  },
  "lenovo-thinkpad-x1-carbon-gen-9": {
    description:
      "L'ultraportable professionnel de Lenovo : moins de 1,2 kg, châssis carbone, écran 16:10. Très répandu en reconditionné d'entreprise ; vérifiez l'état de la batterie, souvent sollicitée.",
    specs: [
      spec("Écran", "14 pouces 16:10"),
      spec("Processeur", "Intel Core 11e génération"),
      spec("Poids", "À partir de 1,13 kg"),
      spec("Sortie", "2021"),
    ],
  },
  "dell-latitude-7420": {
    description:
      "Concurrent direct du ThinkPad T14 dans les parcs d'entreprise : sobre, solide, facile à entretenir. Les unités reconditionnées abondent, ce qui tire les prix vers le bas — profitez-en.",
    specs: [
      spec("Écran", "14 pouces Full HD"),
      spec("Processeur", "Intel Core 11e génération"),
      spec("Sortie", "2021"),
    ],
  },
  "hp-elitebook-840-g8": {
    description:
      "Le troisième grand portable d'entreprise avec Dell et Lenovo : bon clavier, webcam avec volet, entretien aisé. En reconditionné, comparez surtout l'état de l'écran et la génération exacte du processeur.",
    specs: [
      spec("Écran", "14 pouces Full HD"),
      spec("Processeur", "Intel Core 11e génération"),
      spec("Sortie", "2021"),
    ],
  },
  "microsoft-surface-laptop-5-13-5": {
    description:
      "Portable fin au châssis aluminium et à l'écran tactile 3:2, agréable pour lire et écrire. L'entretien est difficile (composants soudés) : en occasion, privilégiez une batterie en bon état.",
    specs: [
      spec("Écran", "Tactile PixelSense 13,5 pouces, 3:2"),
      spec("Processeur", "Intel Core 12e génération"),
      spec("Sortie", "Octobre 2022"),
    ],
  },
  "microsoft-surface-pro-9": {
    description:
      "Tablette-PC avec béquille intégrée : un vrai Windows dans 880 g, clavier amovible en sus. Vérifiez que l'annonce inclut le clavier Type Cover, souvent vendu séparément.",
    specs: [
      spec("Écran", "Tactile PixelSense 13 pouces, 120 Hz"),
      spec("Processeur", "Intel Core 12e génération"),
      spec("Poids", "879 g sans clavier"),
      spec("Sortie", "Octobre 2022"),
    ],
  },
  "asus-rog-zephyrus-g14-2023": {
    description:
      "Portable de jeu compact de 14 pouces, réputé pour son équilibre puissance-poids. Sur le marché de l'occasion gaming, l'état du refroidissement et de l'écran prime : demandez des photos précises.",
    specs: [
      spec("Écran", "14 pouces 165 Hz"),
      spec("Processeur", "AMD Ryzen 9, GPU GeForce RTX série 40"),
      spec("Sortie", "2023"),
    ],
  },
  "valve-steam-deck-512-go": {
    description:
      "La console portable qui fait tourner la bibliothèque Steam. Les pièces détachées sont officiellement disponibles chez iFixit, ce qui en fait un achat d'occasion peu risqué.",
    specs: [
      spec("Écran", "LCD tactile 7 pouces"),
      spec("Stockage", "SSD NVMe 512 Go + microSD"),
      spec("Système", "SteamOS (Linux)"),
      spec("Sortie", "Février 2022"),
    ],
  },
  "apple-ipad-9-2021-64-go": {
    description:
      "Le dernier iPad à bouton principal et prise jack : l'entrée de gamme la plus vendue pour la famille et les études. Compatible Apple Pencil 1 ; très abordable en reconditionné.",
    specs: [
      spec("Écran", "Retina 10,2 pouces"),
      spec("Puce", "Apple A13 Bionic"),
      spec("Stockage", "64 Go"),
      spec("Stylet", "Apple Pencil (1re génération)"),
      spec("Sortie", "Septembre 2021"),
    ],
  },
  "apple-ipad-10-2022-64-go": {
    description:
      "Design moderne à bords plats, USB-C et écran 10,9 pouces. Positionné entre l'iPad 9 et l'Air : comparez les trois, les écarts de prix changent vite selon les offres.",
    specs: [
      spec("Écran", "Liquid Retina 10,9 pouces"),
      spec("Puce", "Apple A14 Bionic"),
      spec("Stockage", "64 Go"),
      spec("Connecteur", "USB-C"),
      spec("Sortie", "Octobre 2022"),
    ],
  },
  "apple-ipad-mini-6-64-go": {
    description:
      "Le petit format 8,3 pouces, parfait lecture et prise de notes avec l'Apple Pencil 2. Peu de concurrence sur ce gabarit : sa cote d'occasion reste ferme.",
    specs: [
      spec("Écran", "Liquid Retina 8,3 pouces"),
      spec("Puce", "Apple A15 Bionic"),
      spec("Stockage", "64 Go"),
      spec("Stylet", "Apple Pencil (2e génération)"),
      spec("Sortie", "Septembre 2021"),
    ],
  },
  "apple-ipad-pro-11-m2-128-go": {
    description:
      "L'iPad Pro 2022 : puce M2 de MacBook, écran 120 Hz et Thunderbolt. Pour le dessin et le montage ; en seconde main, vérifiez l'absence de marques d'Apple Pencil sur l'écran.",
    specs: [
      spec("Écran", "Liquid Retina 11 pouces, 120 Hz"),
      spec("Puce", "Apple M2"),
      spec("Stockage", "128 Go"),
      spec("Connecteur", "Thunderbolt / USB 4"),
      spec("Sortie", "Octobre 2022"),
    ],
  },
  "samsung-galaxy-tab-s9-128-go": {
    description:
      "La référence des tablettes Android : écran AMOLED, étanchéité IP68 et S Pen fourni dans la boîte. Vérifiez que le stylet accompagne bien l'annonce d'occasion.",
    specs: [
      spec("Écran", "AMOLED 120 Hz 11 pouces"),
      spec("Stockage", "128 Go + microSD"),
      spec("Étanchéité", "IP68, S Pen inclus"),
      spec("Sortie", "Août 2023"),
    ],
  },
  "amazon-kindle-paperwhite-11e-generation": {
    description:
      "La liseuse de référence : écran 6,8 pouces éclairé à température réglable, étanchéité IPX8 et des semaines d'autonomie. En occasion, vérifiez l'absence de marques d'écran, le reste ne s'use guère.",
    specs: [
      spec("Écran", "E Ink 6,8 pouces, 300 ppp, éclairage chaud"),
      spec("Étanchéité", "IPX8"),
      spec("Connecteur", "USB-C"),
      spec("Sortie", "Octobre 2021"),
    ],
  },
  "kobo-libra-2": {
    description:
      "L'alternative à Kindle, sans enfermement : formats EPUB ouverts, prêt numérique des bibliothèques (OverDrive) et boutons physiques de tournes de page. Très appréciée des gros lecteurs.",
    specs: [
      spec("Écran", "E Ink 7 pouces, 300 ppp"),
      spec("Formats", "EPUB, PDF, Kobo, OverDrive"),
      spec("Étanchéité", "IPX8"),
      spec("Sortie", "Octobre 2021"),
    ],
  },
  "apple-airpods-pro-2": {
    description:
      "Réduction de bruit parmi les meilleures du format intra, boîtier USB-C ou Lightning selon la série. Attention aux contrefaçons, nombreuses sur ce modèle : privilégiez les vendeurs bien évalués et le numéro de série vérifiable.",
    specs: [
      spec("Type", "Intra-auriculaires à réduction active de bruit"),
      spec("Puce", "Apple H2"),
      spec("Boîtier", "Charge sans fil, USB-C (série 2023) ou Lightning"),
      spec("Sortie", "Septembre 2022, révision USB-C 2023"),
    ],
  },
  "apple-airpods-max": {
    description:
      "Le casque circum-aural d'Apple : fabrication aluminium, spatialisation convaincante, mais poids élevé et étui minimaliste. En occasion, inspectez les coussinets (remplaçables) et l'état du bandeau.",
    specs: [
      spec("Type", "Casque circum-aural à réduction active de bruit"),
      spec("Poids", "385 g"),
      spec("Coussinets", "Magnétiques, remplaçables"),
      spec("Sortie", "Décembre 2020"),
    ],
  },
  "sony-wh-1000xm4": {
    description:
      "L'ancienne référence de la réduction de bruit, toujours excellente et nettement moins chère que le XM5 depuis sa succession. Pliable, contrairement à son successeur : un vrai atout en voyage.",
    specs: [
      spec("Type", "Casque circum-aural à réduction active de bruit"),
      spec("Autonomie", "Jusqu'à 30 h avec réduction active"),
      spec("Pliable", "Oui, charnières repliables"),
      spec("Sortie", "Août 2020"),
    ],
  },
  "sony-wf-1000xm5": {
    description:
      "Les intras haut de gamme de Sony : réduction de bruit au sommet, codec LDAC et format réduit par rapport au XM4. Les embouts mousse fournis conditionnent l'isolation, vérifiez leur présence.",
    specs: [
      spec("Type", "Intra-auriculaires à réduction active de bruit"),
      spec("Codecs", "SBC, AAC, LDAC"),
      spec("Autonomie", "8 h + 16 h avec le boîtier"),
      spec("Sortie", "Juillet 2023"),
    ],
  },
  "bose-quietcomfort-45": {
    description:
      "Le confort légendaire des QC avec une réduction de bruit toujours parmi les meilleures en avion. Léger, pliable, coussinets remplaçables : un classique du voyage, abordable en reconditionné.",
    specs: [
      spec("Type", "Casque circum-aural à réduction active de bruit"),
      spec("Poids", "238 g"),
      spec("Autonomie", "Jusqu'à 24 h"),
      spec("Sortie", "Septembre 2021"),
    ],
  },
  "sennheiser-momentum-4-wireless": {
    description:
      "L'autonomie record de sa catégorie (60 h annoncées) et une signature sonore réputée plus fidèle que la concurrence. Moins efficace en réduction de bruit que Bose ou Sony, meilleur en musique.",
    specs: [
      spec("Type", "Casque circum-aural à réduction active de bruit"),
      spec("Autonomie", "Jusqu'à 60 h"),
      spec("Sortie", "Août 2022"),
    ],
  },
  "sonos-era-100": {
    description:
      "L'enceinte connectée compacte de Sonos, désormais stéréo et dotée d'une entrée ligne via adaptateur. S'intègre à un système multipièce existant ; AirPlay 2 et Bluetooth inclus.",
    specs: [
      spec("Type", "Enceinte connectée Wi-Fi et Bluetooth"),
      spec("Audio", "Stéréo, deux tweeters et un woofer"),
      spec("Protocoles", "AirPlay 2, Sonos S2"),
      spec("Sortie", "Mars 2023"),
    ],
  },
  "sonos-move-2": {
    description:
      "La Sonos nomade : batterie de 24 h, étanchéité IP56, bascule Wi-Fi/Bluetooth automatique. Lourde (3 kg) mais pensée pour la terrasse comme le salon ; batterie remplaçable.",
    specs: [
      spec("Type", "Enceinte nomade Wi-Fi et Bluetooth"),
      spec("Autonomie", "Jusqu'à 24 h, batterie remplaçable"),
      spec("Étanchéité", "IP56"),
      spec("Sortie", "Septembre 2023"),
    ],
  },
  "jbl-charge-5": {
    description:
      "L'enceinte Bluetooth la plus répandue de sa gamme de prix : robuste, étanche IP67, et capable de recharger un téléphone. En occasion, testez la batterie, c'est sa principale usure.",
    specs: [
      spec("Type", "Enceinte Bluetooth nomade"),
      spec("Autonomie", "Jusqu'à 20 h"),
      spec("Étanchéité", "IP67, fonction powerbank"),
      spec("Sortie", "2021"),
    ],
  },
  "marshall-stanmore-iii": {
    description:
      "Enceinte de salon au look d'ampli guitare, signature sonore généreuse et réglages physiques de graves et d'aigus. Entrée ligne et Bluetooth ; un objet autant qu'une enceinte.",
    specs: [
      spec("Type", "Enceinte de salon Bluetooth"),
      spec("Entrées", "Bluetooth 5.2, jack 3,5 mm, RCA"),
      spec("Sortie", "2022"),
    ],
  },
  "sony-playstation-5-edition-numerique": {
    description:
      "La PS5 sans lecteur de disque : même puissance, uniquement des jeux dématérialisés. En occasion, demandez si la console est bien dissociée du compte PSN du vendeur avant l'achat.",
    specs: [
      spec("Stockage", "SSD 825 Go (version 2020) ou 1 To (Slim)"),
      spec("Lecteur", "Aucun, jeux numériques uniquement"),
      spec("Résolution", "4K, jusqu'à 120 Hz"),
      spec("Sortie", "Novembre 2020"),
    ],
  },
  "microsoft-xbox-series-s-512-go": {
    description:
      "La console actuelle la plus compacte et la moins chère, sans lecteur de disque, idéale avec le Game Pass. Limitée au 1440p : parfaite sur un salon non 4K ou comme seconde console.",
    specs: [
      spec("Stockage", "SSD 512 Go"),
      spec("Lecteur", "Aucun, jeux numériques uniquement"),
      spec("Résolution cible", "1440p à 60-120 Hz"),
      spec("Sortie", "Novembre 2020"),
    ],
  },
  "nintendo-switch-oled": {
    description:
      "La révision à écran OLED 7 pouces : couleurs bien plus riches en mode portable, béquille large et dock à port Ethernet. La valeur de revente des Switch reste élevée, négociez avec les jeux inclus.",
    specs: [
      spec("Écran", "OLED 7 pouces"),
      spec("Stockage", "64 Go + microSD"),
      spec("Modes", "Portable, sur table, téléviseur"),
      spec("Sortie", "Octobre 2021"),
    ],
  },
  "nintendo-switch-lite": {
    description:
      "La Switch 100 % portable : plus petite, plus légère, manettes non détachables et pas de sortie TV. Le choix économique pour jouer aux exclusivités Nintendo dans les transports.",
    specs: [
      spec("Écran", "LCD 5,5 pouces"),
      spec("Stockage", "32 Go + microSD"),
      spec("Modes", "Portable uniquement"),
      spec("Sortie", "Septembre 2019"),
    ],
  },
  "meta-quest-3-128-go": {
    description:
      "Casque de réalité mixte autonome : aucun PC requis, passthrough couleur et un vaste catalogue. En occasion, vérifiez l'état des lentilles (rayures) et la présence des deux manettes Touch Plus.",
    specs: [
      spec("Type", "Casque VR/MR autonome"),
      spec("Stockage", "128 Go"),
      spec("Optique", "Lentilles pancake, passthrough couleur"),
      spec("Sortie", "Octobre 2023"),
    ],
  },
  "sony-playstation-portal": {
    description:
      "Écran distant pour PS5 : il diffuse les jeux de votre console via Wi-Fi, il ne joue pas seul. Utile pour libérer le téléviseur ; nécessite une PS5 et une bonne connexion.",
    specs: [
      spec("Écran", "LCD 8 pouces, 1080p 60 Hz"),
      spec("Usage", "Lecture à distance d'une PS5 (Remote Play)"),
      spec("Sortie", "Novembre 2023"),
    ],
  },
  "lg-oled-c3-55-pouces": {
    description:
      "La référence des téléviseurs OLED pour le cinéma et le jeu : noirs parfaits, quatre HDMI 2.1 à 120 Hz. Sur un OLED d'occasion, demandez une photo d'écran uni pour repérer un éventuel marquage.",
    specs: [
      spec("Dalle", "OLED evo 55 pouces, 4K 120 Hz"),
      spec("HDMI", "4× HDMI 2.1, VRR, ALLM"),
      spec("Sortie", "2023"),
    ],
  },
  "samsung-the-frame-55-pouces": {
    description:
      "Le téléviseur-tableau : dalle mate antireflet, cadres interchangeables et mode Art quand il est éteint. Son boîtier déporté One Connect simplifie le câblage ; vérifiez qu'il est fourni.",
    specs: [
      spec("Dalle", "QLED mate 55 pouces, 4K"),
      spec("Particularité", "Mode Art, boîtier One Connect déporté"),
      spec("Sortie", "Gamme renouvelée chaque année"),
    ],
  },
  "dell-ultrasharp-u2723qe": {
    description:
      "Moniteur 27 pouces 4K IPS Black : contraste doublé par rapport aux IPS classiques, hub USB-C 90 W qui alimente un portable d'un seul câble. Un poste de travail complet.",
    specs: [
      spec("Dalle", "IPS Black 27 pouces, 4K"),
      spec("Connectique", "USB-C 90 W, hub USB, Ethernet"),
      spec("Sortie", "2022"),
    ],
  },
  "lg-ultragear-27gp850": {
    description:
      "Le moniteur de jeu le plus recommandé de sa génération : 27 pouces QHD, dalle Nano IPS 165 Hz (jusqu'à 180 Hz), compatible G-Sync et FreeSync. Encore très pertinent face aux modèles récents.",
    specs: [
      spec("Dalle", "Nano IPS 27 pouces, QHD 165 Hz"),
      spec("Synchronisation", "G-Sync Compatible, FreeSync Premium"),
      spec("Sortie", "2021"),
    ],
  },
  "logitech-mx-master-3s": {
    description:
      "La souris de productivité de référence : molette électromagnétique, clics silencieux, multi-appareils. Se recharge en USB-C ; très robuste, elle se trouve facilement en très bon état d'occasion.",
    specs: [
      spec("Capteur", "8 000 ppp, fonctionne sur verre"),
      spec("Connexion", "Bluetooth ou récepteur Logi Bolt, 3 appareils"),
      spec("Sortie", "2022"),
    ],
  },
  "apple-tv-4k-2022-64-go": {
    description:
      "Le boîtier TV le plus fluide du marché, interface sans publicité et puce A15. La version Wi-Fi 64 Go suffit à la plupart des usages ; la télécommande Siri se recharge en USB-C.",
    specs: [
      spec("Puce", "Apple A15 Bionic"),
      spec("Vidéo", "4K HDR, Dolby Vision, Dolby Atmos"),
      spec("Stockage", "64 Go"),
      spec("Sortie", "Novembre 2022"),
    ],
  },
  "synology-ds224": {
    description:
      "NAS deux baies pour sauvegardes familiales et photothèque auto-hébergée, piloté par le système DSM réputé de Synology. Les disques sont généralement vendus à part : lisez bien l'annonce.",
    specs: [
      spec("Baies", "2 (disques souvent non inclus)"),
      spec("Système", "Synology DSM"),
      spec("Sortie", "2023"),
    ],
  },
  "apple-iphone-16-pro-128-go": {
    description:
      "L'iPhone 16 Pro ajoute à l'iPhone 16 l'écran ProMotion à 120 Hz, le téléobjectif 5x et la puce A18 Pro. En reconditionné, vérifiez la capacité de la batterie, indiquée dans les réglages.",
    specs: [
      spec("Écran", '6,3", ProMotion 120 Hz'),
      spec("Puce", "Apple A18 Pro"),
      spec("Sortie", "Septembre 2024"),
    ],
  },
  "apple-iphone-17-256-go": {
    description:
      "L'iPhone 17 démarre à 256 Go et reprend l'écran ProMotion à 120 Hz, jusque-là réservé aux modèles Pro. Récent, il se trouve surtout neuf ou en reconditionné presque neuf.",
    specs: [
      spec("Écran", '6,3", ProMotion 120 Hz'),
      spec("Puce", "Apple A19"),
      spec("Sortie", "Septembre 2025"),
    ],
  },
  "samsung-galaxy-s25-128-go": {
    description:
      "Le Galaxy S25 tient dans un format compact et profite de sept ans de mises à jour promis par Samsung. Vérifiez que l'appareil n'est pas verrouillé à un opérateur ni lié à un compte Samsung.",
    specs: [
      spec("Écran", '6,2", 120 Hz'),
      spec("Puce", "Snapdragon 8 Elite for Galaxy"),
      spec("Mises à jour", "7 ans annoncés"),
    ],
  },
  "google-pixel-9-128-go": {
    description:
      "Le Pixel 9 mise sur la photo et sur sept ans de mises à jour d'Android. D'occasion, regardez l'écran sous une lumière rasante : les micro-rayures sont fréquentes.",
    specs: [
      spec("Écran", '6,3", 120 Hz'),
      spec("Puce", "Google Tensor G4"),
      spec("Mises à jour", "7 ans annoncées"),
    ],
  },
  "apple-macbook-air-m4-13-256-go": {
    description:
      "Le MacBook Air M4 démarre à 16 Go de mémoire unifiée et pilote deux écrans externes, capot fermé ou non. Le nombre de cycles de la batterie s'affiche dans les informations système : demandez-le.",
    specs: [
      spec("Puce", "Apple M4"),
      spec("Mémoire", "16 Go de base"),
      spec("Sortie", "Mars 2025"),
    ],
  },
  "apple-airpods-pro-3": {
    description:
      "Les AirPods Pro 3 améliorent la réduction de bruit et ajoutent un capteur de fréquence cardiaque. Pour des raisons d'hygiène et de batterie, préférez le neuf ou le reconditionné vendu par un professionnel.",
    specs: [spec("Sortie", "Septembre 2025"), spec("Capteur", "Fréquence cardiaque")],
  },
};
