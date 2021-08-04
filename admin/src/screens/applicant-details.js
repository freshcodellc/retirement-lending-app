/** @jsxImportSource @emotion/react */
import * as React from 'react'
import {useTable} from 'react-table'
import {useForm} from 'react-hook-form'
import {Link} from 'react-router-dom'
import {FiPhone, FiSend, FiTrash2, FiEdit2} from 'react-icons/fi'
import {useQueryClient} from 'react-query'

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
  Button,
  Input,
  FormMessage,
} from '@solera/ui'
import * as format from 'utils/format'
import {useAuth} from 'context/auth-context'
import {queryKeys} from 'utils/query-client'
import {useAddNote} from 'hooks/use-add-note'
import {useEditNote} from 'hooks/use-edit-note'
import {useRemoveNote} from 'hooks/use-remove-note'
import {useUpdateApplication} from 'hooks/use-update-application'
import {useApplication, useInfoSections} from 'hooks/use-application'

import {ReturnLink, StatusSelect, AdminSelect} from 'components'
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
  const {mutate, isError, isSuccess, isLoading} = useUpdateApplication()
  const {handleSubmit, control, register, formState} = useForm({
    mode: 'onChange',
    defaultValues: {
      status: application.status,
      admin: application.assigned_admin?.uuid,
      interest_rate_floor: application.interest_rate_floor,
      interest_rate_range_low: application.interest_rate_range_low,
      interest_rate_range_high: application.interest_rate_range_high,
      interest_rate_spread_low: application.interest_rate_spread_low,
      interest_rate_spread_high: application.interest_rate_spread_high,
    },
  })

  const handleTermSheet = handleSubmit(({status, admin, ...rates}) => {
    mutate({
      ...rates,
      status,
      assigned_admin_user_uuid: admin,
      uuid: application.uuid,
    })
  })

  return (
    <form
      name="terms-sheet"
      onSubmit={handleTermSheet}
      css={{
        flexDirection: 'column',
        border: `5px solid ${colors.gray40}`,
        display: activeTab !== 0 ? 'none' : 'flex',
        padding: '2rem',
        marginBottom: '2rem',
      }}
    >
      <div
        css={{
          display: 'flex',
          gap: '2rem',
          marginBottom: '2rem',
          justifyContent: 'space-between',
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
            css={{marginTop: '2rem'}}
            rules={{required: true}}
          />
        </div>
        <div>
          <Button
            type="submit"
            variant="secondary"
            isLoading={isLoading}
            disabled={!formState.isValid}
          >
            Update
          </Button>
          {isSuccess && (
            <FormMessage variant="success">Successfully Updated!</FormMessage>
          )}
          {isError ? (
            <FormMessage variant="error">Failed to Update!</FormMessage>
          ) : null}
        </div>
      </div>
      <div
        css={{
          display: 'flex',
          gap: '2rem',
          flexWrap: 'wrap',
          flexDirection: 'row',
          '&>*': {
            width: '100%',
            maxWidth: '200px',
            minWidth: '200px',
          },
        }}
      >
        <Input
          type="text"
          placeholder="%"
          label="Floor rate"
          {...register('interest_rate_floor', {required: true})}
        />
        <Input
          type="text"
          placeholder="%"
          label="Range low rate"
          {...register('interest_rate_range_low', {required: true})}
        />
        <Input
          type="text"
          placeholder="%"
          label="Range high rate"
          {...register('interest_rate_range_high', {required: true})}
        />
        <Input
          type="text"
          placeholder="%"
          label="Spread low rate"
          {...register('interest_rate_spread_low', {required: true})}
        />
        <Input
          type="text"
          placeholder="%"
          label="Spread high rate"
          {...register('interest_rate_spread_high', {required: true})}
        />
      </div>
    </form>
  )
}

function ApplicationInfo({application}) {
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
              textTransform: 'capitalize',
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
                  variant="secondary"
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

function NotesTab({application}) {
  const {user} = useAuth()
  const queryClient = useQueryClient()
  const [noteInEdit, setNoteInEdit] = React.useState()
  const {handleSubmit, register, formState, setValue, reset} = useForm({
    mode: 'onChange',
  })
  const {mutate: addNote, isLoading: adding} = useAddNote({
    onSuccess() {
      queryClient.invalidateQueries(queryKeys.application(application.uuid))
      reset()
    },
  })
  const {mutate: editNote} = useEditNote({
    onSuccess() {
      queryClient.invalidateQueries(queryKeys.application(application.uuid))
      reset()
      setNoteInEdit()
    },
  })
  const {mutate: removeNote} = useRemoveNote({
    onSettled() {
      queryClient.invalidateQueries(queryKeys.application(application.uuid))
    },
  })

  const handleSaveNote = handleSubmit(({body}) => {
    if (noteInEdit) {
      editNote({uuid: noteInEdit, body})
    } else {
      addNote({body, loan_application_uuid: application.uuid})
    }
  })

  const handleEditNote =
    ({uuid, body}) =>
    () => {
      setNoteInEdit(uuid)
      setValue('body', body, {shouldValidate: true})
    }

  const handleRemoveNote = noteUuid => () => {
    removeNote(noteUuid)
  }

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
      <div css={{border: `1px solid ${colors.gray20}`}}>
        <form
          name="notes"
          onSubmit={handleSaveNote}
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
            id="body"
            name="body"
            placeholder="Start typing your note here..."
            {...register('body', {required: true})}
          />
          <Button
            type="submit"
            isLoading={adding}
            css={{margin: '1rem auto'}}
            disabled={!formState.isValid}
          >
            {noteInEdit ? 'Update' : 'Save'}
          </Button>
        </form>
      </div>
      <div
        css={{
          border: `1px solid ${colors.gray20}`,
          maxHeight: '500px',
          minHeight: '500px',
          height: '100%',
          overflowY: 'auto',
        }}
      >
        {(application.notes || []).map(note => {
          //TODO: check admin is preload form backend for this to work
          const {first_name, last_name, uuid} = note?.admin?.profile ?? {}
          const adminName = format.join(first_name, format.initial(last_name))
          const notedDate = format.isoDate(note.updated_at, 'MM.dd.yy')
          const yourNotes = user.uuid === uuid

          return (
            <div
              key={note.uuid}
              css={{
                margin: '1rem',
                padding: '1rem',
                border: `1px solid ${colors.text}`,
              }}
            >
              <div
                css={{
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div>{`${notedDate}—${adminName}`}</div>
                {yourNotes ? (
                  <div css={{display: 'flex', gap: '1rem'}}>
                    <FiEdit2
                      onClick={handleEditNote(note)}
                      title="Edit your note"
                      css={{cursor: 'pointer'}}
                    />
                    <FiTrash2
                      onClick={handleRemoveNote(note.uuid)}
                      title="Remove your note"
                      css={{cursor: 'pointer'}}
                    />
                  </div>
                ) : null}
              </div>
              <p>{note.body}</p>
            </div>
          )
        })}
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
