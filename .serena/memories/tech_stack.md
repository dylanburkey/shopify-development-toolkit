# Tech Stack

## Core Framework
- **Astro** (v5.x) - SSR (Server-Side Rendering) framework
  - Output mode: `server`
  - Adapter: `@astrojs/cloudflare`
  - Custom worker entry point: `src/entrypoint.ts`

## Runtime Environment
- **Cloudflare Workers** - Serverless edge platform
  - Compatibility flags: `nodejs_compat`, `global_fetch_strictly_public`
  - Worker entry: `dist/_worker.js/index.js`
  - Observability enabled for monitoring

## Database
- **Cloudflare D1** - SQLite database at the edge
  - Database name: `theme-builder`
  - Binding: `DB`
  - Tables: projects, project_sections, project_blocks, project_files, variants

## Styling
- **TailwindCSS v4.x** - Utility-first CSS framework
  - Integrated via Vite plugin: `@tailwindcss/vite`
  - Modern CSS standards enforced (see code_style_conventions.md)

## Language
- **TypeScript** - Strict mode enabled
  - Config extends: `astro/tsconfigs/strict`
  - Runtime types in `src/env.d.ts`

## Key Dependencies
- **LiquidJS** (v10.x) - Shopify Liquid template engine
- **fflate** (v0.8.x) - Fast compression library for ZIP exports (no Node.js fs/zlib)
- **@sentry/cloudflare** (v10.x) - Error tracking and monitoring
- **@atlaskit/pragmatic-drag-and-drop** (v1.x) - Drag-and-drop functionality

## Content Management
- **Astro Content Collections** - Static, type-safe content
  - Located in `src/content/` and `library/`
  - Collections: sections, blocks, metaobjects, presets, base-theme
  - Read-only reference data (not user-created content)
