import { exec } from 'node:child_process';
import { promisify } from 'node:util';

import { logger } from '@famiglio/core/logger';
import { AdapterError } from '../errors/adapter-error.js';
import type { ReleaseAdapter } from '../types/release-adapter.js';

const execAsync = promisify(exec);

/**
 * Nx flavor release adapter.
 * Handles automatic release workflows using Nx CLI commands.
 * @implements {ReleaseAdapter}
 */
export class NxReleaseAdapter implements ReleaseAdapter {
  /**
   * Detects if Nx is available in the repository by checking its version.
   * Uses `nx --version`.
   * @param {string} repoPath - The root path of the repository to check.
   * @returns {Promise<boolean>} A promise that resolves to `true` if Nx is detected, otherwise `false`.
   */
  async detect(repoPath: string): Promise<boolean> {
    try {
      const { stdout } = await execAsync('nx --version', { cwd: repoPath });
      logger.debug(`Nx detected: ${stdout.trim()}`);
      return stdout.trim().length > 0;
    } catch (error) {
      logger.debug('Nx not detected in repository', { repoPath, err: error });
      return false;
    }
  }

  /**
   * Executes the Nx release process using `npx nx release --first-release --yes`.
   * The `--yes` flag skips confirmation prompts, and `--first-release` may be used
   * for an initial release.
   * @returns {Promise<void>} A promise that resolves when the Nx release is complete.
   * @throws {AdapterError} If the Nx command fails to execute.
   */
  async release(): Promise<void> {
    try {
      logger.info('Starting Nx release...');
      // Execute Nx release command. Note: --first-release might be optional depending on the context.
      await execAsync('npx nx release --first-release --yes');
      logger.info('Nx release completed successfully.');
    } catch (error) {
      logger.error('Nx release failed', { err: error });
      // Wrap the error in an AdapterError for standardized error handling
      throw new AdapterError('Nx release execution failed', { cause: error });
    }
  }

  /**
   * Gets the name of the release adapter.
   * @returns {string} The string `'nx'`.
   */
  getName(): string {
    return 'nx';
  }
}
