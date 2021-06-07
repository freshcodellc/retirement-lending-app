import * as React from 'react'
import {QueryClientProvider, QueryClient, ReactQueryDevtools} from 'react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      suspense: true,
    },
  },
})

function QueryProvider({children}) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

export {QueryProvider}
