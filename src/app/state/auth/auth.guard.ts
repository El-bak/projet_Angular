import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAccessToken } from './auth.selectors';
import { map, tap } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectAccessToken).pipe(
    map(token => !!token),
    tap(isAuth => {
      if (!isAuth) router.navigate(['/app/login']);
    })
  );
};
