/**
 * Endpoints for authentication-related API requests.
 * - LOGIN: Authenticate user with credentials to receive tokens
 * - REFRESH_TOKEN: Refresh access token using a valid refresh token
 */
export const AUTH_API_ENDPOINT = {
  LOGIN: "/api/v1/auth",
  REFRESH_TOKEN: "/api/v1/auth/refresh",
};

/**
 * React Query keys used for caching and invalidating auth queries/mutations.
 * Keep in sync with usages in `auth/services/api.ts` and related hooks.
 */
export const AUTH_QUERY_KEYS = {
  LOGIN: "login",
  REFRESH_TOKEN: "refresh-token",
};
