/**
 * Sentry utilities for metrics and error tracking
 * Import this module to track metrics across the application
 */

import * as Sentry from '@sentry/cloudflare';

/**
 * Track a counter metric (increments)
 * Use for: button clicks, API calls, events
 */
export function trackCount(name: string, value = 1, tags?: Record<string, string>) {
  Sentry.metrics.count(name, value, { tags });
}

/**
 * Track a gauge metric (current value)
 * Use for: active users, queue size, resource usage
 */
export function trackGauge(name: string, value: number, tags?: Record<string, string>) {
  Sentry.metrics.gauge(name, value, { tags });
}

/**
 * Track a distribution metric (statistical distribution)
 * Use for: response times, file sizes, processing duration
 */
export function trackDistribution(name: string, value: number, tags?: Record<string, string>) {
  Sentry.metrics.distribution(name, value, { tags });
}

/**
 * Track an API request
 */
export function trackApiRequest(endpoint: string, method: string, statusCode: number, durationMs: number) {
  trackCount('api_request', 1, {
    endpoint,
    method,
    status: statusCode.toString(),
  });

  trackDistribution('api_response_time', durationMs, {
    endpoint,
    method,
  });
}

/**
 * Track a database query
 */
export function trackDbQuery(operation: string, durationMs: number, success: boolean) {
  trackCount('db_query', 1, {
    operation,
    success: success.toString(),
  });

  trackDistribution('db_query_time', durationMs, {
    operation,
  });
}

/**
 * Track a section render
 */
export function trackSectionRender(sectionSlug: string, durationMs: number, cached: boolean) {
  trackCount('section_render', 1, {
    section: sectionSlug,
    cached: cached.toString(),
  });

  trackDistribution('section_render_time', durationMs, {
    section: sectionSlug,
    cached: cached.toString(),
  });
}

/**
 * Track user actions
 */
export function trackUserAction(action: string, resource?: string) {
  trackCount('user_action', 1, {
    action,
    ...(resource && { resource }),
  });
}

/**
 * Track theme exports
 */
export function trackThemeExport(projectSlug: string, sectionCount: number, durationMs: number) {
  trackCount('theme_export', 1, {
    project: projectSlug,
  });

  trackGauge('theme_export_sections', sectionCount, {
    project: projectSlug,
  });

  trackDistribution('theme_export_time', durationMs, {
    project: projectSlug,
  });
}
