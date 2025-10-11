import { AppError } from '@famiglio/core/errors';

/**
 * Thrown when a release adapter fails to detect or execute properly.
 * @augments {AppError}
 */
export class AdapterError extends AppError {
  /**
   * Creates an instance of AdapterError.
   * @param {string} message - A human-readable description of the error.
   * @param {Record<string, unknown>} [context] - Optional context data related to the error.
   */
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, context);
    this.name = 'AdapterError';
  }
}
