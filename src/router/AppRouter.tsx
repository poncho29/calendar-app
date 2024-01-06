import { Navigate, Route, Routes } from "react-router-dom"

import { LoginPage } from "../auth"
import { CalendarPage } from "../calendar"
import { AuthStatus } from "../interfaces"

export const AppRouter = () => {
  const authStatus: string = AuthStatus.notAuthenticated;

  return (
    <Routes>
      {
        authStatus === AuthStatus.notAuthenticated
          ? <Route path='/auth/*' element={<LoginPage />} />
          : <Route path='/*' element={<CalendarPage />} />
      }

      <Route path='/*' element={<Navigate to='/auth/login' />} />
    </Routes>
  )
}
