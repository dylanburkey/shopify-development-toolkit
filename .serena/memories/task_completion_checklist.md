# Task Completion Checklist

When completing a development task, follow this checklist:

## 1. Code Quality

### TypeScript
- [ ] No TypeScript errors (`astro check` or IDE)
- [ ] Types properly defined (no `any` unless necessary)
- [ ] Runtime environment types match `src/env.d.ts`

### CSS
- [ ] All styles within `@layer` declarations
- [ ] Using container queries (`@container`) for component responsiveness
- [ ] Logical properties instead of physical (e.g., `inline-size` not `width`)
- [ ] Colors in `oklch` or `oklab` color space
- [ ] No `!important` declarations
- [ ] Accessibility requirements met (focus states, touch targets, reduced motion)

### General
- [ ] No emojis in code, comments, or commit messages
- [ ] Code follows existing patterns in the codebase

## 2. Build & Deploy

### Local Testing
- [ ] Run `npm run build` successfully
- [ ] Test locally with `npm run dev` at localhost:4321
- [ ] Preview build with `npm run preview`

### Database Migrations (if applicable)
- [ ] Create migration SQL file
- [ ] Test migration locally
- [ ] Run migration on remote: `wrangler d1 execute theme-builder --remote --file=path/to/migration.sql`

### Deployment
- [ ] Run `npm run deploy` to deploy to Cloudflare Workers
- [ ] Check logs: `wrangler tail astro-cloudflare`
- [ ] Verify deployment works in production

## 3. Git & Version Control

### Before Commit
- [ ] Review all changes
- [ ] Stage relevant files: `git add <files>`
- [ ] No sensitive data (API keys, secrets) in commits

### Commit Message
- [ ] Clear, descriptive commit message
- [ ] NO emojis in commit message
- [ ] Format: Present tense, imperative mood (e.g., "Add feature" not "Added feature")

### Pull Request (if applicable)
- [ ] NO emojis in PR title or description
- [ ] Clear description of changes
- [ ] Link to related issues
- [ ] Request reviews if needed

## 4. Testing (No automated tests currently)

Since there are no testing frameworks configured:
- [ ] Manual testing of all affected features
- [ ] Test edge cases and error scenarios
- [ ] Verify database operations work correctly
- [ ] Check Cloudflare Workers runtime compatibility

## 5. Documentation

- [ ] Update CLAUDE.md if architecture changes
- [ ] Update README.md if user-facing changes
- [ ] Add code comments for complex logic (but not obvious code)
- [ ] Update Serena memories if project structure changes significantly

## Notes

- **No linting/formatting tools**: The project does not have ESLint or Prettier configured
- **D1 is source of truth**: User-created projects live in D1 database, not content collections
- **Cloudflare-specific**: Code must be compatible with Cloudflare Workers runtime (no Node.js fs, use `fflate` not zlib)
