import { z } from 'zod';

export const LOG_LEVELS = {
  TRACE: 'trace',
  DEBUG: 'debug',
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error',
  FATAL: 'fatal',
} as const;

const LOG_LEVEL_VALUES = Object.values(LOG_LEVELS);

export const LoggerLevelSchema = z.enum(
  LOG_LEVEL_VALUES as [string, ...string[]]
);

export const LoggerLevelEnum = LoggerLevelSchema.enum;

export const DEFAULT_LOGGER_LEVEL = LoggerLevelEnum.info;
