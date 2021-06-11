/** @jsxImportSource @emotion/react */
import * as React from 'react'
import {useTable} from 'react-table'
import {
  Button,
  Select,
  SelectOption,
  colors,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Textarea,
  TableWrapper,
  Table,
  Tr,
  Th,
  Td,
} from '@solera/ui'
import {ReturnLink, StatusSelect} from 'components'
import {FiPhone, FiSend} from 'react-icons/fi'
import {useApplication} from 'hooks/use-application'
export default function ApplicantDetails() {
  const {data} = useApplication()
  const [activeTab, setActiveTab] = React.useState(0)
  console.log(data)
  const onTabsChange = index => {
    setActiveTab(index)
  }

  return (
    <div>
      <h1>Applicant Details</h1>
      <ReturnLink to="/applicants" variant="secondary">
        Applicant List
      </ReturnLink>
      <ActionsPanel activeTab={activeTab} />
      <Tabs index={activeTab} onChange={onTabsChange}>
        <TabList>
          <Tab>Applicant information</Tab>
          <Tab>Notes</Tab>
          <Tab>Communication history</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <ApplicationInfo />
          </TabPanel>
          <TabPanel>
            <NotesTab />
          </TabPanel>
          <TabPanel>
            <CommHistoryTab />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  )
}

function ActionsPanel({activeTab}) {
  const panelHidden = activeTab !== 0

  return (
    <div
      css={{
        gap: '2rem',
        flexWrap: 'wrap',
        padding: '2rem',
        marginBottom: '2rem',
        justifyContent: 'space-between',
        border: `5px solid ${colors.gray40}`,
        display: panelHidden ? 'none' : 'flex',
        '&>div': {
          width: '100%',
          maxWidth: '300px',
          minWidth: '200px',
        },
      }}
    >
      <div>
        <Select
          label="Status"
          id="status"
          name="status"
          css={{marginBottom: '2rem'}}
        >
          <SelectOption value="status1">status 1</SelectOption>
          <SelectOption value="status2">status 2</SelectOption>
        </Select>
        <Select label="Assigned to" id="assigned-to" name="assigned-to">
          <SelectOption value="1">Tom S.</SelectOption>
          <SelectOption value="2">John D.</SelectOption>
        </Select>
      </div>
      <div>
        <Button variant="secondary">Send terms sheet</Button>
      </div>
    </div>
  )
}

function ApplicationInfo() {
  const sections = [
    {
      id: 0,
      heading: 'Applicant Information',
      fields: [
        {
          label: 'Name',
          value: 'Jane Doe',
        },
      ],
    },
    {
      id: 1,
      heading: 'Property Information',
    },
    {
      id: 2,
      heading: 'Financing Information',
    },
    {
      id: 3,
      heading: 'Eligibility & Retirement Account Information',
    },
    {
      id: 4,
      heading: 'Custodian and IRA Information',
    },
    {
      id: 5,
      heading: 'Sign and Certify',
    },
    {
      id: 6,
      heading: 'Applicant files',
    },
  ]
  return (
    <div
      css={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '1rem',
        '&>div': {
          height: '100%',
        },
      }}
    >
      {sections.map(section => (
        <div key={section.id} css={{border: `1px solid ${colors.gray}`}}>
          <div
            css={{
              background: colors.gray,
              padding: '1rem',
              fontWeight: 500,
              fontSize: '20px',
            }}
          >
            {section.heading}
          </div>
          <div css={{padding: '1rem'}}>
            {(section.fields || []).map(field => (
              <div key={field.label}>
                <div css={{fontWeight: 600, marginBottom: '0.5rem'}}>
                  {field.label}
                </div>
                <div>{field.value}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function NotesTab() {
  return (
    <div
      css={{
        display: 'flex',
        gap: '1rem',
        flexWrap: 'wrap',
        '&>div': {
          width: '100%',
          minWidth: '300px',
          maxWidth: 'calc((100% - 1rem)/2)',
        },
      }}
    >
      <div css={{border: `1px solid ${colors.gray}`}}>
        <form
          css={{
            margin: 0,
            height: '100%',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Textarea
            rows="21"
            id="app-note"
            name="app-note"
            placeholder="Start typing your note here..."
          />
          <Button type="submit" disabled css={{margin: '1rem auto'}}>
            Save
          </Button>
        </form>
      </div>
      <div
        css={{
          border: `1px solid ${colors.gray}`,
          maxHeight: '500px',
          minHeight: '500px',
          height: '100%',
          overflowY: 'auto',
        }}
      >
        {[
          {
            id: 1,
            createdDate: '4.13.21',
            createdBy: 'Tom S.',
            body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
          },
          {
            id: 2,
            createdDate: '4.13.21',
            createdBy: 'Tom S.',
            body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
          },
          {
            id: 3,
            createdDate: '4.13.21',
            createdBy: 'Tom S.',
            body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
          },
        ].map(note => (
          <div
            key={note.id}
            css={{
              margin: '1rem',
              padding: '1rem',
              border: `1px solid ${colors.text}`,
            }}
          >
            <div
              css={{fontWeight: 500}}
            >{`${note.createdDate}—${note.createdBy}`}</div>
            <p>{note.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function CommHistoryTab() {
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
