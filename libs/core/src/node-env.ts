import { z } from 'zod';

import { ValidationError } from '@famiglio/errors';

export const NODE_ENVS = [
  'development',
  'testing',
  'staging',
  'production',
] as const;

export const NodeEnvSchema = z.enum(NODE_ENVS);

export const NodeEnvEnum = NodeEnvSchema.enum;

export type NodeEnv = z.infer<typeof NodeEnvSchema>;

/**
 * Parses NODE_ENV value from process.env
 * @returns {NodeEnv} The validated NODE_ENV string.
 * @throws {ValidationError} Error when not correctly defined.
 */
export function getNodeEnv(): NodeEnv {
  const rawNodeEnv = process.env.NODE_ENV;
  const result = NodeEnvSchema.safeParse(rawNodeEnv);

  if (!result.success) {
    throw new ValidationError(
      'Incorrect NODE_ENV environment variable',
      result.error,
      {
        provided: rawNodeEnv,
        expected: NODE_ENVS.join('|'),
      }
    );
  }

  return result.data;
}
