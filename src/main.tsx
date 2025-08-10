import { QueryClientProvider } from "@tanstack/react-query";
import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "./App";

import "./styles/index.css";

import { Toaster } from "@/components/Toaster";
import "./i18n";
import { ROUTES_PATH } from "@/constants/router";
import NetworkGuard from "@/guards/NetworkGuard";
import { queryClient } from "@/lib/react-query";
import ErrorFallback from "@/pages/ErrorFallback";
import LoadingFullPage from "@/pages/LoadingFullPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.replace(ROUTES_PATH.ROOT)}
    >
      <QueryClientProvider client={queryClient}>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <NetworkGuard>
            <Suspense fallback={<LoadingFullPage />}>
              <Routes>
                <Route path="/*" element={<App />} />
              </Routes>
              <Toaster />
            </Suspense>
          </NetworkGuard>
        </BrowserRouter>
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>,
);
