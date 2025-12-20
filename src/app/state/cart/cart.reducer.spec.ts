import { cartReducer, initialState } from './cart.reducer';
import * as CartActions from './cart.actions';
import { Product } from '../../../mocks/data'; 

describe('CartReducer', () => {

  const mockProduct = {
    id: 1,
    name: 'Test product',
    price: 10,
    image: 'img.png',
    created_at: '2025-01-01',
    owner_id: 1,
    ratings: [],
    description: 'Test description',
    stock: 10,
    inStock: true,
    isNew: false,

  };

  it('should add item and update count & totalPrice', () => {
    const action = CartActions.addItem({
      product: mockProduct,
      quantity: 2,
    });

    const state = cartReducer(initialState, action);

    expect(state.items.length).toBe(1);
    expect(state.items[0].productId).toBe(1);
    expect(state.items[0].quantity).toBe(2);
    expect(state.count).toBe(2);
    expect(state.totalPrice).toBe(20);
  });

  it('should update quantity and recalc totals', () => {
    const stateWithItem = {
      ...initialState,
      items: [
        {
          productId: 1,
          name: 'Test product',
          price: 10,
          quantity: 1,
        },
      ],
      count: 1,
      totalPrice: 10,
    };

    const action = CartActions.updateQuantity({
      productId: 1,
      quantity: 3,
    });

    const state = cartReducer(stateWithItem as any, action);

    expect(state.items[0].quantity).toBe(3);
    expect(state.count).toBe(3);
    expect(state.totalPrice).toBe(30);
  });

  it('should remove item and reset totals', () => {
    const stateWithItem = {
      ...initialState,
      items: [
        {
          productId: 1,
          name: 'Test product',
          price: 10,
          quantity: 2,
        },
      ],
      count: 2,
      totalPrice: 20,
    };

    const action = CartActions.removeItem({ productId: 1 });
    const state = cartReducer(stateWithItem as any, action);

    expect(state.items.length).toBe(0);
    expect(state.count).toBe(0);
    expect(state.totalPrice).toBe(0);
  });

});
