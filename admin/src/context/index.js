import * as React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {QueryClientProvider, QueryClient} from 'react-query'
import {AuthProvider} from './auth-context'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      suspense: true,
    },
  },
})

function AppProviders({children}) {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>{children}</AuthProvider>
      </Router>
    </QueryClientProvider>
  )
}

export {AppProviders, queryClient}
