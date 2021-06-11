import {QueryClient} from 'react-query'

const queryClient = new QueryClient()

const queryKeys = {
  users: 'users',
  constants: 'constants',
  login_user: 'login_user',
  application: uuid => ['applications', uuid],
  applications: (page, filters) => ['applications', filters, page],
}

export {queryClient, queryKeys}
