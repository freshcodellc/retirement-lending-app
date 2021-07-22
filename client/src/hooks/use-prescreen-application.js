import {useMemo} from 'react'
import {useApplication} from 'hooks/use-application'
import {useParams} from 'react-router-dom'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {setApplicationDefaultValues} from 'utils/form'

function usePrescreenApplication() {
  const {uuid, step} = useParams()
  const {data, isSuccess, isLoading, isError, error} = useApplication(uuid)

  const section = useMemo(
    () =>
      ({
        1: {
          heading: `Welcome to Solera National Bank's lending platform for retirement accounts!`,
          subHeading: `To get started, we'll need some basic information from you.`,
          fields: step1Fields,
          resolver: step1Resolver,
        },
        2: {
          heading: `Tell us a little more about the property`,
          fields: step2Fields,
          resolver: step2Resolver,
        },
        3: {
          heading: `Tell us a little more about yourself`,
          fields: step3Fields,
          resolver: step3Resolver,
        },
        4: {
          heading: `Thank you for your application`,
          subHeading: `We appreciate your interest in Solera's IRA lending program. We will review your application and contact you within x — x business days.`,
          fields: [],
          resolver: emptyResolver,
        },
      }[step] || {fields: []}),
    [step],
  )

  const defaultValues = useMemo(
    () =>
      section.fields.reduce(setApplicationDefaultValues(data), {
        idleStep: Number(step),
      }),
    [data, section, step],
  )

  const minStep = 1
  const maxStep = 3
  const currentStep = Number(step)
  const prevStep = Math.max(currentStep - 1, minStep)
  const nextStep = Math.min(currentStep + 1, maxStep + 1)
  const isThankYouStep = currentStep === 4

  return {
    uuid,
    data,
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

const emptyResolver = yupResolver(yup.object().shape({}))

// step 1
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
    label:
      'What is the name of the financial institution that holds the funds to be used for this investment?',
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
const step1Resolver = yupResolver(
  yup.object().shape({
    fix_and_flip: yup.string().required('Required'),
    plan_type: yup.string().required('Required'),
    entity_type: yup.mixed().notOneOf(['empty'], 'Required'),
    entity_name: yup.string().required('Required'),
    funding_institution_name: yup.string().required('Required'),
    funding_account_balance: yup.string().required('Required'),
    first_name: yup.string().required('Required'),
    middle_name: yup.mixed().notRequired(),
    last_name: yup.string().required('Required'),
    phone_number: yup.string().required('Required'),
    email: yup.string().email().required('Required'),
  }),
)
// step 2
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
        type: 'text',
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
    label: 'Estimated monthly rent',
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
    label: 'Original Purchase Price',
    label2: 'What is the purchase price',
    name: 'purchase_price',
  },
  {
    type: 'currency',
    label: 'Requested loan amount',
    label2: 'Requested loan amount*',
    name: 'requested_loan_amount',
  },
  {
    type: 'disclaimer',
    name: 'requested_loan_amount_disclaimer',
    text: '*The maximum loan to value will be restricted to 65% of the lesser of the purchase price or appraised value.',
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
const step2Resolver = yupResolver(
  yup.object().shape({
    property: yup.object().shape({
      address: yup.string().required('Required'),
      address_2: yup.mixed().notRequired(),
      city: yup.string().required('Required'),
      state: yup.mixed().notOneOf(['empty'], 'Required'),
      postal_code: yup.string().required('Required'),
    }),
    property_type: yup.mixed().notOneOf(['empty'], 'Required'),
    lot_over_2_acres: yup.string().required('Required'),
    built_after_1950: yup.string().required('Required'),
    well_or_septic: yup.string().required('Required'),
    year_roof_replaced: yup.number().required('Required'),
    year_last_remodel: yup.number().required('Required'),
    is_rented: yup.string().required('Required'),
    monthly_current_rent: yup.string().required('Required'),
    annual_taxes: yup.string().required('Required'),
    annual_insurance_premium: yup.string().required('Required'),
    monthly_hoa_dues: yup.string().required('Required'),
    monthly_mgmt_fee: yup.string().required('Required'),
    is_purchase: yup.string().required('Required'),
    purchase_price: yup.string().required('Required'),
    requested_loan_amount: yup.string().required('Required'),
    //TODO: dynamically required when its new purchase
    years_owned: yup.mixed().notRequired(),
    current_debt_balance: yup.mixed().notRequired(),
    estimated_improvement_costs: yup.mixed().notRequired(),
    estimated_value: yup.string().required('Required'),
  }),
)
// step 3
const step3Fields = [
  {
    type: 'number',
    name: 'number_rental_properties',
    label: 'How many rental properties do you own?',
    placeholder: 'Number of rental properties',
  },
  {
    type: 'select',
    name: 'estimated_net_worth_bracket',
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
const step3Resolver = yupResolver(
  yup.object().shape({
    number_rental_properties: yup.number().required('Required'),
    estimated_net_worth_bracket: yup.mixed().notOneOf(['empty'], 'Required'),
    referrer: yup.mixed().notRequired(),
  }),
)
