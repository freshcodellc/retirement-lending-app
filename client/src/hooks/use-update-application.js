import {useMutation} from 'react-query'
import {queryClient} from 'context/index'
import * as loanApplicationService from 'services/loan-application-service'

function useUpdateApplication({onSuccess = () => {}} = {onSuccess: () => {}}) {
  return useMutation(
    ({uuid, ...fields}) =>
      loanApplicationService.update({
        uuid,
        data: {loan_application: adaptFields(fields)},
      }),
    {
      onMutate: values => {
        const previousData = queryClient.getQueryData('loan-application')

        queryClient.setQueryData('loan-application', old => ({
          ...old,
          ...values,
        }))

        return () => queryClient.setQueryData('loan-application', previousData)
      },
      onError: (error, values, rollback) => rollback(),
      onSuccess: () => {
        queryClient.invalidateQueries('loan-application')
        onSuccess()
      },
    },
  )
}

function adaptFields(fields) {
  const data = {}
  for (const key in fields) {
    let value = fields[key]

    if (['mailing_equal_physical'].includes(key)) continue
    if (['physical', 'mailing', 'property'].includes(key)) {
      //TODO: handle updating addresses
      continue
    }

    switch (value) {
      case null:
      case undefined:
      case 'empty':
        continue
      case 'true':
        value = true
        break
      case 'false':
        value = false
        break
      default:
    }

    data[key] = value
  }

  return data
}

export {useUpdateApplication}
