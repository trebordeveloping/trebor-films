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
import Home from "./pages/Home";
import About from './pages/About';
import Films, { loader as filmsLoader } from './pages/Films/Films';
import FilmDetail from './pages/Films/FilmDetail';
import Account from "./pages/Account/Account";
import Favourites, { loader as favouritesLoader } from './pages/Account/Favourites';
import Reviews, { loader as reviewsLoader } from './pages/Account/Reviews';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />}>

    <Route index element={<Home />} />
    <Route path="about" element={<About />} />

    <Route path="films" element={<Films />} loader={filmsLoader} />
    <Route path="films/:title" element={<FilmDetail />} />

    <Route path="account" element={<Account />}>
      <Route index element={<Favourites />} loader={favouritesLoader} />
      <Route path="reviews" element={<Reviews />} loader={reviewsLoader} />
      <Route path="profile" element={<h1>profile info goes here</h1>} />
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
    <App />
  </React.StrictMode>
);