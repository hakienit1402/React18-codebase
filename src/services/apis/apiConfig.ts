import axios, { AxiosInstance } from "axios";

import { removeSecureCookie, setSecureCookie } from "@/utils/cookies";

/**
 * API base URL resolution order:
 * - Runtime via window._env_.VITE_API_URL (Docker/NGINX runtime injection)
 * - Build-time via import.meta.env.VITE_API_URL (Vite .env for local dev)
 * - Fallback empty string
 */
export const VITE_API_URL =
  (window as any)._env_?.VITE_API_URL ?? (import.meta as any).env?.VITE_API_URL ?? "";

/**
 * Environment configuration for API client.
 */
export const ENV_API = {
  API_URL: VITE_API_URL || "",
  TIMEOUT: 20000,
  ACCESS_TOKEN_COOKIE_NAME: "pulsar_access_token",
};

/**
 * List of public API endpoint substrings. Used by interceptors to skip refresh/session logic.
 */
export const PUBLIC_API_ENDPOINTS = ["/api/v1/auth", "/api/v1/auth/refresh"] as const;

/**
 * Creates and configures the Axios instance.
 *
 * Defaults:
 * - `baseURL` from ENV_API.API_URL
 * - JSON headers
 * - 20s timeout
 * - withCredentials enabled
 */
export const createApiInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: ENV_API.API_URL,
    timeout: ENV_API.TIMEOUT,
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
    withCredentials: true,
  });

  return instance;
};

/**
 * Creates a cancel token source for cancelable requests.
 */
// Deprecated: axios CancelToken. Use AbortController instead.
/**
 * Clears authentication cookies (access token, isAuthenticated flag).
 */

export const clearAuthToken = (): void => {
  removeSecureCookie(ENV_API.ACCESS_TOKEN_COOKIE_NAME);
  removeSecureCookie("isAuthenticated");
};

/**
 * Sets the access token in a secure cookie.
 */
export const setAuthTokenToCookie = (accessToken: string): void => {
  setSecureCookie(ENV_API.ACCESS_TOKEN_COOKIE_NAME, accessToken);
};

/**
 * Sets the authentication status in a secure cookie.
 * Example: `setIsAuthenticatedToCookie(true)`
 */
export const setIsAuthenticatedToCookie = (isAuthenticated: boolean): void => {
  setSecureCookie("isAuthenticated", isAuthenticated.toString());
};
