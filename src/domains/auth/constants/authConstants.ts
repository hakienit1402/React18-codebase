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

/**
 * OIDC/OAuth2 pluggable config (Keycloak/Okta/etc.).
 * Values can be provided via Vite (.env) or runtime window._env_.
 */
export const OIDC_CONFIG = {
  authority:
    (import.meta as any).env?.VITE_OIDC_AUTHORITY ?? (window as any)._env_?.VITE_OIDC_AUTHORITY ?? "",
  clientId:
    (import.meta as any).env?.VITE_OIDC_CLIENT_ID ?? (window as any)._env_?.VITE_OIDC_CLIENT_ID ?? "",
  redirectUri:
    (import.meta as any).env?.VITE_OIDC_REDIRECT_URI ??
    (window as any)._env_?.VITE_OIDC_REDIRECT_URI ??
    window.location.origin,
  scope:
    (import.meta as any).env?.VITE_OIDC_SCOPE ?? (window as any)._env_?.VITE_OIDC_SCOPE ??
    "openid profile email",
} as const;
