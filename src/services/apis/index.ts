/* eslint-disable no-console */
import { AxiosError } from "axios";

import {
  clearAuthToken,
  createApiInstance,
  createCancelToken,
  setAuthTokenToCookie,
} from "@/services/apis/apiConfig";
import { setupInterceptors } from "@/services/apis/interceptors";
import {
  APIError,
  APIErrorDataErrorProps,
  Logger,
} from "@/services/apis/types";

export * from "./types";

// Create console logger (replace with your preferred logging solution)
const logger: Logger = {
  info: (message: string, meta?: Record<string, unknown>) =>
    console.info(message, meta),
  error: (message: string, error?: Error, meta?: Record<string, unknown>) =>
    console.error(message, error, meta),
  warn: (message: string, meta?: Record<string, unknown>) =>
    console.warn(message, meta),
  debug: (message: string, meta?: Record<string, unknown>) =>
    console.debug(message, meta),
};

/**
 * Parses an Axios error object and extracts relevant error details.
 *
 * @param error - The Axios error object to parse.
 * @returns An object containing the error code, message, status, and response data.
 */
export const parseErrorFromAPI = (error: AxiosError): APIError => {
  return {
    code: error.code || "INTERNAL_ERROR",
    message: error.message ?? "Unknown error",
    status: error.response?.status || 500,
    data: error.response?.data as APIErrorDataErrorProps,
  };
};

// Create and configure API instance
const apiInstance = createApiInstance();
setupInterceptors(apiInstance, logger);

export { apiInstance, clearAuthToken, createCancelToken, setAuthTokenToCookie };
