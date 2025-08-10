import { Outlet } from "react-router-dom";

/**
 * Route guard for authenticated sections.
 *
 * Purpose:
 * - Wrap protected routes and render nested routes via `<Outlet />` when no `children` provided.
 * - If `children` is passed, render it directly so consumers can compose custom layouts.
 */

const AuthGuard = ({ children }: React.PropsWithChildren) => {
  return children || <Outlet />;
};

export default AuthGuard;
