import {useQuery} from 'react-query'

import applicationService from 'services/application-service'
import {queryKeys} from 'utils/query-client'

function useConstants() {
  const {data = {}, ...result} = useQuery(
    queryKeys.constants,
    applicationService.constants,
    {staleTime: Infinity},
  )
  const statuses = data.statuses || []

  return {
    statuses,
    ...result,
  }
}

export {useConstants}
