import {
  DEFAULT_LOG_LEVEL,
  type LogLevel,
  LogLevelSchema,
} from './log-level.js';

/**
 * Parses the log level from `process.env.LOG_LEVEL`.
 * @returns {LogLevel} The validated log level string (e.g., `"info"`, `"debug"`).
 * @throws {Error} When the LOG_LEVEL is invalid or not recognized by the schema.
 */
export function getLogLevel(): LogLevel {
  const rawLevel = process.env.LOG_LEVEL ?? DEFAULT_LOG_LEVEL;

  const result = LogLevelSchema.safeParse(rawLevel);

  if (!result.success) {
    throw new Error('Invalid Log Level', { cause: result.error });
  }

  return result.data;
}
