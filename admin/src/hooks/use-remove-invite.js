import {useMutation} from 'react-query'

import userService from 'services/user-service'

function useRemoveInvite(config) {
  return useMutation(userService.removeAdminInvites, config)
}

export {useRemoveInvite}
