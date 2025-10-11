import { AppError } from '@famiglio/core/errors';

/**
 * Thrown when a release process fails due to configuration or runtime issues.
 * @augments {AppError}
 */
export class ReleaseError extends AppError {
  /**
   * Creates an instance of ReleaseError.
   * @param {string} message - A human-readable description of the error.
   * @param {Record<string, unknown>} [context] - Optional context data to include with the error.
   */
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, context);
    this.name = 'ReleaseError';
  }
}
