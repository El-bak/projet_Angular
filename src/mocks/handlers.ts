/* eslint-disable @typescript-eslint/no-explicit-any */
import { http, HttpResponse } from 'msw';
import { products } from './data';
import { paginate, avgRating } from './utils';


// ─────────────────────────────────────────────
// Fake DB commandes
// ─────────────────────────────────────────────
let orders: any[] = [];


const API = '/api';

// ─────────────────────────────
// Fake DB AVIS PRODUITS (persistée)
// ─────────────────────────────

const REVIEWS_KEY = 'msw_product_reviews';

const loadReviews = (): Record<number, any[]> => {
  const raw = localStorage.getItem(REVIEWS_KEY);
  if (raw) {
    return JSON.parse(raw);
  }

  // Initialisation avec avis de démo pour chaque produit
  const initial: Record<number, any[]> = {};

  products.forEach(product => {
    initial[product.id] = [
      {
        id: crypto.randomUUID(),
        user: { id: 'u1', username: 'demo' },
        rating: 4,
        comment: `Avis de démonstration pour ${product.name}`,
        createdAt: '2025-11-10',
      }
    ];
  });

  localStorage.setItem(REVIEWS_KEY, JSON.stringify(initial));
  return initial;
};

const saveReviews = (reviews: Record<number, any[]>) => {
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
};

let productReviews = loadReviews();


export const handlers = [ 
  
  // Auth: POST /api/auth/token/ -> { access, refresh }
  http.post(`${API}/auth/token/`, async () => {
    // Ici on accepte tout payload pour valider l'intégration front.
    return HttpResponse.json(
      {
        access: 'mock-access-token',
        refresh: 'mock-refresh-token',
      },
      { status: 200 },
    );
  }),

  // Auth refresh: POST /api/auth/token/refresh/ -> { access }
  http.post(`${API}/auth/token/refresh/`, async () => {
    return HttpResponse.json({ access: 'mock-access-token-refreshed' }, { status: 200 });
  }),

  // Products list: GET /api/products/?page=&page_size=&min_rating=&ordering=
  http.get(`${API}/products/`, async ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') || '1');
    const page_size = Number(url.searchParams.get('page_size') || '10');
    const min_rating = Number(url.searchParams.get('min_rating') || '0');
    const ordering = url.searchParams.get('ordering') || '-created_at';

    const rows = products
      .map((p) => ({ ...p, _avg: avgRating(p.ratings) }))
      .filter((p) => p._avg >= min_rating);

    const sign = ordering.startsWith('-') ? -1 : 1;
    const key = ordering.replace(/^-/, '');
    rows.sort((a: any, b: any) => (a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0) * sign);

    const { count, results } = paginate(rows, page, page_size);
    return HttpResponse.json({ count, next: null, previous: null, results }, { status: 200 });
  }),

  // ─────────────────────────────────────────────
  // Page produit Angular attend GET /app/shop/products
  // ─────────────────────────────────────────────
  http.get('/app/shop/products', async () => {
    return HttpResponse.json(
      products.map(p => ({
        id: p.id,
        name: p.name,
        price: p.price,
        avgRating: avgRating(p.ratings),
        image: p.image
      })),
      { status: 200 }
    );
  }),

  // Product rating: GET /api/products/:id/rating/
  http.get(`${API}/products/:id/rating/`, async ({ params }) => {
    const id = Number(params['id']);
    const p = products.find((x) => x.id === id);
    if (!p) return HttpResponse.json({ detail: 'Not found.' }, { status: 404 });
    return HttpResponse.json(
      { product_id: id, avg_rating: avgRating(p.ratings), count: p.ratings.length },
      { status: 200 },
    );
  }),

  http.post(`${API}/products/:id/rating/`, async ({ params, request }) => {
  const id = Number(params['id']);
  const p = products.find((x) => x.id === id);
  if (!p) return HttpResponse.json({ detail: 'Not found.' }, { status: 404 });

  const body = (await request.json()) as {rating: number}
  const rating = Number(body.rating ?? 0);


  // Ajouter la note dans la liste
  p.ratings.push({user_id: 0, value: rating});

  return HttpResponse.json(
    {
      product_id: id,
      avg_rating: avgRating(p.ratings),
      count: p.ratings.length,
    },
    { status: 200 },
  );
 }),
  // ─────────────────────────────────────────────
  // Product details: GET /api/products/:id/
  // ─────────────────────────────────────────────
  http.get(`${API}/products/:id/`, async ({ params }) => {
    const id = Number(params['id']);
    const product = products.find((p) => p.id === id);

    if (!product) {
      return HttpResponse.json({ detail: 'Not found' }, { status: 404 });
    }

    return HttpResponse.json(
      {
        ...product,
        averageRating: avgRating(product.ratings),
      },
      { status: 200 },
    );
  }),

  // ─────────────────────────────────────────────
  // Validate cart: POST /api/cart/validate/
  // ─────────────────────────────────────────────
  http.post(`${API}/cart/validate/`, async ({ request }) => {
    const data = await request.json();

    // total fictif pour test
    return HttpResponse.json(
      {
        total: 123.45,
        currency: 'EUR',
      },
      { status: 200 },
    );
  }),

  // ─────────────────────────────────────────────
  // Order creation: POST /api/order/
  // ─────────────────────────────────────────────
  http.post(`${API}/order/`, async ({ request }) => {
    const body = await request.json() as {
      items: any[];
      total: number;
      paymentMethod: string;
      promo?: {
        discount: number;
        shipping: number;
        taxes: number;
        appliedPromos: string[];
      } | null;
    };

    const statusFlow: Array<'paid' | 'shipped' | 'delivered'> = [
      'paid',
      'shipped',
      'delivered'
    ];

      
    const order = {
      id: crypto.randomUUID(),
      orderNumber: 'ORD-' + Math.floor(Math.random() * 100000),
      items: body.items,
      total: body.total,
      paymentMethod: body.paymentMethod,
      promo: body.promo ?? null,
      status: statusFlow[Math.floor(Math.random() * statusFlow.length)], 
      createdAt: new Date().toISOString()
    };

    orders.push(order);

    return HttpResponse.json(order, { status: 200 });
  }),

  // ─────────────────────────────────────────────
  // Orders list
  // ─────────────────────────────────────────────
  http.get(`${API}/orders`, async () => {
    return HttpResponse.json(orders, { status: 200 });
  }),
  
  // ─────────────────────────────────────────────
  // Order detail
  // ─────────────────────────────────────────────
  http.get(`${API}/orders/:id`, async ({ params }) => {
    const order = orders.find(o => o.id === params['id']);

    if (!order) {
      return HttpResponse.json(
        { message: 'Commande introuvable' },
        { status: 404 }
      );
   }

   return HttpResponse.json(order, { status: 200 });
  }),

  
  // ─────────────────────────────────────────────
  // Validate stock: POST /api/cart/validate-stock
  // ─────────────────────────────────────────────
  http.post(`${API}/cart/validate-stock`, async ({ request }) => {
    const { items } = await request.json() as {
      items: { productId: number; quantity: number }[];
    };
    
    console.log('[MSW] FIRST validate-stock handler', items)

    for (const item of items) {
      const product = products.find(p => p.id === item.productId);

      if (!product || product.stock === undefined) {
        continue;
      }

      if (product.stock < item.quantity) {
        return HttpResponse.json(
          {
            message: `Stock insuffisant pour le produit "${product.name}"`,
          },
          { status: 400 }
        );
      }
    }

    return HttpResponse.json({ ok: true });
  }),

  http.post('/api/cart/apply-promo', async ({ request }) => {
    const { items, code } = await request.json() as any;

    const itemsTotal = items.reduce(
     (sum: number, i: any) => sum + i.price * i.quantity,
     0
    );

    let discount = 0;
    let shipping = 5;
    const appliedPromos: string[] = [];

    switch (code.toUpperCase()) {
      case 'WELCOME10':
        discount = itemsTotal * 0.10;
        appliedPromos.push('WELCOME10');
        break;

      case 'FREESHIP':
        shipping = 0;
        appliedPromos.push('FREESHIP');
        break;

      case 'VIP20':
        if (itemsTotal >= 100) {
          discount = itemsTotal * 0.20;
          appliedPromos.push('VIP20');
        } else {
          return HttpResponse.json(
            { message: 'VIP20 valable à partir de 100€' },
            { status: 400 }
          );
       }
       break;

     default:
       return HttpResponse.json(
         { message: 'Code promo inconnu' },
         { status: 400 }
       );
  }

  const taxes = (itemsTotal - discount) * 0.2;
  const grandTotal = itemsTotal - discount + shipping + taxes;
  const round = (n: number) => Math.round(n * 100) / 100;

  return HttpResponse.json({
    itemsTotal: round(itemsTotal),
    discount: round(discount),
    shipping: round(shipping),
    taxes: round(taxes),
    grandTotal: round(grandTotal),
    appliedPromos
   });
  }),

  // ─────────────────────────────────────────────
  // USER PROFILE
  // ─────────────────────────────────────────────
  http.get(`${API}/me/`, () => {
    return HttpResponse.json({
      id: 'u1',
      username: 'demo',
      email: 'demo@myshop.dev',
      fullName: 'Demo User',
      preferences: {
        newsletter: true,
        defaultMinRating: 3,
      },
    });
  }),

  http.patch(`${API}/me/`, async ({ request }) => {
    const body = (await request.json()) as Partial<{
      fullName: string;
      preferences: {
        newsletter: boolean;
        defaultMinRating?: number;
      }
    }>;
    
    return HttpResponse.json({
      id: 'u1',
      username: 'demo',
      email: 'demo@myshop.dev',
      ...body
    });
  }),

  // ─────────────────────────────────────────────
  // USER ORDERS (basé sur vraies commandes)
  // ─────────────────────────────────────────────
  http.get(`${API}/me/orders/`, () => {
    return HttpResponse.json(
      orders.map(o => ({
        id: o.id,
        total: o.total,
        createdAt: o.createdAt,
        status: o.status
      }))
    );
  }),

  http.get('/api/admin/stats', () => {
    return HttpResponse.json({
      totalUsers: 1,
      totalOrders: 12,
      totalRevenue: 1840,

      topProducts: [
        {
          productId: 'p1',
          name: 'Laptop Pro',
          sold: 6,
          revenue: 900
        },
        {
          productId: 'p2',
          name: 'Wireless Headphones',
          sold: 4,
          revenue: 520
        }
     ],

      recentOrders: [
        { 
          id: 'o1001',
          user: 'Demo',
          total: 220,
          createdAt: '2025-01-10',
          status: 'Livrée'
        },
        {
          id: 'o1002',
          user: 'Demo',
          total: 180,
          createdAt: '2025-01-12',
          status: 'Expédiée'
        }
      ]
    });
  }),

  // ─────────────────────────────
  // REVIEWS (AVIS PRODUITS)
  // ─────────────────────────────

  http.get(`${API}/products/:id/reviews/`, ({ params }) => {
    const productId = Number(params['id']);

    if (!productReviews[productId]) {
      productReviews[productId] = [];
    }

    return HttpResponse.json(productReviews[productId], { status: 200 });
  }),

  http.post(`${API}/products/:id/reviews/`, async ({ params, request }) => {
    const productId = Number(params['id']);
    const body = (await request.json()) as {
      rating: number;
      comment: string;
    };

    if (!productReviews[productId]) {
      productReviews[productId] = [];
    }

    const newReview = {
      id: crypto.randomUUID(),
      user: { id: 'u1', username: 'demo' },
      rating: body.rating,
      comment: body.comment,
      createdAt: new Date().toISOString(),
    };

    productReviews[productId].push(newReview);
    saveReviews(productReviews);

    return HttpResponse.json(newReview, { status: 201 });
  }),
];


