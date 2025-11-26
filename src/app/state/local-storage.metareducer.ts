import { ActionReducer, INIT, UPDATE } from '@ngrx/store';

export function storageMetaReducer<T>(reducer: ActionReducer<T>): ActionReducer<T> {
  return (state, action) => {
    const nextState = reducer(state, action);
    if ([INIT.toString(), UPDATE.toString()].includes(action.type)) {
      try {
        const saved = localStorage.getItem('app_state_cart');
        if (saved) {
          const parsed = JSON.parse(saved);
          return { ...nextState, cart: parsed };
        }
      } catch (e) {}
    }
    // after each action persist cart slice
    try {
      const cartSlice = (nextState as any).cart;
      if (cartSlice) {
        localStorage.setItem('app_state_cart', JSON.stringify(cartSlice));
      }
    } catch (e) {}
    return nextState;
  };
}
