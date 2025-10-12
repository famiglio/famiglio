import { BaseError } from './base-error.js';

/**
 * Custom error class specifically for **configuration failures**.
 * It automatically sets the machine-readable error `code` to `'CONFIG_ERROR'`.
 * Use this error when there's an issue loading, parsing, or applying application settings,
 * environmental variables, or other configuration files.
 */
export class ConfigError extends BaseError {
  /**
   * Creates an instance of ConfigError.
   * @param message The human-readable error message detailing the configuration problem.
   * @param cause Optional original error or value that triggered the configuration failure (e.g., a file system error).
   * @param context Optional additional context, such as the path to the invalid config file or the specific setting that failed.
   */
  constructor(message: string, cause?: unknown, context?: unknown) {
    super(message, {
      code: 'CONFIG_ERROR',
      cause,
      context,
    });
  }
}
