import {useMemo} from 'react'
import {useApplication} from 'hooks/use-application'
import {useParams} from 'react-router-dom'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {setApplicationDefaultValues} from 'utils/form'

function usePostApproval() {
  const {uuid, step} = useParams()
  const {data, isSuccess, isLoading, isError, error} = useApplication(uuid)

  const section = useMemo(
    () =>
      ({
        1: {
          heading: `Post-Approval Form`,
          subHeading: `For us to complete the loan and to help everything go smoothly, please provide the following information.`,
          fields: step1Fields,
          resolver: step1Resolver,
        },
        2: {
          heading: `Thank you for your Post-Approval Form`,
          fields: [],
          resolver: emptyResolver,
        },
      }[step] || {fields: []}),
    [step],
  )

  const defaultValues = useMemo(
    () => section.fields.reduce(setApplicationDefaultValues(data), {}),
    [data, section],
  )

  const currentStep = Number(step)
  const isThankYouStep = currentStep === 2

  return {
    uuid,
    data,
    error,
    isError,
    isSuccess,
    isLoading,
    defaultValues,
    isThankYouStep,
    ...section,
  }
}

export {usePostApproval}

const emptyResolver = yupResolver(yup.object().shape({}))

// step 1
const step1Fields = [
  // appraisal contact section
  {
    type: 'h2',
    text: 'Appraisal Contact Information',
  },
  {
    type: 'text',
    label: 'Name',
    placeholder: 'Contact name',
    name: 'appraisal_contact_name',
  },
  {
    type: 'phone',
    label: 'Phone number',
    placeholder: 'Phone number',
    name: 'appraisal_contact_phone_number',
  },
  {
    type: 'email',
    label: 'Email address',
    placeholder: 'Email address',
    name: 'appraisal_contact_email',
  },
  // Insurance company section
  {
    type: 'h2',
    text: 'Insurance Company Information',
  },
  {
    type: 'text',
    label: 'Company name',
    placeholder: 'Company name',
    name: 'insurance_company_name',
  },
  {
    type: 'phone',
    label: 'Company phone number',
    placeholder: 'Phone number',
    name: 'insurance_company_phone_number',
  },
  {
    type: 'email',
    label: 'Company email address',
    placeholder: 'Email address',
    name: 'insurance_company_email',
  },
  // Title company section
  {
    type: 'h2',
    text: 'Title Company or Law Firm Information',
  },
  {
    type: 'text',
    label:
      'Company name',
    placeholder: 'Company name',
    name: 'title_company_or_law_firm_name',
  },
  {
    type: 'phone',
    label: 'Company phone number',
    placeholder: 'Phone number',
    name: 'title_company_or_law_firm_phone_number',
  },
  {
    type: 'email',
    label: 'Company email address',
    placeholder: 'Email address',
    name: 'title_company_or_law_firm_email',
  },

  {
    type: 'select',
    label: 'What is your closing preference?',
    name: 'closing_delivery_preference',
  },
]
const step1Resolver = yupResolver(
  yup.object().shape({
    appraisal_contact_name: yup.string().required('Required'),
    appraisal_contact_phone_number: yup.string().required('Required'),
    appraisal_contact_email: yup.string().email().required('Required'),
    insurance_company_name: yup.string().required('Required'),
    insurance_company_phone_number: yup.string().required('Required'),
    insurance_company_email: yup.string().email().required('Required'),
    title_company_or_law_firm_name: yup.string().required('Required'),
    title_company_or_law_firm_phone_number: yup.string().required('Required'),
    title_company_or_law_firm_email: yup.string().email().required('Required'),
    closing_delivery_preference: yup.mixed().notOneOf(['empty'], 'Required'),
  }),
)
