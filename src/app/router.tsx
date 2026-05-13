import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { AppLayout } from '@/components/layout/app-layout';
import { AuthLayout } from '@/components/layout/auth-layout';
import { ProtectedRoute } from '@/components/layout/protected-route';
import { GuestRoute } from '@/components/layout/guest-route';
import { ROUTES } from '@/config/routes';

const router = createBrowserRouter([
  {
    element: <GuestRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: ROUTES.LOGIN,
            lazy: async () => ({ Component: (await import('@/pages/login-page')).default }),
          },
          {
            path: ROUTES.REGISTER,
            lazy: async () => ({ Component: (await import('@/pages/register-page')).default }),
          },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: ROUTES.HOME, element: <Navigate to={ROUTES.DASHBOARD} replace /> },
          {
            path: ROUTES.DASHBOARD,
            lazy: async () => ({ Component: (await import('@/pages/dashboard-page')).default }),
          },
          {
            path: ROUTES.PROFILE,
            lazy: async () => ({ Component: (await import('@/pages/profile-page')).default }),
          },
          {
            path: ROUTES.SETTINGS,
            lazy: async () => ({ Component: (await import('@/pages/settings-page')).default }),
          },
        ],
      },
    ],
  },
  {
    path: ROUTES.NOT_FOUND,
    lazy: async () => ({ Component: (await import('@/pages/not-found-page')).default }),
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
