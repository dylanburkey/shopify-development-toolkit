# Sentry Metrics Integration

This application uses Sentry for error tracking and metrics collection. All metrics are automatically sent to Sentry for monitoring and analysis.

## Setup

The Sentry SDK is already configured in [src/entrypoint.ts](../src/entrypoint.ts) with:
- DSN for your Sentry project
- Release tracking via `CF_VERSION_METADATA`
- Error capture with `withSentry` wrapper

## Using Metrics

Import the utilities from `src/lib/sentry.ts`:

```typescript
import {
  trackCount,
  trackGauge,
  trackDistribution,
  trackApiRequest,
  trackDbQuery,
  trackSectionRender,
  trackUserAction,
  trackThemeExport
} from '../lib/sentry';
```

## Metric Types

### 1. Counter Metrics (Increments)

Use for counting events like button clicks, API calls, errors:

```typescript
// Basic counter
trackCount('button_click', 1);

// Counter with tags
trackCount('api_request', 1, {
  endpoint: '/api/render/section',
  method: 'POST',
  status: '200'
});
```

### 2. Gauge Metrics (Current Values)

Use for values that can go up or down like active users, queue size:

```typescript
// Basic gauge
trackGauge('active_users', 42);

// Gauge with tags
trackGauge('theme_export_sections', 12, {
  project: 'my-theme'
});
```

### 3. Distribution Metrics (Statistical Distribution)

Use for performance measurements like response times, file sizes:

```typescript
// Basic distribution
trackDistribution('response_time', 150);

// Distribution with tags
trackDistribution('section_render_time', 245, {
  section: 'hero',
  cached: 'false'
});
```

## Pre-built Helper Functions

### Track API Requests

Automatically tracks request count and response time:

```typescript
export const POST: APIRoute = async ({ request, locals }) => {
  const startTime = Date.now();

  try {
    // ... your logic ...

    const durationMs = Date.now() - startTime;
    trackApiRequest('/api/projects/sections/settings', 'POST', 200, durationMs);

    return new Response(/* ... */);
  } catch (error) {
    const durationMs = Date.now() - startTime;
    trackApiRequest('/api/projects/sections/settings', 'POST', 500, durationMs);

    throw error;
  }
};
```

### Track Database Queries

Measures query performance and success rate:

```typescript
const dbStartTime = Date.now();
const result = await db
  .prepare('SELECT * FROM projects WHERE slug = ?')
  .bind(projectSlug)
  .first();

const dbDuration = Date.now() - dbStartTime;
trackDbQuery('select_project_by_slug', dbDuration, result !== null);
```

### Track Section Renders

Monitors section rendering performance and cache hit rate:

```typescript
const result = await renderSection({
  sectionSlug,
  presetSlug,
  customSettings,
  locals,
});

trackSectionRender(sectionSlug, result.renderTimeMs, result.cached);
```

### Track User Actions

Records user interactions throughout the app:

```typescript
// When user saves section settings
trackUserAction('save_section_settings', 'hero');

// When user exports theme
trackUserAction('export_theme', projectSlug);

// When user removes a section
trackUserAction('remove_section', 'featured-collection');
```

### Track Theme Exports

Comprehensive theme export metrics:

```typescript
const startTime = Date.now();
const zip = await exportTheme(projectSlug);
const durationMs = Date.now() - startTime;

trackThemeExport(projectSlug, sectionCount, durationMs);
```

## Example Implementation

See these files for working examples:

- [src/pages/api/render/section.ts](../src/pages/api/render/section.ts) - API request and section render tracking
- [src/pages/api/projects/sections/settings.ts](../src/pages/api/projects/sections/settings.ts) - API request, DB query, and user action tracking

## Viewing Metrics in Sentry

1. Go to https://sentry.io
2. Navigate to your project
3. Click on "Metrics" in the sidebar
4. View your custom metrics:
   - `api_request` - API call counts by endpoint, method, status
   - `api_response_time` - API response time distribution
   - `db_query` - Database query counts by operation
   - `db_query_time` - Database query time distribution
   - `section_render` - Section render counts by section type
   - `section_render_time` - Section render time distribution
   - `user_action` - User action counts by action type
   - `theme_export` - Theme export counts
   - `theme_export_sections` - Section count per export
   - `theme_export_time` - Theme export time distribution

## Best Practices

1. **Always use tags** to add context to metrics
2. **Track both success and failure** cases
3. **Measure duration** for all async operations
4. **Use descriptive names** for custom metrics
5. **Track at appropriate granularity** - not too detailed, not too vague
6. **Don't track PII** (personally identifiable information)

## Adding New Metrics

To add a new metric category:

1. Create a helper function in [src/lib/sentry.ts](../src/lib/sentry.ts)
2. Use appropriate metric type (count, gauge, distribution)
3. Add relevant tags for filtering
4. Document it in this file

Example:

```typescript
// In src/lib/sentry.ts
export function trackPresetApplication(presetSlug: string, projectSlug: string) {
  trackCount('preset_applied', 1, {
    preset: presetSlug,
    project: projectSlug,
  });
}

// In your API route
trackPresetApplication(presetSlug, projectSlug);
```
