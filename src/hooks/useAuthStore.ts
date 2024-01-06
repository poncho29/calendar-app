import calendarApi from "../api/calendarApi";

import { useAppDispatch, useAppSelector } from "."

type LoginParams = { email: string, password: string }

export const useAuthStore = () => {
  const dispatch = useAppDispatch();
  const { status, user, errorMessage } = useAppSelector(state => state.auth);

  const startLogin = async (credentials: LoginParams) => {
    try {
      const resp = await calendarApi.post('/auth', credentials)
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  }

  return {
    user,
    status,
    errorMessage,
    startLogin
  }
}