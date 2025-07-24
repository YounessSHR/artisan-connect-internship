
/**
 * @fileoverview This file contains mock data for seeding the database.
 * This data is based on a real-world example to provide a realistic development environment.
 * To populate your Firestore database with this data, run the command: `npm run db:seed`
 * This allows for immediate testing of all application features without manual data entry.
 */

export const MOCK_PRODUCTS = [
  {
    id: "p1",
    name: "Miel d’Oranger – 500g",
    description: "Un miel de fleur d'oranger doux et parfumé, récolté avec soin par les femmes de la Coopérative Féminine Mogador. Parfait pour sucrer vos thés, tartines ou yaourts.",
    price: 15.00,
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "orange blossom honey",
    categoryId: "cuisine-salle-a-manger",
    cooperativeId: "c2", // Coopérative Féminine Mogador
    artisanId: "c2-a1"
  },
  {
    id: "p2",
    name: "Bougie Artistique 'Picasso'",
    description: "Une bougie artistique et sculpturale fabriquée par la Coopérative Bougie Mogador. Chaque pièce est unique, ajoutant une touche de design et une lueur chaleureuse à votre intérieur.",
    price: 25.00,
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "artistic candle",
    categoryId: "decoration-interieure",
    cooperativeId: "c12", // Coopérative bougie Mogador
    artisanId: "c12-a1"
  },
  {
    id: "p3",
    name: "Boucles d’Oreilles en Argent",
    description: "Élégantes et intemporelles, ces boucles d'oreilles en argent sont fabriquées à la main par les artisans bijoutiers d'Essaouira. Un accessoire parfait pour toutes les occasions.",
    price: 65.00,
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "silver earrings",
    categoryId: "bijoux",
    cooperativeId: "c17", // Coopérative essabijoux chic
    artisanId: "c17-a1"
  },
  {
    id: "p4",
    name: "Ensemble “Hiboux” en Argent",
    description: "Un charmant ensemble de bijoux sur le thème du hibou, méticuleusement fabriqué en argent. Créé par les talentueux artisans bijoutiers du complexe Argana, c'est un cadeau parfait pour les amoureux de la nature.",
    price: 130.00,
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "silver owl jewelry",
    categoryId: "bijoux",
    cooperativeId: "c9", // Coopérative bijoutier swiri
    artisanId: "c9-a1"
  },
  {
    id: "p5",
    name: "Bracelet en Argent par Abdelhafid ESSABI",
    description: "Un bracelet en argent massif, œuvre d'Abdelhafid ESSABI, un artisan renommé d'Essaouira. Poursuivant une tradition familiale, cette pièce allie savoir-faire ancestral et design contemporain.",
    price: 150.00,
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "silver bracelet",
    categoryId: "bijoux",
    cooperativeId: "c9", // Coopérative bijoutier swiri
    artisanId: "c9-a1"
  },
  {
    id: "p6",
    name: "Sandales en Raffia",
    description: "Légères et aérées, ces sandales en raffia sont entièrement faites à la main. Le compagnon idéal pour l'été, alliant confort naturel et style bohème chic.",
    price: 40.00,
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "raffia sandals",
    categoryId: "chaussures",
    cooperativeId: "c16", // Coopérative rafia handmade
    artisanId: "c16-a1"
  },
  {
    id: "p7",
    name: "Panier en Doum et Jonc",
    description: "Un panier traditionnel tissé à partir de feuilles de palmier doum et de jonc séchés. Spacieux et robuste, il est parfait pour le marché, la plage ou comme élément de décoration rustique.",
    price: 35.00,
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "woven basket doum",
    categoryId: "sacs-sacs-a-main",
    cooperativeId: "c5", // Coopérative yakoutaa rafia
    artisanId: "c5-a1"
  },
  {
    id: "p8",
    name: "Coussins Artisanaux 40x40cm",
    description: "Apportez une touche de couleur et de texture à votre canapé avec ces coussins tissés à la main. Chaque pièce présente des motifs traditionnels et est fabriquée par une coopérative de tissage dédiée.",
    price: 30.00,
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "artisan cushions",
    categoryId: "decoration-interieure",
    cooperativeId: "c15", // Coopérative lhaik tissage
    artisanId: "c15-a1"
  },
  {
    id: "p9",
    name: "Sac Gnawi en Cuir",
    description: "Inspiré de l'héritage musical Gnawa, ce sac en cuir de la Coopérative Maroccuir est un témoignage du savoir-faire transmis de génération en génération à Essaouira. Robuste, pratique et plein de caractère.",
    price: 85.00,
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "gnawa leather bag",
    categoryId: "sacs-sacs-a-main",
    cooperativeId: "c8", // Coopérative maroccuir
    artisanId: "c8-a1"
  },
  {
    id: "p10",
    name: "Boîte à Bijoux en Bois de Thuya",
    description: "Une boîte à bijoux exquise fabriquée à la main à partir du bois de Thuya aromatique d'Essaouira. Parfait pour ranger de petits trésors, avec des incrustations complexes et une finition brillante.",
    price: 85.00,
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "thuya wood box",
    categoryId: "decoration-interieure",
    cooperativeId: "c1", // La grande Coopérative artisanale des produits de thuya
    artisanId: "c1-a1"
  },
  {
    id: "p11",
    name: "Tapis Berbère Beni Ourain",
    description: "Ce tapis Beni Ourain est tissé à la main par des artisans qualifiés dans les montagnes de l'Atlas au Maroc. Fabriqué en laine 100% naturelle, il est doux, confortable et durable.",
    price: 450.00,
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "beni ourain rug",
    categoryId: "decoration-interieure",
    cooperativeId: "c19", // Coopérative de la femme artisane pour les tapis
    artisanId: "c19-a1"
  },
  {
    id: "p12",
    name: "Kaftan Brodé à la Main",
    description: "Un élégant kaftan marocain, méticuleusement brodé à la main par les artisanes de la coopérative. Parfait pour les occasions spéciales ou pour une tenue de tous les jours sophistiquée.",
    price: 180.00,
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "embroidered caftan",
    categoryId: "pour-elle",
    cooperativeId: "c3", // Coopérative Alamssa Assaouiria
    artisanId: "c3-a1"
  }
];

export const MOCK_COOPERATIVES = [
    {
        id: "c1",
        name: "La grande Coopérative artisanale des produits de thuya",
        story: "Fondée en 2009, notre coopérative réunit 16 artisans experts dans le travail du bois de Thuya, un bois précieux issu des forêts de l'Atlas. Chaque pièce est méticuleusement fabriquée en utilisant des techniques traditionnelles d'incrustation et de marqueterie.",
        mission: "Proposer des produits en bois de Thuya haut de gamme qui allient qualité, innovation et respect du patrimoine artisanal marocain.",
        artisans: [
            { id: "c1-a1", name: "Karim", bio: "Maître ébéniste spécialisé dans la marqueterie complexe avec du citronnier et de la nacre.", imageUrl: "https://placehold.co/128x128.png", imageHint: "male woodworker" },
            { id: "c1-a2", name: "Said", bio: "Artisan talentueux connu pour son travail d'incrustation délicat et ses finitions polies sur le bois de Thuya.", imageUrl: "https://placehold.co/128x128.png", imageHint: "artisan sanding wood" }
        ],
        imageUrl: "https://placehold.co/600x400.png",
        imageHint: "thuya wood grain",
        contact: { email: "contact.thuya.atlas@gmail.com", phone: "+212 (0)6 57 20 64 99", address: "Complexe artisanal Argana, Essaouira" },
    },
    {
        id: "c2",
        name: "Coopérative Féminine Mogador",
        story: "La Coopérative Féminine Mogador est une initiative dynamique qui rassemble des femmes artisanes d'Essaouira, spécialisées dans divers métiers traditionnels pour atteindre l'autonomie financière. Elles produisent notamment un miel d'oranger réputé.",
        mission: "Autonomiser les femmes artisanes d'Essaouira en leur fournissant une plateforme pour vendre leurs créations uniques et préserver les savoir-faire locaux.",
        artisans: [
            { id: "c2-a1", name: "Amina", bio: "Experte en produits du terroir comme le miel, et tisserande talentueuse, transmettant son savoir de mère en fille.", imageUrl: "https://placehold.co/128x128.png", imageHint: "female beekeeper" }
        ],
        imageUrl: "https://placehold.co/600x400.png",
        imageHint: "women weaving",
        contact: { email: "contact.mogador.femmes@gmail.com", phone: "+212 (0)6 57 20 64 99", address: "Complexe artisanal Argana, Essaouira" },
    },
    {
        id: "c3",
        name: "Coopérative Alamssa Assaouiria pour couture et broderie",
        story: "Alamssa Assaouiria est dédiée à l'art délicat de la couture et de la broderie marocaine. Nos membres créent des vêtements et des textiles de maison ornés de motifs traditionnels complexes.",
        mission: "Préserver et promouvoir l'art de la broderie d'Essaouira en produisant des pièces de haute qualité qui racontent une histoire culturelle.",
        artisans: [
            { id: "c3-a1", name: "Nadia", bio: "Maîtresse brodeuse spécialisée dans le point de Fès et la création de kaftans élégants.", imageUrl: "https://placehold.co/128x128.png", imageHint: "woman embroidering" }
        ],
        imageUrl: "https://placehold.co/600x400.png",
        imageHint: "embroidery detail",
        contact: { email: "contact.alamssa@gmail.com", phone: "+212 (0)6 57 20 64 99", address: "Complexe artisanal Argana, boutique No. 14, Essaouira" },
    },
    {
        id: "c4",
        name: "Coopérative Al anaqa pour la couture et la broderie",
        story: "Al Anaqa, qui signifie 'L'Élégance', se spécialise dans la haute couture marocaine. Nos artisans combinent des techniques de broderie traditionnelles avec des designs contemporains.",
        mission: "Créer des vêtements élégants et modernes qui célèbrent la richesse de l'artisanat textile marocain.",
        artisans: [
            { id: "c4-a1", name: "Samira", bio: "Styliste et couturière, elle est connue pour moderniser les coupes traditionnelles du kaftan.", imageUrl: "https://placehold.co/128x128.png", imageHint: "fashion designer" }
        ],
        imageUrl: "https://placehold.co/600x400.png",
        imageHint: "mannequin with caftan",
        contact: { email: "contact.alanaqa@gmail.com", phone: "+212 (0)6 57 20 64 99", address: "Complexe artisanal Argana, Essaouira" },
    },
    {
        id: "c5",
        name: "Coopérative yakoutaa rafia",
        story: "Spécialisée dans le travail du raphia, notre coopérative transforme cette fibre naturelle en sacs, chapeaux, et objets de décoration. Chaque pièce est tissée à la main avec patience et précision.",
        mission: "Promouvoir l'utilisation de matériaux durables comme le raphia et offrir des créations écologiques et stylées.",
        artisans: [
            { id: "c5-a1", name: "Fatima", bio: "Experte dans le tissage du raphia, elle crée des sacs et paniers aux designs complexes.", imageUrl: "https://placehold.co/128x128.png", imageHint: "woman weaving raffia" }
        ],
        imageUrl: "https://placehold.co/600x400.png",
        imageHint: "raffia bags",
        contact: { email: "contact.yakoutaa.rafia@gmail.com", phone: "+212 (0)6 57 20 64 99", address: "Complexe artisanal Argana, Essaouira" },
    },
    {
        id: "c6",
        name: "Coopérative Al mawrout pour couture et broderie",
        story: "Al Mawrout, 'L'Héritage', se consacre à la préservation des techniques de broderie transmises de génération en génération. Nos créations sont un hommage au patrimoine textile marocain.",
        mission: "Maintenir en vie les techniques de broderie ancestrales en les appliquant à des créations textiles pour la maison et la mode.",
        artisans: [
             { id: "c6-a1", name: "Aicha", bio: "Gardienne d'un savoir-faire ancien, elle maîtrise des points de broderie rares et précieux.", imageUrl: "https://placehold.co/128x128.png", imageHint: "elderly woman embroidering" }
        ],
        imageUrl: "https://placehold.co/600x400.png",
        imageHint: "traditional embroidery",
        contact: { email: "contact.almawrout@gmail.com", phone: "+212 (0)6 57 20 64 99", address: "Complexe artisanal Argana, Essaouira" },
    },
    {
        id: "c7",
        name: "Coopérative Afous",
        story: "'Afous' signifie 'main' en berbère, symbolisant l'authenticité de notre artisanat. La coopérative rassemble des artisans polyvalents, du cuir au bois, tous unis par la passion du fait-main.",
        mission: "Offrir une gamme diversifiée de produits faits main qui représentent le meilleur de l'artisanat d'Essaouira.",
        artisans: [
            { id: "c7-a1", name: "Hassan", bio: "Artisan polyvalent, il travaille aussi bien le cuir que le bois, avec un oeil pour le détail.", imageUrl: "https://placehold.co/128x128.png", imageHint: "male artisan hands" }
        ],
        imageUrl: "https://placehold.co/600x400.png",
        imageHint: "artisan workshop",
        contact: { email: "contact.afous@gmail.com", phone: "+212 (0)6 57 20 64 99", address: "Complexe artisanal Argana, Essaouira" },
    },
    {
        id: "c8",
        name: "Coopérative maroccuir",
        story: "Maroccuir est un collectif de maîtres maroquiniers qui transforment le cuir de haute qualité en sacs, babouches, et ceintures. Notre travail est reconnu pour sa durabilité et son style intemporel.",
        mission: "Célébrer l'excellence de la maroquinerie marocaine en créant des articles en cuir qui durent toute une vie.",
        artisans: [
            { id: "c8-a1", name: "Youssef", bio: "Maître maroquinier, il est spécialisé dans la confection de sacs et de babouches traditionnelles.", imageUrl: "https://placehold.co/128x128.png", imageHint: "male leather worker" }
        ],
        imageUrl: "https://placehold.co/600x400.png",
        imageHint: "leather workshop",
        contact: { email: "contact.maroccuir@gmail.com", phone: "+212 (0)6 57 20 64 99", address: "Complexe artisanal Argana, Essaouira" },
    },
    {
        id: "c9",
        name: "Coopérative bijoutier swiri",
        story: "Nos bijoutiers 'Swiri' (d'Essaouira) sont réputés pour leur travail de l'argent et du laiton. Ils créent des bijoux uniques, inspirés par les motifs berbères et la beauté de l'océan Atlantique.",
        mission: "Forger des bijoux qui ne sont pas de simples accessoires, mais des sculptures portables, porteuses de l'histoire et de l'âme d'Essaouira.",
        artisans: [
            { id: "c9-a1", name: "Fatima", bio: "Créatrice de bijoux spécialisée dans les pièces en argent d'inspiration berbère.", imageUrl: "https://placehold.co/128x128.png", imageHint: "female jeweler" },
            { id: "c9-a2", name: "Youssef", bio: "Artisan qualifié en travail du laiton, créant des lanternes et des miroirs complexes.", imageUrl: "https://placehold.co/128x128.png", imageHint: "male brassworker" }
        ],
        imageUrl: "https://placehold.co/600x400.png",
        imageHint: "jewelry making",
        contact: { email: "contact.bijoutier.swiri@gmail.com", phone: "+212 (0)6 57 20 64 99", address: "Complexe artisanal Argana, Essaouira" },
    },
    {
        id: "c10",
        name: "Coopérative Al wissam pour la gravure et la sculpture du bois de thuya",
        story: "Al Wissam ('La Médaille') représente l'excellence dans l'art du bois de thuya. Nos artisans sont des maîtres de la gravure et de la sculpture, créant des pièces décoratives d'une finesse exceptionnelle.",
        mission: "Être la référence en matière de sculpture et de gravure sur bois de thuya, en créant des œuvres d'art qui honorent notre héritage.",
        artisans: [
            { id: "c10-a1", name: "Ahmed", bio: "Maître sculpteur, son travail est connu pour la finesse de ses gravures sur les boîtes en thuya.", imageUrl: "https://placehold.co/128x128.png", imageHint: "wood carver hands" }
        ],
        imageUrl: "https://placehold.co/600x400.png",
        imageHint: "thuya wood carving",
        contact: { email: "contact.alwissam.thuya@gmail.com", phone: "+212 (0)6 57 20 64 99", address: "Complexe artisanal Argana, Essaouira" },
    },
    {
        id: "c11",
        name: "Coopérative AL AMAL Pour Les Produits A Base Des Plantes Kdaim Et Smar",
        story: "Al Amal ('L'Espoir') valorise les plantes locales comme le Kdaim et le Smar. Nous produisons une gamme de produits naturels, allant des articles de bien-être aux objets décoratifs tissés.",
        mission: "Exploiter durablement les richesses botaniques locales pour créer des produits sains et artisanaux qui soutiennent notre communauté.",
        artisans: [
            { id: "c11-a1", name: "Amina", bio: "Herboriste et tisserande, elle connaît les secrets des plantes locales pour le bien-être et l'artisanat.", imageUrl: "https://placehold.co/128x128.png", imageHint: "woman with herbs" }
        ],
        imageUrl: "https://placehold.co/600x400.png",
        imageHint: "dried herbs",
        contact: { email: "contact.alamal.plantes@gmail.com", phone: "+212 (0)6 57 20 64 99", address: "Complexe artisanal Argana, Essaouira" },
    },
    {
        id: "c12",
        name: "Coopérative bougie Mogador",
        story: "Nous sommes des artisans ciriers passionnés, créant des bougies parfumées qui capturent l'essence d'Essaouira. Chaque bougie est coulée à la main en utilisant des cires naturelles et des parfums locaux.",
        mission: "Illuminer les intérieurs avec des bougies artisanales de haute qualité qui évoquent les souvenirs et les senteurs de Mogador.",
        artisans: [
            { id: "c12-a1", name: "Leila", bio: "Maîtresse cirier, elle développe des senteurs uniques qui capturent l'atmosphère d'Essaouira.", imageUrl: "https://placehold.co/128x128.png", imageHint: "woman making candles" }
        ],
        imageUrl: "https://placehold.co/600x400.png",
        imageHint: "artisan candles",
        contact: { email: "boujiemogador@gmail.com", phone: "+212 6 66 16 65 65", address: "Complexe Artisanat Essaouira, boutique 11" },
    },
    {
        id: "c13",
        name: "Coopérative nirvana pour la sculpture du bois",
        story: "Nirvana est un collectif d'artistes sculpteurs qui travaillent le bois de thuya pour créer des formes abstraites et modernes. Nos pièces sont des sculptures uniques qui défient les formes traditionnelles.",
        mission: "Explorer les possibilités artistiques du bois de thuya à travers la sculpture abstraite, en offrant des pièces uniques pour les collectionneurs d'art.",
        artisans: [
            { id: "c13-a1", name: "Rachid", bio: "Artiste sculpteur, son travail explore les formes organiques et abstraites du bois de thuya.", imageUrl: "https://placehold.co/128x128.png", imageHint: "male sculptor artist" }
        ],
        imageUrl: "https://placehold.co/600x400.png",
        imageHint: "abstract wood sculpture",
        contact: { email: "cooperative.nirvana@gmail.com", phone: "+212 (0)6 57 20 64 99", address: "Ensemble artisanal Argana, boutique No. 1" },
    },
    {
        id: "c14",
        name: "Coopérative lofia sculpture",
        story: "Notre coopérative se spécialise dans la sculpture sur bois, en créant des objets décoratifs et fonctionnels. Nous travaillons différentes essences de bois pour offrir une variété de styles.",
        mission: "Transformer le bois brut en objets d'art et de design, en alliant techniques traditionnelles et esthétique contemporaine.",
        artisans: [
            { id: "c14-a1", name: "Driss", bio: "Sculpteur sur bois, il crée des figurines animales et des objets décoratifs avec une grande précision.", imageUrl: "https://placehold.co/128x128.png", imageHint: "male wood sculptor" }
        ],
        imageUrl: "https://placehold.co/600x400.png",
        imageHint: "wood sculptures",
        contact: { email: "contact.lofia.sculpture@gmail.com", phone: "+212 (0)6 57 20 64 99", address: "Complexe artisanal Argana, Essaouira" },
    },
    {
        id: "c15",
        name: "Coopérative lhaik tissage",
        story: "Nous sommes des tisserands dédiés à la création de 'lhaik', les textiles traditionnels marocains. Nous utilisons des métiers à tisser manuels pour produire des tissus d'une qualité et d'une beauté exceptionnelles.",
        mission: "Préserver l'art du tissage du lhaik et offrir des textiles authentiques pour la mode et la décoration.",
        artisans: [
            { id: "c15-a1", name: "Zainab", bio: "Maîtresse tisserande, elle manie le métier à tisser avec une dextérité héritée de ses ancêtres.", imageUrl: "https://placehold.co/128x128.png", imageHint: "woman at loom" }
        ],
        imageUrl: "https://placehold.co/600x400.png",
        imageHint: "weaving loom",
        contact: { email: "contact.lhaik.tissage@gmail.com", phone: "+212 (0)6 57 20 64 99", address: "Complexe artisanal Argana, Essaouira" },
    },
    {
        id: "c16",
        name: "Coopérative rafia handmade",
        story: "Notre coopérative est entièrement dédiée au fait-main, avec un accent particulier sur les créations en raphia. Chaque article est le fruit d'heures de travail minutieux.",
        mission: "Célébrer la beauté du fait-main en proposant des articles en raphia uniques et de haute qualité.",
        artisans: [
            { id: "c16-a1", name: "Imane", bio: "Artisane du raphia, elle est connue pour ses créations originales et colorées.", imageUrl: "https://placehold.co/128x128.png", imageHint: "young woman weaving" }
        ],
        imageUrl: "https://placehold.co/600x400.png",
        imageHint: "handmade raffia items",
        contact: { email: "contact.rafia.handmade@gmail.com", phone: "+212 (0)6 57 20 64 99", address: "Complexe artisanal Argana, Essaouira" },
    },
    {
        id: "c17",
        name: "Coopérative essabijoux chic",
        story: "Essabijoux Chic se spécialise dans la création de bijoux en argent modernes et élégants. Nos artisans combinent des designs contemporains avec une touche d'inspiration marocaine.",
        mission: "Offrir des bijoux en argent chics et accessibles, faits à la main à Essaouira, qui complètent le style de la femme moderne.",
        artisans: [
            { id: "c17-a1", name: "Sofia", bio: "Créatrice de bijoux, elle imagine des pièces en argent épurées et modernes.", imageUrl: "https://placehold.co/128x128.png", imageHint: "female jewelry designer" }
        ],
        imageUrl: "https://placehold.co/600x400.png",
        imageHint: "modern silver jewelry",
        contact: { email: "contact.essabijoux@gmail.com", phone: "+212 (0)6 57 20 64 99", address: "Complexe artisanal Argana, Essaouira" },
    },
    {
        id: "c18",
        name: "Coopérative Al najah",
        story: "Al Najah, 'Le Succès', est une coopérative polyvalente qui rassemble des artisans de divers horizons, tous animés par le désir de réussir et de promouvoir leur artisanat.",
        mission: "Créer une synergie entre différents artisans pour offrir une gamme complète de produits de qualité et assurer le succès collectif.",
        artisans: [
            { id: "c18-a1", name: "Omar", bio: "Artisan polyvalent, il excelle dans plusieurs domaines, du bois au métal.", imageUrl: "https://placehold.co/128x128.png", imageHint: "male artisan portrait" }
        ],
        imageUrl: "https://placehold.co/600x400.png",
        imageHint: "various crafts",
        contact: { email: "contact.alnajah@gmail.com", phone: "+212 (0)6 57 20 64 99", address: "Complexe artisanal Argana, Essaouira" },
    },
    {
        id: "c19",
        name: "Coopérative de la femme artisane pour les tapis",
        story: "Cette coopérative est entièrement dirigée par des femmes, dédiées à l'art ancestral du tissage de tapis. Elles créent des tapis berbères, du Beni Ourain au Boucherouite, avec passion.",
        mission: "Autonomiser les femmes tisserandes de la région en préservant l'art du tapis marocain et en leur assurant un revenu équitable.",
        artisans: [
            { id: "c19-a1", name: "Halima", bio: "Maîtresse tisserande, elle dirige la coopérative et est experte en motifs Boucherouite.", imageUrl: "https://placehold.co/128x128.png", imageHint: "woman rug weaver" }
        ],
        imageUrl: "https://placehold.co/600x400.png",
        imageHint: "stack of moroccan rugs",
        contact: { email: "contact.femmes.tapis@gmail.com", phone: "+212 (0)6 57 20 64 99", address: "Complexe artisanal Argana, Essaouira" },
    }
];

export const MOCK_BLOG_POSTS = [
  {
    slug: 'l-art-de-la-ceramique-marocaine',
    title: "L'Art de la Céramique Marocaine : Un Héritage d'Argile et de Couleur",
    excerpt: "Explorez le monde vibrant de la poterie marocaine, des motifs complexes de Fès aux teintes terreuses de Tamegroute. Découvrez l'histoire, les techniques et les artisans derrière ces belles créations.",
    content: `
      <p class="mb-4">La poterie marocaine est une forme d'art ancestrale qui a été transmise de génération en génération. Elle est connue pour ses couleurs vives, ses motifs complexes et ses designs uniques. Chaque région du Maroc a son propre style de poterie, reflétant la culture et les traditions locales.</p>
      <p class="mb-4">Des carreaux de zellige de Fès à la poterie verte de Tamegroute, la céramique marocaine est un témoignage de l'habileté et de la créativité des artisans marocains. Le processus de fabrication de la poterie est long et laborieux, impliquant de nombreuses étapes, du façonnage de l'argile à la cuisson et au glaçage des pièces. Le résultat est une œuvre d'art belle et fonctionnelle qui peut être appréciée pendant de nombreuses années.</p>
      <h3 class="font-headline text-2xl font-bold my-4">Notre Coopérative AL AMAL</h3>
      <p>L'un de ces arts est préservé par les artisans de la Coopérative AL AMAL, qui créent des pièces en céramique belles et uniques. Leur travail est un excellent exemple de l'art et de l'artisanat de la poterie marocaine, et nous sommes fiers de présenter leurs créations dans notre boutique.</p>
    `,
    imageUrl: 'https://placehold.co/1200x675.png',
    imageHint: 'moroccan pottery',
    author: 'Laila Alaoui',
    date: '2023-10-22',
    tags: ['Artisanat', 'Céramique', 'Maroc'],
  },
  {
    slug: 'le-bois-de-thuya-tresor-d-essaouira',
    title: "Le Bois de Thuya : Trésor parfumé d'Essaouira",
    excerpt: "Plongez dans l'univers du bois de Thuya, ce bois précieux aux motifs uniques et au parfum envoûtant, emblématique de l'artisanat d'Essaouira. Découvrez le savoir-faire des maîtres ébénistes.",
    content: `
      <p class="mb-4">Le bois de Thuya est un bois rare qui pousse exclusivement dans les montagnes de l'Atlas, près d'Essaouira. Connu pour son grain dense, ses motifs 'oeil de perdrix' et son parfum de cèdre distinctif, il est utilisé depuis des siècles par les artisans pour créer des objets d'une beauté exceptionnelle.</p>
      <h3 class="font-headline text-2xl font-bold my-4">Un Artisanat d'Excellence</h3>
      <p class="mb-4">Le travail du bois de Thuya est un art de patience et de précision. Les artisans, comme ceux de la Grande Coopérative des produits de thuya, maîtrisent des techniques complexes de marqueterie et d'incrustation, utilisant souvent des essences de bois contrastantes comme le citronnier ou le noyer, ainsi que de la nacre, pour créer des motifs décoratifs sophistiqués.</p>
      <h3 class="font-headline text-2xl font-bold my-4">Des Créations Uniques</h3>
      <p>Des boîtes à bijoux finement ouvragées aux sculptures abstraites, chaque objet en bois de Thuya est une pièce unique. En choisissant une création de la coopérative Al Wissam ou Nirvana, vous acquérez non seulement un bel objet, mais aussi un morceau de l'âme et du patrimoine d'Essaouira.</p>
    `,
    imageUrl: 'https://placehold.co/1200x675.png',
    imageHint: 'thuya wood box',
    author: 'Amina El Fassi',
    date: '2023-11-05',
    tags: ['Thuya', 'Ébénisterie', 'Artisanat', 'Essaouira'],
  },
  {
    slug: 'l-elegance-intemporelle-du-cuir-marocain',
    title: "L'Élégance Intemporelle du Cuir Marocain : De la Tannerie à la Mode",
    excerpt: "Plongez dans le monde du travail du cuir marocain, réputé pour sa qualité et sa durabilité. Découvrez le processus de tannage traditionnel et les artisans qualifiés qui créent de magnifiques articles en cuir.",
    content: `
      <p class="mb-4">Le Maroc est célèbre pour ses articles en cuir de haute qualité, notamment les sacs, les ceintures, les chaussures et les poufs. Les tanneries de Fès et de Marrakech sont les plus célèbres du pays, où les artisans utilisent des techniques traditionnelles pour traiter les peaux d'animaux.</p>
      <p class="mb-4">Le processus de fabrication du cuir est long et laborieux, mais le résultat est un matériau souple et durable qui est perfect pour créer une large gamme de produits. Les artisans marocains sont connus pour leur savoir-faire et leur souci du détail, et leurs articles en cuir sont très recherchés par les touristes et les habitants.</p>
      <p>Chez ArtisanConnect, nous travaillons avec des coopératives qualifiées comme Maroccuir, qui créent de magnifiques articles en cuir qui mettent en valeur la beauté et la durabilité de l'artisanat marocain.</p>
    `,
    imageUrl: 'https://placehold.co/1200x675.png',
    imageHint: 'leather goods',
    author: 'Karim Bennani',
    date: '2023-09-15',
    tags: ['Cuir', 'Artisanat', 'Mode'],
  },
  {
    slug: 'la-magie-des-tapis-berberes-tisser-des-histoires',
    title: "La Magie des Tapis Berbères : Tisser des Histoires Fil par Fil",
    excerpt: "Les tapis berbères sont plus que de simples revêtements de sol ; ce sont des œuvres d'art qui racontent des histoires sur la culture, les traditions et les croyances des tribus berbères du Maroc. Découvrez les différents types de tapis berbères et les significations symboliques derrière leurs motifs.",
    content: `
      <p class="mb-4">Les tapis berbères sont connus pour leurs motifs complexes, leurs couleurs vives et leur construction durable. Chaque tapis est une pièce unique qui reflète la créativité et le savoir-faire de la tisserande. Les symboles et les motifs utilisés dans les tapis berbères ont souvent des significations spécifiques, représentant des thèmes tels que la fertilité, la protection et la spiritualité.</p>
      <p>Il existe de nombreux types de tapis berbères, chacun avec ses propres caractéristiques. Les tapis Beni Ourain sont connus pour leurs motifs géométriques simples et leurs couleurs neutres, tandis que les tapis Boucherouite sont fabriqués à partir de textiles recyclés et présentent des couleurs et des motifs audacieux.</p>
      <p>Peu importe le style, un tapis berbère est une belle et significative addition à n'importe quelle maison. En possédant un tapis de la Coopérative de la femme artisane pour les tapis, vous n'ajoutez pas seulement de la chaleur à votre espace, mais vous soutenez également un art ancestral et les femmes qui le perpétuent.</p>
    `,
    imageUrl: 'https://placehold.co/1200x675.png',
    imageHint: 'berber rug',
    author: 'Laila Alaoui',
    date: '2023-08-05',
    tags: ['Tapis Berbère', 'Culture', 'Décoration Intérieure'],
  }
];

    