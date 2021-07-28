import {useMemo} from 'react'
import {useApplication} from 'hooks/use-application'
import {useParams} from 'react-router-dom'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {setApplicationDefaultValues} from 'utils/form'

function useFullApplication() {
  const {uuid, step} = useParams()
  const {data, isSuccess, isLoading, isError, error} = useApplication(uuid)
  const isIraCustodian = data.entity_type === 'IRA_custodial'

  const section = useMemo(
    () =>
      ({
        1: {
          heading: `Welcome back ${data.first_name}!`,
          subHeading: `We're excited to have you continue the application.`,
          fields: step1Fields,
          resolver: step1Resolver,
        },
        2: {
          heading: `Entity Information`,
          fields: step2Fields,
          resolver: step2Resolver,
        },
        ...(isIraCustodian
          ? {
              3: {
                heading: `Custodian and IRA Information`,
                fields: step3Fields,
                resolver: step3Resolver,
              },
            }
          : {}),
        [isIraCustodian ? 4 : 3]: {
          heading: `Please attach the following documents`,
          subHeading: `Files should be pfd, jpg, or png`,
          fields: steps4Fields,
          resolver: emptyResolver,
        },
        [isIraCustodian ? 5 : 4]: {
          heading: `Sign and certify`,
          subHeading: `I certify the information I provide on and in connection with this form is true and correct to the best of my knowledge.`,
          fields: step5Fields,
          resolver: step5Resolver,
        },
        [isIraCustodian ? 6 : 5]: {
          heading: `Thank you for your application`,
          subHeading: `We appreciate your interest in Solera's IRA lending program. We will review your application and contact you within x — x business days.`,
          fields: [],
          resolver: emptyResolver,
        },
      }[step] || {fields: []}),
    [step, data, isIraCustodian],
  )

  const defaultValues = useMemo(
    () =>
      section.fields.reduce(setApplicationDefaultValues(data), {
        idleStep: Number(step),
      }),
    [data, section, step],
  )

  const minStep = 1
  const maxStep = isIraCustodian ? 5 : 4

  const currentStep = Number(step)
  const prevStep = Math.max(currentStep - 1, minStep)
  const nextStep = Math.min(currentStep + 1, maxStep + 1)
  const isThankYouStep = currentStep === (isIraCustodian ? 6 : 5)

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

const emptyResolver = yupResolver(yup.object().shape({}))

// step 1
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
        type: 'text',
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
        type: 'text',
        name: 'mailing.postal_code',
        label: 'ZIP code',
        placeholder: 'ZIP code',
      },
    },
  },
]
const step1Resolver = yupResolver(
  yup.object().shape({
    date_of_birth: yup.string().required('Required'),
    physical: yup.object().shape({
      address: yup.string().required('Required'),
      address_2: yup.mixed().notRequired(),
      city: yup.string().required('Required'),
      state: yup.mixed().notOneOf(['empty'], 'Required'),
      postal_code: yup.string().required('Required'),
    }),
    years_at_address: yup.number().required('Required'),
    is_homeowner: yup.string().required('Required'),
    ssn: yup.string().required('Required'),
    mailing_equal_physical: yup.mixed().notRequired(),
    mailing: yup.object().shape({
      address: yup.mixed().notRequired(),
      address_2: yup.mixed().notRequired(),
      city: yup.mixed().notRequired(),
      state: yup.mixed().notRequired(),
      postal_code: yup.mixed().notRequired(),
    }),
  }),
)
// step 2
const step2Fields = [
  {
    type: 'text',
    label: 'Name of entity',
    placeholder: 'Name of entity',
    name: 'entity_name',
  },
  {
    type: 'text',
    label: 'EIN',
    placeholder: 'EIN',
    name: 'ein',
  },
  {
    type: 'select',
    label: 'State of formation',
    name: 'entity_state_of_formation',
  },
]
const step2Resolver = yupResolver(
  yup.object().shape({
    entity_name: yup.string().required('Required'),
    ein: yup.string().required('Required'),
    entity_state_of_formation: yup.mixed().notOneOf(['empty'], 'Required'),
  }),
)
// step 3
const step3Fields = [
  {
    type: 'custodian',
    name: 'custodian',
    fields: {
      name: {
        type: 'text',
        label: 'Name of custodian',
        placeholder: 'Name of custodian',
        name: 'custodian.name',
      },
      account_type: {
        type: 'radio',
        name: 'custodian.account_type',
        label: 'Is the IRA account a Roth or Traditional?',
        options: [
          {label: 'Roth', value: 'Roth'},
          {label: 'Traditional', value: 'Traditional'},
        ],
      },
      account_number: {
        type: 'number',
        label: 'What is the IRA account number?',
        placeholder: 'IRA account number',
        name: 'custodian.account_number',
      },
    },
  },
]
const step3Resolver = yupResolver(
  yup.object().shape({
    custodian: yup.object().shape({
      name: yup.string().required('Required'),
      account_type: yup.string().required('Required'),
      account_number: yup.string().required('Required'),
    }),
  }),
)
// step 4
const steps4Fields = [
  {
    type: 'upload',
    name: 'documents-uploads',
  },
]
// step 5
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
const step5Resolver = yupResolver(
  yup.object().shape({
    signature_entity_name: yup.string().required('Required'),
    signature_title: yup.string().required('Required'),
    signature: yup.string().required('Required'),
    signature_date: yup.string().required('Required'),
  }),
)
