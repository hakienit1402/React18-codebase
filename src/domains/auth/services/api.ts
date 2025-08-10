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

  /**
   * REST login using username/password
   */
  public async login<TPayload extends { username: string; password: string }>(
    payload: TPayload,
  ): Promise<{ token: string }>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  {
    const { ApiClient } = await import("@/services/apis/apiClient");
    const { AUTH_API_ENDPOINT } = await import("../constants/authConstants");
    return ApiClient.post<{ token: string }>(AUTH_API_ENDPOINT.LOGIN, payload).then((r) => r.data);
  }

  /**
   * Refresh token
   */
  public async refresh(token: string): Promise<{ token: string }> {
    const { ApiClient } = await import("@/services/apis/apiClient");
    const { AUTH_API_ENDPOINT } = await import("../constants/authConstants");
    return ApiClient.put<{ token: string }>(AUTH_API_ENDPOINT.REFRESH_TOKEN, { token }).then(
      (r) => r.data,
    );
  }

  /**
   * Begin OIDC login (placeholder)
   */
  public async beginOidcLogin(): Promise<void> {
    // Implement with chosen OIDC library (e.g., oidc-client-ts) using OIDC_CONFIG
    window.location.href = "/oauth2/authorization";
  }

  /**
   * Complete OIDC callback (placeholder)
   */
  public async completeOidcCallback(): Promise<void> {
    // Exchange authorization code for tokens and set cookie
  }
}
