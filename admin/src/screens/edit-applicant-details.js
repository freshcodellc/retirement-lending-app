/** @jsxImportSource @emotion/react */
import * as React from 'react'
import {Navigate} from 'react-router-dom'
import {useForm} from 'react-hook-form'

import {colors, Input, RadioGroup, RadioInput} from '@solera/ui'
import {useEditApplication, useEditFields} from 'hooks/use-edit-application'
import {
  ReturnLink,
  StatusSelect,
  AdminSelect,
  Button,
  PhoneInput,
  MaskedInput,
  SsnInput,
  DatePicker,
  NetWorthsSelect,
} from 'components'

export default function EditApplicantInfo() {
  const {mutate: saveEdit} = useEditApplication()
  const {
    uuid,
    heading,
    fields,
    defaultValues,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useEditFields()
  const {handleSubmit, register, reset, control, formState} = useForm({
    mode: 'onChange',
    defaultValues,
  })

  React.useEffect(() => {
    if (isSuccess) {
      reset(defaultValues)
    }
  }, [isSuccess, reset, defaultValues])

  const handleEdit = handleSubmit(form => {
    console.log(form)
    saveEdit(form)
  })

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
          '& > div:not(:first-of-type)': {
            marginTop: '60px',
          },
          '& > div:first-of-type': {
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
            case 'text':
            case 'number':
              return <Input {...props} {...register(field.name)} />
            case 'phone':
              return <PhoneInput control={control} {...props} />
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
            case 'date':
              return <DatePicker control={control} {...props} />
            case 'physical':
              return (
                <AddressFields
                  key={field.type}
                  hasError={isError}
                  register={register}
                  {...field.fields}
                />
              )
            case 'mailing':
              return (
                <AddressFields
                  key={field.type}
                  hasError={isError}
                  register={register}
                  {...field.fields}
                />
              )
            case 'ssn':
              return <SsnInput {...props} />
            case 'select':
              switch (field.name) {
                case 'estimated_net_worth':
                  return <NetWorthsSelect control={control} {...props} />
                default:
              }
              break
            default:
              return 'invalid type'
          }
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
        <Input hasError={hasError} {...state} {...register(state.name)} />
        <Input
          hasError={hasError}
          {...postal_code}
          {...register(postal_code.name)}
        />
      </div>
    </React.Fragment>
  )
}

/**
 * TODO:
 * - dynamic select form by param :section
 * - Abstract address form into its own comp
 * - sharable controlled comp for checkbox in componnents
 * -
 *  */
