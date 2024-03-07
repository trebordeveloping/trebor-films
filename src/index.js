import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import './index.css';

import Layout from "./components/Layout";
import Home, { action as homeAction} from "./pages/Home";
import About from './pages/About';
import Films, { loader as filmsLoader } from './pages/Films/Films';
import FilmDetail, { loader as filmDetailLoader } from './pages/Films/FilmDetail';
import Account, { loader as accountLoader } from "./pages/Account/Account";
import Favourites, { loader as favouritesLoader } from './pages/Account/Favourites';
import Reviews, { loader as reviewsLoader } from './pages/Account/Reviews';
import Profile, { loader as profileLoader } from './pages/Account/Profile';
import Login, { loader as loginLoader, action as loginAction } from './pages/Login/Login';
import Register from './pages/Login/Register';
import Error from './components/Error';
import { AuthProvider } from './contexts/AuthContext';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />}>

    <Route index element={<Home />} action={homeAction} />
    <Route path="about" element={<About />} />

    <Route
      path="films"
      element={<Films />}
      loader={filmsLoader}
      errorElement={<Error />}
    />
    <Route
      path="films/:id"
      element={<FilmDetail />}
      loader={filmDetailLoader}
      errorElement={<Error />}
    />

    <Route
      path="login" element={<Login />}
      loader={loginLoader} action={loginAction}
    />
    <Route path="register" element={<Register />} />

    <Route path="account" element={<Account />} loader={accountLoader}>
      <Route index element={<Favourites />} loader={favouritesLoader} />
      <Route path="reviews" element={<Reviews />} loader={reviewsLoader} />
      <Route path="profile" element={<Profile />} loader={profileLoader} />
    </Route>

  </Route>
))

function App() {
  return (
    <RouterProvider router={router} />
  )
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);