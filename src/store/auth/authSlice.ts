import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { AuthState, AuthStatus, User } from '../../interfaces';

const InitialUser: User | undefined = undefined;

const initialState: AuthState = {
  status: AuthStatus.notAuthenticated,
  user: InitialUser,
  errorMessage: undefined,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    onChecking: (state) => {
      state.status = AuthStatus.checking;
      state.user = undefined;
      state.errorMessage = undefined;
    },
    onLogin: (state, { payload }: PayloadAction<User>) => {
      state.status = AuthStatus.authenticated;
      state.user = { ...payload };
      state.errorMessage = undefined;
    },
    onLogout: (state, { payload }: PayloadAction<string | undefined>) => {
      state.status = AuthStatus.notAuthenticated;
      state.user = undefined;
      state.errorMessage = payload;
    },
    onClearError: (state) => {
      state.errorMessage = undefined;
    }
  }
});

export const { onChecking, onLogin, onLogout, onClearError } = authSlice.actions;