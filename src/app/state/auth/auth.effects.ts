import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { AppService } from '../../services/app.service';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { Router } from '@angular/router';


export class AuthEffects {
  private actions$ = inject(Actions);
  private api = inject(AppService);
  private router = inject(Router);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ username, password }) =>
        this.api.login(username, password).pipe(
          map((response) =>
            AuthActions.loginSuccess({
              access: response.access,
              refresh: response.refresh,
            })
          ),
          catchError((err) =>
            of(AuthActions.loginFailure({ error: err?.message ?? 'Login failed' }))
          )
        )
      )
    )
  );

  // optional: navigate on success
  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(() => {
          // after login, go to products page
          this.router.navigate(['/app/shop/products']);
        })
      ),
    { dispatch: false }
  );
}
