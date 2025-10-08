import { createAppAuth } from '@octokit/auth-app';
import { Octokit } from '@octokit/rest';

import type { GitHubAuthConfig } from './types.js';

/**
 * Creates an authenticated Octokit client using a GitHub App or personal token.
 *
 * @param {Object} options - Configuration for authentication.
 * @param {string} [options.token] - A GitHub personal access token.
 * @param {GitHubAuthConfig} [options.app] - GitHub App credentials.
 * @example
 * ```ts
 * const client = await getGithubClient({
 *   app: {
 *     appId: process.env.GITHUB_APP_ID!,
 *     privateKey: process.env.GITHUB_APP_PRIVATE_KEY!,
 *     installationId: process.env.GITHUB_INSTALLATION_ID!,
 *   },
 * });
 * ```
 * @returns {Promise<Octokit>} An authenticated Octokit instance.
 * @throws {Error} If no valid authentication configuration is provided.
 */
export async function getGithubClient(options: {
  token?: string;
  app?: GitHubAuthConfig;
}): Promise<Octokit> {
  if (options.token) {
    return new Octokit({ auth: options.token });
  }

  if (options.app) {
    const { appId, privateKey, installationId } = options.app;
    return new Octokit({
      authStrategy: createAppAuth,
      auth: { appId, privateKey, installationId },
    });
  }

  throw new Error('No valid GitHub authentication configuration provided.');
}
