import {useMemo} from 'react'
import {useApplication} from 'hooks/use-application'
import {useParams} from 'react-router-dom'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import filter from 'lodash/filter'
import {setApplicationDefaultValues} from 'utils/form'

function useFullApplication() {
  const LLC_TYPES = ['401k_LLC', 'IRA_LLC']
  const {uuid, step} = useParams()
  const {data, isSuccess, isLoading, isError, error} = useApplication(uuid)
  const isIraCustodian = data.entity_type === 'IRA_custodial'
  const isLLC = LLC_TYPES.includes(data.entity_type)

  const hasCustodianSteps = {
    1: {
      heading: `Welcome back ${data.first_name}!`,
      subHeading: `We're excited to have you continue the application.`,
      stepSlug: 'welcome',
      fields: personalInfoFields,
      resolver: personalInfoFieldsResolver,
    },
    2: {
      heading: `Entity Information`,
      fields: getEntityFields(isLLC),
      stepSlug: 'entity-information',
      resolver: getStep2Resolver(isLLC),
    },
    3: {
      heading: `Custodian and IRA Information`,
      fields: custodianFields,
      stepSlug: 'custodian-information',
      resolver: custodianFieldsResolver,
    },
    4: {
      heading: `Please attach the following documents`,
      subHeading: `Files should be pfd, jpg, or png`,
      stepSlug: 'uploads',
      fields: uploadFields,
      resolver: emptyResolver,
    },
    5: {
      heading: 'Compliance and Disclosures',
      stepSlug: 'disclosures',
      fields: disclosureFields,
      resolver: disclosureResolver,
    },
    6: {
      heading: `Sign and certify`,
      subHeading: `I certify the information I provide on and in connection with this form is true and correct to the best of my knowledge.`,
      stepSlug: 'sign-and-certify',
      fields: signatureFields,
      resolver: signatureFieldsResolver,
    },
    7: {
      heading: `Thank you for your application`,
      subHeading: `We appreciate your interest in Solera's IRA lending program. We will review your application and contact you within 2 — 5 business days.`,
      fields: [],
      stepSlug: 'thank-you',
      resolver: emptyResolver,
    },
  }

  const defaultSteps = {
    1: {
      heading: `Welcome back ${data.first_name}!`,
      subHeading: `We're excited to have you continue the application.`,
      fields: personalInfoFields,
      stepSlug: 'welcome',
      resolver: personalInfoFieldsResolver,
    },
    2: {
      heading: `Entity Information`,
      fields: getEntityFields(isLLC),
      stepSlug: 'entity-information',
      resolver: getStep2Resolver(isLLC),
    },
    3: {
      heading: `Please attach the following documents`,
      subHeading: `Files should be pfd, jpg, or png`,
      fields: uploadFields,
      stepSlug: 'uploads',
      resolver: emptyResolver,
    },
    4: {
      heading: 'Compliance and Disclosures',
      fields: disclosureFields,
      stepSlug: 'disclosures',
      resolver: disclosureResolver,
    },
    5: {
      heading: `Sign and certify`,
      subHeading: `I certify the information I provide on and in connection with this form is true and correct to the best of my knowledge.`,
      fields: signatureFields,
      stepSlug: 'sign-and-certify',
      resolver: signatureFieldsResolver,
    },
    6: {
      heading: `Thank you for your application`,
      subHeading: `We appreciate your interest in Solera's IRA lending program. We will review your application and contact you within 2 — 5 business days.`,
      fields: [],
      stepSlug: 'thank-you',
      resolver: emptyResolver,
    },
  }

  const section = useMemo(() => {
    const steps = isIraCustodian ? hasCustodianSteps : defaultSteps
    return steps[step] || {fields: []}
  }, [step, data, isIraCustodian])

  const defaultValues = useMemo(
    () =>
      section.fields.reduce(setApplicationDefaultValues(data), {
        idleStep: Number(step),
      }),
    [data, section, step],
  )

  const minStep = 1
  const maxStep = isIraCustodian ? 6 : 5

  const currentStep = Number(step)
  const prevStep = Math.max(currentStep - 1, minStep)
  const nextStep = Math.min(currentStep + 1, maxStep + 1)
  const isThankYouStep = currentStep === (isIraCustodian ? 7 : 6)

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

const personalInfoFields = [
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
    label: 'How many years have you lived at this address?',
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

const personalInfoFieldsResolver = yupResolver(
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

const entityFields = [
  {
    type: 'text',
    label: 'Name of entity',
    placeholder: 'Name of entity',
    name: 'entity_name',
  },
  {
    type: 'ein',
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

const getEntityFields = entityIsLLC =>
  entityIsLLC
    ? entityFields
    : filter(entityFields, field => field.name !== 'entity_state_of_formation')

const getStep2Resolver = entityIsLLC =>
  yupResolver(
    yup.object().shape({
      entity_name: yup.string().required('Required'),
      ein: yup.string().min(9).max(10).required('Required'),
      entity_state_of_formation: entityIsLLC
        ? yup.mixed().notOneOf(['empty'], 'Required')
        : yup.mixed(),
    }),
  )

const custodianFields = [
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

const custodianFieldsResolver = yupResolver(
  yup.object().shape({
    custodian: yup.object().shape({
      name: yup.string().required('Required'),
      account_type: yup.string().required('Required'),
      account_number: yup.string().required('Required'),
    }),
  }),
)

const uploadFields = [
  {
    type: 'upload',
    name: 'documents-uploads',
  },
]

const disclosureFields = [
  {
    type: 'radio',
    name: 'is_in_marijuana_industry',
    label: (
      <>
        <p>
          Federal laws and regulations currently prevent banks from actively
          engaging in providing financial services to clients involved in the
          marijuana industry. Please review the following questions and provide
          your answers.
          <br />
          <br />
        </p>
        <p>
          1. Are any of the funds currently in the IRA or 401k, or to be
          contributed to the IRA or 401k, directly or indirectly sourced from
          the marijuana industry?
        </p>
        <p>
          1.1 In addition, are any of the following entities or individuals
          associated with the loan request - IRA Custodian/401k Trustee, the LLC
          under the IRA or 401k, the authorized signer for, or manager of the
          LLC, or the title holder of the property - directly or indirectly
          associated with, or related to, the marijuana industry (growing,
          producing, manufacturing, processing, selling (wholesale or retail) or
          any other connection?
        </p>
      </>
    ),
    options: [
      {label: 'Yes', value: true},
      {label: 'No', value: false},
    ],
  },
  {
    type: 'p',
    text: 'If you answered yes to question 1, do not proceed as we cannot provide financing to entities involved in the marijuana industry.',
    styles: {
      color: 'rgb(225, 64, 56)',
    },
  },
  {
    type: 'radio',
    name: 'is_us_citizen',
    label:
      '2. Is the individual IRA Custodian, 401k Trustee, or IRA or Trust Beneficiary a US Citizen?',
    options: [
      {label: 'Yes', value: true},
      {label: 'No', value: false},
    ],
  },
  {
    type: 'radio',
    name: 'is_resident_non_us_citizen',
    label:
      '3. If no, is the individual referenced in the question above a resident non-US Citizen?',
    options: [
      {label: 'Yes', value: true},
      {label: 'No', value: false},
      {label: 'N/A', value: null},
    ],
  },
  {
    type: 'p',
    text: 'If you answered no to both questions 2 and 3, do not proceed as we cannot provide financing to non-resident aliens.',
    styles: {
      color: 'rgb(225, 64, 56)',
    },
  },
  {
    type: 'radio',
    name: 'has_tax_liens',
    label:
      '4. Are there any judgments or tax liens filed against the IRA or 401k or the individuals in Question #1 above?',
    options: [
      {label: 'Yes', value: true},
      {label: 'No', value: false},
    ],
  },
  {
    type: 'radio',
    name: 'has_past_foreclosures',
    label:
      '5. Has the IRA LLC, 401k Trust/401k LLC or individuals named above ever had any real estate foreclosed or property repossessed?',
    options: [
      {label: 'Yes', value: true},
      {label: 'No', value: false},
    ],
  },
  {
    type: 'radio',
    name: 'has_legal_action',
    label:
      '6. Is the IRA/IRA LLC, the 401k Trust/401k LLC, the 401k Trustee or the IRA or 401k Trust beneficiary involved in pending or ongoing legal actions?',
    options: [
      {label: 'Yes', value: true},
      {label: 'No', value: false},
    ],
  },
  {
    type: 'radio',
    name: 'has_contingent_liabilities',
    label:
      '7. Does the IRA LLC or 401k Trust/401k LLC have any contingent liabilities as an endorser, co-maker or guarantor of any other debt?',
    options: [
      {label: 'Yes', value: true},
      {label: 'No', value: false},
    ],
  },
  {
    type: 'textArea',
    name: 'disclosure_explanation',
    label:
      "If you answered 'YES' to any of questions 3 - 7, please provide a detailed explanation for each question you answered 'YES' to:",
  },
  {
    type: 'radio',
    name: 'agrees_in_borrowers_name',
    label:
      '8. You understand and agree that you will be taking ownership of the property in the name of the borrower (e.g. your IRA/401k, etc...)',
    options: [],
  },
  {
    type: 'text',
    name: 'appraisal_initials',
    label: (
      <>
        <div>
          Note: We may order an appraisal to determine the property’s value and
          charge you for the appraisal. We will promptly give you a copy of the
          appraisal, even if your loan does not close.
        </div>
        <div>
          <br />
          Please initial here to agree to these terms
        </div>
      </>
    ),
    placeholder: 'Your initals here',
    maxLength: 3,
  },
]

const disclosureResolver = yupResolver(
  yup.object().shape({
    is_in_marijuana_industry: yup.string().required('Required'),
    is_us_citizen: yup.string().required('Required'),
    is_resident_non_us_citizen: yup.string(),
    has_tax_liens: yup.string().required('Required'),
    has_past_foreclosures: yup.string().required('Required'),
    has_legal_action: yup.string().required('Required'),
    has_contingent_liabilities: yup.string().required('Required'),
    disclosure_explanation: yup.string().nullable(),
    appraisal_initials: yup.string().required('Required'),
  }),
)

const signatureFields = [
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
    disabled: true,
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
    disabled: true,
  },
]

const signatureFieldsResolver = yupResolver(
  yup.object().shape({
    signature_entity_name: yup.string().required('Required'),
    signature_title: yup.string(),
    signature: yup.string().required('Required'),
    signature_date: yup.string(),
  }),
)
