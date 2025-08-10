/**
 * Application error codes and their semantics.
 *
 * Purpose:
 * - Provide a single source of truth for mapping backend error codes to UI behavior/messages.
 * - Keep codes stable and descriptive. Avoid duplicating literals throughout the codebase.
 *
 * Usage:
 * - Import the constant map and compare with API responses.
 * - Example: `if (error.code === ERROR_CODES.AUTH.INVALID_CREDENTIALS) { ... }`
 *
 * Example structure:
 *
 * export const ERROR_CODES = {
 *   AUTH: {
 *     INVALID_CREDENTIALS: 'AUTH_001',
 *     TOKEN_EXPIRED: 'AUTH_002',
 *   },
 *   COMMON: {
 *     UNKNOWN: 'COMMON_000',
 *   },
 * } as const;
 */
export const ERROR_CODES = {} as const;
