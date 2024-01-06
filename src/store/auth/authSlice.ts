import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { AuthState, AuthStatus } from '../../interfaces';

const InitialUser: Record<string, unknown> = {};

const initialState: AuthState = {
  status: AuthStatus.checking,
  user: InitialUser,
  errorMessage: undefined,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    checking: (state) => {
      state.status = AuthStatus.checking;
      state.user = {};
      state.errorMessage = undefined;
    },
    onLogin: (state, { payload }: PayloadAction<Record<string, unknown>>) => {
      state.status = AuthStatus.authenticated;
      state.user = payload;
      state.errorMessage = undefined;
    }
  }
});

export const { checking } = authSlice.actions;