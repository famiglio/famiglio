/**
 * Represents a generic application error with optional context metadata.
 *
 * Use this class as the base for all domain-level and infrastructure-level errors
 * that should include additional debugging information in the `context` property.
 *
 * @example
 * ```ts
 * throw new AppError("Database connection failed", { host, port });
 * ```
 */
export class AppError extends Error {
  /**
   * Optional contextual information about the error.
   */
  context?: Record<string, unknown>;

  /**
   * Creates a new {@link AppError}.
   *
   * @param message - Human-readable error message.
   * @param context - Optional structured context for debugging or logging.
   */
  constructor(message: string, context?: Record<string, unknown>) {
    super(message);
    this.name = 'AppError';
    this.context = context;
  }
}
