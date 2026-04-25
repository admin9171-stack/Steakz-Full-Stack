# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Artifacts

- `artifacts/steakz` — Steakz: full-stack steak restaurant management app (React + Vite). Includes login, customer ordering, previous orders table, employee admin (add/delete), and analytics dashboard.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Steakz notes

- Frontend-only app. Uses React Context (`src/store.tsx`) for client-side state with seeded demo data for orders and employees.
- Routing via `wouter`. Login is bypassable for demo (default `isLoggedIn = true`); navigating to `/login` shows the login screen.
- Charts use `recharts` (fixed-size `PieChart` to avoid responsive container clipping).
- Steak background image is generated at `artifacts/steakz/public/steak-bg.png` and referenced via `.bg-steak` utility in `src/index.css`.
- Brand colors live in `src/index.css` as theme tokens (`--color-steak-green`, `--color-steak-olive`, `--color-steak-orange`, `--color-steak-mint`, `--color-steak-navy`).

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
