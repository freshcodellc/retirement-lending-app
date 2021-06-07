/** @jsxImportSource @emotion/react */
import {useForm} from 'react-hook-form'
import {useAuth} from 'context/auth-context'
import {useAsync} from 'hooks/use-async'
import {Button, colors, Input} from '@solera/ui'

export default function LoginVerifyScreen() {
  const {verifyLogin} = useAuth()
  const {register, handleSubmit} = useForm()
  const {isLoading, isError, run} = useAsync()

  const handleVerifyLogin = handleSubmit(formData => run(verifyLogin(formData)))

  return (
    <>
      <h1>Enter Verification Code</h1>
      <form
        name="verify-login"
        onSubmit={handleVerifyLogin}
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
          id="code"
          label="Code"
          name="code"
          type="number"
          {...register('code')}
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
            Verify
          </Button>
        </div>
        {isError ? <div css={{color: colors.red}}>An error happened</div> : null}
      </form>
    </>
  )
}
