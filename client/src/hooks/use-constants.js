import {useMemo} from 'react'
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
  const documentTypes = data.document_types || []
  const planTypesMap = mapTypes(data.plan_types)
  const entityTypesMap = mapTypes(data.entity_types)
  const propertyTypesMap = mapTypes(data.property_types)
  const netWorthsMap = mapTypes(data.estimated_net_worth_brackets)
  const documentTypesMap = mapTypes(data.document_types)
  const statusesMap = useMemo(() => mapTypes(data.statuses), [data.statuses])

  return {
    statuses,
    planTypes,
    netWorths,
    entityTypes,
    propertyTypes,
    statusesMap,
    planTypesMap,
    entityTypesMap,
    propertyTypesMap,
    netWorthsMap,
    documentTypes,
    documentTypesMap,
    ...result,
  }
}

export {useConstants}
