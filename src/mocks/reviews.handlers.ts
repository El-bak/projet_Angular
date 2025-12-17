import { http, HttpResponse } from 'msw';

export const reviewsHandlers = [

  // ─────────────────────────────
  // GET REVIEWS BY PRODUCT
  // ─────────────────────────────
  http.get('/api/products/:id/reviews/', ({ params }) => {
    return HttpResponse.json([
      {
        id: 'r1',
        user: { id: 'u1', username: 'demo' },
        rating: 5,
        comment: 'Excellent produit, je recommande !',
        createdAt: '2025-11-10',
      },
      {
        id: 'r2',
        user: { id: 'u2', username: 'alice' },
        rating: 4,
        comment: 'Bon rapport qualité/prix.',
        createdAt: '2025-11-12',
      },
    ]);
  }),

  // ─────────────────────────────
  // POST REVIEW
  // ─────────────────────────────
  http.post('/api/products/:id/reviews/', async ({ request }) => {
    const body = (await request.json()) as {
        rating: number;
        comment: string;
    } 

    return HttpResponse.json(
      {
        id: crypto.randomUUID(),
        user: { id: 'u1', username: 'demo' },
        rating: body.rating,
        comment: body.comment,
        createdAt: new Date().toISOString(),
      },
      { status: 201 }
    );
  }),
];
