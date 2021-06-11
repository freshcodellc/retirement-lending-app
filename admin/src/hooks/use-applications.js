import {useEffect} from 'react'
import {useQuery, useQueryClient} from 'react-query'

import applicationService from 'services/application-service'
import {queryKeys} from 'utils/query-client'

function useApplications(filters = {}) {
  const queryClient = useQueryClient()
  const {data = {}, ...result} = useQuery(
    queryKeys.applications(filters),
    () => applicationService.list(filters),
    {
      staleTime: 10000,
      keepPreviousData: true,
    },
  )
  const {
    page_number: page = 1,
    total_entries: total = 0,
    total_pages: totalPages = 1,
    loan_applications: applications = [],
  } = data
  const perPage = 50
  const prevPage = page - 1
  const nextPage = page + 1
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

  return {
    page,
    total,
    prevPage,
    nextPage,
    endCount,
    startCount,
    totalPages,
    applications,
    ...result,
  }
}

export {useApplications}
