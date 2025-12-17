import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { AppService } from '../../services/app.service';
import { catchError, map, mergeMap, switchMap, tap, of } from 'rxjs';
import { Router } from '@angular/router';
import  * as UserActions  from '../user/user.actions';


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
    mergeMap(({ username, password }) => {

      // 🔥 Vérification simple (mode DEMO)
      if (username === 'Demo' && password === 'Demo') {
        return of(
          AuthActions.loginSuccess({
            access: 'fake-access-token',
            refresh: 'fake-refresh-token'
          })
        );
      }

      // ❌ Identifiants invalides
      return of(
        AuthActions.loginFailure({
          error: 'Identifiants incorrects.'
        })
      );
    })
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

  loadUserAfterLogin$ = createEffect(() =>
  this.actions$.pipe(
    ofType(AuthActions.loginSuccess),
    map(() => UserActions.loadUserProfile())
  )
);

}
