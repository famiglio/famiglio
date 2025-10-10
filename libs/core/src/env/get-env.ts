import { type EnvOut, EnvSchema } from './schema.js';
import { EnvError } from '../errors/env-error.js';

/**
 * Loads and validates environment variables using Zod schema.
 *
 * @throws {EnvError} If environment validation fails.
 * @returns {EnvOut} The validated and parsed environment object.
 */
export function getEnv(): EnvOut {
  const parsed = EnvSchema.safeParse(process.env);

  if (!parsed.success) {
    throw new EnvError('Unable to parse environment variables', parsed.error);
  }

  return parsed.data;
}
