/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError, AxiosInstance } from "axios";
import Cookies from "js-cookie";
import { z } from "zod";

import { ApiRequestConfig, Logger } from "./types";

import { ROUTES_PATH } from "@/constants/router";
import { AUTH_API_ENDPOINT } from "@/domains/auth/constants/authConstants";
import { parseErrorFromAPI } from "@/services/apis";
import { ApiClient } from "@/services/apis/apiClient";
import { clearAuthToken, ENV_API } from "@/services/apis/apiConfig";
import { logError } from "@/utils/logger";

/**
 * Extended Axios request config used internally to mark retried requests.
 */
export interface CustomAxiosRequestConfig extends ApiRequestConfig {
  _retry?: boolean;
}

/**
 * Attempt to refresh the access token using the existing cookie token.
 *
 * @returns new access token string when successful; otherwise null
 */
const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const accessToken = Cookies.get(ENV_API.ACCESS_TOKEN_COOKIE_NAME);
    const response = await ApiClient.put(AUTH_API_ENDPOINT.REFRESH_TOKEN, {
      token: accessToken,
    });

    const parsed = z.object({ token: z.string() }).parse(response);
    const newAccessToken = parsed.token;

    Cookies.set(ENV_API.ACCESS_TOKEN_COOKIE_NAME, newAccessToken);
    return newAccessToken;
  } catch (refreshError) {
    logError("Token refresh failed", refreshError, "AUTH");
    return null;
  }
};

/**
 * Single-flight flag to avoid multiple concurrent refresh requests.
 */
let isRefreshing = false;
/**
 * Queue of failed requests during an ongoing refresh, to be retried after a new token is obtained.
 */
let failedQueue: Array<{
  resolve: (value: unknown) => void;
  reject: (error: AxiosError) => void;
}> = [];

/**
 * Resolve or reject all queued requests depending on refresh outcome.
 */
const processQueue = (
  error: AxiosError | null,
  token: string | null = null,
) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });
  failedQueue = [];
};

/**
 * Attach request/response interceptors to an Axios instance.
 *
 * Behavior:
 * - Request: injects `Authorization: Bearer <token>` if cookie token exists.
 * - Response (success): returns `response.data` and bumps session timer for protected endpoints.
 * - Response (error):
 *   - On 401 for non-public endpoints: performs token refresh with single-flight and retries queued requests.
 *   - Otherwise: normalizes and rejects with parsed API error.
 */
export const setupInterceptors = (
  instance: AxiosInstance,
  logger: Logger,
): void => {
  instance.interceptors.request.use(
    // Request interceptor: attach Authorization header if access token exists
    (config) => {
      const accessToken = Cookies.get(ENV_API.ACCESS_TOKEN_COOKIE_NAME);
      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error: AxiosError) => {
      logger.error("Request Error:", error);
      return Promise.reject(parseErrorFromAPI(error));
    },
  );

  instance.interceptors.response.use(
    // Response success interceptor: unwrap data and bump session timer for protected endpoints
    (response) => {
      // Determine if the current endpoint is public (no session extension)
      const isPublic = ENV_API.PUBLIC_ENDPOINT.some((endpoint) =>
        (response?.config?.url || "").includes(endpoint),
      );

      const token = Cookies.get(ENV_API.ACCESS_TOKEN_COOKIE_NAME);
      const isAuthenticated = Cookies.get("isAuthenticated");

      if (!isPublic && token && isAuthenticated === "true") {
        // useSharedGlobal.getState().setTimeLimit();
      }

      return response.data;
    },
    // Response error interceptor: handle 401 by refreshing token (single-flight) and retry queued requests
    async (error: AxiosError) => {
      // Preserve original request to allow a single retry after refresh
      const originalRequest = error.config as CustomAxiosRequestConfig;
      const parsedError = parseErrorFromAPI(error);
      const statusCode = parsedError.status;
      // Do not attempt refresh for public endpoints
      const isPublic = ENV_API.PUBLIC_ENDPOINT.some((subStr) =>
        originalRequest?.url?.includes(subStr),
      );

      if (statusCode === 401 && !originalRequest._retry && !isPublic) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({
              resolve: (token: unknown) => {
                if (typeof token === "string") {
                  // Token is refreshed by another request; retry with updated Authorization header
                  originalRequest.headers = originalRequest.headers ?? {};
                  originalRequest.headers["Authorization"] = `Bearer ${token}`;
                  resolve(instance(originalRequest));
                }
              },
              reject,
            });
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const newToken = await refreshAccessToken();

          if (newToken) {
            processQueue(null, newToken);
            originalRequest.headers = originalRequest.headers ?? {};
            originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
            return instance(originalRequest);
          } else {
            processQueue(error, null);
            clearAuthToken();
            // Redirect user to NOT_AUTHORIZED when refresh fails (session expired/invalid)
            window.location.href = ROUTES_PATH.NOT_AUTHORIZED;
            return Promise.reject(parsedError);
          }
        } catch (refreshError) {
          if (refreshError instanceof AxiosError) {
            processQueue(refreshError, null);
            clearAuthToken();
            // Redirect on known Axios refresh error
            window.location.href = ROUTES_PATH.NOT_AUTHORIZED;
            return Promise.reject(parseErrorFromAPI(refreshError));
          } else {
            const fallbackError = new AxiosError(
              "Unknown error during token refresh",
            );
            processQueue(fallbackError, null);
            clearAuthToken();
            // Redirect on unknown refresh error
            window.location.href = ROUTES_PATH.NOT_AUTHORIZED;
            return Promise.reject(fallbackError);
          }
        } finally {
          isRefreshing = false;
        }
      }

      logger.error("Response Error:", error);
      return Promise.reject(parsedError);
    },
  );
};
