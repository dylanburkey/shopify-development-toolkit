/**
 * Sentry utilities for metrics, error tracking, and logging
 * Import this module to track metrics and logs across the application
 */

import * as Sentry from '@sentry/cloudflare';

/**
 * Structured Logging Utilities
 * Use these for explicit log messages with structured attributes
 */

/**
 * Log an informational message
 */
export function logInfo(message: string, attributes?: Record<string, unknown>) {
  Sentry.logger.info(message, attributes);
}

/**
 * Log a warning message
 */
export function logWarning(message: string, attributes?: Record<string, unknown>) {
  Sentry.logger.warn(message, attributes);
}

/**
 * Log an error message
 */
export function logError(message: string, attributes?: Record<string, unknown>) {
  Sentry.logger.error(message, attributes);
}

/**
 * Log a debug message
 */
export function logDebug(message: string, attributes?: Record<string, unknown>) {
  Sentry.logger.debug(message, attributes);
}

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
