/** @jsxImportSource @emotion/react */
import {useForm} from 'react-hook-form'
import {Link} from 'react-router-dom'

import {useAuth} from 'context/auth-context'
import {useAsync} from 'hooks/use-async'
import {Button, Input, TextLink, colors} from '@solera/ui'

export default function SignUpScreen() {
  const {signup} = useAuth()
  const {register, handleSubmit} = useForm()
  const {isLoading, isError, isSuccess, run} = useAsync()

  const handleSignup = handleSubmit(formData => run(signup(formData)))

  return (
    <>
      <h1>Sign up</h1>
      <form
        name="sign-up"
        onSubmit={handleSignup}
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
          id="firstName"
          label="First Name"
          name="first_name"
          type="text"
          {...register('first_name')}
        />
        <Input
          id="lastName"
          label="Last Name"
          name="last_name"
          type="text"
          {...register('last_name')}
        />
        <Input
          id="phone"
          label="Phone Number"
          name="phone_number"
          type="text"
          {...register('phone_number')}
        />
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
            Sign up
          </Button>
          <Link to="/" css={{marginTop: '40px'}}>
            <TextLink>Already have an account?</TextLink>
          </Link>
        </div>
        {isError ? (
          <div css={{color: colors.red}}>An error happened</div>
        ) : null}
        {isSuccess ? (
          <div>
            Success! Please check your email and click the confirmation link
            before logging in.
          </div>
        ) : null}
      </form>
    </>
  )
}
