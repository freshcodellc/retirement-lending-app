/** @jsxImportSource @emotion/react */
import * as React from 'react'
import {Navigate} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import toast, {Toaster} from 'react-hot-toast'

import {
  Input,
  RadioGroup,
  RadioInput,
  Button,
  Checkbox,
  SsnInput,
  EinInput,
  PhoneInput,
  FormControl,
  UsStateSelect,
  CurrencyInput,
} from '@solera/ui'
import {
  PlanRadio,
  DatePicker,
  ReturnLink,
  EntitySelect,
  NetWorthSelect,
  PropertySelect,
} from 'components'
import {useUpdateApplication} from 'hooks/use-update-application'
import {useEditApplicantDetails} from 'hooks/use-edit-applicant-details'

import {AddressFields} from './address-fields'

export default function EditApplicantInfo() {
  const {
    mutate: saveEdit,
    isLoading: isSaving,
    isSuccess: saveIsSuccess,
    isError: saveIsError,
  } = useUpdateApplication()
  const {
    uuid,
    fields,
    error,
    heading,
    isError,
    isSuccess,
    isLoading,
    defaultValues,
  } = useEditApplicantDetails()
  const {handleSubmit, register, reset, control, watch, formState} = useForm({
    defaultValues,
    mode: 'onChange',
  })

  const mailingEqualPhysical = watch('mailing_equal_physical', false)

  React.useEffect(() => {
    if (isSuccess) {
      reset(defaultValues)
    }
  }, [isSuccess, reset, defaultValues])

  React.useEffect(() => {
    if (saveIsSuccess) {
      toast.success('Successfully saved!')
    }
  }, [saveIsSuccess])

  React.useEffect(() => {
    if (saveIsError) {
      toast.error('Failed to save. Please try again.')
    }
  }, [saveIsError])

  const handleEdit = handleSubmit(form => saveEdit({...form, uuid}))

  if (!heading) {
    return <Navigate replace to="/" />
  }

  if (isLoading) {
    return 'Loading...'
  }

  if (isError) {
    return `ERROR: ${error.message}`
  }

  return (
    <div>
      <h1>Edit {heading}</h1>
      <ReturnLink to={`/applicants/${uuid}`}>Applicant details</ReturnLink>
      <form
        name="edit-applicant-info"
        onSubmit={handleEdit}
        css={{
          display: 'flex',
          flexDirection: 'column',
          margin: '0 auto',
          width: '100%',
          maxWidth: '600px',
          '& > *': {
            marginTop: '60px',
          },
          '& > div:first-of-type, > p:first-of-type': {
            marginTop: '30px',
          },
        }}
      >
        {fields.map(field => {
          const props = {key: field.name, hasError: isError, ...field}
          switch (field.type) {
            case 'h1':
              return (
                <h1 css={{marginTop: '90px'}} key={field.text}>
                  {field.text}
                </h1>
              )
            case 'p':
              return (
                <p css={{fontWeight: 500}} key={field.type}>
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
            case 'ein':
              return <EinInput control={control} {...props} />
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
        <div css={{textAlign: 'center'}}>
          <Button
            type="submit"
            isLoading={isSaving}
            css={{margin: '1rem auto'}}
            disabled={!formState.isValid}
          >
            Save
          </Button>
          <Toaster />
        </div>
      </form>
    </div>
  )
}
