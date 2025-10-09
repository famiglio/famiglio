import { exec } from 'node:child_process';
import { promisify } from 'node:util';

import type { ReleaseAdapter } from '../types/release-adapter.js';

const execAsync = promisify(exec);

/**
 * Lerna flavor release adapter.
 * Executes `lerna version` for monorepo release management, handling version
 * bumping, Git tagging, and publication of changed packages.
 *
 * @implements {ReleaseAdapter}
 */
export class LernaReleaseAdapter implements ReleaseAdapter {
  /**
   * Detects if the current repository is a Lerna monorepo by checking for the
   * existence and execution of the `lerna` command via `npx`.
   *
   * @param {string} repoPath The path to the root of the repository.
   * @returns {Promise<boolean>} A promise that resolves to `true` if Lerna is
   * detected and executable, otherwise `false`.
   */
  async detect(repoPath: string): Promise<boolean> {
    try {
      // Attempt to run 'npx lerna --version'. A successful execution indicates
      // that Lerna is installed and accessible in the project.
      const { stdout } = await execAsync('npx lerna --version', {
        cwd: repoPath,
      });
      return stdout.trim().length > 0;
    } catch {
      // If the command fails (e.g., Lerna is not installed or the command is not
      // found), catch the error and return false.
      return false;
    }
  }

  /**
   * Executes the Lerna versioning and release process using the Lerna CLI.
   * The command typically handles version bumps across packages, creates Git tags,
   * and can optionally publish packages based on Lerna configuration.
   *
   * @returns {Promise<void>} A promise that resolves when the Lerna release
   * process is complete.
   */
  async release(): Promise<void> {
    // The '--yes' flag skips confirmation prompts, allowing the command to run
    // non-interactively, which is necessary for automated release pipelines.
    await execAsync('npx lerna version --yes');
  }

  /**
   * Gets the unique name of this release adapter.
   *
   * @returns {string} The name of the adapter, which is 'lerna'.
   */
  getName(): string {
    return 'lerna';
  }
}
