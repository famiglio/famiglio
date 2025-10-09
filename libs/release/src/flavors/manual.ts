import type { ReleaseAdapter } from '../types/release-adapter.js';

/**
 * Manual fallback adapter.
 * Used when no supported or automated release tool (like Nx or release-it) is detected
 * in the project repository. This adapter indicates that the release must be performed
 * by manual human intervention.
 *
 * @implements {ReleaseAdapter}
 */
export class ManualReleaseAdapter implements ReleaseAdapter {
  /**
   * Always detects the 'manual' adapter as available.
   * Since this is the fallback, it should always be considered present if no other
   * adapter is found, ensuring a release process path is always available.
   *
   * @returns {Promise<boolean>} A promise that resolves to `true`, indicating the
   * manual fallback is always an option.
   */
  async detect(): Promise<boolean> {
    return true; // Always available as fallback
  }

  /**
   * Executes the manual release process, which primarily consists of logging a
   * message to the console.
   * This method performs no automatic actions (like tagging or publishing) and
   * serves as a placeholder to notify the user that they must proceed manually.
   *
   * @returns {Promise<void>} A promise that resolves after logging the manual
   * mode message.
   */
  async release(): Promise<void> {
    console.log('Manual release mode — no automation available.');
  }

  /**
   * Gets the unique name of this release adapter.
   *
   * @returns {string} The name of the adapter, which is 'manual'.
   */
  getName(): string {
    return 'manual';
  }
}
