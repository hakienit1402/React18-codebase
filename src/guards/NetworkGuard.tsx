import { lazy } from "react";
import { Detector } from "react-detect-offline";

/**
 * Network guard to check if the user is connected to the internet.
 *
 * Purpose:
 * - Prevent access to pages when offline.
 * - Render a fallback component when offline.
 */

const NoInternetPage = lazy(() => import("@/pages/NoInternetPage"));

const NetworkGuard = ({ children }: React.PropsWithChildren) => {
  return (
    <Detector
      polling={{ enabled: false, interval: 1000, url: "", timeout: 5000 }}
      render={({ online }) => (online ? <>{children}</> : <NoInternetPage />)}
    />
  );
};

export default NetworkGuard;
