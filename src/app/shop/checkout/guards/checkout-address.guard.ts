import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { selectCheckoutAddress } from '../../../state/checkout/checkout.selectors';

export const checkoutAddressGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectCheckoutAddress).pipe(
    map(address => {
      if (!address) {
        router.navigate(['/app/shop/checkout/address']);
        return false;
      }
      return true;
    })
  );
};
