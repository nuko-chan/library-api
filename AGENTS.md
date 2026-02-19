# Repository Guidelines

## Project Structure & Module Organization
This repository is currently bootstrapped with `package.json`, `package-lock.json`, and installed dependencies. Source modules are not committed yet. For new work, use this layout:

- `src/` application code (Express app setup, routes, services)
- `src/routes/` route handlers by feature (for example `books.routes.ts`)
- `src/db/` Prisma client setup and data-access helpers
- `tests/` unit and integration tests mirroring `src/` structure

Keep modules small and feature-focused. Prefer one responsibility per file.

## Build, Test, and Development Commands
- `npm install` installs dependencies.
- `npm test` currently fails by design (`"Error: no test specified"`). Replace this with a real test command when tests are added.
- `npx tsx src/index.ts` runs a TypeScript entrypoint directly during development.
- `npx tsc --noEmit` runs a type-check pass once `tsconfig.json` and source files are present.

If you add recurring workflows, expose them through `package.json` scripts (for example `dev`, `build`, `test`).

## Coding Style & Naming Conventions
Use TypeScript with `commonjs` module output to match current package configuration.

- Indentation: 2 spaces
- Filenames: `kebab-case` (`book-service.ts`)
- Variables/functions: `camelCase`
- Types/classes/interfaces: `PascalCase`
- Constants: `UPPER_SNAKE_CASE` only for true constants

Prefer explicit return types on exported functions in route/service layers.

## Testing Guidelines
No test framework is configured yet. Recommended baseline is Vitest or Jest with:

- unit tests under `tests/unit/`
- integration tests under `tests/integration/`
- naming pattern `*.test.ts`

Target meaningful coverage on route handlers, validation, and data-access boundaries before opening a PR.

## Commit & Pull Request Guidelines
Current history uses imperative, descriptive commits (example: `Initialize project with package.json, package-lock.json, and .gitignore files`).

- Write commit messages in imperative mood and keep scope clear.
- Keep each commit focused on one logical change.
- PRs should include: summary, testing notes (commands + results), and linked issue (if available).
- For API changes, include example request/response payloads in the PR description.

## Language Policy
- Think in English.
- Respond to the user in Japanese.
