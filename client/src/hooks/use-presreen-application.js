import {useMemo} from 'react'
import {useLoanApplication} from 'hooks/useLoanApplication'
import {useParams} from 'react-router-dom'

function usePrescreenApplication() {
  const {uuid, step} = useParams()
  const {data, isSuccess, isLoading, isError, error} = useLoanApplication(uuid)

  const section = useMemo(
    () =>
      ({
        1: {
          heading: `Welcome to Solera National Bank's lending platform for retirement accounts!`,
          subHeading: `To get started, we'll need some basic information from you.`,
          fields: step1Fields,
        },
        2: {
          heading: `Tell us a little more about the property`,
          fields: step2Fields,
        },
        3: {
          heading: `Tell us a little more about yourself`,
          fields: step3Fields,
        },
        4: {
          heading: `Thank you for your application`,
          subHeading: `We appreciate your interest in Solera's IRA lending program. We will review your application and contact you within x — x business days.`,
          fields: [],
        },
      }[step] || {fields: []}),
    [step],
  )

  const defaultValues = useMemo(
    () =>
      section.fields.reduce((acc, cur) => {
        if (cur.name in data) {
          let value = data[cur.name]
          if (value != null) {
            if (cur.type === 'select') {
              value = 'empty'
            } else if (cur.type === 'radio') {
              if (value === true) {
                value = 'true'
              } else if (value === false) {
                value = 'false'
              }
            }
          }
          acc[cur.name] = value
        }
        return acc
      }, {}),
    [data, section],
  )

  const minStep = 1
  const maxStep = 3
  const currentStep = Number(step)
  const prevStep = Math.max(currentStep - 1, minStep)
  const nextStep = Math.max(currentStep + 1, maxStep + 1)
  const isThankYouStep = currentStep === 4

  return {
    uuid,
    error,
    isError,
    maxStep,
    prevStep,
    nextStep,
    minStep,
    isSuccess,
    isLoading,
    currentStep,
    defaultValues,
    isThankYouStep,
    ...section,
  }
}

export {usePrescreenApplication}

const step1Fields = [
  {
    type: 'h1',
    text: 'Eligibility',
  },
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
    type: 'alert',
    text: 'Currently not accepting applications for properties in New York or New Jersey.',
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
    label: 'Where are the funds held to be used for this investment?',
    name: 'funding_institution_name',
  },
  {
    type: 'currency',
    label:
      'What is the cash balance in the account to be used for this investment?',
    name: 'funding_account_balance',
  },
  {
    type: 'h1',
    text: 'Personal Information',
  },
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
]

const step2Fields = [
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

const step3Fields = [
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
