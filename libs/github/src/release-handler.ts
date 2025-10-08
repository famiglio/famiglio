import { spawn } from 'node:child_process';

import { getGithubClient } from './github-client.js';
import type { ReleaseHandlerOptions, ReleaseSummary } from './types.js';

/**
 * Runs `nx release` programmatically, handles dry-run and post-release actions.
 *
 * @param {ReleaseHandlerOptions} options - Options for the release process.
 * @example
 * ```ts
 * const summary = await releaseHandler({
 *   cwd: process.cwd(),
 *   dryRun: false,
 *   github: { token: process.env.GITHUB_TOKEN },
 * });
 * console.log(summary.version);
 * ```
 * @returns {Promise<ReleaseSummary>} A summary containing version, tag, and changelog.
 * @throws {Error} If the Nx release process fails.
 */
export async function releaseHandler(
  options: ReleaseHandlerOptions = {}
): Promise<ReleaseSummary> {
  const args = ['release'];
  if (options.dryRun) args.push('--dry-run');
  args.push('--yes');

  const stdout: string[] = [];
  const stderr: string[] = [];

  await new Promise<void>((resolve, reject) => {
    const process = spawn('nx', args, { cwd: options.cwd, shell: true });

    process.stdout.on('data', (data) => stdout.push(data.toString()));
    process.stderr.on('data', (data) => stderr.push(data.toString()));

    process.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Nx release failed: ${stderr.join('')}`));
      }
    });
  });

  const versionMatch = stdout.join('').match(/v?(\d+\.\d+\.\d+)/);
  const version = versionMatch?.[1] ?? 'unknown';
  const tag = `v${version}`;
  const changelog = stdout.join('');

  const summary: ReleaseSummary = { version, tag, changelog };

  if (options.github) {
    const client = await getGithubClient(options.github);
    const user = await client.rest.users.getAuthenticated();
    console.log(`Authenticated as ${user.data.login}`);
  }

  if (options.onSuccess) await options.onSuccess(summary);

  return summary;
}
