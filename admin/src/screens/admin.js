/** @jsxImportSource @emotion/react */
import * as React from 'react'
import {FiSearch, FiTrash2} from 'react-icons/fi'
import {useTable} from 'react-table'
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
  Select,
  SelectOption,
} from '@solera/ui'
import {Modal, ModalContents, ModalOpenButton} from 'components/modal'
export default function Admin() {
  return (
    <div>
      <div css={{textAlign: 'center'}}>
        <h1>Admin</h1>
        <InviteModal />
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
            css={{padding: '0.5rem', paddingLeft: '20px'}}
          />
        </FormControl>
      </div>
      <AdminTable />
    </div>
  )
}

function InviteModal() {
  return (
    <Modal>
      <ModalOpenButton>
        <Button variant="secondary" css={{width: '100%', maxWidth: '300px'}}>
          Invite new admin
        </Button>
      </ModalOpenButton>
      <ModalContents id="invite-modal" title="Invite">
        <form css={{padding: '1rem', margin: '0 auto', width: '60%'}}>
          <Input
            label="First name"
            id="invite-first-name"
            name="invite-first-name"
            placeholder="First name"
            css={{padding: '0.5rem 0', marginBottom: '3rem'}}
          />
          <Input
            label="Last name"
            id="invite-last-name"
            name="invite-last-name"
            placeholder="Last name"
            css={{padding: '0.5rem 0', marginBottom: '3rem'}}
          />
          <Input
            type="email"
            label="Email"
            id="invite-email"
            name="invite-email"
            placeholder="Email"
            css={{padding: '0.5rem 0', marginBottom: '3rem'}}
          />
          <Input
            label="Phone number"
            id="invite-phone-number"
            name="invite-phone-number"
            placeholder="Phone number"
            css={{padding: '0.5rem 0', marginBottom: '3rem'}}
          />
          <Select
            label="Admin role"
            id="invite-admin-role"
            name="invite-admin-role"
            css={{marginBottom: '3rem'}}
          >
            <SelectOption value="role1">role 1</SelectOption>
            <SelectOption value="role2">role 2</SelectOption>
          </Select>
          <div css={{textAlign: 'center', margin: '1rem 0'}}>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </ModalContents>
    </Modal>
  )
}

function AdminTable() {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Admin name',
        accessor: 'adminName',
      },
      {
        Header: 'Joined',
        accessor: 'joined',
      },
      {
        Header: 'Invite date',
        accessor: 'inviteDate',
      },
      {
        Header: 'Actions',
        accessor: 'actions',
        Cell({value: initialValue, row: {index}, column: {id}, updateMyData}) {
          const invitePending = true

          return (
            <div
              css={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'nowrap',
                justifyContent: 'space-between',
              }}
            >
              {invitePending ? (
                <TextLink variant="secondary">Resend invite</TextLink>
              ) : null}
              <IconButton>
                <FiTrash2 size="1.5em" color={colors.danger} />
              </IconButton>
            </div>
          )
        },
      },
    ],
    [],
  )
  const data = React.useMemo(
    () => [
      {
        adminName: 'John',
        joined: '12.10.20',
        inviteDate: '12.10.20',
        actions: '',
      },
      {
        adminName: 'Mary',
        joined: '12.10.20',
        inviteDate: '12.10.20',
        actions: '',
      },
      {
        adminName: 'Joe',
        joined: '12.10.20',
        inviteDate: '12.10.20',
        actions: '',
      },
      {
        adminName: 'Joe',
        joined: '12.10.20',
        inviteDate: '12.10.20',
        actions: '',
      },
    ],
    [],
  )
  const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} =
    useTable({columns, data})

  return (
    <TableWrapper>
      <Table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <Th
                  css={{
                    fontWeight: 500,
                    fontSize: '1.2rem',
                    paddingTop: '1.2rem',
                    paddingBottom: '1.2rem',
                    borderBottom: `3px solid ${colors.gray20}`,
                    '&:last-child': {
                      minWidth: '250px',
                    },
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
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                })}
              </Tr>
            )
          })}
        </tbody>
      </Table>
    </TableWrapper>
  )
}
