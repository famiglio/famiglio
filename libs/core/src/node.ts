import { z } from 'zod';

/**
 * List of allowed NODE_ENV values.
 * Values other then those listed here must be used in another `env` const such as AAP_ENV.
 */
export const NODE_ENVS = ['production', 'development', 'test'] as const;

export const NodeEnvEnum = z.enum(NODE_ENVS);

export type NodeEnv = z.infer<typeof NodeEnvEnum>;

export const DEFAULT_NODE_ENV = NodeEnvEnum.enum.development;
