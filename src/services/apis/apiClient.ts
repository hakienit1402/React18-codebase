import { AxiosError } from "axios";

import { apiInstance, ApiRequestConfig } from "@/services/apis";
import { logError } from "@/utils/logger";

/**
 * Thin wrapper around Axios instance with typed helpers and centralized error handling.
 *
 * Usage:
 * ```ts
 * import { ApiClient } from '@/services/apis/apiClient';
 * const res = await ApiClient.get<User>('/api/v1/users/123');
 * ```
 */
export class ApiClient {
  /**
   * Normalize and rethrow errors, logging Axios errors with context.
   *
   * @throws always rethrows the original error
   */
  private static handleError(error: unknown): never {
    if (error instanceof AxiosError) {
      logError("API Request failed", error, "API_CLIENT");
    }
    throw error;
  }

  /**
   * Perform a GET request.
   */
  static async get<T>(url: string, config: ApiRequestConfig = {}) {
    try {
      return await apiInstance.get<T>(url, config);
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Perform a POST request.
   */
  static async post<T>(url: string, body: unknown, config: ApiRequestConfig = {}) {
    try {
      return await apiInstance.post<T>(url, body, config);
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Perform a PUT request.
   */
  static async put<T>(url: string, body?: unknown, config: ApiRequestConfig = {}) {
    try {
      return await apiInstance.put<T>(url, body, config);
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Perform a PATCH request.
   */
  static async patch<T>(url: string, body: unknown, config: ApiRequestConfig = {}) {
    try {
      return await apiInstance.patch<T>(url, body, config);
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Perform a DELETE request.
   */
  static async delete<T>(url: string, config: ApiRequestConfig = {}) {
    try {
      return await apiInstance.delete<T>(url, config);
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Create a cancel token source for cancelable requests.
   */
  static createCancelableRequest() {
    return new AbortController();
  }
}

export const apiClient: ApiClient = new ApiClient();
