import { spec, type CatalogueContent } from "./define";

/** Watches and jewellery: one entry per slug of `src/config/catalogue/watches.ts`. */
export const watchesContent: Record<string, CatalogueContent> = {
  "seiko-presage-cocktail-time-srpb43": {
    description:
      "Le cadran bleu glacé « Starlight » qui a fait la réputation des Cocktail Time : une habillée automatique au prix d'une montre à quartz. Verre Hardlex bombé, à inspecter sur une occasion.",
    specs: [
      spec("Mouvement", "Automatique Seiko 4R35"),
      spec("Diamètre", "40,5 mm"),
      spec("Étanchéité", "5 ATM"),
      spec("Verre", "Hardlex bombé"),
    ],
  },
  "seiko-prospex-samurai-srpb51": {
    description:
      "Plongeuse 200 m au boîtier anguleux caractéristique, surnommée « Samurai » par les collectionneurs. Robuste et facile à entretenir : une première plongeuse automatique idéale.",
    specs: [
      spec("Mouvement", "Automatique Seiko 4R35"),
      spec("Diamètre", "43,8 mm"),
      spec("Étanchéité", "200 m, norme plongée ISO 6425"),
      spec("Lunette", "Unidirectionnelle 120 crans"),
    ],
  },
  "seiko-5-sports-gmt-ssk003": {
    description:
      "L'une des GMT automatiques les moins chères du marché, en habit « Pepsi » bleu-rouge. Fonction GMT dite « bureau » (l'aiguille 24 h se règle indépendamment) ; un succès immédiat depuis 2022.",
    specs: [
      spec("Mouvement", "Automatique Seiko 4R34, GMT"),
      spec("Diamètre", "42,5 mm"),
      spec("Étanchéité", "100 m"),
      spec("Sortie", "2022"),
    ],
  },
  "seiko-skx007": {
    description:
      "La plongeuse culte, arrêtée vers 2019 : désormais objet de collection autant que montre d'usage. Les prix montent d'année en année ; attention aux pièces modifiées (mods), très courantes, qui valent moins en collection.",
    specs: [
      spec("Mouvement", "Automatique Seiko 7S26"),
      spec("Diamètre", "42,5 mm"),
      spec("Étanchéité", "200 m, norme plongée ISO"),
      spec("Statut", "Production arrêtée, cote de collection"),
    ],
  },
  "seiko-alpinist-spb121": {
    description:
      "La montre de montagne de Seiko : cadran vert, chiffres dorés et boussole interne, verre saphir et mouvement 6R35. Un cran au-dessus des Seiko 5 en finition comme en prix.",
    specs: [
      spec("Mouvement", "Automatique Seiko 6R35, 70 h de réserve"),
      spec("Diamètre", "39,5 mm"),
      spec("Verre", "Saphir"),
      spec("Étanchéité", "200 m"),
    ],
  },
  "tissot-prx-quartz-40-mm": {
    description:
      "Le best-seller suisse à bracelet intégré, esthétique années 70 au prix accessible. La version quartz est la porte d'entrée ; comptez l'écart avec la Powermatic avant de choisir.",
    specs: [
      spec("Mouvement", "Quartz ETA"),
      spec("Diamètre", "40 mm"),
      spec("Verre", "Saphir"),
      spec("Étanchéité", "100 m"),
    ],
  },
  "tissot-seastar-1000": {
    description:
      "La plongeuse de Tissot : 300 m d'étanchéité, verre saphir et un vrai look d'outil. Existe en quartz et en automatique Powermatic 80 : vérifiez bien la version dans l'annonce, l'écart de prix est important.",
    specs: [
      spec("Étanchéité", "300 m"),
      spec("Verre", "Saphir"),
      spec("Versions", "Quartz ou automatique Powermatic 80"),
    ],
  },
  "tissot-gentleman-powermatic-80": {
    description:
      "L'habillée polyvalente de Tissot : 80 heures de réserve de marche, spiral Nivachron antimagnétique, finitions au-dessus de son prix. Une « première automatique suisse » très recommandée.",
    specs: [
      spec("Mouvement", "Powermatic 80, spiral Nivachron"),
      spec("Réserve de marche", "80 h"),
      spec("Diamètre", "40 mm"),
      spec("Verre", "Saphir"),
    ],
  },
  "hamilton-khaki-field-mechanical-38-mm": {
    description:
      "La montre militaire à remontage manuel, fidèle aux modèles fournis à l'armée américaine. Taille raisonnable de 38 mm, lisibilité parfaite : un classique unanime, souvent conseillé comme première mécanique.",
    specs: [
      spec("Mouvement", "Manuel H-50, 80 h de réserve"),
      spec("Diamètre", "38 mm"),
      spec("Verre", "Saphir"),
      spec("Étanchéité", "50 m"),
    ],
  },
  "hamilton-jazzmaster-open-heart": {
    description:
      "L'habillée à cœur ouvert de Hamilton : le balancier visible côté cadran, mouvement H-10 de 80 heures de réserve. Pour qui veut « voir la mécanique » sans passer au squelette intégral.",
    specs: [
      spec("Mouvement", "Automatique H-10, 80 h de réserve"),
      spec("Cadran", "Ouverture sur le balancier"),
      spec("Verre", "Saphir"),
    ],
  },
  "casio-g-shock-gw-m5610": {
    description:
      "La G-Shock « carrée » d'origine en version solaire et radio-pilotée : elle se recale seule la nuit et ne demande jamais de pile. L'outil-montre absolu à moins de 150 €.",
    specs: [
      spec("Alimentation", "Solaire Tough Solar"),
      spec("Heure", "Radio-pilotée (Multiband 6)"),
      spec("Étanchéité", "200 m"),
      spec("Résistance", "Chocs, norme G-Shock"),
    ],
  },
  "casio-g-shock-ga-b2100": {
    description:
      "La « CasiOak » en version solaire et Bluetooth : fine pour une G-Shock, octogonale, réglée depuis le téléphone. Victime de son succès : comparez les coloris, les prix varient fortement.",
    specs: [
      spec("Alimentation", "Solaire Tough Solar"),
      spec("Connexion", "Bluetooth, réglage via application"),
      spec("Étanchéité", "200 m"),
    ],
  },
  "casio-vintage-a168": {
    description:
      "La digitale rétro des années 80-90, toujours fabriquée : boîtier chromé, rétroéclairage, sept ans de pile. Icône à petit prix ; les contrefaçons existent même à ce tarif, restez sur des vendeurs notés.",
    specs: [
      spec("Affichage", "Digital LCD, rétroéclairé"),
      spec("Pile", "Environ 7 ans"),
      spec("Bracelet", "Acier chromé"),
    ],
  },
  "casio-edifice-efr-s108d": {
    description:
      "Trois aiguilles fine en acier avec verre saphir sous les 150 € : la proposition la plus rationnelle de Casio en habillée. Datée discrète, 100 m d'étanchéité : la montre de bureau sans souci.",
    specs: [
      spec("Mouvement", "Quartz"),
      spec("Verre", "Saphir"),
      spec("Épaisseur", "8,9 mm"),
      spec("Étanchéité", "100 m"),
    ],
  },
  "orient-kamasu": {
    description:
      "La plongeuse automatique au meilleur rapport équipement-prix : verre saphir et 200 m, choses rares à ce tarif. Mouvement maison F6922 avec stop-seconde et réglage par la couronne.",
    specs: [
      spec("Mouvement", "Automatique Orient F6922"),
      spec("Verre", "Saphir"),
      spec("Étanchéité", "200 m"),
      spec("Diamètre", "41,8 mm"),
    ],
  },
  "orient-mako-ii": {
    description:
      "La plongeuse d'entrée de gamme la plus connue d'Orient, prédécesseure directe de la Kamasu (verre minéral au lieu du saphir). Souvent un peu moins chère : l'écart se joue là.",
    specs: [
      spec("Mouvement", "Automatique Orient F6922"),
      spec("Verre", "Minéral"),
      spec("Étanchéité", "200 m"),
    ],
  },
  "citizen-promaster-diver-bn0150": {
    description:
      "Plongeuse solaire certifiée ISO : jamais de pile à changer, 200 m, lisibilité exemplaire. L'Eco-Drive en fait l'une des montres d'usage les plus insouciantes du marché.",
    specs: [
      spec("Mouvement", "Quartz solaire Eco-Drive"),
      spec("Étanchéité", "200 m, norme plongée ISO"),
      spec("Réserve", "6 mois dans l'obscurité"),
    ],
  },
  "citizen-tsuyosa-nj0150": {
    description:
      "Le bracelet intégré abordable en automatique : cadrans colorés, verre saphir, mouvement maison. La réponse de Citizen à la PRX, souvent un peu moins chère à équipement comparable.",
    specs: [
      spec("Mouvement", "Automatique Miyota 8210"),
      spec("Verre", "Saphir"),
      spec("Diamètre", "40 mm"),
    ],
  },
  "swatch-moonswatch": {
    description:
      "La collaboration Omega × Swatch en Bioceramic, déclinée par planète. Vendue uniquement en boutique Swatch, d'où un marché parallèle actif : sur eBay, les prix dépassent souvent le neuf — comparez avant de craquer.",
    specs: [
      spec("Mouvement", "Quartz chronographe"),
      spec("Boîtier", "Bioceramic 42 mm"),
      spec("Distribution", "Boutiques Swatch uniquement (neuf)"),
    ],
  },
  "longines-hydroconquest-41-mm": {
    description:
      "La plongeuse suisse « premier grand achat » : 300 m, céramique de lunette et mouvement à spiral silicium sur les versions récentes. Décote d'occasion intéressante face au prix boutique.",
    specs: [
      spec("Mouvement", "Automatique L888, spiral silicium (récentes)"),
      spec("Étanchéité", "300 m"),
      spec("Lunette", "Insert céramique"),
    ],
  },
  "longines-spirit": {
    description:
      "La ligne aviateur de Longines, certifiée chronomètre (COSC) sur toute la gamme : précision contrôlée, 72 h de réserve. L'une des meilleures finitions sous la barre des grandes maisons.",
    specs: [
      spec("Mouvement", "Automatique L888.4, chronomètre COSC"),
      spec("Réserve de marche", "72 h"),
      spec("Verre", "Saphir"),
    ],
  },
  "omega-seamaster-diver-300m": {
    description:
      "La plongeuse d'Omega depuis 1993, popularisée par James Bond : céramique, fond ondulé, mouvement Co-Axial Master Chronometer antimagnétique. Sur ce prix, exigez boîte, papiers et numéro de série vérifiable.",
    specs: [
      spec("Mouvement", "Co-Axial Master Chronometer 8800"),
      spec("Étanchéité", "300 m, valve à hélium"),
      spec("Antimagnétisme", "15 000 gauss (certification METAS)"),
    ],
  },
  "omega-speedmaster-professional-moonwatch": {
    description:
      "La montre portée sur la Lune, toujours à remontage manuel. Valeur très stable en occasion ; l'authentification (numéro de série, extrait d'archives) est indispensable à ce niveau de prix.",
    specs: [
      spec("Mouvement", "Manuel, calibre 3861 (Master Chronometer)"),
      spec("Diamètre", "42 mm"),
      spec("Héritage", "Qualifiée par la NASA, missions Apollo"),
    ],
  },
  "tudor-black-bay-58": {
    description:
      "La plongeuse vintage de 39 mm qui a relancé Tudor : manufacture 70 h, finition au-dessus de son prix, file d'attente en boutique. L'occasion permet de l'avoir tout de suite, parfois sous le prix neuf.",
    specs: [
      spec("Mouvement", "Manufacture MT5402, chronomètre COSC"),
      spec("Diamètre", "39 mm"),
      spec("Réserve de marche", "70 h"),
      spec("Étanchéité", "200 m"),
    ],
  },
  "tag-heuer-aquaracer": {
    description:
      "La sportive 300 m de TAG Heuer, très répandue en occasion sous plusieurs générations (quartz et automatiques). Identifiez la référence exacte avant de comparer : les prix varient du simple au triple.",
    specs: [
      spec("Étanchéité", "300 m"),
      spec("Versions", "Quartz ou automatique selon génération"),
      spec("Verre", "Saphir"),
    ],
  },
  "tag-heuer-carrera-calibre-5": {
    description:
      "La Carrera trois aiguilles : l'habillée sportive héritée des années 60, en version date automatique. Un grand classique du marché de l'occasion suisse, à acheter complet (boîte, papiers).",
    specs: [
      spec("Mouvement", "Automatique Calibre 5"),
      spec("Verre", "Saphir"),
      spec("Étanchéité", "100 m"),
    ],
  },
  "certina-ds-action-diver": {
    description:
      "La plongeuse la plus équipée du groupe Swatch sous 1 000 € : Powermatic 80, certification plongée ISO, concept antichoc DS. Moins connue que Tissot, souvent mieux dotée.",
    specs: [
      spec("Mouvement", "Powermatic 80"),
      spec("Étanchéité", "300 m, norme plongée ISO 6425"),
      spec("Verre", "Saphir"),
    ],
  },
  "mido-ocean-star-200": {
    description:
      "Plongeuse suisse discrète au calibre 80 h, appréciée des connaisseurs pour son rapport finition-prix. Une alternative sérieuse aux références plus médiatisées, à cote d'occasion douce.",
    specs: [
      spec("Mouvement", "Automatique Calibre 80"),
      spec("Étanchéité", "200 m"),
      spec("Verre", "Saphir"),
    ],
  },
  "yema-superman": {
    description:
      "La plongeuse française historique, reconnaissable à son pont de lunette. Les rééditions actuelles (dont micro-rotor maison sur certaines) soutiennent une vraie cote ; précisez la version en comparant.",
    specs: [
      spec("Origine", "Manufacture française (Morteau)"),
      spec("Signature", "Pont de blocage de lunette"),
      spec("Étanchéité", "Selon version, souvent 300 m"),
    ],
  },
  "baltic-aquascaphe": {
    description:
      "La plongeuse néo-vintage de la microbrand française la plus connue : 39 mm, dôme saphir, esthétique années 60. Production en séries limitées : l'occasion est souvent le seul moyen de l'obtenir.",
    specs: [
      spec("Mouvement", "Automatique Miyota 9039"),
      spec("Diamètre", "39 mm"),
      spec("Verre", "Saphir bombé"),
      spec("Étanchéité", "200 m"),
    ],
  },
  "nomos-tangente": {
    description:
      "Le Bauhaus horloger : manufacture allemande de Glashütte, mouvement maison à remontage manuel, dessin inchangé depuis 1992. Une montre d'architecte, très liquide sur le marché de l'occasion.",
    specs: [
      spec("Mouvement", "Manufacture Alpha, remontage manuel"),
      spec("Diamètre", "35 ou 38 mm selon version"),
      spec("Origine", "Glashütte, Allemagne"),
    ],
  },
  "cartier-tank-must": {
    description:
      "Le rectangle de Cartier, dessiné en 1917, en version « Must » accessible : quartz ou SolarBeat selon référence. Montre de style par excellence ; l'authentification est impérative, les copies abondent.",
    specs: [
      spec("Forme", "Rectangulaire, chiffres romains"),
      spec("Mouvement", "Quartz ou photovoltaïque SolarBeat"),
      spec("Bracelet", "Cuir, boucle ardillon"),
    ],
  },
  "apple-watch-se-2e-generation-44-mm": {
    description:
      "L'Apple Watch essentielle : détection de chute et d'accident, suivi d'activité complet, sans écran toujours allumé ni capteurs avancés. Le meilleur point d'entrée, surtout en reconditionné.",
    specs: [
      spec("Boîtier", "44 mm aluminium"),
      spec("Puce", "Apple S8"),
      spec("Capteurs", "Cardio optique, détection de chute"),
      spec("Sortie", "Septembre 2022"),
    ],
  },
  "apple-watch-ultra-2": {
    description:
      "La montre d'aventure d'Apple : titane, 100 m, double fréquence GPS et jusqu'à 36 h d'autonomie réelle. Sa cote d'occasion reste haute ; vérifiez l'état du verre saphir et de la batterie.",
    specs: [
      spec("Boîtier", "49 mm titane, verre saphir"),
      spec("Étanchéité", "100 m, plongée récréative"),
      spec("GPS", "Double fréquence L1 + L5"),
      spec("Sortie", "Septembre 2023"),
    ],
  },
  "samsung-galaxy-watch6-44-mm": {
    description:
      "La montre Wear OS de référence pour Android : suivi santé complet (dont composition corporelle), bibliothèque d'applications Google. Fonctions avancées réservées aux téléphones Samsung, à savoir.",
    specs: [
      spec("Boîtier", "44 mm aluminium"),
      spec("Système", "Wear OS avec One UI Watch"),
      spec("Capteurs", "Cardio, ECG, bio-impédance"),
      spec("Sortie", "Août 2023"),
    ],
  },
  "garmin-fenix-7": {
    description:
      "La montre d'outdoor de référence : cartes topographiques embarquées, semaines d'autonomie, boutons physiques utilisables avec des gants. La gamme est touffue (7S/7/7X, Solar, Sapphire) : identifiez la version exacte.",
    specs: [
      spec("Autonomie", "Jusqu'à 18 jours (montre), plus en Solar"),
      spec("Cartographie", "TopoActive embarquée"),
      spec("Boîtier", "47 mm, 10 ATM"),
      spec("Sortie", "Janvier 2022"),
    ],
  },
  "garmin-forerunner-255": {
    description:
      "La montre de course au meilleur rapport fonctions-prix : GPS double fréquence, suivi d'entraînement sérieux, 14 jours d'autonomie. Celle qu'on conseille pour préparer un premier marathon.",
    specs: [
      spec("GPS", "Multi-bandes"),
      spec("Autonomie", "Jusqu'à 14 jours en montre"),
      spec("Sortie", "Juin 2022"),
    ],
  },
  "garmin-forerunner-965": {
    description:
      "Le haut de gamme running : écran AMOLED, cartes complètes, métriques d'entraînement avancées. Pour coureurs et triathlètes réguliers ; en occasion, l'état de l'écran prime.",
    specs: [
      spec("Écran", "AMOLED 1,4 pouce"),
      spec("Cartographie", "Embarquée"),
      spec("Autonomie", "Jusqu'à 23 jours en montre"),
      spec("Sortie", "Mars 2023"),
    ],
  },
  "garmin-venu-3": {
    description:
      "La Garmin « lifestyle » : AMOLED, appels Bluetooth, coach de sommeil, jusqu'à 14 jours d'autonomie. L'alternative sérieuse à l'Apple Watch pour qui veut durer entre deux charges.",
    specs: [
      spec("Écran", "AMOLED"),
      spec("Autonomie", "Jusqu'à 14 jours"),
      spec("Sortie", "Septembre 2023"),
    ],
  },
  "withings-scanwatch-2": {
    description:
      "L'hybride santé à aiguilles : ECG, SpO₂, température nocturne et 30 jours d'autonomie, sous une allure de montre classique. Fabricant français ; données dans l'app Health Mate.",
    specs: [
      spec("Type", "Montre hybride santé"),
      spec("Capteurs", "ECG, SpO₂, température"),
      spec("Autonomie", "Jusqu'à 30 jours"),
      spec("Sortie", "Septembre 2023"),
    ],
  },
  "pandora-moments-bracelet-maille-serpent": {
    description:
      "Le bracelet à charms le plus vendu au monde, en argent 925. Sur l'occasion, vérifiez le poinçon « ALE S925 » et l'état du fermoir ; les charms se négocient à part.",
    specs: [
      spec("Matière", "Argent massif 925"),
      spec("Poinçon", "ALE S925"),
      spec("Système", "Charms Pandora Moments"),
    ],
  },
  "swarovski-tennis-bracelet": {
    description:
      "Le bracelet rivière en cristaux taillés Swarovski, monture rhodiée. Bijou de cristal, pas de diamant : son prix d'occasion doit rester une fraction du neuf.",
    specs: [
      spec("Matière", "Cristaux Swarovski, monture rhodiée"),
      spec("Fermoir", "Réglable selon modèle"),
    ],
  },
  "tiffany-co-return-to-tiffany-collier": {
    description:
      "Le collier à médaille cœur gravée « Please Return to Tiffany & Co. », en argent 925. Très copié : poinçons, gravure nette et pochette d'origine sont vos meilleurs indices d'authenticité.",
    specs: [spec("Matière", "Argent massif 925"), spec("Poinçons", "Tiffany & Co., 925")],
  },
  "cartier-love-bracelet": {
    description:
      "Le bracelet-vis de Cartier, créé en 1969, fermé par un tournevis dédié. L'un des bijoux les plus contrefaits au monde : numéro de série, poinçons d'or et certificat sont indispensables.",
    specs: [
      spec("Matière", "Or 750 (18 carats), selon version"),
      spec("Fermeture", "Vis, tournevis fourni"),
      spec("Authentification", "Numéro de série gravé + poinçons"),
    ],
  },
  "hermes-clic-h-bracelet": {
    description:
      "Le bracelet émaillé au fermoir « H » pivotant, classique d'Hermès. Deux tailles (PM/GM) et des dizaines de coloris : comparez à taille et coloris identiques, les cotes diffèrent.",
    specs: [
      spec("Matière", "Émail, métal plaqué or ou palladié"),
      spec("Fermoir", "H pivotant"),
      spec("Tailles", "PM et GM"),
    ],
  },
};
