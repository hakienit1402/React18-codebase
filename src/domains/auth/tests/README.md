Auth domain tests

Purpose:

- House unit/integration tests for the Auth domain (hooks, services, pages, containers, routes).

How to run tests:

- All tests: `npm run test`
- Coverage: `npm run test:coverage`
- UI mode: `npm run test:ui`

Test utilities available:

- `createTestQueryClient`, `TestWrapper`, `setupUserEvent` from `src/test/Common.tsx`
- Global setup/mocks in `src/test/setup.ts` (jsdom, jest-dom, react-query/useMutation mock, router mocks)

Conventions:

- File names: `*.test.ts` or `*.test.tsx`
- Collocate under the feature domain folder (`src/domains/auth/tests`)
- Prefer testing behavior over implementation details

Samples included:

- `AuthApiService.test.ts` — singleton behavior
- `AuthRoutes.test.tsx` — route factory returns an array
- `useAuth.test.ts` — hook returns `AuthInstance` from service
