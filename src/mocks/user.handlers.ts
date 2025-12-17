import { http, HttpResponse } from 'msw';

export const userHandlers = [

  // ─────────────────────────────
  // PROFILE
  // ─────────────────────────────
  http.get('/api/me/', () => {
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

  http.patch('/api/me/', async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json(body);
  }),

  // ─────────────────────────────
  // ORDERS
  // ─────────────────────────────
  http.get('/api/me/orders/', () => {
    return HttpResponse.json([
      {
        id: 'ord-1',
        total: 89.9,
        createdAt: '2025-11-20',
        status: 'delivered',
      },
    ]);
  }),

  http.get<{ id: string }>('/api/orders/:id/', ({ params }) => {
  return HttpResponse.json({
    id: params.id,
    items: [
      {
        productId: 1,
        name: 'Casque Bluetooth',
        price: 59.9,
        quantity: 1,
      },
      {
        productId: 2,
        name: 'Souris Gaming',
        price: 20.1,
        quantity: 1,
      },
    ],
    subtotal: 80,
    taxes: 6,
    shipping: 3.9,
    total: 89.9,
    status: 'delivered',
    createdAt: '2025-11-20',
  });
}),

];
