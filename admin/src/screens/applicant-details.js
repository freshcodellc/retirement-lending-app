/** @jsxImportSource @emotion/react */
import * as React from 'react'
import {useTable} from 'react-table'
import {useForm} from 'react-hook-form'
import {Link} from 'react-router-dom'
import {FiPhone, FiSend} from 'react-icons/fi'

import {
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
  TextLink,
} from '@solera/ui'
import {useSaveNote} from 'hooks/use-save-note'
import {useSendTermsSheet} from 'hooks/use-send-terms-sheet'
import {useApplication, useInfoSections} from 'hooks/use-application'
import {ReturnLink, StatusSelect, AdminSelect, Button} from 'components'
export default function ApplicantDetails() {
  const {application, isLoading, isError, error} = useApplication()
  const [activeTab, setActiveTab] = React.useState(0)

  if (isLoading) {
    return 'Loading...'
  }

  if (isError) {
    return `ERROR: ${error.message}`
  }

  return (
    <div>
      <h1>Applicant Details</h1>
      <ReturnLink to="/applicants" variant="secondary">
        Applicant List
      </ReturnLink>
      <ActionsPanel activeTab={activeTab} application={application} />
      <Tabs index={activeTab} onChange={setActiveTab}>
        <TabList>
          <Tab>Applicant information</Tab>
          <Tab>Notes</Tab>
          <Tab>Communication history</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <ApplicationInfo application={application} />
          </TabPanel>
          <TabPanel>
            <NotesTab application={application} />
          </TabPanel>
          <TabPanel>
            <CommHistoryTab application={application} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  )
}

function ActionsPanel({activeTab, application}) {
  const {mutate: sendTermsSheet, isLoading} = useSendTermsSheet()
  const {handleSubmit, control, formState} = useForm({
    mode: 'onChange',
    defaultValues: {
      status: application.status,
      admin: application.assigned_admin?.uuid,
    },
  })

  const handleTermSheet = handleSubmit(form => {
    // TODO: send term sheet
    console.log(form)
    sendTermsSheet(form)
  })

  return (
    <form
      name="term-sheet"
      onSubmit={handleTermSheet}
      css={{
        gap: '2rem',
        flexWrap: 'wrap',
        padding: '2rem',
        marginBottom: '2rem',
        justifyContent: 'space-between',
        border: `5px solid ${colors.gray40}`,
        display: activeTab !== 0 ? 'none' : 'flex',
        '&>div': {
          width: '100%',
          maxWidth: '300px',
          minWidth: '200px',
        },
      }}
    >
      <div>
        <StatusSelect
          id="status"
          name="status"
          label="Status"
          control={control}
          rules={{required: true}}
        />
        <AdminSelect
          id="admin"
          name="admin"
          control={control}
          label="Assigned to"
          rules={{required: true}}
          css={{marginTop: '2rem'}}
        />
      </div>
      <div>
        <Button
          type="submit"
          variant="secondary"
          isLoading={isLoading}
          disabled={!formState.isValid}
        >
          Send terms sheet
        </Button>
      </div>
    </form>
  )
}

function ApplicationInfo({application}) {
  application.addresses = [
    {
      type: 'physical',
      address: '12 Main St',
      address_2: null,
      city: 'Lehi',
      state: 'UT',
      postal_code: '84043',
    },
  ]
  const sections = useInfoSections(application)

  return (
    <div
      css={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '1.2rem',
        '&>div': {
          height: '100%',
        },
      }}
    >
      {sections.map(section => (
        <div key={section.heading} css={{border: `1px solid ${colors.gray}`}}>
          <div
            css={{
              fontWeight: 500,
              fontSize: '20px',
              padding: '1.2rem',
              background: colors.gray,
            }}
          >
            {section.heading}
          </div>
          <div
            css={{
              padding: '1.2rem',
              position: 'relative',
              '& > *:not(:last-child)': {marginBottom: '1.2rem'},
            }}
          >
            {section.route ? (
              <Link to={`/applicants/${application.uuid}/${section.route}`}>
                <TextLink
                  css={{
                    right: '1.2rem',
                    fontWeight: 500,
                    fontSize: '1.1rem',
                    position: 'absolute',
                  }}
                >
                  Edit
                </TextLink>
              </Link>
            ) : null}
            {section.fields.map(field => (
              <div key={field.label}>
                <div css={{fontWeight: 600, marginBottom: '0.4rem'}}>
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
  const {mutate: saveNote, isLoading} = useSaveNote()
  const {handleSubmit, register, formState} = useForm({
    mode: 'onChange',
  })

  const handleTakeNote = handleSubmit(form => {
    //TODO: save note
    console.log(form)
    saveNote(form)
  })

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
          name="notes"
          onSubmit={handleTakeNote}
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
            {...register('note', {required: true})}
          />
          <Button
            type="submit"
            isLoading={isLoading}
            css={{margin: '1rem auto'}}
            disabled={!formState.isValid}
          >
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
