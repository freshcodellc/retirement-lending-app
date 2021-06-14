import {useQuery} from 'react-query'

import applicationService from 'services/application-service'
import {queryKeys} from 'utils/query-client'

const mapTypes = (types = []) =>
  types.reduce((acc, cur) => ({...acc, [cur.name]: cur.humanized}), {})

function useConstants() {
  const {data = {}, ...result} = useQuery(
    queryKeys.constants,
    applicationService.constants,
    {staleTime: Infinity},
  )
  const statuses = data.statuses || []
  const planTypes = mapTypes(data.plan_types)
  const entityTypes = mapTypes(data.entity_types)
  const propertyTypes = mapTypes(data.property_types)
  const netWorths = mapTypes(data.estimated_net_worths)

  return {
    statuses,
    planTypes,
    netWorths,
    entityTypes,
    propertyTypes,
    ...result,
  }
}

export {useConstants}
