import { AuthApiService } from "@/domains/auth/services/api";

export type UseAuthReturn = {
  AuthInstance: AuthApiService;
};

/**
 * Auth hook that exposes a singleton `AuthApiService` instance.
 *
 * Purpose:
 * - Provide a stable, memo-less access point to auth API methods.
 *
 * Returns:
 * - AuthInstance: the singleton `AuthApiService` with methods like `login`, `verifyTwoFA`, etc.
 *
 * Example:
 * const { AuthInstance } = useAuth();
 * await AuthInstance.login({ username, password });
 */
export const useAuth = (): UseAuthReturn => {
  const AuthInstance = AuthApiService.getInstance();

  return {
    AuthInstance,
  };
};
