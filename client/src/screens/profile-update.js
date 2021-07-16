/** @jsxImportSource @emotion/react */
import {useEffect} from 'react'
import {useForm} from 'react-hook-form'
import has from 'lodash/has'
import {ErrorMessage} from '@hookform/error-message'
import {useUpdateUser} from '../hooks/use-update-user'
import {useUser} from '../hooks/useUser'
import {yupResolver} from '@hookform/resolvers/yup'
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
  referrer: yup.string(),
})

function ProfileUpdateForm({onSubmit}) {
  const {isLoading, isError, isSuccess, data, error, mutate} = useUpdateUser()
  const {
    data: {user},
  } = useUser()
  const {control, formState, handleSubmit, register, reset, setValue} = useForm(
    {
      mode: 'all',
      resolver: yupResolver(schema),
      submitFocusError: true,
    },
  )

  function submitForm(formData) {
    mutate({
      ...user,
      profile: {...formData},
    })
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
            setValue={setValue}
            control={control}
            {...register('entity_type')}
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
          <FormControl
            id="fundingAccountBalance"
            name="funding_account_balance"
          >
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
          <PhoneInput
            id="phone"
            label="Phone"
            name="phone"
            hasError={has(formState, 'errors.phone')}
            type="text"
            control={control}
            {...register('phone')}
          />
          <ErrorMessage
            errors={formState.errors}
            name="phone"
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
      <ProfileUpdateForm onSubmit={register} />
    </div>
  )
}

export {ProfileUpdateScreen}
