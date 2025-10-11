import { exec } from 'node:child_process';
import { promisify } from 'node:util';

import { logger } from '@famiglio/core/logger';
import { AdapterError } from '../errors/adapter-error.js';
import type { ReleaseAdapter } from '../types/release-adapter.js';

const execAsync = promisify(exec);

/**
 * Release-It flavor adapter.
 * Executes automated release using the `release-it` CLI and its configuration.
 * @implements {ReleaseAdapter}
 */
export class ReleaseItAdapter implements ReleaseAdapter {
  /**
   * Detects if Release-It is available in the repository by checking its version.
   * Uses `npx release-it --version`.
   * @param {string} repoPath - The root path of the repository to check.
   * @returns {Promise<boolean>} A promise that resolves to `true` if Release-It is detected, otherwise `false`.
   */
  async detect(repoPath: string): Promise<boolean> {
    try {
      const { stdout } = await execAsync('npx release-it --version', {
        cwd: repoPath,
      });
      logger.debug(`release-it detected: ${stdout.trim()}`);
      return stdout.trim().length > 0;
    } catch (error) {
      logger.debug('release-it not detected in repository', {
        repoPath,
        err: error,
      });
      return false;
    }
  }

  /**
   * Executes the automated release using the Release-It CLI with the `--ci` flag.
   * The `--ci` flag runs Release-It in CI mode, skipping interactive prompts.
   * @returns {Promise<void>} A promise that resolves when the Release-It process is complete.
   * @throws {AdapterError} If the Release-It command fails to execute.
   */
  async release(): Promise<void> {
    try {
      logger.info('Starting release-it process...');
      // Execute release-it with the --ci flag for non-interactive mode
      await execAsync('npx release-it --ci');
      logger.info('release-it process completed successfully.');
    } catch (error) {
      logger.error('release-it release failed', { err: error });
      // Wrap the error in an AdapterError for standardized error handling
      throw new AdapterError('release-it release execution failed', {
        cause: error,
      });
    }
  }

  /**
   * Gets the name of the release adapter.
   * @returns {string} The string `'release-it'`.
   */
  getName(): string {
    return 'release-it';
  }
}
