import { ZodError } from 'zod';

import { ErrorMetadata, ErrorMetadataSchema } from './schema.js';

/**
 * Base class for all custom errors.
 * Extends the native Error to preserve stack traces and adds structured metadata.
 */
export class BaseError extends Error {
  /**
   * The machine-readable error code.
   * @readonly
   */
  public readonly code: string;

  /**
   * The optional cause that triggered this error.
   * @override
   * @readonly
   */
  public override readonly cause?: unknown;

  /**
   * Additional context for debugging.
   * @readonly
   */
  public readonly context?: unknown;

  /**
   * Creates an instance of BaseError.
   * Validates the input metadata using Zod to ensure data integrity.
   * * @param message The human-readable error message.
   * @param metadata Structured metadata, validated against ErrorMetadataSchema.
   * @throws {Error} Throws an error if the provided metadata fails Zod validation.
   */
  constructor(message: string, metadata: Partial<ErrorMetadata>) {
    super(message);

    // Set the name to the correct class name (e.g., 'ValidationError' if a subclass is instantiated)
    this.name = new.target.name;

    let validatedMetadata: ErrorMetadata;
    try {
      // Validate metadata using Zod
      validatedMetadata = ErrorMetadataSchema.parse(metadata);
    } catch (error) {
      if (error instanceof ZodError) {
        // Wrap Zod validation failures into a clearer error
        throw new Error(
          `Invalid metadata provided for error "${message}" (Code: ${metadata.code || 'N/A'}): ${error.message}`
        );
      }
      throw error;
    }

    // Assign validated properties
    this.code = validatedMetadata.code;
    this.cause = validatedMetadata.cause;
    this.context = validatedMetadata.context;

    // Correctly set the prototype chain for proper inheritance (Crucial for ES5/TS targets)
    Object.setPrototypeOf(this, new.target.prototype);
  }

  /**
   * Returns a plain object representation, useful for structured logging or serialization.
   * Includes normalized cause and the full stack trace.
   * * @returns {object} A plain object with error details.
   */
  toJSON(): object {
    // Normalize the cause if it's an Error instance, otherwise keep it as is.
    const normalizedCause =
      this.cause instanceof Error
        ? {
            name: this.cause.name,
            message: this.cause.message,
            stack: this.cause.stack, // Include the cause's stack trace
          }
        : this.cause;

    return {
      name: this.name,
      message: this.message,
      code: this.code,
      cause: normalizedCause,
      context: this.context,
      stack: this.stack,
    };
  }
}
