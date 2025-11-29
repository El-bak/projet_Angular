export interface Product {
  id: number;
  name: string;
  price: number;
  created_at: string;
  owner_id: number;
  ratings: { user_id: number; value: number }[];
  image?: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Stylo Bleu',
    price: 2.5,
    created_at: '2025-01-10T10:00:00Z',
    owner_id: 10,
    ratings: [{ user_id: 2, value: 4 }],
    image: "/assets/products/stylo_bleu.png"
  },
  {
    id: 2,
    name: 'Cahier A5',
    price: 3.9,
    created_at: '2025-02-01T09:30:00Z',
    owner_id: 11,
    ratings: [{ user_id: 3, value: 5 }],
    image: "/assets/products/cahier_a5.png"
  },

  {
    id: 3,
    name: 'Classeur Rouge',
    price: 4.5,
    created_at: '2025-02-12T12:00:00Z',
    owner_id: 12,
    ratings: [{ user_id: 4, value: 3 }],
    image: "/assets/products/classeur_rouge.png"
  },
  {
    id: 4,
    name: 'Crayon HB',
    price: 1.2,
    created_at: '2025-03-01T08:45:00Z',
    owner_id: 13,
    ratings: [{ user_id: 2, value: 5 }],
    image: "/assets/products/crayon_hb.png"
  },
  {
    id: 5,
    name: 'Règle 30cm',
    price: 1.5,
    created_at: '2025-03-05T07:20:00Z',
    owner_id: 14,
    ratings: [{ user_id: 1, value: 4 }],
    image: "/assets/products/regle.png"
  },
  {
    id: 6,
    name: 'Gomme Blanche',
    price: 0.9,
    created_at: '2025-03-10T14:10:00Z',
    owner_id: 15,
    ratings: [{ user_id: 3, value: 4 }],
    image: "/assets/products/gomme_blanche.png"
  },
  {
    id: 7,
    name: 'Surligneur Jaune',
    price: 1.7,
    created_at: '2025-03-11T11:00:00Z',
    owner_id: 16,
    ratings: [{ user_id: 6, value: 5 }],
    image: "/assets/products/surligneur_jaune.png"
  },
  {
    id: 8,
    name: 'Pochette Plastique',
    price: 0.3,
    created_at: '2025-03-12T09:00:00Z',
    owner_id: 17,
    ratings: [{ user_id: 3, value: 3 }],
    image: "/assets/products/pochette_plastique.png"
  },
  {
    id: 9,
    name: 'Feutre Noir',
    price: 2.0,
    created_at: '2025-03-15T10:30:00Z',
    owner_id: 18,
    ratings: [{ user_id: 5, value: 4 }],
    image: "/assets/products/feutre_noir.png"
  },
  {
    id: 10,
    name: 'Bloc Notes',
    price: 3.0,
    created_at: '2025-03-20T16:00:00Z',
    owner_id: 19,
    ratings: [{ user_id: 7, value: 5 }],
    image: "/assets/products/bloc_notes.png"
  },
  {
    id: 11,
    name: 'Feuilles A4',
    price: 4.0,
    created_at: '2025-03-22T12:40:00Z',
    owner_id: 20,
    ratings: [{ user_id: 2, value: 4 }],
    image: "/assets/products/feuille_a4.png"
  },
  {
    id: 12,
    name: 'Trousse Bleue',
    price: 6.5,
    created_at: '2025-03-25T13:00:00Z',
    owner_id: 21,
    ratings: [{ user_id: 8, value: 5 }],
    image: "/assets/products/trousse_bleue.png"
  },
  {
    id: 13,
    name: 'Colle Bâton',
    price: 1.3,
    created_at: '2025-04-01T07:00:00Z',
    owner_id: 10,
    ratings: [{ user_id: 9, value: 3 }],
    image: "/assets/products/colle_baton.png"
  },
  {
    id: 14,
    name: 'Ruban Adhésif',
    price: 2.8,
    created_at: '2025-04-03T08:00:00Z',
    owner_id: 11,
    ratings: [{ user_id: 1, value: 4 }],
    image: "/assets/products/ruban_adhesif.png"
  },
  {
    id: 15,
    name: 'Stylo Rouge',
    price: 2.5,
    created_at: '2025-04-05T10:20:00Z',
    owner_id: 12,
    ratings: [{ user_id: 3, value: 5 }],
    image: "/assets/products/stylo_rouge.png"
  },
  {
    id: 16,
    name: 'Feutres Couleur (Pack x10)',
    price: 7.9,
    created_at: '2025-04-10T14:00:00Z',
    owner_id: 13,
    ratings: [{ user_id: 6, value: 4 }],
    image: "/assets/products/feutres_couleur_pack10.png"
  },
  {
    id: 17,
    name: 'Pinceau Fin',
    price: 2.2,
    created_at: '2025-04-12T12:30:00Z',
    owner_id: 14,
    ratings: [{ user_id: 5, value: 3 }],
    image: "/assets/products/pinceau_fin.png"
  },
  {
    id: 18,
    name: 'Palette Aquarelle',
    price: 9.5,
    created_at: '2025-04-15T11:10:00Z',
    owner_id: 15,
    ratings: [{ user_id: 8, value: 5 }],
    image: "/assets/products/palette_aquarelle.png"
  },
  {
    id: 19,
    name: 'Marqueur Effaçable',
    price: 3.4,
    created_at: '2025-04-18T09:40:00Z',
    owner_id: 16,
    ratings: [{ user_id: 2, value: 4 }],
    image: "/assets/products/marqueur_effacable.png"
  },
  {
    id: 20,
    name: 'Tampon Encreur',
    price: 5.0,
    created_at: '2025-04-20T15:00:00Z',
    owner_id: 17,
    ratings: [{ user_id: 9, value: 4 }],
    image: "/assets/products/tampon_encreur.png"
  },
];
