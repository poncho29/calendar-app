export interface User {
  uid: string;
  name: string;
}

export interface AuthState {
  status: string;
  user: User | null,
  errorMessage: string | undefined,
}

export enum AuthStatus {
  checking = 'checking',
  authenticated = 'authenticated',
  notAuthenticated = 'not-authenticated'
}
