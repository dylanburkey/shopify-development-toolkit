# Code Style & Conventions

## General Conventions

### Emojis
- **NEVER** use emojis in:
  - Commit messages
  - README.md files
  - Pull Requests
  - Code comments

### CSS
- **NEVER** use `!important` in CSS
- Follow Advanced Modern CSS Standards (see `.claude/rules/modern-css.md`)

### TypeScript
- Strict mode enabled (`astro/tsconfigs/strict`)
- Use TypeScript for all `.ts` and `.astro` files
- Runtime environment types defined in `src/env.d.ts`

## Modern CSS Standards

The project follows cutting-edge CSS practices:

### Scoping & Organization
- Use `@scope` for component isolation (not BEM)
- Native CSS nesting (max 3 levels deep)
- All CSS within `@layer` declarations: `reset`, `base`, `components`, `utilities`

### Layout
- **Container queries** (`@container`) for component responsiveness
- **Media queries** (`@media`) only for global page layouts
- Use `display: grid` for 2D layouts, `display: flex` for 1D
- Use `gap` for spacing (never margins between siblings)

### Properties
- **Logical properties** exclusively (e.g., `inline-size`, `block-size`, `margin-inline-start`)
- Three-tier custom property naming:
  1. Primitives: `--color-blue-500`
  2. Semantic tokens: `--color-primary`
  3. Component-scoped: `--card-padding`
- Use `--_` prefix for private component properties

### Colors
- Use `oklch` or `oklab` color spaces
- Relative color syntax: `oklch(from var(--color) calc(l + 0.2) c h)`
- `light-dark()` for theme-aware values

### Units
- `rem` for typography and global spacing
- `em` for component-relative spacing
- `cqi`/`cqb` for container-relative sizing
- `dvh`/`svh`/`lvh` for viewport heights
- **Avoid `px`** except for borders and box-shadows
- Use `clamp()` for fluid sizing

### Selectors
- `:where()` for zero specificity
- `:is()` when specificity should match highest selector
- `:has()` for parent/sibling selection
- `:focus-visible` for keyboard-only focus indicators
- `:user-valid`/`:user-invalid` for form validation

### Accessibility
- Minimum touch target: 44px × 44px
- Support `prefers-reduced-motion`
- Support forced colors mode (Windows High Contrast)

## TypeScript Patterns

### API Routes
Export `APIRoute` handlers in `src/pages/api/`:
```typescript
import type { APIRoute } from 'astro';
export const POST: APIRoute = async ({ request, locals }) => {
  const db = getDB(locals);
  // ...
};
```

### Database Access
Access D1 via `Astro.locals` in pages:
```typescript
const projects = await listProjects(Astro.locals);
```

Use `getDB(locals)` helper from `src/lib/db/index.ts`:
```typescript
const db = getDB(locals);
```

### Content Collections
Access via `getCollection()`:
```typescript
const sections = await getCollection('sections');
```

## Data Source Truth
- **D1 database** is the source of truth for user-created projects
- Content collection projects (`src/content/projects/`) are legacy and should not be used
