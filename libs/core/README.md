# @famiglio/core

Shared utilities for all Famiglio packages.  
Provides structured logging, environment validation, and consistent error handling.

## Features

- JSON logger writing both to **stdout** and **local file** (default: `logs/app.log`)
- Zod-based environment validation
- Unified error utilities (`AppError`, `wrapError`)
- Constants and defaults used across the ecosystem

## Example

```ts
import { getEnv } from '@famiglio/core/env';
import { logger } from '@famiglio/core/logger';

try {
  const env = getEnv();
  logger.info('Environment loaded', env);
} catch (error) {
  if (error instanceof EnvError) {
    logger.error('Invalid environment configuration', error.context);
    process.exit(1);
  }
  throw error; // unknown fatal
}
```

## Environment Variables

| Name                | Description    | Default       |
| ------------------- | -------------- | ------------- |
| `NODE_ENV`          | Environment    | `development` |
| `LOG_LEVEL`         | Logging level  | `info`        |
| `GITHUB_REPOSITORY` | Repo name      | —             |
| `GITHUB_BRANCH`     | Current branch | `main`        |

## License

MIT © [Famiglio](https://github.com/famiglio)
