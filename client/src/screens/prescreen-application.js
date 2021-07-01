/** @jsxImportSource @emotion/react */
import {useMemo, Fragment} from 'react'
import {useForm} from 'react-hook-form'
import {useParams} from 'react-router-dom'
import {useLoanApplication} from 'hooks/useLoanApplication'
import {useUpdateLoanApplication} from 'hooks/useUpdateLoanApplication'
import {
  Button,
  Input,
  colors,
  Checkbox,
  SsnInput,
  RadioInput,
  RadioGroup,
  PhoneInput,
  DatePicker,
  FormControl,
  UsStateSelect,
  CurrencyInput,
} from '@solera/ui'
import {EntitySelect, NetWorthSelect, PropertySelect} from 'components/select'

function PreScreenApplicationScreen() {
  const {uuid, fields, defaultValues} = useFields()
  const {mutate, isError} = useUpdateLoanApplication()
  const {register, handleSubmit, control} = useForm({
    defaultValues,
  })
  const mailingEqualPhysical = false
  const handleEdit = handleSubmit(form => mutate({...form, uuid}))

  return (
    <div
      css={{
        width: '100%',
        display: 'flex',
        margin: '0 auto',
        maxWidth: '600px',
        alignItems: 'stretch',
        flexDirection: 'column',
      }}
    >
      <h1 css={{marginBottom: '3rem', textAlign: 'center'}}>
        Welcome to Solera National Bank's lending platform for retirement
        accounts!
      </h1>
      <p>To get started, we'll need some basic information from you.</p>
      <form
        name="prescreen"
        css={{
          '& > div': {
            marginTop: '65px',
          },
        }}
        onSubmit={handleEdit}
      >
        {fields.map(field => {
          const props = {key: field.name, hasError: isError, ...field}
          switch (field.type) {
            case 'h1':
              return (
                <h1 css={{margin: '90px 0 0'}} key={field.text}>
                  {field.text}
                </h1>
              )
            case 'p':
              return (
                <p css={{fontWeight: 500}} key={field.type}>
                  {field.text}
                </p>
              )
            case 'alert':
              return (
                <p
                  css={{fontWeight: 500, color: colors.danger}}
                  key={field.type}
                >
                  {field.text}
                </p>
              )
            case 'text':
            case 'number':
              return <Input {...props} {...register(field.name)} />
            case 'phone':
              return <PhoneInput control={control} {...props} />
            case 'currency':
              return (
                <FormControl {...props}>
                  <CurrencyInput control={control} {...props} />
                </FormControl>
              )
            case 'date':
              return <DatePicker control={control} {...props} />
            case 'ssn':
              return <SsnInput control={control} {...props} />
            case 'checkbox':
              return <Checkbox control={control} {...props} />
            case 'email':
              return (
                <Input
                  {...props}
                  {...register(field.name, {pattern: /^\S+@\S+$/i})}
                />
              )
            case 'radio':
              return (
                <RadioGroup key={field.name} text={field.label}>
                  {field.options.map(o => (
                    <RadioInput
                      {...o}
                      key={o.label}
                      name={field.name}
                      id={field.name + o.label}
                      {...register(field.name)}
                    />
                  ))}
                </RadioGroup>
              )
            case 'physical':
            case 'mailing':
            case 'property':
              if (field.type === 'mailing' && mailingEqualPhysical) break
              return (
                <AddressFields
                  key={field.type}
                  control={control}
                  hasError={isError}
                  register={register}
                  {...field.fields}
                />
              )
            case 'select':
              switch (field.name) {
                case 'estimated_net_worth':
                  return <NetWorthSelect control={control} {...props} />
                case 'property_type':
                  return <PropertySelect control={control} {...props} />
                case 'entity_type':
                  return <EntitySelect control={control} {...props} />
                case 'entity_state_of_formation':
                  return <UsStateSelect control={control} {...props} />
                default:
              }
              break
            default:
          }
          return ''
        })}
        <div css={{textAlign: 'center'}}>
          <Button type="submit">Continue</Button>
        </div>
      </form>
    </div>
  )
}

export {PreScreenApplicationScreen}

function AddressFields({
  control,
  hasError,
  register,
  address,
  address_2,
  city,
  state,
  postal_code,
}) {
  return (
    <Fragment>
      <Input hasError={hasError} {...address} {...register(address.name)} />
      <Input hasError={hasError} {...address_2} {...register(address_2.name)} />
      <div
        css={{
          display: 'flex',
          gap: '1rem',
          '& > *': {width: 'calc((100% - 2rem)/3)'},
        }}
      >
        <Input hasError={hasError} {...city} {...register(city.name)} />
        <UsStateSelect control={control} hasError={hasError} {...state} />
        <Input
          hasError={hasError}
          {...postal_code}
          {...register(postal_code.name)}
        />
      </div>
    </Fragment>
  )
}

function useFields() {
  const {uuid, step} = useParams()
  const {data, isSuccess, isLoading, isError, error} = useLoanApplication(uuid)

  const fields = useMemo(
    () =>
      ({
        1: step1Fields,
      }[step] || {}),
    [step],
  )

  const defaultValues = useMemo(
    () =>
      fields.reduce((acc, cur) => {
        if (cur.name in data) {
          let value = data[cur.name]
          if (value != null) {
            if (cur.type === 'select') {
              value = 'empty'
            } else if (cur.type === 'radio') {
              if (value === true) {
                value = 'true'
              } else if (value === false) {
                value = 'false'
              }
            }
          }
          acc[cur.name] = value
        }
        return acc
      }, {}),
    [data, fields],
  )
  return {
    uuid,
    error,
    fields,
    isError,
    isSuccess,
    isLoading,
    defaultValues,
  }
}

const step1Fields = [
  {
    type: 'h1',
    text: 'Eligibility',
  },
  {
    type: 'radio',
    name: 'fix_and_flip',
    label: 'Do you plan to "fix & flip" this property',
    options: [
      {label: 'Yes', value: true},
      {label: 'No', value: false},
    ],
  },
  {
    type: 'alert',
    text: 'Currently not accepting applications for properties in New York or New Jersey.',
  },
  {
    type: 'h1',
    text: 'Retirement Account Information',
  },
  {
    type: 'radio',
    name: 'plan_type',
    label: 'What type of retirement plan do you have?',
    options: [
      {label: 'IRA', value: 'IRA'},
      {label: '401K', value: '401K'},
    ],
  },
  {
    type: 'select',
    label: 'What entity type will the property be titled under?',
    name: 'entity_type',
  },
  {
    type: 'text',
    label: 'Name of entity',
    name: 'entity_name',
  },
  {
    type: 'text',
    label: 'Where are the funds held to be used for this investment?',
    name: 'funding_institution_name',
  },
  {
    type: 'currency',
    label:
      'What is the cash balance in the account to be used for this investment?',
    name: 'funding_account_balance',
  },
  {
    type: 'h1',
    text: 'Personal Information',
  },
  {
    type: 'text',
    name: 'first_name',
    label: 'First name',
  },
  {
    type: 'text',
    name: 'middle_name',
    label: 'Middle name (optional)',
    placeholder: 'Middle name',
  },
  {
    type: 'text',
    name: 'last_name',
    label: 'Last name',
  },
  {
    type: 'phone',
    name: 'phone_number',
    label: 'Mobile phone number',
  },
  {
    type: 'email',
    name: 'email',
    label: 'Email',
  },
]
