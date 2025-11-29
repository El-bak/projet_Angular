import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { AppService } from '../../services/app.service';
import { catchError, map, mergeMap, switchMap, tap, of } from 'rxjs';
import { Router } from '@angular/router';

export class AuthEffects {
  private actions$ = inject(Actions);
  private api = inject(AppService);
  private router = inject(Router);

  // ---------------------------
  // 1) LOGIN
  // ---------------------------
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
            of(
              AuthActions.loginFailure({
                error: err?.message ?? 'Login failed',
              })
            )
          )
        )
      )
    )
  );

  // ---------------------------
  // 2) LOGIN SUCCESS → STORE TOKENS + NAVIGATION
  // ---------------------------
  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(({ access, refresh }) => {
          localStorage.setItem('access', access);
          localStorage.setItem('refresh', refresh);
          this.router.navigate(['/app/shop/products']);
        })
      ),
    { dispatch: false }
  );

  // ---------------------------
  // 3) REFRESH TOKEN
  // ---------------------------
  refreshToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.refreshToken),
      switchMap(({ refresh }) =>
        this.api.refreshToken(refresh).pipe(
          map((res) =>
            AuthActions.refreshTokenSuccess({
              access: res.access,
            })
          ),
          catchError(() =>
            of(AuthActions.logout()) // refresh échoué → logout automatique
          )
        )
      )
    )
  );

  // ---------------------------
  // 4) REFRESH SUCCESS → UPDATE LOCALSTORAGE
  // ---------------------------
  refreshSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.refreshTokenSuccess),
        tap(({ access }) => {
          localStorage.setItem('access', access);
        })
      ),
    { dispatch: false }
  );

  // ---------------------------
  // 5) LOGOUT
  // ---------------------------
  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          localStorage.removeItem('access');
          localStorage.removeItem('refresh');
          this.router.navigate(['/app/login']);
        })
      ),
    { dispatch: false }
  );
}
