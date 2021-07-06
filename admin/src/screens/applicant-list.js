/** @jsxImportSource @emotion/react */
import * as React from 'react'
import {Link} from 'react-router-dom'
import {useTable} from 'react-table'
import {useConstants} from 'hooks/use-constants'
import {useForm} from 'react-hook-form'

import {
  Th,
  Tr,
  Td,
  Table,
  colors,
  Button,
  TextLink,
  TableWrapper,
} from '@solera/ui'
import {useAuth} from 'context/auth-context'
import {join, initial, phone} from 'utils/format'
import {useApplications} from 'hooks/use-applications'
import {
  Checkbox,
  StatusBadge,
  StatusSelect,
  SearchInput,
  DateRangePicker,
} from '@solera/ui'
export default function ApplicantList() {
  const [filters, setFilters] = React.useState()

  return (
    <div>
      <h1>Applicant List</h1>
      <FiltersPanel setFilters={setFilters} />
      <ApplicantTable filters={filters} />
    </div>
  )
}

function FiltersPanel({setFilters}) {
  const {register, handleSubmit, reset, formState, control} = useForm()

  const handleFilter = handleSubmit(setFilters)

  const clearFilters = e => {
    e.preventDefault()
    reset()
  }

  const {statuses} = useConstants()

  return (
    <React.Fragment>
      <form
        name="filters"
        onSubmit={handleFilter}
        css={{
          gap: '2rem',
          display: 'flex',
          flexWrap: 'wrap',
          padding: '2rem',
          marginBottom: '2rem',
          alignItems: 'flex-end',
          border: `5px solid ${colors.gray40}`,
          '&>div': {
            width: '100%',
            minWidth: '200px',
            maxWidth: 'calc((100% - 6rem)/4)',
          },
        }}
      >
        <div>
          <SearchInput
            id="search_query"
            name="search_query"
            placeholder="Search"
            {...register('search_query')}
          />
          <DateRangePicker
            start_name="date_start"
            end_name="date_end"
            control={control}
            placeholder="mm/dd/yy"
            label="Application date"
            css={{marginTop: '2rem'}}
          />
        </div>
        <div>
          <StatusSelect
            id="status"
            options={statuses}
            name="status"
            control={control}
            label="Application status"
          />
        </div>
        <div>
          <Checkbox
            variant="primary"
            control={control}
            label="Assinged to me"
            id="only_assigned_to_me"
            name="only_assigned_to_me"
          />
        </div>
        <div>
          <Button
            type="submit"
            css={{marginBottom: '2rem'}}
            disabled={!formState.isDirty}
          >
            Update list
          </Button>
          <Button disabled={!formState.isDirty} onClick={clearFilters}>
            Clear
          </Button>
        </div>
      </form>
    </React.Fragment>
  )
}

function ApplicantTable({filters}) {
  const {user} = useAuth()
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

  const columns = React.useMemo(
    () => [
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
        Cell: ({value}) => <StatusBadge status={value} />,
      },
      {
        Header: 'Assigned to',
        accessor: 'assigned_admin',
        Cell({value}) {
          if (!value) {
            return <span>Unassigned</span>
          }
          const {uuid, first_name, last_name} = value
          return user.uuid === uuid ? (
            <TextLink variant="secondary">Me</TextLink>
          ) : (
            <span>{join(first_name, initial(last_name))}</span>
          )
        },
      },
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
    ],
    [user.uuid, setApplicationData],
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
                <Tr {...row.getRowProps()}>
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
                          padding: '1.9rem 2rem',
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
