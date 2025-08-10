/**
 * Global constants module
 *
 * Purpose:
 * - Define application-wide constants that are not tied to a specific domain.
 * - Keep this file small and focused. Domain-specific constants belong in their domain folders
 *   (e.g., `src/domains/auth/constants/authConstants.ts`).
 *
 * Naming conventions:
 * - Use UPPER_SNAKE_CASE for primitive constants.
 * - Group related keys in an object whose keys are also UPPER_SNAKE_CASE, and mark it `as const`.
 *
 * How to add a new constant:
 * - Add the constant here following the conventions below.
 * - Import where needed: `import { DEFAULT_PAGE_SIZE, STORAGE_KEYS } from '@/constants/global';`
 *
 * Examples:
 *
 * export const DEFAULT_PAGE_SIZE = 20;
 *
 * export const STORAGE_KEYS = {
 *   THEME: 'theme',
 *   NETWORK_MODE: 'network-mode',
 * } as const;
 *
 * // Usage:
 * // localStorage.setItem(STORAGE_KEYS.THEME, 'dark');
 * // const pageSize = DEFAULT_PAGE_SIZE;
 */

// Convert this file into a module even when it only contains docs for now.
export {};
