export enum AuthStatus {
  checking = 'checking',
  authenticated = 'authenticated',
  notAuthenticated = 'not-authenticated'
}

export interface AuthState {
  status: string;
  user: Record<string, unknown>,
  errorMessage: string | undefined,
}