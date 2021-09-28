/** @jsxImportSource @emotion/react */
import {Fragment} from 'react'
import {useForm} from 'react-hook-form'
import {Link} from 'react-router-dom'

import {useAuth} from 'context/auth-context'
import {useAsync} from 'hooks/use-async'
import {Input, TextLink, Button, FormMessage} from '@solera/ui'
import {AuthForm} from 'components'

export function ResetPasswordForm() {
  const {resetPassword} = useAuth()
  const {isLoading, isError, isSuccess, run} = useAsync()
  const {register, handleSubmit, formState} = useForm({mode: 'onChange'})

  const handleResetPassword = handleSubmit(form => run(resetPassword(form)))

  return (
    <Fragment>
      <h1>Forgot Password?</h1>
      {isError ? (
        <FormMessage variant="error">Failed to reset password!</FormMessage>
      ) : null}
      {isSuccess ? (
        <FormMessage variant="success">
          Success! Please check your email for a link to reset your password.
        </FormMessage>
      ) : null}
      <AuthForm name="forgot-password" onSubmit={handleResetPassword}>
        <Input
          id="email"
          name="email"
          type="email"
          hasError={isError}
          label="Email address"
          placeholder="Email address"
          {...register('email', {required: true, pattern: /^\S+@\S+$/i})}
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
          <Link to="/" css={{marginTop: '40px'}}>
            <TextLink>Already have an account?</TextLink>
          </Link>
        </div>
      </AuthForm>
    </Fragment>
  )
}
