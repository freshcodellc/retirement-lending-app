import {useMutation} from 'react-query'

import userService from 'services/user-service'

function useSendInvite(config) {
  return useMutation(userService.sendInvite, config)
}

export {useSendInvite}
