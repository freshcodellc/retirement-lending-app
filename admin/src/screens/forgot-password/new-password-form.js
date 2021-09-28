/** @jsxImportSource @emotion/react */
import {Fragment} from 'react'
import {useForm} from 'react-hook-form'
import {Navigate} from 'react-router-dom'

import {useAuth} from 'context/auth-context'
import {useAsync} from 'hooks/use-async'
import {Input, Button, FormMessage} from '@solera/ui'
import {AuthForm} from 'components'

export function NewPasswordForm({resetToken}) {
  const {confirmResetPassword} = useAuth()
  const {isLoading, isError, isSuccess, run} = useAsync()
  const {register, handleSubmit, formState} = useForm({mode: 'onChange'})

  const handleConfirmResetPassword = handleSubmit(({new_password}) =>
    run(confirmResetPassword({reset_token: resetToken, new_password})),
  )

  if (isSuccess) {
    return <Navigate to="/" />
  }

  return (
    <Fragment>
      <h1>Create New Password</h1>
      {isError ? (
        <FormMessage variant="error">
          Failed to create new password!
        </FormMessage>
      ) : null}
      <AuthForm name="confirm-reset" onSubmit={handleConfirmResetPassword}>
        <Input
          type="password"
          id="new-password"
          label="New password"
          name="new-password"
          hasError={isError}
          placeholder="New password"
          {...register('new_password', {required: true})}
        />
        <div
          css={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Button
            type="submit"
            isLoading={isLoading}
            disabled={!formState.isValid}
          >
            Submit
          </Button>
        </div>
      </AuthForm>
    </Fragment>
  )
}
