# @famiglio/server-utils

> Core **server-side utilities** for Famiglio services.

This library provides foundational server helpers — including logging utilities, environment helpers, and other low-level server tools designed for consistent use across Famiglio backend modules.

## Logger

A Pino-based logger configured for development and production environments.  
Automatically reads `NODE_ENV` and `LOG_LEVEL` from the environment, validating them through `@famiglio/core` and `zod`.

### Features

- Colorized, human-readable logs in development
- JSON logs in production
- Configurable log level via `LOG_LEVEL`
- Integrated validation and error handling

### Usage

```ts
import { logger } from '@famiglio/server-utils/logger';

logger.info('Example log message.');
logger.warn('This might need attention.');
logger.error('Something went wrong.');
```

Example output (development mode):

```bash
[2025-10-11 14:32:10] INFO Example log message.
```

### Environment variables

| Variable    | Description                                                | Default       |
| ----------- | ---------------------------------------------------------- | ------------- |
| `NODE_ENV`  | Application environment                                    | `development` |
| `LOG_LEVEL` | Logging verbosity (`info`, `debug`, `warn`, `error`, etc.) | `info`        |

## ✦ Dependencies

- [`pino`](https://github.com/pinojs/pino) – fast, structured logging
- [`@famiglio/core`](https://github.com/famiglio/core) – environment handling
- [`@famiglio/errors`](https://github.com/famiglio/errors) – structured error system

---

## License

Apache-2.0 © 2025 [Davide Di Criscito](https://github.com/famiglio)
