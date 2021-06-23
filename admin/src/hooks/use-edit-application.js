import {useMemo} from 'react'
import {useMutation} from 'react-query'
import {useParams} from 'react-router-dom'

import applicationService from 'services/application-service'
import {useApplication, sections} from './use-application'

function useEditApplication(config) {
  return useMutation(() => new Promise(res => setTimeout(res, 1000)), config)
}

function useEditFields() {
  const {application, isSuccess, isLoading, isError, error} = useApplication()
  const {uuid, section} = useParams()

  const editSection =
    {
      [sections.applicant.route]: {
        ...sections.applicant,
        fields: applicantfields,
      },
    }[section] || {}

  return {
    uuid,
    isSuccess,
    isLoading,
    isError,
    error,
    ...editSection,
    defaultValues: application,
  }
}

const applicantfields = [
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
  {
    type: 'date',
    name: 'date_of_birth',
    label: 'Date of birth',
    placeholder: 'Date of birth',
  },
  {
    type: 'physical',
    fields: {
      address: {
        type: 'text',
        name: 'address',
        label: 'What is your physical address?',
        placeholder: 'Enter street address, No PO Box',
      },
      address_2: {
        type: 'text',
        name: 'address_2',
        label: 'Address line 2',
        placeholder: 'Apt, ste, unit, etc. optional',
      },
      city: {
        type: 'text',
        name: 'city',
        label: 'City',
        placeholder: 'City',
      },
      state: {
        type: 'text',
        name: 'state',
        label: 'State',
        placeholder: 'State',
      },
      postal_code: {
        type: 'number',
        name: 'postal_code',
        label: 'ZIP code',
        placeholder: 'ZIP code',
      },
    },
  },
  {
    type: 'number',
    name: 'years_at_address',
    label: 'How long have you lived at this address?',
    placeholder: 'Number of years lived at address',
  },
  {
    type: 'radio',
    name: 'is_homeowner',
    label: 'Do you own or rent?',
  },
  {
    type: 'ssn',
    name: 'ssn',
    label: 'Social Security Number',
    placeholder: 'Social Security Number',
  },
  {
    type: 'mailing',
    fields: {
      address: {
        type: 'text',
        name: 'address',
        label: 'What is your mailing address?',
        placeholder: 'Enter street address, No PO Box',
      },
      address_2: {
        type: 'text',
        name: 'address_2',
        label: 'Address line 2',
        placeholder: 'Apt, ste, unit, etc. optional',
      },
      city: {
        type: 'text',
        name: 'city',
        label: 'City',
        placeholder: 'City',
      },
      state: {
        type: 'text',
        name: 'state',
        label: 'State',
        placeholder: 'State',
      },
      postal_code: {
        type: 'number',
        name: 'postal_code',
        label: 'ZIP code',
        placeholder: 'ZIP code',
      },
    },
  },
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

export {useEditApplication, useEditFields}
