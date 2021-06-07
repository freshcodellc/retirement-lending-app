/** @jsxImportSource @emotion/react */
import {useForm} from 'react-hook-form'
import {useSearchParams, Navigate} from 'react-router-dom'

import {useAuth} from 'context/auth-context'
import {useAsync} from 'hooks/use-async'
import {Button, Input} from '@solera/ui'

export default function ResetPasswordScreen() {
  const {confirmReset} = useAuth()
  const [searchParams] = useSearchParams()
  const {register, handleSubmit} = useForm()
  const {isLoading, isError, isSuccess, run} = useAsync()

  const resetToken = searchParams.get('token')

  const handleConfirmResetPassword = handleSubmit(({new_password}) =>
    run(confirmReset({reset_token: resetToken, new_password})),
  )

  if (isSuccess) {
    return <Navigate to="applicants" />
  }

  return (
    <>
      <h1>Create New Password</h1>
      <form
        name="confirm-reset"
        onSubmit={handleConfirmResetPassword}
        css={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          width: '100%',
          '& div': {
            marginTop: '65px',
          },
        }}
      >
        <Input
          id="newPassword"
          label="New Password"
          name="new_password"
          type="password"
          {...register('new_password')}
        />
        <div
          css={{
            display: 'flex',
            marginTop: '75px',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Button type="submit" disabled={isLoading}>
            Save
          </Button>
        </div>
        {isError ? <div>An error happened</div> : null}
      </form>
    </>
  )
}
