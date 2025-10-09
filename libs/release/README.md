# @famiglio/release

> A modular release automation toolkit for monorepos and single-package repositories.

`@famiglio/release` provides a unified interface for detecting and executing release workflows across multiple tools such as **Nx**, **Lerna**, and **Release-It** — with a **manual fallback** for custom setups.  
It’s designed to be extended easily with new “flavors” to match any release strategy.

---

## 🚀 Features

- 🔍 **Auto-detects** which release tool a repository uses.
- 🧩 **Adapter-based architecture** — Nx, Lerna, Release-It, and custom flavors.
- ⚙️ **Unified interface** for running releases programmatically.
- 🪶 **Lightweight & dependency-free** (only uses native Node APIs).
- 🧱 Ideal as a building block for higher-level orchestrators or GitHub Apps (like [Famiglio](https://github.com/famiglio)).

---

## Installation

```bash
npm install @famiglio/release
```

---

## Usage

```ts
import { resolveAdapter } from '@famiglio/release';

async function runRelease() {
  const adapter = await resolveAdapter({ repo: process.cwd() });

  if (!adapter) {
    console.error('No release adapter found.');
    process.exit(1);
  }

  console.log(`Detected adapter: ${adapter.getName()}`);
  await adapter.release();
}

runRelease();
```

---

## Flavors

| Adapter        | Detection method                     | Release command           |
| -------------- | ------------------------------------ | ------------------------- |
| **Nx**         | Detects `nx.json` or Nx CLI presence | `npx nx release --yes`    |
| **Lerna**      | Detects `lerna.json` or CLI presence | `npx lerna version --yes` |
| **Release-It** | Detects `release-it` config or CLI   | `npx release-it --ci`     |
| **Manual**     | Always available fallback            | Logs message only         |

---

## Extending with custom flavors

You can define your own adapter by implementing the `ReleaseAdapter` interface:

```ts
import { ReleaseAdapter } from '@famiglio/release';

export class MyCustomAdapter implements ReleaseAdapter {
  async detect(repoPath: string) {
    return repoPath.includes('my-custom-repo');
  }

  async release() {
    console.log('Running my custom release logic...');
  }

  getName() {
    return 'my-custom';
  }
}
```

Then register it in your own resolver or extend the default one.

---

## 🛡️ License

MIT © [Famiglio](https://github.com/famiglio)
