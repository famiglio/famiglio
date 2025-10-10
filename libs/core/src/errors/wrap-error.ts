import { AppError } from './app-error.js';

/**
 * Wraps an existing error into an AppError with extra context.
 */
export function wrapError(
  error: unknown,
  context?: Record<string, unknown>
): AppError {
  if (error instanceof AppError) {
    if (context) Object.assign((error.context ??= {}), context);
    return error;
  }
  const err = new AppError(
    error instanceof Error ? error.message : String(error),
    context
  );
  return err;
}
