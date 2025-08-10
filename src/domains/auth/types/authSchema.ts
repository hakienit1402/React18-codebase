import { z } from "zod";

/**
 * Zod schemas for Auth domain.
 *
 * Notes:
 * - Keep schemas close to API contracts.
 * - Derive TypeScript types via `z.infer<typeof schema>` in `authType.ts`.
 */

/** Login */
export const loginRequestSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export const loginResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

/** TwoFA */
export const verifyTwoFAResponseSchema = z.object({
  success: z.boolean(),
  otpId: z.string().optional(),
});

export const resendOtpSchema = z.object({
  success: z.boolean(),
});

/** Reset password */
export const setNewPasswordResponseSchema = z.object({
  success: z.boolean(),
});

/** User */
export const userSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string().email(),
});

/** Forgot password */
export const forgotPasswordResponseSchema = z.object({
  success: z.boolean(),
});
