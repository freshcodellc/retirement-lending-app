/** @jsxImportSource @emotion/react */
import {useForm} from 'react-hook-form'

import {useAuth} from 'context/auth-context'
import {useAsync} from 'hooks/use-async'
import {Input, TextLink, FormMessage, Button} from '@solera/ui'
import {AuthForm} from 'components'

export default function LoginVerifyScreen() {
  const {verifyLogin} = useAuth()
  const {isLoading, isError, run} = useAsync()
  const {register, handleSubmit, formState} = useForm({mode: 'onChange'})

  const handleVerifyLogin = handleSubmit(form => run(verifyLogin(form)))

  const resendCode = () => {
    //TODO: endpoint to resend code?
    console.log('RESEND CODE')
  }

  return (
    <>
      <h1>Enter Verification Code</h1>
      {isError ? (
        <FormMessage variant="error">Invalid code!</FormMessage>
      ) : null}
      <AuthForm name="login-verify" onSubmit={handleVerifyLogin}>
        <Input
          autoFocus
          id="code"
          label="Code"
          name="code"
          type="number"
          hasError={isError}
          placeholder="Code"
          {...register('code', {required: true})}
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
          <TextLink onClick={resendCode} css={{marginTop: '40px'}}>
            Resend the code
          </TextLink>
        </div>
      </AuthForm>
    </>
  )
}
