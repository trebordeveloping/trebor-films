import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import './index.css';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<h1>hi</h1>} />
))

function App() {
  return (
    <RouterProvider router={router} />
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);