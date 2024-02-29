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
import Films, { loader as filmsLoader } from './pages/Films/Films';
import FilmDetail from './pages/Films/FilmDetail';


const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<h1>Home</h1>} />
    <Route path="about" element={<h1>About</h1>} />
    <Route path="account" element={<h1>Account</h1>} />
    <Route path="films" element={<Films />} loader={filmsLoader} />
    <Route path="films/:title" element={<FilmDetail />} />
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