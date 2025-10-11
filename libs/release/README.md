# @famiglio/release

A modular library for automating releases in repositories using different release tools.

## Features

- Automatically detects the release "flavor" of a repository:
  - Nx
  - Lerna
  - Release-It
  - Manual fallback
- Unified release workflow via `ReleaseRunner`.
- Safe error handling with `ReleaseError` and `AdapterError`.
- Extensible: add custom adapters for new release tools.
- Logging via `@famiglio/core/logger`.

## Installation

```bash
npm install @famiglio/release
```

## Usage

```ts
import { ReleaseRunner } from '@famiglio/release';

const runner = new ReleaseRunner('/path/to/repo');
await runner.run();
```

## Creating Custom Adapters

Implement the `ReleaseAdapter` interface:

```ts
import type { ReleaseAdapter } from '@famiglio/release';

class MyAdapter implements ReleaseAdapter {
  async detect(repoPath: string): Promise<boolean> { ... }
  async release(): Promise<void> { ... }
  getName(): string { return 'my-adapter'; }
}
```

## Errors

- `ReleaseError` – thrown when a release fails.
- `AdapterError` – thrown when a flavor adapter encounters an error.

## License

MIT © [Famiglio](https://github.com/famiglio)
