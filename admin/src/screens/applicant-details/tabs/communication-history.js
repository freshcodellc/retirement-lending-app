/** @jsxImportSource @emotion/react */
import * as React from 'react'
import {useTable} from 'react-table'
import {FiPhone, FiSend} from 'react-icons/fi'
import {colors, Table, TableWrapper, Td, Th, Tr} from '@solera/ui'

export function CommunicationHistoryTab() {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Date',
        accessor: 'date',
      },
      {
        Header: 'Sent by',
        accessor: 'sentBy',
      },
      {
        Header: 'Sent',
        accessor: 'sent',
        Cell({value: sentChannel}) {
          switch (sentChannel) {
            case 'email':
              return <FiSend />
            case 'phone':
              return <FiPhone />
            default:
              return sentChannel
          }
        },
      },
      {
        Header: 'Message type',
        accessor: 'messageType',
      },
    ],
    [],
  )
  const data = React.useMemo(
    () => [
      {
        date: '12.10.20',
        sentBy: 'John S.',
        sent: 'email',
        messageType: 'Terms link',
      },
      {
        date: '12.10.20',
        sentBy: 'John S.',
        sent: 'email',
        messageType: 'Full application',
      },
      {
        date: '12.10.20',
        sentBy: 'John S.',
        sent: 'phone',
        messageType: 'Full application',
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
                    paddingTop: '1.2rem',
                    paddingBottom: '1.2rem',
                    borderBottom: `3px solid ${colors.gray40}`,
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
