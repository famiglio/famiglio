# @famiglio/github

This library provides utilities for automating GitHub operations for Nx-based projects.  
It is primarily used by the **Famiglio GitHub App** to orchestrate releases, branches, pull requests, and optional post-release processing.

## Table of Contents

1. [Installation](#installation)
2. [Environment Variables](#environment-variables)
3. [Usage](#usage)
   - [Release Handler](#release-handler)
   - [GitHub Client](#github-client)
   - [Branch and Pull Request Utilities](#branch-and-pull-request-utilities)
   - [Release Utilities](#release-utilities)
4. [License](#license)

---

## Installation

```bash
npm install @famiglio/github
```

---

## Environment Variables

- `GITHUB_TOKEN` – Personal Access Token (optional, if not using a GitHub App)
- `GITHUB_APP_ID` – GitHub App ID
- `GITHUB_APP_PRIVATE_KEY` – GitHub App private key (PEM format)
- `GITHUB_INSTALLATION_ID` – GitHub App installation ID

---

## Usage

### Release Handler

```ts
import { releaseHandler } from '@famiglio/github';

const summary = await releaseHandler({
  cwd: process.cwd(),
  dryRun: false,
  github: { token: process.env.GITHUB_TOKEN },
  onSuccess: (summary) => {
    console.log(`Released version ${summary.version}`);
  },
});
```

The `releaseHandler` wraps `nx release` and provides a summary including `version`, `tag`, and `changelog`.

---

### GitHub Client

```ts
import { getGithubClient } from '@famiglio/github';

const client = await getGithubClient({
  token: process.env.GITHUB_TOKEN,
});
```

Or using a GitHub App:

```ts
import { getGithubClient } from '@famiglio/github';

const client = await getGithubClient({
  app: {
    appId: process.env.GITHUB_APP_ID!,
    privateKey: process.env.GITHUB_APP_PRIVATE_KEY!,
    installationId: process.env.GITHUB_INSTALLATION_ID!,
  },
});
```

---

### Branch and Pull Request Utilities

```ts
import { createBranch, createPullRequest } from '@famiglio/github';

await createBranch(client, 'famiglio', 'famiglio', 'main', 'release');
const pr = await createPullRequest(
  client,
  'famiglio',
  'famiglio',
  'release',
  'main',
  'Release v1.0.0'
);
console.log(pr.data.html_url);
```

---

### Release Utilities

```ts
import { getReleaseByTag } from '@famiglio/github';

const release = await getReleaseByTag(client, 'famiglio', 'famiglio', 'v1.0.0');
console.log(release.data.html_url);
```

---

## License

MIT
