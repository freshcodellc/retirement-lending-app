import {useEffect} from 'react'
import {useMutation} from 'react-query'
import {useSearchParams} from 'react-router-dom'

import userService from 'services/user-service'

function useConfirmInvite(config) {
  const [searchParams] = useSearchParams()
  const {mutate: confirmInvite, ...mutation} = useMutation(
    userService.confirmInvite,
    config,
  )
  const inviteToken = searchParams.get('token')
  const hasInviteToken = searchParams.has('token')

  useEffect(() => {
    if (hasInviteToken) {
      confirmInvite(inviteToken)
    }
  }, [confirmInvite, inviteToken, hasInviteToken])

  return mutation.isSuccess || !hasInviteToken
}

export {useConfirmInvite}
