import {useQuery} from 'react-query'

import applicationService from 'services/application-service'
import {queryKeys} from 'utils/query-client'

function useConstants() {
  return useQuery(queryKeys.constants, applicationService.constants)
}

export {useConstants}
