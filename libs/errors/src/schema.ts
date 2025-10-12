import { z } from 'zod';

/**
 * Zod schema for validating the structure of error metadata.
 * This ensures the 'code' is always a valid, non-empty string.
 */
export const ErrorMetadataSchema = z
  .object({
    /**
     * Machine-readable error code (e.g., "VALIDATION_ERROR"). Required.
     */
    code: z.string().min(1, 'Error code cannot be empty'),
    /**
     * Optional cause (another Error or object) that triggered this error.
     */
    cause: z.unknown().optional(),
    /**
     * Additional context for debugging, such as parameters or state.
     */
    context: z.unknown().optional(),
  })
  .strict(); // Prevents extra, unhandled properties

/**
 * Defines the structure for structured error metadata.
 */
export type ErrorMetadata = z.infer<typeof ErrorMetadataSchema>;
export type ErrorMetadataInput = z.input<typeof ErrorMetadataSchema>;
export type ErrorMetadataOutput = z.output<typeof ErrorMetadataSchema>;
