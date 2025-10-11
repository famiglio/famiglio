import { logger as defaultLogger } from '@famiglio/core/logger';
import { ReleaseError } from './errors/release-error.js';
import { resolveAdapter } from './resolver.js';
import type { ReleaseAdapter } from './types/release-adapter.js';

/**
 * Options for configuring the {@link ReleaseRunner}.
 */
export interface ReleaseRunnerOptions {
  /** Absolute path to the repository. */
  repoPath: string;

  /** If true, performs a dry run without actually releasing. */
  dryRun?: boolean;

  /** Custom logger to override the default logger. */
  logger?: typeof defaultLogger;
}

/**
 * Orchestrates the release workflow by detecting the appropriate release adapter
 * and executing the release logic.
 */
export class ReleaseRunner {
  private repoPath: string;
  private dryRun: boolean;
  private logger: typeof defaultLogger;

  /**
   * Creates an instance of ReleaseRunner.
   *
   * @param options Configuration options for the runner.
   * @throws {ReleaseError} If the repository path is not provided in options.
   */
  constructor(options: ReleaseRunnerOptions) {
    if (!options.repoPath) {
      throw new ReleaseError('Repository path must be provided.');
    }

    this.repoPath = options.repoPath;
    this.dryRun = options.dryRun ?? false;
    this.logger = options.logger ?? defaultLogger;
  }

  /**
   * Executes the full release workflow using the appropriate adapter.
   *
   * The process involves:
   * 1. Logging the start of the process.
   * 2. Resolving a suitable {@link ReleaseAdapter} based on the repository path.
   * 3. Logging the detected adapter.
   * 4. If `dryRun` is false, calling the adapter's `release()` method.
   * 5. Logging completion or re-throwing a wrapped {@link ReleaseError} on failure.
   *
   * @async
   * @returns {Promise<void>} A Promise that resolves when the release workflow is complete.
   * @throws {ReleaseError} If no adapter is found or the release fails. The cause of a failure
   * during release will be wrapped in the thrown error.
   */
  public async run(): Promise<void> {
    this.logger.info(`Starting release process for repo: ${this.repoPath}`);
    try {
      const adapter: ReleaseAdapter | null = await resolveAdapter({
        repo: this.repoPath,
      });

      if (!adapter) {
        this.logger.error('No release adapter detected.');
        throw new ReleaseError(
          'No suitable release adapter found for this repository.'
        );
      }

      this.logger.info(`Detected adapter: ${adapter.getName()}`);

      if (this.dryRun) {
        this.logger.info('Dry run enabled — skipping actual release.');
      } else {
        await adapter.release();
        this.logger.info('Release completed successfully.');
      }
    } catch (error: unknown) {
      this.logger.error('Release process encountered an error.');
      throw new ReleaseError('Release process failed.', { cause: error });
    }
  }
}
