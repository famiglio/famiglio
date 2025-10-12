import { z } from 'zod';

/**
 * Supported log levels for Famiglio logger.
 */
export const LOG_LEVELS = [
  'trace',
  'debug',
  'info',
  'warn',
  'error',
  'fatal',
] as const;

/**
 * Zod schema to validate a log level string.
 */
export const LogLevelSchema = z.enum(LOG_LEVELS);

/**
 * Exported enum-like object for easier access to log levels.
 */
export const LogLevelEnum = LogLevelSchema.enum;

/**
 * Type representing a valid log level.
 */
export type LogLevel = z.infer<typeof LogLevelSchema>;

/**
 * Default log level used when LOG_LEVEL is not provided.
 */
export const DEFAULT_LOG_LEVEL = LogLevelEnum.info;
