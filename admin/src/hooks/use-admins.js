import {useMemo} from 'react'
import {useQuery} from 'react-query'

import userService from 'services/user-service'
import {queryKeys} from 'utils/query-client'
import * as format from 'utils/format'

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
  const invitedDate = invitePending ? format.date(new Date(), 'MM.dd.yy') : null
  const joinedDate = invitePending
    ? null
    : format.isoDate(inserted_at, 'MM.dd.yy')
  const name = format.join(first_name, last_name)

  return {
    name,
    email,
    joinedDate,
    invitedDate,
    invitePending,
  }
}

export {useAdmins, useAdminsTable}
