import { z } from 'zod';

/**
 * Validation schema for GitHub App authentication configuration.
 */
export const GitHubAuthConfigSchema = z.object({
  appId: z.string(),
  privateKey: z.string(),
  installationId: z.string(),
});

/**
 * Type inferred from the GitHubAuthConfig schema.
 */
export type GitHubAuthConfig = z.infer<typeof GitHubAuthConfigSchema>;

/**
 * Configuration options for the release handler.
 */
export interface ReleaseHandlerOptions {
  /** Path to the workspace root where Nx commands will run */
  cwd?: string;
  /** Whether to run the release in dry-run mode (no side effects) */
  dryRun?: boolean;
  /** GitHub token or App configuration */
  github?: {
    token?: string;
    app?: GitHubAuthConfig;
  };
  /** Optional callback executed after a successful release */
  onSuccess?: (summary: ReleaseSummary) => void | Promise<void>;
}

/**
 * Information returned after a release run.
 */
export interface ReleaseSummary {
  version: string;
  tag: string;
  changelog: string;
}
