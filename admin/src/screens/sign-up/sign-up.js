/** @jsxImportSource @emotion/react */
import * as React from 'react'
import {useForm} from 'react-hook-form'
import {Link, Navigate, useSearchParams} from 'react-router-dom'

import {useAsync} from 'hooks/use-async'
import {useAuth} from 'context/auth-context'
import {
  Input,
  TextLink,
  FormMessage,
  PhoneInput,
  PasswordInput,
  Button,
} from '@solera/ui'
import {AuthForm} from 'components'
export default function SignUpScreen() {
  const {signup} = useAuth()
  const [searchParams] = useSearchParams()
  const {isLoading, isSuccess, isError, run} = useAsync()
  const {register, handleSubmit, formState, control, watch} = useForm({
    mode: 'onChange',
  })

  const inviteToken = searchParams.get('token')
  const hasNoInviteToken = !searchParams.has('token')

  const handleSignup = handleSubmit(form =>
    run(signup({invite_token: inviteToken, ...form})),
  )

  if (hasNoInviteToken) {
    return (
      <React.Fragment>
        <FormMessage variant="error">
          Invalid invite! Please request new invite
        </FormMessage>
        <Link replace to="/">
          Return to Login page
        </Link>
      </React.Fragment>
    )
  }

  if (isSuccess) {
    return <Navigate replace to="/" />
  }

  return (
    <React.Fragment>
      <h1>Set up your account</h1>
      {isError ? (
        <FormMessage variant="error">Failed to create account</FormMessage>
      ) : null}
      <AuthForm name="sign-up" onSubmit={handleSignup}>
        <Input
          type="text"
          id="firstName"
          name="first_name"
          hasError={isError}
          label="First name"
          placeholder="First name"
          {...register('profile.first_name', {required: true})}
        />
        <Input
          type="text"
          id="last_name"
          name="last_name"
          hasError={isError}
          label="Last name"
          placeholder="Last name"
          {...register('profile.last_name', {required: true})}
        />
        <PhoneInput
          hasError={isError}
          control={control}
          name="profile.phone_number"
          label="Phone number"
          rules={{required: true}}
          placeholder="Phone number"
        />
        <PasswordInput
          id="password"
          name="password"
          hasError={isError}
          label="Password"
          placeholder="Password"
          {...register('user.password', {required: true})}
        />
        <PasswordInput
          id="passwordConfirm"
          name="passwordConfirm"
          hasError={isError}
          label="Confirm Password"
          placeholder="Confirm Password"
          {...register('user.passwordConfirm', {
            required: true,
            validate: value => value === watch('user.password'),
          })}
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
    </React.Fragment>
  )
}
