import {useMemo} from 'react'
import {useMutation} from 'react-query'
import {useParams} from 'react-router-dom'

import applicationService from 'services/application-service'
import {useApplication, sections} from './use-application'

function useEditApplication(config) {
  return useMutation(applicationService.update, config)
}

function useEditFields() {
  const {application, isSuccess, isLoading, isError, error} = useApplication()
  const {uuid, section} = useParams()
  // check if mailing equals physical and set default value for "mailing_equal_physical"
  const editSection = useMemo(
    () =>
      ({
        [sections.applicant.route]: {
          ...sections.applicant,
          fields: applicantfields,
        },
        [sections.property.route]: {
          ...sections.property,
          fields: propertyFields,
        },
        [sections.retirement.route]: {
          ...sections.property,
          fields: eraFields,
        },
        [sections.sign.route]: {
          ...sections.sign,
          fields: signCertifyFields,
        },
      }[section] || {}),
    [section],
  )
  const defaultValues = useMemo(
    () =>
      editSection.fields.reduce((acc, cur) => {
        if (cur.name && cur.name in application) {
          let value = application[cur.name]
          if (cur.type === 'select' && !value) {
            value = 'empty'
          }
          acc[cur.name] = value
        }
        return acc
      }, {}),
    [application, editSection],
  )

  return {
    uuid,
    error,
    isError,
    isSuccess,
    isLoading,
    defaultValues,
    ...editSection,
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
    name: 'addresses',
    fields: {
      address: {
        type: 'text',
        name: 'physical.address',
        label: 'What is your physical address?',
        placeholder: 'Enter street address, No PO Box',
      },
      address_2: {
        type: 'text',
        name: 'physical.address_2',
        label: 'Address line 2',
        placeholder: 'Apt, ste, unit, etc. optional',
      },
      city: {
        type: 'text',
        name: 'physical.city',
        label: 'City',
        placeholder: 'City',
      },
      state: {
        type: 'select',
        name: 'physical.state',
        label: 'State',
        placeholder: 'State',
      },
      postal_code: {
        type: 'number',
        name: 'physical.postal_code',
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
    options: [
      {label: 'Own', value: true},
      {label: 'Rent', value: false},
    ],
  },
  {
    type: 'ssn',
    name: 'ssn',
    label: 'Social Security Number',
    placeholder: 'Social Security Number',
  },
  {
    type: 'checkbox',
    name: 'mailing_equal_physical',
    label: 'My mailing address is the same as my physical',
  },
  {
    type: 'mailing',
    name: 'addresses',
    fields: {
      address: {
        type: 'text',
        name: 'mailing.address',
        label: 'What is your mailing address?',
        placeholder: 'Enter street address, No PO Box',
      },
      address_2: {
        type: 'text',
        name: 'mailing.address_2',
        label: 'Address line 2',
        placeholder: 'Apt, ste, unit, etc. optional',
      },
      city: {
        type: 'text',
        name: 'mailing.city',
        label: 'City',
        placeholder: 'City',
      },
      state: {
        type: 'select',
        name: 'mailing.state',
        label: 'State',
        placeholder: 'State',
      },
      postal_code: {
        type: 'number',
        name: 'mailing.postal_code',
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

const propertyFields = [
  {
    type: 'property',
    name: 'addresses',
    fields: {
      address: {
        type: 'text',
        name: 'property.address',
        label: 'Physical address of property',
        placeholder: 'Enter street address, No PO Box',
      },
      address_2: {
        type: 'text',
        name: 'property.address_2',
        label: 'Address line 2',
        placeholder: 'Apt, ste, unit, etc. optional',
      },
      city: {
        type: 'text',
        name: 'property.city',
        label: 'City',
        placeholder: 'City',
      },
      state: {
        type: 'select',
        name: 'property.state',
        label: 'State',
        placeholder: 'State',
      },
      postal_code: {
        type: 'number',
        name: 'property.postal_code',
        label: 'ZIP code',
        placeholder: 'ZIP code',
      },
    },
  },
  {
    type: 'select',
    name: 'property_type',
    label: 'Property type',
  },
  {
    type: 'radio',
    name: 'lot_over_2_acres',
    label: 'Is the lot more than 2 acres?',
    options: [
      {label: 'Yes', value: true},
      {label: 'No', value: false},
    ],
  },
  {
    type: 'radio',
    name: 'built_after_1950',
    label: 'Was the property built after 1950?',
    options: [
      {label: 'Yes', value: true},
      {label: 'No', value: false},
    ],
  },
  {
    type: 'radio',
    name: 'well_or_septic',
    label: 'Is the home on a well or septic system?',
    options: [
      {label: 'Yes', value: true},
      {label: 'No', value: false},
    ],
  },
  {
    type: 'number',
    name: 'year_roof_replaced',
    label: 'What year was the roof last replaced?',
  },
  {
    type: 'number',
    name: 'year_last_remodel',
    label: 'When was the property last remodeled?',
  },
  {
    type: 'h1',
    text: 'Property Income and Fees',
  },
  {
    type: 'radio',
    name: 'is_rented',
    label: 'Is the property currently rented?',
    options: [
      {label: 'Yes', value: true},
      {label: 'No', value: false},
    ],
  },
  {
    type: 'currency',
    name: 'monthly_current_rent',
    label: 'Current monthly rent',
  },
  {
    type: 'currency',
    name: 'annual_taxes',
    label: 'Annual real estate taxes',
  },
  {
    type: 'currency',
    name: 'annual_insurance_premium',
    label: 'Annual insurance premiums',
  },
  {
    type: 'currency',
    name: 'monthly_hoa_dues',
    label: 'Monthly HOA fees',
  },
  {
    type: 'currency',
    name: 'monthly_mgmt_fee',
    label: 'Monthly property management fees',
  },
  // financing section
  {
    type: 'h1',
    text: 'Financing Information',
  },
  {
    type: 'radio',
    label: 'New purchase or refinance',
    name: 'is_purchase',
    options: [
      {label: 'New purchase', value: true},
      {label: 'Refinance', value: false},
    ],
  },
  {
    type: 'currency',
    label: 'Requested loan amount*',
    name: 'requested_loan_amount',
    helperText: '(note: max loan amount is 65% of purchase price)',
  },
  {
    type: 'currency',
    label: 'Balance of current debt on the property',
    name: 'current_debt_balance',
  },
  {
    type: 'number',
    label: 'Number of years you have owned the property',
    name: 'years_owned',
  },
  {
    type: 'currency',
    label: 'Estimated amount spent on home improvements',
    name: 'estimated_improvement_costs',
  },
  {
    type: 'currency',
    label: 'Estimated value of the property',
    name: 'estimated_value',
  },
]

const eraFields = [
  {
    type: 'radio',
    name: 'fix_and_flip',
    label: 'Do you plan to "fix & flip" this property',
    options: [
      {label: 'Yes', value: true},
      {label: 'No', value: false},
    ],
  },
  {
    type: 'h1',
    text: 'Retirement Account Information',
  },
  {
    type: 'radio',
    name: 'plan_type',
    label: 'What type of retirement plan do you have?',
    options: [
      {label: 'IRA', value: 'IRA'},
      {label: '401K', value: '401K'},
    ],
  },
  {
    type: 'select',
    label: 'What entity type will the property be titled under?',
    name: 'entity_type',
  },
  {
    type: 'text',
    label: 'Name of entity',
    name: 'entity_name',
  },
  {
    type: 'text',
    label: 'EIN',
    name: 'ein',
  },
  {
    type: 'select',
    label: 'State of formation',
    placeholder: 'State of formation',
    name: 'entity_state_of_formation',
  },
  {
    type: 'text',
    label: 'Where are the funds held to be used for this investment?',
    name: 'funding_institution_name',
  },
  {
    type: 'currency',
    label:
      'What is the cash balance in the account to be used for this investment?',
    name: 'funding_account_balance',
  },
]

const signCertifyFields = [
  {
    type: 'p',
    text: 'I certify the information I provide on and in connection with this form is true and correct to the best of my knowledge.',
  },
  {
    type: 'text',
    name: 'signature_entity_name',
    label: 'Name of entity',
    placeholder: 'Name of entity',
  },
  {
    type: 'text',
    name: 'signature_title',
    label: 'Legal name and title of authorized signer',
    placeholder: 'Legal name and title',
  },
  {
    type: 'text',
    name: 'signature',
    label: 'Signature of authorized signer',
    placeholder: 'Enter legal name',
  },
  {
    type: 'date',
    label: 'Date',
    name: 'signature_date',
  },
]

export {useEditApplication, useEditFields}
