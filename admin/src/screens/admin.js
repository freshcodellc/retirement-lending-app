/** @jsxImportSource @emotion/react */
import * as React from 'react'
import {FiTrash2} from 'react-icons/fi'
import {useTable, useGlobalFilter, useAsyncDebounce} from 'react-table'
import {useForm} from 'react-hook-form'

import {
  Button,
  useModal,
  ModalProvider,
  ModalContents,
  ModalOpenButton,
  FormMessage,
  SearchInput,
} from 'components'
import {
  IconButton,
  Input,
  TableWrapper,
  Table,
  Th,
  Tr,
  Td,
  TextLink,
  colors,
} from '@solera/ui'
import {useAdminsTable} from 'hooks/use-admins'
import {useSendInvite} from 'hooks/use-send-invite'
import {useTableFilters} from 'hooks/use-table-filters'
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

function InviteModal() {
  const [, openModal] = useModal()
  const {register, handleSubmit, formState} = useForm({mode: 'onChange'})
  //TODO: optimistic update invite row
  const {mutate, isLoading, isError, isSuccess, error} = useSendInvite({
    onSuccess() {
      setTimeout(() => {
        openModal(false)
      }, 2000)
    },
  })

  const handleSendInvite = handleSubmit(mutate)

  return (
    <React.Fragment>
      <ModalOpenButton>
        <Button variant="secondary" css={{width: '100%', maxWidth: '300px'}}>
          Invite new admin
        </Button>
      </ModalOpenButton>
      <ModalContents id="invite-modal" title="Invite">
        <div css={{textAlign: 'center'}}>
          {isError ? (
            <FormMessage variant="error">{error.message}</FormMessage>
          ) : null}
          {isSuccess ? (
            <FormMessage variant="success">
              Your invite is on its way!
            </FormMessage>
          ) : null}
        </div>
        <form
          name="send-invite"
          onSubmit={handleSendInvite}
          css={{
            margin: '0 auto',
            width: '60%',
            '& > *': {
              marginTop: '3rem',
            },
          }}
        >
          <Input
            type="email"
            label="Email"
            id="invite-email"
            name="invite-email"
            placeholder="Email"
            {...register('email', {required: true, pattern: /^\S+@\S+$/i})}
          />
          <div css={{textAlign: 'center', padding: '1rem 0'}}>
            <Button
              type="submit"
              isLoading={isLoading}
              disabled={!formState.isValid}
            >
              Submit
            </Button>
          </div>
        </form>
      </ModalContents>
    </React.Fragment>
  )
}

function AdminTable({
  rows,
  state,
  prepareRow,
  headerGroups,
  getTableProps,
  setGlobalFilter,
  getTableBodyProps,
}) {
  return (
    <TableWrapper>
      <Table {...getTableProps()}>
        <thead>
          {headerGroups.map(group => (
            <tr {...group.getHeaderGroupProps()}>
              {group.headers.map(column => (
                <Th
                  css={{
                    paddingTop: '1.2rem',
                    paddingBottom: '1.2rem',
                    '&:last-child': {minWidth: '250px'},
                    borderBottom: `3px solid ${colors.gray40}`,
                  }}
                  {...column.getHeaderProps()}
                >
                  {column.render('Header')}
                </Th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            return (
              <Tr css={{fontSize: '20px'}} {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                ))}
              </Tr>
            )
          })}
        </tbody>
      </Table>
    </TableWrapper>
  )
}

function ActionsCell({value: invitePending}) {
  const {mutate} = useSendInvite()
  if (!invitePending) return ''

  const resendInvite = () => {
    //TODO: get email and send invite
    mutate()
  }

  const cancelInvite = () => {
    //TODO: mutation cancel invite
  }

  return (
    <div
      css={{
        display: 'flex',
        flexWrap: 'nowrap',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <TextLink variant="secondary" onClick={resendInvite}>
        Resend invite
      </TextLink>
      <IconButton onClick={cancelInvite}>
        <FiTrash2 size="1.5em" color={colors.danger} />
      </IconButton>
    </div>
  )
}
