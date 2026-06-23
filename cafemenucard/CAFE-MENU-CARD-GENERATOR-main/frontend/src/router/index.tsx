import { createHashRouter, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import AppShell from '../components/layout/AppShell';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Menu from '../pages/Menu';
import Settings from '../pages/Settings';
import Templates from '../pages/Templates';

export const router = createHashRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <AppShell />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '/',
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/menu',
        element: <Menu />,
      },
      {
        path: '/templates',
        element: <Templates />,
      },
      {
        path: '/settings',
        element: <Settings />,
      },
    ],
  },
]);
