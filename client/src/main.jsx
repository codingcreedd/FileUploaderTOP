import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import ContextProvider from './components/ContextProvider.jsx';
import Log from './Routes/Log.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/signin" replace />, 
  },
  {
    path: '/:authType',
    element: <Log />
  },
  {
    path: '/home',
    element: <App />,
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  </StrictMode>,
);
