import { ErrorMetadataSchema } from './schema.js';
import type { ErrorMetadataInput, ErrorMetadataOutput } from './schema.js';

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
  constructor(message: string, metadata: ErrorMetadataInput) {
    super(message);

    // Set the name to the correct class name (e.g., 'ValidationError' if a subclass is instantiated)
    this.name = new.target.name;

    const validatedMetadata = this.validateMetadata(metadata, message);

    this.code = validatedMetadata.code;
    this.cause = validatedMetadata.cause;
    this.context = validatedMetadata.context;

    // Correctly set the prototype chain for proper inheritance (Crucial for ES5/TS targets)
    Object.setPrototypeOf(this, new.target.prototype);
  }

  /**
   * Validates the input metadata against the schema using `safeParse`.
   * Throws a clear Error if validation fails, wrapping the original ZodError as the cause.
   * @param input The raw input metadata.
   * @param parentErrorMessage The message of the error being constructed, for context in the thrown error.
   * @returns The parsed and validated metadata.
   * @throws {Error} If Zod validation fails.
   */
  private validateMetadata(input: ErrorMetadataInput, parentErrorMessage: string): ErrorMetadataOutput {
    const result = ErrorMetadataSchema.safeParse(input);

    if (!result.success) {
      const errorMessage = `Invalid metadata provided for error "${parentErrorMessage}" (Code: ${input.code || 'N/A'}).`;
      
      throw new Error(errorMessage, { cause: result.error });
    }

    return result.data;
  }

  /**
   * Returns a plain object representation, useful for structured logging or serialization.
   * Includes normalized cause and the full stack trace.
   * * @returns {object} A plain object with error details.
   */
  toJSON(): object {
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