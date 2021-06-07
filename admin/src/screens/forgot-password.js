/** @jsxImportSource @emotion/react */
import {useForm} from 'react-hook-form'
import {Link, Navigate} from 'react-router-dom'

import {useAuth} from 'context/auth-context'
import {useAsync} from 'hooks/use-async'
import {Button, Input, TextLink} from '@solera/ui'

export default function ForgotPasswordScreen() {
  const {resetPassword} = useAuth()
  const {register, handleSubmit} = useForm()
  const {isLoading, isError, isSuccess, run} = useAsync()

  const handleResetPassword = handleSubmit(formData =>
    run(resetPassword(formData)),
  )

  if (isSuccess) {
    return <Navigate to="reset-password" />
  }

  return (
    <>
      <h1>Forgot Password?</h1>
      <form
        name="forgot-password"
        onSubmit={handleResetPassword}
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
          id="email"
          label="Email"
          name="email"
          type="email"
          {...register('email')}
        />
        <div
          css={{
            marginTop: '75px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Button type="submit" disabled={isLoading}>
            Submit
          </Button>
          <Link to="/" css={{marginTop: '40px'}}>
            <TextLink>Already have an account?</TextLink>
          </Link>
        </div>
        {isError ? <div>An error happened</div> : null}
        {isSuccess ? (
          <div>
            Success! Please check your email for a link to reset your password.
          </div>
        ) : null}
      </form>
    </>
  )
}
