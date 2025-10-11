import { exec } from 'node:child_process';
import { promisify } from 'node:util';

import { logger } from '@famiglio/core/logger';
import { AdapterError } from '../errors/adapter-error.js';
import type { ReleaseAdapter } from '../types/release-adapter.js';

const execAsync = promisify(exec);

/**
 * Lerna flavor release adapter.
 * Executes `lerna version` to bump versions and tag releases.
 * @implements {ReleaseAdapter}
 */
export class LernaReleaseAdapter implements ReleaseAdapter {
  /**
   * Detects if Lerna is available in the repository by checking its version.
   * Uses `npx lerna --version`.
   * @param {string} repoPath - The root path of the repository to check.
   * @returns {Promise<boolean>} A promise that resolves to `true` if Lerna is detected, otherwise `false`.
   */
  async detect(repoPath: string): Promise<boolean> {
    try {
      const { stdout } = await execAsync('npx lerna --version', {
        cwd: repoPath,
      });
      logger.debug(`Lerna detected: ${stdout.trim()}`);
      return stdout.trim().length > 0;
    } catch (error) {
      logger.debug('Lerna not detected in repository', {
        repoPath,
        err: error,
      });
      return false;
    }
  }

  /**
   * Executes the Lerna release process using `npx lerna version --yes`.
   * The `--yes` flag skips all confirmation prompts.
   * @returns {Promise<void>} A promise that resolves when the Lerna release is complete.
   * @throws {AdapterError} If the Lerna command fails to execute.
   */
  async release(): Promise<void> {
    try {
      logger.info('Starting Lerna release...');
      // Execute lerna version with --yes to accept all changes without prompting
      await execAsync('npx lerna version --yes');
      logger.info('Lerna release completed successfully.');
    } catch (error) {
      logger.error('Lerna release failed', { err: error });
      // Wrap the error in an AdapterError for standardized error handling
      throw new AdapterError('Lerna release execution failed', {
        cause: error,
      });
    }
  }

  /**
   * Gets the name of the release adapter.
   * @returns {string} The string `'lerna'`.
   */
  getName(): string {
    return 'lerna';
  }
}
