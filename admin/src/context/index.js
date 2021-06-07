import * as React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {QueryProvider} from './query-context'
import {AuthProvider} from './auth-context'

export default function AppProviders({children}) {
  return (
    <QueryProvider>
      <Router>
        <AuthProvider>{children}</AuthProvider>
      </Router>
    </QueryProvider>
  )
}
