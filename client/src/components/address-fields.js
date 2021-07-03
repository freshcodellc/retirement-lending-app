/** @jsxImportSource @emotion/react */
import {Fragment} from 'react'
import {Input, UsStateSelect} from '@solera/ui'

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

export {AddressFields}
