## React 18 + TypeScript + Vite Starter

Clean, production-minded starter with DDD-inspired structure, modern UI primitives, testing, Storybook, and a Docker image that injects runtime envs.

## Table of Contents

1. [Architecture](#architecture)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Runtime Configuration](#runtime-configuration)
5. [Getting Started](#getting-started)
6. [Available Scripts](#available-scripts)
7. [Testing & Storybook](#testing--storybook)
8. [Docker](#docker)
9. [Development Workflow](#development-workflow)
10. [Coding Convention](#coding-convention)
11. [Project Configuration](#project-configuration)
12. [Contributing](#contributing)

## Features

- DDD-inspired structure (`domains/*` for features, `components/*` for shared UI)
- React Router 6, React Query 5, Zustand 5
- Axios with interceptors (token header, single-flight 401 refresh)
- shadcn/Radix UI components, Tailwind CSS
- Storybook (docs + a11y) with extensive component stories
- Testing: Vitest + Testing Library; Cypress ready
- i18n: react-i18next + language detector
- Feature flags: simple provider (`FF_*`/`VITE_FF_*`) with `<FlagGate />`
- Docker + NGINX serving SPA with runtime `VITE_*` env injection

## Technology Stack

### Core

- React 18.3.x, TypeScript ~5.6, Vite ^6
- React Router 6.28
- @tanstack/react-query ^5.62
- react-hook-form ^7.54 + zod ^3.24
- Zustand ^5

### UI & Styling

- Tailwind CSS ^3.4
- Radix UI primitives, shadcn/ui patterns
- Sonner (toasts), Vaul (drawers), Framer Motion ^11
- React Dropzone, React Select, Mantine Dates

### Quality

- ESLint + Prettier (+ Tailwind + import sorting plugins)
- Husky + Commitlint + Commitizen

### Testing

- Vitest ^3, @testing-library/react 16, jest-dom 6, user-event 14
- Cypress ^13 (e2e)

## Project Structure

```
src/
├── assets/
├── components/            # Shared UI building blocks
├── constants/
├── domains/               # Feature domains (e.g., auth)
│   └── auth/
│       ├── constants/
│       ├── containers/
│       ├── hooks/
│       ├── pages/
│       ├── router/
│       ├── services/
│       ├── store/
│       └── types/
├── guards/
├── hooks/
├── layouts/
├── lib/                   # App-level libs (e.g., react-query)
├── pages/
├── router/
├── services/              # Shared API + WS services
├── stores/
├── styles/
├── themes/
├── types/
└── utils/
```

## Runtime Configuration

Two options:

1. Local dev via `.env.local` (build-time):

```
VITE_APP_ENV=local
VITE_API_URL=http://localhost:3001/api
VITE_WS_URL=ws://localhost:3001/ws
```

2. Docker runtime — set `-e VITE_*` on `docker run`. The entrypoint writes `/env.js` → `window._env_`.

Available keys:

- `VITE_APP_ENV`
- `VITE_API_URL` (Axios base URL)
- `VITE_WS_URL` (WS URL)

If you don’t use `.env.local`, you can quickly create `public/env.js`:

```js
window._env_ = {
  VITE_APP_ENV: "local",
  VITE_API_URL: "http://localhost:8080/api",
  VITE_WS_URL: "ws://localhost:8080/ws",
};
```

Notes:

- The API client reads `window._env_.VITE_API_URL` (see `src/services/apis/apiConfig.ts`).
- WebSocket client reads `window._env_.VITE_WS_URL` (see `src/services/ws/WebSocketService.ts`).
- Cookies are set with `SameSite=Strict` and `secure` flags when on HTTPS. HttpOnly cookies cannot be set from the browser.

## Getting Started

Prerequisites: Node.js 18+, npm

```bash
git clone <repository-url>
cd pulsar-frontend
npm install

# Generate defaults and start dev
npm run scaffold:env && npm run dev
# App: http://localhost:5173
# Storybook: http://localhost:6006
```

## Scripts

- `dev`: start Vite dev server (port 5173)
- `preview`: preview built app (port 4173)
- `build`: type-check + production build
- `types:check`: type-check only
- `lint` / `lint:fix`: run/fix ESLint
- `prettier` / `prettier:fix`: check/format with Prettier
- `test` / `test:run` / `test:coverage` / `test:ui`: Vitest commands
- `cy`: open Cypress E2E runner
- `storybook` / `build-storybook`: Storybook
- `commit`: Commitizen prompt
- `br`: helper to create branches

Docker Compose helper scripts also exist (`docker:*`) but require a `docker-compose.yml` not included in this repo. See the Docker section below for direct Docker usage.

## Testing & Storybook

- Unit tests use Vitest with `jsdom` (see `vitest.config.ts` and `src/test/setup.ts`).
- `npm run test:ui` opens the Vitest UI.
- Storybook runs at `http://localhost:6006` via `npm run storybook`.

Stories are grouped by Form/Components (see `.storybook/preview.ts`).

Most stories expose controls for essential props and include minimal interactive examples.

## Docker

Production image serves the built app via NGINX and injects runtime env on startup.

Build and run directly:

```bash
# Build image
docker build -t pulsar-frontend:latest .

# Run container (NGINX listens on 8080)
docker run --rm -p 8080:8080 \
  -e VITE_APP_ENV=production \
  -e VITE_API_URL=https://api.example.com \
  -e VITE_WS_URL=wss://api.example.com/ws \
  pulsar-frontend:latest

# Open http://localhost:8080
```

How runtime env injection works:

1. Build stage produces static assets to `dist/` (no build-time env baked into JS).

2. In the runtime image:

   - Custom entrypoint generates `/usr/share/nginx/html/env.js` from all `VITE_*` envs.
   - `index.html` includes `<script src="/env.js"></script>` before bootstrapping the app, so `window._env_` is always available at runtime.

3. In the app:
   - Axios reads `window._env_.VITE_API_URL` (`src/services/apis/apiConfig.ts`).
   - WebSocket reads `window._env_.VITE_WS_URL` (`src/services/ws/WebSocketService.ts`).

Set env variables at `docker run` time (example):

```bash
docker run --rm -p 8080:8080 \
  -e VITE_APP_ENV=production \
  -e VITE_API_URL=https://api.example.com \
  -e VITE_WS_URL=wss://api.example.com/ws \
  pulsar-frontend:latest
```

## Scaffolding

- Rename project: `npm run scaffold:rename -- --name my-new-app --title "My New App"`
- Generate env: `npm run scaffold:env`

## Development

- Trunk-based workflow
- Conventional Commits (use `npm run commit`)

## Coding Convention

- Path alias `@` maps to `src/`
- File/dir names: kebab-case
- Types/Interfaces: CapitalizedCamelCase
- Constants: UPPER_SNAKE_CASE where appropriate

## Project Configuration

- ESLint + Prettier enforced

## Contributing

1) Create a feature branch  2) Add tests  3) Commit via `npm run commit`  4) Open a PR
