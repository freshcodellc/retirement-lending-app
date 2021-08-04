import {useMemo} from 'react'
import {useQuery} from 'react-query'

import userService from 'services/user-service'
import {queryKeys} from 'utils/query-client'
import * as format from 'utils/format'

function useAdmins() {
  const {data, ...restResult} = useQuery(
    queryKeys.admins,
    userService.getAdmins,
    {staleTime: 10000},
  )

  const admins = useMemo(() => data || [], [data])

  return {
    admins,
    ...restResult,
  }
}

function useAdminInvites() {
  const {data, ...restResult} = useQuery(
    queryKeys.admin_invites,
    userService.getAdminInvites,
    {staleTime: 10000},
  )

  const invites = useMemo(() => data?.user_invites ?? [], [data])

  return {
    invites,
    ...restResult,
  }
}

function useAdminsTable() {
  const {admins, ...adminsResult} = useAdmins()
  const {invites, ...invitesResult} = useAdminInvites()

  const isLoading = adminsResult.isLoading || invitesResult.isLoading
  const isError = adminsResult.isError || invitesResult.isError
  const error = adminsResult.error || invitesResult.error

  const data = useMemo(
    () => [...admins, ...invites].map(mapAdmin),
    [admins, invites],
  )

  return {
    data,
    isLoading,
    isError,
    error,
  }
}

function mapAdmin({uuid, email, responded_at, profile, inserted_at}) {
  const invitePending = responded_at != null
  const insertDate = format.isoDate(inserted_at, 'MM.dd.yy')
  const invitedDate = invitePending ? insertDate : null
  const joinedDate = invitePending ? null : insertDate
  const name = profile ? format.join(profile.first_name, profile.last_name) : ''

  return {
    uuid,
    name,
    email,
    joinedDate,
    invitedDate,
    invitePending,
  }
}

export {useAdmins, useAdminsTable}
