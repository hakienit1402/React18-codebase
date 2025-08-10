/**
 * Authentication API service (singleton).
 *
 * Purpose:
 * - Centralize all authentication-related HTTP calls.
 * - Expose a single instance via `getInstance()` to avoid redundant setup.
 *
 * Usage:
 * ```ts
 * import { AuthApiService } from '@/domains/auth/services/api';
 * const auth = AuthApiService.getInstance();
 * // await auth.login(payload)
 * ```
 */
export class AuthApiService {
  private static instance: AuthApiService;

  private constructor() {}

  /**
   * Returns the shared `AuthApiService` instance.
   */
  public static getInstance(): AuthApiService {
    if (!AuthApiService.instance) {
      AuthApiService.instance = new AuthApiService();
    }
    return AuthApiService.instance;
  }
}
