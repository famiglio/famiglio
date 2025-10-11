import { logger } from '@famiglio/core/logger';
import type { ReleaseAdapter } from '../types/release-adapter.js';

/**
 * Manual fallback adapter.
 * Used when no automatic release tool is detected in the repository.
 * @implements {ReleaseAdapter}
 */
export class ManualReleaseAdapter implements ReleaseAdapter {
  /**
   * Always detects as available since it's the manual fallback.
   * @returns {Promise<boolean>} A promise that resolves to `true`.
   */
  async detect(): Promise<boolean> {
    logger.debug('Manual release adapter always available as fallback.');
    return true;
  }

  /**
   * Logs a warning message twice, indicating that a manual release is required
   * because no automation is available. This method performs no automatic release action.
   * @returns {Promise<void>} A promise that resolves when the warnings have been logged.
   */
  async release(): Promise<void> {
    logger.warn('Manual release mode — no automation available.');
    logger.warn('Manual release mode — perform the release manually.');
  }

  /**
   * Gets the name of the release adapter.
   * @returns {string} The string `'manual'`.
   */
  getName(): string {
    return 'manual';
  }
}
