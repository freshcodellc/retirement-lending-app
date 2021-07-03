import {useQuery} from 'react-query'
import * as applicationService from 'services/loan-application-service'

const mapTypes = (types = []) =>
  types.reduce((acc, cur) => ({...acc, [cur.name]: cur.humanized}), {})

function useConstants() {
  const {data = {}, ...result} = useQuery(
    'constants',
    applicationService.constants,
    {staleTime: Infinity},
  )
  const statuses = data.statuses || []
  const planTypes = data.plan_types || []
  const entityTypes = data.entity_types || []
  const propertyTypes = data.property_types || []
  const netWorths = data.estimated_net_worth_brackets || []
  const planTypesMap = mapTypes(data.plan_types)
  const entityTypesMap = mapTypes(data.entity_types)
  const propertyTypesMap = mapTypes(data.property_types)
  const netWorthsMap = mapTypes(data.estimated_net_worth_brackets)

  return {
    statuses,
    planTypes,
    netWorths,
    entityTypes,
    propertyTypes,
    planTypesMap,
    entityTypesMap,
    propertyTypesMap,
    netWorthsMap,
    ...result,
  }
}

export {useConstants}
