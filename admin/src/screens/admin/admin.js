/** @jsxImportSource @emotion/react */
import * as React from 'react'
import {useTable, useGlobalFilter, useAsyncDebounce} from 'react-table'

import {ModalProvider, SearchInput} from '@solera/ui'
import {useAdminsTable} from 'hooks/use-admins'
import {useTableFilters} from 'hooks/use-table-filters'

import {InviteModal} from './invite-modal'
import {AdminTable} from './admin-table'
import {ActionsCell} from './actions-cell'

export default function Admin() {
  const columns = React.useMemo(
    () => [
      {Header: 'Email address', accessor: 'email'},
      {Header: 'Joined', accessor: 'joinedDate'},
      {Header: 'Invite date', accessor: 'invitedDate'},
      {Header: 'Actions', accessor: 'invitePending', Cell: ActionsCell},
    ],
    [],
  )
  const {filterTypes} = useTableFilters()
  const {data, isLoading, isError, error} = useAdminsTable()
  const {setGlobalFilter, ...restTableProps} = useTable(
    {columns, data, filterTypes},
    useGlobalFilter,
  )
  const [searchEntry, setSearchEntry] = React.useState('')
  const setTableFilter = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 200)

  const handleSearch = e => {
    setSearchEntry(e.target.value)
    setTableFilter(e.target.value)
  }

  if (isLoading) {
    return 'Loading...'
  }

  if (isError) {
    return `ERROR: ${error.message}`
  }

  return (
    <div>
      <div css={{textAlign: 'center'}}>
        <h1>Admin</h1>
        <ModalProvider>
          <InviteModal />
        </ModalProvider>
      </div>
      <div
        css={{
          width: '100%',
          display: 'flex',
          padding: '3rem 0',
          justifyContent: 'flex-end',
        }}
      >
        <SearchInput
          name="search-admin"
          placeholder="Search"
          value={searchEntry}
          onChange={handleSearch}
        />
      </div>
      <AdminTable {...restTableProps} />
    </div>
  )
}
