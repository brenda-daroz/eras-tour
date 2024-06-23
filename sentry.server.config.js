// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://3475f403bb4ae22e02c8bbaf8192d777@o4505618881314816.ingest.sentry.io/4505618883477504",

  // Adjust this value in production, or use tracesSampler for greater control
  // tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});
