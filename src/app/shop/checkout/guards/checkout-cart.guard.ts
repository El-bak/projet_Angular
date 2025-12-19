import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { selectCartItems } from '../../../state/cart/cart.selectors';

export const cartNotEmptyGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectCartItems).pipe(
    map(items => {
      if (!items || items.length === 0) {
        router.navigate(['/app/shop/cart']);
        return false;
      }
      return true;
    })
  );
};
