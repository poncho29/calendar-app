import calendarApi from "../api/calendarApi";

import { useAppDispatch, useAppSelector } from ".";

import { onChecking, onClearError, onLogin, onLogout } from "../store";

type LoginParams = {
  email: string,
  password: string
}

type RegisterUser = {
  name: string;
  email: string;
  password: string;
}

export const useAuthStore = () => {
  const dispatch = useAppDispatch();
  const { status, user, errorMessage } = useAppSelector(state => state.auth);

  const startLogin = async (credentials: LoginParams) => {
    dispatch(onChecking());
    try {
      const { data } = await calendarApi.post('/auth', credentials);

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

  const startRegister = async (body: RegisterUser) => {
    dispatch(onChecking());
    try {
      const { data } = await calendarApi.post('/auth/register', body);

      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime().toString());

      dispatch(onLogin(data.user));
    } catch (error: any) {
      const errorMsg = error.response?.data?.msg || 'Error durante el registro';
      dispatch(onLogout(errorMsg));

      setTimeout(() => {
        dispatch(onClearError());
      }, 10);
    }
  }

  const checkAuthToken = async() => {
    const token = localStorage.getItem('token');

    if (!token) return dispatch(onLogout());

    try {
      const { data } = await calendarApi.get('/auth/renew');

      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime().toString());

      dispatch(onLogin(data.user));
    } catch (error) {
      localStorage.clear();
      dispatch(onLogout());
    }
  }

  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogout());
  }

  return {
    user,
    status,
    errorMessage,
    startLogin,
    startLogout,
    startRegister,
    checkAuthToken
  }
}