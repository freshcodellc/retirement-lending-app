import {useQuery} from 'react-query'
import {useParams} from 'react-router-dom'

import applicationService from 'services/application-service'
import {queryKeys} from 'utils/query-client'

function useApplication() {
  const {uuid} = useParams()
  const {data: application = {}, ...result} = useQuery(
    queryKeys.application(uuid),
    () => applicationService.get(uuid),
    {staleTime: 30000},
  )

  return {
    application,
    ...result,
  }
}

export {useApplication}
