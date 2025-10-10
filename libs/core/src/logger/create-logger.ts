import fs from 'node:fs';
import path from 'node:path';

import pino from 'pino';

import { DEFAULT_LOG_LEVEL, DEFAULT_LOG_PATH } from './schema.js';

/**
 * Creates a configured pino logger that writes to both stdout and a log file.
 */
export function createLogger(options?: {
  level?: string;
  logPath?: string;
  pretty?: boolean;
}) {
  const logLevel = options?.level || process.env.LOG_LEVEL || DEFAULT_LOG_LEVEL;
  const logPath = options?.logPath || process.env.LOG_PATH || DEFAULT_LOG_PATH;

  // Ensure log directory exists
  const dir = path.dirname(logPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  // Create file stream
  const fileStream = fs.createWriteStream(logPath, { flags: 'a' });

  // Configure transports
  const streams = [{ stream: process.stdout }, { stream: fileStream }];

  // Pretty print for local development
  const transport =
    options?.pretty || process.env.NODE_ENV === 'development'
      ? {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'SYS:standard',
            ignore: 'pid,hostname',
          },
        }
      : undefined;

  const logger = pino(
    {
      level: logLevel,
      transport,
    },
    pino.multistream(streams)
  );

  return logger;
}
