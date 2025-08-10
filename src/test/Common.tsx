import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import userEvent from "@testing-library/user-event";
import { ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";

// Create a new QueryClient for testing
export const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

// Setup userEvent for testing
export const setupUserEvent = () => userEvent.setup();

// TestWrapper component providing necessary context
interface TestWrapperProps {
  children: ReactNode;
  queryClient: QueryClient;
}

export const TestWrapper = ({ children, queryClient }: TestWrapperProps) => (
  <QueryClientProvider client={queryClient}>
    <MemoryRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      {children}
    </MemoryRouter>
  </QueryClientProvider>
);
