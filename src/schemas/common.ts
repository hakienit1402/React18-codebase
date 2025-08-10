import { z } from "zod";

/**
 * Common schemas for the application.
 *
 * Purpose:
 * - Provide reusable schemas for common data structures.
 * - Ensure consistency across the application.
 */

export const commonSchema = z.object({
  id: z.string().trim(),
});
