/**
 * Global React Query keys registry.
 *
 * Usage:
 * - Keep query keys centralized to avoid typos and enable refactors.
 * - Names should be stable and descriptive. Group by feature where applicable.
 * - Import: `import { QUERY_KEYS } from '@/constants/query-keys';`
 *
 * Example:
 *
 * export const QUERY_KEYS = {
 *   AUTH: {
 *     LOGIN: 'login',
 *     REFRESH_TOKEN: 'refresh-token',
 *   },
 *   USERS: {
 *     LIST: 'users-list',
 *     DETAILS: (id: string) => ['user-details', id] as const,
 *   },
 * } as const;
 */
export const QUERY_KEYS = {} as const;
