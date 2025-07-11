// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/
import * as Sentry from "@sentry/nextjs"

import { version } from "@/config/version"
import { APP_PACKAGE_NAME } from "@/constants/app"

Sentry.init({
  enabled: process.env.NEXT_PUBLIC_SENTRY_ENABLED === "true",
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT,
  release: `${APP_PACKAGE_NAME}@${version}`,
  integrations: [Sentry.replayIntegration()],
  tracesSampleRate: Number(
    process.env.NEXT_PUBLIC_SENTRY_TRACE_SAMPLE_RATE || 0.1
  ),
  replaysSessionSampleRate: Number(
    process.env.NEXT_PUBLIC_SENTRY_REPLAY_SESSION_SAMPLE_RATE || 0.1
  ),
  replaysOnErrorSampleRate: Number(
    process.env.NEXT_PUBLIC_SENTRY_REPLAYS_ON_ERROR_SAMPLE_RATE || 1.0
  ),

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: true,

  beforeSend: (event, hint) => {
    if (hint.originalException instanceof Error) {
      return event
    }
    // Avoid returning non-error events
    return null
  },

  denyUrls: [
    // Chrome extensions
    /extensions\//i,
    /^chrome:\/\//i,
    /^chrome-extension:\/\//i,
    // Mozilla extensions
    /^moz-extension:\/\//i,
  ],
})
