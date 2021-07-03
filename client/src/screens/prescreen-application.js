/** @jsxImportSource @emotion/react */
import {Fragment, useEffect} from 'react'
import {useForm} from 'react-hook-form'
import {FiArrowLeft} from 'react-icons/fi'
import {Link, useNavigate, Navigate} from 'react-router-dom'
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
    fields,
    heading,
    minStep,
    maxStep,
    prevStep,
    nextStep,
    isSuccess,
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
    },
  })
  const {register, handleSubmit, reset, watch, control, formState} = useForm({
    mode: 'onChange',
    defaultValues,
  })
  useEffect(() => {
    if (isSuccess) {
      reset(defaultValues)
    }
  }, [isSuccess, reset, defaultValues])

  const planType = watch('plan_type')
  useEffect(() => {
    if (planType !== defaultValues.plan_type) {
      reset({...defaultValues, plan_type: planType, entity_type: 'empty'})
    }
  }, [planType, reset, defaultValues])

  const handleSave = handleSubmit(form => saveEdit({...form, uuid}))

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
            const props = {key: field.name, hasError: saveIsError, ...field}
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
              {currentStep === maxStep ? 'Submit application' : 'Continue'}
            </Button>
            {currentStep !== minStep ? (
              <Link
                replace
                to={stepRoute(uuid, prevStep)}
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
      </Layout>
    </Fragment>
  )
}

export {PreScreenApplicationScreen}
