import type { Octokit } from '@octokit/rest';

/**
 * Retrieves a GitHub release by its tag name.
 *
 * @param {Octokit} octokit - Authenticated Octokit client.
 * @param {string} owner - Repository owner.
 * @param {string} repo - Repository name.
 * @param {string} tag - Tag name (e.g., v1.0.0).
 * @example
 * ```ts
 * const release = await getReleaseByTag(client, "famiglio", "famiglio", "v1.0.0");
 * console.log(release.data.html_url);
 * ```
 * @returns {Promise<ReturnType<Octokit["repos"]["getReleaseByTag"]>>} The release data.
 * @throws {Error} If the release is not found.
 */
export async function getReleaseByTag(
  octokit: Octokit,
  owner: string,
  repo: string,
  tag: string
): Promise<ReturnType<Octokit['repos']['getReleaseByTag']>> {
  return octokit.repos.getReleaseByTag({ owner, repo, tag });
}
