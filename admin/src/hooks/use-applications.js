import {useState, useEffect, useCallback} from 'react'
import {useQuery, useQueryClient} from 'react-query'

import applicationService from 'services/application-service'
import {queryKeys} from 'utils/query-client'

function useApplications(filters = {}) {
  const [page, setPage] = useState(1)
  const queryClient = useQueryClient()
  const {data = {}, ...result} = useQuery(
    queryKeys.applications(page, filters),
    () => applicationService.list({...filters, page}),
    {staleTime: 30000, keepPreviousData: true},
  )
  const {
    total_entries: total = 0,
    total_pages: totalPages = 1,
    loan_applications: applications = [],
  } = data
  const perPage = 50
  const prevPage = Math.max(page - 1, 0)
  const nextPage = Math.min(page + 1, totalPages)
  const endCount = prevPage * perPage + applications.length
  const startCount = endCount - (applications.length - 1)

  useEffect(() => {
    if (totalPages > nextPage) {
      const nextFilters = {...filters, page: nextPage}
      queryClient.prefetchQuery(queryKeys.applications(nextFilters), () =>
        applicationService.list(nextFilters),
      )
    }
  }, [nextPage, totalPages, filters, queryClient])

  const setApplicationData = useCallback(
    app => queryClient.setQueryData(queryKeys.application(app.uuid), app),
    [queryClient],
  )

  return {
    page,
    total,
    setPage,
    prevPage,
    nextPage,
    endCount,
    startCount,
    totalPages,
    queryClient,
    applications,
    setApplicationData,
    ...result,
  }
}

export {useApplications}
