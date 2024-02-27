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

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<h1>Home</h1>} />
    <Route path="films" element={<h1>Films</h1>} />
    <Route path="about" element={<h1>About</h1>} />
    <Route path="account" element={<h1>Account</h1>} />
  </Route>
))

function App() {
  return (
    <RouterProvider router={router} />
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "home",
        element: <App />,
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);