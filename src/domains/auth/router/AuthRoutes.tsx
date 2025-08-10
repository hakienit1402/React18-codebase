/**
 * Auth domain route configuration factory.
 *
 * Purpose:
 * - Provide route objects for the auth feature to be consumed by the app router.
 * - Use lazy-loaded pages for better bundle-splitting.
 *
 * Usage:
 * ```tsx
 * import AuthRoutes from '@/domains/auth/router/AuthRoutes';
 * const routes = [
 *   ...AuthRoutes(),
 * ];
 * ```
 *
 * Example route:
 * ```tsx
 * { path: ROUTES_PATH.LOGIN, element: <LoginPage /> }
 * ```
 */
const AuthRoutes = () => [
  // { path: ROUTES_PATH.LOGIN, element: <LoginPage /> },
];

export default AuthRoutes;
