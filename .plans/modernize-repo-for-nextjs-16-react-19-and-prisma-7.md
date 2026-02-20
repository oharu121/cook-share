# Plan: Modernize repo for Next.js 16, React 19, and Prisma 7

**Status:** Completed
**Date:** 2026-02-20

## Goal

Comprehensive modernization of the cook-share codebase to work with Next.js 16, React 19, Prisma 7, and Tailwind CSS v4. Remove dead dependencies, fix security issues, update deprecated patterns, and resolve data layer bugs.

## Summary of Changes

- Removed 7 dead dependencies (next-auth, @auth/prisma-adapter, next-i18next, jsonwebtoken, bcryptjs, @types/jsonwebtoken, @eslint/eslintrc)
- Moved @faker-js/faker to devDependencies
- Added ESM mode ("type": "module") and replaced ts-node with tsx
- Modernized tsconfig.json (ES2024 target, esnext module, bundler moduleResolution)
- Replaced ESLint FlatCompat bridge with direct flat config using defineConfig
- Deleted unused types/next-auth.d.ts
- Fixed SESSION_SECRET security vulnerability (removed hardcoded fallback, made lazy via getEncodedKey())
- Fixed Prisma singleton in app/api/recipes/route.ts
- Migrated to Prisma 7 driver adapter pattern (prisma.config.ts, @prisma/adapter-pg)
- Migrated 47 React.forwardRef usages across 13 shadcn/ui components to React 19 ref-as-prop pattern
- Fixed N+1 query in server/actions/shoppingList.ts (getShoppingListById)
- Added lang attribute to root HTML element
- Widened params types across all page/layout files for Next.js 16 compatibility
- Removed commented-out dead code (SubRecipeEditor)

## Files Modified

- [package.json](package.json) - Dependency cleanup, ESM mode, script updates
- [tsconfig.json](tsconfig.json) - Modernized compiler options
- [eslint.config.mjs](eslint.config.mjs) - Replaced FlatCompat with defineConfig
- [prisma.config.ts](prisma.config.ts) - New file for Prisma 7 datasource config
- [prisma/schema.prisma](prisma/schema.prisma) - Removed url from datasource block
- [server/db.ts](server/db.ts) - Prisma 7 adapter pattern with PrismaPg
- [server/lib/session.ts](server/lib/session.ts) - Security fix: lazy SESSION_SECRET validation
- [server/actions/shoppingList.ts](server/actions/shoppingList.ts) - Fixed N+1 query
- [app/layout.tsx](app/layout.tsx) - Added lang attribute to html element
- [app/[lang]/layout.tsx](app/[lang]/layout.tsx) - Widened params type to string
- [app/api/recipes/route.ts](app/api/recipes/route.ts) - Fixed Prisma singleton import
- [components/ui/button.tsx](components/ui/button.tsx) - forwardRef migration
- [components/ui/input.tsx](components/ui/input.tsx) - forwardRef migration
- [components/ui/textarea.tsx](components/ui/textarea.tsx) - forwardRef migration
- [components/ui/label.tsx](components/ui/label.tsx) - forwardRef migration
- [components/ui/card.tsx](components/ui/card.tsx) - forwardRef migration (6 components)
- [components/ui/dialog.tsx](components/ui/dialog.tsx) - forwardRef migration (4 components)
- [components/ui/select.tsx](components/ui/select.tsx) - forwardRef migration (7 components)
- [components/ui/switch.tsx](components/ui/switch.tsx) - forwardRef migration
- [components/ui/separator.tsx](components/ui/separator.tsx) - forwardRef migration
- [components/ui/avatar.tsx](components/ui/avatar.tsx) - forwardRef migration (3 components)
- [components/ui/toast.tsx](components/ui/toast.tsx) - forwardRef migration (6 components)
- [components/ui/dropdown-menu.tsx](components/ui/dropdown-menu.tsx) - forwardRef migration (8 components)
- [components/ui/command.tsx](components/ui/command.tsx) - forwardRef migration (7 components)
- [components/recipe/create-recipe-form.tsx](components/recipe/create-recipe-form.tsx) - Removed dead code, widened lang type
- [components/recipe/edit-recipe-form.tsx](components/recipe/edit-recipe-form.tsx) - Widened lang type
- [components/IngredientSearch.tsx](components/IngredientSearch.tsx) - Widened lang type
- [config/dictionaries/index.ts](config/dictionaries/index.ts) - Widened locale param type
- 11 page files in app/[lang]/ - Widened params types for Next.js 16

## Breaking Changes

- Requires Prisma 7 (driver adapter pattern)
- Requires Next.js 16+ (async params)
- Requires React 19+ (ref-as-prop)
- SESSION_SECRET environment variable is now required (no fallback)
- ESM-only ("type": "module")

## Deprecations

None
