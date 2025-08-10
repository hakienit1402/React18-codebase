import { create } from "zustand";

/**
 * Auth domain global store (Zustand).
 *
 * Purpose:
 * - Hold cross-page authentication state and utilities.
 * - Keep mutations colocated with the auth domain.
 *
 * Usage:
 * ```ts
 * import { useAuthStore } from '@/domains/auth/store/authStore';
 * const reset = useAuthStore((s) => s.resetAuthStore);
 * reset();
 * ```
 *
 * Note:
 * - `resetAuthStore` should set state back to its initial shape when more fields are added.
 */

export type AuthStoreProps = {
  resetAuthStore: () => void;
};

export const useAuthStore = create<AuthStoreProps>((set) => ({
  resetAuthStore: () => set({}),
}));
