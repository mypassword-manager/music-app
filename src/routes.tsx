import { RouteObject } from 'react-router';
import HomePage from './pages';
import SignInPage from './pages/auth/SignInPage';
import SignUpPage from './pages/auth/SignUpPage';
import DashboardPage from './pages/dashboard';
import DashboardCategoryPage from './pages/dashboard/CategoryPage';
import { ProtectedRoute } from './lib/auth/auth-client';
import NotFoundPage from './pages/_404';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/signin',
    element: <SignInPage />,
  },
  {
    path: '/signup',
    element: <SignUpPage />,
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/dashboard/:category',
    element: (
      <ProtectedRoute>
        <DashboardCategoryPage />
      </ProtectedRoute>
    ),
  },
  {
    id: 'airo-not-found',
    path: '*',
    element: <NotFoundPage />,
  },
];

export type Path = '/' | '/signin' | '/signup' | '/dashboard' | '/dashboard/:category';
export type Params = Record<string, string | undefined>;
