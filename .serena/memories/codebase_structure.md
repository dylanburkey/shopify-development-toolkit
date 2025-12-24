# Codebase Structure

## Root Directory Layout

```
shopify-development-toolkit/
├── src/                    # Source code
├── library/                # Static library content (sections, blocks, presets)
├── public/                 # Static assets
├── dist/                   # Build output
├── scripts/                # Utility scripts (e.g., sync-theme-sections.js)
├── .claude/                # Claude Code configuration
├── .github/                # GitHub workflows
├── astro.config.mjs        # Astro configuration
├── wrangler.jsonc          # Cloudflare Workers configuration
├── package.json            # NPM dependencies
└── tsconfig.json           # TypeScript configuration
```

## Source Directory (`src/`)

### Core Files
- `entrypoint.ts` - Custom Cloudflare Worker entry point
- `env.d.ts` - TypeScript environment type definitions
- `content.config.ts` - Astro content collections configuration

### Library Code (`src/lib/`)
- `db/` - D1 database helpers and TypeScript types
  - `index.ts` - Helper functions: `getDB()`, `generateId()`, `now()`, `parseJSON()`, `toJSON()`
  - `schema.ts` - Database schema types
- `project/` - Project CRUD operations, add-section, add-block, export
- `presets/` - Apply color/typography presets to projects
- `liquid/` - Liquid template rendering and processing

### Pages (`src/pages/`)
Astro's file-based routing:
- `index.astro` - Home page
- `projects/` - Project dashboard and detail pages
- `library/` - Browse sections, blocks, presets
- `api/` - API routes (POST handlers for mutations)
  - Pattern: Export `POST: APIRoute` handlers
  - Access D1 via `getDB(locals)`

### UI Components (`src/components/`)
Reusable Astro/React/Vue/Svelte components

### Layouts (`src/layouts/`)
- `Dashboard.astro` - Main layout wrapper

### Styles (`src/styles/`)
Global styles and CSS utilities

### Content Collections (`src/content/`)
Type-safe content definitions configured in `content.config.ts`

## Library Directory (`library/`)

Static, read-only reference data:

```
library/
├── sections/       # Section definitions (*.json)
├── blocks/         # Block definitions (*.json)
├── metaobjects/    # Metaobject definitions (*.json)
├── presets/        # Color/typography presets (*.json)
└── base-theme/     # Base Shopify theme files
    ├── layout/     # Theme layouts
    ├── templates/  # Page templates
    └── snippets/   # Reusable code snippets
```

Accessed via Astro Content Collections:
```typescript
const sections = await getCollection('sections');
const blocks = await getCollection('blocks');
const presets = await getCollection('presets');
```

## Database Schema (D1)

Tables in `theme-builder` database:
- `projects` - User-created theme projects
- `project_sections` - Sections added to projects (references library)
- `project_blocks` - Blocks added to projects
- `project_files` - Generated theme files (Liquid, JSON, assets)
- `variants` - Custom section variants from library sections

Access pattern:
```typescript
const db = getDB(Astro.locals);
// or in API routes
const db = getDB(locals);
```

## Configuration Files

### `wrangler.jsonc`
- Main entry: `dist/_worker.js/index.js`
- D1 binding: `DB` → `theme-builder`
- Assets binding: `ASSETS`
- Version metadata: `CF_VERSION_METADATA`
- Source maps enabled
- Observability enabled

### `astro.config.mjs`
- Output: `server` (SSR mode)
- Adapter: Cloudflare with custom entry point
- Vite plugins: TailwindCSS

### `.claude/rules/`
- `modern-css.md` - Comprehensive CSS style guide
