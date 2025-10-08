import type { Octokit } from '@octokit/rest';

/**
 * Creates a new branch from an existing reference.
 *
 * @param {Octokit} octokit - Authenticated Octokit client.
 * @param {string} owner - Repository owner.
 * @param {string} repo - Repository name.
 * @param {string} from - Source branch name.
 * @param {string} branch - New branch name.
 * @example
 * ```ts
 * await createBranch(client, "famiglio", "famiglio", "main", "release");
 * ```
 * @returns {Promise<void>} Resolves when the branch is created.
 * @throws {Error} If the branch creation fails.
 */
export async function createBranch(
  octokit: Octokit,
  owner: string,
  repo: string,
  from: string,
  branch: string
): Promise<void> {
  const { data: ref } = await octokit.git.getRef({
    owner,
    repo,
    ref: `heads/${from}`,
  });

  await octokit.git.createRef({
    owner,
    repo,
    ref: `refs/heads/${branch}`,
    sha: ref.object.sha,
  });
}

/**
 * Creates a new pull request between two branches.
 *
 * @param {Octokit} octokit - Authenticated Octokit client.
 * @param {string} owner - Repository owner.
 * @param {string} repo - Repository name.
 * @param {string} head - Source branch.
 * @param {string} base - Target branch.
 * @param {string} title - Pull request title.
 * @param {string} [body] - Optional pull request description.
 * @example
 * ```ts
 * await createPullRequest(client, "famiglio", "famiglio", "release", "main", "Release v1.0.0");
 * ```
 * @returns {Promise<ReturnType<Octokit["pulls"]["create"]>>} The created pull request object.
 * @throws {Error} If the pull request creation fails.
 */
export async function createPullRequest(
  octokit: Octokit,
  owner: string,
  repo: string,
  head: string,
  base: string,
  title: string,
  body?: string
): Promise<ReturnType<Octokit['pulls']['create']>> {
  return octokit.pulls.create({ owner, repo, head, base, title, body });
}
