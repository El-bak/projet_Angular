import { authReducer, initialState } from './auth.reducer';
import * as AuthActions from './auth.actions';

describe('Auth Reducer', () => {
  it('should return initial state by default', () => {
    const state = authReducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  it('should set loading true on login', () => {
    const state = authReducer(initialState, AuthActions.login({ username: 'a', password: 'b' }));
    expect(state.loading).toBeTrue();
    expect(state.error).toBeNull();
  });

  it('should set access + refresh on loginSuccess', () => {
    const state = authReducer(
      initialState,
      AuthActions.loginSuccess({ access: 'abc', refresh: 'xyz' })
    );

    expect(state.access).toBe('abc');
    expect(state.refresh).toBe('xyz');
    expect(state.loading).toBeFalse();
    expect(state.error).toBeNull();
  });

  it('should set error on loginFailure', () => {
    const state = authReducer(
      initialState,
      AuthActions.loginFailure({ error: 'Invalid credentials' })
    );

    expect(state.loading).toBeFalse();
    expect(state.error).toBe('Invalid credentials');
  });

  it('should update access on refreshTokenSuccess', () => {
    const modifiedState = { ...initialState, access: 'old' };
    const state = authReducer(modifiedState, AuthActions.refreshTokenSuccess({ access: 'new' }));

    expect(state.access).toBe('new');
  });

  it('should reset to initialState on logout', () => {
    const modifiedState = { ...initialState, access: 'a', refresh: 'b' };
    const state = authReducer(modifiedState, AuthActions.logout());

    expect(state).toEqual(initialState);
  });
});
