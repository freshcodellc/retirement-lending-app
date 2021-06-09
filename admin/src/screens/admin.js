/** @jsxImportSource @emotion/react */
import * as React from 'react'
import {FiSearch, FiTrash2} from 'react-icons/fi'
import {useTable, useGlobalFilter, useAsyncDebounce} from 'react-table'
import {useForm} from 'react-hook-form'

import {
  useModal,
  ModalProvider,
  ModalContents,
  ModalOpenButton,
  FormMessage,
} from 'components'
import {
  Button,
  IconButton,
  Input,
  InputAdornment,
  FormControl,
  TableWrapper,
  Table,
  Th,
  Tr,
  Td,
  TextLink,
  colors,
} from '@solera/ui'
import {useAdminsTable} from 'hooks/use-admins'
import {useTableFilters} from 'hooks/use-table-filters'
import {useSendInvite} from 'hooks/use-send-invite'
export default function Admin() {
  const columns = React.useMemo(
    () => [
      {Header: 'Admin name', accessor: 'name'},
      {Header: 'Joined', accessor: 'joinedDate'},
      {Header: 'Invite date', accessor: 'invitedDate'},
      {Header: 'Actions', accessor: 'invitePending', Cell: ActionsCell},
    ],
    [],
  )
  const {filterTypes} = useTableFilters()
  const {data, status, error} = useAdminsTable()
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

  if (status === 'loading') {
    return 'loading...'
  } else if (status === 'error') {
    return error.message
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
        <FormControl>
          <InputAdornment>
            <FiSearch />
          </InputAdornment>
          <Input
            type="search"
            name="search-admin"
            placeholder="Search"
            value={searchEntry}
            onChange={handleSearch}
            css={{paddingLeft: '20px'}}
          />
        </FormControl>
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
  const isFormInvalid = !formState.isValid

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
            label="First name"
            id="invite-first-name"
            name="invite-first-name"
            placeholder="First name"
            {...register('first_name', {required: true})}
          />
          <Input
            label="Last name"
            id="invite-last-name"
            name="invite-last-name"
            placeholder="Last name"
            {...register('last_name', {required: true})}
          />
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
              disabled={isLoading || isFormInvalid}
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
                    borderBottom: `3px solid ${colors.gray40}`,
                    '&:last-child': {minWidth: '250px'},
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
  const {mutate, isLoading, isError, isSuccess, error} = useSendInvite()
  if (!invitePending) return ''

  const resendInvite = () => {
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
