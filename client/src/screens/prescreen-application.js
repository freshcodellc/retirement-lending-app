/** @jsxImportSource @emotion/react */
import {Fragment, useEffect} from 'react'
import {useForm} from 'react-hook-form'
import {FiArrowLeft} from 'react-icons/fi'
import {useNavigate, Navigate} from 'react-router-dom'
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
  UsStateSelect,
  CurrencyInput,
} from '@solera/ui'
import {
  ThankYou,
  Layout,
  PlanRadio,
  StepTracker,
  EntitySelect,
  NetWorthSelect,
  PropertySelect,
  AddressFields,
} from 'components'
import {usePrescreenApplication} from 'hooks/use-prescreen-application'
import {useUpdateApplication} from 'hooks/use-update-application'

const stepRoute = (uuid, step) => `/application/${uuid}/prescreen/${step}`

function PreScreenApplicationScreen() {
  const navigate = useNavigate()
  const {
    uuid,
    data,
    fields,
    heading,
    minStep,
    maxStep,
    prevStep,
    resolver,
    nextStep,
    isLoading,
    subHeading,
    currentStep,
    defaultValues,
    isThankYouStep,
  } = usePrescreenApplication()
  const {
    reset: resetSave,
    mutate: saveEdit,
    isLoading: isSaving,
    isError: saveIsError,
  } = useUpdateApplication({
    onSuccess() {
      resetSave()
      navigate(stepRoute(uuid, nextStep))
      window.scrollTo(0, 0)
    },
  })
  const {register, handleSubmit, reset, watch, control, formState} = useForm({
    resolver,
    defaultValues,
    mode: 'onChange',
  })
  const idleStep = watch('idleStep')
  const isPurchase = watch('is_purchase') === 'true'

  useEffect(() => {
    if (idleStep !== defaultValues.idleStep) {
      reset(defaultValues)
    }
  }, [idleStep, reset, defaultValues])

  const isLastStep = maxStep === currentStep

  const handleSave = handleSubmit(form =>
    saveEdit(
      !isLastStep
        ? {...form, uuid}
        : {...form, uuid, status: 'pre_application_submitted'},
    ),
  )

  const stepBack = () => {
    navigate(stepRoute(uuid, prevStep))
    window.scrollTo(0, 0)
  }

  if (isLoading) {
    return 'Loading...'
  }

  if (!heading) {
    return <Navigate replace to="/" />
  }

  if (isThankYouStep) {
    return <ThankYou heading={heading} subHeading={subHeading} />
  }

  return (
    <Fragment>
      <StepTracker currentStep={currentStep} maxStep={maxStep} />
      <Layout>
        <div css={{textAlign: 'center'}}>
          <h1 css={{marginBottom: '3rem'}}>{heading}</h1>
          {subHeading && <p css={{margin: 0, fontWeight: 500}}>{subHeading}</p>}
        </div>
        <form
          name="prescreen"
          onSubmit={handleSave}
          css={{
            marginBottom: '3rem',
            '& > *': {
              marginTop: '65px',
            },
          }}
        >
          {fields.map(field => {
            let label = field.label
            let validation

            if (isPurchase) {
              switch (field.name) {
                case 'purchase_price':
                case 'requested_loan_amount':
                  label = field.label2
                  break
                case 'years_owned':
                case 'current_debt_balance':
                case 'estimated_improvement_costs':
                  return ''
                default:
              }
            } else {
              switch (field.name) {
                case 'years_owned':
                case 'current_debt_balance':
                case 'estimated_improvement_costs':
                  validation = {required: 'Required'}
                  break
                default:
              }
            }

            const props = {
              ...field,
              label,
              key: field.name,
              hasError: saveIsError,
            }

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
              case 'disclaimer':
                if (
                  field.name === 'requested_loan_amount_disclaimer' &&
                  !isPurchase
                )
                  return ''

                return (
                  <p
                    key={field.type}
                    css={{
                      fontWeight: 500,
                      marginTop: '2rem',
                      fontsize: '1.2rem',
                      color: colors.danger,
                    }}
                  >
                    {field.text}
                  </p>
                )
              case 'text':
              case 'number':
                return (
                  <Input {...props} {...register(field.name, validation)} />
                )
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
                switch (field.name) {
                  case 'plan_type':
                    return (
                      <PlanRadio
                        key={field.name}
                        {...field}
                        {...register(field.name)}
                      />
                    )
                  default:
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
                }
              case 'property':
                return (
                  <AddressFields
                    key={field.type}
                    control={control}
                    register={register}
                    hasError={saveIsError}
                    {...field.fields}
                  />
                )
              case 'select':
                switch (field.name) {
                  case 'estimated_net_worth_bracket':
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
              {currentStep === maxStep ? 'Submit application' : 'Continue'}
            </Button>
            {currentStep !== minStep ? (
              <TextLink
                onClick={stepBack}
                variant="secondary"
                css={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <FiArrowLeft
                  color={colors.secondary}
                  css={{marginRight: '4px'}}
                />
                Back
              </TextLink>
            ) : null}
          </div>
        </form>
      </Layout>
    </Fragment>
  )
}

export {PreScreenApplicationScreen}
