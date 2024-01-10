import calendarApi from "../api/calendarApi";

import { useAppDispatch, useAppSelector } from ".";

import { onChecking, onClearError, onLogin, onLogout } from "../store";

type LoginParams = { email: string, password: string }

export const useAuthStore = () => {
  const dispatch = useAppDispatch();
  const { status, user, errorMessage } = useAppSelector(state => state.auth);

  const startLogin = async (credentials: LoginParams) => {
    dispatch(onChecking());
    try {
      const { data } = await calendarApi.post('/auth', credentials)
      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime().toString());
      dispatch(onLogin(data.user));
    } catch (error) {
      dispatch(onLogout('Credenciales incorrectas'));
      setTimeout(() => {
        dispatch(onClearError());
      }, 10);
    }
  }

  return {
    user,
    status,
    errorMessage,
    startLogin
  }
}