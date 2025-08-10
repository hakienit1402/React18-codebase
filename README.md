

## Overview

Pulsar is a modern React + TypeScript + Vite application, following Domain-Driven Design (DDD) principles. It ships with a rich UI component library, opinionated tooling, and a production-ready Docker + NGINX setup with runtime-configurable environment variables.

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

## Architecture

- DDD-inspired folder structure with `domains/*` for domain logic and `components/*` for shared UI
- Client-side routing with React Router
- Data fetching and caching via React Query
- Axios API client with interceptors (token attach, 401 refresh + single-flight retry)
- Error boundaries and basic offline guard
- Build optimized with Vite (gzip + brotli compression and image optimization)

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

This app uses runtime-injected configuration via `window._env_` loaded from `/env.js` (see `index.html`). In production, the Docker image injects values from `deploy/env.template.js` using a startup script.

Available keys:

- `VITE_APP_ENV`
- `VITE_API_URL` (used by the Axios client)
- `VITE_WS_URL` (used by the STOMP WebSocket client)

For local development, create `public/env.js`:

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

### Prerequisites

- Node.js 18+
- npm

### Install & Run

```bash
git clone <repository-url>
cd pulsar-frontend
npm install

# Create runtime env for dev (either copy template or create new)
cp deploy/env.template.js public/env.js
# or create public/env.js with content:
# window._env_ = {
#   VITE_APP_ENV: 'local',
#   VITE_API_URL: 'http://localhost:8080/api',
#   VITE_WS_URL: 'ws://localhost:8080/ws',
# };

npm run dev
# → http://localhost:3000
```

## Available Scripts

- `dev`: start Vite dev server (port 3000)
- `preview`: preview built app (port 80)
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

### Storybook organization

- Stories are grouped under categories for quick navigation (see `.storybook/preview.ts`):
  - Form: form fields and integrated examples (RHF + Zod)
  - Components:
    - Inputs: `Input`, `Textarea`, `Checkbox`, `Switch`, `Slider`, `RadioGroup`, `Toggle`, `ToggleGroup`, `InputOTP`
    - Data Display: `Avatar`, `Badge`, `Card`, `Separator`, `Skeleton`, `Progress`, `Label`
    - Navigation: `Tabs`, `Breadcrumb`, `Menubar`, `NavigationMenu`, `Pagination`
    - Overlays: `Tooltip`, `Popover`, `Dialog`, `Drawer`, `AlertDialog`, `HoverCard`, `Sheet`, `ContextMenu`
    - Utility: `ScrollArea`, `Resizable`, `Command`, `Select`

Most stories expose controls for essential props and include minimal interactive examples.

## Docker

The production image serves the built app via NGINX and injects runtime env on startup.

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

How runtime env injection works (clean flow):

1. Build stage produces static assets to `dist/` (no build-time env baked into JS).

2. In the runtime image:

   - `deploy/env.template.js` is copied to `/usr/share/nginx/html/env.template.js`.
   - Entry script `deploy/90-inject-runtime-env.sh` runs on container start and renders `/usr/share/nginx/html/env.js` by substituting these variables: `VITE_APP_ENV`, `VITE_API_URL`, `VITE_WS_URL`.
   - If `env.template.js` is missing, a safe default `env.js` is created.
   - `index.html` includes `<script type="module" src="/env.js"></script>` before bootstrapping the app, so `window._env_` is always available at runtime.

3. At runtime in the app:
   - Axios base URL reads `window._env_.VITE_API_URL` (`src/services/apis/apiConfig.ts`).
   - STOMP WebSocket client reads `window._env_.VITE_WS_URL` (`src/services/ws/WebSocketService.ts`).

Set env variables at `docker run` time (example):

```bash
docker run --rm -p 8080:8080 \
  -e VITE_APP_ENV=production \
  -e VITE_API_URL=https://api.example.com \
  -e VITE_WS_URL=wss://api.example.com/ws \
  pulsar-frontend:latest
```

## Development Workflow

- Trunk-based development

Branch naming:

- `feat/PD-{Ticket}_description`
- `fix/PD-{Ticket}_description`
- `chore/PD-{Ticket}_description`

Commit messages:

- Use `npm run commit` (Commitizen)
- Or: `feat: [PD-123] concise description`

## Coding Convention

- Path alias `@` maps to `src/`
- File/dir names: kebab-case
- Types/Interfaces: CapitalizedCamelCase
- Constants: UPPER_SNAKE_CASE where appropriate

## Project Configuration

- ESLint + Prettier enforced
- Bitbucket Pipelines for CI/CD (tests, quality checks, builds)

## Contributing

1. Create a feature branch using the naming rules above
2. Follow coding standards and include tests where relevant
3. Commit via `npm run commit` or conventional commits
4. Push and open a Pull Request

## Support

Please contact the development team for questions and support.
