import React from 'react'
import ReactDOM from 'react-dom'
import * as Sentry from '@sentry/react'
import {Integrations} from '@sentry/tracing'
import './styles/global.css'
import App from './app'
import AppProviders from './context'
import reportWebVitals from './reportWebVitals'


Sentry.init({
  dsn: 'https://399a3366e6dc49d9bdb80014e727aff5@o1025860.ingest.sentry.io/6020369',
  integrations: [new Integrations.BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
})

ReactDOM.render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
