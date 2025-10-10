import { z } from 'zod';

export const LOG_LEVELS = ['debug', 'info', 'warn', 'error'] as const;

export const LogLevelEnum = z.enum(LOG_LEVELS);

export const DEFAULT_LOG_LEVEL = LogLevelEnum.enum.info;

export const DEFAULT_LOG_PATH = 'logs/app.log';
