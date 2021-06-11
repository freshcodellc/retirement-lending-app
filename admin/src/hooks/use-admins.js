import {useMemo} from 'react'
import {useQuery} from 'react-query'
import {format, parseJSON} from 'date-fns'

import userService from 'services/user-service'
import {joinNames} from 'utils/user'
import {queryKeys} from 'utils/query-client'

const formatDate = date => format(date, 'MM.dd.yy')

function useAdmins() {
  return useQuery(queryKeys.users, userService.getAdmins)
}

function useAdminsTable() {
  const {data: admins = [], ...restResult} = useAdmins()

  const data = useMemo(() => admins.map(mapAdmin), [admins])

  return {
    data,
    ...restResult,
  }
}

function mapAdmin({status, first_name, last_name, inserted_at}) {
  //TODO: determine invite pending state
  const invitePending = status !== 'active'
  const invitedDate = invitePending ? formatDate(new Date()) : null
  const joinedDate = invitePending ? null : formatDate(parseJSON(inserted_at))
  const name = joinNames(first_name, last_name)

  return {
    name,
    joinedDate,
    invitedDate,
    invitePending,
  }
}

export {useAdmins, useAdminsTable}
