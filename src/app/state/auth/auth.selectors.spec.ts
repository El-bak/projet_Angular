import { selectAccessToken, selectRefreshToken, selectIsAuthenticated } from './auth.selectors';
import { AuthState } from './auth.reducer';

describe('Auth Selectors', () => {
  const fullState = {
    auth: {
      access: 'AAA',
      refresh: 'RRR',
      loading: false,
      error: null,
    } as AuthState,
  };

  it('selectAccessToken should return access', () => {
    const result = selectAccessToken(fullState);
    expect(result).toBe('AAA');
  });

  it('selectRefreshToken should return refresh', () => {
    const result = selectRefreshToken(fullState);
    expect(result).toBe('RRR');
  });

  it('selectIsAuthenticated should return true when token exists', () => {
    const result = selectIsAuthenticated(fullState);
    expect(result).toBeTrue();
  });

  it('selectIsAuthenticated should return false when no token', () => {
    const stateWithoutToken = {
      auth: { ...fullState.auth, access: null },
    };
    const result = selectIsAuthenticated(stateWithoutToken);
    expect(result).toBeFalse();
  });
});
