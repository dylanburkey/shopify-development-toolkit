# Shopify Theme Development Toolkit - Implementation Plan

## Overview

Transform this Astro project into a full-featured Shopify theme development toolkit that enables:
- Managing multiple Shopify client projects
- Creating reusable sections, blocks, and metaobjects
- Generating production-ready Liquid code
- Visual preview of components before export

---

## Proposed Architecture

```
astro-cloudflare/
├── src/
│   ├── pages/
│   │   ├── index.astro                    # Dashboard - project selector
│   │   ├── projects/
│   │   │   ├── index.astro                # List all projects
│   │   │   ├── [project]/
│   │   │   │   ├── index.astro            # Project overview
│   │   │   │   ├── sections.astro         # Section manager
│   │   │   │   ├── blocks.astro           # Block manager
│   │   │   │   └── preview.astro          # Live preview
│   │   └── library/
│   │       ├── index.astro                # Component library browser
│   │       ├── sections/[slug].astro      # Section detail/editor
│   │       └── blocks/[slug].astro        # Block detail/editor
│   │
│   ├── components/
│   │   ├── ui/                            # Dashboard UI components
│   │   │   ├── Sidebar.astro
│   │   │   ├── ProjectCard.astro
│   │   │   └── CodePreview.astro
│   │   │
│   │   └── shopify/                       # Shopify component library
│   │       ├── sections/                  # Reusable section templates
│   │       │   ├── Hero.astro
│   │       │   ├── FeaturedCollection.astro
│   │       │   ├── ImageWithText.astro
│   │       │   └── ...
│   │       ├── blocks/                    # Reusable block templates
│   │       │   ├── Heading.astro
│   │       │   ├── Button.astro
│   │       │   ├── Image.astro
│   │       │   └── ...
│   │       └── metaobjects/               # Metaobject definitions
│   │           ├── SizeChart.astro
│   │           ├── FAQ.astro
│   │           └── ...
│   │
│   ├── lib/
│   │   ├── liquid/
│   │   │   ├── generator.ts               # Astro → Liquid transpiler
│   │   │   ├── schema.ts                  # JSON schema generator
│   │   │   └── templates.ts               # Liquid template helpers
│   │   ├── projects/
│   │   │   ├── manager.ts                 # Project CRUD operations
│   │   │   └── exporter.ts                # Export to Shopify theme
│   │   └── shopify/
│   │       ├── cli.ts                     # Shopify CLI integration
│   │       └── api.ts                     # Shopify API client
│   │
│   ├── content/
│   │   └── projects/                      # Project definitions (MDX/JSON)
│   │       ├── client-a.json
│   │       └── client-b.json
│   │
│   └── layouts/
│       ├── Dashboard.astro                # Main app layout
│       └── ShopifyPreview.astro           # Shopify-like preview frame
│
├── projects/                              # Generated Shopify themes
│   ├── client-a/
│   │   ├── assets/
│   │   ├── config/
│   │   ├── layout/
│   │   ├── sections/
│   │   ├── snippets/
│   │   └── templates/
│   └── client-b/
│
├── library/                               # Master component definitions
│   ├── sections/
│   │   └── hero.yaml                      # Section config + schema
│   ├── blocks/
│   └── metaobjects/
│
└── scripts/
    ├── export.ts                          # Export project to theme
    ├── sync.ts                            # Sync with Shopify store
    └── init-project.ts                    # Initialize new project
```

---

## Core Features

### 1. Project Management Dashboard
- Create/edit/delete client projects
- Each project links to a Shopify store
- Track which components are used per project
- One-click export to Shopify theme format

### 2. Component Library
- **Sections**: Hero, Featured Collection, Image with Text, Testimonials, etc.
- **Blocks**: Heading, Button, Image, Text, Video, etc.
- **Metaobjects**: Size Chart, FAQ, Team Member, etc.
- Each component has:
  - Astro preview version
  - Liquid export template
  - JSON schema for theme editor settings

### 3. Liquid Code Generator
- Transform Astro components to Shopify Liquid
- Auto-generate `{% schema %}` blocks
- Handle settings, blocks, and dynamic content
- Support for CSS/JS asset extraction

### 4. Export System
- Generate complete Shopify 2.0 theme structure
- Option to start from Dawn/Horizon base
- Merge custom components with base theme
- Validate against Shopify theme requirements

---

## Implementation Phases

### Phase 1: Core Infrastructure
1. Set up project content collection schema
2. Create dashboard layout and navigation
3. Implement project CRUD operations
4. Basic file-based project storage

### Phase 2: Component Library
1. Create base Astro components for common sections
2. Define schema format for Shopify settings
3. Build component browser/preview pages
4. Implement Liquid code generation

### Phase 3: Export & Integration
1. Build theme exporter (Astro → Shopify theme)
2. Integrate with Shopify CLI for deployment
3. Add theme validation
4. Create project templates (Dawn-based, minimal, etc.)

### Phase 4: Advanced Features
1. Visual section editor
2. CSS/JS bundling for themes
3. Multi-store sync
4. Version control integration

---

## Questions Before Proceeding

Please confirm or adjust:

1. **Dashboard UI**: Web-based dashboard (as planned) or CLI-only?

2. **Base Theme**: Start from Dawn, Horizon, or minimal skeleton?

3. **Storage**: File-based (JSON/YAML) or database (D1/SQLite)?

4. **Shopify Integration**: Direct API/CLI sync or manual export only?

5. **Immediate Priority**: Which phase should we start with?

---

## Technical Stack

- **Astro 5** - Framework & SSR
- **Cloudflare Workers** - Hosting & Edge compute
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Dashboard styling (optional)
- **Shopify CLI** - Theme deployment (optional)
