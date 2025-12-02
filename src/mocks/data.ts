export interface Product {
  id: number;
  name: string;
  price: number;
  created_at: string;
  owner_id: number;
  ratings: { user_id: number; value: number }[];
  image?: string;
  description : string;
  isNew?: boolean;
  inStock?: boolean;
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Stylo Bleu',
    price: 2.5,
    created_at: '2025-01-10T10:00:00Z',
    owner_id: 10,
    ratings: [{ user_id: 2, value: 4 }],
    image: "/assets/products/stylo_bleu.png",
    description:"Stylo bille bleu à pointe fine, idéal pour l’écriture quotidienne. Encre fluide et durable.",
    inStock: true,
    isNew:false
  },
  {
    id: 2,
    name: 'Cahier A5',
    price: 3.9,
    created_at: '2025-02-01T09:30:00Z',
    owner_id: 11,
    ratings: [{ user_id: 3, value: 5 }],
    image: "/assets/products/cahier_a5.png",
    description:"",
    inStock: true,
    isNew: false
  },

  {
    id: 3,
    name: 'Classeur Rouge',
    price: 4.5,
    created_at: '2025-02-12T12:00:00Z',
    owner_id: 12,
    ratings: [{ user_id: 4, value: 3 }],
    image: "/assets/products/classeur_rouge.png",
    description:"",
    inStock: false,
    isNew: true
  },
  {
    id: 4,
    name: 'Crayon HB',
    price: 1.2,
    created_at: '2025-03-01T08:45:00Z',
    owner_id: 13,
    ratings: [{ user_id: 2, value: 5 }],
    image: "/assets/products/crayon_hb.png",
    description:"",
    inStock: true,
    isNew: false
  },
  {
    id: 5,
    name: 'Règle 30cm',
    price: 1.5,
    created_at: '2025-03-05T07:20:00Z',
    owner_id: 14,
    ratings: [{ user_id: 1, value: 4 }],
    image: "/assets/products/regle.png",
    description:"",
    inStock: true,
    isNew: false
  },
  {
    id: 6,
    name: 'Gomme Blanche',
    price: 0.9,
    created_at: '2025-03-10T14:10:00Z',
    owner_id: 15,
    ratings: [{ user_id: 3, value: 4 }],
    image: "/assets/products/gomme_blanche.png",
    description:"",
    inStock: true,
    isNew: false
  },
  {
    id: 7,
    name: 'Surligneur Jaune',
    price: 1.7,
    created_at: '2025-03-11T11:00:00Z',
    owner_id: 16,
    ratings: [{ user_id: 6, value: 5 }],
    image: "/assets/products/surligneur_jaune.png",
    description:"",
    inStock: true,
    isNew: false
  },
  {
    id: 8,
    name: 'Pochette Plastique',
    price: 0.3,
    created_at: '2025-03-12T09:00:00Z',
    owner_id: 17,
    ratings: [{ user_id: 3, value: 3 }],
    image: "/assets/products/pochette_plastique.png",
    description:"",
    inStock: true,
    isNew: false
  },
  {
    id: 9,
    name: 'Feutre Noir',
    price: 2.0,
    created_at: '2025-03-15T10:30:00Z',
    owner_id: 18,
    ratings: [{ user_id: 5, value: 4 }],
    image: "/assets/products/feutre_noir.png",
    description:"",
    inStock: true,
    isNew: false
  },
  {
    id: 10,
    name: 'Bloc Notes',
    price: 3.0,
    created_at: '2025-03-20T16:00:00Z',
    owner_id: 19,
    ratings: [{ user_id: 7, value: 5 }],
    image: "/assets/products/bloc_notes.png",
    description:"",
    inStock: true,
    isNew: false
  },
  {
    id: 11,
    name: 'Feuilles A4',
    price: 4.0,
    created_at: '2025-03-22T12:40:00Z',
    owner_id: 20,
    ratings: [{ user_id: 2, value: 4 }],
    image: "/assets/products/feuille_a4.png",
    description:"",
    inStock: true,
    isNew: false
  },
  {
    id: 12,
    name: 'Trousse Bleue',
    price: 6.5,
    created_at: '2025-03-25T13:00:00Z',
    owner_id: 21,
    ratings: [{ user_id: 8, value: 5 }],
    image: "/assets/products/trousse_bleue.png",
    description:"",
    inStock: true,
    isNew: false
  },
  {
    id: 13,
    name: 'Colle Bâton',
    price: 1.3,
    created_at: '2025-04-01T07:00:00Z',
    owner_id: 10,
    ratings: [{ user_id: 9, value: 3 }],
    image: "/assets/products/colle_baton.png",
    description:"",
    inStock: true,
    isNew: false
  },
  {
    id: 14,
    name: 'Ruban Adhésif',
    price: 2.8,
    created_at: '2025-04-03T08:00:00Z',
    owner_id: 11,
    ratings: [{ user_id: 1, value: 4 }],
    image: "/assets/products/ruban_adhesif.png",
    description:"",
    inStock: true,
    isNew: false
  },
  {
    id: 15,
    name: 'Stylo Rouge',
    price: 2.5,
    created_at: '2025-04-05T10:20:00Z',
    owner_id: 12,
    ratings: [{ user_id: 3, value: 5 }],
    image: "/assets/products/stylo_rouge.png",
    description:"",
    inStock: true,
    isNew: false
  },
  {
    id: 16,
    name: 'Feutres Couleur (Pack x10)',
    price: 7.9,
    created_at: '2025-04-10T14:00:00Z',
    owner_id: 13,
    ratings: [{ user_id: 6, value: 4 }],
    image: "/assets/products/feutres_couleur_pack10.png",
    description:"",
    inStock: true,
    isNew: false
  },
  {
    id: 17,
    name: 'Pinceau Fin',
    price: 2.2,
    created_at: '2025-04-12T12:30:00Z',
    owner_id: 14,
    ratings: [{ user_id: 5, value: 3 }],
    image: "/assets/products/pinceau_fin.png",
    description:"",
    inStock: true,
    isNew: false
  },
  {
    id: 18,
    name: 'Palette Aquarelle',
    price: 9.5,
    created_at: '2025-04-15T11:10:00Z',
    owner_id: 15,
    ratings: [{ user_id: 8, value: 5 }],
    image: "/assets/products/palette_aquarelle.png",
    description:"",
    inStock: true,
    isNew: false
  },
  {
    id: 19,
    name: 'Marqueur Effaçable',
    price: 3.4,
    created_at: '2025-04-18T09:40:00Z',
    owner_id: 16,
    ratings: [{ user_id: 2, value: 4 }],
    image: "/assets/products/marqueur_effacable.png",
    description:"",
    inStock: true,
    isNew: false
  },
  {
    id: 20,
    name: 'Tampon Encreur',
    price: 5.0,
    created_at: '2025-04-20T15:00:00Z',
    owner_id: 17,
    ratings: [{ user_id: 9, value: 4 }],
    image: "/assets/products/tampon_encreur.png",
    description:"",
    inStock: true,
    isNew: false
  },
  {
    id: 21,
    name: 'Calculatrice',
    price: 9.50,
    created_at: '2025-04-22T17:20:00Z',
    owner_id: 18,
    ratings: [{ user_id: 11, value: 4.5 }],
    image: "/assets/products/calculatrice_vert.png",
    description:"",
    inStock: true,
    isNew: false
  },
  {
    id: 22,
    name: 'Taille Crayon Rose',
    price: 2.50,
    created_at: '2025-04-21T19:29:00Z',
    owner_id: 19,
    ratings: [{ user_id: 12, value: 3 }],
    image: "/assets/products/taille_crayon_rose.png",
    description:"",
    inStock: false,
    isNew: true
  },
  {
    id: 23,
    name: 'PC portable',
    price: 250,
    created_at: '2025-04-26T19:18:00Z',
    owner_id: 19,
    ratings: [{ user_id: 15, value: 4 }],
    image: "/assets/products/pc_portable_bureau.png",
    description: "PC portable pour travaille avec 8 GB de Memory, 16 GB de RAM, OS Windows 11, état de la batterie : neuf",
    isNew: true,
    inStock: false

  },
];
