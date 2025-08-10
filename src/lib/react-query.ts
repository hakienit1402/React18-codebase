import { QueryClient } from "@tanstack/react-query";
import { ZodError } from "zod";

// Note: toast and notification enums are intentionally not imported here to keep this module decoupled.
import { APIError } from "@/services/apis/types";
import { logError } from "@/utils/logger";

/**
 * Extracts human-readable messages from a ZodError.
 *
 * @param error - Zod validation error instance
 * @returns List of messages in the format `path: message`
 */
export function getZodErrors(error: ZodError): string[] {
  return error.errors.map((err) => {
    const fieldPath = err.path.join(".");
    return `${fieldPath}: ${err.message}`;
  });
}

/**
 * Shared React Query client with sensible defaults.
 *
 * Defaults:
 * - queries.refetchOnWindowFocus: false (avoid unexpected background fetches)
 * - queries.retry: 0 (do not auto-retry by default)
 * - queries.throwOnError: log Zod errors; return false to prevent throwing
 * - mutations.retry: false
 *
 * Zod error handling:
 * - Logs the error
 * - Extracts messages and displays via toast
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
      // staleTime: 5 * 60 * 1000, // 5 minutes
      throwOnError: (error) => {
        if (error instanceof ZodError) {
          logError("ZodError: ", error, "REACT_QUERY");
          const messages = getZodErrors(error);
          messages.forEach((msg) => {
            // Replace with your app's notification system if available
            console.error(`Zod Error: ${msg}`);
          });
          return false;
        }
        return false;
      },
    },
    mutations: {
      retry: false,
    },
  },
});

// Type augmentation for React Query
/**
 * Augment React Query's default error type to `APIError`.
 * Ensures type-safe error handling across `useQuery`/`useMutation` hooks.
 */
declare module "@tanstack/react-query" {
  interface Register {
    defaultError: APIError;
  }
}
