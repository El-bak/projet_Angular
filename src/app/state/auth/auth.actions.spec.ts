import * as AuthActions from './auth.actions';

describe('Auth Actions', () => {
  it('should create login action', () => {
    const action = AuthActions.login({ username: 'admin', password: 'test' });

    expect(action.type).toBe('[Auth] Login');
    expect(action.username).toBe('admin');
    expect(action.password).toBe('test');
  });

  it('should create loginSuccess action', () => {
    const action = AuthActions.loginSuccess({ access: 'a', refresh: 'r' });

    expect(action.type).toBe('[Auth] Login Success');
    expect(action.access).toBe('a');
    expect(action.refresh).toBe('r');
  });

  it('should create loginFailure action', () => {
    const action = AuthActions.loginFailure({ error: 'bad' });

    expect(action.type).toBe('[Auth] Login Failure');
    expect(action.error).toBe('bad');
  });

  it('should create refreshToken action', () => {
    const action = AuthActions.refreshToken({ refresh: 'xyz' });

    expect(action.refresh).toBe('xyz');
  });

  it('should create logout action', () => {
    const action = AuthActions.logout();
    expect(action.type).toBe('[Auth] Logout');
  });
});
