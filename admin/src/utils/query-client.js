import {QueryClient} from 'react-query'

const queryClient = new QueryClient()

const queryKeys = {
  users: 'users',
  constants: 'constants',
}

export {queryClient, queryKeys}
