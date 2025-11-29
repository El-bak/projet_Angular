import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { ReplaySubject, of, throwError } from 'rxjs';
import { AuthEffects } from './auth.effects';
import * as AuthActions from './auth.actions';
import { AppService } from '../../services/app.service';
import { Router } from '@angular/router';

describe('AuthEffects', () => {
  let actions$: ReplaySubject<any>;
  let effects: AuthEffects;
  let api: jasmine.SpyObj<AppService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    api = jasmine.createSpyObj('AppService', ['login', 'refreshToken']);
    router = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthEffects,
        provideMockActions(() => actions$),
        { provide: AppService, useValue: api },
        { provide: Router, useValue: router },
      ],
    });

    effects = TestBed.inject(AuthEffects);
  });

  // -------------------------
  // LOGIN SUCCESS
  // -------------------------
  it('should dispatch loginSuccess on login', (done) => {
    api.login.and.returnValue(of({ access: 'A', refresh: 'R' }));

    actions$ = new ReplaySubject(1);
    actions$.next(AuthActions.login({ username: 'u', password: 'p' }));

    effects.login$.subscribe((result) => {
      expect(result).toEqual(AuthActions.loginSuccess({ access: 'A', refresh: 'R' }));
      done();
    });
  });

  // -------------------------
  // LOGIN FAILURE
  // -------------------------
  it('should dispatch loginFailure on error', (done) => {
    api.login.and.returnValue(throwError(() => new Error('fail')));

    actions$ = new ReplaySubject(1);
    actions$.next(AuthActions.login({ username: 'u', password: 'p' }));

    effects.login$.subscribe((result) => {
      expect(result.type).toBe('[Auth] Login Failure');
      done();
    });
  });

  // -------------------------
  // REFRESH TOKEN SUCCESS
  // -------------------------
  it('should dispatch refreshTokenSuccess', (done) => {
    api.refreshToken.and.returnValue(of({ access: 'NEW_TOKEN' }));

    actions$ = new ReplaySubject(1);
    actions$.next(AuthActions.refreshToken({ refresh: 'old' }));

    effects.refreshToken$.subscribe((result) => {
      expect(result).toEqual(AuthActions.refreshTokenSuccess({ access: 'NEW_TOKEN' }));
      done();
    });
  });

  // -------------------------
  // REFRESH TOKEN FAILURE → LOGOUT
  // -------------------------
  it('should logout on refreshToken error', (done) => {
    api.refreshToken.and.returnValue(throwError(() => new Error('bad refresh')));

    actions$ = new ReplaySubject(1);
    actions$.next(AuthActions.refreshToken({ refresh: 'old' }));

    effects.refreshToken$.subscribe((result) => {
      expect(result).toEqual(AuthActions.logout());
      done();
    });
  });
});
