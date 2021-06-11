import {useQuery} from 'react-query'

import applicationService from 'services/application-service'
import {queryKeys} from 'utils/query-client'
import {statusColors} from 'components'

function useConstants() {
  const {data = {}, ...result} = useQuery(
    queryKeys.constants,
    applicationService.constants,
  )
  const statuses = (data.statuses || []).map(status => ({
    color: statusColors[status.name],
    ...status,
  }))

  return {
    statuses,
    ...result,
  }
}

export {useConstants}
