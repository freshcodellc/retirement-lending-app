import {QueryClient} from 'react-query'

const queryClient = new QueryClient()

const queryKeys = {
  me: 'me',
  users: 'users',
  constants: 'constants',
  application: id => ['applications', id],
  applications: ({page = 1, ...filters}) => ['applications', page, filters],
}

export {queryClient, queryKeys}
