import { exec } from 'node:child_process';
import { promisify } from 'node:util';

import type { ReleaseAdapter } from '../types/release-adapter.js';

const execAsync = promisify(exec);

/**
 * Release-It flavor adapter.
 * Uses release-it configuration from the project root to manage the release process.
 *
 * @implements {ReleaseAdapter}
 */
export class ReleaseItAdapter implements ReleaseAdapter {
  /**
   * Detects if the current repository is configured to use 'release-it'
   * by checking for the existence and execution of the `release-it` command.
   *
   * @param {string} repoPath The path to the root of the repository.
   * @returns {Promise<boolean>} A promise that resolves to `true` if 'release-it'
   * is detected and executable via `npx`, otherwise `false`.
   */
  async detect(repoPath: string): Promise<boolean> {
    try {
      // Attempt to run 'npx release-it --version'. If successful, stdout will
      // contain the version string, indicating 'release-it' is available.
      const { stdout } = await execAsync('npx release-it --version', {
        cwd: repoPath,
      });
      return stdout.trim().length > 0;
    } catch {
      // If the command fails (e.g., 'release-it' is not installed or not found),
      // catch the error and return false.
      return false;
    }
  }

  /**
   * Executes the release process using the 'release-it' CLI command.
   * This command reads the project's configuration to handle version bumping,
   * Git tagging, generating changelogs, and publishing packages.
   *
   * @returns {Promise<void>} A promise that resolves when the 'release-it'
   * process is complete.
   */
  async release(): Promise<void> {
    // The '--ci' flag enables CI mode, which bypasses interactive prompts and
    // ensures the process runs non-interactively.
    await execAsync('npx release-it --ci');
  }

  /**
   * Gets the unique name of this release adapter.
   *
   * @returns {string} The name of the adapter, which is 'release-it'.
   */
  getName(): string {
    return 'release-it';
  }
}
