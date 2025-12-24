import type { APIRoute } from 'astro';
import { logInfo, logWarning, logError, logDebug } from '../../../lib/sentry';

/**
 * Test endpoint for Sentry logging verification
 * Visit: /api/test/logging to trigger test logs
 */
export const GET: APIRoute = async () => {
  try {
    // Test console.error (will be captured automatically)
    console.error('Test console.error - This should appear in Sentry Logs');

    // Test structured logging
    logInfo('Test info log', {
      test: true,
      timestamp: new Date().toISOString(),
      endpoint: '/api/test/logging',
    });

    logWarning('Test warning log', {
      test: true,
      message: 'This is a test warning',
    });

    logError('Test error log', {
      test: true,
      severity: 'high',
      action: 'verification',
    });

    logDebug('Test debug log', {
      test: true,
      details: 'Debug information',
    });

    // Simulate an error with console.error
    const testError = new Error('Test error object');
    console.error('Error caught during test:', testError);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Test logs sent to Sentry',
        timestamp: new Date().toISOString(),
        logs_sent: [
          'console.error (captured automatically)',
          'Sentry.logger.info',
          'Sentry.logger.warn',
          'Sentry.logger.error',
          'Sentry.logger.debug',
        ],
        next_steps: [
          '1. Check Sentry dashboard → Logs section',
          '2. Look for logs with test: true attribute',
          '3. Verify console.error entries appear',
        ],
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Logging test endpoint error:', error);

    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
