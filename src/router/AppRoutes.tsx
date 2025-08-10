import { lazy } from "react";
import { useRoutes } from "react-router-dom";

import AuthRoutes from "@/domains/auth/router/AuthRoutes";
import GuestGuard from "@/guards/GuestGuard";
import AuthLayout from "@/layouts/AuthLayout";

const ErrorPageWrapper = lazy(() => import("@/components/Layouts/Error"));
const AuthGuard = lazy(() => import("@/guards/AuthGuard"));
const MainLayout = lazy(() => import("@/layouts/MainLayout"));

const NoInternetPage = lazy(() => import("@/pages/NoInternetPage"));

/**
 * Application route configuration.
 *
 * Structure:
 * - Public/system pages (404, 401, network errors, logout flows)
 * - Authenticated area wrapped by `AuthGuard` + `MainLayout` and gated by `ProtectedGuard` per module
 * - Guest area wrapped by `GuestGuard` + `AuthLayout` for auth flows (login/forgot, etc.)
 *
 * Notes:
 * - Child routes are provided by domain route factories for better modularity.
 * - All lazily imported pages should be wrapped by a Suspense boundary at a higher level.
 */
const AppRoutes = () => {
  const routes = [
    {
      path: "*",
      element: <ErrorPageWrapper errorType="404" />,
    },
    {
      path: "/no-internet",
      element: <NoInternetPage />,
    },
    {
      path: "/",
      element: (
        <AuthGuard>
          <MainLayout />
        </AuthGuard>
      ),
      children: [
        // {
        //   element: <ProtectedGuard module={PermissionType.USER_MANAGEMENT} />,
        //   children: [...UserRoutes()],
        // },
      ],
    },
    {
      path: "/",
      element: (
        <GuestGuard>
          <AuthLayout />
        </GuestGuard>
      ),
      children: [...AuthRoutes()],
    },
  ];

  const content = useRoutes(routes);
  return content;
};

export default AppRoutes;
