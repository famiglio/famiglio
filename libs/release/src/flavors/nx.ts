import { exec } from 'node:child_process';
import { promisify } from 'node:util';

import type { ReleaseAdapter } from '../types/release-adapter.js';

const execAsync = promisify(exec);

/**
 * Nx flavor release adapter.
 * Uses Nx CLI to handle tagging, changelogs, and GitHub releases automatically.
 *
 * @implements {ReleaseAdapter}
 */
export class NxReleaseAdapter implements ReleaseAdapter {
  /**
   * Detects if the current repository is an Nx workspace by checking for the
   * existence and execution of the `nx` command.
   *
   * @param {string} repoPath The path to the root of the repository.
   * @returns {Promise<boolean>} A promise that resolves to `true` if Nx is
   * detected and accessible, otherwise `false`.
   */
  async detect(repoPath: string): Promise<boolean> {
    try {
      // Attempt to run 'nx --version'. If successful, stdout will contain
      // the version string, indicating Nx is available.
      const { stdout } = await execAsync('nx --version', { cwd: repoPath });
      return stdout.trim().length > 0;
    } catch {
      // If the command fails (e.g., 'nx' is not found), catch the error and
      // return false.
      return false;
    }
  }

  /**
   * Executes the Nx release process using the Nx CLI command.
   * This typically handles version bumping, generating changelogs, tagging the
   * release, and publishing packages (if configured in the Nx workspace).
   *
   * @returns {Promise<void>} A promise that resolves when the Nx release
   * process is complete.
   */
  async release(): Promise<void> {
    // The '--yes' flag skips confirmation prompts.
    // The '--first-release' flag avoid errors in releasing eventual new projects.
    await execAsync('npx nx release --first-release --yes');
  }

  /**
   * Gets the unique name of this release adapter.
   *
   * @returns {string} The name of the adapter, which is 'nx'.
   */
  getName(): string {
    return 'nx';
  }
}
