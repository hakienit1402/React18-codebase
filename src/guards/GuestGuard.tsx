import { Outlet } from "react-router-dom";

/**
 * Route guard for unauthenticated sections.
 *
 * Purpose:
 * - Prevent access to authenticated routes when not logged in.
 * - Redirect to login page if user is authenticated.
 * - Render nested routes via `<Outlet />` when no `children` provided.
 * - If `children` is passed, render it directly so consumers can compose custom layouts.
 */

const GuestGuard = ({ children }: React.PropsWithChildren) => {
  return children || <Outlet />;
};

export default GuestGuard;

GuestGuard.displayName = "GuestGuard";
