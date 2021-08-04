import {QueryClient} from 'react-query'

const queryClient = new QueryClient()

const queryKeys = {
  admins: 'admins',
  admin_invites: 'admin_invites',
  constants: 'constants',
  login_user: 'login_user',
  application: uuid => ['applications', uuid],
  applications: (page, filters) => ['applications', filters, page],
}

export {queryClient, queryKeys}
