/**
 * Auth containers barrel.
 *
 * Purpose:
 * - Centralize exports for smart/connected components within the Auth domain.
 * - Enable concise imports: `import { AuthContainer } from '@/domains/auth/containers';`
 *
 * How to add a new container:
 * 1. Create a file in this folder, e.g. `AuthContainer.tsx`.
 * 2. Re-export it here:
 *    `export { AuthContainer } from './AuthContainer';`
 *
 * Guidelines:
 * - Keep containers focused on orchestration (data fetching, wiring).
 * - Delegate UI to presentational components in `src/components` or domain components.
 */

// Make this a module even if no exports yet.
export {};
