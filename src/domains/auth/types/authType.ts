import { z } from "zod";

import {
  forgotPasswordResponseSchema,
  loginRequestSchema,
  loginResponseSchema,
  resendOtpSchema,
  setNewPasswordResponseSchema,
  userSchema,
  verifyTwoFAResponseSchema,
} from "./authSchema";

/**
 * Inferred types from Zod schemas for the Auth domain.
 *
 * Best practice:
 * - Prefer `z.infer<typeof schema>` to ensure types always match runtime validation.
 */
export type LoginRequestProps = z.infer<typeof loginRequestSchema>;
export type LoginResponseProps = z.infer<typeof loginResponseSchema>;
export type VerifyTwoFAResponseProps = z.infer<
  typeof verifyTwoFAResponseSchema
>;
export type ResendOtpProps = z.infer<typeof resendOtpSchema>;
export type SetNewPasswordResponseProps = z.infer<
  typeof setNewPasswordResponseSchema
>;
export type UserProps = z.infer<typeof userSchema>;
export type ForgotPasswordResponseProps = z.infer<
  typeof forgotPasswordResponseSchema
>;
