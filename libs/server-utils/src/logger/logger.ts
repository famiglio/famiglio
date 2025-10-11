import pino from 'pino';
import pretty from 'pino-pretty';

import { DEFAULT_LOGGER_LEVEL } from './schema.js';

const stream = pretty({
  colorize: true,
});

export const logger = pino({ level: DEFAULT_LOGGER_LEVEL }, stream);
