# React Pro Boilerplate

A production-grade React + TypeScript boilerplate. Reusable across multiple projects, with modern tooling, clean feature-based architecture, and a well-considered UI/UX foundation.

## Tech Stack

| Layer | Tools |
|-------|-------|
| **Build** | Vite 5, React 18, TypeScript (strict) |
| **Styling** | Tailwind CSS, shadcn/ui (Radix primitives), Plus Jakarta Sans |
| **Routing** | React Router v6 (lazy-loaded, protected & guest routes) |
| **Server state** | TanStack Query, Axios (with auth + refresh-token interceptors) |
| **Client state** | Zustand (with persistence) |
| **Forms** | React Hook Form + Zod |
| **Notifications** | Sonner |
| **Testing** | Vitest, React Testing Library, jsdom |
| **Quality** | ESLint (flat config), Prettier, Husky, lint-staged, commitlint |
| **CI** | GitHub Actions (lint, type-check, test, build) |

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Copy env template and fill in values
cp .env.example .env.local

# 3. Set up git hooks (one-time)
npm run prepare

# 4. Run dev server
npm run dev
```

App runs at <http://localhost:3000>.

## Scripts

| Command | What it does |
|---------|--------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Type-check + production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Lint with ESLint (zero warnings) |
| `npm run lint:fix` | Auto-fix lint errors |
| `npm run format` | Prettier write |
| `npm run type-check` | TypeScript no-emit check |
| `npm test` | Vitest watch mode |
| `npm run test:run` | Single-run tests |
| `npm run test:coverage` | Coverage report |

## Project Structure

```
src/
├── app/                    # Application shell
│   ├── App.tsx             # Root component
│   ├── providers.tsx       # All global providers
│   └── router.tsx          # Route definitions
├── components/
│   ├── ui/                 # shadcn primitives (Button, Input, Card, Dialog…)
│   ├── layout/             # Layouts, route guards, Sidebar, Header
│   └── common/             # Shared widgets (ThemeToggle, ErrorBoundary…)
├── features/               # Domain modules (feature-first architecture)
│   └── auth/
│       ├── api/            # API calls
│       ├── components/     # Feature-specific UI
│       ├── hooks/          # Feature mutations/queries
│       └── schemas/        # Zod validation schemas
├── hooks/                  # Reusable hooks (useDebounce, useTheme…)
├── lib/                    # Core utilities (axios, queryClient, utils, storage)
├── stores/                 # Zustand stores
├── pages/                  # Page-level components (lazy-loaded)
├── config/                 # env, routes, constants
├── types/                  # Global TypeScript types
├── styles/                 # globals.css with design tokens
└── test/                   # Test setup and helpers
```

## How to Add a New Feature

1. Create folder `src/features/<feature-name>/` with `api/`, `components/`, `hooks/`, `schemas/`.
2. Define types in `src/types/` if shared across features.
3. Add a page in `src/pages/<feature>-page.tsx`.
4. Register the route in `src/app/router.tsx`.
5. Add nav item in `src/components/layout/sidebar.tsx` if applicable.

## Design System

Tokens live in `src/styles/globals.css` as HSL CSS variables. Update once, and the entire app re-themes:

```css
:root {
  --primary: 222.2 47.4% 11.2%;
  --accent: 142.1 76.2% 36.3%;
  --radius: 0.75rem;
  ...
}
```

**Dark mode:** Toggle via `<ThemeToggle />`. Persists in localStorage, respects `prefers-color-scheme`.

**Typography:** Plus Jakarta Sans, loaded via `index.html`.

## Auth Flow

- Login/register forms validated by Zod, submitted via TanStack Query mutation.
- On success, `setSession` in `useAuthStore` stores user + tokens; tokens also written to localStorage so Axios can attach them.
- `ProtectedRoute` redirects unauthenticated users to `/login` and preserves intended destination via location state.
- `GuestRoute` redirects already-authenticated users away from login/register.
- Axios interceptor automatically refreshes the access token on `401` and retries the failed request. Concurrent requests during refresh are queued.

## Environment Variables

Validated at boot via Zod (`src/config/env.ts`). Missing or malformed env vars cause an early, descriptive error.

| Var | Required | Notes |
|-----|----------|-------|
| `VITE_APP_NAME` | optional | Used in document titles |
| `VITE_API_BASE_URL` | **required** | Backend base URL |
| `VITE_ENV` | optional | `development` \| `staging` \| `production` |
| `VITE_SENTRY_DSN` | optional | For error monitoring |

## Quality Gates

- **Pre-commit hook** runs `lint-staged` (ESLint + Prettier on staged files).
- **Commit-msg hook** enforces Conventional Commits.
- **CI** runs lint → type-check → tests → build on every push/PR.

## Customization Checklist

When starting a new project from this boilerplate:

- [ ] Update `name`, `description`, `author` in `package.json`
- [ ] Update `index.html` title & meta description
- [ ] Replace primary/accent colors in `src/styles/globals.css`
- [ ] Swap `Plus Jakarta Sans` in `index.html` + `tailwind.config.ts` if a different font is needed
- [ ] Set `VITE_API_BASE_URL` in `.env.local`
- [ ] Update auth API endpoints in `src/features/auth/api/auth.api.ts` to match your backend contract
- [ ] Configure Sentry/GA in `src/app/providers.tsx` if needed
- [ ] Update README with project-specific details

## License

MIT
