import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import ContextProvider from './components/ContextProvider.jsx';
import Log from './Routes/Log.jsx';
import Storage from './Routes/Storage.jsx'
import AddFolder from './components/AddFolder.jsx';
import FolderList from './components/FolderList.jsx';

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
    children: [
      {
        path: '',
        element: <Storage />,
        children: [
          {
            path:'add-folder',
            element: <AddFolder />
          },
          {
            path: '',
            element: <FolderList />
          }
        ]
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  </StrictMode>,
);
