/** @jsxImportSource @emotion/react */
import {useForm} from 'react-hook-form'
import {Link, Navigate} from 'react-router-dom'

import {useAuth} from 'context/auth-context'
import {useAsync} from 'hooks/use-async'
import {Input, TextLink} from '@solera/ui'
import {Button, AuthForm, FormMessage, PasswordInput} from 'components'

export default function LoginScreen() {
  const {login} = useAuth()
  const {isLoading, isSuccess, isError, error, run} = useAsync()
  const {register, handleSubmit, formState} = useForm({mode: 'onChange'})
  const formError = error?.error ?? 'Failed to login!'

  if (isSuccess) {
    return <Navigate replace to="login-verify" />
  }

  const handleLogin = handleSubmit(form => run(login(form)))

  return (
    <>
      <h1>Log in</h1>
      {isError ? <FormMessage variant="error">{formError}</FormMessage> : null}
      <AuthForm name="login" onSubmit={handleLogin}>
        <Input
          autoFocus
          id="email"
          name="email"
          type="email"
          hasError={isError}
          label="Email address"
          placeholder="Email address"
          {...register('email', {required: true, pattern: /^\S+@\S+$/i})}
        />
        <PasswordInput
          id="password"
          name="password"
          hasError={isError}
          label="Password"
          placeholder="Password"
          {...register('password', {required: true})}
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
          <Link to="forgot-password" css={{marginTop: '40px'}}>
            <TextLink>Forgot your password?</TextLink>
          </Link>
        </div>
      </AuthForm>
    </>
  )
}
