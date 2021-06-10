/** @jsxImportSource @emotion/react */
import * as React from 'react'
import {Link, Navigate} from 'react-router-dom'
import {useForm, Controller} from 'react-hook-form'

import {useAsync} from 'hooks/use-async'
import {useAuth} from 'context/auth-context'
import {Button, Input, TextLink} from '@solera/ui'
import {useConfirmInvite} from 'hooks/use-confirm-invite'
import {AuthForm, FormMessage, MaskedInput, PasswordInput} from 'components'
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
    return <Navigate to="/" />
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
        <Controller
          control={control}
          name="phone_number"
          rules={{required: true}}
          render={({field: {onChange, value, name}}) => (
            <MaskedInput
              unmask
              type="tel"
              id={name}
              name={name}
              value={value}
              hasError={isError}
              onAccept={onChange}
              mask="000-000-0000"
              label="Phone number"
              placeholder="Phone number"
            />
          )}
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
