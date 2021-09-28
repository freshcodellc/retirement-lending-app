/** @jsxImportSource @emotion/react */
import * as React from 'react'
import {useTable} from 'react-table'
import {parseISO, format} from 'date-fns'

import {colors, Table, TableWrapper, Th, Tr} from '@solera/ui'
import {snakeCaseToHumanized} from 'utils/format'
import {Td} from '@solera/ui'

export function ChangeHistoryTab({changeHistories}) {
  const interpolateValue = value => {
    let interpolated = ''

    switch (value) {
      case true:
        interpolated = 'true'
        break
      case false:
        interpolated = 'false'
        break
      case null:
        interpolated = 'blank'
      default:
        interpolated = value
    }

    return interpolated
  }

  const columns = React.useMemo(
    () => [
      {
        Header: 'Date',
        accessor: 'date',
      },
      {
        Header: 'Changed by',
        accessor: 'changedBy',
      },
      {
        Header: 'What changed',
        accessor: 'changedFields',
      },
    ],
    [],
  )

  const data = changeHistories.map(changeHistory => ({
    date: format(
      new Date(parseISO(changeHistory.inserted_at)),
      "MM/dd/yyyy 'at' h:mm a",
    ),
    changedBy: `${changeHistory.user.profile.first_name} ${changeHistory.user.profile.last_name}`,
    changedFields: (
      <div key={changeHistory.uuid}>
        {Object.keys(changeHistory.changes).map((key, index) => (
          <div>
            <strong>{snakeCaseToHumanized(key)}</strong> was changed from{' '}
            <strong>{interpolateValue(changeHistory.changes[key][0])}</strong>{' '}
            to{' '}
            <strong>{interpolateValue(changeHistory.changes[key][1])}</strong>
          </div>
        ))}
      </div>
    ),
  }))
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
