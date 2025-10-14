# @famiglio/errors

> Custom error classes for the Famiglio ecosystem.

This library defines a unified error system for all Famiglio packages and services.  
It provides structured, serializable, and catchable error types to ensure consistent handling across CLI tools, APIs, and background workers.

---

## Overview

`@famiglio/errors` introduces a `BaseError` class that extends the native `Error` object, adding structured metadata such as:

- `code`: a machine-readable error identifier.
- `cause`: an optional underlying cause (e.g., a thrown error or validation result).
- `context`: additional debugging or runtime information.

All other Famiglio error types — such as `ValidationError` or `ConfigError` — extend from `BaseError`.

## Installation

```bash
npm install @famiglio/errors
```

## Usage

```ts
import { ValidationError } from '@famiglio/errors';
import {
  DEFAULT_LOG_LEVEL,
  LOG_LEVELS,
  type LogLevel,
  LogLevelSchema,
} from './log-level.js';

/**
 * Parses the log level from `process.env.LOG_LEVEL`.
 * @returns {LogLevel} The validated log level string (e.g., `"info"`, `"debug"`).
 * @throws {ValidationError} When the LOG_LEVEL is invalid or not recognized by the schema.
 */
export function getLogLevel(): LogLevel {
  const rawLevel = process.env.LOG_LEVEL ?? DEFAULT_LOG_LEVEL;
  const result = LogLevelSchema.safeParse(rawLevel);

  if (!result.success) {
    throw new ValidationError(
      'Invalid LOG_LEVEL environment variable',
      result.error,
      {
        provided: rawLevel,
        expected: LOG_LEVELS.join(' | '),
      }
    );
  }

  return result.data;
}
```

Each error can be safely serialized and logged:

```ts
import { logger } from '@famiglio/core/logger';

try {
  getLogLevel();
} catch (err) {
  if (err instanceof ValidationError) {
    logger.error(err.toJSON());
  }
}
```

Output example (via Pino):

```json
{
  "name": "ValidationError",
  "code": "VALIDATION_ERROR",
  "message": "Invalid LOG_LEVEL environment variable",
  "context": { "provided": "verbose" }
}
```

## Available Errors

| Class             | Code               | Description                                 |
| ----------------- | ------------------ | ------------------------------------------- |
| `BaseError`       | —                  | Abstract base class for all Famiglio errors |
| `ValidationError` | `VALIDATION_ERROR` | Schema or data validation failure           |
| `ConfigError`     | `CONFIG_INVALID`   | Invalid or missing configuration            |

## Extending

You can define new Famiglio-specific error types by extending `BaseError`:

```ts
import { BaseError } from '@famiglio/errors';

export class AuthError extends BaseError {
  constructor(message: string, cause?: unknown, context?: unknown) {
    super(message, {
      code: 'AUTH_FAILURE',
      cause,
      context,
    });
  }
}
```

---

## License

Apache-2.0 © 2025 [Davide Di Criscito](https://github.com/famiglio)
