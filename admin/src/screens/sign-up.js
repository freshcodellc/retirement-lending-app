/** @jsxImportSource @emotion/react */
import * as React from 'react'
import {useForm} from 'react-hook-form'
import {Link, Navigate} from 'react-router-dom'

import {useAsync} from 'hooks/use-async'
import {useAuth} from 'context/auth-context'
import {Button, Input, TextLink} from '@solera/ui'
import {useConfirmInvite} from 'hooks/use-confirm-invite'
import {AuthForm, FormMessage, PhoneInput, PasswordInput} from 'components'
export default function SignUpScreen() {
  const {signup} = useAuth()
  const {isLoading, isSuccess, isError, error, run} = useAsync()
  const {register, handleSubmit, formState, control, setValue} = useForm({
    mode: 'onChange',
  })
  const confirmed = useConfirmInvite({
    onSuccess(result) {
      setValue('email', result.email)
    },
  })

  const handleSignup = handleSubmit(form => run(signup(form)))

  if (!confirmed) {
    return (
      <React.Fragment>
        <FormMessage variant="error">
          Invite expired! Please request new invite
        </FormMessage>
        <Link to="/">Return to Login page</Link>
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
        <FormMessage variant="error">{error.message}</FormMessage>
      ) : null}
      <AuthForm name="sign-up" onSubmit={handleSignup}>
        <Input
          type="text"
          id="firstName"
          name="first_name"
          hasError={isError}
          label="First name"
          placeholder="First name"
          {...register('first_name', {required: true})}
        />
        <Input
          type="text"
          id="last_name"
          name="last_name"
          hasError={isError}
          label="Last name"
          placeholder="Last name"
          {...register('last_name', {required: true})}
        />
        <Input
          id="email"
          name="email"
          type="email"
          hasError={isError}
          label="Email address"
          placeholder="Email address"
          {...register('email', {required: true, pattern: /^\S+@\S+$/i})}
        />
        <PhoneInput
          hasError={isError}
          control={control}
          name="phone_number"
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
            disabled={isLoading || !formState.isValid}
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
