import {useMemo} from 'react'
import {useApplication} from 'hooks/use-application'
import {useParams} from 'react-router-dom'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'

function useTermsSheet() {
  const {uuid} = useParams()
  const {data, isSuccess, isLoading, isError, error} = useApplication(uuid)

  const defaultValues = useMemo(
    () => ({
      entity_name: data.entity_name,
      term_sheet_signature: '',
      term_sheet_signature_date: new Date(),
      full_name: [data.first_name, data.middle_name, data.last_name]
        .filter(Boolean)
        .join(' '),
    }),
    [data],
  )

  return {
    uuid,
    data,
    error,
    isError,
    isSuccess,
    isLoading,
    defaultValues,
  }
}

const schema = yup.object().shape({
  entity_name: yup.string().required('Required'),
  term_sheet_signature: yup.string().required('Required'),
  full_name: yup.string().required('Required'),
})

const validationResolver = yupResolver(schema)

export {useTermsSheet, validationResolver}
