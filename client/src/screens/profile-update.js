/** @jsxImportSource @emotion/react */
import {useEffect} from 'react'
import {useForm} from 'react-hook-form'
import has from 'lodash/has'
import {ErrorMessage} from '@hookform/error-message'
import {useUpdateUser} from '../hooks/use-update-user'
import {useUser} from '../hooks/useUser'
import {yupResolver} from '@hookform/resolvers/yup'
import toast, {Toaster} from 'react-hot-toast'
import * as yup from 'yup'
import {
  Button,
  CurrencyInput,
  FormControl,
  Input,
  InputError,
  PhoneInput,
  RadioGroup,
  RadioInput,
} from '@solera/ui'
import {EntitySelect, Layout, NetWorthSelect} from 'components'

const schema = yup.object().shape({
  plan_type: yup.string().nullable(true),
  entity_type: yup.mixed().nullable(true),
  entity_name: yup.string().nullable(true),
  funding_institution_name: yup.string().nullable(true),
  funding_account_balance: yup.string().nullable(true),
  middle_name: yup.string().nullable(true),
  first_name: yup.string().required('Required'),
  last_name: yup.string().required('Required'),
  phone_number: yup.string().required('Required'),
  email: yup.string().email().required('Required'),
  number_rental_properties: yup.string().nullable(true),
  estimated_net_worth_bracket: yup.mixed().nullable(true),
  referrer: yup.string().nullable(true),
})

const notifySuccess = () =>
  toast.success('Success! Your profile has been updated.')
const notifyError = () =>
  toast.error('Whoops! There was an error. Please try again.')

function ProfileUpdateForm({onSubmit}) {
  const {isError, isSuccess, mutate} = useUpdateUser()
  const {
    data: {user},
  } = useUser()
  const {profile: profileFields} = user
  const {control, formState, handleSubmit, register, reset, trigger} = useForm({
    defaultValues: {email: user.email, ...profileFields},
    mode: 'all',
    resolver: yupResolver(schema),
    submitFocusError: true,
  })

  const {isValid} = formState

  function submitForm(formData) {
    const {email, ...profile} = formData
    mutate({
      ...user,
      email,
      profile: {...user.profile, ...profile},
    })
  }

  useEffect(() => {
    if (isSuccess) {
      notifySuccess()
    }
  }, [isSuccess])

  useEffect(() => {
    if (isError) {
      notifyError()
    }
  }, [isError])

  return (
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
          marginTop: '65px',
        }}
      >
        <Input
          id="email"
          label="Email"
          name="email"
          hasError={has(formState, 'errors.email')}
          type="text"
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
        <PhoneInput
          id="phone"
          label="Phone"
          name="phone_number"
          hasError={has(formState, 'errors.phone_number')}
          type="text"
          control={control}
          {...register('phone_number')}
        />
        <ErrorMessage
          errors={formState.errors}
          name="phone_number"
          render={({message}) => <InputError>{message}</InputError>}
        />
      </div>
      <div>
        <RadioGroup text="Plan Type">
          <RadioInput
            name="IRA"
            id="plan_type-IRA"
            label="IRA"
            value="IRA"
            {...register('plan_type')}
          />
          <RadioInput
            name="401K"
            id="plan_type-401K"
            label="401K"
            value="401k"
            {...register('plan_type')}
          />
        </RadioGroup>
      </div>
      <div
        css={{
          marginTop: '65px',
        }}
      >
        <EntitySelect
          name="entity_type"
          label="What entity type will the property be titled under?"
          control={control}
        />
        <ErrorMessage
          errors={formState.errors}
          name="entity_type"
          render={({message}) => <InputError>{message}</InputError>}
        />
      </div>
      <div
        css={{
          marginTop: '65px',
        }}
      >
        <Input
          id="entityName"
          label="Name of entity"
          name="entity_name"
          type="text"
          hasError={has(formState, 'errors.entity_name')}
          {...register('entity_name')}
        />
        <ErrorMessage
          errors={formState.errors}
          name="entity_name"
          render={({message}) => <InputError>{message}</InputError>}
        />
      </div>
      <div
        css={{
          marginTop: '65px',
        }}
      >
        <Input
          id="fundingInstitutionName"
          label="Where are the funds held to be used for this investment?"
          name="funding_institution_name"
          type="text"
          hasError={has(formState, 'errors.funding_institution_name')}
          {...register('funding_institution_name')}
        />
        <ErrorMessage
          errors={formState.errors}
          name="funding_institution_name"
          render={({message}) => <InputError>{message}</InputError>}
        />
      </div>
      <div
        css={{
          marginTop: '65px',
        }}
      >
        <FormControl id="fundingAccountBalance" name="funding_account_balance">
          <CurrencyInput
            control={control}
            id="fundingAccountBalance"
            name="funding_account_balance"
            label="What is the cash balance in the account to be used for this investment?"
            {...register('funding_account_balance')}
          />
        </FormControl>
      </div>
      <div
        css={{
          marginTop: '65px',
        }}
      >
        <Input
          id="numberRentalProperties"
          label="How many rental properties do you own?"
          name="number_rental_properties"
          hasError={has(formState, 'errors.number_rental_properties')}
          type="number"
          {...register('number_rental_properties')}
        />
        <ErrorMessage
          errors={formState.errors}
          name="number_rental_properties"
          render={({message}) => <InputError>{message}</InputError>}
        />
      </div>
      <div
        css={{
          marginTop: '65px',
        }}
      >
        <NetWorthSelect
          name="estimated_net_worth_bracket"
          label="Estimated net worth?"
          control={control}
        />
      </div>
      <div
        css={{
          marginTop: '65px',
        }}
      >
        <Input
          id="referrer"
          label="Who referred you to Solera National Bank?"
          name="referrer"
          type="text"
          hasError={has(formState, 'errors.referrer')}
          {...register('referrer')}
        />
        <ErrorMessage
          errors={formState.errors}
          name="referrer"
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
        <Button variant="secondary" type="submit" disabled={!isValid}>
          Submit
        </Button>
      </div>
      <Toaster />
    </form>
  )
}

function ProfileUpdateScreen({prompt = ''}) {
  const {register} = useUpdateUser()
  return (
    <div
      css={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Layout css={{alignItems: 'center'}}>
        <h1>Update your Profile</h1>
        {prompt && <h3 css={{textAlign: 'center'}}>{prompt}</h3>}
        <ProfileUpdateForm onSubmit={register} />
      </Layout>
    </div>
  )
}

export {ProfileUpdateScreen}
