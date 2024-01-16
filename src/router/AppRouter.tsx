import { useEffect } from "react"
import { Navigate, Route, Routes } from "react-router-dom"

import { CalendarPage } from "../calendar"

import { LoginPage } from "../auth"

import { useAuthStore } from "../hooks"

import { AuthStatus } from "../interfaces"

export const AppRouter = () => {
  const { status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (status === AuthStatus.checking) {
    return <h3>Cargando...</h3>
  }

  return (
    <Routes>
      {
        status === AuthStatus.notAuthenticated
          ? (
            <>
              <Route path='/auth/*' element={<LoginPage />} />
              <Route path='/*' element={<Navigate to='/auth/login' />} />
            </>
          )
          : (
            <>
              <Route path='/' element={<CalendarPage />} />
              <Route path='/*' element={<Navigate to='/' />} />
            </>
          )
      }
    </Routes>
  )
}
