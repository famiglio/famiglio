import { z } from 'zod';

import { logger } from '@famiglio/core/logger';
import { AdapterError } from './errors/adapter-error.js';
import { LernaReleaseAdapter } from './flavors/lerna.js';
import { ManualReleaseAdapter } from './flavors/manual.js';
import { NxReleaseAdapter } from './flavors/nx.js';
import { ReleaseItAdapter } from './flavors/release-it.js';
import type { ReleaseAdapter } from './types/release-adapter.js';

const ResolverSchema = z.object({
  repo: z.string().min(1, 'Repository path is required'),
});

/**
 * Resolves the correct release adapter based on repository characteristics.
 *
 * @param ctx - Context containing the repo path and configuration.
 * @returns The detected adapter instance, or throws if none found.
 * @throws {AdapterError}
 */
export async function resolveAdapter(ctx: {
  repo: string;
}): Promise<ReleaseAdapter> {
  const parsed = ResolverSchema.safeParse(ctx);
  if (!parsed.success) {
    throw new AdapterError('Invalid resolver context', { cause: parsed.error });
  }

  const adapters = [
    NxReleaseAdapter,
    LernaReleaseAdapter,
    ReleaseItAdapter,
    ManualReleaseAdapter,
  ];

  for (const Adapter of adapters) {
    const instance = new Adapter();
    logger.debug(`Detecting adapter: ${instance.getName()}`);
    const detected = await instance.detect(parsed.data.repo);

    if (detected) {
      logger.info(`Adapter detected: ${instance.getName()}`);
      return instance;
    }
  }

  throw new AdapterError('No release adapter could be detected', {
    repo: parsed.data.repo,
  });
}
