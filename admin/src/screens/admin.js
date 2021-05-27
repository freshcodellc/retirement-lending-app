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
} from '@solera/ui'
export default function Admin() {
  return (
    <div>
      <div css={{textAlign: 'center'}}>
        <h1>Admin</h1>
        <Button variant="secondary" css={{width: '300px'}}>
          invite new admin
        </Button>
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
            <FiSearch color={colors.gray80} />
          </InputAdornment>
          <Input
            type="search"
            name="search-admin"
            placeholder="Search"
            css={{padding: '7px', paddingLeft: '20px'}}
          />
        </FormControl>
      </div>
      <TableWrapper>
        <AdminTable />
      </TableWrapper>
    </div>
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
                    minWidth: '250px'
                  }
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
  )
}
