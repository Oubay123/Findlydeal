import { spec, type CatalogueContent } from "./define";

/** Furniture and lighting: one entry per slug of `src/config/catalogue/furniture.ts`. */
export const furnitureContent: Record<string, CatalogueContent> = {
  "herman-miller-aeron": {
    description:
      "Le fauteuil de bureau ergonomique de référence depuis 1994, garanti 12 ans neuf et conçu pour être reconditionné. Trois tailles (A, B, C) : vérifiez la vôtre et la génération (Classic ou Remastered) avant d'acheter.",
    specs: [
      spec("Tailles", "A, B ou C (repères sur le dossier)"),
      spec("Générations", "Classic (avant 2016) ou Remastered"),
      spec("Garantie neuve", "12 ans, pièces et main-d'œuvre"),
      spec("Matière", "Maille Pellicle, pas de mousse"),
    ],
  },
  "herman-miller-sayl": {
    description:
      "Le dessin de Yves Béhar au dossier suspendu sans cadre : l'entrée de gamme Herman Miller, légère et aérée. Bien moins cher que l'Aeron en occasion, avec la même qualité de fabrication.",
    specs: [spec("Dossier", "Suspension 3D sans cadre"), spec("Garantie neuve", "12 ans")],
  },
  "steelcase-leap-v2": {
    description:
      "Le rival direct de l'Aeron, à dossier qui épouse le mouvement du dos (LiveBack). Très répandu en reconditionné de bureaux : des unités révisées à une fraction du neuf.",
    specs: [
      spec("Dossier", "Technologie LiveBack, réglages complets"),
      spec("Revêtement", "Tissu, nombreuses variantes"),
      spec("Garantie neuve", "12 ans"),
    ],
  },
  "steelcase-gesture": {
    description:
      "Conçu pour les postures d'écrans multiples et de téléphone, avec les accoudoirs les plus réglables du marché. Souvent préféré au Leap par les gabarits variés d'une même famille.",
    specs: [spec("Accoudoirs", "360°, réglables en tous sens"), spec("Garantie neuve", "12 ans")],
  },
  "secretlab-titan-evo": {
    description:
      "Le siège gaming le plus recommandé : soutien lombaire réglable intégré, coussin tête magnétique, fabrication sérieuse. Trois tailles ; le similicuir vieillit mieux que la moyenne mais inspectez les assises d'occasion.",
    specs: [
      spec("Tailles", "S, R (standard), XL"),
      spec("Lombaires", "Réglables intégrées (L-Adapt)"),
      spec("Revêtement", "Similicuir Neo ou tissu SoftWeave"),
    ],
  },
  "ikea-poang-fauteuil": {
    description:
      "Le fauteuil en bouleau lamellé-collé vendu depuis 1977 à des dizaines de millions d'exemplaires. Coussins remplaçables neufs chez IKEA : une occasion à structure saine se remet à neuf pour peu.",
    specs: [
      spec("Structure", "Bouleau lamellé-collé"),
      spec("Coussins", "Remplaçables, vendus séparément"),
      spec("Édité depuis", "1977"),
    ],
  },
  "ikea-markus-chaise-de-bureau": {
    description:
      "La chaise de bureau IKEA la plus connue : dossier haut en maille, dix ans de garantie neuve, réglages simples. Le choix budget pour du télétravail quotidien.",
    specs: [spec("Dossier", "Haut, maille respirante"), spec("Garantie neuve", "10 ans")],
  },
  "ikea-strandmon-fauteuil": {
    description:
      "Le fauteuil à oreilles inspiré d'un modèle IKEA de 1951 : silhouette classique à petit prix. Lourd et encombrant à transporter : privilégiez une remise en main propre.",
    specs: [
      spec("Style", "Fauteuil à oreilles (bergère)"),
      spec("Revêtement", "Tissu, plusieurs coloris"),
    ],
  },
  "vitra-eames-plastic-chair-dsw": {
    description:
      "La chaise coque des Eames éditée par Vitra, piètement bois (DSW). Attention aux copies omniprésentes : l'originale porte le logo Vitra moulé sous l'assise et se revend d'autant mieux.",
    specs: [
      spec("Design", "Charles & Ray Eames, 1950"),
      spec("Éditeur", "Vitra (marquage sous la coque)"),
      spec("Piètement", "Bois d'érable, croisillons acier"),
    ],
  },
  "vitra-eames-lounge-chair": {
    description:
      "Le fauteuil lounge de 1956, coques moulées et cuir, édité par Vitra en Europe. Pièce d'investissement : exigez facture ou certificat, les contrefaçons sont très convaincantes.",
    specs: [
      spec("Design", "Charles & Ray Eames, 1956"),
      spec("Éditeur (Europe)", "Vitra"),
      spec("Matières", "Placage bois moulé, cuir, aluminium"),
      spec("Ottoman", "Souvent vendu avec ; vérifier l'annonce"),
    ],
  },
  "kartell-louis-ghost": {
    description:
      "La chaise transparente de Philippe Starck en polycarbonate moulé d'un bloc. Rayures et voile du plastique font le prix en occasion ; empilable et utilisable dehors.",
    specs: [
      spec("Design", "Philippe Starck, 2002"),
      spec("Matière", "Polycarbonate moulé d'une pièce"),
      spec("Usage", "Intérieur et extérieur, empilable"),
    ],
  },
  "kartell-masters-chaise": {
    description:
      "Le dossier de la Masters entrelace trois silhouettes de chaises iconiques. Légère, empilable, d'intérieur comme d'extérieur : la Kartell la plus répandue après la Ghost.",
    specs: [
      spec("Design", "Philippe Starck & Eugeni Quitllet"),
      spec("Matière", "Polypropylène teinté"),
      spec("Usage", "Intérieur et extérieur, empilable"),
    ],
  },
  "tolix-chaise-a": {
    description:
      "La chaise A en tôle d'acier, dessinée en 1934 et toujours fabriquée à Autun, en Bourgogne. Les vraies anciennes patinées valent plus que les récentes : l'estampille Tolix fait foi.",
    specs: [
      spec("Design", "Xavier Pauchard, 1934"),
      spec("Fabrication", "Autun, France"),
      spec("Matière", "Tôle d'acier, versions brute ou laquée"),
    ],
  },
  "fatboy-original-pouf": {
    description:
      "Le pouf géant d'origine (180 × 140 cm) en nylon enduit, housse essuyable. Les billes se tassent avec les années : des recharges existent, comptez-les dans le prix d'une occasion.",
    specs: [
      spec("Dimensions", "180 × 140 cm"),
      spec("Matière", "Nylon enduit, déhoussable selon version"),
      spec("Garnissage", "Billes EPS, recharges disponibles"),
    ],
  },
  "hay-about-a-chair-aac22": {
    description:
      "La chaise coque danoise devenue standard des intérieurs contemporains et des cafés. Déclinée en dizaines de combinaisons coque-piètement : comparez à configuration égale.",
    specs: [spec("Design", "Hee Welling pour HAY"), spec("Coque", "Polypropylène, piètement bois")],
  },
  "fermob-bistro-chaise": {
    description:
      "La pliante de jardin française héritée des guinguettes, en acier laqué haute protection, déclinée en plus de vingt couleurs. Se repeint et se répare : une occasion rouillée en surface n'est pas condamnée.",
    specs: [
      spec("Fabrication", "France, acier laqué"),
      spec("Usage", "Extérieur, pliante"),
      spec("Coloris", "Nuancier Fermob (24+ couleurs)"),
    ],
  },
  "fermob-luxembourg-fauteuil": {
    description:
      "Le fauteuil bas en aluminium du jardin du Luxembourg, édité par Fermob. Léger, inoxydable, empilable : le mobilier d'extérieur qui dure des décennies.",
    specs: [
      spec("Matière", "Aluminium laqué"),
      spec("Usage", "Extérieur, empilable"),
      spec("Fabrication", "France"),
    ],
  },
  "stressless-fauteuil-relax": {
    description:
      "Le fauteuil relax norvégien à inclinaison suivant le corps, souvent vendu avec son repose-pieds. Marché de l'occasion fourni : vérifiez cuir, mécanisme et taille (S/M/L) sur place si possible.",
    specs: [
      spec("Origine", "Ekornes, Norvège"),
      spec("Tailles", "S, M, L selon modèles"),
      spec("Mécanisme", "Inclinaison synchronisée, base pivotante"),
    ],
  },
  "ligne-roset-togo": {
    description:
      "Le siège tout-mousse plissé de Michel Ducaroy (1973), fabriqué par Ligne Roset en France. Très contrefait et très coté : housse d'origine, étiquette et facture font toute la valeur.",
    specs: [
      spec("Design", "Michel Ducaroy, 1973"),
      spec("Éditeur", "Ligne Roset, fabrication France"),
      spec("Structure", "Mousse intégrale, sans armature"),
      spec("Déclinaisons", "Chauffeuse, angle, pouf ; plusieurs tailles"),
    ],
  },
  "usm-haller-buffet": {
    description:
      "Le système modulaire suisse à boules chromées : chaque meuble se démonte, s'étend et se reconfigure, pièces toujours disponibles. L'occasion décote peu, mais un USM s'use à peine.",
    specs: [
      spec("Système", "Modulaire USM Haller, reconfigurable"),
      spec("Matière", "Acier laqué, structure chromée"),
      spec("Fabrication", "Suisse"),
    ],
  },
  "string-pocket-etagere": {
    description:
      "L'étagère murale suédoise de 1949 en version Pocket (60 × 50 cm) : montants échelle et tablettes réglables. S'agrandit par modules ; les copies n'ont pas les finitions des originales.",
    specs: [
      spec("Dimensions", "60 × 50 × 15 cm"),
      spec("Design", "Nisse Strinning, 1949"),
      spec("Montage", "Mural, tablettes repositionnables"),
    ],
  },
  "ikea-kallax-4x4": {
    description:
      "L'étagère à seize cases devenue standard de rangement, notamment pour les vinyles (33 tours au millimètre près). Lourde et fragile au démontage : préférez une occasion encore montée à transporter avec soin.",
    specs: [
      spec("Cases", "16 (4 × 4), 33 × 33 cm utiles"),
      spec("Dimensions", "147 × 147 cm"),
      spec("Accessoires", "Portes, tiroirs et paniers compatibles"),
    ],
  },
  "ikea-billy-bibliotheque": {
    description:
      "La bibliothèque la plus vendue au monde, un exemplaire toutes les quelques secondes. Tablettes réglables, extensions en hauteur : une occasion se complète toujours en magasin.",
    specs: [
      spec("Dimensions", "80 × 28 × 202 cm (modèle courant)"),
      spec("Tablettes", "Réglables, supports standard"),
    ],
  },
  "ikea-bekant-bureau-assis-debout": {
    description:
      "Le bureau assis-debout électrique d'IKEA : plateau 160 × 80, moteur silencieux, dix ans de garantie neuf. En occasion, testez la montée en charge et l'absence de jeu latéral.",
    specs: [
      spec("Plateau", "160 × 80 cm (modèle courant)"),
      spec("Réglage", "Électrique, 65-125 cm"),
      spec("Garantie neuve", "10 ans"),
    ],
  },
  "ikea-malm-commode-6-tiroirs": {
    description:
      "La commode six tiroirs omniprésente dans les annonces : économique, déclinée dans toutes les finitions. Fixation murale impérative (risque de basculement) : le kit est fourni par IKEA.",
    specs: [
      spec("Tiroirs", "6"),
      spec("Dimensions", "80 × 48 × 123 cm"),
      spec("Sécurité", "Fixation murale obligatoire, kit fourni"),
    ],
  },
  "flexispot-e7-bureau-assis-debout": {
    description:
      "Le piètement assis-debout plébiscité des télétravailleurs : moteurs doubles, 125 kg de charge, mémoires de hauteur. Souvent vendu sans plateau : lisez l'annonce de près.",
    specs: [
      spec("Charge", "125 kg, double moteur"),
      spec("Plage", "58-123 cm"),
      spec("Plateau", "Souvent vendu séparément"),
    ],
  },
  "montana-etagere": {
    description:
      "Le système danois de casiers laqués, combinables au millimètre en teintes Montana. Les modules se revendent à l'unité : mesurez et comparez par module, pas par ensemble.",
    specs: [
      spec("Système", "Modules muraux ou posés, combinables"),
      spec("Finitions", "Laque, nuancier Montana"),
      spec("Origine", "Danemark"),
    ],
  },
  "kartell-componibili": {
    description:
      "La tour de rangement cylindrique d'Anna Castelli Ferrieri (1967), à portes coulissantes. Deux ou trois niveaux, toutes les couleurs : un classique abordable du design italien.",
    specs: [
      spec("Design", "Anna Castelli Ferrieri, 1967"),
      spec("Matière", "ABS, modules empilables"),
      spec("Versions", "2 ou 3 niveaux, Bio ou classique"),
    ],
  },
  "vitra-uten-silo": {
    description:
      "L'organiseur mural de Dorothee Becker (1969) réédité par Vitra : bacs et crochets moulés pour tout ranger au mur. Pièce déco recherchée, en deux tailles.",
    specs: [
      spec("Design", "Dorothee Becker, 1969"),
      spec("Tailles", "Uten.Silo I (grand) et II"),
      spec("Matière", "ABS, éléments métalliques"),
    ],
  },
  "artemide-tolomeo-lampe-de-bureau": {
    description:
      "La lampe d'architecte italienne à ressorts cachés, dessinée en 1987, toujours fabriquée et réparable pièce à pièce. Un classique absolu dont l'occasion abonde : comparez taille (micro, mini, classique) et support.",
    specs: [
      spec("Design", "Michele De Lucchi & Giancarlo Fassina, 1987"),
      spec("Tailles", "Micro, mini, classique ; pince, socle ou applique"),
      spec("Matière", "Aluminium, bras à ressorts"),
    ],
  },
  "artemide-nesso": {
    description:
      "Le champignon translucide de 1967, pièce des collections de musées. Rééditée en deux tailles (Nesso et Nessino) : les anciennes éditions oranges cotent le plus.",
    specs: [
      spec("Design", "Giancarlo Mattioli, 1967"),
      spec("Tailles", "Nesso (54 cm) et Nessino (32 cm)"),
    ],
  },
  "flos-arco": {
    description:
      "Le lampadaire arc des frères Castiglioni (1962), socle en marbre de Carrare percé pour être porté à deux. Très copié : l'original récent porte marquages Flos et numéro sur le socle.",
    specs: [
      spec("Design", "Achille & Pier Giacomo Castiglioni, 1962"),
      spec("Socle", "Marbre de Carrare, 65 kg"),
      spec("Portée", "Arc d'environ 2 m au-dessus d'une table"),
    ],
  },
  "flos-ic-lights": {
    description:
      "La sphère en équilibre de Michael Anastassiades, déclinée en lampadaire, suspension et applique. Le verre soufflé est la pièce fragile : exigez des photos précises du globe.",
    specs: [
      spec("Design", "Michael Anastassiades, 2014"),
      spec("Matières", "Verre soufflé, laiton ou acier"),
      spec("Versions", "T (table), F (lampadaire), S (suspension), C/W"),
    ],
  },
  "louis-poulsen-ph-5": {
    description:
      "La suspension danoise de Poul Henningsen (1958), conçue pour ne jamais éblouir quelle que soit la position. Rééditée en nombreux coloris ; les éditions anciennes se restaurent et cotent.",
    specs: [
      spec("Design", "Poul Henningsen, 1958"),
      spec("Principe", "Réflecteurs anti-éblouissement"),
      spec("Diamètre", "50 cm"),
    ],
  },
  "louis-poulsen-panthella": {
    description:
      "La lampe champignon de Verner Panton (1971), rééditée en plusieurs tailles dont la Portable à batterie. Taille et matière de l'abat-jour (opale ou métal) font le prix.",
    specs: [spec("Design", "Verner Panton, 1971"), spec("Tailles", "400, 320, 250, 160 Portable")],
  },
  "jielde-signal-lampe": {
    description:
      "La lampe d'atelier lyonnaise à rotules sans fil ni ressort, fabriquée depuis 1950. Les anciennes patinées d'usine sont très recherchées ; les neuves restent fabriquées à Lyon.",
    specs: [
      spec("Origine", "Lyon, France, depuis 1950"),
      spec("Articulation", "Rotules à contacts, sans câble apparent"),
      spec("Versions", "Signal (petite), Loft (grande)"),
    ],
  },
  "anglepoise-original-1227": {
    description:
      "La lampe à ressorts anglaise de 1935, principe copié par toutes les lampes d'architecte. La réédition actuelle est fidèle ; les vintage demandent souvent un recâblage.",
    specs: [
      spec("Design", "George Carwardine, 1935"),
      spec("Principe", "Équilibrage par ressorts"),
    ],
  },
  "tradition-flowerpot-vp3": {
    description:
      "La lampe aux deux demi-sphères de Verner Panton (1968), rééditée par &Tradition dans des coloris changeants. La VP9 portable à batterie en reprend le dessin : vérifiez la version.",
    specs: [
      spec("Design", "Verner Panton, 1968"),
      spec("Versions", "VP1/VP7 suspension, VP3/VP4 table, VP9 portable"),
    ],
  },
  "dyson-solarcycle-morph": {
    description:
      "La lampe Dyson qui suit la lumière du jour et promet 60 ans de LED grâce au refroidissement caloduc. Orientable en tâche, indirecte ou d'ambiance ; chère neuve, rare en occasion.",
    specs: [
      spec("LED", "Durée annoncée 60 ans (refroidissement heat-pipe)"),
      spec("Modes", "Tâche, indirect, ambiance, suivi lumière du jour"),
    ],
  },
  "emma-original-matelas-140x190": {
    description:
      "Le matelas en boîte le plus vendu de France : mousses trois couches, housse lavable. Un matelas d'occasion ne se garantit pas : visez plutôt les retours reconditionnés ou le neuf en promotion, fréquents.",
    specs: [
      spec("Type", "Mousses 3 couches, accueil mémoire"),
      spec("Hauteur", "25 cm"),
      spec("Essai neuf", "100 nuits (vente directe)"),
    ],
  },
  "tediber-matelas-140x190": {
    description:
      "« L'incroyable matelas » français : accueil ferme, fabrication européenne, livraison express. Comme tout matelas, l'achat d'occasion a peu de sens hors retours reconditionnés par la marque.",
    specs: [
      spec("Type", "Mousse + latex, accueil ferme"),
      spec("Hauteur", "25 cm"),
      spec("Essai neuf", "100 nuits (vente directe)"),
    ],
  },
  "simba-hybrid-matelas-160x200": {
    description:
      "L'hybride à micro-ressorts et mousses, parmi les plus vendus en ligne. Les promotions neuves sont quasi permanentes : comparez toujours le prix affiché à son historique.",
    specs: [
      spec("Type", "Hybride micro-ressorts + mousses"),
      spec("Essai neuf", "200 nuits (vente directe)"),
    ],
  },
};
