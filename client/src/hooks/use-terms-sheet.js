import {useMemo} from 'react'
import {useApplication} from 'hooks/use-application'
import {useParams} from 'react-router-dom'
import currency from 'currency.js'

function useTermsSheet() {
  const {uuid} = useParams()
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

  const defaultValues = useMemo(
    () => ({
      signature: data.signature,
      signature_title: data.signature_title,
      signature_entity_name: data.signature_entity_name,
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

export {useTermsSheet}
