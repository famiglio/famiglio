# @famiglio/core

> Shared **core utilities** for the Famiglio ecosystem.

This package provides low-level utilities and constants that define how Famiglio operates across environments.  
It acts as a foundation layer for all other Famiglio libraries and services.

---

## Environment Management

### `getNodeEnv()`

Safely parses and validates the `NODE_ENV` environment variable using [`zod`](https://zod.dev/).  
If the value is invalid or missing, a `ValidationError` from `@famiglio/errors` is thrown.

#### Available environments

- `development`
- `testing`
- `staging`
- `production`

#### Example

```ts
import { getNodeEnv } from '@famiglio/core';
import { logger } from '@famiglio/server-utils/logger';

export const NODE_ENV = getNodeEnv();

if (NODE_ENV === 'development') {
  logger.info('Famiglio is running in development mode.');
}
```

If `process.env.NODE_ENV` contains an invalid value:

```bash
Incorrect NODE_ENV environment variable
```

The error will include detailed context such as:

```json
{
  "provided": "dev",
  "expected": "development|testing|staging|production"
}
```

## Dependencies

- [`zod`](https://zod.dev) – schema validation
- [`@famiglio/errors`](https://github.com/famiglio/errors) – structured error handling

---

## License

MIT © [Famiglio](https://github.com/famiglio)
