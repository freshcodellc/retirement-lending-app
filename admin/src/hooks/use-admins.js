import {useMemo} from 'react'
import {useQuery} from 'react-query'
import {format, parseJSON} from 'date-fns'

import userService from 'services/user-service'
import {joinNames} from 'utils/user'
import {queryKeys} from 'utils/query-client'

const formatDate = date => format(date, 'MM.dd.yy')

function useAdmins() {
  const {data: admins = [], ...restResult} = useQuery(
    queryKeys.users,
    userService.getAdmins,
    {staleTime: 30000},
  )

  return {
    admins,
    ...restResult,
  }
}

function useAdminsTable() {
  const {admins, ...restResult} = useAdmins()

  const data = useMemo(() => admins.map(mapAdmin), [admins])

  return {
    data,
    ...restResult,
  }
}

function mapAdmin({email, status, first_name, last_name, inserted_at}) {
  //TODO: determine invite pending state
  const invitePending = status !== 'active'
  const invitedDate = invitePending ? formatDate(new Date()) : null
  const joinedDate = invitePending ? null : formatDate(parseJSON(inserted_at))
  const name = joinNames(first_name, last_name)

  return {
    name,
    email,
    joinedDate,
    invitedDate,
    invitePending,
  }
}

export {useAdmins, useAdminsTable}
