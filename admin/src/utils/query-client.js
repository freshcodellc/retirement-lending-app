import {QueryClient} from 'react-query'

const queryClient = new QueryClient()

const queryKeys = {
  me: 'me',
  users: 'users',
  constants: 'constants',
}

export {queryClient, queryKeys}
