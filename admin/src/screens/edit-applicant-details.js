/** @jsxImportSource @emotion/react */
import * as React from 'react'
import {Navigate} from 'react-router-dom'
import {useForm} from 'react-hook-form'

import {Input} from '@solera/ui'
import {useEditApplication, useEditFields} from 'hooks/use-edit-application'
import {
  Button,
  Checkbox,
  SsnInput,
  ReturnLink,
  PhoneInput,
  DatePicker,
  EntitySelect,
  UsStateSelect,
  CurrencyInput,
  NetWorthSelect,
  PropertySelect,
} from 'components'

export default function EditApplicantInfo() {
  const {mutate: saveEdit} = useEditApplication()
  const {
    uuid,
    fields,
    error,
    heading,
    isError,
    isSuccess,
    isLoading,
    defaultValues,
  } = useEditFields()
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

  const handleEdit = handleSubmit(saveEdit)

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
          const props = {
            key: field.name,
            hasError: isError,
            ...field,
          }
          switch (field.type) {
            case 'heading':
              return (
                <h1 css={{margin: '100px 0 0'}} key={field.text}>
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
                  {...register(field.name, {
                    required: true,
                    pattern: /^\S+@\S+$/i,
                  })}
                />
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
          <Button
            type="submit"
            isLoading={isLoading}
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
