import { BaseError } from './base-error.js';

/**
 * Custom error class specifically for **validation failures**.
 * It automatically sets the machine-readable error `code` to `'VALIDATION_ERROR'`.
 * This provides a standard, easy-to-check error type for client-side input errors,
 * data integrity issues, or schema violations.
 */
export class ValidationError extends BaseError {
  /**
   * Creates an instance of ValidationError.
   * * @param message The human-readable error message detailing what failed validation.
   * @param cause Optional original error or value that triggered the validation failure (e.g., a ZodError).
   * @param context Optional additional context, such as the path to the invalid config file or the specific setting that failed.
   */
  constructor(message: string, cause?: unknown, context?: unknown) {
    super(message, {
      code: 'VALIDATION_ERROR',
      cause,
      context,
    });
  }
}
