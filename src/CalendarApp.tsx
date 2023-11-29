import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"

import { store } from "./store"
import { AppRouter } from "./router"

export const CalendarApp = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>
  )
}
