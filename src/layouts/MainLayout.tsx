import { Outlet } from "react-router-dom";

/**
 * Main layout component.
 *
 * Purpose:
 * - Provide a consistent layout for all main pages.
 * - Render nested routes via `<Outlet />`.
 */

export default function MainLayout() {
  return (
    <div className="flex h-screen auto-rows-auto flex-col">
      <Outlet />
    </div>
  );
}
