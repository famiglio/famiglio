import { z } from 'zod';

export const NODE_ENVS = {
  DEVELOPMENT: 'development',
  TESTING: 'testing',
  STAGING: 'staging',
  PRODUCTION: 'production',
} as const;

const NODE_ENV_VALUES = Object.values(NODE_ENVS);

export const NodeEnvSchema = z.enum(NODE_ENV_VALUES);

export const NodeEnvEnum = NodeEnvSchema.enum;

export type NodeEnv = z.infer<typeof NodeEnvSchema>;

/**
 * Parses NODE_ENV value from process.env
 * @returns The parsed NODE_ENV.
 * @throws Error when not correctly defined.
 */
export function getNodeEnv(): NodeEnv {
  const result = NodeEnvSchema.safeParse(process.env.NODE_ENV);

  if (!result.success) {
    throw new Error('Incorrect NODE_ENV value', { cause: result.error });
  }

  return result.data;
}
