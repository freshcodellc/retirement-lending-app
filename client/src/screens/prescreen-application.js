/** @jsxImportSource @emotion/react */
import {useMemo, Fragment} from 'react'
import {useForm} from 'react-hook-form'
import {Link, Navigate, useParams, useNavigate} from 'react-router-dom'
import {useLoanApplication} from 'hooks/useLoanApplication'
import {useUpdateLoanApplication} from 'hooks/useUpdateLoanApplication'
import {FiArrowLeft} from 'react-icons/fi'
import {
  Button,
  Input,
  colors,
  TextLink,
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
  const navigate = useNavigate()
  const {
    uuid,
    step,
    prevStep,
    nextStep,
    heading,
    subHeading,
    fields,
    defaultValues,
  } = useFields()
  const {
    mutate: saveEdit,
    isLoading: isSaving,
    isError: savingIsError,
  } = useUpdateLoanApplication({
    onSuccess() {
      navigate(`${nextStep}`)
    },
  })
  const {register, handleSubmit, watch, control, formState} = useForm({
    defaultValues,
  })
  const planType = watch('plan_type')

  const mailingEqualPhysical = false

  const handleSave = handleSubmit(form => saveEdit({...form, uuid}))

  if (!heading) {
    return <Navigate replace to="/" />
  }

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
      <div css={{textAlign: 'center'}}>
        <h1 css={{marginBottom: '3rem'}}>{heading}</h1>
        {subHeading && <p css={{margin: 0, fontWeight: 500}}>{subHeading}</p>}
      </div>
      <form
        name="prescreen"
        css={{
          '& > *': {
            marginTop: '65px',
          },
        }}
        onSubmit={handleSave}
      >
        {fields.map(field => {
          const props = {key: field.name, hasError: savingIsError, ...field}
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
                  key={field.type}
                  css={{
                    fontWeight: 500,
                    fontsize: '1.2rem',
                    color: colors.danger,
                  }}
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
              return <CurrencyInput control={control} {...props} />
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
                  register={register}
                  hasError={savingIsError}
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
                  return (
                    <EntitySelect
                      control={control}
                      planType={planType}
                      {...props}
                    />
                  )
                case 'entity_state_of_formation':
                  return <UsStateSelect control={control} {...props} />
                default:
              }
              break
            default:
          }
          return ''
        })}
        <div
          css={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '3rem',
          }}
        >
          <Button
            type="submit"
            isLoading={isSaving}
            disabled={!formState.isValid}
          >
            Continue
          </Button>
          {step > 1 ? (
            <Link
              to={`/${uuid}/prescreen/${prevStep}`}
              css={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <FiArrowLeft
                color={colors.secondary}
                css={{marginRight: '4px'}}
              />
              <TextLink variant="secondary">Back</TextLink>
            </Link>
          ) : null}
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

  const section = useMemo(
    () =>
      ({
        1: {
          heading: `Welcome to Solera National Bank's lending platform for retirement accounts!`,
          subHeading: `To get started, we'll need some basic information from you.`,
          fields: step1Fields,
        },
        2: {
          heading: `Tell us a little more about the property`,
          fields: step2Fields,
        },
        3: {
          heading: `Tell us a little more about yourself`,
          fields: step3Fields,
        },
      }[step] || {fields: []}),
    [step],
  )

  const defaultValues = useMemo(
    () =>
      section.fields.reduce((acc, cur) => {
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
    [data, section],
  )
  const maxStep = 4
  const nextStep = Math.max(Number(step) + 1, 4)
  const prevStep = Math.max(Number(step) - 1, 1)

  return {
    uuid,
    step,
    error,
    isError,
    prevStep,
    nextStep,
    isSuccess,
    isLoading,
    defaultValues,
    ...section,
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

const step2Fields = [
  {
    type: 'property',
    name: 'addresses',
    fields: {
      address: {
        type: 'text',
        name: 'property.address',
        label: 'Physical address of property',
        placeholder: 'Enter street address, No PO Box',
      },
      address_2: {
        type: 'text',
        name: 'property.address_2',
        label: 'Address line 2',
        placeholder: 'Apt, ste, unit, etc. optional',
      },
      city: {
        type: 'text',
        name: 'property.city',
        label: 'City',
        placeholder: 'City',
      },
      state: {
        type: 'select',
        name: 'property.state',
        label: 'State',
        placeholder: 'State',
      },
      postal_code: {
        type: 'number',
        name: 'property.postal_code',
        label: 'ZIP code',
        placeholder: 'ZIP code',
      },
    },
  },
  {
    type: 'select',
    name: 'property_type',
    label: 'Property type',
  },
  {
    type: 'radio',
    name: 'lot_over_2_acres',
    label: 'Is the lot more than 2 acres?',
    options: [
      {label: 'Yes', value: true},
      {label: 'No', value: false},
    ],
  },
  {
    type: 'radio',
    name: 'built_after_1950',
    label: 'Was the property built after 1950?',
    options: [
      {label: 'Yes', value: true},
      {label: 'No', value: false},
    ],
  },
  {
    type: 'radio',
    name: 'well_or_septic',
    label: 'Is the home on a well or septic system?',
    options: [
      {label: 'Yes', value: true},
      {label: 'No', value: false},
    ],
  },
  {
    type: 'number',
    name: 'year_roof_replaced',
    label: 'What year was the roof last replaced?',
  },
  {
    type: 'number',
    name: 'year_last_remodel',
    label: 'When was the property last remodeled?',
  },
  {
    type: 'h1',
    text: 'Property Income and Fees',
  },
  {
    type: 'radio',
    name: 'is_rented',
    label: 'Is the property currently rented?',
    options: [
      {label: 'Yes', value: true},
      {label: 'No', value: false},
    ],
  },
  {
    type: 'currency',
    name: 'monthly_current_rent',
    label: 'Current monthly rent',
  },
  {
    type: 'currency',
    name: 'annual_taxes',
    label: 'Annual real estate taxes',
  },
  {
    type: 'currency',
    name: 'annual_insurance_premium',
    label: 'Annual insurance premiums',
  },
  {
    type: 'currency',
    name: 'monthly_hoa_dues',
    label: 'Monthly HOA fees',
  },
  {
    type: 'currency',
    name: 'monthly_mgmt_fee',
    label: 'Monthly property management fees',
  },
  // financing section
  {
    type: 'h1',
    text: 'Financing Information',
  },
  {
    type: 'radio',
    label: 'New purchase or refinance',
    name: 'is_purchase',
    options: [
      {label: 'New purchase', value: true},
      {label: 'Refinance', value: false},
    ],
  },
  {
    type: 'currency',
    label: 'Requested loan amount*',
    name: 'requested_loan_amount',
    helperText: '(note: max loan amount is 65% of purchase price)',
  },
  {
    type: 'currency',
    label: 'Balance of current debt on the property',
    name: 'current_debt_balance',
  },
  {
    type: 'number',
    label: 'Number of years you have owned the property',
    name: 'years_owned',
  },
  {
    type: 'currency',
    label: 'Estimated amount spent on home improvements',
    name: 'estimated_improvement_costs',
  },
  {
    type: 'currency',
    label: 'Estimated value of the property',
    name: 'estimated_value',
  },
]

const step3Fields = [
  {
    type: 'number',
    name: 'number_rental_properties',
    label: 'How many rental properties do you own?',
    placeholder: 'Number of rental properties',
  },
  {
    type: 'select',
    name: 'estimated_net_worth',
    label: 'Estimated net worth',
    placeholder: 'Select net worth',
  },
  {
    type: 'text',
    name: 'referrer',
    label: 'Who referred you to Solera National Bank?',
    placeholder: 'Referrer',
  },
]
