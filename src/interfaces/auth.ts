export interface User {
  uid: string;
  name: string;
}

export interface AuthState {
  status: string;
  user: User | undefined,
  errorMessage: string | undefined,
}

export enum AuthStatus {
  checking = 'checking',
  authenticated = 'authenticated',
  notAuthenticated = 'not-authenticated'
}
