# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at localhost:4321
npm run build    # Build production site to ./dist/
npm run preview  # Preview production build locally
```

## Architecture

This is a minimal Astro project using the static site generator framework. Key structure:

- `src/pages/` - File-based routing (`.astro` or `.md` files become routes)
- `public/` - Static assets served at root
- `astro.config.mjs` - Astro configuration

The project uses TypeScript with Astro's strict config (`astro/tsconfigs/strict`).

## Notes

- When writing CSS, avoid using `!important`
  