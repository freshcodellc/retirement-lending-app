/** @jsxImportSource @emotion/react */
import * as React from 'react'
import {Navigate} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import {useQueryClient} from 'react-query'

import {
  Input,
  RadioGroup,
  RadioInput,
  Button,
  Checkbox,
  SsnInput,
  PhoneInput,
  FormMessage,
  FormControl,
  UsStateSelect,
  CurrencyInput,
} from '@solera/ui'
import {
  DatePicker,
  ReturnLink,
  EntitySelect,
  NetWorthSelect,
  PropertySelect,
} from 'components'
import {useEditApplication, useEditFields} from 'hooks/use-edit-application'

export default function EditApplicantInfo() {
  const queryClient = useQueryClient()
  const {
    mutate: saveEdit,
    isLoading: isSaving,
    isError: saveIsError,
  } = useEditApplication()
  const {
    uuid,
    fields,
    error,
    heading,
    isError,
    isSuccess,
    isLoading,
    defaultValues,
  } = useEditFields({
    onSuccess: () =>
      queryClient.invalidateQueries('applications', {refetchInactive: true}),
  })
  const {handleSubmit, register, reset, control, watch, formState} = useForm({
    mode: 'onChange',
    defaultValues,
  })
  const mailingEqualPhysical = watch('mailing_equal_physical', false)

  React.useEffect(() => {
    if (isSuccess) {
      reset(defaultValues)
    }
  }, [isSuccess, reset, defaultValues])

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
      {saveIsError ? (
        <FormMessage variant="error">Failed to save!</FormMessage>
      ) : null}
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
        </div>
      </form>
    </div>
  )
}

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
    <React.Fragment>
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
    </React.Fragment>
  )
}
