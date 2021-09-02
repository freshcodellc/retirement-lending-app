import {useMemo} from 'react'
import {useQuery} from 'react-query'
import {queryKeys} from 'utils/query-client'

import changeHistoryService from 'services/change-history-service'

function useChangeHistories(uuid) {
  const {data, ...restResult} = useQuery(
    queryKeys.change_histories,
    () => changeHistoryService.listChangeHistories(uuid),
    {staleTime: 10000},
  )

  const changeHistories = useMemo(() => data || [], [data])

  return {
    changeHistories,
    ...restResult,
  }
}

export {useChangeHistories}
