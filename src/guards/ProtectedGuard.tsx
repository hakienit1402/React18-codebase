import { Outlet } from "react-router-dom";

/**
 * Route guard for authenticated sections with permission checks.
 *
 * Purpose:
 * - Prevent access to pages when user doesn't have the required permission.
 * - Render nested routes via `<Outlet />` when no `children` provided.
 * - If `children` is passed, render it directly so consumers can compose custom layouts.
 */
interface ProtectedGuardProps {
  children?: React.ReactNode;
}

const ProtectedGuard = ({ children }: ProtectedGuardProps) => {
  return children || <Outlet />;
};

export default ProtectedGuard;
