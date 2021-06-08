import {useQuery} from 'react-query'

import {queryClient} from 'utils/query-client'
import applicationService from 'services/application-service'

const queryKeys = {
  constants: () => 'constants',
}

function useConstants() {
  return useQuery(queryKeys.constants(), applicationService.constants)
}

function setConstantsQueryData(data) {
  queryClient.setQueryData(queryKeys.constants(), data)
}

export {useConstants, setConstantsQueryData, queryKeys}
