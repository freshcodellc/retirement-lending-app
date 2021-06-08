/** @jsxImportSource @emotion/react */
import * as React from 'react'
import {Link} from 'react-router-dom'
import {
  Button,
  FormControl,
  InputAdornment,
  Input,
  Select,
  SelectOption,
  colors,
  Checkbox,
  TableWrapper,
  Table,
  Th,
  Tr,
  Td,
  TextLink,
} from '@solera/ui'
import {useTable} from 'react-table'
import {FiSearch, FiCalendar} from 'react-icons/fi'
import {StatusBadge} from 'components'

export default function ApplicantList() {
  return (
    <div>
      <h1>Applicant List</h1>
      <FiltersPanel />
      <ApplicantTable />
    </div>
  )
}

function FiltersPanel() {
  const [checked, setChecked] = React.useState(false)
  return (
    <div
      css={{
        padding: '2rem',
        marginBottom: '2rem',
        border: `5px solid ${colors.gray40}`,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-end',
        gap: '2rem',
        '&>div': {
          maxWidth: 'calc((100% - 6rem)/4)',
          minWidth: '200px',
          width: '100%',
        },
      }}
    >
      <div>
        <FormControl css={{marginBottom: '2rem'}}>
          <InputAdornment>
            <FiSearch />
          </InputAdornment>
          <Input
            type="search"
            name="apps-search"
            placeholder="Search"
            css={{paddingLeft: '20px'}}
          />
        </FormControl>
        <FormControl>
          <Input
            type="search"
            name="apps-date"
            placeholder="mm/dd/yy"
            label="Application date"
            css={{paddingRight: '20px'}}
          />
          <InputAdornment end>
            <FiCalendar size="1.4em" />
          </InputAdornment>
        </FormControl>
      </div>
      <div>
        <Select label="Application status" id="apps-status" name="apps-status">
          <SelectOption value="status1">status 1</SelectOption>
          <SelectOption value="status2">status 2</SelectOption>
        </Select>
      </div>
      <div>
        <label
          css={{fontSize: '20px', display: 'flex', alignItems: 'center'}}
        >
          <Checkbox
            checked={checked}
            name="assigned-to-me"
            onChange={event => setChecked(event.target.checked)}
          />
          Assinged to me
        </label>
      </div>
      <div>
        <Button disabled css={{marginBottom: '2rem'}}>
          Update list
        </Button>
        <Button disabled>Clear</Button>
      </div>
    </div>
  )
}

function ApplicantTable() {
  const currentUserId = 1
  const columns = React.useMemo(
    () => [
      {
        Header: 'Applicant name',
        accessor: 'applicantName',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Phone number',
        accessor: 'phoneNumber',
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: ({value: status}) => <StatusBadge status={status} />,
      },
      {
        Header: 'Assigned to',
        accessor: 'assignedTo',
        Cell({value: assignedTo}) {
          const assignedToCurrentUser = currentUserId === assignedTo
          return assignedToCurrentUser ? (
            <TextLink variant="secondary">Me</TextLink>
          ) : (
            <span>Tom S.</span>
          )
        },
      },
      {
        Header: '',
        accessor: 'view',
        Cell({row}) {
          const applicantId = row.original.id
          const applicantRoute = `/applicants/${applicantId}`

          return (
            <Link to={applicantRoute}>
              <TextLink variant="secondary">View</TextLink>
            </Link>
          )
        },
      },
    ],
    [],
  )
  const data = React.useMemo(
    () => [
      {
        id: 1,
        applicantName: 'John',
        email: 'john@gmail.com',
        phoneNumber: '801.616.9436',
        status: 'Full Application Requested',
        assignedTo: 1,
      },
      {
        id: 2,
        applicantName: 'Mary',
        email: 'john@gmail.com',
        phoneNumber: '801.616.9436',
        status: 'Approved',
      },
      {
        id: 3,
        applicantName: 'Joe',
        email: 'john@gmail.com',
        phoneNumber: '801.616.9436',
        status: 'Denied',
      },
      {
        id: 4,
        applicantName: 'Joe',
        email: 'john@gmail.com',
        phoneNumber: '801.616.9436',
        status: 'Loan Committee Review',
      },
      {
        id: 5,
        applicantName: 'Joe',
        email: 'john@gmail.com',
        phoneNumber: '801.616.9436',
        status: 'Terms Sheet Denied',
      },
      {
        id: 6,
        applicantName: 'Joe',
        email: 'john@gmail.com',
        phoneNumber: '801.616.9436',
        status: 'Pre-Underwriting',
      },
    ],
    [],
  )
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({columns, data})

  return (
    <TableWrapper css={{border: `5px solid ${colors.gray40}`}}>
      <Table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <Th
                  css={{
                    fontWeight: 500,
                    fontSize: '1.2rem',
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
                  const currentUserStyle =
                    currentUserId === cell.row.values.assignedTo
                      ? {
                          color: colors.secondary,
                          fontWeight: 500,
                        }
                      : {}
                  return (
                    <Td
                      css={{
                        padding: '1.9rem 2rem',
                        ...currentUserStyle,
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
  )
}
