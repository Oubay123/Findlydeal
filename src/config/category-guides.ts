import type { CategorySlug } from "@/types";

/**
 * Editorial guide of each category page: what to check before buying in this
 * category, written for a buyer comparing new, refurbished and second-hand
 * offers. Factual, no promises; the legal rules cited are developed (and
 * sourced) in the linked blog articles.
 */
export interface CategoryGuide {
  /** Two or three short paragraphs introducing the category's market. */
  intro: string[];
  /** Concrete checks before buying, one line each. */
  checks: { title: string; detail: string }[];
  /** Blog slugs that develop the subject (must exist in src/content/blog). */
  articles: string[];
}

export const categoryGuides: Record<CategorySlug, CategoryGuide> = {
  tech: {
    intro: [
      "Smartphones, ordinateurs et casques perdent vite de leur valeur de lancement : un modèle de l'an dernier coûte souvent 25 à 40 % de moins, sans différence sensible à l'usage. C'est la catégorie où comparer le neuf, le reconditionné et l'occasion rapporte le plus.",
      "Les prix relevés viennent d'annonces réelles des marketplaces interrogées, livrables en France. Chaque offre affiche son état exact, son vendeur et son prix livré ; les annonces d'accessoires, de lots et d'appareils bloqués sont écartées automatiquement.",
    ],
    checks: [
      {
        title: "La batterie d'abord",
        detail:
          "Sur un smartphone ou un portable d'occasion, exigez la capacité de batterie restante : c'est la première pièce d'usure.",
      },
      {
        title: "Mises à jour restantes",
        detail:
          "Un appareil encore suivi par son fabricant (5 à 7 ans sur les modèles récents) vaut plus qu'une fiche technique brillante mais abandonnée.",
      },
      {
        title: "Vendeur professionnel = garantie légale de 2 ans",
        detail:
          "Entre particuliers, aucune garantie légale de conformité : l'écart de prix doit compenser ce risque.",
      },
      {
        title: "Référence exacte",
        detail:
          "Un iPhone « 128 Go » n'est pas un « 64 Go », un Pro n'est pas un Pro Max : vérifiez le titre complet de l'annonce, affiché sur chaque offre.",
      },
    ],
    articles: [
      "bien-acheter-produit-reconditionne",
      "garantie-produit-reconditionne",
      "bien-choisir-ordinateur-reconditionne",
    ],
  },
  "home-appliances": {
    intro: [
      "L'électroménager est le royaume des « prix conseillés » barrés toute l'année : la seule comparaison honnête est le prix livré du moment, à état égal. Les robots de cuisine et aspirateurs haut de gamme perdent 30 à 50 % en quelques années, alors que leur durée de vie réelle se compte en décennies pour les mieux construits.",
      "Les marques dont les pièces détachées restent disponibles (Vorwerk, KitchenAid, Dyson, Weber…) sont celles dont l'occasion a le plus de sens : une pièce d'usure se remplace, un moteur bien conçu survit à plusieurs propriétaires.",
    ],
    checks: [
      {
        title: "Pièces d'usure comprises ?",
        detail:
          "Batterie d'aspirateur, bol de robot, cuve de multicuiseur : vérifiez leur état et leur prix de remplacement avant de comparer.",
      },
      {
        title: "Entretien documenté",
        detail:
          "Pour une machine à café automatique, demandez la fréquence de détartrage : c'est elle qui fait la longévité.",
      },
      {
        title: "Indice de durabilité",
        detail:
          "Les lave-linge l'affichent depuis avril 2025 : une note sur 10 qui combine réparabilité et fiabilité.",
      },
      {
        title: "Frais de port réalistes",
        detail:
          "Sur le gros électroménager, le port peut dépasser 10 % du prix : nous classons toujours au prix livré.",
      },
    ],
    articles: ["reperer-une-vraie-bonne-affaire", "economie-circulaire-tendances-2026"],
  },
  furniture: {
    intro: [
      "Le mobilier de créateur est fait pour plusieurs vies : un fauteuil Herman Miller est garanti douze ans neuf, un USM se démonte et se reconfigure, une Tolix se repeint. L'occasion y est souvent le choix rationnel — à condition d'authentifier la pièce.",
      "Les contrefaçons sont nombreuses sur les classiques du design (Eames, Togo, Arco). Les éditions authentiques portent marquages, étiquettes ou numéros : nous indiquons dans chaque fiche les repères propres au modèle.",
    ],
    checks: [
      {
        title: "L'édition fait le prix",
        detail:
          "Une chaise Eames n'a de valeur que signée Vitra (Europe) ou Herman Miller : cherchez le marquage sous l'assise.",
      },
      {
        title: "Taille et version exactes",
        detail:
          "Aeron A/B/C, Togo chauffeuse ou angle, Pliage S à XL : comparez des annonces de la même déclinaison.",
      },
      {
        title: "Remise en main propre",
        detail:
          "Pour les pièces lourdes ou fragiles, un retrait sur place permet d'inspecter structure et mécanismes avant de payer.",
      },
      {
        title: "Pièces et coussins remplaçables",
        detail:
          "IKEA, Fermob ou Stressless vendent coussins et pièces à l'unité : une occasion fatiguée peut se remettre à neuf pour peu.",
      },
    ],
    articles: ["reperer-une-vraie-bonne-affaire"],
  },
  "watches-jewelry": {
    intro: [
      "Une montre mécanique s'entretient et se transmet : le marché de l'occasion horlogère est l'un des plus structurés qui soient, avec des cotes suivies modèle par modèle. De la Casio à 30 € à la Speedmaster, la règle est la même : comparer à référence exacte et à état égal.",
      "Sur les pièces de valeur, l'authentification n'est pas une option : boîte, papiers, numéro de série et facture font une part importante du prix. Une offre très en dessous du marché est signalée « à vérifier » plutôt que présentée comme une affaire.",
    ],
    checks: [
      {
        title: "Référence exacte",
        detail:
          "Une Tissot PRX quartz n'est pas une Powermatic, une Fenix 7 n'est pas une 7 Pro : le titre complet de l'annonce est affiché sur chaque offre.",
      },
      {
        title: "Boîte et papiers",
        detail:
          "Sur une montre de valeur, le « full set » (boîte, carte, facture) se revend nettement mieux et limite le risque de contrefaçon.",
      },
      {
        title: "Révision récente ?",
        detail:
          "Une mécanique se révise environ tous les 5 à 10 ans ; une révision récente justifie un prix plus haut, son absence est un coût à prévoir.",
      },
      {
        title: "Bracelet d'origine",
        detail:
          "Maillons manquants et bracelets de remplacement amputent la valeur : demandez des photos du fermoir et des cornes.",
      },
    ],
    articles: ["reperer-une-vraie-bonne-affaire"],
  },
  refurbished: {
    intro: [
      "« Reconditionné » est un terme encadré par la loi française : produit d'occasion testé sur toutes ses fonctionnalités, remis en état si nécessaire, données effacées. Les mentions « comme neuf » ou « état neuf » sont interdites — une annonce qui les emploie est un signal d'alerte.",
      "Vendu par un professionnel, un reconditionné bénéficie de la garantie légale de conformité de deux ans, avec présomption de défaut pendant les douze premiers mois. Cette page rassemble les offres reconditionnées de toutes nos catégories.",
    ],
    checks: [
      {
        title: "Le grade décrit l'aspect, pas la technique",
        detail:
          "« Très bon état » parle des rayures ; batterie, pièces remplacées et garantie sont des informations séparées.",
      },
      {
        title: "Capacité de batterie garantie",
        detail:
          "Les reconditionneurs sérieux annoncent un minimum (souvent 80-85 %) : une annonce muette sur ce point est incomplète.",
      },
      {
        title: "Garantie commerciale en plus",
        detail:
          "12 ou 24 mois offerts par le vendeur s'ajoutent à la garantie légale, ils ne la remplacent jamais.",
      },
    ],
    articles: [
      "bien-acheter-produit-reconditionne",
      "grades-reconditionnement-expliques",
      "garantie-produit-reconditionne",
      "pourquoi-acheter-reconditionne",
    ],
  },
  fashion: {
    intro: [
      "Baskets, vestes et sacs iconiques ont désormais une cote, comme les montres : certains coloris se revendent au-dessus du neuf, d'autres perdent la moitié de leur valeur en une saison. Comparer au prix du marché du jour évite les deux pièges — surpayer un basique, rater une vraie occasion.",
      "C'est aussi la catégorie la plus contrefaite. Vendeurs notés, photos des étiquettes et des numéros de série, prix cohérent avec le marché : nos fiches rappellent les points de contrôle propres à chaque modèle.",
    ],
    checks: [
      {
        title: "Mesures à plat plutôt que taille étiquette",
        detail:
          "Les tailles varient d'une décennie et d'une marque à l'autre : demandez épaules, poitrine et longueur, comparez à un vêtement à vous.",
      },
      {
        title: "Authentification proportionnée au prix",
        detail:
          "Pour le luxe (sacs, doudounes), facture, numéros et avis d'un service d'authentification valent le coût.",
      },
      {
        title: "Chaussures de sport : le kilométrage",
        detail:
          "Une mousse de running se tasse vers 600-800 km, quel que soit l'aspect extérieur de la chaussure.",
      },
      {
        title: "Matières qui durent",
        detail: "Cuir, laine dense, toile cirée vieillissent bien ; les mélanges fins bouloches.",
      },
    ],
    articles: ["vetements-seconde-main-guide", "reperer-une-vraie-bonne-affaire"],
  },
  "second-hand": {
    intro: [
      "L'occasion est le levier d'économie le plus direct — et le plus durable : selon l'ADEME, les trois quarts des impacts d'un smartphone viennent de sa fabrication. Prolonger la vie d'un objet existant reste le geste le plus efficace.",
      "Acheté à un professionnel, un bien d'occasion garde la garantie légale de conformité de deux ans ; entre particuliers, elle n'existe pas. Chaque offre indique ici le type de vendeur, et les frais de Protection des acheteurs eBay sont estimés sur les annonces de particuliers.",
    ],
    checks: [
      {
        title: "Type de vendeur affiché",
        detail:
          "Professionnel : garantie légale 2 ans. Particulier : prix souvent plus bas, mais aucun recours simple en cas de panne.",
      },
      {
        title: "Historique du vendeur",
        detail:
          "Ancienneté du compte et évaluations : un prix très bas chez un vendeur tout neuf est le schéma classique de la fraude.",
      },
      {
        title: "Description complète, pas seulement le titre",
        detail:
          "Accessoires manquants, défauts signalés en fin d'annonce : lisez tout avant de comparer deux prix.",
      },
      {
        title: "Prix trop beau = à vérifier",
        detail:
          "Nos pages marquent « Prix inhabituel, à vérifier » toute offre très en dessous des offres comparables.",
      },
    ],
    articles: [
      "neuf-reconditionne-occasion-que-choisir",
      "vetements-seconde-main-guide",
      "reperer-une-vraie-bonne-affaire",
    ],
  },
  leisure: {
    intro: [
      "Appareils photo, instruments, vélos et jeux ont un marché de l'occasion ancien et sain : le matériel de passionné est souvent bien entretenu, et sa valeur se mesure à des critères objectifs — nombre de déclenchements d'un boîtier, kilométrage d'une mousse, inventaire d'une boîte.",
      "Les prix de référence du neuf y sont trompeurs : beaucoup de références (LEGO retirés, consoles rétro, éditions limitées) cotent au-dessus de leur prix d'origine. La médiane du marché du jour, à état égal, est la seule base de comparaison utile.",
    ],
    checks: [
      {
        title: "Boîtier photo : les déclenchements",
        detail:
          "C'est le kilométrage d'un appareil ; demandez le compteur avant de comparer deux offres.",
      },
      {
        title: "Jeux et LEGO : l'inventaire",
        detail:
          "« Complet avec notice et boîte » change le prix du tout au tout ; exigez le détail des pièces.",
      },
      {
        title: "Vélos et trottinettes : batterie et numéro de série",
        detail: "Cycles de charge pour la batterie, numéro de cadre vérifiable contre le vol.",
      },
      {
        title: "Instruments : l'état fait tout",
        detail:
          "Frettes, manche, électronique pour une guitare ; pointe de cellule pour une platine.",
      },
    ],
    articles: ["reperer-une-vraie-bonne-affaire", "neuf-reconditionne-occasion-que-choisir"],
  },
  gaming: {
    intro: [
      "Les consoles et les jeux se revendent bien et s'achètent beaucoup d'occasion : une console de génération précédente coûte souvent moins de la moitié de son prix de sortie, et les jeux en cartouche gardent leur valeur.",
      "Les prix relevés viennent d'annonces réelles livrables en France. Les boîtes vides, les consoles en panne ou « pour pièces » et les accessoires seuls sont écartés automatiquement.",
    ],
    checks: [
      {
        title: "Manettes et sticks",
        detail:
          "La dérive des sticks (le personnage bouge seul) est le défaut le plus courant : demandez-le explicitement au vendeur.",
      },
      {
        title: "Compte et bannissement",
        detail:
          "Une console liée à un compte ou bannie du jeu en ligne perd une grande partie de son usage : vérifiez qu'elle a été réinitialisée.",
      },
      {
        title: "Ce qui est inclus",
        detail:
          "Alimentation, câble HDMI, station d'accueil, manettes : une console nue coûte plus cher à compléter qu'il n'y paraît.",
      },
      {
        title: "Version régionale",
        detail:
          "Sur les consoles rétro, une machine européenne (PAL) ne lit pas toujours les jeux japonais ou américains.",
      },
    ],
    articles: ["neuf-reconditionne-occasion-que-choisir", "reperer-une-vraie-bonne-affaire"],
  },
  kids: {
    intro: [
      "Poussettes, chaises hautes et porte-bébés servent quelques mois et se trouvent souvent en très bon état d'occasion, pour la moitié du prix neuf ou moins. C'est l'une des catégories où la seconde main est la plus naturelle.",
      "Une règle à part pour les sièges auto : n'en achetez un d'occasion que si vous connaissez son histoire. Un siège qui a subi un accident doit être remplacé, même sans dommage visible.",
    ],
    checks: [
      {
        title: "Siège auto : histoire et norme",
        detail:
          "Aucun choc subi, notice présente, norme R129 (i-Size) lisible sur l'étiquette, date de fabrication récente.",
      },
      {
        title: "Ce qui est inclus",
        detail:
          "Nacelle, siège, base, habillage pluie se vendent souvent séparément : comparez ce que contient chaque annonce.",
      },
      {
        title: "Usure mécanique",
        detail:
          "Roues, freins, pliage et boucles de harnais : demandez une vidéo si les photos ne suffisent pas.",
      },
      {
        title: "Appareils connectés",
        detail:
          "Toniebox, Lunii, Yoto : l'appareil doit être retiré du compte du vendeur, sinon vous ne pourrez pas l'utiliser.",
      },
    ],
    articles: ["neuf-reconditionne-occasion-que-choisir", "reperer-une-vraie-bonne-affaire"],
  },
  diy: {
    intro: [
      "Un outil professionnel bien entretenu dure des décennies : Makita, DeWalt, Bosch Professional ou Festool se revendent bien et s'achètent couramment d'occasion.",
      "Pour les outils sans fil, le prix dépend surtout de ce qui accompagne la machine : batteries et chargeur représentent souvent la moitié de la valeur d'un kit.",
    ],
    checks: [
      {
        title: "Machine nue ou kit",
        detail:
          "Vérifiez le nombre et la capacité des batteries, et la présence du chargeur, avant de comparer deux prix.",
      },
      {
        title: "Même plateforme de batteries",
        detail:
          "Restez sur une marque dont vous avez déjà les batteries : Bosch bleu (pro) et Bosch vert (grand public) ne sont pas compatibles.",
      },
      {
        title: "Sécurité",
        detail:
          "Carter de meuleuse, frein de chaîne de tronçonneuse, câble d'alimentation intact : ne transigez pas sur ces éléments.",
      },
      {
        title: "Robots tondeuses",
        detail:
          "Demandez le code antivol et que le robot soit retiré du compte du vendeur ; vérifiez la présence de la station et du câble.",
      },
    ],
    articles: ["neuf-reconditionne-occasion-que-choisir", "reperer-une-vraie-bonne-affaire"],
  },
  mobility: {
    intro: [
      "Trottinettes et vélos électriques se revendent beaucoup : un modèle d'un ou deux ans coûte souvent nettement moins cher que neuf, à condition que la batterie ait été bien traitée.",
      "La batterie représente une grande partie de la valeur. Un écart de prix entre deux annonces du même modèle s'explique souvent par son état et par le kilométrage.",
    ],
    checks: [
      {
        title: "La batterie avant tout",
        detail:
          "Demandez le kilométrage et, si l'application l'affiche, l'état de la batterie ; essayez l'appareil chargé.",
      },
      {
        title: "Version européenne bridée",
        detail:
          "En France, une trottinette ne doit pas dépasser 25 km/h ; une version débridée n'est pas autorisée sur la voie publique.",
      },
      {
        title: "Pneus, freins et pliage",
        detail:
          "Regardez l'usure des pneus, l'efficacité des freins et le jeu de la colonne ou de la charnière de pliage.",
      },
      {
        title: "Facture et antivol",
        detail:
          "Demandez la facture d'origine et, pour un vélo, que l'appareil soit retiré du compte ou de l'application du vendeur.",
      },
    ],
    articles: ["neuf-reconditionne-occasion-que-choisir", "reperer-une-vraie-bonne-affaire"],
  },
  beauty: {
    intro: [
      "Les appareils de coiffure et de soin haut de gamme coûtent cher en neuf et se trouvent souvent reconditionnés par la marque ou par des professionnels, avec garantie.",
      "Pour tout ce qui touche la peau ou la bouche (tête de brosse à dents, épilateur, rasoir), préférez le neuf ou le reconditionné professionnel avec pièces d'hygiène neuves.",
    ],
    checks: [
      {
        title: "Attention aux contrefaçons",
        detail:
          "Dyson et ghd sont très copiés : un prix très bas sans facture est un signal d'alerte.",
      },
      {
        title: "Accessoires inclus",
        detail:
          "Comparez à embouts égaux : le nombre d'accessoires varie beaucoup d'un pack à l'autre.",
      },
      {
        title: "Hygiène",
        detail:
          "Têtes de brosse, grilles de rasoir et embouts en contact avec la peau doivent être neufs.",
      },
      {
        title: "Garantie",
        detail:
          "Un reconditionné vendu par un professionnel bénéficie de la garantie légale de conformité, pas une vente entre particuliers.",
      },
    ],
    articles: ["garantie-produit-reconditionne", "bien-acheter-produit-reconditionne"],
  },
  sport: {
    intro: [
      "Home trainers, rameurs et compteurs vélo sont achetés avec enthousiasme puis souvent peu utilisés : le marché de l'occasion est fourni, en très bon état.",
      "Ce matériel est encombrant et lourd : à prix égal, une offre avec remise en main propre ou livraison comprise vaut plus qu'une annonce dont le port reste à payer.",
    ],
    checks: [
      {
        title: "Compatibilité",
        detail:
          "Pour un home trainer, vérifiez la cassette fournie et l'axe de votre vélo ; pour un compteur, la fixation.",
      },
      {
        title: "Comptes et applications",
        detail:
          "Demandez que l'appareil soit dissocié du compte du vendeur (Garmin, Wahoo, Zwift, Peloton).",
      },
      {
        title: "Usure mécanique",
        detail:
          "Bruits, jeu ou courroie usée sur un rameur ou un vélo d'appartement : demandez une vidéo de fonctionnement.",
      },
      {
        title: "Abonnement",
        detail:
          "Certains appareils connectés réclament un abonnement pour leurs programmes : comptez-le dans le coût total.",
      },
    ],
    articles: ["neuf-reconditionne-occasion-que-choisir", "reperer-une-vraie-bonne-affaire"],
  },
};
