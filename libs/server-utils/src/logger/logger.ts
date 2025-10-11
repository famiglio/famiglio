import pino, { type TransportTargetOptions } from 'pino';

import { getNodeEnv, NodeEnvEnum } from '@famiglio/core';
import { getLogLevel } from './get-log-level.js';

const NODE_ENV = getNodeEnv();
const isProduction = NODE_ENV === NodeEnvEnum.production;

/**
 * Pretty-printing transport configuration for development.
 */
const developmentTransport: TransportTargetOptions = {
  target: 'pino-pretty',
  options: {
    colorize: true,
    levelFirst: true,
    translateTime: 'SYS:standard',
    ignore: 'pid,hostname', // typo fixed here: "hotsname" → "hostname"
  },
};

/**
 * Centralized application logger.
 * Automatically adapts formatting and output based on NODE_ENV.
 *
 * In development:
 *  - Uses `pino-pretty` for human-readable logs.
 *  - Includes colors and time translation.
 *
 * In production:
 *  - Outputs JSON logs for structured ingestion.
 *  - Omits unnecessary metadata.
 */
export const logger = pino({
  level: getLogLevel(),
  base: isProduction ? { pid: undefined } : {},
  timestamp: isProduction
    ? () => `,"time":"${new Date().toISOString()}"`
    : true,
  transport: isProduction ? undefined : developmentTransport,
});
