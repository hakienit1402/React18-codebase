import { Outlet } from "react-router-dom";

/**
 * Auth layout component.
 *
 * Purpose:
 * - Provide a consistent layout for all auth pages.
 * - Render nested routes via `<Outlet />`.
 */

const AuthLayout = () => {
  return (
    <div className="flex h-screen auto-rows-auto flex-col">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
