import axios, { AxiosInstance } from "axios";

import { ROUTES_PATH } from "@/constants/router";
import { removeSecureCookie, setSecureCookie } from "@/utils/cookies";

/**
 * Runtime-injected API base URL from `deploy/env.template.js` → `window._env_`.
 * Falls back to empty string if not provided.
 */
export const VITE_API_URL = window._env_?.VITE_API_URL;

/**
 * Environment configuration for API client.
 */
export const ENV_API = {
  API_URL: VITE_API_URL || "",
  TIMEOUT: 20000,
  ACCESS_TOKEN_COOKIE_NAME: "pulsar_access_token",
  PUBLIC_ENDPOINT: [ROUTES_PATH.LOGIN],
};

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
export const createCancelToken = () => {
  const source = axios.CancelToken.source();
  return source;
};
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
