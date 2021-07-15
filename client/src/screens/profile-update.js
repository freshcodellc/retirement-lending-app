/** @jsxImportSource @emotion/react */
import {useEffect} from 'react'
import {useForm} from 'react-hook-form'
import has from 'lodash/has'
import {ErrorMessage} from '@hookform/error-message'
import {useAuth} from '../context/auth-context'
import {useAsync} from '../utils/hooks'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {Button, Input, InputError} from '@solera/ui'
import {Layout} from 'components'

const schema = yup.object().shape({
  plan_type: yup.string().required('Required'),
  entity_type: yup.string().required('Required'),
  entity_name: yup.string().required('Required'),
  funding_institution_name: yup.string().required('Required'),
  funding_account_balance: yup.string().required('Required'),
  first_name: yup.string().required('Required'),
  middle_name: yup.string(),
  last_name: yup.string().required('Required'),
  phone: yup.string().required('Required'),
  email: yup.string().email().required('Required'),
  number_rental_properties: yup.string().required('Required'),
  estimated_net_worth_bracket: yup.string().required('Required'),
  referrer: yup.string().required('Required'),
})

function ProfileUpdateForm({onSubmit}) {
  const {isLoading, isError, isSuccess, data, error, run} = useAsync()
  const {register, reset, handleSubmit, formState} = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    submitFocusError: true,
  })

  function submitForm(formData) {
    const {email, password} = formData
    run(
      onSubmit({
        email,
        password,
      }),
    )
  }

  useEffect(() => {
    if (isSuccess) {
      reset()
    }
  }, [isSuccess, reset])

  return (
    <Layout css={{alignItems: 'center'}}>
      <h1>Profile Update</h1>
      <form
        name="sign-up"
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
            id="firstName"
            label="First name"
            name="first_name"
            type="text"
            hasError={has(formState, 'errors.first_name')}
            {...register('first_name')}
          />
          <ErrorMessage
            errors={formState.errors}
            name="first_name"
            render={({message}) => <InputError>{message}</InputError>}
          />
        </div>
        <div
          css={{
            marginTop: '65px',
          }}
        >
          <Input
            id="middleName"
            label="Middle name"
            name="middle_name"
            type="text"
            hasError={has(formState, 'errors.middle_name')}
            {...register('middle_name')}
          />
          <ErrorMessage
            errors={formState.errors}
            name="middle_name"
            render={({message}) => <InputError>{message}</InputError>}
          />
        </div>
        <div
          css={{
            marginTop: '65px',
          }}
        >
          <Input
            id="lastName"
            label="Last name"
            name="last_name"
            hasError={has(formState, 'errors.last_name')}
            type="text"
            {...register('last_name')}
          />
          <ErrorMessage
            errors={formState.errors}
            name="last_name"
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
        </div>
        {isError ? <div>An error happened</div> : null}
        {isSuccess ? (
          <div>
            Success! Please check your email and click the confirmation link
            before logging in.
          </div>
        ) : null}
      </form>
    </Layout>
  )
}

function ProfileUpdateScreen() {
  const {register} = useAuth()
  return (
    <div
      css={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ProfileUpdateForm onSubmit={register} />
    </div>
  )
}

export {ProfileUpdateScreen}
