/** @jsxImportSource @emotion/react */
import {FiTrash2} from 'react-icons/fi'
import {useQueryClient} from 'react-query'
import {queryKeys} from 'utils/query-client'

import {
  IconButton,
  TableWrapper,
  Table,
  Th,
  Tr,
  Td,
  colors,
  Spinner,
} from '@solera/ui'
import {useRemoveInvite} from 'hooks/use-remove-invite'

export function AdminTable({
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
