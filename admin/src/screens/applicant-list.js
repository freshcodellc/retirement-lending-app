/** @jsxImportSource @emotion/react */
import * as React from 'react'
import {Link} from 'react-router-dom'
import {useTable} from 'react-table'
import {useForm, Controller} from 'react-hook-form'

import {
  Button,
  colors,
  Checkbox,
  TableWrapper,
  Table,
  Th,
  Tr,
  Td,
  TextLink,
} from '@solera/ui'
import {useAuth} from 'context/auth-context'
import {useConstants} from 'hooks/use-constants'
import {joinNames, initialName} from 'utils/user'
import {useApplications} from 'hooks/use-applications'
import {StatusBadge, StatusSelect, SearchInput, DateInput} from 'components'

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
  const {statuses} = useConstants()
  const {register, handleSubmit, reset, formState, control} = useForm()

  const handleFilter = handleSubmit(setFilters)

  const clearFilters = e => {
    e.preventDefault()
    reset()
  }

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
            {...register('search')}
          />
          <DateInput
            id="date_start"
            name="date_start"
            control={control}
            placeholder="mm/dd/yy"
            label="Application date"
            css={{marginTop: '2rem'}}
          />
        </div>
        <div>
          <StatusSelect
            id="status"
            name="status"
            control={control}
            options={statuses}
            label="Application status"
          />
        </div>
        <div>
          <Controller
            name="mine"
            control={control}
            render={({field: {value, onChange}}) => (
              <Checkbox
                id="mine"
                name="mine"
                checked={value}
                onChange={onChange}
                label="Assinged to me"
              />
            )}
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
    endCount,
    isLoading,
    startCount,
    totalPages,
    applications,
  } = useApplications(filters)

  const columns = React.useMemo(
    () => [
      {
        Header: 'Applicant name',
        accessor: 'first_name',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Phone number',
        accessor: 'phone_number',
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: ({value}) => <StatusBadge status={value} />,
      },
      {
        Header: 'Assigned to',
        accessor: 'user',
        Cell({value = {}}) {
          const {id, first_name, last_name} = value
          return user.id === id ? (
            <TextLink variant="secondary">Me</TextLink>
          ) : (
            <span>{joinNames(first_name, initialName(last_name))}</span>
          )
        },
      },
      {
        Header: '',
        accessor: 'uuid',
        Cell: ({value: uuid}) => (
          <Link to={`/applicants/${uuid}`}>
            <TextLink variant="secondary">View</TextLink>
          </Link>
        ),
      },
    ],
    [user.id],
  )
  const data = React.useMemo(() => applications, [applications])
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({columns, data})

  if (isLoading) {
    return 'Loading...'
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
                      user.id === cell.row.original.user_id
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
            marginTop: '1.5rem',
            fontSize: '1.1rem',
            color: colors.secondary,
          }}
        >
          {`${startCount}-${endCount} of ${total}`}
          <TextLink disabled={page === 1} css={{marginLeft: '12px'}}>
            Prev
          </TextLink>
          <TextLink
            css={{marginLeft: '10px'}}
            disabled={page === totalPages}
          >
            Next
          </TextLink>
        </div>
      ) : null}
    </React.Fragment>
  )
}
