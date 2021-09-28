/** @jsxImportSource @emotion/react */
import * as React from 'react'
import {useForm} from 'react-hook-form'
import {useQueryClient} from 'react-query'
import {queryKeys} from 'utils/query-client'
import toast, {Toaster} from 'react-hot-toast'

import {
  Button,
  useModal,
  ModalContents,
  ModalOpenButton,
  Input,
} from '@solera/ui'
import {useSendInvite} from 'hooks/use-send-invite'

export function InviteModal() {
  const [, openModal] = useModal()
  const queryClient = useQueryClient()
  const {register, handleSubmit, formState, reset} = useForm({mode: 'onChange'})
  const {mutate, isLoading, isError, isSuccess, error} = useSendInvite({
    onSuccess() {
      setTimeout(() => {
        queryClient.invalidateQueries(queryKeys.admin_invites)
        openModal(false)
        reset()
      }, 500)
    },
  })

  React.useEffect(() => {
    if (isSuccess) {
      toast.success('Invite successfully sent!')
    }
  }, [isSuccess])

  React.useEffect(() => {
    if (isError) {
      toast.error('Failed to send invite. Please try again')
    }
  }, [isError])

  const handleSendInvite = handleSubmit(mutate)

  return (
    <React.Fragment>
      <ModalOpenButton>
        <Button variant="secondary" css={{width: '100%', maxWidth: '300px'}}>
          Invite new admin
        </Button>
      </ModalOpenButton>
      <ModalContents id="invite-modal" title="Invite">
        <form
          name="send-invite"
          onSubmit={handleSendInvite}
          css={{
            margin: '0 auto',
            width: '60%',
            '& > *': {
              marginTop: '3rem',
            },
          }}
        >
          <Input
            autoFocus
            type="email"
            label="Email"
            id="invite-email"
            name="invite-email"
            placeholder="Email"
            {...register('email', {required: true, pattern: /^\S+@\S+$/i})}
          />
          <div css={{textAlign: 'center', padding: '1rem 0'}}>
            <Button
              type="submit"
              isLoading={isLoading}
              disabled={!formState.isValid}
            >
              Submit
            </Button>
          </div>
        </form>
      </ModalContents>
      <Toaster />
    </React.Fragment>
  )
}
