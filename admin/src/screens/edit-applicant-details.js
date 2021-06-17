/** @jsxImportSource @emotion/react */
import * as React from 'react'
import {useParams} from 'react-router-dom'
import {useTable} from 'react-table'
import {useForm} from 'react-hook-form'
import {FiPhone, FiSend} from 'react-icons/fi'

import {
  colors,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Textarea,
  TableWrapper,
  Table,
  Tr,
  Th,
  Td,
  TextLink,
  Input,
} from '@solera/ui'
import {useSaveNote} from 'hooks/use-save-note'
import {useSendTermsSheet} from 'hooks/use-send-terms-sheet'
import {useApplication, sectionRoutes} from 'hooks/use-application'
import {
  ReturnLink,
  StatusSelect,
  AdminSelect,
  Button,
  PhoneInput,
  MaskedInput,
} from 'components'

export default function EditApplicantInfo() {
  const {uuid, section} = useParams()
  const {application, isLoading, isError, error} = useApplication()
  const {handleSubmit, register, control, formState} = useForm({
    mode: 'onChange',
  })

  const handleEdit = handleSubmit(form => {
    console.log(form)
  })

  if (isLoading) {
    return 'Loading...'
  }

  if (isError) {
    return `ERROR: ${error.message}`
  }

  return (
    <div>
      <h1>Edit applicant Information</h1>
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
        <Input
          id="first_name"
          name="first_name"
          label="First name"
          placeholder="First name"
          hasError={isError}
          {...register('first_name')}
        />
        <Input
          id="middle_name"
          name="middle_name"
          hasError={isError}
          label="Middle name (optional)"
          placeholder="Middle name (optional)"
          {...register('middle_name')}
        />
        <Input
          id="last_name"
          name="last_name"
          label="Last name"
          placeholder="Middle name (optional)"
          hasError={isError}
          {...register('last_name')}
        />
        <PhoneInput
          hasError={isError}
          control={control}
          name="phone_number"
          label="Phone number"
          placeholder="Phone number"
          rules={{required: true}}
        />
        <Input
          id="address"
          name="address"
          label="What is your physical address?"
          placeholder="Enter street address, No PO Box"
          hasError={isError}
          {...register('address')}
        />
        <Input
          id="address_2"
          name="address_2"
          hasError={isError}
          label="Address line 2"
          placeholder="Apt, ste, unit, etc. optional"
          {...register('address_2')}
        />
        <div
          css={{
            display: 'flex',
            gap: '1rem',
            '& > *': {width: 'calc((100% - 2rem)/3)'},
          }}
        >
          <Input
            id="city"
            name="city"
            label="City"
            placeholder="City"
            hasError={isError}
            {...register('city')}
          />
          <Input
            id="state"
            name="state"
            label="State"
            placeholder="State"
            hasError={isError}
            {...register('state')}
          />
          <Input
            id="postal_code"
            name="postal_code"
            label="ZIP code"
            placeholder="ZIP code"
            hasError={isError}
            {...register('postal_code')}
          />
        </div>
        <Input
          type="number"
          id="years_at_address"
          name="years_at_address"
          label="How long have you lived at this address?"
          placeholder="Number of years lived at address"
          hasError={isError}
          {...register('years_at_address')}
        />
        <MaskedInput
          unmask
          id="ssn"
          name="ssn"
          mask="000-00-0000"
          label="Social Security Number"
          placeholder="Social Security Number"
          hasError={isError}
          {...register('ssn')}
        />
        <Input
          id="referrer"
          name="referrer"
          placeholder="Referrer"
          label="Who referred you to Solera National Bank?"
          hasError={isError}
          {...register('referrer')}
        />
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

const fields = [
  {
    label: '',
    placeholder: '',
    name: '',
    type: ''
  }
]

/**
 * TODO:
 * - dynamic select form by param :section
 * - Abstract address form into its own comp
 * - sharable controlled comp for checkbox in componnents
 * -
 *  */
