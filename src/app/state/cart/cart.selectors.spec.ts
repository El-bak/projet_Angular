import { selectCartCount, selectCartTotal } from './cart.selectors';
import { CartState } from './cart.reducer';

describe('Cart Selectors', () => {

  it('should return total items count', () => {
    const cartState: CartState = {
      items: [
        { productId: 1, name: 'A', price: 10, quantity: 2 },
        { productId: 2, name: 'B', price: 5, quantity: 3 },
      ],
      count: 5,
      totalPrice: 35,
      subtotal: 0,
      discount: 0,
      stockError: null,
    };

    const result = selectCartCount.projector(cartState);

    expect(result).toBe(5);
  });

  it('should return total cart price', () => {
    const cartState: CartState = {
      items: [],
      count: 0,
      totalPrice: 99,
      subtotal: 0,
      discount: 0,
      stockError: null,
    };

    const result = selectCartTotal.projector(cartState);

    expect(result).toBe(99);
  });

});

