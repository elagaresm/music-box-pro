import './assets/main.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App, { loader as appLoader } from './App'
import {
  createHashRouter,
  RouterProvider
} from "react-router-dom"
import Main from './components/Main'
import ErrorPage from './components/ErrorPage'
import Artist, { loader as artistLoader } from './components/Artist'

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    loader: appLoader,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Main />, loader: appLoader },
      { path: "artist/:artistName", element: <Artist />, loader: artistLoader },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
