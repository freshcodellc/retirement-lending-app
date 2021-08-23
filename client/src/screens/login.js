/** @jsxImportSource @emotion/react */
import {useEffect} from 'react'
import {useForm} from 'react-hook-form'
import {Link} from 'react-router-dom'
import {useAuth} from '../context/auth-context'
import {useAsync} from '../utils/hooks'
import {yupResolver} from '@hookform/resolvers/yup'
import has from 'lodash/has'
import {ErrorMessage} from '@hookform/error-message'
import * as yup from 'yup'
import {Button, Input, InputError, TextLink} from '@solera/ui'
import toast, {Toaster} from 'react-hot-toast'
import {Layout} from 'components'

const schema = yup.object().shape({
  email: yup.string().email().required('Required'),
  password: yup.string().min(8).required('Required'),
})

const notifyError = message => toast.error(message)

function LoginForm({onSubmit}) {
  const {run, error} = useAsync()
  const {formState, handleSubmit, register} = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    submitFocusError: true,
  })

  useEffect(() => {
    if (error?.error === 'Unauthorized') {
      notifyError(
        'Whoops! The email or password is incorrect. Please try again.',
      )
    } else {
      notifyError('An unhandled error occurred. Please try again.')
    }
  }, [error])

  function submitForm(formData) {
    const {email, password} = formData

    run(
      onSubmit({
        email,
        password,
      }),
    )
  }

  return (
    <Layout css={{alignItems: 'center'}}>
      <h1>Sign in to Solera’s lending platform</h1>
      <form
        name="login"
        onSubmit={handleSubmit(d => submitForm(d))}
        css={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          width: '100%',
        }}
      >
        <div
          css={{
            marginTop: '65px',
          }}
        >
          <Input
            id="email"
            label="Email"
            name="email"
            type="email"
            hasError={has(formState, 'errors.email')}
            {...register('email')}
          />
          <ErrorMessage
            errors={formState.errors}
            name="email"
            render={({message}) => <InputError>{message}</InputError>}
          />
        </div>
        <div
          css={{
            marginTop: '65px',
          }}
        >
          <Input
            id="password"
            label="Password"
            name="password"
            type="password"
            hasError={has(formState, 'errors.password')}
            {...register('password')}
          />
          <ErrorMessage
            errors={formState.errors}
            name="password"
            render={({message}) => <InputError>{message}</InputError>}
          />
        </div>
        <div
          css={{
            marginTop: '75px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Button
            variant="secondary"
            type="submit"
            disabled={!formState.isValid}
          >
            Submit
          </Button>
          <Link
            to="forgot-password"
            css={{
              marginTop: '40px',
            }}
          >
            <TextLink variant="secondary">Forgot your password?</TextLink>
          </Link>
          <p>- OR -</p>
          <Link
            to="sign-up"
            css={{
              marginTop: '0px',
            }}
          >
            <TextLink variant="secondary">Sign up</TextLink>
          </Link>
        </div>
        <Toaster />
      </form>
    </Layout>
  )
}

function LoginScreen() {
  const {login} = useAuth()
  return (
    <div
      css={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <LoginForm onSubmit={login} />
    </div>
  )
}

export {LoginScreen}
