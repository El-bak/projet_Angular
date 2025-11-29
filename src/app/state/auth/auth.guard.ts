import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAccessToken } from './auth.selectors';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectAccessToken).pipe(
    map((token) => {
      if (!token) {
        router.navigate(['/app/login']);
        return false;
      }
      return true;
    })
  );
};
