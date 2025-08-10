import { AxiosRequestConfig } from "axios";
import { z } from "zod";

/**
 * Logger interface
 */
export interface Logger {
  info(message: string, meta?: Record<string, unknown>): void;
  error(message: string, error?: Error, meta?: Record<string, unknown>): void;
  warn(message: string, meta?: Record<string, unknown>): void;
  debug(message: string, meta?: Record<string, unknown>): void;
}

export type ApiRequestConfig = AxiosRequestConfig & {
  signal?: AbortSignal;
};

/**
 * Cancellable request type that combines a Promise with its abort function
 */
export type CancellableRequest<T> = {
  promise: Promise<T>;
  abort: () => void;
};

export const validationErrorSchema = z.object({
  message: z.string(),
  path: z.string(),
});
export const apiErrorDataErrorSchema = z.object({
  message: z.string(),
  errors: z.array(validationErrorSchema).optional(),
});

export type APIErrorDataErrorProps = z.infer<typeof apiErrorDataErrorSchema>;

export const apiErrorSchema = z.object({
  code: z.string(),
  message: z.string(),
  status: z.number(),
  data: apiErrorDataErrorSchema,
});

export type APIError = z.infer<typeof apiErrorSchema>;

export const tokenDecodeSchema = z.object({
  authenticated: z.boolean(),
  email: z.string(),
});

export type TokenDecodeProps = z.infer<typeof tokenDecodeSchema>;
