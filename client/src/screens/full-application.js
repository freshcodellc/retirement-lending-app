/** @jsxImportSource @emotion/react */
import {Fragment, useEffect, useState} from 'react'
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
  UsStateSelect,
  CurrencyInput,
} from '@solera/ui'
import {
  ThankYou,
  Layout,
  PlanRadio,
  DatePicker,
  StepTracker,
  EntitySelect,
  FilePreview,
  FileUploader,
  NetWorthSelect,
  PropertySelect,
  AddressFields,
} from 'components'
import {useConstants} from 'hooks/use-constants'
import {useFullApplication} from 'hooks/use-full-application'
import {useUpdateApplication} from 'hooks/use-update-application'

const stepRoute = (uuid, step) => `/application/${uuid}/full/${step}`

function FullApplicationScreen() {
  const [hasAddDocs, setHasAddDocs] = useState(false)
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
  } = useFullApplication()
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
  const {register, handleSubmit, reset, watch, setValue, control, formState} =
    useForm({
      mode: 'onChange',
      defaultValues,
      resolver,
    })
  const idleStep = watch('idleStep')
  const mailingEqualPhysical = watch('mailing_equal_physical', false)

  useEffect(() => {
    if (idleStep !== defaultValues.idleStep) {
      reset(defaultValues)
    }
  }, [idleStep, reset, defaultValues])

  const handleSave = handleSubmit(form => saveEdit({...form, uuid}))

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
            const props = {
              ...field,
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
              case 'upload':
                return (
                  <DocumentUploads
                    uuid={uuid}
                    key={field.name}
                    documents={data.documents}
                    setHasAddDocs={setHasAddDocs}
                    entityType={data.entity_type}
                  />
                )
              case 'custodian':
                const {name, account_type, account_number} = field.fields
                return (
                  <Fragment key={field.type}>
                    <Input
                      {...props}
                      {...name}
                      key={name.name}
                      {...register(name.name)}
                    />
                    <RadioGroup
                      {...props}
                      key={account_type.name}
                      text={account_type.label}
                    >
                      {account_type.options.map(o => (
                        <RadioInput
                          {...o}
                          key={o.label}
                          name={account_type.name}
                          id={account_type.name + o.label}
                          {...register(account_type.name)}
                        />
                      ))}
                    </RadioGroup>
                    <Input
                      {...props}
                      {...account_number}
                      key={account_number.name}
                      {...register(account_number.name)}
                    />
                  </Fragment>
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
                const {address, address_2, city, state, postal_code} =
                  defaultValues.property
                return (
                  <div
                    key={field.type}
                    css={{
                      border: `1px solid #000`,
                      padding: '2rem',
                      textAlign: 'center',
                      display: 'flex',
                      justifyContent: 'center',
                      maxWidth: '400px',
                      margin: '50px auto 0',
                      flexDirection: 'column',
                    }}
                  >
                    <div
                      css={{
                        fontWeight: 600,
                        fontsize: '18px',
                        marginBottom: '1.5rem',
                      }}
                    >
                      {field.label}
                    </div>
                    <div>
                      {address} {address_2}
                    </div>
                    <div>
                      {city}, {state} {postal_code}
                    </div>
                  </div>
                )
              case 'physical':
              case 'mailing':
                if (field.type === 'mailing' && mailingEqualPhysical) break
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
                        setValue={setValue}
                        control={control}
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
              disabled={!formState.isValid || (currentStep === 4 && !hasAddDocs)}
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
export {FullApplicationScreen}

function DocumentUploads({uuid, entityType, documents, setHasAddDocs}) {
  const {documentTypes} = useConstants()

  let selectedTypes = []
  switch (entityType) {
    case 'IRA_LLC':
      selectedTypes = [
        'operating_agreement',
        'articles_of_incorporation',
        'lease_agreement',
        'purchase_contract',
      ]
      break
    case 'IRA_custodial':
      selectedTypes = [
        'traditional_and_roth_ira_custodial_account_agreement',
        'corporate_resolution',
        'most_recent_ira_statement',
        'direction_of_investment_form',
        'lease_agreement',
        'purchase_contract',
      ]
      break
    case '401k_trust':
    case 'IRA_trust':
      selectedTypes = [
        'adoption_agreement',
        'trust_agreement',
        'lease_agreement',
        'purchase_contract',
      ]
      break
    case '401k_LLC':
      selectedTypes = [
        'operating_agreement',
        'articles_of_incorporation',
        'lease_agreement',
        'purchase_contract',
      ]
      break
    default:
  }

  const filteredTypes = documentTypes.filter(d =>
    selectedTypes.includes(d.name),
  )
  const existingTypes = documents.map(dc => dc.document_type)
  const hasAllDocs = selectedTypes.every(t => existingTypes.includes(t))

  useEffect(() => {
    setHasAddDocs(hasAllDocs)
  }, [hasAllDocs, setHasAddDocs])

  return filteredTypes.map(d => (
    <div
      key={d.name}
      css={{
        border: `1px solid #000`,
        padding: '3rem',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        maxWidth: '600px',
        margin: '50px auto 0',
        flexDirection: 'column',
      }}
    >
      <div
        css={{
          fontWeight: 600,
          fontSize: '18px',
          marginBottom: '4rem',
        }}
      >
        {d.humanized}
      </div>
      {documents
        .filter(dc => d.name === dc.document_type)
        .map(dc => (
          <FilePreview
            isDone
            name={dc.name}
            key={dc.s3_key}
            blob={dc.presigned_url}
          />
        ))}
      <FileUploader multiple type={d.name} appUuid={uuid} canCancel={false} />
    </div>
  ))
}
