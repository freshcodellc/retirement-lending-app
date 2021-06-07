/** @jsxImportSource @emotion/react */
import {useForm} from 'react-hook-form'
import {Link, Navigate} from 'react-router-dom'
import {useAuth} from 'context/auth-context'
import {useAsync} from 'hooks/use-async'
import {Button, Input, TextLink, colors} from '@solera/ui'

export default function LoginScreen() {
  const {login} = useAuth()
  const {register, handleSubmit} = useForm()
  const {isLoading, isSuccess, isError, run} = useAsync()

  const handleLogin = handleSubmit(formData => run(login(formData)))

  if (isSuccess) {
    return <Navigate to="verify" />
  }

  return (
    <>
      <h1>Log in</h1>
      <form
        name="login"
        onSubmit={handleLogin}
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
        <Input
          id="password"
          label="Password"
          name="password"
          type="password"
          {...register('password')}
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
            Login
          </Button>
          <Link to="forgot-password" css={{marginTop: '40px'}}>
            <TextLink>Forgot your password?</TextLink>
          </Link>
          <p>- OR -</p>
          <Link to="sign-up" css={{marginTop: '0px'}}>
            <TextLink>Sign up</TextLink>
          </Link>
        </div>
        {isError ? (
          <div css={{color: colors.red}}>An error happened</div>
        ) : null}
      </form>
    </>
  )
}
