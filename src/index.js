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
import About from './pages/About';
import Films, { loader as filmsLoader } from './pages/Films/Films';
import FilmDetail from './pages/Films/FilmDetail';
import Account from "./pages/Account/Account";

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />}>

    <Route index element={<h1>Home</h1>} />
    <Route path="about" element={<About />} />

    <Route path="films" element={<Films />} loader={filmsLoader} />
    <Route path="films/:title" element={<FilmDetail />} />

    <Route path="account" element={<Account />}>
      <Route index element={<h1>favourite films go here</h1>} />
      <Route path="reviews" element={<h1>reviews go here</h1>} />
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