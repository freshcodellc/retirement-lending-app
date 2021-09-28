/** @jsxImportSource @emotion/react */
import * as React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useTable} from 'react-table'

import {
  Th,
  Tr,
  Td,
  Table,
  colors,
  TextLink,
  TableWrapper,
  StatusBadge,
} from '@solera/ui'
import {useAuth} from 'context/auth-context'
import {join, initial, phone} from 'utils/format'
import {useApplications} from 'hooks/use-applications'
import {useConstants} from 'hooks/use-constants'

export function ApplicantTable({filters}) {
  const {user} = useAuth()
  const navigate = useNavigate()
  const {
    page,
    total,
    error,
    isError,
    setPage,
    endCount,
    isLoading,
    startCount,
    totalPages,
    applications,
    setApplicationData,
  } = useApplications(filters)
  const {statusesMap} = useConstants()

  const columns = React.useMemo(
    () => [
      {
        Header: '',
        accessor: 'uuid',
        Cell: ({value: uuid, row}) => {
          const routingToApp = () => setApplicationData(row.original)
          return (
            <Link onMouseEnter={routingToApp} to={`/applicants/${uuid}`}>
              <TextLink variant="secondary">View</TextLink>
            </Link>
          )
        },
      },
      {Header: 'Applicant name', accessor: 'first_name'},
      {Header: 'Email', accessor: 'email'},
      {
        Header: 'Phone number',
        accessor: 'phone_number',
        Cell: ({value}) => phone(value),
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: ({value}) => (
          <StatusBadge status={value} label={statusesMap[value]} />
        ),
      },
      {
        Header: 'Assigned to',
        accessor: 'assigned_admin',
        Cell({value}) {
          if (!value) {
            return <span>Unassigned</span>
          }
          const {uuid, profile, email} = value
          return user.uuid === uuid ? (
            <TextLink variant="secondary">Me</TextLink>
          ) : (
            <span>
              {profile
                ? join(profile.first_name, initial(profile.last_name))
                : email.split('@')[0]}
            </span>
          )
        },
      },
    ],
    [user.uuid, setApplicationData, statusesMap],
  )
  const data = React.useMemo(() => applications, [applications])
  const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} =
    useTable({columns, data})

  const toNextPage = () => setPage(prev => prev + 1)

  const toPrevPage = () => setPage(prev => prev - 1)

  if (isLoading) {
    return 'Loading...'
  }

  if (isError) {
    return `ERROR: ${error.message}`
  }

  return (
    <React.Fragment>
      <TableWrapper css={{border: `5px solid ${colors.gray40}`}}>
        <Table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <Th
                    css={{
                      height: '5rem',
                      verticalAlign: 'bottom',
                      paddingBottom: '1.2rem',
                      background: colors.gray40,
                      '&:last-child': {
                        minWidth: '30px',
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
                <Tr
                  {...row.getRowProps()}
                  css={{
                    '&:hover': {
                      cursor: 'pointer',
                      backgroundColor: 'rgba(118,74,243,0.2)',
                    },
                  }}
                  role="button"
                  onClick={() => navigate(`/applicants/${row.values.uuid}`)}
                >
                  {row.cells.map(cell => {
                    const mineStyle =
                      user.uuid === cell.row.original.assigned_admin?.uuid
                        ? {
                            color: colors.secondary,
                            fontWeight: 500,
                          }
                        : {}
                    return (
                      <Td
                        css={{
                          padding: '1.9rem 1rem',
                          ...mineStyle,
                        }}
                        {...cell.getCellProps()}
                      >
                        {cell.render('Cell')}
                      </Td>
                    )
                  })}
                </Tr>
              )
            })}
          </tbody>
        </Table>
      </TableWrapper>
      {total ? (
        <div
          css={{
            display: 'flex',
            marginTop: '2rem',
            fontSize: '1.2rem',
            alignItems: 'center',
            color: colors.secondary,
            justifyContent: 'flex-end',
          }}
        >
          <span
            css={{fontSize: '1rem'}}
          >{`${startCount}-${endCount} of ${total}`}</span>
          <TextLink
            onClick={toPrevPage}
            disabled={page === 1}
            css={{marginLeft: '1rem'}}
          >
            Prev Page
          </TextLink>
          <TextLink
            onClick={toNextPage}
            css={{marginLeft: '10px'}}
            disabled={page === totalPages}
          >
            Next Page
          </TextLink>
        </div>
      ) : null}
    </React.Fragment>
  )
}
