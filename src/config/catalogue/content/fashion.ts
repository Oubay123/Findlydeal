import { spec, type CatalogueContent } from "./define";

/** Fashion: one entry per slug of `src/config/catalogue/fashion.ts`. */
export const fashionContent: Record<string, CatalogueContent> = {
  "nike-air-force-1-07": {
    description:
      "La basket blanche la plus vendue au monde, inchangée depuis 1982. Très contrefaite : étiquette intérieure nette, boîte d'origine et vendeur noté sont vos repères sur l'occasion.",
    specs: [
      spec("Tige", "Cuir"),
      spec("Semelle", "Caoutchouc à motif étoilé, amorti Air"),
      spec("Entretien", "Cuir blanc, se nettoie bien"),
    ],
  },
  "nike-dunk-low": {
    description:
      "La silhouette basket-ball de 1985 revenue au premier plan ; certaines couleurs partent en revente au-dessus du neuf. Comparez par coloris exact, pas par modèle.",
    specs: [
      spec("Tige", "Cuir, panneaux bicolores"),
      spec("Origine", "Modèle basketball universitaire, 1985"),
    ],
  },
  "nike-air-max-90": {
    description:
      "L'Air Max à la bulle visible la plus portée, rééditée en continu depuis 1990. Le confort de la mousse vieillit : sur une occasion ancienne, l'état de la semelle intermédiaire prime.",
    specs: [
      spec("Amorti", "Bulle Air visible au talon"),
      spec("Origine", "1990, design Tinker Hatfield"),
    ],
  },
  "nike-air-jordan-1-mid": {
    description:
      "La version mi-montante de la Jordan 1, plus accessible que la High OG et déclinée en dizaines de coloris. Les prix d'occasion varient fortement selon le coloris : comparez à référence identique.",
    specs: [spec("Hauteur", "Mi-montante"), spec("Tige", "Cuir et synthétique selon coloris")],
  },
  "adidas-stan-smith": {
    description:
      "Le tennis blanc à trois bandes perforées, réédité notamment en cuir Primegreen recyclé. Simple, réparable chez un cordonnier, et toujours moins cher en fin de saison.",
    specs: [
      spec("Tige", "Cuir ou matière recyclée selon édition"),
      spec("Origine", "Modèle tennis, popularisé dans les années 70"),
    ],
  },
  "adidas-samba-og": {
    description:
      "La chaussure de foot en salle devenue phénomène de mode : profil bas, bande de semelle gomme. Les tailles courantes s'arrachent ; l'occasion récente décote peu.",
    specs: [spec("Tige", "Cuir, empiècement daim"), spec("Semelle", "Gomme, profil bas")],
  },
  "adidas-gazelle": {
    description:
      "Le daim coloré d'adidas depuis les années 60, alternative plus douce à la Samba. Le daim marque vite : sur l'occasion, regardez l'avant du pied et les bandes.",
    specs: [spec("Tige", "Daim"), spec("Origine", "Années 1960, rééditions continues")],
  },
  "new-balance-574": {
    description:
      "La New Balance du quotidien : suède et mesh, amorti Encap, silhouette intemporelle. La plus abordable des NB lifestyle, très disponible en seconde main.",
    specs: [spec("Tige", "Suède et mesh"), spec("Amorti", "ENCAP")],
  },
  "new-balance-990v5": {
    description:
      "La « made in USA » emblématique, chère neuve et recherchée d'occasion. Vérifiez l'étiquette Made in USA et l'usure de la semelle : c'est une chaussure qu'on porte beaucoup.",
    specs: [spec("Fabrication", "USA"), spec("Amorti", "ENCAP, mousse polyuréthane")],
  },
  "new-balance-2002r": {
    description:
      "La running des années 2000 rééditée avec semelle moderne N-ERGY/ABZORB : confort salué, coloris gris emblématique. Souvent en rupture dans les pointures courantes, d'où un marché d'occasion actif.",
    specs: [spec("Tige", "Suède et mesh"), spec("Amorti", "ABZORB + N-ERGY")],
  },
  "converse-chuck-taylor-all-star": {
    description:
      "La toile montante ou basse de 1917, inchangée dans son principe. Taille grand : la plupart prennent une demi-pointure en dessous — utile à savoir en occasion sans essayage.",
    specs: [
      spec("Tige", "Toile de coton"),
      spec("Conseil taille", "Prend souvent une demi-pointure de moins"),
    ],
  },
  "veja-v-10": {
    description:
      "La basket française au cuir et matériaux tracés, fabriquée au Brésil. Le « V » se décline en nombreuses matières : le cuir vieillit mieux que les versions textiles en seconde main.",
    specs: [
      spec("Tige", "Cuir ou alternatives selon version"),
      spec("Fabrication", "Brésil, filières tracées"),
    ],
  },
  "veja-campo": {
    description:
      "La Veja à succès au look épuré, souvent en cuir Chromefree. Semelle en caoutchouc d'Amazonie ; une occasion propre se trouve facilement, la marque étant très diffusée.",
    specs: [
      spec("Tige", "Cuir Chromefree selon version"),
      spec("Semelle", "Caoutchouc sauvage d'Amazonie (part)"),
    ],
  },
  "dr-martens-1460": {
    description:
      "La boot huit œillets à couture jaune, inchangée depuis 1960. Le cuir Smooth se fait en plusieurs mois : une paire déjà assouplie est un vrai argument de l'occasion.",
    specs: [
      spec("Modèle", "8 œillets, couture Goodyear jaune"),
      spec("Cuir", "Smooth (classique)"),
      spec("Semelle", "AirWair à coussin d'air"),
    ],
  },
  "dr-martens-1461": {
    description:
      "La version derby trois œillets de la 1460 : même construction, silhouette basse. Les éditions Made in England cotent au-dessus des standards.",
    specs: [spec("Modèle", "Derby 3 œillets"), spec("Semelle", "AirWair à coussin d'air")],
  },
  "birkenstock-arizona": {
    description:
      "La sandale deux brides au lit de pied en liège qui se moule au pied. Le lit de pied se ressemelle chez Birkenstock : une occasion au liège sain se remet à neuf.",
    specs: [
      spec("Lit de pied", "Liège-latex anatomique, ressemelable"),
      spec("Brides", "Cuir Birko-Flor ou suède selon version"),
      spec("Largeurs", "Normale ou étroite (repère au talon)"),
    ],
  },
  "birkenstock-boston": {
    description:
      "Le sabot fermé de Birkenstock, passé du confort orthopédique au vestiaire mode. Le suède taupe, le plus demandé, est souvent en rupture : comparez le prix au neuf avant d'acheter d'occasion.",
    specs: [spec("Type", "Sabot (mule) fermé"), spec("Lit de pied", "Liège-latex, ressemelable")],
  },
  "salomon-xt-6": {
    description:
      "La chaussure de trail devenue icône urbaine : laçage Quicklace, semelle agressive, construction technique. Les coloris collaboratifs cotent au-dessus du neuf standard.",
    specs: [
      spec("Origine", "Trail running, ultra-endurance"),
      spec("Laçage", "Quicklace à serrage unique"),
    ],
  },
  "timberland-6-inch-premium-boot": {
    description:
      "La boot jaune imperméable au col rembourré, inchangée depuis 1973. Le nubuck se rénove bien (brosse, gomme) : une occasion ternie n'est pas finie.",
    specs: [
      spec("Cuir", "Nubuck imperméabilisé"),
      spec("Construction", "Coutures étanchées"),
      spec("Origine", "1973"),
    ],
  },
  "clarks-desert-boot": {
    description:
      "La desert boot de 1950 en daim sur semelle crêpe, deux œillets. Classique du vestiaire masculin ; la semelle crêpe s'use et se remplace, vérifiez-la en occasion.",
    specs: [
      spec("Tige", "Daim (suede)"),
      spec("Semelle", "Crêpe naturel"),
      spec("Origine", "Nathan Clark, 1950"),
    ],
  },
  "paraboot-michael": {
    description:
      "Le derby français à semelle caoutchouc cousue norvégienne, fabriqué dans l'Isère. Ressemelable à vie par la maison : l'achat d'occasion est particulièrement rationnel.",
    specs: [
      spec("Fabrication", "France (Isère)"),
      spec("Montage", "Cousu norvégien, ressemelable"),
      spec("Cuir", "Pleine fleur, semelle caoutchouc Paraboot"),
    ],
  },
  "hoka-clifton-9": {
    description:
      "La running à gros amorti du quotidien, légère malgré son volume. Une mousse de running se tasse vers 600-800 km : en occasion, demandez le kilométrage, c'est la seule donnée qui compte.",
    specs: [
      spec("Usage", "Route, entraînement quotidien"),
      spec("Amorti", "Mousse maximale, drop 5 mm"),
    ],
  },
  "on-cloudmonster": {
    description:
      "La On suisse la plus amortie : pods CloudTec surdimensionnés, relance marquée. Même règle que toute running d'occasion : l'usure de la mousse prime sur l'aspect.",
    specs: [
      spec("Usage", "Route, entraînement"),
      spec("Amorti", "CloudTec maximal, plaque Speedboard"),
    ],
  },
  "the-north-face-nuptse-1996": {
    description:
      "La doudoune emblématique en duvet 700, coupe ample années 90. Très contrefaite : étiquettes intérieures, qualité des coutures et vendeur noté sont indispensables en seconde main.",
    specs: [spec("Isolation", "Duvet 700 cuin"), spec("Coupe", "Ample, repliable dans sa poche")],
  },
  "patagonia-better-sweater": {
    description:
      "La polaire aspect tricot de Patagonia, réparable via le programme Worn Wear de la marque. Un vêtement pensé pour durer : l'occasion est dans l'esprit de la maison.",
    specs: [
      spec("Matière", "Polaire polyester recyclé"),
      spec("Réparation", "Programme Patagonia Worn Wear"),
    ],
  },
  "patagonia-nano-puff": {
    description:
      "La doudoune synthétique compressible au matelassage caractéristique : isole même humide, se glisse dans sa poche. L'isolation synthétique tolère mieux l'occasion que le duvet.",
    specs: [
      spec("Isolation", "Synthétique PrimaLoft recyclé"),
      spec("Poids", "Environ 340 g (veste homme)"),
    ],
  },
  "barbour-bedale": {
    description:
      "La veste cirée courte pensée pour le cheval, re-cirable à vie par Barbour ou soi-même. Une occasion sèche ou râpée se restaure : comptez le prix d'un re-cirage dans votre comparaison.",
    specs: [
      spec("Matière", "Coton ciré 6 oz"),
      spec("Entretien", "Re-cirage périodique, réparations possibles"),
      spec("Coupe", "Courte, fentes cavalières"),
    ],
  },
  "barbour-beaufort": {
    description:
      "La version chasse du ciré Barbour, plus longue que la Bedale, poche gibier au dos. Mêmes vertus en seconde main : le ciré se régénère, les fermetures se remplacent.",
    specs: [spec("Matière", "Coton ciré 6 oz"), spec("Coupe", "Longue, poche arrière")],
  },
  "carhartt-detroit-jacket": {
    description:
      "La veste de travail en canvas, col velours côtelé, devenue pièce de mode via Carhartt WIP. Les Detroit vintage américaines cotent plus que les WIP récentes : identifiez l'étiquette.",
    specs: [
      spec("Matière", "Canvas coton, doublure couverture"),
      spec("Versions", "Carhartt US (workwear) ou WIP (mode)"),
    ],
  },
  "canada-goose-expedition-parka": {
    description:
      "La parka d'expédition polaire au duvet dense et à la capuche fourrée. Parmi les vêtements les plus contrefaits : hologramme, étiquettes et facture sont non négociables en occasion.",
    specs: [
      spec("Isolation", "Duvet, indice Thermal Experience extrême"),
      spec("Authentification", "Hologramme cousu, QR selon années"),
    ],
  },
  "arc-teryx-beta-lt": {
    description:
      "La veste imperméable trois couches en Gore-Tex, coupe épurée, poids plume. L'imperméabilité se réactive au lavage technique : une occasion « qui ne perle plus » n'est souvent pas morte.",
    specs: [
      spec("Membrane", "Gore-Tex 3 couches"),
      spec("Poids", "Environ 400 g"),
      spec("Entretien", "Lavage + réactivation déperlant (DWR)"),
    ],
  },
  "levi-s-trucker-jacket": {
    description:
      "La veste en jean type III de Levi's, portée depuis 1967. Les vieilles Trucker « Big E » sont des pièces de collection ; les récentes, un basique d'occasion à petit prix.",
    specs: [
      spec("Modèle", "Type III (1967 à aujourd'hui)"),
      spec("Matière", "Denim, boutons frappés Levi's"),
    ],
  },
  "schott-perfecto": {
    description:
      "Le blouson de moto new-yorkais de 1928, zip asymétrique, cuir épais qui se patine des décennies. Un Perfecto s'achète volontiers d'occasion : le cuir fait, c'est le but.",
    specs: [
      spec("Fabrication", "Schott NYC, États-Unis (modèles historiques)"),
      spec("Cuir", "Vachette ou agneau selon référence"),
      spec("Signature", "Zip asymétrique, ceinture"),
    ],
  },
  "moncler-maya-doudoune": {
    description:
      "La doudoune laquée emblématique de Moncler. Contrefaçons très abouties : certificat, code QR intérieur et achat auprès de vendeurs établis sont la règle absolue.",
    specs: [
      spec("Isolation", "Duvet, nylon laqué brillant"),
      spec("Authentification", "Étiquette QR/NFC selon années"),
    ],
  },
  "levi-s-501-original": {
    description:
      "Le jean droit à braguette boutonnée, référence depuis 1873. Les 501 vintage (Made in USA, liseré selvedge) valent des multiples du prix d'un récent : sachez ce que vous achetez.",
    specs: [
      spec("Coupe", "Droite, braguette à boutons"),
      spec("Repères vintage", "Étiquettes intérieures, liseré, Made in USA"),
    ],
  },
  "levi-s-511-slim": {
    description:
      "La coupe slim moderne de Levi's, la plus vendue après le 501. Basique d'occasion sans enjeu de collection : l'état (entrejambe, genoux) fait tout le prix.",
    specs: [spec("Coupe", "Slim, jambe fuselée")],
  },
  "a-p-c-petit-standard-jean": {
    description:
      "Le jean brut japonais d'A.P.C., coupe étroite, pensé pour se délaver avec son porteur. Les bruts à peine portés abondent en seconde main — souvent achetés trop petits.",
    specs: [spec("Denim", "Brut japonais, selvedge"), spec("Coupe", "Étroite et droite")],
  },
  "ralph-lauren-polo-classique": {
    description:
      "Le polo au cavalier brodé, en maille piquée de coton. Les coupes diffèrent fortement (Custom Slim, Classic) : vérifiez l'étiquette, pas seulement la taille.",
    specs: [spec("Matière", "Coton piqué"), spec("Coupes", "Classic, Custom Slim, Slim")],
  },
  "lacoste-polo-l-12-12": {
    description:
      "Le polo original de 1933, en petit piqué, col tenu et crocodile brodé. Le L.12.12 taille plutôt droit ; les contrefaçons se trahissent au crocodile et aux boutons.",
    specs: [
      spec("Matière", "Petit piqué de coton"),
      spec("Référence", "L.12.12, modèle historique de 1933"),
    ],
  },
  "saint-james-mariniere": {
    description:
      "La marinière normande en jersey de coton épais, fabriquée à Saint-James depuis le XIXe siècle. Quasi inusable : l'occasion est fréquente et fiable.",
    specs: [
      spec("Fabrication", "Saint-James, Normandie"),
      spec("Matière", "Jersey de coton dense"),
    ],
  },
  "uniqlo-ultra-light-down": {
    description:
      "La doudoune fine compressible d'Uniqlo, glissée dans sa pochette. Petit prix neuf : une occasion ne vaut que nettement décotée.",
    specs: [
      spec("Isolation", "Duvet, tissage fin"),
      spec("Rangement", "Pochette de compression fournie"),
    ],
  },
  "fjallraven-greenland-veste": {
    description:
      "La veste suédoise en toile G-1000 cirable à la demande (cire Greenland Wax). Résistante, réparable, à l'esthétique outdoor intemporelle.",
    specs: [
      spec("Matière", "G-1000 (polycoton), cirable"),
      spec("Entretien", "Cire Greenland Wax pour ajuster la déperlance"),
    ],
  },
  "longchamp-le-pliage": {
    description:
      "Le sac pliable en toile et cuir, fabriqué par Longchamp depuis 1993. Les coins en toile s'usent d'abord : la maison propose une réparation, atout de l'occasion.",
    specs: [
      spec("Matières", "Toile, rabat et poignées cuir"),
      spec("Tailles", "S, M, L, XL, versions épaule ou main"),
      spec("Réparabilité", "Service Longchamp"),
    ],
  },
  "fjallraven-kanken": {
    description:
      "Le sac à dos suédois carré en Vinylon F, dessiné en 1978 pour les écoliers. Increvable et lavable : le marché de l'occasion en regorge à moitié prix.",
    specs: [
      spec("Matière", "Vinylon F déperlant"),
      spec("Volume", "16 L (classique), existe en mini et laptop"),
    ],
  },
  "eastpak-padded-pak-r": {
    description:
      "Le sac à dos une poche garanti 30 ans par Eastpak. La garantie suit le sac, pas l'acheteur premier : un vrai argument pour l'occasion.",
    specs: [spec("Volume", "24 L"), spec("Garantie", "30 ans (réparation fabricant)")],
  },
  "rimowa-essential-cabin": {
    description:
      "La valise cabine en polycarbonate rainuré, roulettes multidirectionnelles, garantie à vie depuis 2022. Les bosses font partie de l'esthétique revendiquée : jugez roulettes et fermetures, pas la coque.",
    specs: [
      spec("Coque", "Polycarbonate rainuré"),
      spec("Garantie", "À vie (achats depuis juillet 2022)"),
      spec("Format", "Cabine, 4 roues doubles"),
    ],
  },
  "louis-vuitton-speedy-30": {
    description:
      "Le sac boston en toile Monogram, créé en 1930 et jamais arrêté. Code date (avant 2021) ou puce, cuir naturel patiné et coutures régulières : les repères d'authenticité avant tout achat.",
    specs: [
      spec("Toile", "Monogram enduite, cuir naturel"),
      spec("Taille", "30 cm, existe en 25/35/40 et bandoulière"),
      spec("Authentification", "Code date ou puce NFC, facture"),
    ],
  },
  "louis-vuitton-neverfull-mm": {
    description:
      "Le cabas le plus vendu de Louis Vuitton, avec sa pochette amovible. Très contrefait : la pochette, les talons de cuir et la régularité du motif sont les points de contrôle classiques.",
    specs: [
      spec("Toile", "Monogram ou Damier, intérieur textile"),
      spec("Taille", "MM (moyenne), pochette zippée incluse d'origine"),
    ],
  },
  "chanel-classique-timeless": {
    description:
      "Le sac matelassé à chaîne entrelacée de cuir, pièce d'investissement dont la cote a fortement monté. Authentification professionnelle indispensable : carte, hologramme (ou puce depuis 2021) et facture.",
    specs: [
      spec("Cuir", "Agneau ou caviar, matelassage losange"),
      spec("Fermoir", "CC pivotant, chaîne entrelacée"),
      spec("Authentification", "Puce ou hologramme + carte, selon année"),
    ],
  },
  "hermes-evelyne": {
    description:
      "Le sac bandoulière au « H » perforé, pensé à l'origine pour les soins des chevaux. Entrée dans l'univers Hermès moins inaccessible que les Kelly et Birkin ; cachet et poinçons d'année à vérifier.",
    specs: [
      spec("Cuir", "Taurillon Clémence (le plus courant)"),
      spec("Tailles", "TPM, PM, GM"),
      spec("Repères", "Cachet Hermès Paris, lettre d'année"),
    ],
  },
  "polene-numero-un": {
    description:
      "Le sac à trois soufflets de la maison parisienne Polène, fabriqué en Espagne. Succès récent : l'occasion décote modérément, comparez au prix direct de la marque.",
    specs: [spec("Cuir", "Vachette lisse ou grainé"), spec("Fabrication", "Ubrique, Espagne")],
  },
  "sezane-milo-sac": {
    description:
      "Le sac baguette à boucle dorée de Sézane, en cuir lisse ou texturé. Marque à drops : les coloris épuisés alimentent un marché d'occasion dynamique.",
    specs: [spec("Cuir", "Vachette, finitions dorées")],
  },
  "ray-ban-wayfarer": {
    description:
      "La monture acétate de 1952, portée par le cinéma entier. Vérifiez la gravure « RB » au laser sur le verre gauche et les mentions de branche : les copies sont légion.",
    specs: [
      spec("Monture", "Acétate, charnières métal"),
      spec("Authentification", "Gravure RB sur verre, marquages de branche"),
    ],
  },
  "ray-ban-aviator": {
    description:
      "La monture métal à verres en goutte créée pour les pilotes en 1937. Plusieurs tailles de verres (55, 58, 62 mm) : essentiel pour comparer des annonces équivalentes.",
    specs: [spec("Monture", "Métal, doubles ponts"), spec("Tailles verres", "55, 58 ou 62 mm")],
  },
  "persol-714": {
    description:
      "La pliante italienne de Steve McQueen, flèche métallique aux branches et verres souvent polarisés. Fabrication italienne ; charnières de pliage à inspecter en occasion.",
    specs: [
      spec("Particularité", "Monture pliante"),
      spec("Fabrication", "Italie, flèche Supreme Arrow"),
    ],
  },
  "hermes-carre-de-soie-90": {
    description:
      "Le carré de soie 90 × 90 roulotté main, édité en dessins saisonniers depuis 1937. L'ourlet roulotté main et la tenue de la soie distinguent l'authentique ; certains dessins cotent très haut.",
    specs: [
      spec("Dimensions", "90 × 90 cm, twill de soie"),
      spec("Finition", "Ourlets roulottés à la main"),
    ],
  },
  "montblanc-meisterstuck-149": {
    description:
      "Le stylo-plume de prestige par excellence, plume or 18 carats, fabriqué à Hambourg. Se révise chez Montblanc ; numéro de série et étoile intacte au capuchon pour l'authenticité.",
    specs: [
      spec("Plume", "Or 750 (18 carats)"),
      spec("Remplissage", "Piston"),
      spec("Fabrication", "Hambourg, Allemagne"),
    ],
  },
};
