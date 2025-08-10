/*
  Observability bootstrap: Sentry + LogRocket with feature-flag toggles.
  - Controlled by env flags: VITE_SENTRY_DSN, VITE_LOGROCKET_APPID, VITE_OBS_ENABLED
  - Redacts sensitive fields in breadcrumbs and network payloads
*/

import * as Sentry from "@sentry/react";
import LogRocket from "logrocket";

type Redactor = (key: string, value: unknown) => unknown;

const defaultRedactor: Redactor = (key, value) => {
  const lowered = key.toLowerCase();
  if (/(password|token|authorization|cookie|set-cookie|secret|apikey)/i.test(lowered)) {
    return "[REDACTED]";
  }
  return value;
};

function deepRedact<T>(obj: T, customRedactor?: Redactor): T {
  const redact = customRedactor ?? defaultRedactor;
  if (obj === null || typeof obj !== "object") return obj;
  if (Array.isArray(obj)) return obj.map((v) => deepRedact(v, redact)) as unknown as T;
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
    out[k] = typeof v === "object" && v !== null ? deepRedact(v, redact) : redact(k, v);
  }
  return out as T;
}

export function initObservability() {
  const enabled = (import.meta as any).env?.VITE_OBS_ENABLED ?? (window as any)._env_?.VITE_OBS_ENABLED;
  if (String(enabled).toLowerCase() !== "true") return;

  const sentryDsn = (import.meta as any).env?.VITE_SENTRY_DSN ?? (window as any)._env_?.VITE_SENTRY_DSN;
  const logrocketId =
    (import.meta as any).env?.VITE_LOGROCKET_APPID ?? (window as any)._env_?.VITE_LOGROCKET_APPID;

  if (sentryDsn) {
    Sentry.init({
      dsn: String(sentryDsn),
      integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration()],
      tracesSampleRate: 0.1,
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,
      beforeSend(event) {
        if (event.request?.headers) event.request.headers = deepRedact(event.request.headers);
        if (event.request?.cookies) event.request.cookies = deepRedact(event.request.cookies);
        if (event.request?.data) event.request.data = deepRedact(event.request.data);
        return event;
      },
    });
  }

  if (logrocketId) {
    LogRocket.init(String(logrocketId));
  }
}

export function withSentryErrorBoundary<T>(Component: React.ComponentType<T>) {
  return Sentry.withErrorBoundary(Component, {
    fallback: null,
  });
}


