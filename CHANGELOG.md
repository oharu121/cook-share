# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2026-02-20

### Changed

- Modernized tsconfig.json: ES2024 target, esnext module, bundler moduleResolution
- Replaced ESLint FlatCompat bridge with direct flat config using `defineConfig`
- Migrated to Prisma 7 driver adapter pattern (`prisma.config.ts`, `@prisma/adapter-pg`)
- Migrated 47 `React.forwardRef` usages across 13 shadcn/ui components to React 19 ref-as-prop pattern
- Widened route params types across all pages for Next.js 16 compatibility
- Switched to ESM mode (`"type": "module"`) and replaced `ts-node` with `tsx`

### Fixed

- Security: Removed hardcoded SESSION_SECRET fallback; now throws if env var is missing
- Fixed Prisma singleton leak in `app/api/recipes/route.ts` (was creating new PrismaClient per request)
- Fixed N+1 query in `getShoppingListById` (now uses Prisma `include` instead of per-item queries)
- Added `lang` attribute to root `<html>` element

### Removed

- Dead dependencies: `next-auth`, `@auth/prisma-adapter`, `next-i18next`, `jsonwebtoken`, `bcryptjs`
- Dead type augmentation file: `types/next-auth.d.ts`
- Commented-out SubRecipeEditor code from create-recipe-form
