import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/react'
import {Integrations} from '@sentry/tracing'
import {App} from './app';
import { AppProviders } from './context';

Sentry.init({
  dsn: 'https://ed049864dbe9466989408ae29f6ceeab@o1025860.ingest.sentry.io/6019941',
  integrations: [new Integrations.BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
})

ReactDOM.render(
  <AppProviders>
    <App />
  </AppProviders>,
  document.getElementById("root")
);
