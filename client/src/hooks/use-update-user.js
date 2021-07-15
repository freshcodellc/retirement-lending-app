import {useMutation} from 'react-query'
import {queryClient} from 'context/index'
import * as userService from '../services/user-service'

function useUpdateUser({onSuccess = () => {}} = {onSuccess: () => {}}) {
  return useMutation(
    ({profile, ...user}) =>
      userService.update({
        profile,
        user,
      }),
    {
      onMutate: values => {
        const previousData = queryClient.getQueryData('user')

        queryClient.setQueryData('user', old => ({
          ...old,
          ...values,
        }))

        return () => queryClient.setQueryData('user', previousData)
      },
      onError: (error, values, rollback) => rollback(),
      onSuccess: () => {
        queryClient.invalidateQueries('user')
        onSuccess()
      },
    },
  )
}

export {useUpdateUser}
