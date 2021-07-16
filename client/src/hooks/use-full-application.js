import {useMemo} from 'react'
import {useApplication} from 'hooks/use-application'
import {useParams} from 'react-router-dom'
import {setApplicationDefaultValues} from 'utils/form'

function useFullApplication() {
  const {uuid, step} = useParams()
  const {data, isSuccess, isLoading, isError, error} = useApplication(uuid)
  data.addresses = [
    {
      type: 'property',
      address: '12 Main St',
      address_2: null,
      city: 'Lehi',
      state: 'Utah',
      postal_code: '84043',
    },
  ]
  const section = useMemo(
    () =>
      ({
        1: {
          heading: `Welcome back ${data.first_name}!`,
          subHeading: `We're excited to have you continue the application.`,
          fields: step1Fields,
        },
        2: {
          heading: `Entity Information `,
          fields: step2Fields,
        },
        3: {
          heading: `Custodian and IRA Information`,
          fields: step3Fields,
        },
        4: {
          heading: `Please attach the following documents`,
          subHeading: `Files should be pfd, jpg, or png`,
          fields: steps4Fields,
        },
        5: {
          heading: `Sign and certify `,
          subHeading: `I certify the information I provide on and in connection with this form is true and correct to the best of my knowledge.`,
          fields: step5Fields,
        },
        6: {
          heading: `Thank you for your application`,
          subHeading: `We appreciate your interest in Solera's IRA lending program. We will review your application and contact you within x — x business days.`,
          fields: [],
        },
      }[step] || {fields: []}),
    [step, data],
  )

  const defaultValues = useMemo(
    () =>
      section.fields.reduce(setApplicationDefaultValues(data), {
        idleStep: Number(step),
      }),
    [data, section, step],
  )

  const minStep = 1
  const maxStep = 5
  const currentStep = Number(step)
  const prevStep = Math.max(currentStep - 1, minStep)
  const nextStep = Math.min(currentStep + 1, maxStep + 1)
  const isThankYouStep = currentStep === 6

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

export {useFullApplication}

const step1Fields = [
  {
    type: 'property',
    label: 'Property address',
    name: 'addresses',
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
]

const step2Fields = [
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
]

const step3Fields = [
  {
    type: 'radio',
    name: 'plan_type',
    label: 'What type of retirement plan do you have?',
    options: [
      {label: 'IRA', value: 'IRA'},
      {label: '401K', value: '401K'},
    ],
  },
]

const steps4Fields = [
  {
    type: 'p',
  },
]

const step5Fields = [
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
