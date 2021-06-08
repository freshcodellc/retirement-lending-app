import * as React from 'react'
import {QueryClientProvider} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'
import {queryClient} from 'utils/query-client'

function QueryProvider({children}) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export {QueryProvider}
