import { AppError } from './app-error.js';

/**
 * Represents a configuration or environment variable validation error.
 *
 * This error is thrown when `getEnv` fails to validate environment variables.
 *
 * @example
 * ```ts
 * import { getEnv } from "../env/get-env.js";
 *
 * try {
 *   const env = getEnv();
 * } catch (error) {
 *   if (error instanceof EnvError) {
 *     logger.error("Invalid environment configuration", { cause: error.cause });
 *     process.exit(1);
 *   }
 * }
 * ```
 */
export class EnvError extends AppError {
  /**
   * Creates a new {@link EnvError} instance.
   *
   * @param message - Description of the environment error.
   * @param cause - Optional underlying cause (e.g., ZodError).
   */
  constructor(message: string, cause?: unknown) {
    super(message, { cause });
    this.name = 'EnvError';
  }
}
