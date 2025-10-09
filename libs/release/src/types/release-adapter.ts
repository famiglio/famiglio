/**
 * Base interface for all release adapters.
 * Each flavor (Nx, Lerna, Release-It, Manual) must implement this.
 */
export interface ReleaseAdapter {
  /** Detects if this adapter applies to the given repository. */
  detect(repoPath: string): Promise<boolean>;

  /** Executes the release workflow. */
  release(): Promise<void>;

  /** Returns the name of the adapter. */
  getName(): string;
}
