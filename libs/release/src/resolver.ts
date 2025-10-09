import { LernaReleaseAdapter } from './flavors/lerna.js';
import { ManualReleaseAdapter } from './flavors/manual.js';
import { NxReleaseAdapter } from './flavors/nx.js';
import { ReleaseItAdapter } from './flavors/release-it.js';
import type { ReleaseAdapter } from './types/release-adapter.js';

/**
 * Resolves the correct release adapter based on repository characteristics.
 *
 * @param {object} ctx - Context containing the repo path and configuration.
 * @param {string} ctx.repo - Path to the repository.
 * @returns {Promise<ReleaseAdapter | null>} The detected adapter instance, or null if none found.
 */
export async function resolveAdapter(ctx: {
  repo: string;
}): Promise<ReleaseAdapter | null> {
  const adapters = [
    NxReleaseAdapter,
    LernaReleaseAdapter,
    ReleaseItAdapter,
    ManualReleaseAdapter,
  ];

  for (const Adapter of adapters) {
    const instance = new Adapter();
    if (await instance.detect(ctx.repo)) return instance;
  }

  return null;
}
