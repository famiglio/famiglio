import { DEFAULT_GIT_BRANCH } from '../git.js';
import { DEFAULT_LOG_LEVEL, LogLevelEnum } from '../logger/schema.js';
import { DEFAULT_NODE_ENV, NodeEnvEnum } from '../node.js';
import { z } from 'zod';

export const EnvSchema = z.object({
  NODE_ENV: NodeEnvEnum.default(DEFAULT_NODE_ENV),
  LOG_LEVEL: LogLevelEnum.default(DEFAULT_LOG_LEVEL),
  GITHUB_REPOSITORY: z.string().optional(),
  GITHUB_BRANCH: z.string().default(DEFAULT_GIT_BRANCH),
});

export type Env = z.infer<typeof EnvSchema>;
export type EnvInput = z.input<typeof EnvSchema>;
export type EnvOut = z.output<typeof EnvSchema>;
