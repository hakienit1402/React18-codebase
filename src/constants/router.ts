/**
 * Centralized route path definitions and visibility.
 *
 * Usage:
 * - Define stable route paths in `ROUTES_PATH`.
 * - Add paths that do not require authentication to `PUBLIC_ROUTES`.
 * - Import where needed: `import { ROUTES_PATH, PUBLIC_ROUTES } from '@/constants/router';`
 *
 * Example:
 *
 * export const ROUTES_PATH = {
 *   LOGIN: '/login',
 *   DASHBOARD: '/dashboard',
 *   NOT_FOUND: '/404',
 * } as const;
 *
 * export const PUBLIC_ROUTES = [
 *   ROUTES_PATH.LOGIN,
 *   ROUTES_PATH.NOT_FOUND,
 * ];
 */
export const ROUTES_PATH = {
  ROOT: "/",
  LOGIN: "/login",
  NOT_AUTHORIZED: "/not-authorized",
} as const;

/**
 * List of public routes (no authentication required).
 * Keep values in sync with `ROUTES_PATH`.
 */
export const PUBLIC_ROUTES: string[] = [];
