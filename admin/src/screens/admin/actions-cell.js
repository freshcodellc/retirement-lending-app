/** @jsxImportSource @emotion/react */
import {FiTrash2} from 'react-icons/fi'
import {useQueryClient} from 'react-query'
import {queryKeys} from 'utils/query-client'

import {IconButton, colors, Spinner} from '@solera/ui'
import {useRemoveInvite} from 'hooks/use-remove-invite'

export function ActionsCell({value: invitePending, row}) {
  const queryClient = useQueryClient()
  // const {mutate: sendInvite} = useSendInvite()
  const {mutate: removeInvite, isLoading: removing} = useRemoveInvite({
    onSettled() {
      queryClient.invalidateQueries(queryKeys.admin_invites)
    },
  })

  if (!invitePending) return ''

  const {uuid} = row.original

  // const resendInvite = () => {
  //   sendInvite({email})
  // }

  const cancelInvite = () => {
    removeInvite(uuid)
  }

  return (
    <div
      css={{
        display: 'flex',
        flexWrap: 'nowrap',
        alignItems: 'center',
        justifyContent: 'flex-end',
      }}
    >
      {/* NOTE: hide for now until resend is handled form backend
            <TextLink variant="secondary" disabled={resending} onClick={resendInvite}>
              {resending ? 'Resending...' : 'Resend invite'}
            </TextLink>
          */}
      <IconButton onClick={cancelInvite} disabled={removing}>
        {removing ? (
          <Spinner css={{fontSize: '1.5em'}} />
        ) : (
          <FiTrash2 size="1.5em" color={colors.danger} />
        )}
      </IconButton>
    </div>
  )
}
