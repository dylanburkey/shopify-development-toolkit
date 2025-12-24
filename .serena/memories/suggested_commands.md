# Suggested Commands

All commands run from the project root directory.

## Development Commands

### Start Development Server
```bash
npm run dev
```
Starts local dev server at `http://localhost:4321`

### Build for Production
```bash
npm run build
```
Builds production site to `./dist/` directory

### Preview Production Build
```bash
npm run preview
```
Preview build locally with wrangler pages dev before deploying

### Deploy to Cloudflare
```bash
npm run deploy
```
Builds and deploys to Cloudflare Workers

### Sync Theme Sections
```bash
npm run sync:theme
```
Syncs theme sections from the library (runs `scripts/sync-theme-sections.js`)

## Cloudflare Wrangler Commands

### Run D1 Database Migrations
```bash
wrangler d1 execute theme-builder --remote --file=path/to/migration.sql
```
Execute SQL migrations against the remote D1 database

### View Live Logs
```bash
wrangler tail astro-cloudflare
```
Stream real-time logs from the deployed Cloudflare Worker

## Package Management
```bash
npm install              # Install dependencies
```

## System Commands (macOS/Darwin)
- `ls` - List directory contents
- `cd` - Change directory
- `grep` - Search text patterns
- `find` - Find files and directories
- `git` - Version control operations
