import { spec, type CatalogueContent } from "./define";

/** Children: one entry per slug of `src/config/catalogue/kids.ts`. */
export const kidsContent: Record<string, CatalogueContent> = {
  "babyzen-yoyo2": {
    description:
      "La poussette ultra-compacte qui se plie d'une main et passe en bagage cabine chez de nombreuses compagnies. Les packs (0+ ou 6+) se vendent séparément : vérifiez ce que contient l'annonce, et que le châssis est bien un YOYO² ou YOYO2 et non un ancien YOYO+.",
    specs: [
      spec("Pliage", "D'une main, format cabine"),
      spec("Âge", "Dès la naissance avec le pack 0+, 6 mois avec le pack 6+"),
    ],
  },
  "bugaboo-fox-3": {
    description:
      "La poussette tout-terrain de Bugaboo, avec nacelle et siège réversible. Très recherchée d'occasion. Vérifiez les roues et la suspension, et ce qui est inclus : nacelle, siège, habillage pluie se vendent souvent séparément.",
    specs: [
      spec("Usage", "Ville et chemins"),
      spec("Configuration", "Nacelle et siège réversible"),
      spec("Sortie", "2021"),
    ],
  },
  "bugaboo-butterfly": {
    description:
      "La poussette compacte de voyage de Bugaboo, pliable en une seconde et conforme à de nombreux bagages cabine. Elle s'utilise dès 6 mois, ou dès la naissance avec le kit nouveau-né vendu à part.",
    specs: [
      spec("Pliage", "D'une main, format cabine"),
      spec("Âge", "Dès 6 mois (dès la naissance avec kit)"),
    ],
  },
  "cybex-priam": {
    description:
      "La poussette haut de gamme de Cybex, au châssis interchangeable entre plusieurs sièges. Les générations se succèdent : comparez l'année du châssis, et vérifiez la compatibilité si vous ajoutez une coque Cybex.",
    specs: [
      spec("Configuration", "Nacelle et siège réversible"),
      spec("Compatibilité", "Coques Cybex avec adaptateurs"),
    ],
  },
  "joolz-day": {
    description:
      "Une poussette confortable et robuste, à grandes roues, appréciée pour son panier généreux. Le Day+ est la génération 2020 du Day ; les housses textiles se changent facilement, les roues et le châssis sont l'essentiel à vérifier.",
    specs: [
      spec("Configuration", "Nacelle et siège réversible"),
      spec("Génération", "Day+ (2020)"),
    ],
  },
  "thule-urban-glide-2": {
    description:
      "La poussette de jogging à trois roues de Thule, avec frein à main. Elle supporte bien l'usage intensif. Contrôlez l'état des pneus et le fonctionnement du frein avant achat.",
    specs: [
      spec("Usage", "Course à pied, chemins"),
      spec("Roues", "3 roues gonflables, frein à main"),
    ],
  },
  "maxi-cosi-pebble-360": {
    description:
      "La coque pivotante de Maxi-Cosi, homologuée i-Size, pour les premiers mois. N'achetez un siège auto d'occasion qu'en connaissant son histoire : un siège qui a subi un accident doit être remplacé, même sans dommage visible. La base FamilyFix 360 est souvent vendue à part.",
    specs: [
      spec("Norme", "R129 (i-Size)"),
      spec("Taille enfant", "40 à 83 cm"),
      spec("Installation", "Pivotante sur base FamilyFix 360"),
    ],
  },
  "cybex-cloud-t-i-size": {
    description:
      "La coque inclinable et pivotante de Cybex pour les nouveau-nés. Comme pour tout siège auto, achetez-la seulement si le vendeur garantit qu'elle n'a subi aucun choc, et vérifiez la date de fabrication sous la coque.",
    specs: [spec("Norme", "R129 (i-Size)"), spec("Taille enfant", "45 à 87 cm")],
  },
  "doona-i-siege-auto-poussette": {
    description:
      "Un siège auto dont les roues se déplient pour en faire une poussette : pratique en ville et en voyage, pour la première année. Mêmes précautions que pour tout siège auto d'occasion : histoire connue, aucun accident.",
    specs: [spec("Norme", "R129 (i-Size)"), spec("Usage", "Siège auto et poussette intégrée")],
  },
  "stokke-tripp-trapp": {
    description:
      "La chaise évolutive en hêtre qui suit l'enfant de la naissance à l'âge adulte. Elle se revend très bien. Le baby set et le harnais sont des accessoires séparés : vérifiez qu'ils sont inclus si l'enfant est petit.",
    specs: [
      spec("Matière", "Hêtre massif"),
      spec("Usage", "De 6 mois à l'âge adulte (dès la naissance avec newborn set)"),
    ],
  },
  "babybjorn-transat-bliss": {
    description:
      "Le transat à bascule sans moteur de BabyBjörn, que l'enfant fait bouger lui-même. Il se lave facilement (housse amovible) et se replie à plat : un achat d'occasion classique.",
    specs: [spec("Âge", "De la naissance à 2 ans environ"), spec("Housse", "Amovible, lavable")],
  },
  "babybjorn-porte-bebe-harmony": {
    description:
      "Le porte-bébé physiologique haut de gamme de BabyBjörn, en maille souple. Vérifiez l'état des boucles et des sangles, et que l'étiquette de lavage est lisible.",
    specs: [spec("Portage", "Ventral et dorsal"), spec("Âge", "De la naissance à 3 ans")],
  },
  "ergobaby-omni-360": {
    description:
      "Un porte-bébé utilisable dès la naissance sans coussin réducteur, en quatre positions. Les versions se distinguent par la matière (coton ou Cool Air en maille) : précisez celle que vous cherchez.",
    specs: [
      spec("Portage", "4 positions : ventral, face au monde, hanche, dos"),
      spec("Âge", "De 3,2 à 20 kg"),
    ],
  },
  "chicco-next2me-magic-lit-cododo": {
    description:
      "Le berceau cododo qui se fixe contre le lit des parents, côté ouvert. Achetez un matelas neuf pour des raisons d'hygiène, et vérifiez que le kit de fixation au lit est fourni.",
    specs: [spec("Usage", "Cododo puis berceau"), spec("Âge", "Jusqu'à 9 kg")],
  },
  "beaba-babycook": {
    description:
      "Le robot qui cuit à la vapeur et mixe les repas de bébé. Inspectez la cuve et le joint, et détartrez avant le premier usage.",
    specs: [spec("Fonctions", "Cuisson vapeur, mixage, réchauffage")],
  },
  "toniebox-coffret-de-demarrage": {
    description:
      "L'enceinte pour enfants qui lit des histoires et des chansons en posant une figurine dessus. Une box d'occasion doit être dissociée du compte du vendeur : demandez-le avant d'acheter, sinon impossible de l'utiliser.",
    specs: [spec("Fonctionnement", "Figurines Tonies, Wi-Fi pour la configuration")],
  },
  "lunii-ma-fabrique-a-histoires": {
    description:
      "Le boîtier audio français qui permet à l'enfant de composer ses histoires, sans écran. Comme pour la Toniebox, l'appareil doit être détaché du compte du précédent propriétaire.",
    specs: [spec("Usage", "Histoires audio interactives, sans écran"), spec("Âge", "De 3 à 8 ans")],
  },
  "yoto-player-3e-generation": {
    description:
      "Le lecteur audio à cartes pour enfants, avec écran pixel et veilleuse. Vérifiez qu'il a été réinitialisé et retiré du compte du vendeur.",
    specs: [spec("Fonctionnement", "Cartes audio, Wi-Fi et Bluetooth")],
  },
  "strider-12-sport-draisienne": {
    description:
      "La draisienne légère pour apprendre l'équilibre avant le vélo. Le modèle Sport a une selle et un guidon plus longs que le Classic, ce qui allonge son usage.",
    specs: [spec("Âge", "De 18 mois à 5 ans"), spec("Roues", "12 pouces, pneus sans chambre")],
  },
  "micro-maxi-deluxe-trottinette": {
    description:
      "La trottinette à trois roues qu'on dirige en se penchant, très solide. Les roues et le grip s'usent mais se remplacent facilement.",
    specs: [spec("Âge", "De 5 à 12 ans"), spec("Roues", "3 roues, direction par inclinaison")],
  },
  "barbie-maison-de-reve-dreamhouse": {
    description:
      "La grande maison de poupée de Barbie, avec ascenseur et nombreux accessoires. Les éditions changent selon les années : comptez les pièces et les accessoires annoncés, ce sont eux qui font la valeur.",
    specs: [spec("Âge", "Dès 3 ans")],
  },
  "playmobil-grand-bateau-pirate": {
    description:
      "Le grand bateau pirate de Playmobil, un classique de génération en génération. Plusieurs versions existent selon les années : vérifiez la référence, la présence des voiles, des canons et des personnages.",
    specs: [spec("Âge", "Dès 4 ans")],
  },
  "sylvanian-families-grande-maison": {
    description:
      "La grande maison des Sylvanian Families, qui se revend bien et se complète pièce par pièce. Précisez si les meubles et les personnages sont inclus : la maison seule vaut beaucoup moins.",
    specs: [spec("Âge", "Dès 3 ans")],
  },
};
