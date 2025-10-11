import { logger } from '@famiglio/core/logger';
import { ReleaseError } from './errors/release-error.js';
import { resolveAdapter } from './resolver.js';

/**
 * Executes a full release workflow for the given repository.
 *
 * @param repoPath - The absolute path to the repository.
 * @throws {ReleaseError} If the release process fails.
 */
export async function runRelease(repoPath: string): Promise<void> {
  logger.info(`Starting release process for repo: ${repoPath}`);

  try {
    const adapter = await resolveAdapter({ repo: repoPath });
    logger.info(`Using adapter: ${adapter.getName()}`);

    await adapter.release();
    logger.info('Release completed successfully.');
  } catch (error) {
    logger.error('Release failed', error);
    throw new ReleaseError('Release process failed', { cause: error });
  }
}
